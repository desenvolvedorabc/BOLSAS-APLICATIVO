import axios from 'axios';
import Router from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from 'src/services/api';
import { destroyCookie, parseCookies, setCookie } from 'src/utils/cookies';

export type IUser = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  telephone: string;
  role: string;
  image_profile: string;
  cpf: string;
  active: boolean;
  isChangePasswordWelcome: boolean;
  access_profile: IAcessProfile;
  image_profile_url: string;
};

type IAcessProfile = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  active: boolean;
};

type ILogin = {
  access_token: string;
  expires_in: string;
  status: number;
  message: string;
};

type AuthContextData = {
  signIn(values): Promise<ILogin>;
  signOut: () => void;
  user: IUser;
  changeUser: (values: IUser) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(null, 'USUARIO', {
    path: '/',
  });
  destroyCookie(null, '__session', {
    path: '/',
  });
  destroyCookie(null, 'USU_RETRY', {
    path: '/',
  });

  // authChannel.postMessage('signOut');

  Router.push('/login');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        case 'signIn':
          Router.push('/');
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { __session: token, USUARIO: user } = parseCookies();

    if (token) {
      // const decodeToken = jwt_decode(token) as any;
      setUser(JSON.parse(user));
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  async function signIn(values) {
    let response;

    try {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/parc`,
        values,
      );
    } catch (error) {
      console.log('error: ', error);
      return error;
    }

    if (response.status !== 201) {
      return response;
    }

    const token = response.data.token;
    let user = response.data.user as IUser;

    setCookie(null, '__session', token, {
      path: '/',
      maxAge: 28880,
    });

    user = {
      ...user,
      image_profile_url: `${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${user?.image_profile}`,
    };

    setUser(user);

    setCookie(null, 'USUARIO', JSON.stringify(user), {
      path: '/',
    });

    setCookie(null, 'USU_RETRY', '0', {
      path: '/',
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    Router.push('/');

    authChannel.postMessage('signIn');
  }

  function changeUser(user: IUser) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, changeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
