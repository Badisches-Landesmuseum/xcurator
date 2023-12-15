import * as React from 'react';
import {
  Box,
  Flex,
  Grid,
  Stack,
  styled,
} from 'src/@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import Link from 'next/link';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import {
  AlertIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronIcon,
  ChevronUpIcon,
  CrossIcon,
  DeleteIcon,
  InfoIcon,
  KiIcon,
  ThreeDotsIcon,
} from 'src/icons';
import * as Tabs from '@radix-ui/react-tabs';
import {
  ArtefactFragment,
  namedOperations,
  StoryFragment,
  ModuleFragment,
  useSuggestArtefactsQuery,
  useRemoveArtefactFromBasketMutation,
  useGenerateThoughtQuery,
} from 'src/graphql/_generated/types';
import Masonry from 'react-responsive-masonry';
import Image from 'next/image';
import { useProfile } from 'src/components/Context/ProfileContext';
import { Button } from 'src/components/Common/Button';
import { useTranslations } from 'next-intl';
import { arrayMove } from 'src/utils/arrayMove';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import {
  Overlay,
  OverlayCenterContent,
  OverlayClose,
  OverlayTrigger,
} from 'src/components/Common/Overlay';
import { Textarea } from 'src/components/Common/Textarea';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownButton,
} from 'src/components/Common/Dropdown';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from 'src/components/Common/Dialog';
import { GenerateAIText } from 'src/components/Story/GenerateAIText';
import { saveSizeImage } from 'src/utils/formatImage';
import { useFlip } from 'src/utils/useFlip';

