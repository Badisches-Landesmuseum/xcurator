import React from 'react';
import {
  Box,
  Flex,
  Grid,
  Inline,
  Stack,
  styled,
} from 'src/@3pc/layout-components-react';
import {
  HeartIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeft,
  TranslatedIcon,
  CrossIcon,
  CheckIcon,
  EditIcon,
  ArrowCircleIcon,
  NoArtefactFoundIcon,
  ChevronLargeIcon,
  ArrowDownIcon,
  AlertIcon,
  KiIcon,
  QuestionMarkIcon,
} from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { ButtonTag } from 'src/components/Common/ButtonTag';
import Image from 'next/image';
import {
  useGetArtefactQuery,
  useAddToFavouriteMutation,
  useDeleteArtefactFromFavouriteMutation,
  namedOperations,
  useGetSimilarArtefactsQuery,
  useAddArtefactToBasketMutation,
  useCreateStoryMutation,
  SearchTag,
  ArtefactFragmentDoc,
  useReportArtefactMutation,
  ArtefactFragment,
} from 'src/graphql/_generated/types';
import Masonry from 'react-responsive-masonry';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { enrichMarkupWithEntities } from 'src/utils/enrichMarkupWithEntities';
import Link from 'next/link';
import { EntityDetails } from 'src/@types/dom';
import {
  Overlay,
  OverlayClose,
  OverlayContent,
} from 'src/components/Common/Overlay';
import { Entity, EntityProps } from './Entity';
import { Button } from 'src/components/Common/Button';
import { localeToLanguage } from 'src/utils/useLanguage';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from 'src/components/Common/Dialog';
import { useMyStories } from 'src/components/Context/MyStoriesContext';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import { useTagStore } from 'src/store/useTagStore';
import { useAuth } from 'src/components/Context/AuthContext';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useSearchStore } from 'src/store/useSearchStore';
import { useProfile } from '../Context/ProfileContext';
import { GetServerSidePropsContext } from 'next';
import { Orbit } from '@uiball/loaders';
import { Textarea } from '../Common/Textarea';
import { saveSizeImage } from 'src/utils/formatImage';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/Common/Popover';

const DESCRIPTION_HEIGHT = 65;

