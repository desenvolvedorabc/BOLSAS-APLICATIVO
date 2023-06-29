import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import TableEstados from 'src/components/estado/tableEstados';

export default function Estados({ url }) {
  return (
    <PageContainer>
      <Top title={'Estados Parceiros'} />
      <TableEstados url={url} />
    </PageContainer>
  );
}

Estados.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Estados Parceiros'}>{page}</Layout>;
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
