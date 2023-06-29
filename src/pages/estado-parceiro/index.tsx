import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import FormEditEstado from 'src/components/estado/formEditEstado';

export default function AdicionarEstado({ url_estado }) {
  return (
    <PageContainer>
      <Top title={'Estados Parceiros > Adicionar'} />
      <FormEditEstado url_estado={url_estado} estado={null} />
    </PageContainer>
  );
}

AdicionarEstado.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Novo Estado Parceiro'}>{page}</Layout>;
};

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {
        // url: process.env.NEXT_PUBLIC_API_URL,
        url_estado: process.env.NEXT_PUBLIC_DOMAIN_URL_STATE,
      },
    };
  },
  {
    roles: [],
  },
);
