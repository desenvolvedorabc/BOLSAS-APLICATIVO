import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import CardInfoMinhaConta from 'src/components/cardInfoMinhaConta';
import Layout from 'src/components/layout';
import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import { parseCookies } from 'src/utils/cookies';
import { withSSRAuth } from 'src/utils/withSSRAuth';

export default function MinhaConta({ url }) {
  const [usuario, setUsuario] = useState(null);
  // const { user } = useAuth();
  const { USUARIO: userCookie } = parseCookies();

  useEffect(() => {
    loadInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInfos = async () => {
    const user = JSON.parse(userCookie);
    const usu = {
      ...user,
      image_profile_url: `${url}/users/avatar/${user?.image_profile}`,
    };
    setUsuario(usu);
  };

  return (
    <PageContainer>
      <Top title={`Minha Conta`} />
      <CardInfoMinhaConta usuario={usuario} url={url} />
    </PageContainer>
  );
}

MinhaConta.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Minha Conta'}>{page}</Layout>;
};

export const getServerSideProps = withSSRAuth(
  async function getServerSideProps(context) {
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
