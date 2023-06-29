import axios from 'axios';
import Router from 'next/router';
import { parseCookies } from 'src/utils/cookies';

const cookies = parseCookies();
const token = cookies['__session'];

export function validateAuth() {
  if (token) {
    Router.push('/');
  }
}

export async function confirmarNovaSenhaRequest(
  token: string | string[],
  password: string,
) {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      token,
      password,
    })
    .then((response) => {
      console.log('response: ', response);
      return response;
    })
    .catch((error) => {
      console.log('error: ', error);
      return {
        status: 401,
        data: {
          message:
            'Link de redefinição de senha expirado. Por favor, solicite outro.',
        },
      };
    });
  console.log('response', response);
  return response;
}

export async function confirmarNovaSenhaRequestLogged(
  password: string,
  currentPassword: string,
) {
  const cookies = parseCookies();
  const token = cookies['__session'];

  console.log('password', password);
  console.log('currentPassword', currentPassword);
  return axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
      { password, currentPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => {
      console.log('response: ', response);
      return response;
    })
    .catch((error) => {
      console.log('error: ', error);
      console.log('errorResp: ', error.response.data);
      return {
        status: 400,
        data: {
          message: error.response.data.message,
        },
      };
    });
}

export async function recuperarSenhaRequest(email: string) {
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, { email })
    .then((response) => {
      console.log('response: ', response);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
}
