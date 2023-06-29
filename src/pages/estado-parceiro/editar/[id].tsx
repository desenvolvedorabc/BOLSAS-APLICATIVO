import PageContainer from 'src/components/pageContainer';
import Top from 'src/components/top';
import { useState, useEffect } from 'react';
import FormEditEstado from 'src/components/estado/formEditEstado';
import { getState } from 'src/services/estados-parceiro.service';
import Layout from 'src/components/layout';
import type { ReactElement } from 'react';

export default function EditarEstado({ id, url, url_estado }) {
  const [estado, setEstado] = useState(null);
  useEffect(() => {
    loadInfos();
  }, []);

  const loadInfos = async () => {
    const resp = await getState(id);
    setEstado(resp.data);
  };

  return (
    <PageContainer>
      <Top title={`Estados Parceiros > Editar Estado`} />
      {estado && (
        <FormEditEstado url={url} url_estado={url_estado} estado={estado} />
      )}
    </PageContainer>
  );
}

EditarEstado.getLayout = function getLayout(page: ReactElement) {
  return <Layout header={'Editar Estado Parceiro'}>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: {
      id,
      url: process.env.NEXT_PUBLIC_API_URL,
      url_estado: process.env.NEXT_PUBLIC_DOMAIN_URL_STATE,
    },
  };
}
