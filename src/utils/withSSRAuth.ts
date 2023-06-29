import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'src/utils/cookies';

import { IUser } from 'src/context/AuthContext';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import { validateUserPermissions } from './validateUserPermissions';

type WithSSRAuthOptions = {
  roles: string[];
  profiles?: string[];
};

// type User = {
//   USU_SPE: {
//     SPE_ID: string;
//     SPE_NOME: string;
//   };
// };

type UserArea = {
  ARE_NOME: string;
  ARE_DESCRICAO: string;
  ARE_ID: string;
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options: WithSSRAuthOptions,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['__session'];

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (options) {
      const userCookie = cookies['USUARIO'];
      const user = JSON.parse(userCookie) as IUser;
      // const user = {} as IUser

      const { roles, profiles } = options;

      // const { data } = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_URL}/profiles/areas/${user?.access_profile?.id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      const data = null;

      const areas = data?.AREAS as UserArea[];

      const userHasValidPermissions = validateUserPermissions({
        user,
        areas,
        roles,
        profiles,
      });

      if (!userHasValidPermissions) {
        const destination = '/';

        return {
          redirect: {
            destination,
            permanent: false,
          },
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '__session');

        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
    }
  };
}
