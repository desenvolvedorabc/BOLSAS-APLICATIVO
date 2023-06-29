import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import FormEditUsuario from 'src/components/usuario/formEditUsuario';

export default function AdicionarUsuario({ url }) {
  return (
    <PageContainer>
      <Top title={'Usuários Admin > Novo Usuário'} />
      <FormEditUsuario usuario={null} url={url} />
    </PageContainer>
  );
}

AdicionarUsuario.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Novo Usuário'}>{page}</Layout>;
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
