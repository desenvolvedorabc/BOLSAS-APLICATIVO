import axios from 'axios';
import { parseCookies } from 'src/utils/cookies';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${cookies['__session']}`,
  },
});
