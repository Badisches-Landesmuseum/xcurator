import React, { RefObject, useRef, useState } from 'react';
import { localeToLanguage } from 'src/utils/useLanguage';
import { useRouter } from 'next/router';
import { Box, styled, Flex } from 'src/@3pc/layout-components-react';
import { theme, darkTheme } from 'src/themes/theme';
import { ArtefactFragment, useStoryQuery } from 'src/graphql/_generated/types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ArrowDownIcon } from 'src/icons/ArrowDownIcon';
import { Text } from 'src/components/Common/Text';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'src/icons';
import 'react-multi-carousel/lib/styles.css';
import { Button } from 'src/components/Common/Button';
import Image from 'next/image';
import { Orbit } from '@uiball/loaders';
import { saveSizeImage } from 'src/utils/formatImage';
import Head from 'next/head';
import { Feedback } from 'src/components/Presentation/Feedback';
import { Content } from 'src/components/Presentation/Content';

const Page = ({
  id,
  referrer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const language = localeToLanguage(router.locale || '');
  const [page, setPage] = useState(0);
  const scrollContainerRef: RefObject<HTMLDivElement> = useRef(null);
  const translate = useTranslations('Presentation');

  React.useEffect(() => {
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(darkTheme);
    return () => {
      document.documentElement.classList.remove(darkTheme);
      document.documentElement.classList.add(theme);
    };
  }, []);

  const { data, loading, error } = useStoryQuery({
    variables: { where: { id: id as string, language: language } },
  });

  const pages = React.useMemo(() => {
    if (!data?.story) return [];
    const pages: {
      title: string;
      text: string;
      artefacts: ArtefactFragment[];
      isModule: boolean;
    }[] = [{ title: 'home', text: '', artefacts: [], isModule: false }];
    if (
      data.story.introduction &&
      data.story.modules &&
      data.story.modules.length > 0
    )
      pages.push({
        title: translate('introduction'),
        text: data.story.introduction,
        artefacts: [data.story.modules[0].artefacts[0]],
        isModule: false,
      });
    if (data.story.modules) {
      data.story.modules.forEach((module, index) => {
        pages.push({
          title: (index + 1).toString(),
          text: module.thought || '',
          artefacts: module.artefacts,
          isModule: true,
        });
      });
    }
    if (
      data.story.conclusion &&
      data.story.modules &&
      data.story.modules.length > 0
    )
      pages.push({
        title: translate('conclusion'),
        text: data.story.conclusion,
        artefacts: [data.story.modules[0].artefacts[0]],
        isModule: false,
      });
    pages.push({ title: 'feedback', text: '', artefacts: [], isModule: false });
    return pages;
  }, [data?.story, translate]);

  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      {loading ? (
        <>
          <Flex
            css={{ height: '100vh' }}
            justifyContent="center"
            alignItems="center"
          >
            <Orbit aria-label={translate('loading')} color="#002fff" />
          </Flex>
        </>
      ) : error ? (
        <Flex
          css={{ height: '100vh' }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="12"
        >
          <Text>{translate('error')}</Text>
          <Box>
            <Button
              onClick={() => {
                router.push('/stories/all');
              }}
            >
              <Text>{translate('backToStories')}</Text>
            </Button>
          </Box>
        </Flex>
      ) : !data?.story?.modules || data.story.modules.length == 0 ? (
        <Flex
          css={{ width: '100%', height: '100%' }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="8"
        >
          <Box px="4">
            <Text as="h1" weight="bold" size="large">
              {translate('cannotBeViewed')}
            </Text>
          </Box>
          <Box>
            <Button
              onClick={() => {
                router.push('/stories/all');
              }}
            >
              <Text>{translate('backToStories')}</Text>
            </Button>
          </Box>
        </Flex>
      ) : (
        <>
          <Head>{translate('seoTitle') + ' - ' + data.story.title}</Head>
          <Box
            css={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              maxHeight: '100svh',
            }}
          >
            <Box
              css={{
                position: 'absolute',
                top: '$2',
                left: '$2',
                zIndex: '3',
                '@bp2': {
                  top: '$10',
                  left: '$6',
                },
              }}
            >
              {referrer && referrer !== window.location.href ? (
                <StyledHomeLink
                  href={referrer}
                  aria-label={translate('return')}
                >
                  <Flex alignItems="center" gap="2">
                    <ArrowLeft aria-hidden="true" width="19px" height="19px" />
                    <Text>{translate('back')}</Text>
                  </Flex>
                </StyledHomeLink>
              ) : (
                <StyledHomeLink aria-label={translate('return')} href="/canvas">
                  <Box css={{ '> img': { width: '100%', objectFit: 'fill' } }}>
                    <Image
                      src="/images/Logo_xCurator.svg"
                      alt="Logo XCurator"
                      width={30}
                      height={30}
                    />
                  </Box>
                </StyledHomeLink>
              )}
            </Box>
            {page === 0 ? (
              <Box
                css={{
                  position: 'relative',
                  height: '100svh',
                  width: '100vw',
                }}
              >
                <Box
                  css={{
                    position: 'absolute',
                    top: 0,
                    width: '100vw',
                    height: '100%',
                    zIndex: 1,
                    backgroundColor: '$blue900',
                  }}
                >
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    css={{
                      position: 'sticky',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      css={{
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                        '> img': {
                          objectFit: 'cover',
                        },
                      }}
                    >
                      <Image
                        src={data.story.modules[0].artefacts[0].images[0].url}
                        alt={data.story.modules[0].artefacts[0].title}
                        fill
                        loader={saveSizeImage(
                          data.story.modules[0].artefacts[0].images[0]
                        )}
                      />
                    </Box>
                  </Flex>
                  <Box
                    css={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 1,
                      backgroundColor: '$blue900',
                      opacity: 0.7,
                    }}
                  />
                  <Box
                    css={{
                      position: 'absolute',
                      left: 0,
                      top: '25%',
                      alignItems: 'center',
                      zIndex: 2,
                      width: '100%',
                      '@bp2': {
                        top: '25%',
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    <Box
                      css={{
                        position: 'relative',
                        width: '300px',
                        height: '300px',
                        marginLeft: '-100px',
                        filter: 'invert(1)',
                        '> img': {
                          objectFit: 'cover',
                        },
                        '@bp1': {
                          width: '400px',
                          height: '400px',
                          marginLeft: '-80px',
                        },
                        '@bp3': {
                          width: '540px',
                          height: '540px',
                          marginLeft: '-80px',
                        },
                      }}
                    >
                      <Image src="/images/x.svg" alt="Logo XCurator" fill />
                    </Box>
                    <Box
                      px="4"
                      css={{
                        marginTop: '10%',

                        '@bp2': {
                          marginTop: '30px',
                          marginLeft: '-180px',
                        },
                      }}
                    >
                      <Text
                        as="h1"
                        weight="bold"
                        italic
                        css={{
                          fontSize: '44px',
                          lineHeight: '46px',
                          color: '$white',
                          '@bp2': {
                            fontSize: '54px',
                            lineHeight: '46px',
                          },
                        }}
                      >
                        {data.story.title}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : pages[page].title !== 'feedback' ? (
              <Box
                ref={scrollContainerRef}
                css={{
                  height: '100vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  '::-webkit-scrollbar-thumb': {
                    backgroundColor: '#881',
                    color: 'red',
                  },
                }}
              >
                {pages[page].isModule ? (
                  <Box
                    css={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      mb: '200px',
                    }}
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="flex-end"
                      flexDirection="column"
                      css={{
                        position: 'relative',
                        right: '0%',
                        top: '45%',
                        width: '50px',
                      }}
                    >
                      {data.story.modules.map((module, index) => (
                        <Box
                          key={module.id}
                          css={{
                            width:
                              parseInt(pages[page].title) === index + 1
                                ? '20px'
                                : '10px',
                            height: '3px',
                            marginTop: '10px',
                            backgroundColor:
                              parseInt(pages[page].title) === index + 1
                                ? 'white'
                                : 'gray',
                            zIndex: 9999,
                          }}
                        />
                      ))}
                    </Flex>
                  </Box>
                ) : null}
                <Content
                  key={page}
                  title={pages[page].title}
                  text={pages[page].text}
                  artefacts={pages[page].artefacts}
                  isModule={pages[page].isModule}
                />
              </Box>
            ) : (
              <Feedback story={data.story} id={id as string} />
            )}
            <Box>
              <Box
                css={{
                  position: 'absolute',
                  zIndex: '3',
                  bottom: '10px',
                  right: '0',
                  left: '0',
                  width: '100%',
                }}
              >
                <Flex alignItems="center" justifyContent="center" gap="10">
                  {page > 0 ? (
                    <Box css={{ pr: page === pages.length - 1 ? '89px' : 0 }}>
                      <ScrollButton
                        aria-label={translate('previous')}
                        onClick={() => {
                          setPage(previous => previous - 1);
                          if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTop = 0;
                          }
                        }}
                      >
                        <Box
                          css={{
                            pb: '1px',
                            '> svg': {
                              transform: 'rotate(180deg)',
                            },
                          }}
                        >
                          <ArrowDownIcon
                            aria-hidden="true"
                            width="30px"
                            height="30px"
                          />
                        </Box>
                      </ScrollButton>
                    </Box>
                  ) : null}
                  {page < pages.length - 1 ? (
                    <Box css={{ pl: page === 0 ? '89px' : 0 }}>
                      <ScrollButton
                        aria-label={translate('next')}
                        onClick={() => {
                          setPage(previous => previous + 1);
                          if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTop = 0;
                          }
                        }}
                      >
                        <Box css={{ pl: '1px', pt: '7px' }}>
                          <ArrowDownIcon
                            aria-hidden="true"
                            width="30px"
                            height="30px"
                          />
                        </Box>
                      </ScrollButton>
                    </Box>
                  ) : null}
                </Flex>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

const StyledHomeLink = styled(Link, {
  backgroundColor: 'rgba(0, 47, 255, 0.40)',
  width: '100%',
  height: '100%',
  padding: '5px',
  borderRadius: '4px',
  display: 'flex',
  cursor: 'pointer',
  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const ScrollButton = styled('button', {
  all: 'unset',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: '$blue',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    backgroundColor: '$blueDark',
  },

  '&:disabled': {
    opacity: 0.5,
  },
});

export async function getServerSideProps({
  req,
  params,
  locale,
}: GetServerSidePropsContext) {
  const id = params?.id;

  const referrer = req.headers.referer || null;

  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      id: id,
      referrer: referrer,
    },
  };
}

export default Page;
