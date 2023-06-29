import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdCheckCircleOutline, MdHighlightOff } from 'react-icons/md';
import { ButtonPadrao } from 'src/components/buttons/buttonPadrao';
import { confirmarNovaSenhaRequestLogged } from 'src/services/login.service';
import { parseCookies } from 'src/utils/cookies';
import ErrorText from '../ErrorText';
import ModalConfirmacao from '../modalConfirmacao';
import {
  BoxItem,
  BoxPassword,
  Button,
  ButtonEye,
  InputLogin,
} from './styledComponents';

type ValidationErrors = Partial<{
  password: string;
  newPassword: string;
  confirm: string;
}>;

export default function ModalTrocarSenha(props) {
  const [show, setShow] = useState(false);
  const [modalShowConfirm, setModalShowConfirm] = useState(false);
  const [disable, setDisable] = useState(true);
  const [inputType1, setInputType1] = useState('password');
  const [inputType2, setInputType2] = useState('password');
  const [inputType3, setInputType3] = useState('password');
  const [messageError, setMessageError] = useState('');
  const [error, setError] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const cookies = parseCookies();
  const [modalStatus, setModalStatus] = useState(true);

  const handleClose = () => setShow(false);

  const [checkPassword, setCheckPassword] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const validate = (values) => {
    const errors: ValidationErrors = {};

    verifyPassword(values.password);

    let passwordOk = true;
    checkPassword.map((x) => {
      if (!x) {
        passwordOk = false;
      }
    });

    if (!passwordOk) {
      errors.password = 'Senha inválida';
    }
    if (!values.confirm) {
      errors.confirm = 'Este campo é obrigatório';
    } else if (values.confirm != values.password) {
      errors.confirm = 'As senhas não estão iguais!';
    }
    return errors;
  };

  const verifyPassword = (value) => {
    const letrasMaiusculas = /[A-Z]/;
    const letrasMinusculas = /[a-z]/;
    const numeros = /[0-9]/;
    const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    const checksTemp = checkPassword;
    if (value.length > 7 && value.length < 16) {
      checksTemp[0] = true;
    } else {
      checksTemp[0] = false;
    }
    if (letrasMaiusculas.test(value)) {
      checksTemp[1] = true;
    } else {
      checksTemp[1] = false;
    }
    if (letrasMinusculas.test(value)) {
      checksTemp[2] = true;
    } else {
      checksTemp[2] = false;
    }
    if (numeros.test(value)) {
      checksTemp[3] = true;
    } else {
      checksTemp[3] = false;
    }
    if (caracteresEspeciais.test(value)) {
      checksTemp[4] = true;
    } else {
      checksTemp[4] = false;
    }
    setCheckPassword(checksTemp);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm: '',
    },
    validate,
    onSubmit: async (values) => {
      const { password } = values;

      const email = props.usuario.email;

      const response = await confirmarNovaSenhaRequestLogged(
        password,
        oldPassword,
      );
      if (response.status === 200) {
        setModalStatus(true);
        setModalShowConfirm(true);
        setMessageError(null);
      } else {
        setModalStatus(false);
        setMessageError(response.data.message);
        setModalShowConfirm(true);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(formik.errors).length != 0 || checkPassword[0] === false) {
      setDisable(true);
      // disable = false
    } else {
      setDisable(false);
      // disable = true
    }
  }, [formik.errors.password, formik.errors.confirm]);

  const handleChangeInputType1 = () => {
    if (inputType1 === 'password') setInputType1('text');
    else setInputType1('password');
  };
  const handleChangeInputType2 = () => {
    if (inputType2 === 'password') setInputType2('text');
    else setInputType2('password');
  };
  const handleChangeInputType3 = () => {
    if (inputType3 === 'password') setInputType3('text');
    else setInputType3('password');
  };

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Redefinir Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Form className="col-8">
            <Form.Group className="mb-3" controlId="formBasicOld">
              <Form.Label className="text-start ">Senha Atual:</Form.Label>
              <div className="d-flex align-items-center">
                <InputLogin
                  type={inputType1}
                  name="oldPassword"
                  placeholder="Senha Atual"
                  onChange={handleChangeOldPassword}
                />
                {inputType1 === 'password' ? (
                  <ButtonEye type="button" onClick={handleChangeInputType1}>
                    <AiOutlineEye size={24} />
                  </ButtonEye>
                ) : (
                  <ButtonEye type="button" onClick={handleChangeInputType1}>
                    <AiOutlineEyeInvisible size={24} />
                  </ButtonEye>
                )}
              </div>
              <div>{error ? <ErrorText>{error}</ErrorText> : null}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNew">
              <Form.Label className="text-start ">
                Informe sua nova senha:
              </Form.Label>
              <div className="d-flex align-items-center">
                <InputLogin
                  type={inputType2}
                  name="password"
                  placeholder="Nova Senha"
                  onChange={formik.handleChange}
                />
                {inputType2 === 'password' ? (
                  <ButtonEye type="button" onClick={handleChangeInputType2}>
                    <AiOutlineEye size={24} />
                  </ButtonEye>
                ) : (
                  <ButtonEye type="button" onClick={handleChangeInputType2}>
                    <AiOutlineEyeInvisible size={24} />
                  </ButtonEye>
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="d-flex align-items-center">
                <InputLogin
                  type={inputType3}
                  name="confirm"
                  placeholder="Confirme Nova Senha"
                  onChange={formik.handleChange}
                />
                {inputType3 === 'password' ? (
                  <ButtonEye type="button" onClick={handleChangeInputType3}>
                    <AiOutlineEye size={24} />
                  </ButtonEye>
                ) : (
                  <ButtonEye type="button" onClick={handleChangeInputType3}>
                    <AiOutlineEyeInvisible size={24} />
                  </ButtonEye>
                )}
              </div>
              {formik.errors.confirm ? (
                <ErrorText>{formik.errors.confirm}</ErrorText>
              ) : null}
            </Form.Group>
            <BoxPassword>
              <div className="">Sua senha precisa de:</div>
              <BoxItem className="">
                {checkPassword[0] ? (
                  <MdCheckCircleOutline color={'#64BC47'} />
                ) : (
                  <MdHighlightOff color={'#FF6868'} />
                )}{' '}
                No mínimo 8 e no máximo 15 caracteres
              </BoxItem>
              <BoxItem className="">
                {checkPassword[1] ? (
                  <MdCheckCircleOutline color={'#64BC47'} />
                ) : (
                  <MdHighlightOff color={'#FF6868'} />
                )}{' '}
                Uma letra maiúscula
              </BoxItem>
              <BoxItem className="">
                {checkPassword[2] ? (
                  <MdCheckCircleOutline color={'#64BC47'} />
                ) : (
                  <MdHighlightOff color={'#FF6868'} />
                )}{' '}
                Uma letra minúscula
              </BoxItem>
              <BoxItem className="">
                {checkPassword[3] ? (
                  <MdCheckCircleOutline color={'#64BC47'} />
                ) : (
                  <MdHighlightOff color={'#FF6868'} />
                )}{' '}
                Um número
              </BoxItem>
              <BoxItem className=" mb-3">
                {checkPassword[4] ? (
                  <MdCheckCircleOutline color={'#64BC47'} />
                ) : (
                  <MdHighlightOff color={'#FF6868'} />
                )}{' '}
                Um símbolo especial como @ ^ ~ #
              </BoxItem>
            </BoxPassword>
            <ButtonPadrao
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
              disable={!(formik.isValid && formik.dirty)}
            >
              Salvar
            </ButtonPadrao>
            <div className="d-flex justify-content-center mt-2">
              <Button onClick={handleClose}>Cancelar</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ModalConfirmacao
        show={modalShowConfirm}
        onHide={() => {
          // if (modalStatus) {
          //   handleClose();
          // }
          setModalShowConfirm(false);
        }}
        text={modalStatus ? `Nova senha redefinida com sucesso.` : messageError}
        status={modalStatus}
      />
    </>
  );
}
