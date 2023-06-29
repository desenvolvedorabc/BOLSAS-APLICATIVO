import * as React from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import {
  ButtonGroupBetween,
  Card,
  InputGroup3,
  InputGroup4,
} from 'src/shared/styledForms';
import ButtonWhite from 'src/components/buttons/buttonWhite';
import { createUser, editUser, IUserForm } from 'src/services/usuarios.service';
import ErrorText from 'src/components/ErrorText';
import ModalConfirmacao from 'src/components/modalConfirmacao';
import { useEffect, useState } from 'react';
import { maskCPF, maskPhone } from 'src/utils/masks';
import ModalPergunta from 'src/components/modalPergunta';
import ButtonVermelho from 'src/components/buttons/buttonVermelho';
import Router from 'next/router';
import { isValidCPF } from 'src/utils/validate';
import { Autocomplete, TextField } from '@mui/material';
import InputFile from 'src/components/InputFile';
import { getStates } from 'src/services/estados-parceiro.service';

type ValidationErrors = Partial<{
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  idPartnerState: string;
}>;

export function FormEditUsuarioEstado({ usuario }) {
  const [modalShowConfirm, setModalShowConfirm] = useState(false);
  const [modalShowQuestion, setModalShowQuestion] = useState(false);
  const [modalShowConfirmQuestion, setModalShowConfirmQuestion] =
    useState(false);
  const [active, setActive] = useState(usuario?.active);
  const [modalStatus, setModalStatus] = useState(true);
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(usuario?.partner_state);
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [tel, setTel] = useState(usuario?.telephone);
  const [cpf, setCpf] = useState(usuario?.cpf);

  const loadStates = async () => {
    const resp = await getStates(null, 1, 99999, 'ASC', '1');
    if (resp.data.items) setStateList(resp.data.items);
  };

  useEffect(() => {
    loadStates();
  }, []);

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
      // eslint-disable-next-line no-useless-escape
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
    if (!values.idPartnerState) {
      errors.idPartnerState = 'Campo obrigatório';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: usuario?.name,
      email: usuario?.email,
      cpf: usuario?.cpf,
      telephone: usuario?.telephone,
      active: usuario?.active,
      image_profile: usuario?.image_profile,
      role: 'ESTADO',
      idPartnerState: usuario?.partner_state?.id,
    },
    validate,
    onSubmit: async (values) => {
      let file = null;
      if (avatar) {
        file = new FormData();
        file.append('avatar', avatar);
      }
      values.cpf = values.cpf.replace(/\D/g, '');
      values.telephone = values.telephone.replace(/\D/g, '');

      let response;
      if (usuario) {
        response = await editUser(usuario?.id, values, file);
      } else response = await createUser(values, file);
      if (response.status === 200 || response.status === 201) {
        setModalStatus(true);
        setModalShowConfirm(true);
        setErrorMessage('');
      } else {
        setModalStatus(false);
        setModalShowConfirm(true);
        setErrorMessage(response.data.message);
      }
    },
  });

  async function changeUser() {
    setModalShowQuestion(false);
    const data: IUserForm = {
      name: usuario?.name,
      email: usuario?.email,
      cpf: usuario?.cpf,
      telephone: usuario?.telephone,
      active: !usuario?.active,
      image_profile: usuario?.image_profile,
      role: 'ESTADO',
      idPartnerState: usuario?.partner_state?.id,
    };

    const response = await editUser(usuario?.id, data, null);
    if (response.status === 200 && response.data.name === usuario?.name) {
      setActive(usuario?.active);
      setModalShowConfirmQuestion(true);
    } else {
      setModalStatus(false);
      setModalShowConfirmQuestion(true);
    }
  }

  const handleSelectState = (newValue) => {
    setSelectedState(newValue);
    formik.setFieldValue('idPartnerState', newValue?.id);
  };

  const onFileChange = (e) => {
    setAvatar(e.target.value);
  };

  function hideConfirm() {
    setModalShowConfirm(false);
    if (!errorMessage?.trim()) {
      formik.resetForm();
      Router.back();
      return true;
    }
    // if (modalStatus) Router.reload();
  }

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

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
      <Card>
        <div className="mb-3">
          <strong>
            {usuario ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </strong>
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onKeyDown={onKeyDown}
        >
          <div>Dados Pessoais</div>
          <InputGroup3>
            <div>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.name ? (
                <ErrorText>{formik.errors.name}</ErrorText>
              ) : null}
            </div>
            <div>
              <TextField
                fullWidth
                label="Email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                size="small"
              />
              {formik.errors.email ? (
                <ErrorText>{formik.errors.email}</ErrorText>
              ) : null}
            </div>
          </InputGroup3>
          <InputGroup3>
            <div>
              <TextField
                fullWidth
                label="Telefone"
                name="telephone"
                id="telephone"
                value={maskPhone(tel)}
                onChange={(e) => handleChangeTel(e)}
                size="small"
                inputProps={{ maxLength: 14 }}
              />
              {formik.errors.telephone ? (
                <ErrorText>{formik.errors.telephone}</ErrorText>
              ) : null}
            </div>
            <div>
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                id="cpf"
                value={maskCPF(cpf)}
                onChange={(e) => handleChangeCpf(e)}
                size="small"
                inputProps={{ maxLength: 14 }}
              />
              {formik.errors.cpf ? (
                <ErrorText>{formik.errors.cpf}</ErrorText>
              ) : null}
            </div>
          </InputGroup3>
          <InputGroup4>
            <div>
              <div style={{ marginBottom: 20 }}>Estado</div>
              <Autocomplete
                id="size-small-outlined"
                size="small"
                noOptionsText="Selecione um Estado"
                value={selectedState}
                options={stateList}
                getOptionLabel={(option) => option.name}
                onChange={(_event, newValue) => {
                  handleSelectState(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    label="Selecione um Estado"
                  />
                )}
              />
              {formik.errors.idPartnerState ? (
                <ErrorText>{formik.errors.idPartnerState}</ErrorText>
              ) : null}
            </div>
            <div>
              <div style={{ marginBottom: 20 }}>Foto de Perfil</div>
              <InputFile
                label="Foto"
                onChange={(e) => onFileChange(e)}
                error={formik.touched.image_profile}
                acceptFile={'image/*'}
              />
            </div>
          </InputGroup4>
          <ButtonGroupBetween style={{ marginTop: 30 }}>
            {usuario ? (
              <div>
                {formik.values.active ? (
                  <ButtonVermelho
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShowQuestion(true);
                    }}
                  >
                    Desativar
                  </ButtonVermelho>
                ) : (
                  <ButtonPadrao
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShowQuestion(true);
                    }}
                  >
                    Ativar
                  </ButtonPadrao>
                )}
              </div>
            ) : (
              <div></div>
            )}
            <div className="d-flex">
              <div style={{ width: 160 }}>
                <ButtonWhite
                  onClick={(e) => {
                    e.preventDefault();
                    Router.back();
                  }}
                >
                  Cancelar
                </ButtonWhite>
              </div>
              <div className="ms-3" style={{ width: 160 }}>
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
            </div>
          </ButtonGroupBetween>
        </Form>
      </Card>
      <ModalConfirmacao
        show={modalShowConfirm}
        onHide={() => {
          hideConfirm();
        }}
        text={
          modalStatus
            ? usuario
              ? `Usuário ${formik.values.name} alterado com sucesso!`
              : `Usuário ${formik.values.name} criado com sucesso!`
            : errorMessage
        }
        status={modalStatus}
      />
      <ModalPergunta
        show={modalShowQuestion}
        onHide={() => setModalShowQuestion(false)}
        onConfirm={() => changeUser()}
        buttonNo={!active === true ? 'Não Ativar' : 'Não Desativar'}
        buttonYes={'Sim, Tenho Certeza'}
        text={`Você está ${
          !active === true ? 'ativando' : 'desativando'
        } o(a) “${formik.values.name}”. \nVocê pode pode ${
          active === true ? 'ativar' : 'desativar'
        } novamente a qualquer momento.`}
        status={!active}
        size="lg"
      />
      <ModalConfirmacao
        show={modalShowConfirmQuestion}
        onHide={() => {
          setModalShowConfirmQuestion(false);
          Router.reload();
        }}
        text={
          modalStatus
            ? `${formik.values.name} ${
                active === true ? 'desativado' : 'ativado'
              } com sucesso!`
            : `Erro ao ${active === true ? 'ativar' : 'desativar'} ${
                formik.values.name
              }`
        }
        status={modalStatus}
      />
    </>
  );
}
