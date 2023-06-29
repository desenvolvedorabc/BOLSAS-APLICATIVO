/* eslint-disable no-useless-escape */
import { useFormik } from 'formik';
import Image from 'next/image';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import ErrorText from 'src/components/ErrorText';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import ButtonWhite from 'src/components/buttons/buttonWhite';
import ModalConfirmacao from 'src/components/modalConfirmacao';
import { useAuth } from 'src/context/AuthContext';
import { editUser } from 'src/services/usuarios.service';
import { setCookie } from 'src/utils/cookies';
import { maskCPF, maskPhone } from 'src/utils/masks';
import { isValidCPF } from 'src/utils/validate';
import { Button, Logo } from './styledComponents';

type ValidationErrors = Partial<{
  name: string;
  email: string;
  cpf: string;
  telephone: string;
}>;

export default function ModalEditarMinhaConta(props) {
  const [_show, setShow] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [modalShowConfirm, setModalShowConfirm] = useState(false);
  const [modalStatus, setModalStatus] = useState(true);
  const { user, changeUser } = useAuth();
  const [tel, setTel] = useState(props.usuario?.telephone);
  const [cpf, setCpf] = useState(props.usuario?.cpf);

  const handleClose = () => setShow(false);
  const validate = (values) => {
    const errors: ValidationErrors = {};
    if (!values.name) {
      errors.name = 'Campo obrigatório';
    } else if (values.name.length < 6) {
      errors.name = 'Deve ter no mínimo 6 caracteres';
    }
    if (!values.email) {
      errors.email = 'Campo obrigatório';
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email,
      )
    ) {
      errors.email = 'Email com formato inválido';
    }
    if (!values.cpf) {
      errors.cpf = 'Campo obrigatório';
    } else if (!isValidCPF(values.cpf)) {
      errors.cpf = 'Documento com formato inválido';
    }
    if (!values.telephone) {
      errors.telephone = 'Campo obrigatório';
    } else if (values.telephone.length < 11 || values.telephone.length > 11) {
      errors.telephone = 'Telefone com formato inválido';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: props.usuario?.name,
      email: props.usuario?.email,
      cpf: props.usuario?.cpf,
      telephone: props.usuario?.telephone,
      image_profile: props.usuario?.image_profile,
    },
    validate,
    onSubmit: async (values) => {
      let file = null;
      if (userAvatar) {
        file = new FormData();
        file.append('avatar', userAvatar);
      }

      values.cpf = values.cpf.replace(/\D/g, '');
      values.telephone = values.telephone.replace(/\D/g, '');

      const response = await editUser(props.usuario.id, values, file);
      if (response.status === 200) {
        const cookie = {
          ...response.data,
          image_profile_url: `${props.url}/users/avatar/${response?.data?.image_profile}`,
        };
        setCookie(null, 'USUARIO', JSON.stringify(cookie), {
          path: '/',
        });
        const data = {
          ...response.data,
          image_profile_url: `${props.url}/users/avatar/${response?.data?.image_profile}`,
        };
        changeUser(data);
        setModalStatus(true);
        setModalShowConfirm(true);
      } else {
        setModalStatus(false);
        setModalShowConfirm(true);
      }
    },
  });

  const hiddenFileInput = useRef(null);

  const uploadAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setUserAvatar(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleClickImage = (event) => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    setAvatar(props.usuario.image_profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeTel = (e) => {
    setTel(e.target.value);
    formik.setFieldValue('telephone', e.target.value.replace(/\D/g, ''));
    // formik.validateForm()
  };

  const handleChangeCpf = (e) => {
    setCpf(e.target.value);
    formik.setFieldValue('cpf', e.target.value.replace(/\D/g, ''));
    // formik.validateForm()
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editando Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center mt-3">
          <Logo className="rounded-circle mb-3">
            {createObjectURL ? (
              <Image
                src={createObjectURL}
                className="rounded-circle"
                width={170}
                height={170}
                alt="avatar"
              />
            ) : (
              <>
                {avatar ? (
                  <>
                    <img
                      src={`${props.usuario?.image_profile_url}`}
                      className="rounded-circle"
                      width={170}
                      height={170}
                      alt="avatar"
                    />
                  </>
                ) : (
                  <Image
                    src="/assets/images/avatar.png"
                    className="rounded-circle"
                    width={170}
                    height={170}
                    alt="avatar"
                  />
                )}
              </>
            )}
          </Logo>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={uploadAvatar}
            style={{ display: 'none' }}
          />
          <div style={{ width: 205 }}>
            <ButtonWhite onClick={handleClickImage}>
              Alterar foto de perfil
            </ButtonWhite>
          </div>
          <Form className="d-flex flex-column mt-3 col-12 px-5 pb-4 pt-2 justify-content-center">
            <div className="my-2">
              <Form.Control
                type="text"
                name="name"
                placeholder="Nome"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name ? (
                <ErrorText>{formik.errors.name}</ErrorText>
              ) : null}
            </div>
            <div className="my-2">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <ErrorText>{formik.errors.email}</ErrorText>
              ) : null}
            </div>
            <div className="my-2">
              <Form.Control
                type="text"
                name="cpf"
                placeholder="CPF"
                onChange={(e) => handleChangeCpf(e)}
                value={maskCPF(cpf)}
              />
              {formik.errors.cpf ? (
                <ErrorText>{formik.errors.cpf}</ErrorText>
              ) : null}
            </div>
            <div className="my-2">
              <Form.Control
                type="text"
                name="telephone"
                placeholder="Telefone"
                onChange={(e) => handleChangeTel(e)}
                value={maskPhone(tel)}
              />
              {formik.errors.telephone ? (
                <ErrorText>{formik.errors.telephone}</ErrorText>
              ) : null}
            </div>
            <div className="my-3">
              <ButtonPadrao
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}
                disable={!formik.isValid}
              >
                Salvar
              </ButtonPadrao>
            </div>
            <div className="d-flex justify-content-center">
              <Button type="button" onClick={props.onHide}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ModalConfirmacao
        show={modalShowConfirm}
        onHide={() => {
          setModalShowConfirm(false);
          modalStatus && Router.reload();
        }}
        text={
          modalStatus
            ? `Usuário ${formik.values.name} alterado com sucesso!`
            : `Erro ao alterar usuário`
        }
        status={modalStatus}
      />
    </>
  );
}
