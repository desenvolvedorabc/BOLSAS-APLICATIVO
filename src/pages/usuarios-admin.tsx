import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import TableUsuarios from 'src/components/usuario/tableUsuarios';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function Usuarios({ url }) {
  return (
    <PageContainer>
      <Top title={'Usuários Admin'} />
      <TableUsuarios url={url} />
    </PageContainer>
  );
}

Usuarios.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Usuários Admin'}>{page}</Layout>;
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