const Detail = ({
  artefactId,
  minimizeDetail,
  setMinimizeDetail,
}: {
  artefactId: string;
  minimizeDetail: boolean;
  setMinimizeDetail: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const language = localeToLanguage(router.locale ?? '');
  const { isLoggedIn } = useAuth();
  const { favourites, loading } = useProfile();
  const translate = useTranslations('ArtefactDetail');
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
  const [similarExpanded, setSimilarExpanded] = React.useState(false);
  const [informationExpanded, setInformationExpanded] = React.useState(false);
  const [entity, setEntity] = React.useState<EntityProps | undefined>();
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] =
    React.useState(false);
  // const { setFavorite: setFavoriteToast } = useGlobalToasts();
  const [favoriteToast, setFavoriteToast] = React.useState(false);

  const isFavorite = React.useMemo(
    () => favourites.some(favourite => favourite.id === artefactId),
    [artefactId, favourites]
  );

  const {
    data,
    loading: artefactLoading,
    error,
  } = useGetArtefactQuery({
    skip: !artefactId,
    variables: {
      where: {
        id: artefactId,
        language,
      },
    },
  });

  const { data: similarData } = useGetSimilarArtefactsQuery({
    skip: !artefactId,
    variables: {
      where: {
        id: artefactId,
        language,
      },
      take: 10,
    },
  });

  const [addToFavorite, { loading: addToFavoriteLoading }] =
    useAddToFavouriteMutation();
  const [deleteFromFavorite, { loading: deleteFromFavoriteLoading }] =
    useDeleteArtefactFromFavouriteMutation();

  const title = React.useMemo(
    () =>
      data?.artefact?.entities?.length &&
      data?.artefact.entities.some(entity => entity.property === 'title')
        ? enrichMarkupWithEntities(
            data?.artefact?.title,
            data?.artefact?.entities || [],
            'title'
          )
        : data?.artefact.title,
    [data]
  );

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
        artefactID: artefactId,
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
  }, [artefactId, language]);

  React.useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    setIsDescriptionOverflowing(false);
    setDescriptionExpanded(false);

    if (el.scrollHeight > DESCRIPTION_HEIGHT) {
      setIsDescriptionOverflowing(true);
    }
  }, [data?.artefact.description]);

  React.useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(() => {
      if (el.scrollHeight > DESCRIPTION_HEIGHT)
        setIsDescriptionOverflowing(true);
      else setIsDescriptionOverflowing(false);
    });

    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.unobserve(document.documentElement);
  }, []);

  React.useEffect(() => {
    if (isLoggedIn && localStorage.getItem('favouriteBeforeLogin')) {
      const artefact: ArtefactFragment = JSON.parse(
        localStorage.getItem('favouriteBeforeLogin') || ''
      );
      localStorage.removeItem('favouriteBeforeLogin');
      addToFavorite({
        variables: {
          create: { id: artefact.id },
        },
        update: cache => {
          cache.modify({
            fields: {
              myFavourites(existingFavourites = []) {
                const newFavoriteRef = cache.writeFragment({
                  data: artefact,
                  fragment: ArtefactFragmentDoc,
                });
                return [...existingFavourites, newFavoriteRef];
              },
            },
          });
        },
      });
    }
  }, [isLoggedIn, addToFavorite]);

  if (error) {
    return (
      <Box mt="10" css={{ textAlign: 'center' }}>
        <Flex>
          <Box
            css={{
              flexGrow: 1,
            }}
          >
            <Flex justifyContent="flex-end">
              <OverlayClose asChild>
                <Box
                  m="2"
                  css={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      border: 'none',
                      '> svg': {
                        color: '$blueDark',
                      },
                    },
                  }}
                >
                  <Link aria-label={translate('close')} href="/canvas">
                    <CrossIcon aria-hidden="true" width="27px" height="27px" />
                  </Link>
                </Box>
              </OverlayClose>
            </Flex>
          </Box>
        </Flex>
        <Box mx="10" mt="24">
          <Text size="xxlarge" weight="bold">
            {translate('notFound')}
          </Text>
        </Box>
        <Box mt="20">
          <NoArtefactFoundIcon aria-hidden="true" width="50%" height="50%" />
        </Box>
      </Box>
    );
  }

  if (artefactLoading || !artefactId)
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        css={{ p: '$4', minHeight: '100vh' }}
      >
        <Orbit aria-label={translate('loading')} color="#002fff" />
      </Flex>
    );

  return (
    <>
      <Box mt={{ '@initial': 4, '@bp2': 5 }} px={{ '@initial': 3, '@bp2': 5 }}>
        <Flex>
          <Box
            css={{
              flexGrow: 1,
              '@bp2': {
                display: 'none',
              },
            }}
          >
            <Flex justifyContent="flex-end">
              <Box
                css={{
                  transform: 'translateX(50%)',
                }}
              >
                <Button
                  aria-label={translate('minimize')}
                  variant="icon"
                  onClick={() => {
                    setMinimizeDetail(previous => !previous);
                  }}
                  css={{
                    transform: minimizeDetail ? 'rotate(180deg)' : undefined,
                  }}
                >
                  <ChevronLargeIcon aria-hidden="true" />
                </Button>
              </Box>
            </Flex>
          </Box>
          <Box
            css={{
              flexGrow: 1,
            }}
          >
            <Flex
              justifyContent="flex-end"
              css={{
                '> a': {
                  display: 'inline-flex',
                },
              }}
            >
              <OverlayClose asChild>
                <Link aria-label={translate('close')} href="/canvas">
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    css={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      '&:hover': {
                        color: '$blueDark',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <CrossIcon aria-hidden="true" width="27px" height="27px" />
                  </Flex>
                </Link>
              </OverlayClose>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box mt="5" px={{ '@initial': 5, '@bp2': 10 }}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="h2" size="large" weight="bold">
            {title ? (
              <Box
                as="span"
                css={{
                  whiteSpace: 'pre-wrap',
                }}
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            ) : (
              `${translate('noTitle')}`
            )}
          </Text>
          {isLoggedIn ? (
            <Box ml="4" css={{ flexShrink: 0 }}>
              <FavoriteButton
                aria-label={translate('favouriteButton')}
                disabled={
                  addToFavoriteLoading || deleteFromFavoriteLoading || loading
                }
                isFavorite={isFavorite}
                onClick={() => {
                  setFavoriteToast(false);
                  if (isFavorite) {
                    deleteFromFavorite({
                      variables: { id: artefactId },
                      update: cache => {
                        cache.modify({
                          fields: {
                            myFavourites(existingFavourites = []) {
                              const cachedId = cache.identify({
                                id: artefactId,
                                __typename: 'Artefact',
                              });

                              return existingFavourites.filter(
                                (fav: { __ref: string }) =>
                                  fav.__ref !== cachedId
                              );
                            },
                          },
                        });
                      },
                      onCompleted() {
                        setFavoriteToast(true);
                      },
                    });
                  } else {
                    addToFavorite({
                      variables: {
                        create: { id: data!.artefact.id },
                      },
                      update: cache => {
                        cache.modify({
                          fields: {
                            myFavourites(existingFavourites = []) {
                              const newFavoriteRef = cache.writeFragment({
                                data: data?.artefact,
                                fragment: ArtefactFragmentDoc,
                              });
                              return [...existingFavourites, newFavoriteRef];
                            },
                          },
                        });
                      },
                      onCompleted() {
                        setFavoriteToast(true);
                      },
                    });
                  }
                }}
              >
                <HeartIcon aria-hidden="true" width="18px" height="19.286px" />
              </FavoriteButton>
            </Box>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Box ml="4" css={{ flexShrink: 0 }}>
                  <FavoriteButton
                    onClick={() => {
                      if (data?.artefact)
                        localStorage.setItem(
                          'favouriteBeforeLogin',
                          JSON.stringify(data.artefact)
                        );
                    }}
                    aria-label={translate('favouriteButton')}
                  >
                    <HeartIcon
                      aria-hidden="true"
                      width="18px"
                      height="19.286px"
                    />
                  </FavoriteButton>
                </Box>
              </DialogTrigger>
              <LoginDialogContent />
            </Dialog>
          )}
        </Flex>
      </Box>

      <Box mt="4" px={{ '@initial': 3, '@bp2': 10 }}>
        {data?.artefact.sourceInfo.language !== language ? (
          <Box mb="3" css={{ color: '$black600' }}>
            <Flex gap="1" alignItems="center">
              <TranslatedIcon aria-hidden="true" width="16px" height="22px" />
              <Text size="xsmall" italic>
                {translate('translated')}
              </Text>
            </Flex>
          </Box>
        ) : null}
        <Box mb="3" css={{ color: '$black600' }}>
          <Flex gap="1" alignItems="center">
            <KiIcon aria-hidden="true" width="16px" height="16px" />
            <Text size="xsmall" italic>
              {translate('aiGenerated')}
            </Text>
          </Flex>
        </Box>
        <Tags
          artefactTags={data?.artefact.tags || []}
          artefactId={data?.artefact.id || ''}
          artefactImage={data?.artefact.images[0]?.url || ''}
          setMinimizeDetail={setMinimizeDetail}
        />
      </Box>

      {data?.artefact.images[0].url ? (
        <Box
          mt="5"
          px={{ '@initial': 3, '@bp2': 10 }}
          css={{
            position: 'relative',
            width: '100%',
            height: '300px',

            '> img': {
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Image
            priority
            src={data.artefact.images[0].url}
            alt={data.artefact.title || ''}
            sizes="300px"
            width={data.artefact.images[0].width}
            height={data.artefact.images[0].height}
            loader={saveSizeImage(data.artefact.images[0])}
          />
        </Box>
      ) : null}

      <Box mt="3" px={{ '@initial': 3, '@bp2': 10 }}>
        <Flex justifyContent="flex-end">
          {isLoggedIn ? (
            <AddArtefactDialog artefactId={artefactId} />
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Text as="span" weight="regular">
                    {translate('saveToStory')}
                  </Text>
                </Button>
              </DialogTrigger>
              <LoginDialogContent />
            </Dialog>
          )}
        </Flex>
      </Box>

      <Box mt="5" px={{ '@initial': 3, '@bp2': 10 }}>
        {description ? (
          <>
            <Box
              ref={descriptionRef}
              css={{
                pt: '4px',
                height: descriptionExpanded
                  ? undefined
                  : `${DESCRIPTION_HEIGHT}px`,
                overflow: descriptionExpanded ? undefined : 'hidden',
                textOverflow: 'ellipsis',
                position: 'relative',
              }}
            >
              <Text color="black">
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
            {isDescriptionOverflowing ? (
              <Box mt="2">
                <ExpandButton
                  onClick={() => setDescriptionExpanded(previous => !previous)}
                >
                  <Text>
                    {descriptionExpanded
                      ? translate('readLess')
                      : translate('readMore')}
                  </Text>
                  <Box ml="1">
                    {descriptionExpanded ? (
                      <ChevronUpIcon aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon aria-hidden="true" />
                    )}
                  </Box>
                </ExpandButton>
              </Box>
            ) : null}
          </>
        ) : (
          <Text color="black600" italic>
            {translate('noDescription')}
          </Text>
        )}
      </Box>

      <Box mt="8" px={{ '@initial': 3, '@bp2': 10 }}>
        <Flex alignItems="center" gap="2" css={{ position: 'relative' }}>
          <Flex alignItems="flex-end" gap="2">
            <KiIcon height="15" width="15" color="black" />
            <Text as="h3" weight="bold" size="normal">
              {translate('similarImages')}
            </Text>
          </Flex>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="icon"
                css={{ p: '0', '&[data-state="open"]': { color: '$blueDark' } }}
              >
                <QuestionMarkIcon width="20px" height="20px" />
              </Button>
            </PopoverTrigger>
            <PopoverContent asChild align="end" alignOffset={0} sideOffset={4}>
              <Box
                css={{
                  pl: '$3',
                  pr: '$8',
                  py: '$5',
                  backgroundColor: '$blue50',
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
                    <Button aria-label={translate('close')} variant="icon">
                      <CrossIcon aria-hidden="true" />
                    </Button>
                  </PopoverClose>
                </Box>

                <Text size="small">{translate('similarImagesInfo')}</Text>
              </Box>
            </PopoverContent>
          </Popover>
        </Flex>
        <Box mt="5">
          {similarData?.searchSimilarArtefacts ? (
            <Masonry columnsCount={2} gutter="5px">
              {similarData.searchSimilarArtefacts
                .slice(0, similarExpanded ? undefined : 2)
                .map(artefact => (
                  <Link key={artefact.id} href={`/canvas/${artefact.id}`}>
                    <Box
                      css={{
                        '> img': {
                          width: '100%',
                          height: 'auto',
                        },
                      }}
                    >
                      <Image
                        src={artefact.images[0].url}
                        alt={artefact.title || ''}
                        sizes="(min-width: 968px) 192px, 50vw"
                        width={artefact.images[0].width}
                        height={artefact.images[0].height}
                        loader={saveSizeImage(artefact.images[0])}
                      />
                    </Box>
                  </Link>
                ))}
            </Masonry>
          ) : null}
          <Box mt="2">
            <ExpandButton
              onClick={() => setSimilarExpanded(previous => !previous)}
            >
              <Text>
                {similarExpanded
                  ? translate('showLess')
                  : translate('showMore')}
              </Text>
              <Box ml="1">
                {similarExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Box>
            </ExpandButton>
          </Box>
        </Box>
      </Box>

      <Box mt="8" pt="4" px={{ '@initial': 3, '@bp2': 10 }}>
        <Box
          css={{
            borderTop: '1px solid $blue200 ',
            borderBottom: '1px solid',
            borderBottomColor: informationExpanded ? 'transparent' : '$blue200',
          }}
        >
          <ExpandInformationButton
            onClick={() => setInformationExpanded(!informationExpanded)}
          >
            <Flex alignItems="center" gap={1}>
              <InfoCircledIcon aria-hidden="true" width="22px" height="22px" />
              <Text size="xsmall">{translate('moreObjectInfos')}</Text>
            </Flex>
            <ArrowDownIcon
              aria-hidden="true"
              width="22px"
              height="22px"
              style={{
                padding: '5px',
                transform: informationExpanded ? 'rotate(180deg)' : '',
              }}
            />
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
                <Flex gap={2} alignItems="center" css={{ paddingTop: '12px' }}>
                  <Text weight="bold">Datierung</Text>
                  <Text>{data?.artefact.dateRange?.literal}</Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Text weight="bold">Orte</Text>
                  <Text>
                    {data?.artefact.locations.map(location => location.name)}
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
                <Link href={`${data?.artefact.sourceInfo.url}`} target="_blank">
                  <Box
                    css={{
                      color: '$blue',
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
      </Box>

      <Box
        mt="10"
        px={{ '@initial': 3, '@bp2': 10 }}
        pt={{ '@initial': 5, '@bp2': 10 }}
        pb="6"
        css={{
          backgroundColor: '#F2E6FB',
        }}
      >
        <Feedback artefactId={artefactId} />
      </Box>
      <Toast open={favoriteToast} onOpenChange={setFavoriteToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex gap="2" css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <CheckIcon aria-hidden="true" />
              </Flex>
              {isFavorite
                ? translate('addedAsFavourite')
                : translate('removedFromFavourites')}
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button aria-label={translate('close')} variant="ghost-blue">
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon aria-hidden="true" />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
      <Overlay
        open={!!entity}
        onOpenChange={isOpen => {
          if (!isOpen) setEntity(undefined);
        }}
      >
        <OverlayContent>
          <Box>
            <Box mt="4" px="3">
              <OverlayClose asChild>
                <Button aria-label={translate('closeEntity')} variant="icon">
                  <ArrowLeft aria-hidden="true" width="28px" height="28px" />
                </Button>
              </OverlayClose>
            </Box>
          </Box>
          <Box mt="5">{entity ? <Entity {...entity} /> : null}</Box>
        </OverlayContent>
      </Overlay>
    </>
  );
};

export const LoginDialogContent = () => {
  const { authenticate } = useAuth();
  const translate = useTranslations('ArtefactDetail');

  return (
    <DialogContent small>
      <DialogClose asChild>
        <Flex justifyContent="flex-end">
          <Box mt="4" mr="3">
            <Button aria-label={translate('close')} variant="icon">
              <CrossIcon aria-hidden="true" width="27px" height="27px" />
            </Button>
          </Box>
        </Flex>
      </DialogClose>
      <Box px={{ '@initial': 8, '@bp2': 10 }} pb="10">
        <Box mt="8" css={{ textAlign: 'center' }}>
          <Text size="xlarge" weight="bold">
            {translate('loginToSave')}
          </Text>
        </Box>
        <Box mt="16">
          <Flex justifyContent="center" alignItems="center" gap="4">
            <DialogClose asChild>
              <Button variant="ghost">
                <Text>{translate('abort')}</Text>
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                authenticate();
              }}
            >
              <Text>{translate('login')}</Text>
            </Button>
          </Flex>
        </Box>
      </Box>
    </DialogContent>
  );
};

const Tags = ({
  artefactTags,
  artefactId,
  artefactImage,
  setMinimizeDetail,
}: {
  artefactTags: SearchTag[];
  artefactId: string;
  artefactImage: string;
  setMinimizeDetail?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const translate = useTranslations('ArtefactDetail');
  const {
    canvasTags,
    tagId,
    filteredTags,
    filterByTags,
    deselectTags,
    updateArtefact,
    toggleTag,
  } = useTagStore();
  const updateRandomQuery = useSearchStore(state => state.updateRandomQuery);

  const [selected, setSelected] = React.useState<string[]>(
    canvasTags.reduce<string[]>((acc, current) => {
      if (current.isSelected) return [...acc, current.tag.literal];
      return acc;
    }, [])
  );

  // we use canvasTags when we already filtered by the current artefacts tags so we can stay in sync with the popover on canvas
  const tags = React.useMemo(() => {
    if (artefactId === tagId) return canvasTags;
    return artefactTags.map(tag => ({
      tag,
      isSelected: selected.includes(tag.literal),
    }));
  }, [artefactId, artefactTags, canvasTags, tagId, selected]);

  const tagsPristine = React.useMemo(() => {
    if (tagId !== artefactId) return selected.length === 0;
    const selectedTags = canvasTags.reduce<string[]>((acc, current) => {
      if (current.isSelected) acc.push(current.tag.literal);
      return acc;
    }, []);
    if (filteredTags.length !== selectedTags.length) return false;
    const sortedTags = selectedTags.sort((a, b) => a.localeCompare(b));
    const filteredTagsCopy = filteredTags.map(t => t.literal);
    const sortedFilteredTags = filteredTagsCopy.sort((a, b) =>
      a.localeCompare(b)
    );
    return JSON.stringify(sortedTags) === JSON.stringify(sortedFilteredTags);
  }, [artefactId, canvasTags, filteredTags, selected.length, tagId]);

  return (
    <Box css={{ position: 'relative' }}>
      <Inline space="2" alignY="center">
        {tags.map((t, i) => (
          <ButtonTag
            key={i}
            variant={t.tag.isUsingAI ? 'ai' : undefined}
            isActive={t.isSelected}
            onClick={() => {
              if (artefactId === tagId) {
                toggleTag(t.tag);
              } else {
                setSelected(previous => {
                  if (selected.includes(t.tag.literal))
                    return previous.filter(l => l !== t.tag.literal);
                  return [...previous, t.tag.literal];
                });
              }
            }}
          >
            {t.tag.literal}
          </ButtonTag>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="icon"
              css={{ p: '0', '&[data-state="open"]': { color: '$blueDark' } }}
            >
              <QuestionMarkIcon width="17px" height="17px" />
            </Button>
          </PopoverTrigger>
          <PopoverContent asChild align="end" alignOffset={0} sideOffset={4}>
            <Box
              css={{
                pl: '$3',
                pr: '$8',
                py: '$5',
                backgroundColor: '$blue50',
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
                  <Button aria-label={translate('close')} variant="icon">
                    <CrossIcon aria-hidden="true" />
                  </Button>
                </PopoverClose>
              </Box>

              <Text size="small">{translate('tagsInfo')}</Text>
            </Box>
          </PopoverContent>
        </Popover>
      </Inline>
      <Box mt="3">
        <Flex justifyContent="flex-end" gap="5">
          {tagId === artefactId && filteredTags.length > 0 ? (
            <Button
              aria-label={translate('reset')}
              variant="ghost"
              onClick={() => {
                deselectTags();
                setSelected([]);
              }}
            >
              <Flex css={{ display: 'inline-flex', mr: '6px' }}>
                <ArrowCircleIcon aria-hidden="true" />
              </Flex>
              {translate('delete')}
            </Button>
          ) : null}
          <Button
            disabled={tagsPristine}
            onClick={() => {
              updateArtefact(artefactId, artefactImage);
              filterByTags(tags);
              setMinimizeDetail && setMinimizeDetail(true);
              updateRandomQuery(false);
            }}
          >
            {translate('filterTags')}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export const AddArtefactDialog = ({ artefactId }: { artefactId: string }) => {
  const [open, setOpen] = React.useState(false);
  const [successToast, setSuccessToast] = React.useState(false);
  const [failToast, setFailToast] = React.useState(false);
  const [story, setStory] = React.useState<{ id: string; title: string }>();
  const [showInput, setShowInput] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [addArtefactToBasket] = useAddArtefactToBasketMutation();
  const [createStory] = useCreateStoryMutation();
  const { stories } = useMyStories();
  const translate = useTranslations('ArtefactDetail');
  const router = useRouter();
  const language = localeToLanguage(router.locale ?? '');

  return (
    <Box>
      <Dialog open={open} onOpenChange={open => setOpen(open)}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Text as="span" weight="regular">
              {translate('saveToStory')}
            </Text>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Flex
            flexDirection="column"
            alignItems="center"
            css={{ height: '100%' }}
          >
            <Flex justifyContent="flex-end" css={{ width: '100%' }}>
              <Box mt="4">
                <DialogClose asChild>
                  <Button aria-label={translate('close')} variant="icon">
                    <CrossIcon aria-hidden="true" width="27px" height="27px" />
                  </Button>
                </DialogClose>
              </Box>
            </Flex>
            <Flex justifyContent="center" css={{ mt: '$3' }}>
              <DialogTitle>{translate('addArtefact')}</DialogTitle>
            </Flex>

            <Box mt="10" css={{ width: '100%' }}>
              {showInput ? (
                <>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    css={{
                      height: '48.6px',
                      backgroundColor: '$blue',
                      px: '$4',
                      borderRadius: '$1',
                    }}
                  >
                    <Box mr="3">
                      <Input
                        placeholder="Titel der Story"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        autoFocus
                        onFocus={e => e.currentTarget.select()}
                      />
                    </Box>
                    <InputCloseButton
                      aria-label={translate('close')}
                      onClick={() => {
                        setShowInput(false);
                      }}
                      css={{
                        '> svg': {
                          pl: '1px',
                        },
                      }}
                    >
                      <CrossIcon
                        aria-hidden="true"
                        width="11px"
                        height="11px"
                      />
                    </InputCloseButton>
                  </Flex>
                  <Box mt="3" px="2">
                    <Flex
                      justifyContent={{
                        '@initial': 'space-between',
                        '@bp1': 'flex-end',
                      }}
                      gap="5"
                    >
                      <Button
                        variant="ghost"
                        onClick={() => setShowInput(false)}
                      >
                        <Text>{translate('abort')}</Text>
                      </Button>
                      <Button
                        disabled={title === ''}
                        variant="secondary"
                        onClick={() => {
                          setTitle('');
                          createStory({
                            variables: {
                              create: {
                                title,
                                language,
                                artefactId: artefactId,
                              },
                            },
                            onCompleted(data) {
                              setStory(data.createStory);
                              setSuccessToast(true);
                            },
                            onError() {
                              setStory({ id: '', title });
                              setFailToast(true);
                            },
                            refetchQueries: [namedOperations.Query.MyStories],
                          });
                          setOpen(false);
                        }}
                      >
                        <Text>{translate('saveToStory')}</Text>
                      </Button>
                    </Flex>
                  </Box>
                </>
              ) : (
                <Flex justifyContent="center">
                  <NewStoryButton onClick={() => setShowInput(true)}>
                    <Text weight="semiBold" size="normal">
                      {translate('newStory')} +
                    </Text>
                  </NewStoryButton>
                </Flex>
              )}
            </Box>
            <Box
              mt="10"
              css={{
                width: '100%',
                overflow: 'auto',
              }}
            >
              {stories.map(story => {
                const isAlreadyAdded = story.artefactBasket?.some(
                  a => a?.id === artefactId
                );
                return (
                  <Box
                    key={story.id}
                    css={{
                      '&:not(:first-of-type)': {
                        mt: '$3',
                      },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <StoryButton
                      title={
                        isAlreadyAdded
                          ? 'Das Artefakt wurde bereits zur dieser Story hinzugefügt.'
                          : undefined
                      }
                      disabled={isAlreadyAdded}
                      onClick={() => {
                        addArtefactToBasket({
                          variables: {
                            create: { storyId: story.id, artefactId },
                          },
                          refetchQueries: [namedOperations.Query.MyStories],
                          onCompleted() {
                            setStory(story);
                            setSuccessToast(true);
                          },
                          onError() {
                            setStory(story);
                            setFailToast(true);
                          },
                        });
                        setOpen(false);
                      }}
                    >
                      {story.previewImage?.url ? (
                        <Box
                          css={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0',
                            zIndex: 0,
                            '> img': {
                              objectFit: 'cover',
                              borderRadius: '4px',
                              opacity: isAlreadyAdded ? 0.5 : 1,
                              width: '100%',
                              height: '100%',
                            },
                          }}
                        >
                          <Box
                            css={{
                              position: 'absolute',
                              top: '0',
                              right: '0',
                              bottom: '0',
                              left: '0',
                              background: isAlreadyAdded
                                ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.14) 44%, rgba(0, 0, 0, 0.70) 100%)'
                                : 'linear-gradient(180deg, rgba(83, 11, 244, 0.20) 0%, rgba(83, 11, 244, 0.46) 51.41%, rgba(83, 11, 244, 0.70) 100%)',
                              borderRadius: '4px',
                              zIndex: 1,
                            }}
                          />
                          <Image
                            src={story.previewImage.url}
                            alt={story.title}
                            sizes="(min-width: 768px) 660px, 80vw"
                            fill={true}
                            loader={saveSizeImage(story.previewImage)}
                          />
                        </Box>
                      ) : (
                        <Box
                          css={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0',
                            background:
                              'linear-gradient(180deg, rgba(83, 11, 244, 0.20) 0%, rgba(83, 11, 244, 0.46) 51.41%, rgba(83, 11, 244, 0.70) 100%)',
                            borderRadius: '4px',
                            zIndex: 0,
                          }}
                        />
                      )}
                      <Box
                        px="4"
                        css={{
                          position: 'absolute',
                          bottom: 10,
                          left: 0,
                          width: '100%',
                        }}
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="flex-end"
                        >
                          <Text
                            size="small"
                            weight="bold"
                            color="white"
                            capsize={false}
                          >
                            {story.title}
                          </Text>
                          {isAlreadyAdded ? (
                            <CheckIcon
                              aria-hidden="true"
                              fill="white"
                              width="24px"
                              height="24px"
                            />
                          ) : null}
                        </Flex>
                      </Box>
                    </StoryButton>
                  </Box>
                );
              })}
            </Box>
          </Flex>
        </DialogContent>
      </Dialog>
      <Toast open={successToast} onOpenChange={setSuccessToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <CheckIcon aria-hidden="true" />
              </Flex>
              {translate('toStory')} &quot;{story?.title}&quot;
              {translate('added')}.
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button aria-label={translate('close')} variant="ghost-blue">
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon aria-hidden="true" />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>

        <Flex justifyContent="flex-end" css={{ pr: '$3', mt: '$2' }}>
          <Link
            href={`/stories/${story?.id}`}
            onClick={() => setSuccessToast(false)}
          >
            <Flex
              alignItems="center"
              css={{
                px: '$3',
                py: '6px',
                border: '1px solid',
                borderColor: '$blue50',
                borderRadius: '$1',
              }}
            >
              <Flex css={{ display: 'inline-flex', mr: '$1' }}>
                <EditIcon aria-hidden="true" width="14px" height="14px" />
              </Flex>
              <Text size="xsmall">{translate('editStory')}</Text>
            </Flex>
          </Link>
        </Flex>
      </Toast>
      <Toast open={failToast} onOpenChange={setFailToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex gap="2" css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <AlertIcon aria-hidden="true" />
              </Flex>
              <Box>
                {translate('couldNotAdd')} &quot;{story?.title}&quot;
                {translate('notAdded')}.
                <Box mt="2">{translate('tryLater')}</Box>
              </Box>
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0 }}>
            <ToastAction asChild altText="Close">
              <Button aria-label={translate('close')} variant="ghost-blue">
                <Flex css={{ display: 'inline-flex' }}>
                  <CrossIcon aria-hidden="true" />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
    </Box>
  );
};

export const NewStoryButton = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$blue',
  backgroundColor: '$blue50',
  borderRadius: '4px',
  width: '100%',
  px: '$7',
  py: '18px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$blueDark',
    color: 'white',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export const StoryButton = styled('button', {
  all: 'unset',
  position: 'relative',
  cursor: 'pointer',
  display: 'flex',
  color: 'white',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  width: '100%',
  height: '100px',
  boxSizing: 'border-box',
  border: '2px solid',
  borderColor: 'transparent',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    borderColor: '$blue',
  },

  '&:disabled': {
    backgroundColor: '$black100',
    color: '$black600',
    cursor: 'auto',
  },

  '@bp1': {
    height: '150px',
  },
});

export const Input = styled('input', {
  fontSize: '$normal',
  height: '100%',
  width: '100%',
  maxWidth: '300px',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  color: 'white',
  p: '0',

  '&::placeholder': {
    color: '$black50',
  },
  '@bp1': {
    fontSize: '$large',
  },
});

export const InputCloseButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: '1px solid',
  borderColor: 'currentColor',
  color: 'white',
  cursor: 'pointer',
  p: '4px',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export const Feedback = ({ artefactId }: { artefactId: string }) => {
  const [value, setValue] = React.useState('');
  const translate = useTranslations('ArtefactDetail');
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [sendFeedback] = useReportArtefactMutation();
  const [successToast, setSuccessToast] = React.useState(false);

  return (
    <>
      <Stack space="4">
        <Text as="h3" weight="bold" size="large">
          {translate('feedback')}
        </Text>
        <Text>{translate('feedbackText')}</Text>
        <Textarea
          id="text"
          ref={ref}
          placeholder={translate('addText')}
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{ backgroundColor: 'white' }}
        />
        <Flex justifyContent="flex-end">
          <FeedbackButton
            onClick={() => {
              sendFeedback({
                variables: {
                  create: {
                    message: value,
                    artefactId: artefactId,
                  },
                },
                onCompleted: () => {
                  setSuccessToast(true);
                },
              });
            }}
          >
            <Text>{translate('sendFeedback')}</Text>
          </FeedbackButton>
        </Flex>
      </Stack>
      <Toast open={successToast} onOpenChange={setSuccessToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex css={{ mt: '$3' }}>
              <Flex css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}>
                <CheckIcon aria-hidden="true" />
              </Flex>
              {translate('feedbackSent')}
            </Flex>
          </ToastDescription>
          <Box css={{ pt: '6px', flexShrink: 0, mr: '6px' }}>
            <ToastAction asChild altText="Close">
              <Button aria-label={translate('close')} variant="ghost-blue">
                <Flex
                  css={{
                    display: 'inline-flex',
                  }}
                >
                  <CrossIcon aria-hidden="true" id="cross-icon" />
                </Flex>
              </Button>
            </ToastAction>
          </Box>
        </Flex>
      </Toast>
    </>
  );
};

const FeedbackButton = styled('button', {
  all: 'unset',
  color: '$blue',
  border: '1px solid transparent',
  cursor: 'pointer',
  padding: '$3',
  borderRadius: '$1',

  '&:hover': {
    border: ' 1px solid $blueDark',
    color: '$blueDark',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export const FavoriteButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$blue',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid',
  borderColor: '$blue100',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$blue100',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  variants: {
    isFavorite: {
      true: {
        color: 'white',
        borderColor: '$blue',
        backgroundColor: '$blue',

        '&:hover': {
          borderColor: '$blue',
          backgroundColor: '$blue',
        },
      },
    },
  },
});

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

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

export default Detail;
