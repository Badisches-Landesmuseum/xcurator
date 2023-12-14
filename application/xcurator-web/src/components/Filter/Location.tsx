import React from 'react';
import { Bleed, Box, Flex, styled } from 'src/@3pc/layout-components-react';
import Image from 'next/image';
import { GetStaticPropsContext } from 'next';
import { CaretUpIcon, CheckIcon } from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { CheckboxIndicator, CheckboxRoot, Label } from './Checkbox';
import {
  Continent,
  ContinentFacette,
  CountryFacette,
} from 'src/graphql/_generated/types';
import { useTranslations } from 'next-intl';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from 'src/components/Common/Dropdown';
import { useFilterStore } from 'src/store/useFilterStore';

const Location = ({ locations }: { locations: ContinentFacette[] }) => {
  const translate = useTranslations('Filter');

  const europe =
    locations.find(location => location.continent === Continent.Europa)
      ?.countries || [];
  const africa =
    locations.find(location => location.continent === Continent.Africa)
      ?.countries || [];
  const asia =
    locations.find(location => location.continent === Continent.Asia)
      ?.countries || [];
  const america =
    locations.find(location => location.continent === Continent.America)
      ?.countries || [];

  return (
    <Box css={{ textAlign: 'center', maxWidth: '450px' }}>
      <Bleed horizontal="4">
        <Box css={{ position: 'relative' }}>
          <Image
            src="/icons/Weltkarte.svg"
            alt="World Map"
            width={375}
            height={250}
          />
          <Box
            css={{
              position: 'absolute',
              display: 'inline-flex',
              left: '40%',
              top: '20%',
            }}
          >
            <CountryDopdown
              name={translate('Location.Europe')}
              countries={europe}
            />
          </Box>
          <Box
            css={{
              position: 'absolute',
              display: 'inline-flex',
              left: '65%',
              top: '25%',
            }}
          >
            <CountryDopdown
              name={translate('Location.Asia')}
              countries={asia}
            />
          </Box>
          <Box
            css={{
              position: 'absolute',
              display: 'inline-flex',
              left: '45%',
              top: '45%',
            }}
          >
            <CountryDopdown
              name={translate('Location.Africa')}
              countries={africa}
            />
          </Box>
          <Box
            css={{
              position: 'absolute',
              display: 'inline-flex',
              left: '10%',
              top: '38%',
              width: 'auto',
              '@bp1': {
                left: '17%',
              },
            }}
          >
            <CountryDopdown
              name={translate('Location.America')}
              countries={america}
            />
          </Box>
        </Box>
      </Bleed>
    </Box>
  );
};

const CountryDopdown = ({
  name,
  countries,
}: {
  name: string;
  countries: CountryFacette[];
}) => {
  const toggleLocations = useFilterStore(state => state.toggleLocations);
  const locationStore = useFilterStore(state => state.locations);
  const [open, setOpen] = React.useState(false);
  const activeCountries = locationStore.filter(name =>
    countries.some(country => country.name === name)
  ).length;

  return countries.length === 0 ? (
    <Text color="black600" css={{ userSelect: 'none', lineHeight: '24px' }}>
      {name}
    </Text>
  ) : (
    <Dropdown open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <ButtonWrapper>
          <Box
            as="span"
            css={{
              width: '100%',
              borderBottom: '1px solid Black',
            }}
          >
            <Flex alignItems={'center'}>
              <Text as="span">{name}</Text>
              {activeCountries > 0 ? ` ( ${activeCountries} )` : null}
              <Flex
                alignItems="center"
                css={{
                  color: '$blue',
                  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              >
                <CaretUpIcon aria-hidden="true" />
              </Flex>
            </Flex>
          </Box>
        </ButtonWrapper>
      </DropdownTrigger>
      <DropdownContent align="center" sideOffset={2}>
        <Box
          css={{
            py: '5px',
          }}
        >
          {countries.map(country => (
            <DropdownItem
              key={country.name}
              onSelect={() => {
                toggleLocations(country.name);
              }}
            >
              <Box px="2">
                <Flex alignItems="center">
                  <CheckboxRoot
                    id={country.name}
                    checked={locationStore.some(
                      location => location.toString() === country.name
                    )}
                    onSelect={() => {
                      toggleLocations(country.name);
                    }}
                  >
                    <CheckboxIndicator>
                      <CheckIcon aria-hidden="true" />
                    </CheckboxIndicator>
                  </CheckboxRoot>
                  <Label css={{ paddingLeft: 15 }} htmlFor={country.name}>
                    {country.name}
                  </Label>
                </Flex>
              </Box>
            </DropdownItem>
          ))}
        </Box>
      </DropdownContent>
    </Dropdown>
  );
};

const ButtonWrapper = styled('button', {
  all: 'unset',
  color: '$blue',
  height: '24px',
  userSelect: 'none',

  '&:hover': {
    color: '$blueDark',
  },

  '&[disabled]': {
    color: '$black600',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export default Location;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
