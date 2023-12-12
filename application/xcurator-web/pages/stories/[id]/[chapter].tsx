import * as React from 'react';
import { Box, Flex } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { localeToLanguage } from 'src/utils/useLanguage';
import {
  useStoryQuery,
  namedOperations,
  useUpdateModuleMutation,
} from 'src/graphql/_generated/types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { EditChapter } from 'src/components/Story/EditChapter';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useAuth } from 'src/components/Context/AuthContext';
import { Orbit } from '@uiball/loaders';
import { theme } from 'src/themes/theme';
import { Button } from 'src/components/Common/Button';
import Link from 'next/link';
import Head from 'next/head';

export default function Page({
  storyId,
  moduleId,
  locale,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const translate = useTranslations('EditStory');
  const language = localeToLanguage(locale);
  const router = useRouter();
  const [failToast, setFailToast] = React.useState(false);
  const { isLoggedIn, loading: authLoading, authenticate, userId } = useAuth();
  const { data, loading } = useStoryQuery({
    variables: { where: { id: storyId as string, language } },
  });

  const chapter = React.useMemo(() => {
    return data?.story?.modules?.find(m => m.id === moduleId);
  }, [data?.story?.modules, moduleId]);

  const [updateModule] = useUpdateModuleMutation({
    refetchQueries: [namedOperations.Query.Story],
  });

  const save = (thought: string, artefactIds: string[]) => {
    if (!data?.story || !chapter) return;
    updateModule({
      variables: {
        update: {
          storyId: data.story.id,
          moduleId: chapter.id,
          thought: thought,
          artefactIds: artefactIds,
        },
      },
      onCompleted() {
        if (!data?.story) return;
        router.push(`/stories/${data.story.id}`, undefined, {
          shallow: true,
        });
      },
      onError() {
        setFailToast(true);
      },
    });
  };

  return (
    <>
      <Head>
        <title>{translate('seoEditChapter')}</title>
        <meta
          name="description"
          content={translate('editChapterDescription')}
        />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      {loading || authLoading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          css={{ minHeight: '100vh', width: '100%', px: '$3' }}
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
      ) : !data?.story || !chapter ? (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="10"
          css={{ minHeight: '100vh', width: '100%', px: '$3' }}
        >
          <Text size="xlarge">
            {!data?.story
              ? translate('storyNotFound')
              : translate('chapterNotFound')}
          </Text>
          <Link href={`/stories`}>
            <Box
              css={{
                color: 'white',
                backgroundColor: '$blueDark',
                padding: '18px 28px 18px 28px',
                borderRadius: '$2',
                border: '1px solid $blue',

                '&:hover': {
                  backgroundColor: '$blue',
                },
              }}
            >
              <Text size="xlarge" weight="bold">
                {translate('myStories')}
              </Text>
            </Box>
          </Link>
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
          <Text weight="bold" size="xlarge">
            {translate('notYourStory')}
          </Text>
          <Text size="large">{translate('createOwnStory')}</Text>
          <Link href={`/stories`}>
            <Box
              css={{
                color: 'white',
                backgroundColor: '$blueDark',
                padding: '18px 28px 18px 28px',
                borderRadius: '$2',
                border: '1px solid $blue',

                '&:hover': {
                  backgroundColor: '$blue',
                },
              }}
            >
              <Text size="xlarge" weight="bold">
                {translate('myStories')}
              </Text>
            </Box>
          </Link>
        </Flex>
      ) : (
        <>
          <Head>
            <title>
              {translate('seoEditChapter') + ' - ' + data.story.title}
            </title>
          </Head>
          <EditChapter
            story={data.story}
            chapter={chapter}
            header={translate('editChapter')}
            failToast={failToast}
            setFailToast={setFailToast}
            save={save}
          />
        </>
      )}
    </>
  );
}

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  if (!locale)
    return {
      storyId: params?.id || '',
      moduleId: params?.chapter || '',
    };
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      storyId: params?.id || '',
      moduleId: params?.chapter || '',
      locale,
    },
  };
}
