import { Box, Flex, Grid, styled } from 'src/@3pc/layout-components-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import Carousel from 'react-multi-carousel';
import { Button } from 'src/components/Common/Button';
import { ArtefactFragment } from 'src/graphql/_generated/types';
import { ArrowDownIcon, InfoIcon } from 'src/icons';
import { saveSizeImage } from 'src/utils/formatImage';
import { Details } from './Detail';
import { Text } from 'src/components/Common/Text';
import Image from 'next/image';
import { Dialog, DialogTrigger } from 'src/components/Common/Dialog';

export const Content = ({
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
                  {artefacts.length > carouselIndex
                    ? artefacts[carouselIndex].title
                    : ''}
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
              {artefacts.length > 0 && artefacts[0].images.length > 0 ? (
                <Image
                  src={artefacts[0].images[0].url}
                  alt={artefacts[0].title}
                  sizes="(min-width 986px) 80vw, (min-width: 768px) 400px, 100vw"
                  width={artefacts[0].images[0].width}
                  height={artefacts[0].images[0].height}
                  loader={saveSizeImage(artefacts[0].images[0])}
                />
              ) : null}
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
                {artefacts.length > carouselIndex &&
                artefacts[carouselIndex].images.length > 0 ? (
                  <Image
                    src={artefacts[0].images[0].url}
                    alt={artefacts[0].title}
                    sizes="(min-width 986px) 80vw, (min-width: 768px) 400px, 100vw"
                    width={artefacts[0].images[0].width}
                    height={artefacts[0].images[0].height}
                    loader={saveSizeImage(artefacts[0].images[0])}
                  />
                ) : null}
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

        {controles && artefacts.length > carouselIndex ? (
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
