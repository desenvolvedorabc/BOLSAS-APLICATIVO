import { GetServerSideProps } from 'next';
import { Header } from 'src/components/header';
import LoginContainer from 'src/components/loginContainer';
import LoginContent from 'src/components/loginContent';
import { parseCookies } from 'src/utils/cookies';
import CardLogin from '../components/cardLogin';
import FormLogin from '../components/formLogin';

export default function Home() {
  return (
    <>
      <Header title={'Login'} />
      <LoginContainer>
        <LoginContent>
          <CardLogin>
            <FormLogin />
          </CardLogin>
        </LoginContent>
      </LoginContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies['__session']) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
