import * as React from 'react';
import { Box, Flex, Stack } from 'src/@3pc/layout-components-react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Text } from 'src/components/Common/Text';
import { Line } from 'src/components/Common/Line';
import { ChevronIcon } from 'src/icons';
import Link from 'next/link';
import { useAuth } from 'src/components/Context/AuthContext';
import { Button } from 'src/components/Common/Button';
import Head from 'next/head';

const Page = () => {
  const translate = useTranslations('Admin');
  const { admin, isLoggedIn, authenticate } = useAuth();

  return (
    <>
      <Head>
        <title>{translate('seoAdminStartTitle')}</title>
        <meta
          name="description"
          content={translate('seoAdminStartDescription')}
        />
        <meta name="keyword" content={translate('seoAdminStartKeywords')} />
      </Head>
      {isLoggedIn ? (
        <>
          {admin ? (
            <Box py="6" px={{ '@initial': 3, '@bp2': 10 }}>
              <Stack space="4">
                <Text as="h1" weight="bold" size="xxlarge">
                  {translate('title')}
                </Text>
                <Line color="blueDark" />
                <Link href="/admin/stories">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    css={{
                      width: '100%',
                      backgroundColor: 'white',
                      padding: '$6 $2',
                      borderRadius: '$2',
                      '&:hover': {
                        backgroundColor: '$blue50',
                      },
                      transition: 'background-color 0.125s ease-in',
                      '& > svg': {
                        transform: 'rotate(180deg)',
                      },
                    }}
                  >
                    <Text size="large" weight="bold">
                      {translate('stories')}
                    </Text>
                    <ChevronIcon />
                  </Flex>
                </Link>
                <Line color="blueDark" />
                <Link href="/admin/objects">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    css={{
                      width: '100%',
                      backgroundColor: 'white',
                      padding: '$6 $2',
                      borderRadius: '$2',
                      '&:hover': {
                        backgroundColor: '$blue50',
                      },
                      transition: 'background-color 0.125s ease-in',
                      '& > svg': {
                        transform: 'rotate(180deg)',
                      },
                    }}
                  >
                    <Text size="large" weight="bold">
                      {translate('objects')}
                    </Text>
                    <ChevronIcon />
                  </Flex>
                </Link>
                <Line color="blueDark" />
                <Link href="/admin/editTemplates">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    css={{
                      width: '100%',
                      backgroundColor: 'white',
                      padding: '$6 $2',
                      borderRadius: '$2',
                      '&:hover': {
                        backgroundColor: '$blue50',
                      },
                      transition: 'background-color 0.125s ease-in',
                      '& > svg': {
                        transform: 'rotate(180deg)',
                      },
                    }}
                  >
                    <Text size="large" weight="bold">
                      {translate('editLlmTemplates')}
                    </Text>
                    <ChevronIcon />
                  </Flex>
                </Link>
                <Line color="blueDark" />
                <Link href="/admin/export">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    css={{
                      width: '100%',
                      backgroundColor: 'white',
                      padding: '$6 $2',
                      borderRadius: '$2',
                      '&:hover': {
                        backgroundColor: '$blue50',
                      },
                      transition: 'background-color 0.125s ease-in',
                      '& > svg': {
                        transform: 'rotate(180deg)',
                      },
                    }}
                  >
                    <Text size="large" weight="bold">
                      {translate('exportHeader')}
                    </Text>
                    <ChevronIcon />
                  </Flex>
                </Link>
                <Line color="blueDark" />
              </Stack>
            </Box>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="center"
              css={{ width: '100%', height: '100´%' }}
            >
              {translate('notAdmin')}
            </Flex>
          )}
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" css={{ flexGrow: 1 }}>
          <Box px="4" css={{ textAlign: 'center', maxWidth: '600px' }}>
            <Stack space={{ '@initial': 20, '@bp2': 7 }}>
              <Text size={{ '@initial': 'xlarge', '@bp2': 'xxxlarge' }}>
                {translate('loginPlease')}
              </Text>
              <Button
                onClick={() => {
                  authenticate();
                }}
              >
                <Text size="large">{translate('login')}</Text>
              </Button>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

export default Page;
