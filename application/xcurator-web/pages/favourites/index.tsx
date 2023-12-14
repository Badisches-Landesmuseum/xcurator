import * as React from 'react';
import { Box, Flex, styled } from 'src/@3pc/layout-components-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Text } from 'src/components/Common/Text';
import { GetStaticPropsContext } from 'next';
import { ArrowCircleIcon, CheckIcon, CrossIcon, HeartIcon } from 'src/icons';
import { useAuth } from 'src/components/Context/AuthContext';
import Detail, { FavoriteButton } from 'src/components/Favourites/Detail';
import {
  useAddToFavouriteMutation,
  ArtefactFragmentDoc,
  ArtefactFragment,
  useDeleteArtefactFromFavouriteMutation,
} from 'src/graphql/_generated/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useProfile } from 'src/components/Context/ProfileContext';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import { Button } from 'src/components/Common/Button';
import Image from 'next/image';
import { saveSizeImage } from 'src/utils/formatImage';
import { Overlay, OverlayContent } from 'src/components/Common/Overlay';
import { useState } from 'react';
import Head from 'next/head';

export default function Page() {
  const translate = useTranslations('Favourites');
  const [toast, setToast] = React.useState(false);
  const deletedRef = React.useRef<
    { artefact: ArtefactFragment; index: number } | undefined
  >();
  const { authenticate, isLoggedIn } = useAuth();
  const { favourites, loading } = useProfile();
  const [deleteFromFavorite] = useDeleteArtefactFromFavouriteMutation();
  const [addToFavorite] = useAddToFavouriteMutation();
  const [detailOpen, setDetailOpen] = useState(false);
  const [minimizeDetail, setMinimizeDetail] = React.useState(false);
  const [selectedArtefact, setSelectedArtefact] = React.useState<string>('');

  const handleOverlayOpen = (selectedArtefact: string) => {
    setDetailOpen(true);
    setMinimizeDetail(false);
    setSelectedArtefact(selectedArtefact);
  };

  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      {loading ? (
        <Box mt="20" css={{ textAlign: 'center' }}>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap="16"
          >
            <Text size="xlarge">{translate('loading')}</Text>
          </Flex>
        </Box>
      ) : !isLoggedIn ? (
        <Box mt="20" px="4" css={{ textAlign: 'center' }}>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap="16"
          >
            <Text size="xlarge">{translate('loginPlease')}</Text>
            <Button
              onClick={() => {
                authenticate();
              }}
            >
              <Text size="large">{translate('loginButton')}</Text>
            </Button>
          </Flex>
        </Box>
      ) : isLoggedIn && !favourites.length && !loading ? (
        <Box mt="20" css={{ textAlign: 'center' }}>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap="16"
          >
            <Text size="xlarge">{translate('noFavourites')}</Text>
            <Text>{translate('selectInCanvas')}</Text>
            <ButtonLink href="/canvas">
              <Text size="large">{translate('toCanvas')}</Text>
            </ButtonLink>
          </Flex>
        </Box>
      ) : (
        <Box
          px={{ '@initial': 3, '@bp2': 10 }}
          css={{
            width: '100%',
            '@media(min-width: 968px)': {
              width: detailOpen ? 'calc(100% - 470px)' : '100%',
              transform: detailOpen ? ' translateX(470px)' : undefined,

              '@media (prefers-reduced-motion: no-preference)': {
                transitionProperty: 'transform',
                transitionDuration: '100ms',
                transitionTimingFunction: '$easings$out',
              },
            },
          }}
        >
          <Flex justifyContent="center">
            <Text
              as="h1"
              size="xxlarge"
              weight="bold"
              css={{
                textAlign: 'left',
                color: 'black',
                paddingTop: '40px',
                paddingBottom: '20px',
                margin: '10px',
              }}
            >
              {translate('title')}
            </Text>
          </Flex>
          {favourites ? (
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                350: 2,
                750: 3,
                900: detailOpen ? 3 : 4,
              }}
            >
              <Masonry>
                {favourites.map((artefact, index) => (
                  <Box
                    key={artefact.id}
                    css={{
                      padding: '10px',
                      width: '100%',
                      position: 'relative',
                      '@bp2': {
                        padding: '20px',
                      },
                    }}
                  >
                    <UnstyledButton
                      onClick={() => handleOverlayOpen(artefact.id as string)}
                    >
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
                          width={300}
                          height={
                            (300 / artefact.images[0].width) *
                            artefact.images[0].height
                          }
                          loader={saveSizeImage(artefact.images[0])}
                        />
                      </Box>
                      <Text
                        as="p"
                        size="large"
                        weight="bold"
                        css={{
                          textAlign: 'left',
                          color: 'black',
                          paddingBottom: '10px',
                          fontSize: '1rem',
                        }}
                      >
                        {artefact.title}
                      </Text>
                    </UnstyledButton>
                    <Box
                      css={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        '@bp1': {
                          top: '20px',
                          right: '20px',
                        },
                      }}
                    >
                      <FavoriteButton
                        aria-label={translate('addToFavourites')}
                        isFavorite={true}
                        onClick={() => {
                          if (favourites.some(fav => fav.id === artefact.id)) {
                            deleteFromFavorite({
                              variables: { id: artefact.id },
                              update: cache => {
                                cache.modify({
                                  fields: {
                                    myFavourites(existingFavourites = []) {
                                      const cachedId = cache.identify({
                                        id: artefact.id,
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
                                deletedRef.current = { artefact, index };
                                setToast(true);
                              },
                            });
                          }
                        }}
                      >
                        <HeartIcon
                          aria-hidden="true"
                          width="18px"
                          height="19.286px"
                        />
                      </FavoriteButton>
                    </Box>
                  </Box>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          ) : null}
          <Overlay
            modal={false}
            open={detailOpen}
            onOpenChange={isOpen => setDetailOpen(isOpen)}
          >
            <OverlayContent
              minimize={minimizeDetail}
              onInteractOutside={event => event.preventDefault()}
            >
              <Box>
                <Box mt="5">
                  <Detail
                    minimizeDetail={minimizeDetail}
                    setMinimizeDetail={setMinimizeDetail}
                    artefactId={selectedArtefact}
                    setSelectedArtefact={setSelectedArtefact}
                  />
                </Box>
              </Box>
            </OverlayContent>
          </Overlay>
          <Toast open={toast} onOpenChange={setToast}>
            <Flex justifyContent="space-between">
              <ToastDescription>
                <Flex gap="2" css={{ mt: '$3' }}>
                  <Flex
                    css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}
                  >
                    <CheckIcon aria-hidden="true" />
                  </Flex>
                  {translate('deleted')}
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
              <Button
                variant="ghost"
                css={{
                  color: 'white',
                }}
                onClick={() => {
                  setToast(false);
                  if (!deletedRef.current) return;
                  addToFavorite({
                    variables: {
                      create: { id: deletedRef.current.artefact.id },
                    },
                    update: cache => {
                      cache.modify({
                        fields: {
                          myFavourites(existingFavourites = []) {
                            if (!deletedRef.current) return existingFavourites;
                            const newFavoriteRef = cache.writeFragment({
                              data: deletedRef.current.artefact,
                              fragment: ArtefactFragmentDoc,
                            });
                            const newFavorites = [...existingFavourites];
                            newFavorites.splice(
                              deletedRef.current.index,
                              0,
                              newFavoriteRef
                            );
                            return newFavorites;
                          },
                        },
                      });
                    },
                  });
                }}
              >
                <Flex css={{ display: 'inline-flex', mr: '$1' }}>
                  <ArrowCircleIcon
                    aria-hidden="true"
                    width="14px"
                    height="14px"
                  />
                </Flex>
                <Text size="xsmall">{translate('revert')}</Text>
              </Button>
            </Flex>
          </Toast>
        </Box>
      )}
    </>
  );
}

const UnstyledButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  '&:focus-visible': {
    outline: '3px solid $green',
  },
});
const ButtonLink = styled(Link, {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  backgroundColor: '$blue',
  borderRadius: '4px',
  px: '28px',
  py: '18px',

  '&:hover': {
    backgroundColor: '$blueDark',
    color: 'white',
  },

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
