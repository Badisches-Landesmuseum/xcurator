import React, { useState } from 'react';
import {
  Box,
  Flex,
  Inline,
  keyframes,
  styled,
} from 'src/@3pc/layout-components-react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useTranslations } from 'next-intl';
import {
  Overlay,
  OverlayClose,
  OverlayContent,
  OverlayTrigger,
} from 'src/components/Common/Overlay';
import SearchInput from 'src/components/SearchInput';
import { Text } from 'src/components/Common/Text';
import Filter from 'src/components/Filter';
import {
  Artefact,
  ExploreArtefactFragment,
  ArtefactSourceOwner,
  ExploreSearchResultFragment,
  useSearchExploreQuery,
  useSuggestExploreQuery,
  ExploreStoryFragment,
  useRandomStringQuery,
  ArtefactColor,
  ArtefactEpoch,
  Material,
} from 'src/graphql/_generated/types';
import { Button } from 'src/components/Common/Button';
import {
  ArrowCircleIcon,
  CrossIcon,
  FilledHeartIcon,
  FilterIcon,
  PlusIcon,
} from 'src/icons';
import Detail from 'src/components/Canvas/Detail';
import { useSearchStore } from 'src/store/useSearchStore';
import { useDebounce } from 'src/utils/useDebounce';
import { useOutsideClick } from 'src/utils/useOutsideClick';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/Common/Popover';
import { ButtonTag } from 'src/components/Common/ButtonTag';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import Image from 'next/image';
import { useTagStore } from 'src/store/useTagStore';
import { useRouter } from 'next/router';
import { saveSizeImage } from 'src/utils/formatImage';
import Link from 'next/link';
import { useHasHydrated } from 'src/utils/useHasHydrated';
import { useProfile } from 'src/components/Context/ProfileContext';
import { localeToLanguage } from 'src/utils/useLanguage';
import { useFilterStore } from 'src/store/useFilterStore';
import { Orbit } from '@uiball/loaders';
import Head from 'next/head';
import { push } from '@socialgouv/matomo-next';
import { TutorialDialog } from 'src/components/Canvas/Tutorial';

const MinLengthForSuggestions = 3;

