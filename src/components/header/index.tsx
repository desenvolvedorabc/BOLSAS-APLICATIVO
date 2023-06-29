import Head from 'next/head';

interface HeadProps {
  title: string;
}

export function Header({ title }: HeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="PARC | Sistema De Gestão De Bolsas" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
