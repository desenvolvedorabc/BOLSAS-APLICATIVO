import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import { useState, useEffect } from 'react';
import FormEditUsuario from 'src/components/usuario/formEditUsuario';
import { getUser } from 'src/services/usuarios.service';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';

export default function EditarUsuario({ id, url }) {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    loadInfos();
  }, []);

  const loadInfos = async () => {
    const resp = await getUser(id);
    // resp.data = {
    //   ...resp.data,
    //   USU_AVATAR_URL: `${url}/users/avatar/${resp.data.USU_AVATAR}`
    // }
    setUsuario(resp.data);
  };

  return (
    <PageContainer>
      <Top title={`Usuários Admin > Editar Usuário`} />
      {usuario && <FormEditUsuario usuario={usuario} url={url} />}
    </PageContainer>
  );
}

EditarUsuario.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Editar Usuário Admin'}>{page}</Layout>;
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
