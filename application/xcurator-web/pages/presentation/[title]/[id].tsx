import React, { RefObject, useRef, useState } from 'react';
import { localeToLanguage } from 'src/utils/useLanguage';
import { useRouter } from 'next/router';
import { Box, styled, Flex, Stack, Grid } from '@3pc/layout-components-react';
import { theme, darkTheme } from 'src/themes/theme';
import {
  ArtefactFragment,
  StoryFragment,
  namedOperations,
  useGetArtefactQuery,
  useGetSimilarArtefactsQuery,
  useRateStoryMutation,
  useReportStoryMutation,
  useStoryQuery,
} from 'src/graphql/_generated/types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ArrowDownIcon } from 'src/icons/ArrowDownIcon';
import { Text } from 'src/components/Common/Text';
import Link from 'next/link';
import { useAuth } from 'src/components/Context/AuthContext';
import { useTranslations } from 'next-intl';
import { Rating, Star } from '@smastrom/react-rating';
import { InView } from 'react-intersection-observer';
import {
  ArrowLeft,
  CheckIcon,
  CloseIcon,
  CrossIcon,
  InfoIcon,
  ShareIcon,
} from 'src/icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from 'src/components/Common/Dialog';
import { Button } from 'src/components/Common/Button';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { enrichMarkupWithEntities } from 'src/utils/enrichMarkupWithEntities';
import { Line } from 'src/components/Common/Line';
import Image from 'next/image';
import { Orbit } from '@uiball/loaders';
import formatImage, { imageLoader } from 'src/utils/formatImage';
import Head from 'next/head';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';

