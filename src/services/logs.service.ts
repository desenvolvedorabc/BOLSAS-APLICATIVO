import axios from 'axios';
import { parseCookies } from 'src/utils/cookies';

const cookies = parseCookies();
const token = cookies['__session'];

export async function getLogs(
  search: string,
  page: number,
  limit: number,
  column: string,
  order: string,
  initialDate: string,
  finalDate: string,
  method: string,
  entity: string,
  origin: string,
) {
  const params = {
    token,
    search,
    page,
    limit,
    column,
    order,
    initialDate,
    finalDate,
    method,
    entity,
    origin,
  };

  const resp = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/system-logs`, {
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

export async function getLog(id: number) {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/system-logs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // .then((response) => {
  //   console.log("response: ", response);
  //   return response;
  // })
  // .catch((error) => {
  //   console.log("error: ", error);
  //   return {
  //     status: 400,
  //     data: {
  //       message: "Erro ao pesquisar log",
  //     },
  //   };
  // });
  return resp;
}

export type PaginationParams = {
  page: number;
  limit: number;
  search?: string;
  order: string;
  method?: string;
  column?: string;
  entity?: string;
  origin?: string;
  initialDate?: Date;
  finalDate?: Date;
};

export async function getExportLog(params: PaginationParams) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/system-logs/reports/excel`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    },
  );
  // .then((response) => response.blob());
  // .then((response) => {
  //   console.log("response: ", response);
  //   return response;
  // })
  // .catch((error) => {
  //   console.log("error: ", error);
  //   return {
  //     status: 400,
  //     data: {
  //       message: "Erro ao pesquisar log",
  //     },
  //   };
  // });
  // return resp;
}
