import LoginContent from 'src/components/loginContent';
import LoginContainer from 'src/components/loginContainer';
import CardLogin from '../components/cardLogin';
import FormNovaSenha from '../components/formNovaSenha';
import { Header } from '../components/header';

export default function NovaSenha() {
  return (
    <>
      <Header title={'Definir Nova Senha'} />
      <LoginContainer>
        <LoginContent>
          <CardLogin>
            <FormNovaSenha />
          </CardLogin>
        </LoginContent>
      </LoginContainer>
    </>
  );
}
