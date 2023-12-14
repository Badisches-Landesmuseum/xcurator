import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { ApolloProvider } from '@apollo/client';
import { Box, Flex } from 'src/@3pc/layout-components-react';
import client from 'src/apollo-client';
import { globalStyles } from 'src/global-styles';
import { EditHeader } from 'src/components/Header/EditHeader';
import { HEADER_HEIGHT, Header } from 'src/components/Header/Header';
import { AuthContextProvider } from 'src/components/Context/AuthContext';
import { SessionProviderWrapper } from 'src/utils/SessionProviderWrapper';
import { ToastProvider, ToastViewport } from 'src/components/Common/Toast';
import { ProfileContextProvider } from 'src/components/Context/ProfileContext';
import { MyStoriesContextProvider } from 'src/components/Context/MyStoriesContext';
import { init } from '@socialgouv/matomo-next';
import '@smastrom/react-rating/style.css';
import { env } from 'next-runtime-env';
import Script from 'next/script';
import { GlobalToastsContextProvider } from 'src/components/Context/GlobalToastsContext';

type PageProps = {
  messages?: IntlMessages;
};

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = Omit<AppProps<PageProps>, 'pageProps'> & {
  pageProps: PageProps;
} & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  globalStyles();
  const router = useRouter();
  const { pathname } = router;
  const showNavbar =
    ![
      '/details',
      '/onboarding',
      '/presentation/[title]/[id]',
      '/stories/[id]/newChapter',
      '/stories/[id]/[chapter]',
      '/admin/stories',
      '/admin/stories/[id]',
      '/admin/objects',
      '/admin/objects/[id]',
      '/admin/editTemplates',
      '/admin/export',
    ].includes(router.pathname) && !router.route.endsWith('404');
  const home = pathname === '/';
  const showEditHeader =
    pathname.endsWith('/stories/[id]') && !pathname.includes('admin');
  const getLayout = Component.getLayout ?? (page => page);

  React.useEffect(() => {
    {
      env('NEXT_PUBLIC_MATOMO_URL') &&
        env('NEXT_PUBLIC_SITE_ID') &&
        init({
          url: env('NEXT_PUBLIC_MATOMO_URL') || '',
          siteId: env('NEXT_PUBLIC_SITE_ID') || '1',
          disableCookies: true,
        });
    }
  }, []);

  return (
    <>
      {env('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_BLM') && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${env(
              'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_BLM'
            )}`}
          />
          <Script id="google-analytics-script" strategy="lazyOnload">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', ${env(
                      'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_BLM'
                    )}, {
                    page_path: window.location.pathname,
                    });
                `}
          </Script>
        </>
      )}
      {env('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_AP') && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${env(
              'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_AP'
            )}`}
          />
          <Script id="google-analytics-script" strategy="lazyOnload">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', ${env(
                      'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_AP'
                    )}, {
                    page_path: window.location.pathname,
                    });
                `}
          </Script>
        </>
      )}
      {env('NEXT_PUBLIC_USERCENTRICS_ID') && (
        <Script
          id="usercentrics-cmp"
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          data-settings-id={env('NEXT_PUBLIC_USERCENTRICS_ID')}
          strategy="afterInteractive"
        />
      )}
      <SessionProviderWrapper>
        <NextIntlProvider messages={pageProps.messages}>
          <ToastProvider swipeDirection="right">
            <ApolloProvider client={client}>
              <AuthContextProvider>
                <MyStoriesContextProvider>
                  <ProfileContextProvider>
                    <GlobalToastsContextProvider>
                      <Box
                        id="outer-container"
                        css={{
                          height: '100vh',
                          margin: '0 auto',
                          color: '$text',
                          backgroundColor: '$background',
                        }}
                      >
                        {showEditHeader ? (
                          <EditHeader />
                        ) : showNavbar ? (
                          <Header />
                        ) : null}

                        <Box
                          id="inner-container"
                          css={{
                            height:
                              showEditHeader || (showNavbar && !home)
                                ? `calc(100svh - ${HEADER_HEIGHT})`
                                : '100vh',
                            margin: '0 auto',
                            color: '$text',
                            overflowY: 'scroll',
                            backgroundColor: home ? '$blue' : '$background',
                            '&::-webkit-scrollbar': {
                              width: '1px',
                            },
                          }}
                        >
                          <Flex
                            flexDirection="column"
                            alignItems="stretch"
                            css={{
                              position: 'relative',
                              height: '100%',
                              overflowX: 'scroll',
                            }}
                          >
                            {getLayout(<Component {...pageProps} />)}
                          </Flex>
                        </Box>
                        <ToastViewport />
                      </Box>
                    </GlobalToastsContextProvider>
                  </ProfileContextProvider>
                </MyStoriesContextProvider>
              </AuthContextProvider>
            </ApolloProvider>
          </ToastProvider>
        </NextIntlProvider>
      </SessionProviderWrapper>
    </>
  );
}
