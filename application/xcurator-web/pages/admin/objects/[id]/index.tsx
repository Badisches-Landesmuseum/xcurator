import * as React from 'react';
import {
  Box,
  Flex,
  Grid,
  Inline,
  Stack,
  styled,
} from '@3pc/layout-components-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import Link from 'next/link';
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronIcon,
  ChevronUpIcon,
  TranslatedIcon,
} from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import {
  useReportedArtefactQuery,
  useUpdateArtefactNotificationMutation,
} from 'src/graphql/_generated/types';
import { localeToLanguage } from 'src/utils/useLanguage';
import { ButtonTag } from 'src/components/Common/ButtonTag';
import Image from 'next/image';
import { imageLoader } from 'src/utils/formatImage';
import { Button } from 'src/components/Common/Button';
import { useRouter } from 'next/router';
import { useAuth } from 'src/components/Context/AuthContext';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Head from 'next/head';
import { Orbit } from '@uiball/loaders';

const Page = ({
  notificationId,
  locale,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const translate = useTranslations('Admin');
  const language = localeToLanguage(locale);
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
  const [informationExpanded, setInformationExpanded] = React.useState(false);
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
                <Box mt="5" px={{ '@initial': 3, '@bp2': 10 }}>
                  <Text as="h2" size="large" weight="bold">
                    {data?.reportedArtefact.artefact.title ? (
                      <Box
                        as="span"
                        css={{
                          whiteSpace: 'pre-wrap',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: data?.reportedArtefact.artefact.title,
                        }}
                      />
                    ) : (
                      `${translate('noTitle')}`
                    )}
                  </Text>
                </Box>
                <Box mt="4" px={{ '@initial': 3, '@bp2': 10 }}>
                  {data?.reportedArtefact.artefact.sourceInfo.language !==
                  language ? (
                    <Box mb="3" css={{ color: '$black600' }}>
                      <Inline space="1" alignY="center">
                        <TranslatedIcon width="16px" height="22px" />
                        <Text as="p" size="xsmall" italic>
                          {translate('translated')}
                        </Text>
                      </Inline>
                    </Box>
                  ) : null}
                  <Inline space="2">
                    {data?.reportedArtefact.artefact.tags.map((t, i) => (
                      <ButtonTag
                        key={i}
                        variant={t.isUsingAI ? 'ai' : undefined}
                      >
                        {t.literal}
                      </ButtonTag>
                    ))}
                  </Inline>
                </Box>
                <Box
                  mt="5"
                  px={{ '@initial': 3, '@bp2': 10 }}
                  css={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',

                    '> img': {
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    },
                  }}
                >
                  {data?.reportedArtefact.artefact.images[0].url ? (
                    <Image
                      src={data.reportedArtefact.artefact.images[0].url}
                      alt={data.reportedArtefact.artefact.title || ''}
                      width={
                        (300 /
                          data.reportedArtefact.artefact.images[0].height) *
                        data.reportedArtefact.artefact.images[0].width
                      }
                      height={300}
                      loader={imageLoader}
                    />
                  ) : null}
                </Box>
                <Box mt="5" px={{ '@initial': 3, '@bp2': 10 }}>
                  {data?.reportedArtefact.artefact.description ? (
                    <>
                      <Box
                        css={{
                          height: descriptionExpanded ? undefined : '66px',
                          overflow: descriptionExpanded ? undefined : 'hidden',
                          textOverflow: 'ellipsis',
                          position: 'relative',
                        }}
                      >
                        <Text color="black600">
                          <Box
                            as="span"
                            css={{
                              whiteSpace: 'pre-wrap',
                            }}
                            dangerouslySetInnerHTML={{
                              __html:
                                data.reportedArtefact.artefact.description,
                            }}
                          />
                        </Text>
                      </Box>
                      <Box mt="2">
                        <ExpandButton
                          onClick={() =>
                            setDescriptionExpanded(previous => !previous)
                          }
                        >
                          <Text>
                            {descriptionExpanded
                              ? translate('readLess')
                              : translate('readMore')}
                          </Text>
                          <Box ml="1">
                            {descriptionExpanded ? (
                              <ChevronUpIcon />
                            ) : (
                              <ChevronDownIcon />
                            )}
                          </Box>
                        </ExpandButton>
                      </Box>
                      <Box mt="2" pt="4">
                        <Box
                          css={{
                            borderTop: '1px solid $blue200 ',
                          }}
                        >
                          <ExpandInformationButton
                            onClick={() =>
                              setInformationExpanded(!informationExpanded)
                            }
                          >
                            <Flex alignItems="center" gap={1}>
                              <InfoCircledIcon width="22px" height="22px" />
                              <Text size="xsmall">
                                {translate('moreObjectInfos')}
                              </Text>
                            </Flex>
                            <ArrowDownIcon
                              width="22px"
                              height="22px"
                              style={{
                                padding: '5px',
                                transform: informationExpanded
                                  ? 'rotate(180deg)'
                                  : '',
                              }}
                            />
                          </ExpandInformationButton>
                          <Grid
                            css={{
                              gridTemplateRows: informationExpanded
                                ? '1fr'
                                : '0fr',
                              transition: 'grid-template-rows 0.25s ease-out',
                              mt: '$4',
                              pb: informationExpanded ? '$4' : 0,
                            }}
                          >
                            <Box
                              css={{
                                overflow: 'hidden',
                              }}
                            >
                              <Stack space="6">
                                <Flex
                                  gap={2}
                                  alignItems="center"
                                  css={{ paddingTop: '12px' }}
                                >
                                  <Text weight="bold">{translate('date')}</Text>
                                  <Text>
                                    {
                                      data?.reportedArtefact.artefact.dateRange
                                        ?.literal
                                    }
                                  </Text>
                                </Flex>
                                <Flex gap={2} alignItems="center">
                                  <Text weight="bold">
                                    {translate('places')}
                                  </Text>
                                  <Text>
                                    {data?.reportedArtefact.artefact.locations.map(
                                      location => location.name
                                    )}
                                  </Text>
                                </Flex>
                                <Flex gap={2} alignItems="center">
                                  <Text weight="bold">
                                    {translate('persons')}
                                  </Text>
                                  <Text>
                                    {data?.reportedArtefact.artefact.persons.map(
                                      person => person.name
                                    )}
                                  </Text>
                                </Flex>
                                <Flex gap={2} alignItems="center">
                                  <Text weight="bold">
                                    {translate('userRights')}
                                  </Text>
                                  <Text>
                                    {
                                      data?.reportedArtefact.artefact.images[0]
                                        .licence.name
                                    }
                                  </Text>
                                </Flex>
                                <Flex gap={2} alignItems="center">
                                  <Text weight="bold">
                                    {translate('photograph')}
                                  </Text>
                                </Flex>
                                <Link
                                  href={`${data?.reportedArtefact.artefact.sourceInfo.url}`}
                                  target="_blank"
                                >
                                  <Box
                                    css={{
                                      color: '$blue',
                                      height: '15px',
                                    }}
                                  >
                                    <Text>{translate('goToCataloge')}</Text>
                                  </Box>
                                </Link>
                              </Stack>
                            </Box>
                          </Grid>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <Text color="black600" italic>
                      {translate('noDescription')}
                    </Text>
                  )}
                </Box>
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

const ExpandInformationButton = styled('button', {
  all: 'unset',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  pt: '$4',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const ExpandButton = styled('button', {
  all: 'unset',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

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
