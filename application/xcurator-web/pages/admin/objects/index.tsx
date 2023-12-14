import * as React from 'react';
import { Box, Flex, Stack, styled } from 'src/@3pc/layout-components-react';
import { GetStaticPropsContext } from 'next';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import Link from 'next/link';
import { ChevronIcon, TrashIcon } from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import { useAuth } from 'src/components/Context/AuthContext';
import { Line } from 'src/components/Common/Line';
import {
  useDeleteArtefactNotificationMutation,
  useReportedArtefactsQuery,
} from 'src/graphql/_generated/types';
import { localeToLanguage } from 'src/utils/useLanguage';
import { useRouter } from 'next/router';
import { Orbit } from '@uiball/loaders';
import { Button } from 'src/components/Common/Button';
import Head from 'next/head';

const Index = () => {
  const translate = useTranslations('Admin');
  const { isLoggedIn, admin, authenticate } = useAuth();
  const router = useRouter();
  const language = localeToLanguage(router.locale as string);
  const { data, loading, error } = useReportedArtefactsQuery({
    variables: {
      language: language,
    },
    fetchPolicy: 'network-only',
  });
  const [deleteReport] = useDeleteArtefactNotificationMutation();

  if (loading)
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        css={{ width: '100%', height: '100%' }}
      >
        <Orbit />
      </Flex>
    );

  if (error) return <Box>There was an error: {error.message}</Box>;

  if (!data?.reportedArtefacts) return <Box>{translate('noArtefacts')}</Box>;

  return (
    <>
      <Head>
        <title>{translate('seoAdminObjectsTitle')}</title>
        <meta
          name="description"
          content={translate('seoAdminObjectsDescription')}
        />
        <meta name="keyword" content={translate('seoAdminObjectsKeywords')} />
      </Head>
      {isLoggedIn ? (
        <>
          {admin ? (
            <>
              <Box
                px={{
                  '@initial': 4,
                  '@bp2': 10,
                }}
                css={{
                  position: 'sticky',
                  zIndex: 2,
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: HEADER_HEIGHT,
                  alignItems: 'center',
                  display: 'flex',
                  backgroundColor: '$blue',
                  color: '$white',
                  flexShrink: 0,
                }}
              >
                <Link href="/admin">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    css={{
                      display: 'inline-flex',
                      width: '26px',
                      height: '26px',
                      borderRadius: '$1',

                      '&:hover': {
                        backgroundColor: '$blueDark',
                      },

                      '@bp2': {
                        width: '40px',
                        height: '40px',
                      },
                    }}
                  >
                    <ChevronIcon />
                  </Flex>
                </Link>
                <Box
                  px={{ '@initial': 2, '@bp1': 4 }}
                  css={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    userSelect: 'none',
                  }}
                >
                  <Text
                    size={{ '@initial': 'normal', '@bp1': 'xlarge' }}
                    weight="bold"
                  >
                    {translate('manageObjects')}
                  </Text>
                </Box>
              </Box>
              {data?.reportedArtefacts.length > 0 ? (
                <Flex
                  flexDirection="column"
                  css={{
                    px: '$3',
                    paddingTop: '20px',
                    '@bp2': { px: '$10' },
                  }}
                >
                  <Text css={{ marginBottom: '$4' }}>
                    {translate('reportedObjects')}
                  </Text>
                  {data?.reportedArtefacts.map(report => (
                    <Box
                      key={report.id}
                      css={{
                        position: 'relative',
                        borderRadius: '$2',
                      }}
                    >
                      <Line color="blue" width="100%" />
                      <Link href={`/admin/objects/${report.id}`}>
                        <Flex
                          flexDirection="column"
                          gap="4"
                          css={{
                            py: '$10',
                            px: '$2',
                            borderRadius: '$2',
                            '&:hover': {
                              backgroundColor: '$blue50',
                            },
                            transition: 'background-color 0.125s ease-in',
                          }}
                        >
                          <Text size="large" weight="bold">
                            {report.artefact.title}
                          </Text>
                          <Text css={{ wordBreak: 'break-word' }}>
                            {report.message}
                          </Text>
                        </Flex>
                      </Link>
                      <DeleteButton
                        css={{
                          position: 'absolute',
                          top: '18%',
                          right: '3px',
                          width: '32px',
                          height: '32px',
                        }}
                        onClick={() => {
                          deleteReport({
                            variables: {
                              delete: {
                                id: report.id,
                              },
                            },
                            update: cache => {
                              cache.modify({
                                fields: {
                                  reportedArtefacts(existingArtefacts) {
                                    const cachedId = cache.identify({
                                      id: report.id,
                                      __typename: 'ArtefactNotification',
                                    });

                                    return existingArtefacts.filter(
                                      (artefact: { _ref: string }) =>
                                        artefact._ref !== cachedId
                                    );
                                  },
                                },
                              });
                            },
                          });
                        }}
                      >
                        <TrashIcon color="white" />
                      </DeleteButton>
                    </Box>
                  ))}
                </Flex>
              ) : (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  css={{ width: '100%', height: '100%' }}
                >
                  <Text size="xlarge">{translate('noArtefacts')}</Text>
                </Flex>
              )}
            </>
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

const DeleteButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: '$blue',
  borderRadius: '50%',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$blueDark',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

export default Index;
