import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import LoadingScreen from 'src/components/loadingPage';
import { useRouter } from 'next/router';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { BreadcrumbProvider } from '../context/breadcrumb.context';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'src/lib/react-query';

import '../styles/globals.css';
import { AuthProvider } from 'src/context/AuthContext';

import { ThemeStore } from 'src/context/ThemeContext';
import Theme from 'src/context/Theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const [theme, setTheme] = useState<DefaultTheme>(stateTheme('#AA0000'));

  useEffect(() => {
    const handleStart = () => {
      window.scrollTo(0, 0);
      setLoading(true);
    };
    const handleStop = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeStore>
          <Theme>
            <AuthProvider>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
              </Head>
              {getLayout(
                <>
                  {!loading ? (
                    <BreadcrumbProvider>
                      <Component {...pageProps} />
                    </BreadcrumbProvider>
                  ) : (
                    <LoadingScreen />
                  )}
                </>,
              )}
            </AuthProvider>
          </Theme>
        </ThemeStore>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
