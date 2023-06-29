import axios from 'axios';
import { parseCookies } from 'src/utils/cookies';
import { api } from './api';

const cookies = parseCookies();
const token = cookies['__session'];

export type IState = {
  id?: number;
  name: string;
  cod_ibge: string;
  abbreviation: string;
  active?: boolean;
  logo: string;
  color: string;
};

export async function getStates(
  search: string,
  page: number,
  limit: number,
  order: string,
  status: string,
) {
  const params = { search, page, limit, order, status };
  // const resp = await axios.get("/api/partner-states", { params });
  const resp = await api
    .get(`/partner-states`, {
      params,
    })
    .then((response) => {
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

export async function createState(data: IState, avatar: FormData) {
  data = {
    ...data,
  };
  const response = await api
    .post(`${process.env.NEXT_PUBLIC_API_URL}/partner-states`, data, {})
    .then((response) => {
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
  if (avatar && avatar.getAll('avatar').length > 0) {
    await axios.post(
      `/api/state/upload/avatar/${token}/${response.data.id}`,
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

export async function editState(id: number, data: IState, avatar: FormData) {
  const responseUpdate = await api
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/partner-states/${id}`, data)
    .then((response) => {
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

  if (
    avatar &&
    avatar.getAll('avatar').length > 0 &&
    responseUpdate.status === 200
  ) {
    const response = await axios.post(
      `/api/state/upload/avatar/${token}/${id}`,
      avatar,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }
  return responseUpdate;
}

export async function getState(id: number) {
  // return await api.get(`/api/partner-states/${id}?token=${token}`);
  const resp = await api.get(
    `${process.env.NEXT_PUBLIC_API_URL}/partner-states/${id}`,
  );
  return resp;
}

export async function resendEmailPassword(id: number) {
  const response = await api.post(`/api/partner-states/resendEmail/${id}`);
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

export async function getExportExcelPartnerState(params: PaginationParams) {
  return api.get(
    `${process.env.NEXT_PUBLIC_API_URL}/partner-states/reports/excel`,
    {
      params,
      responseType: 'blob',
    },
  );
}

export async function getStateSlug(state: string) {
  const resp = await api.get(
    `${process.env.NEXT_PUBLIC_API_URL}/partner-states/slug/${state}`,
  );
  return resp;
}
