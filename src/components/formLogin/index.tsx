/* eslint-disable no-useless-escape */
import * as React from 'react';
import { Form } from 'react-bootstrap';
import Link from 'next/link';
import { useFormik } from 'formik';
import {
  InputLogin,
  IconMail,
  A,
  IconEye,
  IconEyeSlash,
} from './styledComponents';
import ErrorText from '../ErrorText';
import { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import { ButtonLogin } from '../buttons/buttonLogin';

type ValidationErrors = Partial<{ email: string; password: string }>;

export default function FormLogin(props) {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();

  const validate = (values) => {
    const errors: ValidationErrors = {};

    if (!values.email) {
      errors.email = 'Email é obrigatório';
    } else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email,
      )
    ) {
      errors.email = 'Email com formato inválido';
    }
    if (!values.password) {
      errors.password = 'Senha é obrigatória';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      const response = await signIn(values);
      if (response.status != 200) {
        setError('Usuário ou senha inválidos, revise os dados');
        // setError(response.message);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="d-flex align-items-center">
            <InputLogin
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
            />
            <IconMail color={'#7C7C7C'} size={20} />
          </div>
          {formik.errors.email ? (
            <ErrorText>{formik.errors.email}</ErrorText>
          ) : null}
          {error ? <ErrorText>{error}</ErrorText> : null}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <div className="d-flex align-items-center">
            <InputLogin
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Senha"
              onChange={formik.handleChange}
            />
            {showPassword ? (
              <button type="button" onClick={() => setShowPassword(false)}>
                <IconEyeSlash size={22} />
              </button>
            ) : (
              <button type="button" onClick={() => setShowPassword(true)}>
                <IconEye size={22} />
              </button>
            )}
          </div>
          {formik.errors.password ? (
            <ErrorText>{formik.errors.password}</ErrorText>
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
          Entrar
        </ButtonLogin>
      </Form>
      <div className="mt-3">
        <Link href="/recuperar-senha" passHref>
          <A>Esqueci Minha Senha</A>
        </Link>
      </div>
    </>
  );
}
