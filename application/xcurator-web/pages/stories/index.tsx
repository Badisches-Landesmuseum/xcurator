import { Box, Flex, Grid, Stack, styled } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { GetStaticPropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import Layout from 'src/components/Stories/layout';
import React from 'react';
import {
  IsPublicIcon,
  ThreeDotsIcon,
  ShareIcon,
  PreviewIcon,
  DeleteIcon,
  PenIcon,
  NotPublicIcon,
  CrossIcon,
  CheckIcon,
} from 'src/icons';

import {
  StoryFragment,
  namedOperations,
  useCreateStoryMutation,
  useDeleteStoryMutation,
} from 'src/graphql/_generated/types';
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownLink,
  DropdownItem,
  DropdownButton,
} from 'src/components/Common/Dropdown';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from 'src/components/Common/Dialog';
import { Button } from 'src/components/Common/Button';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { TextField } from 'src/components/Common/TextField';
import { useAuth } from 'src/components/Context/AuthContext';
import { useMyStories } from 'src/components/Context/MyStoriesContext';
import { localeToLanguage } from 'src/utils/useLanguage';
import { Orbit } from '@uiball/loaders';
import { imageLoader } from 'src/utils/formatImage';
import { Reference, StoreObject } from '@apollo/client';
import Head from 'next/head';
import { push } from '@socialgouv/matomo-next';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';

