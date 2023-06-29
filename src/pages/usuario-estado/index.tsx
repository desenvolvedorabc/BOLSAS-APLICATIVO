import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { FormEditUsuarioEstado } from 'src/components/usuarioEstado/formEditUsuarioEstado';

export default function AdicionarUsuarioEstado() {
  return (
    <PageContainer>
      <Top title={'Usuários do Estado > Novo Usuário'} />
      <FormEditUsuarioEstado usuario={null} />
    </PageContainer>
  );
}

AdicionarUsuarioEstado.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Novo Usuário do Estado'}>{page}</Layout>;
};

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    roles: [],
  },
);