export function EditChapter({
  story,
  chapter,
  header,
  failToast,
  setFailToast,
  save,
}: {
  story: StoryFragment;
  chapter?: ModuleFragment;
  header: string;
  failToast: boolean;
  setFailToast: React.Dispatch<React.SetStateAction<boolean>>;
  save: (thought: string, artefactIds: string[]) => void;
}) {
  const translate = useTranslations('EditStory');
  const [tab, setTab] = React.useState('story');
  const [detail, setDetail] = React.useState<ArtefactFragment>();
  const [selected, setSelected] = React.useState<ArtefactFragment[]>(
    chapter?.artefacts ?? []
  );
  const [thought, setThought] = React.useState(chapter?.thought || '');
  useFlip(selected);

  const { data: suggestedArtefacts, loading: suggestedArtefactsLoading } =
    useSuggestArtefactsQuery({
      variables: {
        take: 12,
        where: {
          storyTitle: story.title,
          language: story.language,
        },
      },
    });
  const { favourites, favouritesLoading } = useProfile();

  const [removeArtefactFromBasket] = useRemoveArtefactFromBasketMutation();

  return (
    <Box>
      <Box
        px={{
          '@initial': 4,
          '@bp2': 10,
        }}
        css={{
          position: 'sticky',
          display: 'flex',
          alignItems: 'center',
          top: 0,
          left: 0,
          width: '100%',
          height: HEADER_HEIGHT,
          color: '$white',
          backgroundColor: '$blue',
          zIndex: 2,
        }}
      >
        <Link
          aria-label={translate('backToStory')}
          href={`/stories/${story.id}`}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            css={{
              display: 'inline-flex',
              width: '26px',
              height: '26px',
              borderRadius: '$1',

              '&:hover': {
                backgroundColor: '$blueDark',
              },

              '@bp2': {
                width: '40px',
                height: '40px',
              },
            }}
          >
            <ChevronIcon aria-hidden="true" />
          </Flex>
        </Link>
        <Box
          px={{ '@initial': 2, '@bp1': 4 }}
          css={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          <Text size={{ '@initial': 'normal', '@bp1': 'xlarge' }} weight="bold">
            {header}
          </Text>
        </Box>
      </Box>
      <Tabs.Root value={tab} onValueChange={value => setTab(value)}>
        <Grid
          css={{
            alignItems: 'stretch',
            '@bp2': {
              alignItems: 'start',
              gridTemplateColumns: '335px 1fr',
              gridTemplateRows: '372px auto auto',
              justifyItems: 'center',
            },

            '@bp3': {
              gridTemplateColumns: '467px 1fr',
            },
          }}
        >
          <Box
            css={{
              position: 'sticky',
              top: HEADER_HEIGHT,
              zIndex: 1,
              backgroundColor: 'white',

              '@bp2': {
                gridColumn: '2 / 3',
                width: '100%',
                maxWidth: '660px',
                mx: 'auto',
                px: '5',
              },
            }}
          >
            <Box
              pt={{ '@initial': '4', '@bp2': '14' }}
              px="3"
              css={{
                textAlign: 'center',
                '@bp2': {
                  textAlign: 'initial',
                },
              }}
            >
              <Text
                size={{ '@initial': 'small', '@bp2': 'xxlarge' }}
                weight="semiBold"
                capsize={false}
                css={{
                  overflowX: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {story.title}
              </Text>
            </Box>
            <Box mt="2" px="3" css={{ textAlign: 'center' }}>
              <Text size="xsmall" color="black600">
                {translate('youHave')} {selected.length} {translate('selected')}
              </Text>
            </Box>
            <Box mt="4" px="3">
              <Box
                py={{ '@initial': '2', '@bp2': '5' }}
                px={{ '@initial': '2', '@bp2': '5' }}
                css={{
                  width: '100%',
                  height: '138px',
                  backgroundColor: '$black50',

                  '@media(min-width: 435px)': {
                    height: '264px',
                  },
                }}
              >
                <Flex
                  justifyContent={
                    selected.length < 3 ? 'center' : 'space-between'
                  }
                  gap="2"
                  css={{
                    height: '100%',
                  }}
                >
                  {selected.map((artefact, index) => (
                    <Flex
                      key={artefact.id}
                      id={artefact.id}
                      flexDirection="column"
                      css={{
                        position: 'relative',
                        width: '105px',
                        height: '100%',

                        '@media(min-width: 435px)': {
                          width: '193px',
                        },
                      }}
                    >
                      <Box
                        css={{
                          position: 'absolute',
                          right: '4px',
                          top: '4px',
                          zIndex: 1,
                        }}
                      >
                        <DeleteButton
                          aria-label={translate('removeObject')}
                          onClick={() =>
                            setSelected(previous =>
                              previous.filter(a => a.id !== artefact.id)
                            )
                          }
                        >
                          <DeleteIcon aria-hidden="true" />
                        </DeleteButton>
                      </Box>
                      <Box
                        css={{
                          width: '100%',
                          flexGrow: 1,
                          position: 'relative',
                          '> img': {
                            objectFit: 'cover',
                          },
                        }}
                      >
                        <Image
                          src={artefact.images[0].url}
                          alt={artefact.title}
                          fill={true}
                          sizes="(min-width: 435px) 193px, 105px"
                          loader={saveSizeImage(artefact.images[0])}
                        />
                      </Box>
                      {selected.length > 1 ? (
                        <Flex
                          justifyContent="center"
                          gap="10"
                          css={{
                            flexShrink: 0,
                            mt: '$1',
                          }}
                        >
                          <MoveButton
                            aria-label={translate('moveLeft')}
                            onClick={() => {
                              setSelected(previous =>
                                arrayMove([...previous], index, index - 1)
                              );
                            }}
                          >
                            <Box
                              css={{
                                display: 'inline-flex',
                              }}
                            >
                              <ChevronIcon
                                aria-hidden="true"
                                width="15px"
                                height="15px"
                              />
                            </Box>
                          </MoveButton>
                          <MoveButton
                            aria-label={translate('moveRight')}
                            onClick={() => {
                              setSelected(previous =>
                                arrayMove([...previous], index, index + 1)
                              );
                            }}
                          >
                            <Box
                              css={{
                                display: 'inline-flex',
                                transform: 'rotate(180deg)',
                              }}
                            >
                              <ChevronIcon
                                aria-hidden="true"
                                width="15px"
                                height="15px"
                              />
                            </Box>
                          </MoveButton>
                        </Flex>
                      ) : null}
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box
            pt="6"
            px="3"
            css={{
              position: 'sticky',
              top: `calc(${HEADER_HEIGHT} + 209.8px)`,

              '@media(min-width: 435px)': {
                top: `calc(${HEADER_HEIGHT} + 335.8px)`,
              },

              '@bp2': {
                top: `calc(${HEADER_HEIGHT} + 385.4px)`,
                gridColumn: '2 / 3',
                zIndex: 1,
                width: '100%',
                maxWidth: '660px',
                backgroundColor: 'white',
              },
            }}
          >
            <Flex
              justifyContent="space-between"
              alignItems="flex-start"
              css={{ mb: '$2' }}
            >
              <Box as="label" htmlFor="text">
                <Text>{translate('text')}</Text>
              </Box>
              <Dialog>
                <DialogTrigger asChild>
                  <GenerateTextButton>
                    <Box css={{ display: 'inline-flex', mr: '6px' }}>
                      <KiIcon aria-hidden="true" />
                    </Box>
                    {translate('generate')}
                  </GenerateTextButton>
                </DialogTrigger>
                <DialogContent small>
                  <Box
                    pb="10"
                    css={{
                      overflow: 'auto',
                      maxHeight: 'inherit',
                    }}
                  >
                    <Box
                      css={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'white',
                        borderTopLeftRadius: '19px',
                        borderTopRightRadius: '19px',
                      }}
                    >
                      <Box pt="4">
                        <Flex justifyContent="flex-end">
                          <DialogClose asChild>
                            <Button
                              variant="icon"
                              aria-label={translate('close')}
                            >
                              <CrossIcon
                                aria-hidden="true"
                                width="27px"
                                height="27px"
                              />
                            </Button>
                          </DialogClose>
                        </Flex>
                      </Box>
                      <Box mt="3" px="5" pb="10">
                        <DialogTitle css={{ textAlign: 'center' }}>
                          {translate('generate')}
                        </DialogTitle>
                      </Box>
                    </Box>
                    <Box px="5">
                      <GenerateText
                        storyId={story.id}
                        artefactIds={selected.map(s => s.id)}
                        insert={text => {
                          setThought(
                            previous =>
                              previous + (previous === '' ? '' : '\n') + text
                          );
                        }}
                      />
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
            </Flex>
            <Textarea
              id="text"
              value={thought}
              onChange={e => setThought(e.target.value)}
              placeholder={translate('addText')}
            />
          </Box>
          {selected.length > 0 ? (
            <Flex
              css={{
                position: 'fixed',
                bottom: '$5',
                justifyContent: 'center',
                zIndex: 3,
                width: '100%',

                '@bp2': {
                  zIndex: 1,
                  pl: '335px',
                },

                '@bp3': {
                  pl: '467px',
                },
              }}
            >
              <Button
                onClick={() => {
                  save(
                    thought,
                    selected.map(s => s.id)
                  );
                }}
              >
                {translate('save')}
              </Button>
            </Flex>
          ) : null}
          <Toast open={failToast} onOpenChange={setFailToast}>
            <Flex justifyContent="space-between">
              <ToastDescription>
                <Flex gap="2" css={{ mt: '$3' }}>
                  <Flex
                    css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}
                  >
                    <AlertIcon aria-hidden="true" />
                  </Flex>
                  <Box>
                    {translate('couldNotSave')}
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
          <Box
            css={{
              '@bp2': {
                width: '100%',
                backgroundColor: '$black50',
                minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
                gridColumn: '1 / 2',
                gridRow: '1 / 3',
              },
            }}
          >
            <Box
              pt={{ '@initial': '8', '@bp2': '14' }}
              px={{ '@initial': '3', '@bp3': '10' }}
              css={{
                position: 'sticky',
                top: `calc(${HEADER_HEIGHT} + 209.8px)`,
                zIndex: 1,
                backgroundColor: 'white',

                '@media(min-width: 435px)': {
                  top: `calc(${HEADER_HEIGHT} + 335.8px)`,
                },

                '@bp2': {
                  top: HEADER_HEIGHT,
                  backgroundColor: '$black50',
                },
              }}
            >
              <Tabs.List asChild>
                <Flex
                  gap="5"
                  css={{
                    borderBottom: '1px solid',
                    borderColor: '$blue100',
                  }}
                >
                  <Tabs.Trigger asChild value="story">
                    <TabButton selected={tab === 'story'}>
                      {translate('thisStory')}
                    </TabButton>
                  </Tabs.Trigger>
                  <Tabs.Trigger asChild value="suggested">
                    <Flex alignItems="center" gap="2">
                      <KiIcon
                        aria-hidden="true"
                        height="15"
                        width="15"
                        color="black"
                      />
                      <TabButton
                        selected={tab === 'suggested'}
                        css={{
                          '@bp2': {
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                          },
                        }}
                      >
                        {translate('suggested')}
                      </TabButton>
                    </Flex>
                  </Tabs.Trigger>
                  <Tabs.Trigger asChild value="favorites">
                    <TabButton selected={tab === 'favorites'}>
                      {translate('favourites')}
                    </TabButton>
                  </Tabs.Trigger>
                </Flex>
              </Tabs.List>
            </Box>

            <Box
              px={{ '@initial': '3', '@bp3': '10' }}
              pb="4"
              css={{
                position: 'relative',
                backgroundColor: 'white',

                '@bp2': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <Overlay
                onOpenChange={open => {
                  if (!open) setDetail(undefined);
                }}
              >
                <Tabs.Content asChild value="story">
                  <Box
                    pt="5"
                    css={{
                      position: 'relative',
                    }}
                  >
                    {story.artefactBasket && story.artefactBasket.length > 0 ? (
                      <Masonry columnsCount={2} gutter="16px">
                        {story.artefactBasket.map(artefact => {
                          if (!artefact) return <Box key="" />;
                          return (
                            <Box
                              key={artefact.id}
                              css={{
                                position: 'relative',
                              }}
                            >
                              <Artefact
                                artefact={artefact}
                                isSelected={selected.some(
                                  a => a.id === artefact.id
                                )}
                                selectedFull={selected.length === 3}
                                setSelected={setSelected}
                              />
                              <Box
                                css={{
                                  position: 'absolute',
                                  right: '4px',
                                  top: '4px',
                                }}
                              >
                                <Dropdown>
                                  <DropdownTrigger asChild>
                                    <ThreeDotsButton>
                                      <ThreeDotsIcon />
                                    </ThreeDotsButton>
                                  </DropdownTrigger>
                                  <DropdownContent align="end" sideOffset={4}>
                                    <DropdownItem>
                                      <OverlayTrigger asChild>
                                        <DropdownButton>
                                          <Flex
                                            css={{
                                              display: 'inline-flex',
                                              mr: '$2',
                                            }}
                                          >
                                            <InfoIcon
                                              aria-hidden="true"
                                              width="16px"
                                              height="16px"
                                            />
                                          </Flex>
                                          <Text>{translate('info')}</Text>
                                        </DropdownButton>
                                      </OverlayTrigger>
                                    </DropdownItem>
                                    <DropdownItem>
                                      <DropdownButton
                                        onClick={() => {
                                          removeArtefactFromBasket({
                                            variables: {
                                              delete: {
                                                artefactId: artefact.id,
                                                storyId: story.id,
                                              },
                                            },
                                            refetchQueries: [
                                              namedOperations.Query.Story,
                                            ],
                                          });
                                        }}
                                      >
                                        <Flex
                                          css={{
                                            display: 'inline-flex',
                                            mr: '$2',
                                          }}
                                        >
                                          <DeleteIcon aria-hidden="true" />
                                        </Flex>
                                        <Text>
                                          {translate('removeFromBasket')}
                                        </Text>
                                      </DropdownButton>
                                    </DropdownItem>
                                  </DropdownContent>
                                </Dropdown>
                              </Box>
                            </Box>
                          );
                        })}
                      </Masonry>
                    ) : (
                      <Box mt="8" px={{ '@initial': '3', '@bp3': '10' }}>
                        <Text>{translate('noArtefactsInStory')}</Text>
                        <Box mt="10">
                          <Flex justifyContent="center">
                            <Link href="/canvas">
                              <Box
                                css={{
                                  backgroundColor: '#e6e7ff',
                                  color: '$blue',
                                  p: '$3',
                                  borderRadius: '$1',

                                  '&:hover': {
                                    backgroundColor: '$blueDark',
                                    color: 'white',
                                  },

                                  '&:focus-visible': {
                                    outline: '3px solid $green',
                                  },
                                }}
                              >
                                <Text>{translate('backToCollection')}</Text>
                              </Box>
                            </Link>
                          </Flex>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Tabs.Content>
                <Tabs.Content asChild value="suggested">
                  <Box
                    pt="5"
                    css={{
                      position: 'relative',
                    }}
                  >
                    {suggestedArtefactsLoading ? (
                      <Text>{translate('loading')}...</Text>
                    ) : suggestedArtefacts &&
                      suggestedArtefacts?.suggestRelatedArtefacts.length > 0 ? (
                      <Masonry columnsCount={2} gutter="16px">
                        {suggestedArtefacts.suggestRelatedArtefacts.map(
                          artefact => (
                            <Box
                              key={artefact.id}
                              css={{
                                position: 'relative',
                              }}
                            >
                              <Artefact
                                artefact={artefact}
                                isSelected={selected.some(
                                  a => a.id === artefact.id
                                )}
                                selectedFull={selected.length === 3}
                                setSelected={setSelected}
                              />
                              <Box
                                css={{
                                  position: 'absolute',
                                  right: '4px',
                                  top: '4px',
                                }}
                              >
                                <OverlayTrigger asChild>
                                  <InfoButton
                                    aria-label={translate('objectDetails')}
                                    title="Details"
                                    onClick={() => setDetail(artefact)}
                                  >
                                    <InfoIcon
                                      aria-hidden="true"
                                      width="16px"
                                      height="16px"
                                    />
                                  </InfoButton>
                                </OverlayTrigger>
                              </Box>
                            </Box>
                          )
                        )}
                      </Masonry>
                    ) : (
                      <Box mt="8" px={{ '@initial': '3', '@bp3': '10' }}>
                        <Text>{translate('noArtefactsInSuggested')}</Text>
                      </Box>
                    )}
                  </Box>
                </Tabs.Content>
                <Tabs.Content asChild value="favorites">
                  <Box pt="5">
                    {favouritesLoading ? (
                      <Text>{translate('loading')}</Text>
                    ) : favourites.length > 0 ? (
                      <Masonry columnsCount={2} gutter="16px">
                        {favourites.map(artefact => (
                          <Box
                            key={artefact.id}
                            css={{
                              position: 'relative',
                            }}
                          >
                            <Artefact
                              artefact={artefact}
                              isSelected={selected.some(
                                a => a.id === artefact.id
                              )}
                              selectedFull={selected.length === 3}
                              setSelected={setSelected}
                            />
                            <Box
                              css={{
                                position: 'absolute',
                                right: '4px',
                                top: '4px',
                              }}
                            >
                              <OverlayTrigger asChild>
                                <InfoButton
                                  aria-label={translate('objectDetails')}
                                  title="Details"
                                  onClick={() => setDetail(artefact)}
                                >
                                  <InfoIcon
                                    aria-hidden="true"
                                    width="16px"
                                    height="16px"
                                  />
                                </InfoButton>
                              </OverlayTrigger>
                            </Box>
                          </Box>
                        ))}
                      </Masonry>
                    ) : (
                      <Box mt="8" px={{ '@initial': '3', '@bp3': '10' }}>
                        <Text>{translate('noArtefactsInFavorites')}</Text>
                        <Box mt="10">
                          <Flex justifyContent="center">
                            <Link href="/canvas">
                              <Box
                                css={{
                                  backgroundColor: '#e6e7ff',
                                  color: '$blue',
                                  p: '$3',
                                  borderRadius: '$1',

                                  '&:hover': {
                                    backgroundColor: '$blue100',
                                  },

                                  '&:focus-visible': {
                                    outline: '3px solid $green',
                                  },
                                }}
                              >
                                <Text>{translate('backToCollection')}</Text>
                              </Box>
                            </Link>
                          </Flex>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Tabs.Content>
                <OverlayCenterContent>
                  <Flex
                    justifyContent="flex-end"
                    css={{ pt: '12px', position: 'sticky', top: 0 }}
                  >
                    <OverlayClose asChild>
                      <Button aria-label={translate('close')} variant="ghost">
                        <CrossIcon
                          aria-hidden="true"
                          color="black"
                          width="40px"
                          height="40px"
                        />
                      </Button>
                    </OverlayClose>
                  </Flex>
                  <Box px={{ '@initial': '3', '@bp2': '5' }}>
                    {detail ? <Detail artefact={detail} /> : null}
                  </Box>
                  <Flex
                    justifyContent="center"
                    css={{
                      position: 'sticky',
                      pt: '$4',
                      top: 'calc(100% - 45px - 37px - $4)',
                      pointerEvents: 'none',
                    }}
                  >
                    <Box css={{ pointerEvents: 'all' }}>
                      <OverlayClose asChild>
                        <Button
                          disabled={
                            !selected.some(a => a.id === detail?.id) &&
                            selected.length === 3
                          }
                          onClick={() => {
                            if (!detail) return;
                            setSelected(previous =>
                              selected.some(a => a.id === detail.id)
                                ? previous.filter(a => a.id !== detail.id)
                                : [...previous, detail]
                            );
                          }}
                        >
                          {selected.some(a => a.id === detail?.id)
                            ? translate('removeObject')
                            : translate('addObject')}
                        </Button>
                      </OverlayClose>
                    </Box>
                  </Flex>
                </OverlayCenterContent>
              </Overlay>
            </Box>
          </Box>
        </Grid>
      </Tabs.Root>
    </Box>
  );
}

const GenerateText = ({
  storyId,
  artefactIds,
  insert,
}: {
  storyId: string;
  artefactIds: string[];
  insert: (text: string) => void;
}) => {
  const { data, loading, error, refetch } = useGenerateThoughtQuery({
    variables: {
      where: {
        storyId,
        artefactIds,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <GenerateAIText
      text={data?.generateThought}
      loading={loading}
      error={error}
      refetch={() =>
        refetch({
          where: {
            storyId,
            artefactIds,
          },
        })
      }
      insert={insert}
    />
  );
};

const ThreeDotsButton = styled('button', {
  all: 'unset',
  width: '26px',
  height: '26px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: '$blue100',
  border: '1px solid',
  borderColor: '$blue100',
  color: '$blue',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    borderColor: '$blue',
  },

  '&:active, &[data-state="open"]': {
    borderColor: '$blue',
  },
});

const Artefact = ({
  artefact,
  isSelected,
  selectedFull,
  setSelected,
}: {
  artefact: ArtefactFragment;
  isSelected: boolean;
  selectedFull: boolean;
  setSelected: React.Dispatch<React.SetStateAction<ArtefactFragment[]>>;
}) => {
  return (
    <ArtefactButton
      disabled={!isSelected && selectedFull}
      onClick={() => {
        setSelected(previous =>
          isSelected
            ? previous.filter(a => a.id !== artefact.id)
            : [...previous, artefact]
        );
      }}
    >
      <Box
        css={{
          backgroundColor:
            selectedFull && !isSelected ? '$black300' : 'undefined',
        }}
      >
        <Box
          className="image-wrapper"
          css={{
            position: 'relative',
            display: 'inline-flex',
            width: '100%',
            border: '2px solid',
            borderColor: 'transparent',
            opacity: selectedFull && !isSelected ? 0.5 : 'undefined',

            '> img': {
              // TODO: find solution for this
              position: 'relative !important',
              objectFit: 'contain',
            },
          }}
        >
          <Image
            src={artefact.images[0].url}
            alt={artefact.title}
            sizes="250px"
            fill={true}
            loader={saveSizeImage(artefact.images[0])}
          />
        </Box>
      </Box>
      <Box mt="1">
        <Text size="xsmall">{artefact.title}</Text>
      </Box>
      <Box
        css={{
          position: 'absolute',
          left: '4px',
          top: '4px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          border: '1px solid',
          borderColor: isSelected
            ? 'white'
            : selectedFull
            ? '$black600'
            : '$blue',
          backgroundColor: isSelected
            ? '$blue'
            : selectedFull
            ? '$black600'
            : 'white',
        }}
      />
    </ArtefactButton>
  );
};

export const InfoButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '28px',
  height: '28px',
  color: '$blue',
  backgroundColor: '$blue50',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$blue100',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const GenerateTextButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  color: '$purple',
  px: '0',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#8E009A',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export const Detail = ({ artefact }: { artefact: ArtefactFragment }) => {
  const translate = useTranslations('ArtefactDetail');
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
  const [informationExpanded, setInformationExpanded] = React.useState(false);
  return (
    <>
      {artefact.images[0].url ? (
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
            src={artefact.images[0].url}
            alt={artefact.title || ''}
            sizes="300px"
            fill={true}
            loader={saveSizeImage(artefact.images[0])}
          />
        </Box>
      ) : null}
      <Box mt="5">
        <Text
          as="h3"
          weight="bold"
          css={{
            fontSize: '20px',
          }}
        >
          {artefact.title ? (
            <Box
              as="span"
              css={{
                whiteSpace: 'pre-wrap',
              }}
              dangerouslySetInnerHTML={{
                __html: artefact.title,
              }}
            />
          ) : (
            `${translate('noTitle')}`
          )}
        </Text>
      </Box>
      <Box mt="2">
        {artefact.description ? (
          <>
            <Box
              css={{
                height: descriptionExpanded ? undefined : '66px',
                overflow: descriptionExpanded ? undefined : 'hidden',
                textOverflow: 'ellipsis',
                position: 'relative',
              }}
            >
              <Text color="black600">
                <Box
                  as="span"
                  css={{
                    whiteSpace: 'pre-wrap',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: artefact.description,
                  }}
                />
              </Text>
            </Box>
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
          </>
        ) : (
          <Text color="black600" italic>
            {translate('noDescription')}
          </Text>
        )}
      </Box>

      <Box mt="8" pt="4">
        <Box
          css={{
            borderTop: '1px solid $blue200 ',
            borderBottom: '1px solid',
            borderBottomColor: informationExpanded ? 'transparent' : '$blue200',
          }}
        >
          <ExpandButton
            css={{
              pt: '$4',
            }}
            onClick={() => setInformationExpanded(!informationExpanded)}
          >
            <Flex alignItems="center" gap={1}>
              <InfoIcon aria-hidden="true" width="22px" height="22px" />
              <Text size="xsmall">{translate('moreObjectInfos')}</Text>
            </Flex>
            <Box
              css={{
                padding: '5px',
                transform: informationExpanded ? 'rotate(180deg)' : undefined,
              }}
            >
              <ArrowDownIcon aria-hidden="true" width="22px" height="22px" />
            </Box>
          </ExpandButton>
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
                  <Text>{artefact.dateRange?.literal}</Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Text weight="bold">Orte</Text>
                  <Text>
                    {artefact.locations.map(location => location.name)}
                  </Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Text weight="bold">Personen</Text>
                  <Text>{artefact.persons.map(person => person.name)}</Text>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <Text weight="bold">{translate('userRights')}</Text>
                  <Text>{artefact.images[0].licence.name}</Text>
                </Flex>
                <Link href={`${artefact.sourceInfo.url}`} target="_blank">
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
    </>
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

const TabButton = styled('button', {
  all: 'unset',
  position: 'relative',
  fontSize: '$normal',
  fontWeight: '$bold',
  py: '6px',
  cursor: 'pointer',
  textAlign: 'center',

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: 'translateX(-50%) scaleX(0)',
    transitionProperty: 'transform',
    transitionDuration: '250ms',
    transitionTimingFunction: '$easings$out',
    height: '2px',
    width: '50%',
    backgroundColor: '$blue',
  },

  variants: {
    selected: {
      true: {
        '&:before': {
          transform: 'translateX(-50%) scaleX(1)',
        },
      },
    },
  },
});

const ArtefactButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'relative',
  width: '100%',

  '&:not([disabled]):hover, &:not([disabled]):focus-visible': {
    color: '$blue',
  },

  '&:not([disabled]):hover .image-wrapper, &:not([disabled]):focus-visible .image-wrapper':
    {
      borderColor: 'currentColor',
    },

  '&[disabled]': {
    color: '$black600',
    cursor: 'default',
  },
});

const DeleteButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  color: 'white',
  backgroundColor: '$blue',
  borderRadius: '50%',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$blue',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const MoveButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$blue',
  p: '$1',
  borderRadius: '$1',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$black300',
  },

  '&[disabled]': {
    color: '$black100',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});