const Page: NextPageWithLayout = () => {
  const { isLoggedIn, authenticate } = useAuth();
  const translate = useTranslations('Stories');

  return (
    <>
      <Head>
        <title>{translate('seoMyStoriesTitle')}</title>
        <meta name="description" content={translate('myStoriesDescription')} />
        <meta name="keyword" content={translate('myStoriesKeywords')} />
      </Head>
      {isLoggedIn ? (
        <MyStories />
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

const MyStories = () => {
  const { stories, loading } = useMyStories();
  const [showClipboardToast, setShowClipboardToast] = React.useState(false);
  const translate = useTranslations('EditStory');

  return loading ? (
    <Flex
      alignItems="center"
      justifyContent="center"
      css={{ width: '100%', height: '100%' }}
    >
      <Orbit color="#002fff" />
    </Flex>
  ) : (
    <Box mt={{ '@initial': 5, '@bp2': 10 }} px={{ '@initial': 3, '@bp2': 10 }}>
      <Grid
        gap={{
          '@initial': 4,
          '@bp3': 8,
          '@bp4': 10,
        }}
        css={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

          '@bp1': {
            gridTemplateColumns:
              stories.length === 0
                ? 'repeat(auto-fit, minmax(420px, 600px))'
                : 'repeat(auto-fit, minmax(420px, 1fr))',
          },

          '@bp4': {
            gridTemplateColumns:
              stories.length <= 1
                ? 'repeat(auto-fit, minmax(420px, 600px))'
                : undefined,
          },
        }}
      >
        <Box
          css={{
            position: 'relative',
            display: 'inline-flex',
            '&::before': {
              content: '',
              width: '100%',
              height: 0,
              paddingBottom: 'calc(100% / (7 / 3))',
            },

            '@bp1': {
              '&:before': {
                paddingBottom: 'calc(100% / (3 / 1))',
              },
            },

            '@media(min-width: 880px)': {
              '&:before': {
                paddingBottom: 'calc(100% / (19 / 10))',
              },
            },
          }}
        >
          <CreateStoryDialog />
        </Box>
        {stories.map(story => (
          <Box
            key={story.id}
            css={{
              position: 'relative',
              display: 'inline-flex',
              '&:before': {
                content: '',
                width: '100%',
                height: 0,
                paddingBottom: 'calc(100% / (7 / 3))',
              },

              '@bp1': {
                '&:before': {
                  paddingBottom: 'calc(100% / (3 / 1))',
                },
              },

              '@media(min-width: 880px)': {
                '&:before': {
                  paddingBottom: 'calc(100% / (19 / 10))',
                },
              },
            }}
          >
            <StoryCard
              story={story}
              setShowClipboardToast={setShowClipboardToast}
            />
          </Box>
        ))}
      </Grid>
      <Toast open={showClipboardToast} onOpenChange={setShowClipboardToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex css={{ mt: '$3' }}>
              <Flex
                css={{
                  display: 'inline-flex',
                  pt: '2px',
                  flexShrink: 0,
                }}
              >
                <CheckIcon />
              </Flex>
              {translate('copiedToClipboard')}
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button variant="ghost-blue">
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
    </Box>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
interface StoryCardProps {
  story: StoryFragment;
  setShowClipboardToast: React.Dispatch<React.SetStateAction<boolean>>;
}
function StoryCard({ story, setShowClipboardToast }: StoryCardProps) {
  const [deleteStory] = useDeleteStoryMutation();
  const translate = useTranslations('EditStory');

  return (
    <Box
      css={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(to bottom, rgba(0, 47, 255, 0.25), rgba(0, 47, 255, 0.85))',
        borderRadius: '8px',
      }}
    >
      {story?.previewImage?.url ? (
        <Box
          css={{
            position: 'absolute',
            left: 0,
            top: 0,
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
            src={story.previewImage.url}
            alt={story.title}
            fill={true}
            sizes="20vw"
            loader={imageLoader}
          />
        </Box>
      ) : null}
      <Box
        css={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <Link href={`/stories/${story.id}`}>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            css={{
              height: '100%',
            }}
          >
            <Flex justifyContent="flex-end">
              <Box
                css={{
                  display: 'inline-flex',
                  backgroundColor: '$blue100',
                  borderRadius: '0 7px',
                  padding: '4px',
                }}
              >
                {story.isPublished ? (
                  <IsPublicIcon
                    aria-label={translate('storyIsPublic')}
                    width="16px"
                    height="16px"
                    color="#339A03"
                  />
                ) : (
                  <NotPublicIcon
                    aria-label={translate('storyIsNotPublic')}
                    width="16px"
                    height="16px"
                    color="#FF8B8B"
                  />
                )}
              </Box>
            </Flex>
            <Box
              pl={{
                '@initial': 1,
                '@bp2': 3,
              }}
              pr="7"
              pb={{
                '@initial': 3,
                '@bp2': 6,
              }}
            >
              <Text
                color="white"
                size={{ '@initial': 'normal', '@bp2': 'large' }}
                weight="bold"
              >
                {story.title}
              </Text>
            </Box>
          </Flex>
        </Link>
        <Box
          css={{
            position: 'absolute',
            bottom: 0,
            right: 0,
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
                  <DropdownLink href={`/stories/${story.id}`}>
                    <Box mr="2" css={{ display: 'inline-flex' }}>
                      <PenIcon />
                    </Box>
                    <Text>{translate('edit')}</Text>
                  </DropdownLink>
                </DropdownItem>
                <DropdownItem
                  disabled={!story.modules || story.modules?.length == 0}
                >
                  <DropdownLink
                    href={`/presentation/${encodeURIComponent(story.title)}/${
                      story.id
                    }`}
                  >
                    <Box mr="2" css={{ display: 'inline-flex' }}>
                      <PreviewIcon />
                    </Box>
                    <Text>{translate('Preview')}</Text>
                  </DropdownLink>
                </DropdownItem>
                <DropdownItem
                  disabled={!story.modules || story.modules?.length == 0}
                >
                  <DropdownButton
                    disabled={!story.modules || story.modules?.length == 0}
                    onClick={() => {
                      const originUrl = window.location.origin;
                      const shareUrl = `${originUrl}/presentation/${story.title}/${story.id}`;
                      if (navigator.share) {
                        navigator.share({
                          url: shareUrl,
                          title: story.title,
                        });
                      } else {
                        navigator.clipboard
                          .writeText(`${shareUrl}`)
                          .then(() => {
                            setShowClipboardToast(true);
                          })
                          .catch(error => {
                            console.error('Error writing to clipboard:', error);
                          });
                      }
                    }}
                  >
                    <Flex gap="2" alignItems="center">
                      <ShareIcon />
                      <Text>{translate('Share')}</Text>
                    </Flex>
                  </DropdownButton>
                </DropdownItem>
                <DropdownItem>
                  <DialogTrigger asChild>
                    <DropdownButton>
                      <Flex css={{ display: 'inline-flex', mr: '$2' }}>
                        <DeleteIcon />
                      </Flex>
                      <Text>{translate('delete')}</Text>
                    </DropdownButton>
                  </DialogTrigger>
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
            <DialogContent small>
              <Box mt="4">
                <Flex justifyContent="flex-end">
                  <DialogClose asChild>
                    <Button aria-label={translate('close')} variant="ghost">
                      <CrossIcon color="black" width="40px" height="40px" />
                    </Button>
                  </DialogClose>
                </Flex>
              </Box>
              <Box px="8" pb="6" mt="1" css={{ textAlign: 'center' }}>
                <DialogTitle>{translate('confirmDelete')}</DialogTitle>
                <DialogDescription>
                  {translate('storyDeleted')}
                </DialogDescription>
                <Flex justifyContent="center" gap="5">
                  <DialogClose asChild>
                    <Button variant="ghost-dark">{translate('Cancel')}</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        deleteStory({
                          variables: {
                            delete: {
                              storyId: story.id,
                            },
                          },
                          update: cache => {
                            cache.modify({
                              fields: {
                                myStories(existingStories = [], { readField }) {
                                  return existingStories.filter(
                                    (
                                      storyRef:
                                        | Reference
                                        | StoreObject
                                        | undefined
                                    ) => story.id !== readField('id', storyRef)
                                  );
                                },
                              },
                            });
                          },
                        });
                      }}
                    >
                      {translate('delete')}
                    </Button>
                  </DialogClose>
                </Flex>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

const ThreeDotsButton = styled('button', {
  all: 'unset',
  width: '22px',
  height: '22px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '7px 0',
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

const CreateStoryDialog = () => {
  const router = useRouter();
  const language = localeToLanguage(router.locale || '');
  const translate = useTranslations('Stories');
  const [title, setTitle] = React.useState('');
  const [createStory, { loading }] = useCreateStoryMutation();

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={() => push(['trackEvent', 'Stories', 'Start New Story'])}
      >
        <CardButton>
          <Box p="2">
            <Text
              size={{ '@initial': 'normal', '@bp2': 'large' }}
              weight="bold"
            >
              {translate('newStory')} +
            </Text>
          </Box>
        </CardButton>
      </DialogTrigger>
      <DialogContent small>
        <Flex css={{ mt: '$4' }} justifyContent="flex-end" alignItems="center">
          <DialogClose asChild>
            <Button
              css={{
                '&:hover': {
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  '> svg': {
                    color: '$blueDark',
                  },
                },
              }}
              aria-label={translate('close')}
              variant="ghost-dark"
            >
              <CrossIcon aria-hidden="true" width="40px" height="40px" />
            </Button>
          </DialogClose>
        </Flex>
        <Box px="8" pb="6" mt="1" css={{ textAlign: 'center' }}>
          <DialogTitle>{translate('newStory')}</DialogTitle>
          <Box
            as="form"
            mt="10"
            method="post"
            onSubmit={event => {
              event.preventDefault();
              createStory({
                variables: {
                  create: {
                    title: title,
                    language: language,
                  },
                },
                onCompleted(data) {
                  push(['trackEvent', 'Stories', 'New Story Created']);
                  router.push(`/stories/${data?.createStory.id}/`);
                },
                refetchQueries: [namedOperations.Query.MyStories],
              });
            }}
          >
            <TextField
              autoFocus
              placeholder="Titel"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <Flex
              justifyContent="center"
              gap="5"
              css={{
                mt: '$10',
              }}
            >
              <DialogClose asChild>
                <Button type="button" variant="ghost-dark">
                  {translate('abort')}
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit">
                {translate('save')}
              </Button>
            </Flex>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const CardButton = styled('button', {
  all: 'unset',
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$blue100',
  borderRadius: '8px',
  color: '$blue',
  textAlign: 'center',
  cursor: 'pointer',
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

export default Page;
