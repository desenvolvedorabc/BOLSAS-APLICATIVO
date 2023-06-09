import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import TablePerfil from 'src/components/perfil/tablePerfil';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function PerfisUsuario() {
  return (
    <PageContainer>
      <Top title={'Perfis de Usuário'} />
      <TablePerfil />
    </PageContainer>
  );
}

PerfisUsuario.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Perfis de Usuário'}>{page}</Layout>;
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
