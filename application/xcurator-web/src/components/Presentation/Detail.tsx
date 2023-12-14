import {
  Flex,
  Box,
  Grid,
  Stack,
  styled,
} from 'src/@3pc/layout-components-react';
import { Orbit } from '@uiball/loaders';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Link from 'next/link';
import { EntityDetails } from 'src/@types/dom';
import {
  useGetArtefactQuery,
  useGetSimilarArtefactsQuery,
} from 'src/graphql/_generated/types';
import {
  ArrowLeft,
  ChevronDownIcon,
  CrossIcon,
  InfoIcon,
  QuestionMarkIcon,
} from 'src/icons';
import { enrichMarkupWithEntities } from 'src/utils/enrichMarkupWithEntities';
import { saveSizeImage } from 'src/utils/formatImage';
import { localeToLanguage } from 'src/utils/useLanguage';
import Image from 'next/image';
import { Text } from 'src/components/Common/Text';
import {
  Dialog,
  DialogClose,
  DialogContent,
} from 'src/components/Common/Dialog';
import { Entity } from './Entity';
import { EntityProps } from 'src/components/Canvas/Entity';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../Common/Popover';
import { Button } from '../Common/Button';

type SelectedArtefact = string | null;

export const Details = ({ artefactID }: { artefactID: string }) => {
  const translate = useTranslations('Details');
  const router = useRouter();
  const language = localeToLanguage(router.locale || '');
  const [informationExpanded, setInformationExpanded] = useState(false);
  const [selectedArtefact, setSelectedArtefact] =
    useState<SelectedArtefact>(null);

  const { data, loading } = useGetArtefactQuery({
    variables: {
      where: {
        id: selectedArtefact ? selectedArtefact : artefactID,
        language: language,
      },
    },
  });

  const [entity, setEntity] = React.useState<EntityProps | undefined>();

  const { data: similarData, loading: similarLoading } =
    useGetSimilarArtefactsQuery({
      variables: {
        where: {
          id: selectedArtefact ? selectedArtefact : artefactID,
          language: language,
        },
        take: 10,
      },
    });

  const description = React.useMemo(() => {
    const entities = data?.artefact.entities ?? [];
    const hasEntities = entities.length > 0;
    return hasEntities
      ? enrichMarkupWithEntities(data?.artefact.description, entities)
      : data?.artefact.description;
  }, [data?.artefact]);
  React.useEffect(() => {
    const handleWikiData = (event: CustomEvent<EntityDetails>) => {
      const entity = {
        artefactID,
        language,
        wikipediaId: '',
        wikipediaUrl: '',
        wikiDataId: '',
        wikiDataUrl: '',
        gndUrl: '',
        startPosition: event.detail.startPosition,
        endPosition: event.detail.endPosition,
        property: event.detail.property,
      };

      event.detail.links.forEach(link => {
        if (link.source === 'WIKIDATA') {
          entity.wikiDataId = link.id;
          entity.wikiDataUrl = link.url;
        } else if (link.source === 'WIKIPEDIA') {
          entity.wikipediaId = link.id;
          entity.wikipediaUrl = link.url;
        } else if (link.source === 'GND') {
          entity.gndUrl = link.url;
        }
      });
      setEntity(entity);
    };

    window.addEventListener('entityDetails', handleWikiData);
    return () => window.removeEventListener('entityDetails', handleWikiData);
  }, [artefactID, language]);

  return (
    <DialogContent
      onEscapeKeyDown={() => setSelectedArtefact(null)}
      onPointerDownOutside={() => setSelectedArtefact(null)}
      style={{
        padding: '0px',
      }}
    >
      {loading || similarLoading ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          css={{ p: '$4', minHeight: '100vh' }}
        >
          <Orbit aria-label={translate('loading')} color="white" />
        </Flex>
      ) : (
        <Box pb={{ '@initial': 5, '@bp2': 10 }}>
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
              {data?.artefact.images && data.artefact.images.length > 0 ? (
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
                    priority
                    src={data.artefact.images[0].url}
                    alt={data.artefact.title || ''}
                    sizes="320px"
                    fill
                    loader={saveSizeImage(data.artefact.images[0])}
                  />
                </Box>
              ) : null}

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
                  {data?.artefact?.title}
                </Text>
                <Box mt="5">
                  {description ? (
                    <Box
                      css={{
                        py: '$4',
                        overflow: 'auto',
                        textOverflow: 'ellipsis',
                        position: 'relative',
                        maxHeight: '220px',
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
                  <InfoIcon aria-hidden="true" width="18px" height="18px" />
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
                  <ChevronDownIcon
                    aria-hidden="true"
                    width="24px"
                    height="24px"
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
                      <Text>{data?.artefact.dateRange?.literal}</Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">Orte</Text>
                      <Text>
                        {data?.artefact.locations.map(
                          location => location.name
                        )}
                      </Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">{translate('persons')}</Text>
                      <Text>
                        {data?.artefact.persons.map(person => person.name)}
                      </Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">{translate('userRights')}</Text>
                      <Text>{data?.artefact.images[0].licence.name}</Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Text weight="bold">{translate('photograph')}</Text>
                    </Flex>
                    <Link
                      href={`${data?.artefact.sourceInfo.url}`}
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
            <Flex
              alignItems="flex-end"
              gap="2"
              css={{ position: 'relative', mt: '$5' }}
            >
              <Popover modal={true}>
                <Flex alignItems="center" gap="2">
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
                  <Box css={{ cursor: 'pointer' }}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="icon"
                        css={{
                          p: '0',
                          color: 'white',
                          '&:hover': { color: 'white' },
                          '&[data-state="open"]': { color: 'white' },
                        }}
                      >
                        <QuestionMarkIcon width="20px" height="20px" />
                      </Button>
                    </PopoverTrigger>
                  </Box>
                </Flex>
                <PopoverContent
                  asChild
                  align="center"
                  alignOffset={0}
                  sideOffset={4}
                >
                  <Box
                    css={{
                      position: 'relative',
                      zIndex: 11,
                      pl: '$3',
                      pr: '$8',
                      py: '$5',
                      backgroundColor: '#000D45',
                      color: 'white',
                      borderColor: '#000D45',
                      mx: '$3',
                      maxWidth: 'calc(100vw - 24px)',

                      '@bp2': {
                        mx: '$10',
                        maxWidth: 'calc(100vw - 80px)',
                      },

                      '@media(min-width: 968px)': {
                        maxWidth: '389px',
                        mx: '$10',
                      },
                    }}
                  >
                    <Box css={{ position: 'absolute', top: '0', right: '0' }}>
                      <PopoverClose asChild>
                        <Button
                          aria-label={translate('close')}
                          variant="icon"
                          css={{
                            color: 'white',
                            '&:hover': { color: 'white' },
                            '&[data-state="open"]': { color: 'white' },
                          }}
                        >
                          <CrossIcon aria-hidden="true" />
                        </Button>
                      </PopoverClose>
                    </Box>
                    <Text size="small">{translate('similarImagesInfo')}</Text>
                  </Box>
                </PopoverContent>
              </Popover>
            </Flex>
            {similarData?.searchSimilarArtefacts && (
              <Box
                css={{
                  height: similarData?.searchSimilarArtefacts
                    ? '100%'
                    : '250px',
                  marginTop: '1rem',
                }}
              >
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 767: 3 }}>
                  <Masonry gutter="15px">
                    {similarData?.searchSimilarArtefacts.map(artefact => (
                      <UnstyledButton
                        onClick={() => setSelectedArtefact(artefact.id)}
                        key={artefact.id}
                      >
                        <Box
                          css={{
                            '> img': {
                              width: '100%',
                              height: 'auto',
                            },
                          }}
                        >
                          {artefact.images[0]?.url && (
                            <Image
                              src={artefact.images[0].url}
                              alt={artefact.title || ''}
                              sizes="(min-width: 768px) 216px, 50vw"
                              width={artefact.images[0].width}
                              height={artefact.images[0].height}
                              loader={saveSizeImage(artefact.images[0])}
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
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </Box>
            )}
          </Box>
          <Dialog
            open={!!entity}
            onOpenChange={isOpen => {
              if (!isOpen) setEntity(undefined);
            }}
          >
            <DialogContent>
              <DialogClose asChild>
                <UnstyledButton
                  css={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    '&:hover': {
                      color: '$blueDark',
                      backgroundColor: 'transparent',
                    },
                  }}
                  aria-label="close"
                  onClick={() => {
                    setEntity(undefined);
                  }}
                >
                  <ArrowLeft
                    aria-hidden="true"
                    width="38px"
                    height="38px"
                    color="white"
                  />
                </UnstyledButton>
              </DialogClose>
              <Box mt="5">{entity ? <Entity {...entity} /> : null}</Box>
            </DialogContent>
          </Dialog>
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
