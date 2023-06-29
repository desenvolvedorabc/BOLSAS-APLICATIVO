import { destroyCookie } from 'src/utils/cookies';

export const destroyCookies = () => {
  destroyCookie(null, 'USU_NOME');
  destroyCookie(null, 'USU_EMAIL');
  destroyCookie(null, 'USU_CARGO');
  destroyCookie(null, 'USU_AVATAR');
  destroyCookie(null, 'USU_AVATAR_URL');
  destroyCookie(null, '__session');
  destroyCookie(null, 'USU_ID');
  destroyCookie(null, 'USU_SPE');
  destroyCookie(null, 'USU_RETRY');
};
