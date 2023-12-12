import React, { useState, useMemo, useLayoutEffect } from 'react';
import { Box, Flex } from '@3pc/layout-components-react';
import { ButtonTag } from 'src/components/Common/ButtonTag';
import { Text } from 'src/components/Common/Text';
import { Button } from 'src/components/Common/Button';
import { GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import {
  Continent,
  Language,
  ProfileEpoch,
  useUpdateUserProfileMutation,
} from 'src/graphql/_generated/types';
import { useProfile } from 'src/components/Context/ProfileContext';
import { ToastSucess, FailToast } from 'src/components/Profile/Toasts';
import Layout from 'src/components/Profile/layout';
import { NextPageWithLayout } from 'pages/_app';
import { Step } from 'pages/onboarding';
import { useAuth } from 'src/components/Context/AuthContext';
import Head from 'next/head';

const steps: Step[] = [
  {
    titleKey: 'favoritePlaces',
    subTitleKey: 'pickPlaces',
    options: [
      {
        labelKey: 'asia',
        value: Continent.Asia,
        image: '/images/Onboarding_Ort_Asien.svg',
      },
      {
        labelKey: 'europe',
        value: Continent.Europa,
        image: '/images/Onboarding_Ort_Europa.svg',
      },
      {
        labelKey: 'africa',
        value: Continent.Africa,
        image: '/images/Onboarding_Ort_Afrika.svg',
      },
      {
        labelKey: 'america',
        value: Continent.America,
        image: '/images/Onboarding_Ort_Amerika.svg',
      },
    ],
    preferenceKey: 'continents',
  },
  {
    titleKey: 'favouriteTimes',
    subTitleKey: 'pickTimes',
    options: [
      {
        labelKey: 'current',
        value: ProfileEpoch.ModernAndPresent,
        image: '/images/Onboarding_Zeit_Neuzeit.svg',
      },
      {
        labelKey: 'middleAges',
        value: ProfileEpoch.MiddleAges,
        image: '/images/Onboarding_Zeit_Mittelalter.svg',
      },
      {
        labelKey: 'antike',
        value: ProfileEpoch.Antiquity,
        image: '/images/Onboarding_Zeit_Antike.svg',
      },
      {
        labelKey: 'urzeit',
        value: ProfileEpoch.PreAndEarlyHistory,
        image: '/images/Onboarding_Zeit_Urgeschichte.svg',
      },
    ],
    preferenceKey: 'epochs',
  },
];

export const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
};

