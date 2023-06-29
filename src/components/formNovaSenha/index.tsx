import { Form } from 'react-bootstrap';
import { MdCheckCircleOutline, MdHighlightOff } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { confirmarNovaSenhaRequest } from '../../services/login.service';
import Router, { useRouter } from 'next/router';
import {
  InputLogin,
  BoxPassword,
  BoxItem,
  TitlePassword,
  IconEyeSlash,
  IconEye,
} from './styledComponents';
import ErrorText from '../ErrorText';
import { ButtonLogin } from '../buttons/buttonLogin';
import ModalConfirmacao from '../modalConfirmacao';

type ValidationErrors = Partial<{ password: string; confirm: string }>;

export default function FormNovaSenha(props) {
  const { query } = useRouter();
  const [disable, setDisable] = useState(true);
  const [ModalShowConfirm, setModalShowConfirm] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      const token = query.token;
      const { password } = values;
      const response = await confirmarNovaSenhaRequest(token, password);
      const { data } = response;
      if (response.status === 201) {
        setModalShowConfirm(true);
        setModalStatus(true);
        setModalMessage(
          'Sua nova senha foi criada, agora você pode fazer o login',
        );
      } else {
        setModalShowConfirm(true);
        setModalStatus(false);
        setModalMessage(response.data.message);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.errors.password, formik.errors.confirm]);

  return (
    <>
      <div className="text-start mb-3">
        <strong>Definir nova senha</strong>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-start col-12">
            Informe sua nova senha:
          </Form.Label>
          <div className="d-flex align-items-center">
            <InputLogin
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Nova Senha"
              onChange={formik.handleChange}
            />
            {showPassword ? (
              <button type="button" onClick={() => setShowPassword(false)}>
                <IconEyeSlash size={16} />
              </button>
            ) : (
              <button type="button" onClick={() => setShowPassword(true)}>
                <IconEye size={16} />
              </button>
            )}
          </div>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <div className="d-flex align-items-center">
            <InputLogin
              type={showConfirm ? 'text' : 'password'}
              name="confirm"
              placeholder="Confirme Nova Senha"
              onChange={formik.handleChange}
            />
            {showConfirm ? (
              <button type="button" onClick={() => setShowConfirm(false)}>
                <IconEyeSlash size={16} />
              </button>
            ) : (
              <button type="button" onClick={() => setShowConfirm(true)}>
                <IconEye size={16} />
              </button>
            )}
          </div>
          {formik.errors.confirm ? (
            <ErrorText>{formik.errors.confirm}</ErrorText>
          ) : null}
        </Form.Group>
        <BoxPassword>
          <TitlePassword className="col-12">
            Sua senha precisa de:
          </TitlePassword>
          <BoxItem className="col-12">
            {checkPassword[0] ? (
              <MdCheckCircleOutline color={'#64BC47'} />
            ) : (
              <MdHighlightOff color={'#FF6868'} />
            )}{' '}
            No mínimo 8 e no máximo 15 caracteres
          </BoxItem>
          <BoxItem className="col-12">
            {checkPassword[1] ? (
              <MdCheckCircleOutline color={'#64BC47'} />
            ) : (
              <MdHighlightOff color={'#FF6868'} />
            )}{' '}
            Uma letra maiúscula
          </BoxItem>
          <BoxItem className="col-12">
            {checkPassword[2] ? (
              <MdCheckCircleOutline color={'#64BC47'} />
            ) : (
              <MdHighlightOff color={'#FF6868'} />
            )}{' '}
            Uma letra minúscula
          </BoxItem>
          <BoxItem className="col-12">
            {checkPassword[3] ? (
              <MdCheckCircleOutline color={'#64BC47'} />
            ) : (
              <MdHighlightOff color={'#FF6868'} />
            )}{' '}
            Um número
          </BoxItem>
          <BoxItem className="col-12">
            {checkPassword[4] ? (
              <MdCheckCircleOutline color={'#64BC47'} />
            ) : (
              <MdHighlightOff color={'#FF6868'} />
            )}{' '}
            Um símbolo especial como @ ^ ~ #
          </BoxItem>
        </BoxPassword>
        <ButtonLogin
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          disable={!(formik.isValid && formik.dirty)}
        >
          Salvar
        </ButtonLogin>
      </Form>
      <ModalConfirmacao
        show={ModalShowConfirm}
        onHide={() => {
          setModalShowConfirm(false), modalStatus && Router.push('/login');
        }}
        status={modalStatus}
        text={modalMessage}
      />
    </>
  );
}
