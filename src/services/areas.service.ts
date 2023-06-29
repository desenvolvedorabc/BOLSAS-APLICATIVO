import axios from 'axios';
import { parseCookies } from 'src/utils/cookies';

const cookies = parseCookies();
const token = cookies['__session'];

export async function getAllAreas() {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile/areas/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