export default function Page({
  locale,
  artefactId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const translate = useTranslations('Canvas');
  const router = useRouter();
  const hasHydrated = useHasHydrated();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [owner, setOwner] = useState<ArtefactSourceOwner | 'all'>('all');
  const language = localeToLanguage(locale);
  // initialize with true so links can be opened with already opened detail page
  const [detailOpen, setDetailOpen] = useState(!!artefactId);
  const [minimizeDetail, setMinimizeDetail] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const query = useSearchStore(state => state.query);
  const updateQuery = useSearchStore(state => state.updateQuery);
  const randomQuery = useSearchStore(state => state.randomQuery);
  const updateRandomQuery = useSearchStore(state => state.updateRandomQuery);
  const resetFilter = useFilterStore(state => state.resetFilter);
  const [tagsOpen, setTagsOpen] = React.useState(false);
  const filteredTags = useTagStore(state => state.filteredTags);
  const tagId = useTagStore(state => state.tagId);
  const resetTags = useTagStore(state => state.resetTags);
  const [value, setValue] = React.useState(query);
  const debouncedValue = useDebounce(value, 500);
  const [typing, setTyping] = React.useState(randomQuery);
  const searchRef = React.useRef<HTMLDivElement>(null);
  useOutsideClick(searchRef, () => setShowSuggestions(false));
  const locations = useFilterStore(state => state.locations);
  const colors = useFilterStore(state => state.colors);
  const epochs = useFilterStore(state => state.epochs);
  const materials = useFilterStore(state => state.materials);
  const [zoom, setZoom] = React.useState(1);
  const previousZoomRef = React.useRef(zoom);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // NOTE: count the owner as a filter if only one is selected, if both selected not considered as a filter
  const filterCount = React.useMemo(() => {
    return (
      colors.length +
      locations.length +
      epochs.length +
      materials.length +
      (owner === 'all' ? 0 : 1)
    );
  }, [locations, colors, epochs, materials, owner]);

  const { data, loading, refetch } = useSearchExploreQuery({
    skip: randomQuery && query === '',
    variables: {
      where: {
        query,
        language: language,
        tags: filteredTags,
        owner: owner === 'all' ? undefined : [owner],
        locations: locations,
        colors: colors as ArtefactColor[],
        epochs: epochs as ArtefactEpoch[],
        materials: materials as Material[],
      },
      take: 350,
    },
    onCompleted(data) {
      const id = artefactId || data.searchExplore.bestMatch?.item.id;
      const element = document.getElementById(`artefact_${id}`);
      if (!element) return;
      if (id !== artefactId) {
        router.push(`/canvas/${id}`);
      }
      const motion = window.matchMedia(
        `(prefers-reduced-motion: no-preference)`
      ).matches;
      element.scrollIntoView({
        behavior: motion ? 'smooth' : 'auto',
        block: 'center',
        inline: 'center',
      });
    },
    notifyOnNetworkStatusChange: true,
  });

  const { loading: randomLoading } = useRandomStringQuery({
    skip: !randomQuery,
    variables: {
      where: {
        language: language,
      },
    },
    onCompleted(data) {
      const string = data.queryString;
      updateQuery(string);
      const motion = window.matchMedia(
        `(prefers-reduced-motion: no-preference)`
      ).matches;
      if (!motion) {
        setTyping(false);
        updateRandomQuery(false);
        setValue(string);
        return;
      }
      inputRef.current?.focus();
      setShowSuggestions(false);
      let i = -1;
      const maxDuration = Math.min(1500, string.length * 200);
      const delta = Math.max(maxDuration / string.length, 66);
      const nextChar = () => {
        if (i >= string.length - 1) {
          setTyping(false);
          updateRandomQuery(false);
          inputRef.current?.blur();
          return;
        }
        i++;
        setValue(previous => previous + string.charAt(i));
        setTimeout(nextChar, delta);
      };
      nextChar();
    },
    onError() {
      setTyping(false);
      updateRandomQuery(false);
      inputRef.current?.blur();
    },
  });

  const { data: suggestData } = useSuggestExploreQuery({
    skip: randomQuery || debouncedValue.length < 3,
    variables: {
      where: {
        queryText: debouncedValue,
        language: language,
        limit: 10,
      },
    },
  });

  // scroll selected element into view after zoom
  React.useEffect(() => {
    if (zoom === previousZoomRef.current) return;
    previousZoomRef.current = zoom;
    const element = document.getElementById(`artefact_${artefactId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }
  }, [zoom, artefactId]);

  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      <Flex
        css={{
          flexGrow: 1,
        }}
      >
        <Box
          ref={searchRef}
          css={{
            position: 'fixed',
            top: '80px',
            zIndex: 2,
            left: '50vw',
            transform: 'translateX(-50%)',

            '@media(min-width: 968px)': {
              left: detailOpen
                ? // searchInputWidth/2 + detailWidth + padding
                  'max(50vw, calc(187px + 470px + $10))'
                : '50vw',
            },
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            css={{
              position: 'relative',
              boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.25)',
              background: '$white',
              borderRadius: '60px',
              width: '100%',
              zIndex: 1,
            }}
          >
            <SearchInput
              ref={inputRef}
              value={value}
              onChange={event => {
                if (!typing) setValue(event.target.value);
              }}
              onFocus={() => {
                setShowSuggestions(true);
              }}
              placeholder={translate('searchPlaceholder')}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  const value = (event.target as HTMLInputElement).value;
                  updateRandomQuery(false);
                  setShowSuggestions(false);
                  updateQuery(value);
                  setValue(value);
                  setDetailOpen(false);
                  resetTags();
                  push(['trackEvent', 'Canvas', 'Search', value]);
                  // to remove previous selected artefact id
                  router.push('/canvas', undefined, {
                    shallow: true,
                  });
                } else if (!typing) {
                  setShowSuggestions(true);
                }
              }}
            />
            <Overlay
              modal={false}
              open={filterOpen}
              onOpenChange={isOpen => {
                setFilterOpen(isOpen);
              }}
            >
              <OverlayTrigger aria-label={translate('openFilter')} asChild>
                <FilterButton>
                  <FilterIcon aria-hidden="true" width="28px" height="28px" />
                  {filterCount > 0 && (
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      css={{
                        position: 'absolute',
                        top: '-9px',
                        right: '-7px',
                        minWidth: '18px',
                        minHeight: '18px',
                        border: '2px solid',
                        borderColor: 'white',
                        borderRadius: '50%',
                        backgroundColor: '$blueDark',
                        color: 'white',
                      }}
                    >
                      <Text
                        css={{
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: 1,
                        }}
                      >
                        {filterCount}
                      </Text>
                    </Flex>
                  )}
                </FilterButton>
              </OverlayTrigger>
              <OverlayContent>
                <OverlayClose asChild>
                  <Flex
                    justifyContent="flex-end"
                    css={{
                      width: '100%',
                      mt: '$4',
                      mr: '$4',
                      '@bp2': {
                        mt: '$5',
                        mr: '$5',
                      },
                    }}
                  >
                    <Button
                      aria-label={translate('close')}
                      css={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        '&:hover': {
                          color: '$blueDark',
                          backgroundColor: 'transparent',
                        },
                      }}
                      aria-hidden="true"
                      variant="ghost-dark"
                    >
                      <CrossIcon
                        aria-hidden="true"
                        width="28px"
                        height="28px"
                      />
                    </Button>
                  </Flex>
                </OverlayClose>
                <Filter
                  refetch={() => {
                    resetFilter();
                    refetch({
                      where: {
                        query,
                        language: language,
                        owner: owner === 'all' ? undefined : [owner],
                        tags: filteredTags,
                      },
                      take: 500,
                    });
                  }}
                  locationFacette={
                    data?.searchExplore.facette.locationFacette || []
                  }
                  owner={owner}
                  setOwner={setOwner}
                />
              </OverlayContent>
            </Overlay>
          </Flex>
          {tagId ? <Tags setOpen={setTagsOpen} open={tagsOpen} /> : null}
          {/* TODO: maybe replace with radix dropdown menu to benefit from keyboard navigation and accessibility */}
          {/* should be open exactly when: input is focused (or this list) and the minimum queryLength is > MinLengthForSuggestions and we did not just performed a search */}
          {showSuggestions &&
          query.length >= MinLengthForSuggestions &&
          suggestData?.suggestExplore &&
          suggestData.suggestExplore.length !== 0 ? (
            <Box
              css={{
                position: 'absolute',
                top: '50%',
                left: 0,
                backgroundColor: '$blue50',
                padding: '0',
                m: 0,
                paddingTop: '24px',
                paddingBottom: '8px',
                borderRadius: '4px',
                width: '225px',
                maxHeight: '400px',
                overflowY: 'auto',

                '@bp2': {
                  width: '374px',
                },
              }}
            >
              {suggestData.suggestExplore.map(suggestion => (
                <SuggestionButton
                  key={`${suggestion.text}_${suggestion.type}`}
                  active={suggestion.text === query}
                  onClick={event => {
                    const value = (event.target as HTMLElement).innerText;
                    updateRandomQuery(false);
                    updateQuery(value);
                    setValue(value);
                    setShowSuggestions(false);
                    setDetailOpen(false);
                    resetTags();
                    push(['trackEvent', 'Canvas', 'Search', value]);
                    // to remove previous selected artefact id
                    router.push('/canvas', undefined, {
                      shallow: true,
                    });
                  }}
                >
                  {suggestion.text}
                </SuggestionButton>
              ))}
            </Box>
          ) : null}
        </Box>

        <Box
          css={{
            width: '100%',
            '@media(min-width: 968px)': {
              width: detailOpen || filterOpen ? 'calc(100% - 470px)' : '100%',
              transform:
                detailOpen || filterOpen ? ' translateX(470px)' : undefined,

              '@media (prefers-reduced-motion: no-preference)': {
                transitionProperty: 'transform',
                transitionDuration: '100ms',
                transitionTimingFunction: '$easings$out',
              },
            },
          }}
        >
          {typing || !hasHydrated ? null : data &&
            data.searchExplore.items.length > 0 ? (
            <GridWrapper
              data={data.searchExplore}
              setDetailOpen={setDetailOpen}
              setMinimizeDetail={setMinimizeDetail}
              artefactId={artefactId as string}
              zoom={zoom}
            />
          ) : (
            <Box
              css={{
                position: 'absolute',
                left: detailOpen || filterOpen ? 'calc(50vw - 470px )' : '50vw',
                top: '50vh',
                transform: 'translateX(-50%)',
              }}
            >
              {randomLoading || loading ? (
                <Orbit aria-label={translate('loading')} color="#002fff" />
              ) : (
                <Text>{translate('noResults')}</Text>
              )}
            </Box>
          )}

          {tagsOpen ? (
            <Box
              css={{
                position: 'fixed',
                top: HEADER_HEIGHT,
                left: 0,
                width: '100vw',
                height: `calc(100vh - ${HEADER_HEIGHT})`,
                backgroundColor: 'black',
                opacity: 0.4,
              }}
            />
          ) : null}
          {hasHydrated ? (
            <Overlay
              modal={false}
              open={detailOpen}
              onOpenChange={isOpen => setDetailOpen(isOpen)}
              defaultOpen={!!artefactId}
            >
              <OverlayContent
                minimize={minimizeDetail}
                onInteractOutside={event => event.preventDefault()}
              >
                <Box mt="5">
                  <Detail
                    artefactId={artefactId as string}
                    minimizeDetail={minimizeDetail}
                    setMinimizeDetail={setMinimizeDetail}
                  />
                </Box>
              </OverlayContent>
            </Overlay>
          ) : null}
        </Box>
      </Flex>
      <Box
        css={{
          position: 'fixed',
          zIndex: 2,
          bottom: '90px',
          right: '20px',
          width: '36px',
          height: '76px',
          boxShadow: '0px 0px 14px 0px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px',
          background: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Flex flexDirection="column" alignItems="center">
          <ZoomButton
            aria-label={translate('zoomIn')}
            disabled={zoom >= 2.2}
            onClick={() => {
              setZoom(zoom + 0.6);
            }}
          >
            <Box
              css={{
                height: '28px',
                width: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlusIcon width="19px" height="19px" fill="$blue" />
            </Box>
          </ZoomButton>
          <Box
            my="1"
            css={{ backgroundColor: '$black100', width: '28px', height: '2px' }}
          />
          <ZoomButton
            aria-label={translate('zoomOut')}
            disabled={zoom <= 1}
            onClick={() => {
              setZoom(zoom - 0.6);
            }}
          >
            <Box
              css={{
                height: '28px',
                width: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                css={{
                  width: '19px',
                  height: '3px',
                  backgroundColor: zoom <= 1 ? '$black300' : '$blue',
                  borderRadius: '2px',
                }}
              />
            </Box>
          </ZoomButton>
        </Flex>
        {hasHydrated ? <TutorialDialog /> : null}
      </Box>
    </>
  );
}

const Tags = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const translate = useTranslations('Canvas');
  const tagId = useTagStore(state => state.tagId);
  const canvasTags = useTagStore(state => state.canvasTags);
  const filteredTags = useTagStore(state => state.filteredTags);
  const tagImage = useTagStore(state => state.tagImage);
  const deselectTags = useTagStore(state => state.deselectTags);
  const toggleTag = useTagStore(state => state.toggleTag);
  const filterByTags = useTagStore(state => state.filterByTags);
  const updateRandomQuery = useSearchStore(state => state.updateRandomQuery);

  const router = useRouter();

  const tagsPristine = React.useMemo(() => {
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
  }, [canvasTags, filteredTags]);

  return (
    <Popover modal={true} onOpenChange={open => setOpen(open)} open={open}>
      <PopoverTrigger asChild>
        <TagButton>
          {filteredTags.length > 0 ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              css={{
                position: 'absolute',
                top: '-4px',
                right: '-2px',
                minWidth: '18px',
                minHeight: '18px',
                border: '2px solid',
                borderColor: 'white',
                borderRadius: '50%',
                backgroundColor: '$blueDark',
                color: 'white',
                zIndex: 1,
              }}
            >
              <Text
                css={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {filteredTags.length}
              </Text>
            </Flex>
          ) : null}
          <Flex
            justifyContent="center"
            alignItems="center"
            css={{
              border: '3px solid',
              borderColor: open ? 'white' : '$blue',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
            }}
          >
            <Box
              css={{
                position: 'relative',
                border: '2px solid',
                borderColor: open ? '$blue' : 'white',
                display: 'inline-flex',
                borderRadius: '50%',
                backgroundColor: 'white',
                flexGrow: 1,
                height: '100%',

                '> img': {
                  borderRadius: '50%',
                  objectFit: 'contain',
                },
              }}
            >
              {tagImage ? (
                <Image
                  src={tagImage}
                  fill={true}
                  sizes="34px"
                  alt="Ausgewähltes Artefakt"
                />
              ) : null}
            </Box>
          </Flex>
        </TagButton>
      </PopoverTrigger>
      <PopoverContent collisionPadding={12} sideOffset={4} align="end">
        <Box
          p="3"
          css={{
            maxWidth: 'calc(100vw - 24px)',

            '@bp2': {
              maxWidth: '438px',
            },
          }}
        >
          <Flex justifyContent="space-between">
            <FlexButton
              onClick={() => {
                const element = document.getElementById(`artefact_${tagId}`);
                if (element) {
                  router.push(`/canvas/${tagId}`);
                  const motion = window.matchMedia(
                    `(prefers-reduced-motion: no-preference)`
                  ).matches;
                  element.scrollIntoView({
                    behavior: motion ? 'smooth' : 'auto',
                    block: 'center',
                    inline: 'center',
                  });
                }
              }}
            >
              <Box
                css={{
                  position: 'relative',
                  border: '2px solid',
                  borderColor: '$blue',
                  display: 'inline-flex',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  height: '34px',
                  width: '34px',

                  '@bp2': {
                    height: '50px',
                    width: '50px',
                  },

                  '> img': {
                    borderRadius: '50%',
                    objectFit: 'contain',
                  },
                }}
              >
                {tagImage ? (
                  <Image
                    src={tagImage}
                    fill={true}
                    sizes="(min-width: 768px) 50px, 34px"
                    alt="Ausgewähltes Artefakt"
                  />
                ) : null}
              </Box>
              <Text>{translate('jumpArtefact')}</Text>
            </FlexButton>
            <Box mr="-3" mt="-3">
              <PopoverClose asChild>
                <Button aria-label={translate('close')} variant="ghost">
                  <CrossIcon aria-hidden="true" color="black" />
                </Button>
              </PopoverClose>
            </Box>
          </Flex>
          <Box mt="4">
            <Inline space="1">
              {canvasTags.map((t, i) => (
                <ButtonTag
                  key={i}
                  variant={t.tag.isUsingAI ? 'ai' : undefined}
                  isActive={t.isSelected}
                  onClick={() => {
                    toggleTag(t.tag);
                  }}
                >
                  {t.tag.literal}
                </ButtonTag>
              ))}
            </Inline>
          </Box>
          <Box mt="3">
            <Flex justifyContent="flex-end" gap="5">
              {filteredTags.length > 0 ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    deselectTags();
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
                  filterByTags(canvasTags);
                  setOpen(false);
                  updateRandomQuery(false);
                }}
              >
                {translate('filterTags')}
              </Button>
            </Flex>
          </Box>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

const FlexButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  color: '$blue',
  cursor: 'pointer',
  borderTopRightRadius: '22px',
  borderBottomRightRadius: '22px',
  borderBottomLeftRadius: '22px',
  borderTopLeftRadius: '22px',
  gap: '$3',
  pr: '$3',

  '&:hover': {
    backgroundColor: '$blue50',
  },

  '&:active': {
    backgroundColor: '$blue',
    color: 'white',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '@bp2': {
    gap: '$4',
    pr: '$4',
  },
});

const GridWrapper = React.memo(function GridWrapper({
  data,
  setDetailOpen,
  setMinimizeDetail,
  artefactId,
  zoom,
}: {
  data?: ExploreSearchResultFragment;
  setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMinimizeDetail: React.Dispatch<React.SetStateAction<boolean>>;
  artefactId: string;
  zoom: number;
}) {
  if (!data) return null;

  return (
    <Box
      css={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data.gridInfo.columns}, calc(75px * ${zoom}))`,
        gridAutoRows: `calc(75px * ${zoom})`,
        gap: '1px',

        '@bp3': {
          gridTemplateColumns: `repeat(${data.gridInfo.columns}, calc(100px * ${zoom}))`,
          gridAutoRows: `calc(100px * ${zoom})`,
        },
      }}
    >
      {data.items.map(gridItem => {
        return (
          <GridLink
            key={`${gridItem.item.__typename}_${
              (gridItem.item as Artefact).id
            }`}
            id={`artefact_${(gridItem.item as Artefact).id}`}
            href={
              gridItem.item.__typename === 'Artefact'
                ? `/canvas/${gridItem.item.id}`
                : `/presentation/${encodeURIComponent(gridItem.item.title)}/${
                    gridItem.item.id
                  }`
            }
            onClick={() => {
              if (gridItem.item.__typename === 'Story') return;
              setDetailOpen(true);
              setMinimizeDetail(false);
            }}
            css={{
              gridRowEnd: `span ${gridItem.size.height}`,
              gridColumnEnd: `span ${gridItem.size.width}`,
            }}
          >
            {gridItem.item.__typename === 'Artefact' ? (
              <Artefact
                artefact={gridItem.item}
                isSelected={artefactId === (gridItem.item as Artefact).id}
                zoom={zoom}
              />
            ) : gridItem.item.__typename === 'Story' ? (
              <Story story={gridItem.item} zoom={zoom} />
            ) : null}
          </GridLink>
        );
      })}
    </Box>
  );
});

