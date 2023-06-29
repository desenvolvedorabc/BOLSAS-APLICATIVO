import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import { useState, useEffect } from 'react';
import { getUser } from 'src/services/usuarios.service';
import CardInfoUsuarioRelatorio from 'src/components/usuario/cardInfoUsuarioRelatorio';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';

export default function UsuarioDetalhe({ id, url }) {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadInfos();
  }, []);

  const loadInfos = async () => {
    setIsLoading(true);
    try {
      const resp = await getUser(id);
      resp.data = {
        ...resp.data,
        image_profile_url: `${url}/users/avatar/${resp.data.image_profile}`,
      };
      setUsuario(resp.data);
    } catch (e) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Top title={`Usuários Admin > Perfil`} />
      {isLoading ? (
        <div className="d-flex align-items-center flex-column mt-5">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <CardInfoUsuarioRelatorio usuario={usuario} />
      )}
    </PageContainer>
  );
}

UsuarioDetalhe.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Usuários Admin'}>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: {
      id,
      url: process.env.NEXT_PUBLIC_API_URL,
    },
  };
}
