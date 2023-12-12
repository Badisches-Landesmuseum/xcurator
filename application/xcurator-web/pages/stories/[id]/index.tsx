import * as React from 'react';
import { Box, Flex, styled } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import DraggableModules from 'src/components/Story/DraggableModules';
import {
  StoryFragment,
  useGenerateConclusionQuery,
  useGenerateIntroductionQuery,
  useSetConclusionMutation,
  useSetIntroductionMutation,
  useStoryQuery,
  useUpdateStoryMutation,
} from 'src/graphql/_generated/types';
import { localeToLanguage } from 'src/utils/useLanguage';
import { CrossIcon, EditIcon, KiIcon } from 'src/icons';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from 'src/components/Common/Dialog';
import { Button } from 'src/components/Common/Button';
import { useTranslations } from 'next-intl';
import { TextField } from 'src/components/Common/TextField';
import Link from 'next/link';
import { Textarea } from 'src/components/Common/Textarea';
import { GenerateAIText } from 'src/components/Story/GenerateAIText';
import { theme } from 'src/themes/theme';
import { Orbit } from '@uiball/loaders';
import { useAuth } from 'src/components/Context/AuthContext';
import Head from 'next/head';

export default function Page({
  locale,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const language = localeToLanguage(locale);
  const translate = useTranslations('EditStory');
  const { isLoggedIn, userId, authenticate, loading: authLoading } = useAuth();
  const { data, loading, error } = useStoryQuery({
    skip: !id || !isLoggedIn,
    variables: { where: { id: id as string, language } },
  });

  return (
    <>
      <Head>
        <title>{translate('seoStoryTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      {loading || authLoading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          css={{
            height: '100vh',
            width: '100%',
          }}
        >
          <Orbit color={theme.colors.blue.value} />
        </Flex>
      ) : !isLoggedIn ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="10"
          css={{
            height: '100vh',
            width: '100%',
          }}
        >
          <Text size="xxlarge">{translate('notLoggedIn')}</Text>
          <Button variant="hero" onClick={() => authenticate()}>
            <Text size="xlarge" weight="bold">
              {translate('login')}
            </Text>
          </Button>
        </Flex>
      ) : !id || error || !data?.story ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          css={{
            height: '100vh',
            width: '100%',
          }}
        >
          <Text>{translate('storyNotFound')}</Text>
        </Flex>
      ) : data.story.author.sub !== userId ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="10"
          css={{
            height: '100vh',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Text weight="bold" size="xxlarge">
            {translate('notYourStory')}
          </Text>
          <Text size="large">{translate('watchinPresenter')}</Text>
          <StyledLink
            href={`/presentation/${encodeURIComponent(data.story.title)}/${id}`}
          >
            <Text size="xlarge" weight="bold">
              {translate('watch')}
            </Text>
          </StyledLink>
        </Flex>
      ) : (
        <>
          <Head>
            <title>
              {translate('seoStoryTitle') + ' : ' + data.story.title}
            </title>
          </Head>
          <Story story={data.story} />
        </>
      )}
    </>
  );
}