const Artefact = ({
  artefact,
  isSelected,
  zoom,
}: {
  artefact: ExploreArtefactFragment;
  isSelected: boolean;
  zoom: number;
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { favourites } = useProfile();
  const isFavorite = React.useMemo(
    () => favourites.some(favouriteItem => favouriteItem.id === artefact.id),
    [artefact.id, favourites]
  );
  const translate = useTranslations('Canvas');

  return (
    <Box
      css={{
        position: 'relative',
        width: '100%',
        height: '100%',
        border: isSelected ? '2px solid $blue' : undefined,
      }}
    >
      <Box
        css={{
          position: 'relative',
          display: 'inline-flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',

          '> img': {
            objectFit: 'contain',
            wordBreak: 'break-all',
            fontSize: '12px',
            backgroundColor: error ? '$blue50' : undefined,
            p: error ? '$1' : undefined,
          },
        }}
      >
        <Image
          src={artefact.images[0].url}
          fill={true}
          sizes={`(min-width: 1170px) ${Math.round(zoom * 100)}px, ${Math.round(
            zoom * 100
          )}px`}
          alt={artefact.title}
          loader={saveSizeImage(artefact.images[0])}
          onLoadingComplete={() => {
            setLoaded(true);
            setError(false);
          }}
          onError={() => {
            setLoaded(true);
            setError(true);
          }}
        />
        {loaded ? null : (
          <Box
            css={{
              position: 'absolute',
              top: 0,
              left: '-300%',
              width: '400%',
              height: '100%',
              backgroundImage: `linear-gradient(90deg, $black50, $black50 25%, $blue50 61%, $blue100 68%, $black50 75%)`,
              zIndex: 1,
              animation: `${slideAnimation} 2s ease-in-out 500ms infinite`,
            }}
          />
        )}
      </Box>
      {isFavorite ? (
        <Box
          css={{
            display: 'inline-flex',
            position: 'absolute',
            top: '2px',
            right: '2px',
            color: '$blue',
          }}
        >
          <FilledHeartIcon aria-label={translate('isFavourite')} />
        </Box>
      ) : null}
    </Box>
  );
};

const Story = ({
  story,
  zoom,
}: {
  story: ExploreStoryFragment;
  zoom: number;
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  return (
    <Box
      css={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        css={{
          position: 'relative',
          display: 'inline-flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',

          '> img': {
            objectFit: 'contain',
            wordBreak: 'break-all',
            fontSize: '12px',
            backgroundColor: error ? '$blue50' : undefined,
            p: error ? '$1' : undefined,
          },
        }}
      >
        {story.previewImage?.url ? (
          <>
            <Image
              src={story.previewImage.url}
              fill={true}
              sizes={`(min-width: 1170px) ${Math.round(
                zoom * 125
              )}px, ${Math.round(zoom * 75)}px`}
              alt={story.title}
              loader={saveSizeImage(story.previewImage)}
              onLoadingComplete={() => {
                setLoaded(true);
                setError(false);
              }}
              onError={() => {
                setLoaded(true);
                setError(true);
              }}
            />
            {loaded ? null : (
              <Box
                css={{
                  position: 'absolute',
                  top: 0,
                  left: '-300%',
                  width: '400%',
                  height: '100%',
                  backgroundImage: `linear-gradient(90deg, $black50, $black50 25%, $blue50 61%, $blue100 68%, $black50 75%)`,
                  zIndex: 1,
                  animation: `${slideAnimation} 2s ease-in-out 500ms infinite`,
                }}
              />
            )}
          </>
        ) : null}
      </Box>
      <Flex
        alignItems="flex-end"
        css={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          p: '6px',
          color: 'white',
          borderRadius: '$1 ',
          background:
            'linear-gradient(to bottom, rgba(0, 47, 255, 0.25), rgba(0, 47, 255, 0.85))',
        }}
      >
        <Text>{story.title}</Text>
      </Flex>
    </Box>
  );
};

const slideAnimation = keyframes({
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: 'translateX(75%)' },
});

const FilterButton = styled('button', {
  all: 'unset',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  mx: '$1',
  backgroundColor: '$blue100',
  borderRadius: '50%',
  color: '$blueDark',

  '&:hover': {
    backgroundColor: '$blue200',
  },

  '&:active': {
    color: '$blue200',
    backgroundColor: '$blueDark',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const TagButton = styled('button', {
  all: 'unset',
  position: 'absolute',
  top: '-4px',
  left: 'calc(100% + $5)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const GridLink = styled(Link, {
  all: 'unset',
  cursor: 'pointer',
  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const ZoomButton = styled('button', {
  all: 'unset',
  color: '$blue',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid $green',
  },
  '&:disabled': {
    color: '$black300',
  },
});

const SuggestionButton = styled('button', {
  all: 'unset',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'calc(100% - $9 - $4)',
  pl: '$9',
  pr: '$4',
  py: '$1',
  lineHeight: '1.75rem',
  fontSize: '$normal',
  userSelect: 'none',
  cursor: 'pointer',

  '&:hover': {
    color: '$blue',
    backgroundColor: '$blue100',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  variants: {
    active: {
      true: {
        color: '$blue',
      },
    },
  },
});

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  if (!locale)
    return {
      artefactId: params?.id || '',
    };
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      locale,
      artefactId: params?.id || '',
    },
  };
}
