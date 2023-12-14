import * as React from 'react';
import { Box, Flex, Stack } from 'src/@3pc/layout-components-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import Link from 'next/link';
import { ChevronIcon } from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import {
  useReportedArtefactQuery,
  useUpdateArtefactNotificationMutation,
} from 'src/graphql/_generated/types';
import { localeToLanguage } from 'src/utils/useLanguage';
import { Button } from 'src/components/Common/Button';
import { useRouter } from 'next/router';
import { useAuth } from 'src/components/Context/AuthContext';
import Head from 'next/head';
import { Orbit } from '@uiball/loaders';
import { ReportedArtefact } from 'src/components/Admin/ReportedArtefact';

const Page = ({
  notificationId,
  locale,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const translate = useTranslations('Admin');
  const language = localeToLanguage(locale);
  const { data, loading } = useReportedArtefactQuery({
    variables: {
      where: {
        id: notificationId as string,
      },
      language: language,
    },
  });
  const [updateArtefactNotification] = useUpdateArtefactNotificationMutation();
  const { isLoggedIn, admin, authenticate } = useAuth();

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

  return (
    <>
      <Head>
        <title>
          {translate('seoAdminObjectsTitle') +
            ' - ' +
            data?.reportedArtefact.artefact.title}
        </title>
        <meta
          name="description"
          content={translate('seoAdminObjectsDescription')}
        />
        <meta
          name="keyword"
          content={data?.reportedArtefact.artefact.keywords + ''}
        />
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
                <Link href="/admin/objects">
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
                    {translate('checkObject')}
                  </Text>
                </Box>
              </Box>
              <Flex flexDirection="column">
                <Box
                  p={{ '@initial': 3, '@bp2': 10 }}
                  css={{
                    backgroundColor: '$blue100',
                  }}
                >
                  <Flex flexDirection="column" gap="4">
                    <Text>{translate('objectFeedback')}</Text>
                    <Box
                      px="2"
                      py="4"
                      css={{
                        backgroundColor: 'white',
                        color: '$blue',
                        borderRadius: '$2',
                        wordBreak: 'break-word',
                      }}
                    >
                      <Text as="p">{data?.reportedArtefact.message}</Text>
                    </Box>
                    <Flex justifyContent="center" gap="4">
                      <Button
                        onClick={() => {
                          updateArtefactNotification({
                            variables: {
                              update: {
                                id: notificationId as string,
                                isRead: true,
                              },
                            },
                            update: cache => {
                              cache.modify({
                                fields: {
                                  reportedArtefacts(existingArtefacts) {
                                    const cachedId = cache.identify({
                                      id: notificationId,
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
                            onCompleted: () => {
                              router.push('/admin/objects');
                            },
                          });
                        }}
                      >
                        <Text>{translate('accept')}</Text>
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
                {data?.reportedArtefact.artefact && (
                  <ReportedArtefact
                    artefact={data?.reportedArtefact.artefact}
                  />
                )}
              </Flex>
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

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  if (!locale)
    return {
      storyId: params?.id || '',
    };
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      notificationId: params?.id || '',
      locale,
    },
  };
}

export default Page;
