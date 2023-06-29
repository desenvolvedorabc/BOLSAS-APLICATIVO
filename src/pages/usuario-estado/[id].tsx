import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import { useState, useEffect } from 'react';
import { getUser } from 'src/services/usuarios.service';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { CardInfoUsuarioEstadoRelatorio } from 'src/components/usuarioEstado/cardInfoUsuarioEstadoRelatorio';

export default function UsuarioEstadoDetalhe({ id, url }) {
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
      <Top title={`Usuários do Estado > Perfil`} />
      {isLoading ? (
        <div className="d-flex align-items-center flex-column mt-5">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <CardInfoUsuarioEstadoRelatorio usuario={usuario} />
      )}
    </PageContainer>
  );
}

UsuarioEstadoDetalhe.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Usuários do Estado'}>{page}</Layout>;
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
