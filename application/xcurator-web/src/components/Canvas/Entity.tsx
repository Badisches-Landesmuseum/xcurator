import * as React from 'react';
import { Language, useEntitiesDetailQuery } from 'src/graphql/_generated/types';
import { Text } from 'src/components/Common/Text';
import { Box, Flex, Inline } from '@3pc/layout-components-react';
import { ArrowUpRightIcon } from 'src/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Orbit } from '@uiball/loaders';
import { useTranslations } from 'next-intl';

export interface EntityProps {
  language: Language;
  wikipediaId: string;
  wikipediaUrl: string;
  wikiDataId: string;
  wikiDataUrl: string;
  gndUrl: string;
}

export const Entity = ({
  language,
  wikipediaId,
  wikipediaUrl,
  wikiDataId,
  wikiDataUrl,
  gndUrl,
}: EntityProps) => {
  const {
    data: details,
    loading,
    error,
  } = useEntitiesDetailQuery({
    variables: {
      where: {
        language: language,
        wikidataId: wikiDataId,
        wikipediaId: wikipediaId,
      },
    },
  });
  const translate = useTranslations('Canvas');

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

  if (error) return <Text>Error {error.message}</Text>;

  return (
    <Flex
      flexDirection="column"
      css={{
        width: '100%',
        height: '100%',
        gap: '30px',
        overflow: 'hidden',
        padding: '0 $4',
      }}
    >
      <Text
        as="h1"
        css={{ width: '100%', fontSize: '26px', fontWeight: '700' }}
      >
        {details?.entitiesDetail.title}
      </Text>

      {details?.entitiesDetail.image && (
        <Box css={{ position: 'relative', width: '100%', height: '250px' }}>
          <Image
            src={details?.entitiesDetail.image}
            alt={details?.entitiesDetail.title}
            fill={true}
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
      )}
      <Text as="p" css={{ width: '100%' }}>
        {details?.entitiesDetail.description}
      </Text>
      <Text css={{ width: '100%' }}>
        Quellen: Wikipedia, Wikidata, {gndUrl ? 'GND' : null}
      </Text>
      <Inline space="3">
        <Link
          href={wikipediaUrl}
          target="_blank"
          style={{
            color: 'white',
            backgroundColor: 'var(--colors-blueDark)',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
            borderRadius: '4px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {translate('toArticle')} (Wikipedia)
          <ArrowUpRightIcon
            aria-hidden="true"
            fill="white"
            width="11px"
            height="14px"
          />
        </Link>
        <Link
          href={wikiDataUrl}
          target="_blank"
          style={{
            color: 'white',
            backgroundColor: 'var(--colors-blueDark)',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
            borderRadius: '4px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {translate('toArticle')} (Wikidata)
          <ArrowUpRightIcon
            aria-hidden="true"
            fill="white"
            width="11px"
            height="14px"
          />
        </Link>
        {gndUrl && (
          <Link
            href={gndUrl}
            target="_blank"
            style={{
              color: 'white',
              backgroundColor: 'var(--colors-blueDark)',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingTop: '4px',
              paddingBottom: '4px',
              borderRadius: '4px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {translate('toArticle')}(GND)
            <ArrowUpRightIcon
              aria-hidden="true"
              fill="white"
              width="11px"
              height="14px"
            />
          </Link>
        )}
      </Inline>
    </Flex>
  );
};
