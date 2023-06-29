import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import { useState, useEffect } from 'react';
import FormEditPerfil from 'src/components/perfil/formEditPerfil';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';
import { getPerfil } from 'src/services/perfis.service';

export default function EditarPerfil({ id }) {
  const [perfil, setPerfil] = useState(null);
  useEffect(() => {
    loadInfos();
  }, []);

  const loadInfos = async () => {
    const resp = await getPerfil(id);
    setPerfil(resp.data);
  };

  return (
    <PageContainer>
      <Top title={`Perfis de Usuário > Editar Perfil`} />
      {perfil && <FormEditPerfil perfil={perfil} />}
    </PageContainer>
  );
}

EditarPerfil.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Editar Perfil de Usuário'}>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
}
