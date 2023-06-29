import Head from 'next/head';
import CardLogin from '../components/cardLogin';
import FormRecuperar from '../components/formRecuperar';
import LoginContainer from 'src/components/loginContainer';
import LoginContent from 'src/components/loginContent';
import { Header } from 'src/components/header';

export default function Home() {
  return (
    <>
      <Header title={'Recuperar a senha'} />
      <LoginContainer>
        <LoginContent>
          <CardLogin>
            <FormRecuperar />
          </CardLogin>
        </LoginContent>
      </LoginContainer>
    </>
  );
}
