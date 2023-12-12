import { Box, Flex, styled } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next';
import { HomeLogoIcon } from 'src/icons';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { env } from 'next-runtime-env';

const host = env('NEXT_PUBLIC_HOST');

export default function Page() {
  const translate = useTranslations('Home');
  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      <Box
        css={{
          position: 'relative',
          background: '$blue',
          width: '100%',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <Box css={{ position: 'absolute' }}>
          <Flex
            alignItems="flex-end"
            css={{
              paddingTop: '60px',
              paddingLeft: '40px',
              paddingRight: '60px',
              '@bp1': {
                paddingTop: '120px',
                paddingLeft: '120px',
              },
              '@bp2': {
                paddingTop: '120px',
                paddingLeft: '250px',
              },
              '@bp3': {
                paddingTop: '120px',
                paddingLeft: '380px',
              },
              '@bp4': {
                paddingTop: '120px',
                paddingLeft: '680px',
              },
            }}
          >
            <Box
              css={{
                width: '120px',
                height: '109px',
                '@bp1': {
                  width: '177px',
                  height: '161px',
                },
              }}
            >
              <HomeLogoIcon color="white" width="100%" height="100%" />
            </Box>
            <Text
              css={{
                fontSize: '60px',
                fontWeight: '700',
                zIndex: '2',
                marginLeft: '-30px',
                '@bp1': {
                  fontSize: '77px',
                  marginLeft: '-50px',
                },
              }}
              as="h1"
              color="white"
            >
              Curator
            </Text>
          </Flex>
          <Box
            css={{
              position: 'absolute',
              top: '20px',
              width: '650px',
              height: '650px',
              '@bp1': {
                width: '1000px',
                height: '1000px',
                left: '10%',
                top: '60px',
              },
              '@bp2': {
                width: '1100px',
                height: '1100px',
                left: '200px',
                top: '60px',
              },
              '@bp3': {
                left: '300px',
                top: '60px',
              },
              '@bp4': {
                position: 'absolute',
                left: '600px',
                top: '60px',
              },
            }}
          >
            <Image
              src="/icons/Curator_Bildmarke_deko.svg"
              alt="X Logo"
              fill={true}
            />
          </Box>
        </Box>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            css={{
              position: 'absolute',
              top: '300px',
              '@bp1': {
                top: '400px',
              },
            }}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box
                css={{
                  zIndex: '3',
                  maxWidth: '450px',
                  '@bp1': {
                    maxWidth: '650px',
                  },
                  '@bp2': {
                    maxWidth: '850px',
                  },
                }}
              >
                <Text
                  css={{
                    zIndex: 2,
                    fontSize: '24px',
                    fontWeight: '700',
                    px: '$4',
                    '@bp1': {
                      fontSize: '38px',
                      fontWeight: '700',
                    },
                  }}
                  as="h2"
                  weight="bold"
                  color="white"
                  italic
                >
                  {translate('title')}
                </Text>
              </Box>
              <Box mt="10">
                <StartLink href="/canvas">
                  <Text size="xlarge" weight="bold" color="white">
                    {translate('start')}
                  </Text>
                </StartLink>
              </Box>
            </Flex>
            <Flex
              justifyContent={{ '@initial': 'center', '@bp1': 'flex-start' }}
              css={{
                marginTop: '40px',
                paddingLeft: '0',
                '@bp1': {
                  paddingLeft: '$4',
                },
              }}
            >
              {host === 'AP' ? (
                <Image
                  src="/logos/AP-Logo.svg"
                  alt="Allardpierson"
                  width={180}
                  height={30}
                />
              ) : host === 'BLM' ? (
                <Image
                  src="/logos/BLM-Logo.png"
                  alt="Badisches Landesmuseum"
                  width={160}
                  height={90}
                />
              ) : null}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

const StartLink = styled(Link, {
  all: 'unset',
  padding: '18px 28px',
  display: 'flex',
  justifyContent: 'center',
  width: 'fit-content',
  alignItems: 'center',
  borderRadius: '$1',
  backgroundColor: '$blue',
  border: '1px solid white',
  boxShadow: '0px 0px 8px 0px #AD80FF',
  cursor: 'pointer',
  zIndex: '3',
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
