import * as React from 'react';
import { Box, Flex, Grid } from '@3pc/layout-components-react';
import Link from 'next/link';
import { NextPageWithLayout } from 'pages/_app';
import { Text } from 'src/components/Common/Text';
import Image from 'next/image';
import Layout from 'src/components/Stories/layout';
import { SortDirection, useStoriesQuery } from 'src/graphql/_generated/types';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from 'src/components/Common/Dropdown';
import { ArrowDownIcon } from 'src/icons';
import { useRouter } from 'next/router';
import { localeToLanguage } from 'src/utils/useLanguage';
import { Orbit } from '@uiball/loaders';
import { colors } from 'src/themes/theme';
import { imageLoader } from 'src/utils/formatImage';
import Head from 'next/head';

const SORT_OPTIONS = [
  {
    label: 'newest',
    value: 'createdAt',
  },
  {
    label: 'mostLoved',
    value: 'rating',
  },
];

const All: NextPageWithLayout = () => {
  const router = useRouter();
  const language = localeToLanguage(router.locale || '');
  const [sortOpen, setSortOpen] = React.useState(false);
  const [sort, setSort] = React.useState<
    { label: string; value: string } | undefined
  >();

  const orderBy = React.useMemo(() => {
    if (!sort) return undefined;
    if (sort.value === 'createdAt') return { createdAt: SortDirection.Desc };
    if (sort.value === 'rating') return { rating: SortDirection.Desc };
    return undefined;
  }, [sort]);

  const {
    data: allStories,
    loading,
    error,
  } = useStoriesQuery({
    variables: { language: language, orderBy: orderBy },
  });
  const translate = useTranslations('Stories');

  if (loading)
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        css={{ width: '100%', height: '100%' }}
      >
        <Orbit aria-label={translate('loading')} color="#002fff" />
      </Flex>
    );

  if (error) return <div>There was an error, {error.message}</div>;

  return (
    <Box mt={{ '@initial': 3, '@bp2': 7 }} px={{ '@initial': 3, '@bp2': 10 }}>
      <Head>
        <title>{translate('seoAllStoriesTitle')}</title>
        <meta name="description" content={translate('allStoriesDescription')} />
        <meta name="keyword" content={translate('allStoriesKeywords')} />
      </Head>
      {!allStories?.stories || allStories?.stories?.length === 0 ? (
        <Box p="4">
          <Flex justifyContent="center">
            <Text>{translate('noStories')}</Text>
          </Flex>
        </Box>
      ) : (
        <>
          <Flex justifyContent="flex-end">
            <Dropdown
              open={sortOpen}
              onOpenChange={() => setSortOpen(!sortOpen)}
            >
              <DropdownTrigger asChild>
                <DropdownButton css={{ px: 0, width: '213px' }}>
                  <Box
                    css={{
                      width: '100%',
                      svg: {
                        transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      },
                    }}
                  >
                    <Flex justifyContent="space-between">
                      <Text color="blueDark">
                        {sort
                          ? translate(sort.label as keyof Messages['Stories'])
                          : translate('sort')}
                      </Text>
                      <Box css={{ display: 'inline-flex', color: '$blue' }}>
                        <ArrowDownIcon aria-hidden="true" />
                      </Box>
                    </Flex>
                    <Box
                      mt="1"
                      css={{
                        height: '1px',
                        backgroundColor: 'black',
                      }}
                    />
                  </Box>
                </DropdownButton>
              </DropdownTrigger>
              <DropdownContent
                align="end"
                css={{ width: '213px', borderRadius: '$2' }}
              >
                {SORT_OPTIONS.map(option => (
                  <DropdownItem
                    key={option.value}
                    onClick={() => {
                      setSortOpen(false);
                      setSort(sort == option ? undefined : option);
                    }}
                  >
                    <DropdownButton
                      css={{
                        color: option.value === sort?.value ? '$blue' : 'black',
                      }}
                    >
                      <Text>
                        {translate(option.label as keyof Messages['Stories'])}
                      </Text>
                    </DropdownButton>
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </Flex>
          <Grid
            gap={{
              '@initial': 4,
              '@bp3': 8,
              '@bp4': 10,
            }}
            css={{
              mt: '$4',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',

              '@bp1': {
                gridTemplateColumns:
                  allStories.stories.length === 1
                    ? 'repeat(auto-fit, minmax(420px, 600px))'
                    : 'repeat(auto-fit, minmax(420px, 1fr))',
              },

              '@bp2': {
                mt: '$7',
              },

              '@bp4': {
                gridTemplateColumns:
                  allStories.stories.length < 3
                    ? 'repeat(auto-fit, minmax(420px, 600px))'
                    : undefined,
              },
            }}
          >
            {allStories.stories.map(story => (
              <Box
                key={story.id}
                css={{
                  position: 'relative',
                  display: 'flex',
                  '&::before': {
                    content: '',
                    width: '100%',
                    height: 0,
                    paddingBottom: 'calc(100% / (7 / 3))',
                  },

                  '@bp1': {
                    '&::before': {
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
                <Box
                  css={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    background: story.previewImage?.url
                      ? 'linear-gradient(to bottom, rgba(0, 47, 255, 0.25), rgba(0, 47, 255, 0.85))'
                      : 'linear-gradient(#deccff, #7c33ff)',
                  }}
                >
                  <Link
                    href={`/presentation/${encodeURIComponent(story.title)}/${
                      story.id
                    }`}
                  >
                    {story.previewImage?.url ? (
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
                          src={story.previewImage.url}
                          alt={story.title ?? ''}
                          fill={true}
                          sizes="20vw"
                          loader={imageLoader}
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
                      <Text as="h1" size="normal" weight="bold" color="black50">
                        {story?.title}
                      </Text>
                      <Flex
                        justifyContent="space-between"
                        gap={2}
                        alignItems="center"
                        css={{ marginTop: '10px' }}
                      >
                        <Text size="xsmall" color="black50">
                          {'author : ' +
                            (story?.author.username ?? 'not available')}
                        </Text>
                        <Rating
                          value={story?.rating ?? 0}
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
                </Box>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

All.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

export default All;