const IMAGE_RESOLUTION = 800;

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
                        src={formatImage(
                          data.story.modules[0].artefacts[0].images[0].url,
                          IMAGE_RESOLUTION
                        )}
                        alt={data.story.modules[0].artefacts[0].title}
                        fill
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
                          marginTop: '0',
                          marginLeft: '-10%',
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
                  ) : null}
                  {page < pages.length - 1 ? (
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

const Content = ({
  title,
  text,
  artefacts,
  isModule,
}: {
  title: string;
  text: string;
  artefacts: ArtefactFragment[];
  isModule: boolean;
}) => {
  const [controles, setControles] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const translate = useTranslations('Presentation');
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Grid
      css={{
        backgroundColor: '$blue900',
        position: 'relative',
        alignItems: 'stretch',
        '@bp2': {
          alignItems: 'start',
          gridTemplateColumns: '400px 1fr',
          justifyItems: 'center',
        },

        '@bp3': {
          gridTemplateColumns: '400px 1fr',
        },
      }}
    >
      <Box
        css={{
          position: 'fixed',
          top: '0',
          width: '100%',
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        css={{
          maxHeight: '100vh',
          width: '100%',
          position: 'sticky',
          top: '0',
          '@bp2': {
            width: '100%',
            height: '100%',
            gridColumn: '2 / 3',
            mx: 'auto',
          },
        }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          css={{
            flex: '0 0 100%',
            position: 'relative',
            height: '100vh',
            '@bp2': {
              maxWidth: 'calc(100vw - 400px)',
            },
          }}
        >
          <Flex
            justifyContent="center"
            alignItems="baseline"
            css={{
              position: 'absolute',
              top: '$20',
              right: 0,
              left: 0,
              zIndex: 1,
              '@bp2': {
                gridColumn: '2 / 3',
                top: '$10',
              },
            }}
          >
            {controles && (
              <Box
                css={{
                  minWidth: '100px',
                  backgroundColor: 'rgba(0, 14, 78, 0.8)',
                  padding: '10px',
                  borderRadius: '4px',
                }}
              >
                <Text css={{ textAlign: 'center' }} color="white" size="xsmall">
                  {artefacts[carouselIndex].title}
                </Text>
              </Box>
            )}
          </Flex>

          {artefacts.length <= 1 ? (
            <Box
              css={{
                position: 'relative',
                height: '100%',
                maxHeight: '100vh',
                '> img': {
                  width: '100%',
                  height: '100%',
                  maxHeight: '100vh',
                  maxWidth: '100vw',
                  objectFit: 'contain',
                },
              }}
            >
              <Image
                src={artefacts[0].images[0].url}
                alt={artefacts[0].title}
                sizes="(min-width: 968px) 400px, 200px"
                width={300}
                height={
                  (300 / artefacts[0].images[0].width) *
                  artefacts[0].images[0].height
                }
                loader={imageLoader}
              />
            </Box>
          ) : (
            <Carousel
              arrows={false}
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              <Box
                css={{
                  '> img': {
                    width: '100%',
                    height: '100%',
                    maxHeight: '100vh',
                    maxWidth: '100vw',
                    objectFit: 'contain',
                  },
                }}
              >
                <Image
                  src={formatImage(
                    artefacts[carouselIndex].images[0].url,
                    IMAGE_RESOLUTION
                  )}
                  alt={artefacts[carouselIndex].title}
                  sizes="(min-width: 968px) 400px, 200px"
                  width={300}
                  height={
                    (300 / artefacts[carouselIndex].images[0].width) *
                    artefacts[carouselIndex].images[0].height
                  }
                />
              </Box>
            </Carousel>
          )}
        </Flex>

        {artefacts.length > 1 && controles ? (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            css={{
              position: 'absolute',
              top: '50%',
              width: '100%',
              right: '0',
              left: '0',
              mr: '20px',
              pb: '$24',
              px: '10px',
              zIndex: 999,
              '@bp2': {
                gridColumn: '2 / 3',
                width: '100%',
                px: '20px',
              },
            }}
          >
            <CarouselButton
              aria-label={translate('previousImage')}
              onClick={() => {
                if (carouselIndex <= 0) {
                  setCarouselIndex(artefacts.length - 1);
                } else {
                  setCarouselIndex(carouselIndex - 1);
                }
              }}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                css={{
                  transform: 'rotate(90deg)',
                }}
              >
                <ArrowDownIcon aria-hidden="true" width="27px" height="27px" />
              </Flex>
            </CarouselButton>
            <CarouselButton
              aria-label={translate('nextImage')}
              onClick={() => {
                if (carouselIndex < artefacts.length - 1) {
                  setCarouselIndex(carouselIndex + 1);
                } else {
                  setCarouselIndex(0);
                }
              }}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                css={{
                  transform: 'rotate(270deg)',
                }}
              >
                <ArrowDownIcon aria-hidden="true" width="27px" height="27px" />
              </Flex>
            </CarouselButton>
          </Flex>
        ) : null}

        {controles ? (
          <Box
            css={{
              position: 'fixed',
              top: '$2',
              right: '$2',
              zIndex: 3,
              '@bp2': {
                visibility: 'visible',
                top: '$10',
                right: '$6',
              },
            }}
          >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Flex justifyContent="center" alignItems="center" gap="1">
                    <InfoIcon aria-hidden="true" width="16px" height="16px" />
                    <Text css={{ ml: '$1' }}>{translate('details')}</Text>
                  </Flex>
                </Button>
              </DialogTrigger>
              <Details artefactID={artefacts[carouselIndex].id} />
            </Dialog>
          </Box>
        ) : null}
      </Flex>
      <Box css={{ '@bp2': { gridRow: '1' } }}>
        <InView onChange={inView => setControles(!inView)} threshold={0.1}>
          {({ ref }) => (
            <Flex
              css={{
                position: 'relative',
                top: '-100vh',
                left: 0,
                width: '100%',
                minHeight: '100vh',
                '@bp2': {
                  background: '#00146C',
                  position: 'unset',
                  gridColumn: '1 / 2',
                  width: '400px',
                  mx: 'auto',
                  minHeight: '100vh',
                },
              }}
            >
              <Box
                css={{
                  flex: '0 0 100%',
                  minHeight: '100%',
                  zIndex: '2',
                  pb: '$20',
                  '@bp2': {
                    mt: '50px',
                  },
                }}
              >
                <Text
                  weight="medium"
                  italic
                  css={{
                    fontSize: isModule ? '153px' : '44px',
                    lineHeight: 1,
                    pl: '20px',
                    mt: '80px',
                  }}
                >
                  {title}
                </Text>
                <Box
                  pr="8"
                  css={{
                    textAlign: 'left',
                    mt: '28px',
                    pl: '20px',
                  }}
                >
                  <Text
                    as="h3"
                    weight="regular"
                    color="white"
                    css={{ fontSize: '20px' }}
                  >
                    {text}
                  </Text>
                </Box>
              </Box>
              <Box
                ref={ref}
                css={{
                  zIndex: 1,
                  flex: '0 0 100%',
                  transform: 'translateX(-100%)',
                  backgroundColor: '$blue900',
                  opacity: 0.7,
                  '@bp2': {
                    display: 'none',
                  },
                }}
              />
              <Box
                css={{
                  flex: '0 0 100%',
                  transform: 'translateX(-200%)',
                  backdropFilter: 'grayscale(100%) blur(2.5px)',
                  '@bp2': {
                    display: 'none',
                  },
                }}
              />
            </Flex>
          )}
        </InView>
      </Box>
    </Grid>
  );
};

const Feedback = ({ story, id }: { story: StoryFragment; id: string }) => {
  const [rateStory] = useRateStoryMutation();
  const translate = useTranslations('Presentation');
  const { isLoggedIn, userId } = useAuth();
  const [showClipboardToast, setShowClipboardToast] = useState(false);
  const [reportStory] = useReportStoryMutation();
  const [dialogReportOpen, setDialogReportOpen] = useState(false);
  const [reportedToast, setReportedToast] = useState(false);

  if (!story.modules) return;

  return (
    <>
      <Box
        css={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box
          css={{
            position: 'absolute',
            top: 0,
            width: '100%',
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
              height: '100%',
              width: '100%',
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
                src={formatImage(
                  story.modules[0].artefacts[0].images[0].url,
                  IMAGE_RESOLUTION
                )}
                alt={story.modules[0].artefacts[0].title}
                fill
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
          <Flex
            justifyContent="center"
            alignItems="flex-start"
            flexDirection="column"
            gap="8"
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: '0 auto',
              width: '100%',
              zIndex: 1,
              px: '$4',
              height: '100%',
              '@bp2': {
                width: '700px',
              },
            }}
          >
            {story.author.sub !== userId ? (
              <>
                <Text
                  as="h1"
                  weight="bold"
                  italic
                  css={{
                    fontSize: '40px',
                    lineHeight: '44px',
                  }}
                >
                  {translate('likedTheStory')}
                </Text>
                {isLoggedIn ? (
                  <Rating
                    id={id}
                    value={story.myRating || 0}
                    style={{ maxWidth: 300 }}
                    onChange={(selectedValue: number) => {
                      rateStory({
                        variables: {
                          id: id,
                          rating: selectedValue as number,
                        },
                        update(cache) {
                          cache.modify({
                            id: cache.identify(story),
                            fields: {
                              myRating() {
                                return selectedValue;
                              },
                            },
                          });
                        },
                        refetchQueries: [namedOperations.Query.Story],
                      });
                    }}
                    itemStyles={{
                      itemShapes: Star,
                      activeFillColor: '#FFF',
                      inactiveFillColor: 'transparent',
                      itemStrokeWidth: 2,
                      inactiveStrokeColor: '#FFF',
                      activeStrokeColor: '#FFF',
                    }}
                  />
                ) : (
                  <Dialog
                    open={dialogReportOpen}
                    onOpenChange={setDialogReportOpen}
                  >
                    <DialogTrigger asChild>
                      <Rating
                        id=""
                        value={0}
                        style={{ maxWidth: 300 }}
                        itemStyles={{
                          itemShapes: Star,
                          activeFillColor: '#FFF',
                          inactiveFillColor: 'transparent',
                          itemStrokeWidth: 2,
                          inactiveStrokeColor: '#FFF',
                          activeStrokeColor: '#FFF',
                        }}
                        onChange={() => {
                          setDialogReportOpen(true);
                        }}
                      />
                    </DialogTrigger>
                    <LoginDialogContent />
                  </Dialog>
                )}
              </>
            ) : (
              <Text
                as="h1"
                weight="bold"
                italic
                css={{
                  fontSize: '40px',
                  lineHeight: '44px',
                }}
              >
                {translate('shareYourStory')}
              </Text>
            )}
            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    url: window.location.href,
                    title: story.title,
                  });
                } else {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      setShowClipboardToast(true);
                    })
                    .catch(error => {
                      console.error('Error writing to clipboard:', error);
                    });
                }
              }}
            >
              <Flex alignItems="center" gap="2">
                <ShareIcon aria-hidden="true" width="19px" height="19px" />
                <Text>{translate('share')}</Text>
              </Flex>
            </Button>
            <Line width="100%" color="white" />
            <Text as="h3" size="large" weight="regular">
              {translate('createStoryTitle')}
            </Text>
            <Flex gap="8" css={{ paddingTop: '20px' }}>
              <Flex justifyContent="space-between" alignItems="center" gap="8">
                {isLoggedIn ? (
                  <Link href="/canvas">
                    <Box
                      css={{
                        fontSize: '18px',
                        fontWeight: 400,
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '2px solid #FFF',

                        '&:focus-visible': {
                          outline: '3px solid $green',
                        },
                      }}
                    >
                      <Text>{translate('createStory')}</Text>
                    </Box>
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <ReportButton>
                        <Text>{translate('createStory')}</Text>
                      </ReportButton>
                    </DialogTrigger>
                    <LoginDialogContent />
                  </Dialog>
                )}
                {story.author.sub !== userId && isLoggedIn ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <ReportButton>
                        <Text>{translate('reportStory')}</Text>
                      </ReportButton>
                    </DialogTrigger>
                    <DialogContent dark small>
                      <DialogClose asChild>
                        <Flex justifyContent="flex-end">
                          <Button
                            aria-label={translate('close')}
                            variant="ghost-dark"
                            css={{
                              '&:hover': {
                                backgroundColor: '$blue900',
                                borderColor: 'transparent',
                              },
                            }}
                          >
                            <CloseIcon
                              height="30px"
                              width="30px"
                              color="white"
                            />
                          </Button>
                        </Flex>
                      </DialogClose>
                      <Flex
                        alignItems="center"
                        flexDirection="column"
                        gap="10"
                        css={{ textAlign: 'center', paddingTop: '$6' }}
                      >
                        <Text as="h3" size="xxlarge" weight="bold">
                          {translate('reportStory')}
                        </Text>
                        <Text size="normal">
                          {translate('reportStoryText')}
                        </Text>
                        <DialogClose asChild>
                          <Flex
                            gap="5"
                            css={{ paddingBottom: '$6', paddingTop: '$5' }}
                          >
                            <Button variant="ghost-blue">
                              <Text>{translate('abort')}</Text>
                            </Button>
                            <Button
                              onClick={() => {
                                reportStory({
                                  variables: {
                                    create: {
                                      storyId: story.id,
                                    },
                                  },
                                  onCompleted: () => {
                                    setReportedToast(true);
                                  },
                                });
                              }}
                            >
                              <Text>{translate('reportStory')}</Text>
                            </Button>
                          </Flex>
                        </DialogClose>
                      </Flex>
                    </DialogContent>
                  </Dialog>
                ) : !isLoggedIn ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <ReportButton>
                        <Text>{translate('reportStory')}</Text>
                      </ReportButton>
                    </DialogTrigger>
                    <LoginDialogContent />
                  </Dialog>
                ) : null}
              </Flex>
            </Flex>
          </Flex>
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
          <Toast open={reportedToast} onOpenChange={setReportedToast}>
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
                  {translate('storyWasReported')}
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
      </Box>
    </>
  );
};