function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Page: NextPageWithLayout = () => {
  const { profile, loading } = useProfile();
  const translate = useTranslations('Preferences');
  const screenWidth = useWindowSize();
  const { username } = useAuth();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [addPreferences, { loading: loadingMutation }] =
    useUpdateUserProfileMutation({
      onCompleted: () => {
        setShowSuccessToast(true);
      },
      onError: () => {
        setShowErrorToast(true);
      },
    });
  const [selection, setSelection] = useState<{
    [key: string]: string[];
  }>({
    continents: profile?.continents ?? [],
    epochs: profile?.epochs ?? [],
  });

  const disableSaveButton = useMemo(() => {
    return (
      arraysEqual(profile?.continents ?? [], selection.continents) &&
      arraysEqual(profile?.epochs ?? [], selection.epochs)
    );
  }, [profile, selection]);

  const changeHandler = (preferenceKey: string, value: string) => () => {
    if (preferenceKey === 'continents') {
      if (selection.continents.includes(value)) {
        setSelection({
          ...selection,
          continents: selection.continents.filter(
            continent => continent !== value
          ),
        });
      } else {
        setSelection({
          ...selection,
          continents: [...selection.continents, value],
        });
      }
    }
    if (preferenceKey === 'epochs') {
      if (selection.epochs.includes(value)) {
        setSelection({
          ...selection,
          epochs: selection.epochs.filter(epoch => epoch !== value),
        });
      } else {
        setSelection({
          ...selection,
          epochs: [...selection.epochs, value],
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      <Box css={{ maxWidth: '1800px' }}>
        {screenWidth > 450 &&
          steps.map(step => (
            <Box
              mt="10"
              css={{
                width: '100%',
              }}
              key={step.preferenceKey}
            >
              <Box
                css={{
                  paddingLeft: '9%',
                }}
              >
                <Text as="h2" weight={'bold'} size={'xxlarge'}>
                  {translate(step.titleKey)}
                </Text>
              </Box>
              <Flex
                gap="8"
                flexWrap={{ '@bp1': 'wrap' }}
                flexDirection={{ '@initial': 'column', '@bp1': 'row' }}
                alignItems="center"
                justifyContent="center"
                css={{
                  width: '100%',
                  '@bp1': {
                    marginTop: '$10',
                  },
                }}
              >
                {step.options.map(option => (
                  <Box
                    key={option.value}
                    css={{
                      height: '$32',
                      backgroundImage:
                        'image' in option ? `url(${option.image})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      '@bp1': {
                        height: '240px',
                        minWidth: '40%',
                        maxWidth: '45%',
                      },
                    }}
                  >
                    <Frame
                      frame={
                        (Array.isArray(selection.continents) &&
                          (selection.continents as string[]).includes(
                            option.value as string
                          )) ||
                        (Array.isArray(selection.epochs) &&
                          (selection.epochs as string[]).includes(
                            option.value as string
                          ))
                      }
                    >
                      <Button
                        variant="hero"
                        onClick={changeHandler(
                          step.preferenceKey,
                          option.value as string
                        )}
                      >
                        <Text weight="bold">{translate(option.labelKey)}</Text>
                      </Button>
                    </Frame>
                  </Box>
                ))}
              </Flex>
            </Box>
          ))}

        {screenWidth <= 450 &&
          steps.map(step => (
            <Box px="5" mt="10" key={step.preferenceKey}>
              <Text
                css={{ marginBottom: '20px' }}
                as="h2"
                weight={'bold'}
                size={'large'}
              >
                {translate(step.titleKey)}
              </Text>
              <Flex gap="5" flexDirection="row" flexWrap="wrap">
                {step.options.map(option => (
                  <ButtonTag
                    isActive={
                      (Array.isArray(selection.continents) &&
                        (selection.continents as string[]).includes(
                          option.value as string
                        )) ||
                      (Array.isArray(selection.epochs) &&
                        (selection.epochs as string[]).includes(
                          option.value as string
                        ))
                    }
                    key={option.value}
                    onClick={changeHandler(
                      step.preferenceKey,
                      option.value as string
                    )}
                  >
                    {translate(option.labelKey)}
                  </ButtonTag>
                ))}
              </Flex>
            </Box>
          ))}
        <Flex justifyContent={{ '@initial': 'center', '@bp1': 'flex-end' }}>
          <Box
            css={{
              marginTop: '$20',
              marginBottom: '2rem',
              '@bp1': {
                paddingRight: '9%',
              },
            }}
          >
            <Box
              css={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="hero"
                disabled={disableSaveButton || loading || loadingMutation}
                onClick={() => {
                  addPreferences({
                    variables: {
                      username: username,
                      preferredLanguage:
                        profile?.preferredLanguage ?? Language.De,
                      continents: selection.continents as Continent[],
                      epochs: selection.epochs as ProfileEpoch[],
                    },
                    update: cache => {
                      cache.modify({
                        fields: {
                          profile(existingProfile) {
                            return {
                              ...existingProfile,
                              continents: selection.continents as Continent[],
                              epochs: selection.epochs as ProfileEpoch[],
                            };
                          },
                        },
                      });
                    },
                  });
                }}
              >
                <Text weight="bold">{translate('save')}</Text>
              </Button>
            </Box>
            <ToastSucess
              open={showSuccessToast}
              setOpen={setShowSuccessToast}
            />
            <FailToast open={showErrorToast} setOpen={setShowErrorToast} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

const Frame = ({
  frame,
  children,
}: {
  frame: boolean;
  children: React.ReactNode;
}) => {
  return frame ? (
    <Box
      css={{
        borderRadius: '$2',
        p: '$1',
        border: '1px solid',
        borderColor: '$blue',
      }}
    >
      {children}
    </Box>
  ) : (
    children
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
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

export default Page;
