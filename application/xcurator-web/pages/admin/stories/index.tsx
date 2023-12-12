import * as React from 'react';
import { Box, Flex, Grid, Stack, styled } from '@3pc/layout-components-react';
import Link from 'next/link';
import {
  ChevronIcon,
  DeleteIcon,
  NotPublicIcon,
  PreviewIcon,
  ThreeDotsIcon,
} from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import {
  useDeleteStoryMutation,
  useReportedStoriesQuery,
  useUnpublishStoryMutation,
  useUpdateStoryNotificationMutation,
} from 'src/graphql/_generated/types';
import { Orbit } from '@uiball/loaders';
import { useAuth } from 'src/components/Context/AuthContext';
import Image from 'next/image';
import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import { colors } from 'src/themes/theme';
import { Dialog, DialogTrigger } from 'src/components/Common/Dialog';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownLink,
  DropdownTrigger,
} from 'src/components/Common/Dropdown';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { localeToLanguage } from 'src/utils/useLanguage';
import { Button } from '../../../src/components/Common/Button';
import Head from 'next/head';

const Index = () => {
  const translate = useTranslations('Admin');
  const router = useRouter();
  const language = localeToLanguage(router.locale as string);
  const { data, loading, error } = useReportedStoriesQuery({
    fetchPolicy: 'network-only',
    variables: { language: language },
  });
  const [deleteStory] = useDeleteStoryMutation();
  const [unpublishStory] = useUnpublishStoryMutation();
  const [updateStoryNotification] = useUpdateStoryNotificationMutation();
  const { isLoggedIn, admin, authenticate } = useAuth();

  if (loading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        css={{ width: '100%', height: '100%' }}
      >
        <Orbit color="#002fff" />
      </Flex>
    );
  }

  if (error) return <Box>There was an error: {error.message}</Box>;

  if (!data?.reportedStories) return <Box>{translate('noNotifications')}</Box>;

  return (
    <>
      <Head>
        <title>{translate('seoAdminStoriesTitle')}</title>
        <meta
          name="description"
          content={translate('seoAdminStoriesDescription')}
        />
        <meta name="keyword" content={translate('seoAdminStoriesKeywords')} />
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
                    {translate('manageStories')}
                  </Text>
                </Box>
              </Box>
              {data.reportedStories.length > 0 ? (
                <Flex
                  flexDirection="column"
                  gap="6"
                  css={{ px: '$4', paddingTop: '20px', '@bp2': { px: '$10' } }}
                >
                  <Text>{translate('reportedStories')}</Text>
                  <Grid
                    gap={{
                      '@initial': 4,
                      '@bp3': 8,
                      '@bp4': 10,
                    }}
                    css={{
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(300px, 1fr))',

                      '@bp1': {
                        gridTemplateColumns:
                          data?.reportedStories.length === 0
                            ? 'repeat(auto-fit, minmax(420px, 600px))'
                            : 'repeat(auto-fit, minmax(420px, 1fr))',
                      },

                      '@bp4': {
                        gridTemplateColumns:
                          'repeat(auto-fit, minmax(420px, 600px))',
                      },
                    }}
                  >
                    {data?.reportedStories.map(notification => (
                      <Box
                        key={notification.story.id}
                        css={{
                          position: 'relative',
                          display: 'flex',
                          '&::before': {
                            content: '',
                            width: '100%',
                            height: 0,
                            paddingBottom: 'calc(100% / (35 / 20))',
                          },

                          '@bp1': {
                            '&::before': {
                              paddingBottom: 'calc(100% / (3 / 1))',
                            },
                          },

                          '@bp2': {
                            '&::before': {
                              paddingBottom: 'calc(100% / (4 / 1))',
                            },
                          },

                          '@media(min-width: 880px)': {
                            '&::before': {
                              paddingBottom: 'calc(100% / (3 / 1))',
                            },
                          },

                          '@bp3': {
                            '&::before': {
                              paddingBottom: 'calc(100% / (66 / 25))',
                            },
                          },
                        }}
                      >
                        <Box
                          css={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            background: notification.story.previewImage?.url
                              ? 'linear-gradient(#00000000, #000000B2)'
                              : 'linear-gradient(#deccff, #7c33ff)',
                          }}
                        >
                          <Link href={`/admin/stories/${notification.id}`}>
                            {notification.story.previewImage?.url ? (
                              <Box
                                css={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',

                                  '> img': {
                                    opacity: '0.5',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                  },
                                }}
                              >
                                <Image
                                  src={
                                    notification.story.previewImage?.url ?? ''
                                  }
                                  alt={notification.story.title ?? ''}
                                  fill={true}
                                />
                              </Box>
                            ) : null}
                            <Box
                              paddingX="2"
                              css={{
                                position: 'absolute',
                                width: '100%',
                                bottom: '4px',
                              }}
                            >
                              <Text
                                as="h1"
                                size="normal"
                                weight="bold"
                                color="black50"
                              >
                                {notification.story?.title}
                              </Text>
                              <Flex
                                justifyContent="space-between"
                                gap={2}
                                alignItems="center"
                                css={{ marginTop: '10px' }}
                              >
                                <Text size="xsmall" color="black50">
                                  {'author : ' +
                                    (notification.story?.author.username ??
                                      'not available')}
                                </Text>
                                <Rating
                                  value={notification.story?.rating ?? 0}
                                  style={{ maxWidth: 110 }}
                                  itemStyles={{
                                    itemShapes: ThinRoundedStar,
                                    activeFillColor: colors.blue200,
                                    inactiveFillColor: 'transparent',
                                    itemStrokeWidth: 0.5,
                                    inactiveStrokeColor: colors.blue200,
                                    activeStrokeColor: colors.blue200,
                                  }}
                                  readOnly
                                />
                              </Flex>
                            </Box>
                          </Link>
                          {/*Story Menu*/}
                          <Box
                            css={{
                              position: 'absolute',
                              right: '10px',
                              top: '10px',
                            }}
                          >
                            <Dialog>
                              <Dropdown>
                                <DropdownTrigger asChild>
                                  <ThreeDotsButton>
                                    <ThreeDotsIcon width="14px" height="14px" />
                                  </ThreeDotsButton>
                                </DropdownTrigger>
                                <DropdownContent align="end">
                                  <DropdownItem>
                                    <DialogTrigger asChild>
                                      <DropdownButton
                                        onClick={() => {
                                          updateStoryNotification({
                                            variables: {
                                              update: {
                                                id: notification.id,
                                                isRead: true,
                                              },
                                            },
                                            update: cache => {
                                              cache.modify({
                                                fields: {
                                                  reportedStories(
                                                    existingStories
                                                  ) {
                                                    const cachedId =
                                                      cache.identify({
                                                        id: notification.id,
                                                        __typename:
                                                          'StoryNotification',
                                                      });

                                                    return existingStories.filter(
                                                      (story: {
                                                        _ref: string;
                                                      }) =>
                                                        story._ref !== cachedId
                                                    );
                                                  },
                                                },
                                              });
                                            },
                                            onCompleted: () => {
                                              deleteStory({
                                                variables: {
                                                  delete: {
                                                    storyId:
                                                      notification.story.id,
                                                  },
                                                },
                                                update: cache => {
                                                  cache.modify({
                                                    fields: {
                                                      reportedStories(
                                                        existingStories
                                                      ) {
                                                        const cachedId =
                                                          cache.identify({
                                                            id: notification.id,
                                                            __typename:
                                                              'Notification',
                                                          });

                                                        return existingStories.filter(
                                                          (story: {
                                                            __ref: string;
                                                          }) =>
                                                            story.__ref !==
                                                            cachedId
                                                        );
                                                      },
                                                    },
                                                  });
                                                },
                                              });
                                            },
                                          });
                                        }}
                                      >
                                        <Flex
                                          css={{
                                            display: 'inline-flex',
                                            mr: '$2',
                                          }}
                                        >
                                          <DeleteIcon />
                                        </Flex>
                                        <Text>{translate('delete')}</Text>
                                      </DropdownButton>
                                    </DialogTrigger>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <DialogTrigger asChild>
                                      <DropdownButton
                                        onClick={() =>
                                          updateStoryNotification({
                                            variables: {
                                              update: {
                                                id: notification.id,
                                                isRead: true,
                                              },
                                            },
                                            onCompleted: () => {
                                              unpublishStory({
                                                variables: {
                                                  where: {
                                                    id: notification.story.id,
                                                  },
                                                },
                                                update: cache => {
                                                  cache.modify({
                                                    fields: {
                                                      reportedStories(
                                                        existingStories
                                                      ) {
                                                        const cachedId =
                                                          cache.identify({
                                                            id: notification.id,
                                                            __typename:
                                                              'Notification',
                                                          });

                                                        return existingStories.filter(
                                                          (story: {
                                                            __ref: string;
                                                          }) =>
                                                            story.__ref !==
                                                            cachedId
                                                        );
                                                      },
                                                    },
                                                  });
                                                },
                                              });
                                            },
                                          })
                                        }
                                      >
                                        <Flex
                                          css={{
                                            display: 'inline-flex',
                                            mr: '$2',
                                          }}
                                        >
                                          <NotPublicIcon />
                                        </Flex>
                                        <Text>{translate('private')}</Text>
                                      </DropdownButton>
                                    </DialogTrigger>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <DialogTrigger asChild>
                                      <DropdownLink
                                        href={`/admin/stories/${notification.id}`}
                                      >
                                        <Flex
                                          css={{
                                            display: 'inline-flex',
                                            mr: '$2',
                                          }}
                                        >
                                          <PreviewIcon />
                                        </Flex>
                                        <Text>{translate('check')}</Text>
                                      </DropdownLink>
                                    </DialogTrigger>
                                  </DropdownItem>
                                </DropdownContent>
                              </Dropdown>
                            </Dialog>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Grid>
                </Flex>
              ) : (
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  css={{ width: '100%', height: '100%' }}
                >
                  <Text size="xlarge">{translate('noStories')}</Text>
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

const ThreeDotsButton = styled('button', {
  all: 'unset',
  width: '30px',
  height: '30px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: '$blue100',
  border: '1px solid',
  borderColor: '$blue100',
  cursor: 'pointer',
  color: '$blue',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    borderColor: '$blue',
  },

  '&:active, &[data-state="open"]': {
    borderColor: '$blue',
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
