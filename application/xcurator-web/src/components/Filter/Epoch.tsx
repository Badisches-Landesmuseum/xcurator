import { Box, Flex, Grid, styled } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import React from 'react';
import { useTranslations } from 'next-intl';
import { GetServerSidePropsContext } from 'next';
import { useFilterStore } from 'src/store/useFilterStore';

const Epochs: {
  name: keyof Messages['Filter']['Epoch'];
  year?: number;
  height: 1 | 2 | 3 | 4 | 5;
}[] = [
  {
    name: 'POSTMODERNE',
    year: 1945,
    height: 1,
  },
  { name: 'MODERNE', year: 1855, height: 1 },
  { name: 'ROMANTIK', year: 1770, height: 1 },
  { name: 'BAROCK', year: 1575, height: 2 },
  {
    name: 'RENAISSANCE',
    year: 1400,
    height: 2,
  },
  { name: 'GOTIK', year: 1200, height: 2 },
  { name: 'ROMANIK', year: 950, height: 3 },
  {
    name: 'FRUEHES_MITTELALTER',
    year: 565,
    height: 3,
  },
  { name: 'ANTIKE', year: -3000, height: 4 },
  {
    name: 'UR_UND_FRUEHGESCHICHTE',
    height: 5,
  },
];

const Epoch = () => {
  const translate = useTranslations('Filter.Epoch');
  const toggleEpochs = useFilterStore(state => state.toggleEpochs);
  const activeEpochs = useFilterStore(state => state.epochs);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Grid
        css={{
          gridTemplateColumns: '1fr 226px',
          rowGap: '$1',
          columnGap: '$3',
          alignItems: 'flex-end',

          '@bp2': {
            gridTemplateColumns: '1fr 258px',
          },
        }}
      >
        {Epochs.map((epoch, index) => (
          <React.Fragment key={epoch.name}>
            <Box
              css={{
                transform: 'translateY(50%)',
              }}
            >
              <Text css={{ textAlign: 'right' }}>{epoch.year}</Text>
            </Box>
            <EpochButton
              height={epoch.height}
              start={index === 0}
              onClick={() => toggleEpochs(epoch.name)}
              className={
                activeEpochs.includes(epoch.name) ? 'active' : undefined
              }
            >
              {index === 0 ? (
                <svg
                  width="226"
                  height="91"
                  viewBox="0 0 226 91"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path d="M0.5 90.5V50.3255L113 0.546759L225.5 50.3255V90.5H0.5Z" />
                </svg>
              ) : undefined}

              <Box
                css={{
                  position: 'absolute',
                  left: '50%',
                  top:
                    index === 0
                      ? '70.5px'
                      : index === Epochs.length - 1
                      ? '76.5px'
                      : '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}
              >
                <Text>{translate(epoch.name)}</Text>
              </Box>
            </EpochButton>
          </React.Fragment>
        ))}
      </Grid>
    </Flex>
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

const EpochButton = styled('button', {
  all: 'unset',
  position: 'relative',
  display: 'inline-flex',
  border: '1px solid',
  borderColor: '$blue',
  backgroundColor: '$blue100',
  userSelect: 'none',

  '&:hover:not(.active)': {
    backgroundColor: '$blue200',
  },

  '&:active, &.active': {
    backgroundColor: '$blue',
    color: 'white',
  },

  variants: {
    height: {
      1: {
        height: '41px',
      },
      2: {
        height: '59px',
      },
      3: {
        height: '67px',
      },
      4: {
        height: '103px',
      },
      5: {
        height: '157px',
      },
    },
    start: {
      true: {
        height: 'unset',
        border: 'unset',
        backgroundColor: 'unset',

        '> svg': {
          fill: '$blue100',
          stroke: '$blue',
        },

        '&:hover:not(.active)': {
          backgroundColor: 'unset',
          '> svg': {
            fill: '$blue200',
          },
        },

        '&:active, &.active': {
          backgroundColor: 'unset',
          '> svg': {
            fill: '$blue',
          },
          color: 'white',
        },

        '@bp2': {
          '> svg': {
            width: '258px',
          },
        },
      },
    },
  },
});

export default Epoch;
