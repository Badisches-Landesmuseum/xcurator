import React from 'react';
import { Box, Flex, Inline, styled } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { ButtonTag } from 'src/components/Common/ButtonTag';
import { Line } from 'src/components/Common/Line';
import Location from 'src/components/Filter/Location';
import Epoch from 'src/components/Filter/Epoch';
import Colors from 'src/components/Filter/Color';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import {
  ArtefactSourceOwner,
  ContinentFacette,
} from 'src/graphql/_generated/types';
import { useFilterStore } from 'src/store/useFilterStore';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'src/components/Common/Accordion';
import Material from './Material';
import {
  ToggleGroup,
  ToggleGroupItem,
} from 'src/components/Common/ToggleGroup';

type FilterProps = {
  locationFacette: ContinentFacette[];
  owner: ArtefactSourceOwner | 'all';
  setOwner: React.Dispatch<React.SetStateAction<ArtefactSourceOwner | 'all'>>;
  refetch: () => void;
};

const Filter = ({ locationFacette, owner, setOwner, refetch }: FilterProps) => {
  const toggleLocations = useFilterStore(state => state.toggleLocations);
  const toggleColors = useFilterStore(state => state.toggleColors);
  const toggleEpochs = useFilterStore(state => state.toggleEpochs);
  const toggleMaterials = useFilterStore(state => state.toggleMaterials);
  const locations = useFilterStore(state => state.locations);
  const colors = useFilterStore(state => state.colors);
  const epochs = useFilterStore(state => state.epochs);
  const materials = useFilterStore(state => state.materials);
  const translate = useTranslations('Filter');

  const filterCount = React.useMemo(() => {
    return colors.length + locations.length + epochs.length + materials.length;
  }, [locations, colors, epochs, materials]);

  return (
    <Box mb="20" css={{ maxWidth: '450px' }}>
      <Box mt={{ '@initial': 4, '@bp2': 5 }} ml={{ '@initial': 3, '@bp2': 10 }}>
        <Flex gap="2" alignItems="center" css={{ minHeight: '44px' }}>
          <Text as="h2" size="xxlarge" weight="bold">
            {translate('filter')}
          </Text>
          {filterCount > 0 && (
            <ResetFilterButton
              onClick={() => {
                refetch();
              }}
            >
              {translate('removeAll')}
            </ResetFilterButton>
          )}
        </Flex>
      </Box>
      <Box mt="5" mx={{ '@initial': 3, '@bp2': 10 }}>
        <Inline space="1">
          {locations.map(location => (
            <ButtonTag
              key={location}
              isActive={true}
              onClick={() => {
                toggleLocations(location);
              }}
            >
              {location}
            </ButtonTag>
          ))}
          {colors.map(color => (
            <ButtonTag
              key={color}
              isActive={true}
              onClick={() => {
                toggleColors(color);
              }}
            >
              {translate(`Colors.${color}`)}
            </ButtonTag>
          ))}
          {epochs.map(epoch => (
            <ButtonTag
              key={epoch}
              isActive={true}
              onClick={() => {
                toggleEpochs(epoch);
              }}
            >
              {translate(`Epoch.${epoch}`)}
            </ButtonTag>
          ))}
          {materials.map(material => (
            <ButtonTag
              key={material}
              isActive={true}
              onClick={() => {
                toggleMaterials(material);
              }}
            >
              {translate(`Material.${material}`)}
            </ButtonTag>
          ))}
          {owner.length == 1 ? (
            <ButtonTag
              isActive={true}
              onClick={() => {
                setOwner('all');
              }}
            >
              {owner[0]}
            </ButtonTag>
          ) : null}
        </Inline>
      </Box>
      <Box mt="7" mx={{ '@initial': 3, '@bp2': 10 }}>
        <Text as="h3" size="large" weight="bold">
          {translate('collection')}
        </Text>
        <Box mt="4">
          <ToggleGroup
            type="single"
            value={owner}
            onValueChange={(value: ArtefactSourceOwner | 'all' | '') => {
              setOwner(value === '' ? 'all' : value);
            }}
          >
            <Flex gap="2" flexWrap="wrap">
              <Box css={{ width: '100%' }}>
                <ToggleGroupItem value="all">
                  {translate('bothMuseums')}
                </ToggleGroupItem>
              </Box>
              <ToggleGroupItem value={ArtefactSourceOwner.Blm}>
                Badisches Landesmuseum
              </ToggleGroupItem>
              <ToggleGroupItem value={ArtefactSourceOwner.Ap}>
                Allard Pierson
              </ToggleGroupItem>
            </Flex>
          </ToggleGroup>
        </Box>
        <Line mt={{ '@initial': 6, '@bp2': 7 }} />
      </Box>
      <Box mt={{ '@bp2': 2 }}>
        <AccordionRoot type="single" collapsible>
          <AccordionItem value="color">
            <Box mx={{ '@initial': 3, '@bp2': 10 }}>
              <AccordionTrigger> {translate('colorHeader')}</AccordionTrigger>
            </Box>
            <AccordionContent>
              <Colors />
            </AccordionContent>
          </AccordionItem>
          <Box mx={{ '@initial': 3, '@bp2': 10 }}>
            <Line />
          </Box>

          <Box mx={{ '@initial': 3, '@bp2': 10 }}>
            <AccordionItem value="location">
              <AccordionTrigger>{translate('placeHeader')}</AccordionTrigger>
              <AccordionContent>
                <Location locations={locationFacette} />
              </AccordionContent>
            </AccordionItem>
            <Line />
          </Box>

          <Box mx={{ '@initial': 3, '@bp2': 10 }}>
            <AccordionItem value="material">
              <AccordionTrigger>{translate('materialHeader')}</AccordionTrigger>
              <AccordionContent>
                <Material />
              </AccordionContent>
            </AccordionItem>
            <Line />
          </Box>

          <Box mx={{ '@initial': 3, '@bp2': 10 }}>
            <AccordionItem value="epoch">
              <AccordionTrigger> {translate('epochHeader')}</AccordionTrigger>
              <AccordionContent>
                <Epoch />
              </AccordionContent>
            </AccordionItem>
          </Box>
        </AccordionRoot>
      </Box>
    </Box>
  );
};

const ResetFilterButton = styled('button', {
  all: 'unset',
  color: '$blueDark',
  cursor: 'pointer',
  p: '$3',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

export default Filter;
