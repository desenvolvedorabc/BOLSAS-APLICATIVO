import Router from 'next/router';
import type { ReactElement } from 'react';
import { useState } from 'react';
import Layout from 'src/components/layout';
import PageContainer from 'src/components/pageContainer';
import { destroyCookies } from 'src/utils/auth';
import { parseCookies } from 'src/utils/cookies';
import { withSSRAuth } from 'src/utils/withSSRAuth';
import { Indicators } from 'src/components/homeComponents/indicators';
import { Card } from 'src/shared/styledForms';
import { SelectGraph } from 'src/components/homeComponents/selectGraph';
import TopHome from '../components/homeComponents/topHome';
import SessionTimeout from '../components/timeOut/sessionTimeout';

export default function Home() {
  const [isAuthenticated, setAuth] = useState(true);

  const handleClick = () => {
    setAuth(!isAuthenticated);
    destroyCookies();
    Router.push('/login');
  };

  return (
    <>
      <SessionTimeout logOut={handleClick} />
      <PageContainer>
        <TopHome title={'Home'} searchOpen={true} />
        <Indicators />
        <Card style={{ marginTop: 30 }}>
          <SelectGraph />
        </Card>
      </PageContainer>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Home'}>{page}</Layout>;
};

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    let cookies = parseCookies(ctx);

    cookies = {
      ...cookies,
      USU_AVATAR: null,
    };

    return {
      props: {},
    };
  },
  {
    profiles: [],
    roles: [],
  },
);
