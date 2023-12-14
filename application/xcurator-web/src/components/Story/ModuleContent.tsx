import * as React from 'react';
import { Box, Flex, Stack, styled } from 'src/@3pc/layout-components-react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronDownIcon, ChevronUpIcon } from 'src/icons';
import { GetServerSidePropsContext } from 'next';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import { ArtefactFragment } from 'src/graphql/_generated/types';
import { saveSizeImage } from 'src/utils/formatImage';

const responsive = {
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

export default function ModuleContent({
  artefacts,
}: {
  artefacts: ArtefactFragment[];
}) {
  const [index, setIndex] = React.useState(0);
  const [isCarousel, setCarousel] = React.useState(window.innerWidth < 600);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth < 600 && !isCarousel) setCarousel(true);
      else if (window.innerWidth >= 600 && isCarousel) setCarousel(false);
    });

    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.unobserve(document.documentElement);
  }, [isCarousel]);

  return isCarousel ? (
    <>
      <Box
        css={{
          width: '100%',
          alignSelf: 'center',
          backgroundColor: '$black100',
          position: 'relative',
        }}
      >
        <Carousel
          responsive={responsive}
          ssr={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          infinite={true}
          customButtonGroup={
            artefacts.length > 1 ? (
              <ButtonGroup index={index} totalCount={artefacts.length} />
            ) : null
          }
          renderButtonGroupOutside={true}
          afterChange={() => {
            setIndex(prevIndex => {
              if (prevIndex >= artefacts.length - 1) {
                return 0;
              } else {
                return prevIndex + 1;
              }
            });
          }}
        >
          {artefacts.map(artefact =>
            artefact.images[0].url ? (
              <Box
                key={artefact.id}
                css={{
                  position: 'relative',
                  height: '200px',
                  width: '100%',
                  '> img': {
                    margin: '0 auto',
                    objectFit: 'contain',
                  },
                }}
              >
                <Image
                  src={artefact.images[0].url}
                  alt={artefact.title}
                  fill={true}
                  loader={saveSizeImage(artefact.images[0])}
                  draggable="false"
                />
              </Box>
            ) : null
          )}
        </Carousel>
      </Box>
      <Box mt="3">
        <ArtefactText
          key={index}
          title={artefacts.length > index ? artefacts[index].title : ''}
          description={
            artefacts.length > index ? artefacts[index].description : ''
          }
        />
      </Box>
    </>
  ) : (
    <Stack space={{ '@initial': 5, '@bp3': 10 }}>
      {artefacts.map(artefact => (
        <Flex
          key={artefact.id}
          gap={{ '@initial': 5, '@bp3': 10 }}
          alignItems="flex-start"
        >
          <Box
            css={{
              flexShrink: 0,
              position: 'relative',
              backgroundColor: '$black100',
              width: '33%',
              minHeight: '300px',

              '> img': {
                margin: '0 auto',
                objectFit: 'contain',
              },
            }}
          >
            <Image
              src={artefact.images[0].url}
              alt={artefact.title}
              fill={true}
              draggable="false"
              loader={saveSizeImage(artefact.images[0])}
            />
          </Box>
          <Flex
            justifyContent="center"
            css={{
              width: '100%',
            }}
          >
            <Box
              css={{
                width: '660px',
              }}
            >
              <ArtefactText
                title={artefact.title}
                description={artefact.description}
              />
            </Box>
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
}

const ArtefactText = ({
  title,
  description,
}: {
  title: string;
  description?: string | null;
}) => {
  const translate = useTranslations('Details');
  const [isExpanded, setExpanded] = React.useState(false);
  const [textHeight, setTextHeight] = React.useState(0);
  const textRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (textRef.current) setTextHeight(textRef.current.offsetHeight);
  }, []);

  React.useEffect(() => {
    const node = textRef.current;
    if (!node) return;
    const resizeObserver = new ResizeObserver(elements => {
      setTextHeight(elements[0].borderBoxSize[0].blockSize);
    });

    resizeObserver.observe(node);

    return () => resizeObserver.unobserve(node);
  }, []);

  return (
    <>
      <Text
        as="h2"
        size={{ '@bp2': 'xxlarge' }}
        capsize={false}
        css={{ fontWeight: 'bold' }}
      >
        {title}
      </Text>
      <Box
        mt={{ '@initial': 3, '@bp2': 10 }}
        css={{
          position: 'relative',
          width: '100%',
          height:
            textHeight > 66 ? (isExpanded ? textHeight : 66) + 'px' : '100%',
          overflow: 'hidden',
          transitionProperty: 'height',
          transitionDuration: '200ms',
          transitionTimingFunction: '$easings$out',
        }}
      >
        <Text ref={textRef} capsize={false}>
          {description}
        </Text>
      </Box>
      {textHeight > 66 ? (
        <Box mt="2">
          <ExpandButton onClick={() => setExpanded(previous => !previous)}>
            <Text>
              {isExpanded ? translate('readLess') : translate('readMore')}
            </Text>
            <Box ml="1">
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Box>
          </ExpandButton>
        </Box>
      ) : null}
    </>
  );
};

interface ButtonGroupProps {
  next?: () => void;
  previous?: () => void;
  carouselState?: {
    currentSlide: number;
    totalItems: number;
  };
  index: number;
  totalCount: number;
}

const ButtonGroup = ({
  next,
  previous,
  carouselState,
  index,
  totalCount,
}: ButtonGroupProps) => {
  return (
    <Flex justifyContent="center">
      <CarouselButton
        className={
          carouselState && carouselState.currentSlide === 0 ? 'disable' : ''
        }
        onClick={() => {
          previous && previous();
        }}
      >
        {'<'}
      </CarouselButton>
      <Box as="span" mx="2">
        {index + 1} / {totalCount}
      </Box>
      <CarouselButton
        onClick={() => {
          next && next();
        }}
      >
        {'>'}
      </CarouselButton>
    </Flex>
  );
};

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

const CarouselButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
