/* eslint-disable no-useless-escape */
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import ModalLogin from '../modalLogin';
import {
  recuperarSenhaRequest,
  validateAuth,
} from '../../services/login.service';
import { InputLogin, IconMail, A } from './styledComponents';
import ErrorText from '../ErrorText';
import { ButtonLogin } from '../buttons/buttonLogin';

type ValidationErrors = Partial<{ email: string }>;

export default function FormRecuperar(props) {
  const [ModalShowConfirm, setModalShowConfirm] = useState(false);

  const validate = (values) => {
    const errors: ValidationErrors = {};

    if (!values.email) {
      errors.email = 'Este campo é obrigatório';
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email,
      )
    ) {
      errors.email = 'Email com formato inválido';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: async (values) => {
      const { email } = values;
      recuperarSenhaRequest(email);
      setModalShowConfirm(true);
    },
  });

  return (
    <>
      <div className="text-start mb-3">
        <strong>Recuperar Senha</strong>
      </div>
      <Form>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label
            style={{ color: '#7C7C7C' }}
            className="text-start col-12"
          >
            Digite seu email:
          </Form.Label>
          <div className="d-flex align-items-center">
            <InputLogin
              type="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
            />
            <IconMail color={'#7C7C7C'} size={20} />
          </div>
          {formik.errors.email ? (
            <ErrorText>{formik.errors.email}</ErrorText>
          ) : null}
        </Form.Group>
        <ButtonLogin
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          disable={!(formik.isValid && formik.dirty)}
        >
          Enviar Link Para Meu Email
        </ButtonLogin>
      </Form>
      <div className="mt-3">
        <Link href="/login" passHref>
          <A>Cancelar</A>
        </Link>
      </div>
      <ModalLogin
        show={ModalShowConfirm}
        onHide={() => setModalShowConfirm(false)}
        text={
          'Se esse email estiver cadastrado no sistema, enviaremos um link para a redefinição de senha.'
        }
      />
    </>
  );
}
