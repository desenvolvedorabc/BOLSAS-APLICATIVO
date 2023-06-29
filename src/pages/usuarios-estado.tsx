import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { TableUsersStates } from 'src/components/usuario/TableUsersState';

export default function UsuariosEstado({ url }) {
  return (
    <PageContainer>
      <Top title={'Usuários Estado'} />
      <TableUsersStates url={url} />
    </PageContainer>
  );
}

UsuariosEstado.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Usuários Estado'}>{page}</Layout>;
};

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        url: process.env.NEXT_PUBLIC_API_URL,
      },
    };
  },
  {
    roles: [],
  },
);
