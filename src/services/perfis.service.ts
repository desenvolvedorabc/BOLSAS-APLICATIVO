import axios from 'axios';
import { parseCookies } from 'src/utils/cookies';

const cookies = parseCookies();
const token = cookies['__session'];

export type IPerfil = {
  id: number;
  name: string;
  areas?: {
    id: number;
    name: string;
    tags: string;
  };
  createdByUser?: {
    id: number;
    name: string;
  };
  active: boolean;
};

export async function getPerfis(
  search: string,
  page: number,
  limit: number,
  order: string,
) {
  const params = { search, page, limit, order };
  const resp = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          message: 'Erro ao pesquisar perfil',
        },
      };
    });
  console.log(resp);

  return resp;
}

export async function getAllPerfis() {
  const params = { token };
  return axios.get('/api/perfil', { params });
}

export async function createPerfil(data: IPerfil) {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          message: error.response.data.message,
        },
      };
    });
  return response;
}

export async function editPerfil(id: number, data: IPerfil) {
  return axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/profile/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          message: error.response.data.message,
        },
      };
    });
}

export async function getPerfil(id: number) {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          message: 'Erro ao pesquisar perfil',
        },
      };
    });
}