const LoginDialogContent = () => {
  const { authenticate } = useAuth();
  const translate = useTranslations('Presentation');

  return (
    <DialogContent dark small>
      <DialogClose asChild>
        <Flex justifyContent="flex-end">
          <Button
            aria-label={translate('close')}
            variant="ghost-dark"
            css={{
              '&:hover': {
                backgroundColor: '$blue900',
                borderColor: 'transparent',
              },
            }}
          >
            <CloseIcon height="30px" width="30px" color="white" />
          </Button>
        </Flex>
      </DialogClose>
      <Flex
        alignItems="center"
        flexDirection="column"
        gap="10"
        css={{ textAlign: 'center', paddingTop: '$6' }}
      >
        <Text as="h3" size="xxlarge" weight="bold">
          {translate('notLoggedIn')}
        </Text>
        <Text size="normal">{translate('pleaseLogin')}</Text>
        <DialogClose asChild>
          <Flex gap="5" css={{ paddingBottom: '$6', paddingTop: '$5' }}>
            <Button variant="ghost-blue">
              <Text>{translate('abort')}</Text>
            </Button>
            <Button
              onClick={() => {
                authenticate();
              }}
            >
              <Text>{translate('login')}</Text>
            </Button>
          </Flex>
        </DialogClose>
      </Flex>
    </DialogContent>
  );
};
type SelectedArtefact = string | null;