function Story({ story }: { story: StoryFragment }) {
  const translate = useTranslations('EditStory');
  const [open, setOpen] = React.useState(false);

  const [introduction, setIntroduction] = React.useState(
    story.introduction ?? ''
  );
  const [conclusion, setConclusion] = React.useState(story.conclusion ?? '');
  const hasStoryMoreThanTwoObjects =
    (story.modules &&
      (story.modules.length >= 2 || story.modules[0]?.artefacts.length >= 2)) ||
    false;

  const [updateIntroduction] = useSetIntroductionMutation();
  const [updateConclusion] = useSetConclusionMutation();

  return (
    <Box pb="4">
      <Box px="10" mt={{ '@initial': 4, '@bp2': 10 }}>
        <Text as="h2" size={{ '@initial': 'xxlarge', '@bp2': 'xxxlarge' }}>
          <Box as="span">
            {story.title}
            <Box as="span" ml="1">
              <Dialog open={open} onOpenChange={open => setOpen(open)}>
                <DialogTrigger asChild>
                  <Button
                    aria-label={translate('editStoryName')}
                    variant="ghost-dark"
                  >
                    <EditIcon aria-hidden="true" />
                  </Button>
                </DialogTrigger>
                <DialogContent small>
                  <Box mt="4">
                    <Flex justifyContent="flex-end">
                      <DialogClose asChild>
                        <Button
                          variant="ghost-dark"
                          css={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            '&:hover': {
                              color: '$blueDark',
                              backgroundColor: 'transparent',
                            },
                          }}
                          aria-label="Close"
                        >
                          <CrossIcon
                            aria-hidden="true"
                            width="27px"
                            height="27px"
                          />
                        </Button>
                      </DialogClose>
                    </Flex>
                    <Box px="8" pb="6" mt="1" css={{ textAlign: 'center' }}>
                      <EditTitle
                        storyId={story.id}
                        storyTitle={story.title}
                        setOpen={setOpen}
                      />
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>
          </Box>
        </Text>
      </Box>
      <Box mt="4" px={{ '@initial': 4, '@bp2': 10 }}>
        <Flex
          justifyContent="center"
          css={{
            pt: '$2',
            borderTop: '1px solid',
            borderColor: '$blue',

            '@bp2': {
              pt: '$10',
            },
          }}
        >
          <Box
            css={{
              width: '100%',
              '@bp2': {
                maxWidth: '500px',
              },
            }}
          >
            <Flex
              justifyContent="space-between"
              alignItems="flex-start"
              css={{ my: '$2' }}
            >
              <Box as="label" htmlFor="introduction">
                <Text>{translate('introduction')}</Text>
              </Box>
              <Dialog>
                <DialogTrigger asChild>
                  <GenerateTextButton disabled={!hasStoryMoreThanTwoObjects}>
                    <Box css={{ display: 'inline-flex', mr: '6px' }}>
                      <KiIcon aria-hidden="true" />
                    </Box>
                    {translate('generate')}
                  </GenerateTextButton>
                </DialogTrigger>
                <DialogContent small>
                  <Box
                    pb="10"
                    css={{
                      overflow: 'auto',
                      maxHeight: 'inherit',
                    }}
                  >
                    <Box
                      css={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'white',
                        borderTopLeftRadius: '19px',
                        borderTopRightRadius: '19px',
                      }}
                    >
                      <Box pt="4">
                        <Flex justifyContent="flex-end">
                          <DialogClose asChild>
                            <Button
                              variant="ghost-dark"
                              css={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                '&:hover': {
                                  color: '$blueDark',
                                  backgroundColor: 'transparent',
                                },
                              }}
                              aria-label={translate('close')}
                            >
                              <CrossIcon
                                aria-hidden="true"
                                width="27px"
                                height="27px"
                              />
                            </Button>
                          </DialogClose>
                        </Flex>
                      </Box>
                      <Box mt="3" pb="3" px="5">
                        <DialogTitle css={{ textAlign: 'center' }}>
                          {translate('generateIntroduction')}
                        </DialogTitle>
                      </Box>
                    </Box>
                    <Box px="5">
                      <GenerateIntroduction
                        storyId={story.id}
                        insert={(text: string) => {
                          setIntroduction(
                            previous =>
                              previous + (previous === '' ? '' : '\n') + text
                          );
                        }}
                      />
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
            </Flex>
            <Textarea
              id="introduction"
              value={introduction}
              onChange={e => setIntroduction(e.target.value)}
              placeholder={translate('addIntroduction')}
            />
            <Flex
              justifyContent="flex-end"
              css={{
                mt: '$1',
              }}
            >
              <SaveButton
                disabled={
                  (!story.introduction && introduction === '') ||
                  (!!story.introduction && introduction === story.introduction)
                }
                onClick={() => {
                  updateIntroduction({
                    variables: {
                      where: {
                        storyId: story.id,
                        introduction,
                      },
                    },
                  });
                }}
              >
                {translate('save')}
              </SaveButton>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <DraggableModules modules={story.modules || []} storyId={story.id} />

      <Box
        css={{
          width: '100%',
          mt: '$5',
          px: '$4',

          '@bp2': {
            px: '$10',
          },
        }}
      >
        <Flex
          justifyContent="center"
          css={{
            pt: '$5',
            width: '100%',
            borderTop: '1px solid',
            borderColor: '$blue',
          }}
        >
          <Box
            css={{
              width: '100%',
              my: '$3',
              '@bp2': {
                maxWidth: '700px',
              },
            }}
          >
            <Link href={`/stories/${story.id}/newChapter`}>
              <Flex
                alignItems="center"
                justifyContent="center"
                css={{
                  width: '100%',
                  minHeight: '90px',
                  borderRadius: '$1',
                  border: '2px solid',
                  borderColor: 'transparent',
                  backgroundColor: '$blue50',
                  color: '$blueDark',

                  '&:hover': {
                    borderColor: '$blue',
                  },
                }}
              >
                <Text>{translate('addChapter')}</Text>
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Box>

      <Box mt="4" px={{ '@initial': 4, '@bp2': 10 }}>
        <Flex
          justifyContent="center"
          css={{
            pt: '$2',
            borderBottom: '1px solid',
            borderBottomColor: '$blue200',
            borderTop: '1px solid',
            borderTopColor: '$blue',

            '@bp2': {
              pt: '$10',
            },
          }}
        >
          <Box
            css={{
              width: '100%',
              '@bp2': {
                maxWidth: '500px',
              },
            }}
          >
            <Flex
              justifyContent="space-between"
              alignItems="flex-start"
              css={{ my: '$2' }}
            >
              <Box as="label" htmlFor="conclusion">
                <Text>{translate('conclusion')}</Text>
              </Box>
              <Dialog>
                <DialogTrigger asChild>
                  <GenerateTextButton disabled={!hasStoryMoreThanTwoObjects}>
                    <Box css={{ display: 'inline-flex', mr: '6px' }}>
                      <KiIcon aria-hidden="true" />
                    </Box>
                    {translate('generate')}
                  </GenerateTextButton>
                </DialogTrigger>
                <DialogContent small>
                  <Box
                    pb="10"
                    css={{
                      overflow: 'auto',
                      maxHeight: 'inherit',
                    }}
                  >
                    <Box
                      css={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'white',
                        borderTopLeftRadius: '19px',
                        borderTopRightRadius: '19px',
                      }}
                    >
                      <Box pt="4">
                        <Flex justifyContent="flex-end">
                          <DialogClose asChild>
                            <Button
                              variant="ghost-dark"
                              css={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                '&:hover': {
                                  color: '$blueDark',
                                  backgroundColor: 'transparent',
                                },
                              }}
                              aria-label={translate('close')}
                            >
                              <CrossIcon
                                aria-hidden="true"
                                width="27px"
                                height="27px"
                              />
                            </Button>
                          </DialogClose>
                        </Flex>
                      </Box>
                      <Box mt="3" px="5" pb="10">
                        <DialogTitle css={{ textAlign: 'center' }}>
                          {translate('generateConclusion')}
                        </DialogTitle>
                      </Box>
                    </Box>

                    <Box px="5">
                      <GenerateConclusion
                        storyId={story.id}
                        insert={(text: string) => {
                          setConclusion(
                            previous =>
                              previous + (previous === '' ? '' : '\n') + text
                          );
                        }}
                      />
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
            </Flex>
            <Textarea
              id="conclusion"
              value={conclusion}
              onChange={e => setConclusion(e.target.value)}
              placeholder={translate('addConclusion')}
            />
            <Flex
              justifyContent="flex-end"
              css={{
                mt: '$1',
              }}
            >
              <SaveButton
                disabled={
                  (!story.conclusion && conclusion === '') ||
                  (!!story.conclusion && conclusion === story.conclusion)
                }
                onClick={() => {
                  updateConclusion({
                    variables: {
                      where: {
                        storyId: story.id,
                        conclusion,
                      },
                    },
                  });
                }}
              >
                {translate('save')}
              </SaveButton>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

