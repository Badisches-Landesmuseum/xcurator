import * as React from 'react';
import { Text } from 'src/components/Common/Text';
import { Box, Flex, Grid, styled } from 'src/@3pc/layout-components-react';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';
import materialImages from './materialImages.json';
import { useFilterStore } from 'src/store/useFilterStore';
import { useTranslations } from 'next-intl';

type Material = keyof Messages['Filter']['Material'];

export function imagePath(name: Material) {
  const material = materialImages.find(i => i.name === name);
  return `/images/${material?.image ?? ''}`;
}

const materials: Material[] = [
  'BRONZE',
  'CERAMICS',
  'GLASS',
  'IRON',
  'MOVIE',
  'PE_PAPER',
  'PHOTO_LAYER',
  'PHOTO_PAPER',
  'PORCELAIN',
  'SILVER',
  'WOOD',
];

const Material = () => {
  const activeMaterials = useFilterStore(state => state.materials);

  return (
    <Flex justifyContent="center">
      <Grid
        css={{
          $$bubbleSize: '116px',
          $$columnFraction: 1,
          $$rowFraction: 8,
          gridTemplateColumns:
            'repeat(auto-fill, calc($$bubbleSize / $$columnFraction))',
          gridAutoRows: 'calc($$bubbleSize / $$rowFraction + 5px)',
        }}
      >
        {materials.map(material => (
          <Box
            key={material}
            css={{
              width: '$$bubbleSize',
              height: '$$bubbleSize',
              // 1. ----------------------------
              '&:nth-of-type(1)': {
                gridColumnStart: 1,
                gridRowStart: 1,
              },
              '&:nth-of-type(2)': {
                gridColumnStart: 'calc($$columnFraction + 1)',
                gridRowStart: 5,
              },
              '&:nth-of-type(3)': {
                gridColumnStart: 'calc(2 * $$columnFraction + 1)',
                gridRowStart: 1,
              },
              // 2. ----------------------------
              '&:nth-of-type(4)': {
                gridColumnStart: 1,
                gridRowStart: 'calc($$rowFraction + 2)',
              },
              '&:nth-of-type(5)': {
                gridColumnStart: 'calc($$columnFraction + 1)',
                gridRowStart: 'calc($$rowFraction + 6)',
              },
              '&:nth-of-type(6)': {
                gridColumnStart: 'calc(2 * $$columnFraction + 1)',
                gridRowStart: 'calc($$rowFraction + 2)',
              },
              // 3. ----------------------------
              '&:nth-of-type(7)': {
                gridColumnStart: 1,
                gridRowStart: 'calc(2 * $$rowFraction + 3)',
              },
              '&:nth-of-type(8)': {
                gridColumnStart: 'calc($$columnFraction + 1)',
                gridRowStart: 'calc(2 * $$rowFraction + 7)',
              },
              '&:nth-of-type(9)': {
                gridColumnStart: 'calc(2 * $$columnFraction + 1)',
                gridRowStart: 'calc(2 * $$rowFraction + 3)',
              },
              // 4. ----------------------------
              '&:nth-of-type(10)': {
                gridColumnStart: 1,
                gridRowStart: 'calc(3 * $$rowFraction + 4)',
                gridRowEnd: 'calc(3 * $$rowFraction + 4 + 6)',
              },
              '&:nth-of-type(11)': {
                gridColumnStart: 'calc($$columnFraction + 1)',
                gridRowStart: 'calc(3 * $$rowFraction + 7)',
                gridRowEnd: 'calc(3 * $$rowFraction + 7 + 6)',
              },
            }}
          >
            <MaterialBubble
              material={material}
              active={activeMaterials.includes(material)}
            />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

const MaterialBubble = ({
  material,
  active,
}: {
  material: Material;
  active?: boolean;
}) => {
  const translate = useTranslations('Filter.Material');
  const toggleMaterials = useFilterStore(state => state.toggleMaterials);

  return (
    <MaterialButton
      onClick={() => toggleMaterials(material)}
      className={active ? 'active' : undefined}
    >
      <Box
        css={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          borderRadius: '50%',
          backgroundColor: 'black',
          overflow: 'hidden',

          '> img': {
            objectFit: 'cover',
            opacity: 0,
            transitionProperty: 'opacity',
            transitionDuration: '250ms',
            transitionTimingFunction: '$easings$out',
          },

          '> img.loaded': {
            opacity: 1,
          },
        }}
      >
        <Image
          alt={material}
          src={imagePath(material)}
          fill={true}
          onLoadingComplete={img => img.classList.add('loaded')}
          sizes="116px"
        />
      </Box>
      <Box
        className="oval"
        css={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          height: '75%',
          transform: 'translate(-50%, -50%)',
          width: '88%',
          backgroundColor: 'white',
          opacity: 0.8,
          borderRadius: '50%',
        }}
      />
      <Flex
        alignItems="center"
        justifyContent="center"
        css={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Text css={{ textAlign: 'center' }}>{translate(material)}</Text>
      </Flex>
    </MaterialButton>
  );
};

const MaterialButton = styled('button', {
  all: 'unset',
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  userSelect: 'none',

  '.oval': {
    transitionProperty: 'transform',
    transitionDuration: '250ms',
    transitionTimingFunction: '$easings$out',
  },

  '&.active .oval': {
    outline: '4px solid $blue',
    outlineOffset: '-4px',
    backgroundColor: '$blue100',
    opacity: 0.9,
    transform: 'translate(-50%, -50%) scaleY(0.93)',
  },

  '&.active:hover .oval': {
    transform: 'translate(-50%, -50%)',
  },

  '&:hover .oval': {
    transform: 'translate(-50%, -50%) scaleY(0.93)',
  },

  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: '$green',
  },
});

export default Material;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