const Details = ({ artefactID }: { artefactID: string }) => {
  const translate = useTranslations('Details');
  const router = useRouter();
  const language = localeToLanguage(router.locale || '');
  const [informationExpanded, setInformationExpanded] = useState(false);
  const [selectedArtefact, setSelectedArtefact] =
    useState<SelectedArtefact>(null);

  const artefact = useGetArtefactQuery({
    variables: {
      where: {
        id: selectedArtefact ? selectedArtefact : artefactID,
        language: language,
      },
    },
  });

  const similarArtefacts = useGetSimilarArtefactsQuery({
    variables: {
      where: {
        id: selectedArtefact ? selectedArtefact : artefactID,
        language: language,
      },
      take: 10,
    },
  });

  const description = React.useMemo(() => {
    const entities = artefact.data?.artefact.entities ?? [];
    const hasEntities = entities.length > 0;
    return hasEntities
      ? enrichMarkupWithEntities(artefact.data?.artefact.description, entities)
      : artefact.data?.artefact.description;
  }, [artefact.data?.artefact]);

  return (
    <DialogContent
      onEscapeKeyDown={() => setSelectedArtefact(null)}
      onPointerDownOutside={() => setSelectedArtefact(null)}
      style={{
        padding: '0px',
        backgroundColor: '#00198A',
        overflowY: 'auto',
      }}
    >
      {artefact.loading || similarArtefacts.loading ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          css={{ p: '$4', minHeight: '100vh' }}
        >
          <Orbit aria-label={translate('loading')} color="white" />
        </Flex>
      ) : (
        <Box>
          <Box
            css={{
              position: 'sticky',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00198A',
              zIndex: 11,
              p: '10px',
            }}
          >
            {selectedArtefact ? (
              <Flex justifyContent="space-between" css={{ marginTop: '15px' }}>
                <UnstyledButton
                  aria-label={translate('previousDetailWIndow')}
                  onClick={() => setSelectedArtefact(null)}
                >
                  <ArrowLeft
                    aria-hidden="true"
                    height="40px"
                    width="40px"
                    color="white"
                  />
                </UnstyledButton>
                <DialogClose asChild>
                  <UnstyledButton
                    aria-label={translate('closeDetails')}
                    onClick={() => setSelectedArtefact(null)}
                  >
                    <Flex justifyContent="flex-end">
                      <CrossIcon
                        aria-hidden="true"
                        color="white"
                        width="40px"
                        height="40px"
                      />
                    </Flex>
                  </UnstyledButton>
                </DialogClose>
              </Flex>
            ) : (
              <Flex justifyContent="flex-end" css={{ marginTop: '10px' }}>
                <DialogClose asChild>
                  <UnstyledButton
                    onClick={() => setSelectedArtefact(null)}
                    aria-label={translate('closeDetails')}
                  >
                    <CrossIcon
                      aria-hidden="true"
                      color="white"
                      width="40px"
                      height="40px"
                    />
                  </UnstyledButton>
                </DialogClose>
              </Flex>
            )}
          </Box>
          <Box px={{ '@initial': '4', '@bp2': '8' }}>
            <Grid
              css={{
                alignItems: 'stretch',
                '@bp2': {
                  alignItems: 'start',
                  gridTemplateColumns: '320px 1fr ',
                  gridTemplateRows: '300px 1fr',
                },
              }}
            >
              <Box
                css={{
                  margin: '0 auto',
                  width: '100%',
                  position: 'relative',
                  height: '190px',
                  '> img': {
                    objectFit: 'contain',
                  },
                  '@bp2': {
                    gridColumn: '1 / 2',
                    height: '100%',
                  },
                }}
              >
                <Image
                  src={formatImage(
                    `${artefact.data?.artefact.images[0].url}`,
                    IMAGE_RESOLUTION
                  )}
                  alt={`${artefact.data?.artefact.title}`}
                  fill
                />
              </Box>

              <Box
                my="4"
                pl="3"
                css={{
                  '@bp2': {
                    gridColumn: '2 / 3 ',
                    gridRow: '1 / 2',
                  },
                }}
              >
                <Text
                  as="h1"
                  italic
                  css={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    align: 'center',
                  }}
                >
                  {artefact.data?.artefact?.title}
                </Text>
                <Box mt="5">
                  {description ? (
                    <Box
                      css={{
                        overflow: 'auto',
                        textOverflow: 'ellipsis',
                        position: 'relative',
                        maxHeight: '200px',
                      }}
                    >
                      <Text color="white">
                        <Box
                          as="span"
                          css={{
                            whiteSpace: 'pre-wrap',
                          }}
                          dangerouslySetInnerHTML={{
                            __html: description,
                          }}
                        />
                      </Text>
                    </Box>
                  ) : (
                    <Text color="black600" italic>
                      {translate('noDescription')}
                    </Text>
                  )}
                </Box>
              </Box>
            </Grid>
            <Box
              mt="8"
              css={{
                width: '100%',
                color: 'white',
                borderTop: '1px solid $blue200 ',
                borderBottomColor: informationExpanded
                  ? 'transparent'
                  : '$blue200',
              }}
            >
              <ExpandInformationButton
                onClick={() => setInformationExpanded(!informationExpanded)}
              >
                <Flex alignItems="center" gap={2}>
                  <InfoIcon aria-hidden="true" width="19px" height="19px" />
                  <Text size="xsmall">{translate('moreObjectInfos')}</Text>
                </Flex>
                <Box
                  p="2"
                  css={{
                    '> svg': {
                      transform: informationExpanded ? 'rotate(180deg)' : '',
                    },
                  }}
                >
                  <ArrowDownIcon
                    aria-hidden="true"
                    width="19px"
                    height="19px"
                  />
                </Box>
              </ExpandInformationButton>
              <Grid
                css={{
                  gridTemplateRows: informationExpanded ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.25s ease-out',
                  mt: '$4',
                  pb: informationExpanded ? '$4' : 0,
                  borderBottom: '1px solid',
                  borderColor: informationExpanded ? '$blue200' : 'transparent',
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
                      <Text>{artefact.data?.artefact.dateRange?.literal}</Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">Orte</Text>
                      <Text>
                        {artefact.data?.artefact.locations.map(
                          location => location.name
                        )}
                      </Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">{translate('persons')}</Text>
                      <Text>
                        {artefact.data?.artefact.persons.map(
                          person => person.name
                        )}
                      </Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">{translate('userRights')}</Text>
                      <Text>
                        {artefact.data?.artefact.images[0].licence.name}
                      </Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">{translate('photograph')}</Text>
                    </Flex>
                    <Link
                      href={`${artefact.data?.artefact.sourceInfo.url}`}
                      target="_blank"
                    >
                      <Box
                        css={{
                          color: '$blue200',
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
            <Box mt="5">
              <Text
                as="h1"
                italic
                css={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  color: 'white',
                }}
              >
                {translate('explorer')}
              </Text>
            </Box>
            {similarArtefacts.data?.searchSimilarArtefacts && (
              <Box
                css={{
                  height: similarArtefacts.data?.searchSimilarArtefacts
                    ? '100%'
                    : '250px',
                  overflow: 'hidden',
                  marginTop: '1rem',
                }}
              >
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3 }}
                >
                  <Masonry gutter="15px">
                    {similarArtefacts.data?.searchSimilarArtefacts.map(
                      artefact => (
                        <UnstyledButton
                          onClick={() => setSelectedArtefact(artefact.id)}
                          key={artefact.id}
                        >
                          <Box
                            css={{
                              margin: '0 auto',
                              width: '100%',
                              position: 'relative',
                              height: '250px',
                              '> img': {
                                objectFit: 'contain',
                              },
                            }}
                          >
                            {artefact.images[0]?.url && (
                              <Image
                                src={artefact.images[0].url}
                                alt={artefact.title || ''}
                                fill
                              />
                            )}
                          </Box>
                          <Text
                            as="p"
                            size="large"
                            weight="bold"
                            css={{
                              display: 'inline-block',
                              color: 'white',
                              marginTop: '5px',
                              fontSize: '1rem',
                            }}
                          >
                            {artefact.title}
                          </Text>
                        </UnstyledButton>
                      )
                    )}
                  </Masonry>
                </ResponsiveMasonry>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </DialogContent>
  );
};

const UnstyledButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const CarouselButton = styled('button', {
  all: 'unset',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  position: 'relative',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'black',
    opacity: 0.6,
    borderRadius: '50%',
  },

  '& > svg': {
    position: 'relative',
    zIndex: 1,
  },
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
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

const ReportButton = styled('button', {
  all: 'unset',
  fontSize: '18px',
  fontWeight: 400,
  padding: '8px 16px',
  borderRadius: '6px',
  border: '2px solid #FFF',
  '&:hover': {
    cursor: 'pointer',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
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
