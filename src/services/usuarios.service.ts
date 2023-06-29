import axios from 'axios';
import { parseCookies } from 'src/utils/cookies';

const cookies = parseCookies();
const token = cookies['__session'];

export type IUserForm = {
  name: string;
  email: string;
  telephone: string;
  role?: 'PARC' | 'ESTADO';
  image_profile: string;
  cpf: string;
  active: boolean;
  access_profile?: string;
  idPartnerState?: number;
};

export type IGetUser = {
  search: string;
  page: number;
  limit: number;
  order: string;
  status: string;
  profile?: string;
  role?: 'PARC' | 'ESTADO';
  partnerState?: number;
};

export async function getUsers(params: IGetUser) {
  params = {
    ...params,
    role: params.role ? params.role : 'PARC',
  };
  // const resp = await axios.get("/api/user", { params });
  const resp = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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
        status: 400,
        data: {
          message: 'Erro ao pesquisar usuários',
        },
      };
    });
  return resp;
}

export async function createUser(data: IUserForm, avatar: FormData) {
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, data, {
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
        status: 400,
        data: {
          message: error.response.data.message,
        },
      };
    });
  // const response = await axios.post("/api/user/create", { data });
  if (avatar && avatar.getAll('avatar').length > 0) {
    await axios.post(
      `/api/user/upload/avatar/${token}/${response.data.id}`,
      avatar,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }
  return response;
}

export async function editUser(id: number, data: IUserForm, avatar: FormData) {
  if (avatar && avatar.getAll('avatar').length > 0) {
    const response = await axios.post(
      `/api/user/upload/avatar/${token}/${id}`,
      avatar,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('responseEdit', response);
    if (response.data?.status != 401) data.image_profile = response.data;
  }

  const responseUpdate = await axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, data, {
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
        status: 400,
        data: {
          message: 'Erro ao alterar usuários',
        },
      };
    });
  console.log('responseUpdate', responseUpdate);
  return responseUpdate;
}

export async function getUser(id: number) {
  // return await axios.get(`/api/user/${id}?token=${token}`);
  const resp = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
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
        status: 400,
        data: {
          message: 'Erro ao pesquisar usuários',
        },
      };
    });
  return resp;
}

export async function resendEmailPassword(id: number) {
  const response = await axios.post(`/api/user/resendEmail/${id}`);
  return response;
}

export type PaginationParams = {
  search?: string;
  page: number;
  limit: number;
  order: string;
  status?: string;
  column?: string;
  profile?: string;
  role?: 'PARC' | 'ESTADO';
  partnerState?: number;
};

export async function getExportUsersExcel(params: PaginationParams) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/reports/excel`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  });
}

export async function getExportUsersStateExcel(params: PaginationParams) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/state/reports/excel`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    },
  );
}
