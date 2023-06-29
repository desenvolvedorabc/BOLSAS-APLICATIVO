import axios from 'axios';
import { parseCookies } from 'src/utils/cookies';

const cookies = parseCookies();
const token = cookies['__session'];

export async function getAllNotifications() {
  const params = { token };

  return axios.get('/api/notification/all', { params });
}

export async function getNotifications(page: number, limit: number) {
  const params = { token, page, limit };

  return axios.get('/api/notification', { params });
}

// export async function createNotification(data: unknown) {
//   data = {
//     ...data,
//     token,
//   };
//   const response = axios.post('/api/notification/create', { data });
//   return response;
// }

// export async function editNotification(id: string, data: unknown) {
//   data = {
//     ...data,
//     token,
//   };
//   return axios.put(`/api/notification/edit/${id}`, { data });
// }

export async function deleteNotification(id: string) {
  const data = {
    token,
  };
  return axios.delete(`/api/notification/${id}`, { data });
}

export async function getNotification(id) {
  return axios.get(`/api/notification/${id}?token=${token}`);
}