const GenerateIntroduction = ({
  storyId,
  insert,
}: {
  storyId: string;
  insert: (text: string) => void;
}) => {
  const { data, loading, error, refetch } = useGenerateIntroductionQuery({
    variables: {
      where: {
        storyId,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <GenerateAIText
      text={data?.generateIntroduction}
      loading={loading}
      error={error}
      refetch={refetch}
      insert={insert}
    />
  );
};

const GenerateConclusion = ({
  storyId,
  insert,
}: {
  storyId: string;
  insert: (text: string) => void;
}) => {
  const { data, loading, error, refetch } = useGenerateConclusionQuery({
    variables: {
      where: {
        storyId,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <GenerateAIText
      text={data?.generateConclusion}
      loading={loading}
      error={error}
      refetch={refetch}
      insert={insert}
    />
  );
};

const EditTitle = ({
  storyTitle,
  storyId,
  setOpen,
}: {
  storyTitle: string;
  storyId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const translate = useTranslations('EditStory');
  const [title, setTitle] = React.useState(storyTitle);
  const [updateStory, { loading }] = useUpdateStoryMutation();

  return (
    <>
      <DialogTitle>{translate('editTitle')}</DialogTitle>
      <Box
        as="form"
        mt="10"
        method="post"
        onSubmit={event => {
          event.preventDefault();
          updateStory({
            variables: {
              update: {
                title,
                storyID: storyId,
              },
            },
            onCompleted() {
              setOpen(false);
            },
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
            <Button
              aria-label={translate('close')}
              type="button"
              variant="ghost-dark"
            >
              {translate('Cancel')}
            </Button>
          </DialogClose>
          <Button disabled={loading} type="submit">
            {translate('save')}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

const StyledLink = styled(Link, {
  color: 'white',
  backgroundColor: '$blueDark',
  padding: '18px 28px 18px 28px',
  borderRadius: '$2',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '28px',
  lineHeight: 1,
  fontWeight: '$regular',
  textAlign: 'center',
  border: '1px solid $blue',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '$blueDark',
  },
});

const GenerateTextButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  color: '$purple',
  px: '0',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#8E009A',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&[disabled]': {
    cursor: 'default',
    color: '$black600',
  },
});

const SaveButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$blue',
  backgroundColor: 'transparent',
  p: '$2',
  cursor: 'pointer',
  border: '1px solid',
  borderColor: 'transparent',
  borderRadius: '$1',
  '&:hover': {
    borderColor: '$blue',
  },

  '&[disabled]': {
    color: '$black600',
    borderColor: 'transparent',
    cursor: 'default',
  },
});

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      id: params?.id || '',
      locale,
    },
  };
}
