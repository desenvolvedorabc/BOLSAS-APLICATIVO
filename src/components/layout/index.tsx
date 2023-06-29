import { Header } from 'src/components/header';
import Navigation from 'src/components/navigation';
import { useAuth } from 'src/context/AuthContext';
import { parseCookies } from 'src/utils/cookies';

export default function Layout({ children, ...props }) {
  const { user } = useAuth();

  const { USUARIO: userCookie } = parseCookies();

  return (
    <div>
      <Header title={props.header} />
      <div className="d-flex">
        {!!userCookie && <Navigation userInfo={JSON?.parse(userCookie)} />}
        <main style={{ width: '100%' }}>{children}</main>
      </div>
    </div>
  );
}
