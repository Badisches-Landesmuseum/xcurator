import { Box, Flex, Stack, styled } from '@3pc/layout-components-react';
import * as React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import Link from 'next/link';
import {
  ChevronDownIcon,
  ChevronIcon,
  IsPublicIcon,
  NotPublicIcon,
} from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import {
  useDeleteStoryMutation,
  usePublishStoryMutation,
  useReportedStoryQuery,
  useUnpublishStoryMutation,
  useUpdateStoryNotificationMutation,
} from 'src/graphql/_generated/types';
import { localeToLanguage } from 'src/utils/useLanguage';
import ModuleContent from 'src/components/Story/ModuleContent';
import { Button } from 'src/components/Common/Button';
import { Orbit } from '@uiball/loaders';
import { useRouter } from 'next/router';
import { useAuth } from 'src/components/Context/AuthContext';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from 'src/components/Common/Dropdown';
import Head from 'next/head';

const Page = ({
  notificationId,
  locale,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const translate = useTranslations('Admin');
  const language = localeToLanguage(locale);
  const { data, loading } = useReportedStoryQuery({
    skip: !notificationId,
    variables: { where: { id: notificationId as string }, language: language },
  });
  const [updateStoryNotification] = useUpdateStoryNotificationMutation();
  const [deleteStory] = useDeleteStoryMutation();
  const { admin, isLoggedIn, authenticate } = useAuth();
  const [isPrivacyOpen, setPrivacyOpen] = React.useState(false);
  const [publishStory] = usePublishStoryMutation();
  const [unpublishStory] = useUnpublishStoryMutation();

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

  if (!data?.reportedStory) return <Text>{translate('storyNotFound')}</Text>;

  return (
    <>
      <Head>
        <title>
          {translate('seoAdminStoriesTitle') +
            ' - ' +
            data.reportedStory.story.title}
        </title>
        <meta
          name="description"
          content={translate('seoAdminStoriesDescription')}
        />
        <meta name="keyword" content={data.reportedStory.story.title} />
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
                <Link href="/admin/stories">
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
                    {translate('check')}
                  </Text>
                </Box>
              </Box>
              {/*Story*/}
              <Flex flexDirection="column">
                <Flex
                  flexDirection="column"
                  css={{
                    width: '100%',
                    backgroundColor: '$blue50',
                    padding: '$5',
                  }}
                  gap="5"
                >
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box>{translate('reportedStory')}</Box>
                    <Dropdown
                      open={isPrivacyOpen}
                      onOpenChange={open => setPrivacyOpen(open)}
                    >
                      <DropdownTrigger asChild>
                        <PrivacyButton>
                          <Flex
                            alignItems="center"
                            css={{ display: 'inline-flex', mr: '$1' }}
                          >
                            {data.reportedStory?.story?.isPublished ? (
                              <IsPublicIcon
                                id="isPublicIcon"
                                width="16px"
                                height="16px"
                                color="#002fff"
                              />
                            ) : (
                              <NotPublicIcon
                                id="notPublicIcon"
                                width="16px"
                                height="16px"
                                color="#002fff"
                              />
                            )}
                          </Flex>
                          <Text>
                            {data?.reportedStory.story?.isPublished
                              ? translate('Public')
                              : translate('Private')}
                          </Text>
                          <Flex
                            css={{
                              display: 'inline-flex',
                              ml: '$2',
                              transform: isPrivacyOpen
                                ? 'rotate(180deg)'
                                : undefined,
                            }}
                          >
                            <ChevronDownIcon
                              id="chevronDownIcon"
                              color="#002fff"
                            />
                          </Flex>
                        </PrivacyButton>
                      </DropdownTrigger>
                      <DropdownContent align="end" sideOffset={4}>
                        <DropdownItem
                          disabled={data?.reportedStory.story?.isPublished}
                        >
                          <DropdownButton
                            disabled={data?.reportedStory.story?.isPublished}
                            onClick={() =>
                              publishStory({
                                variables: {
                                  where: {
                                    id: data?.reportedStory.story.id as string,
                                  },
                                },
                                onCompleted: () => {
                                  updateStoryNotification({
                                    variables: {
                                      update: {
                                        id: notificationId as string,
                                        isRead: true,
                                      },
                                    },
                                    update: cache => {
                                      cache.modify({
                                        fields: {
                                          reportedStories(existingStories) {
                                            const cachedId = cache.identify({
                                              id: notificationId,
                                              __typename: 'StoryNotification',
                                            });

                                            return existingStories.filter(
                                              (story: { _ref: string }) =>
                                                story._ref !== cachedId
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
                            <Box
                              mr="2"
                              css={{
                                display: 'inline-flex',
                              }}
                            >
                              <IsPublicIcon width="16px" height="16px" />
                            </Box>
                            <Text>{translate('Public')}</Text>
                          </DropdownButton>
                        </DropdownItem>
                        <DropdownItem
                          disabled={!data?.reportedStory.story?.isPublished}
                        >
                          <DropdownButton
                            disabled={!data?.reportedStory.story?.isPublished}
                            onClick={() =>
                              unpublishStory({
                                variables: {
                                  where: {
                                    id: data?.reportedStory.story.id as string,
                                  },
                                },
                                onCompleted: () => {
                                  updateStoryNotification({
                                    variables: {
                                      update: {
                                        id: notificationId as string,
                                        isRead: true,
                                      },
                                    },
                                    update: cache => {
                                      cache.modify({
                                        fields: {
                                          reportedStories(existingStories) {
                                            const cachedId = cache.identify({
                                              id: notificationId,
                                              __typename: 'StoryNotification',
                                            });

                                            return existingStories.filter(
                                              (story: { _ref: string }) =>
                                                story._ref !== cachedId
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
                            <Box
                              mr="2"
                              css={{
                                display: 'inline-flex',
                              }}
                            >
                              <NotPublicIcon width="16px" height="16px" />
                            </Box>
                            <Text>{translate('Private')}</Text>
                          </DropdownButton>
                        </DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </Flex>
                  <Flex justifyContent="center" gap="4">
                    <Button
                      onClick={() => {
                        updateStoryNotification({
                          variables: {
                            update: {
                              id: notificationId as string,
                              isRead: true,
                            },
                          },
                          update: cache => {
                            cache.modify({
                              fields: {
                                reportedStories(existingStories) {
                                  const cachedId = cache.identify({
                                    id: notificationId,
                                    __typename: 'StoryNotification',
                                  });

                                  return existingStories.filter(
                                    (story: { _ref: string }) =>
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
                                  storyId: data?.reportedStory.story
                                    .id as string,
                                },
                              },
                              onCompleted: () => {
                                router.push('/admin/stories');
                              },
                            });
                          },
                        });
                      }}
                    >
                      {translate('delete')}
                    </Button>
                    <Button
                      onClick={() => {
                        updateStoryNotification({
                          variables: {
                            update: {
                              id: notificationId as string,
                              isRead: true,
                            },
                          },
                          update: cache => {
                            cache.modify({
                              fields: {
                                reportedStories(existingStories) {
                                  const cachedId = cache.identify({
                                    id: notificationId,
                                    __typename: 'StoryNotification',
                                  });

                                  return existingStories.filter(
                                    (story: { _ref: string }) =>
                                      story._ref !== cachedId
                                  );
                                },
                              },
                            });
                          },
                          onCompleted: () => {
                            router.push('/admin/stories');
                          },
                        });
                      }}
                    >
                      {translate('deleteNotification')}
                    </Button>
                  </Flex>
                </Flex>
                <Box pb="4">
                  <Box px="10" mt={{ '@initial': 4, '@bp2': 10 }}>
                    <Text
                      as="h2"
                      size={{ '@initial': 'xxlarge', '@bp2': 'xxxlarge' }}
                    >
                      <Box as="span">{data.reportedStory.story.title}</Box>
                    </Text>
                  </Box>
                  {data.reportedStory.story.modules &&
                    data.reportedStory.story.modules.map(module => (
                      <Box
                        key={module.id}
                        m={{ '@initial': 5, '@bp2': 10 }}
                        pt={{ '@initial': 4, '@bp2': 10 }}
                        css={{ borderTop: '1px solid', borderColor: '$blue' }}
                      >
                        <Flex
                          flexDirection={{
                            '@initial': 'column',
                            '@bp2': 'row',
                          }}
                          gap={{ '@initial': 1, '@bp2': 10 }}
                          css={{ position: 'relative' }}
                          alignItems={{ '@bp2': 'center' }}
                        >
                          <Box
                            css={{
                              '@bp2': {
                                flexGrow: 1,
                              },
                            }}
                          >
                            <ModuleContent artefacts={module.artefacts} />
                          </Box>
                        </Flex>
                        {module.thought ? (
                          <Box
                            mt={{ '@initial': 4, '@bp2': 5, '@bp3': 10 }}
                            css={{
                              backgroundColor: '$black50',
                              px: '6px',
                              py: '8px',
                              borderRadius: '$1',

                              '@bp2': {
                                mx: 'calc($10 + 22.3px)',
                                px: '$10',
                                py: '$5',
                              },

                              '@bp3': {
                                mx: 'auto',
                                maxWidth: '800px',
                              },
                            }}
                          >
                            <Text>{module.thought}</Text>
                          </Box>
                        ) : null}
                      </Box>
                    ))}
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

const PrivacyButton = styled('button', {
  all: 'unset',
  height: '35px',
  px: '$3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: '$blue',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    backgroundColor: '$blue100',
  },
  '&:active, &[data-state="open"]': {
    backgroundColor: '$blue100',
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
