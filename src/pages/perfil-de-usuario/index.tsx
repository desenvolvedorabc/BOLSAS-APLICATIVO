import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import FormEditPerfil from 'src/components/perfil/formEditPerfil';

export default function AdicionarPerfil() {
  return (
    <PageContainer>
      <Top title={'Perfis de Usuário > Novo Perfil'} />
      <FormEditPerfil perfil={null} />
    </PageContainer>
  );
}

AdicionarPerfil.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Novo Perfil de Usuário'}>{page}</Layout>;
};
