import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Box } from 'src/@3pc/layout-components-react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useFilterStore } from 'src/store/useFilterStore';
import { Orbit } from '@uiball/loaders';

const colors: {
  hex: string;
  name: keyof Messages['Filter']['Colors'];
}[] = [
  {
    hex: '#000',
    name: 'BLACK',
  },
  {
    hex: '#1757FC',
    name: 'BLUE',
  },
  {
    hex: '#A3A3A3',
    name: 'GRAY',
  },
  {
    hex: '#3BCE5C',
    name: 'GREEN',
  },
  {
    hex: '#FC3FDE',
    name: 'HOTPINK',
  },
  {
    hex: '#FDA014',
    name: 'ORANGE',
  },
  {
    hex: '#9E32F3',
    name: 'PURPLE',
  },
  {
    hex: '#E80404',
    name: 'RED',
  },
  {
    hex: '#784913',
    name: 'SADDLEBROWN',
  },
  {
    hex: '#0CE8E8',
    name: 'TURQUOISE',
  },
  {
    hex: '#EEE',
    name: 'WHITE',
  },
  {
    hex: '#FAFF0C',
    name: 'YELLOW',
  },
];

const Color = () => {
  const translate = useTranslations('Filter.Colors');
  const colorsStore = useFilterStore(state => state.colors);
  const toggleColors = useFilterStore(state => state.toggleColors);
  const data = colors.map(c => ({
    name: c.name,
    color: c.hex,
    value: 1,
  }));
  const [hovered, setHovered] = React.useState<number | undefined>(undefined);

  if (!data?.length) {
    return (
      <Box
        css={{
          position: 'relative',
          top: '50%',
          left: '50%',
          marginBottom: '$4',
        }}
      >
        <Orbit color="#002fff" />
      </Box>
    );
  }

  return (
    <Box
      css={{
        width: '100%',
        height: '250px',
        '@bp1': {
          height: '350px',
          width: '100%',
        },
      }}
    >
      <PieChart
        data={data}
        label={({ dataEntry }) => translate(dataEntry.name)}
        labelStyle={index => ({
          fontSize: '4px',
          fontFamily: 'Cabin',
          fill:
            index === hovered ||
            colorsStore.some(item => item === data[index].name)
              ? '#002fff'
              : 'black',
        })}
        segmentsTabIndex={0}
        segmentsStyle={{ cursor: 'pointer' }}
        segmentsShift={index =>
          index === hovered ||
          colorsStore.some(item => item === data[index].name)
            ? 2.5
            : 0
        }
        onClick={(event, index) => {
          toggleColors(data[index].name);
        }}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(undefined);
        }}
        onFocus={(event, index) => {
          setHovered(index);
        }}
        onKeyDown={(event, index) => {
          if (event.key === 'Enter') {
            toggleColors(data[index].name);
          }
        }}
        radius={40}
        labelPosition={112}
      />
    </Box>
  );
};

export default Color;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
