import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import TableLogs from 'src/components/logs/tableLogs';

export default function Logs({ url }) {
  return (
    <PageContainer>
      <Top title={'Logs do Sistema'} />
      <TableLogs url={url} />
    </PageContainer>
  );
}

Logs.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Logs do Sistema'}>{page}</Layout>;
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
    profiles: [],
    // roles: ['LOG_SIS'],
    roles: [],
  },
);
