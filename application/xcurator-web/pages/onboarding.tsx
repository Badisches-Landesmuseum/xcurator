import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { Box, Flex } from 'src/@3pc/layout-components-react';
import { Button } from 'src/components/Common/Button';
import { useTranslations } from 'next-intl';
import { Text } from 'src/components/Common/Text';
import {
  Continent,
  ProfileEpoch,
  VisitorRole,
  VisitorTarget,
  VisitorWish,
  namedOperations,
  useUpdateUserProfileMutation,
} from 'src/graphql/_generated/types';
import { useProfile } from 'src/components/Context/ProfileContext';
import { AlertIcon, CrossIcon } from 'src/icons';
import { useAuth } from 'src/components/Context/AuthContext';
import { localeToLanguage } from 'src/utils/useLanguage';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import Head from 'next/head';
import { useGlobalToasts } from 'src/components/Context/GlobalToastsContext';
import Link from 'next/link';
import { ProgressBar } from 'src/components/Common/ProgressBar';

export type OptionType = {
  labelKey: keyof Messages['Preferences'];
  value: string | null;
  image?: string;
};

export type PreferenceKey =
  | 'visitorRole'
  | 'visitorWish'
  | 'visitorTarget'
  | 'continents'
  | 'epochs';

export type Step = {
  titleKey: keyof Messages['Preferences'];
  subTitleKey: keyof Messages['Preferences'];
  options: OptionType[];
  preferenceKey: PreferenceKey;
};

export type PreferencesType = {
  continents: Continent[];
  epochs: ProfileEpoch[];
  visitorRole: VisitorRole | '';
  visitorWish: VisitorWish | '';
  visitorTarget: VisitorTarget | '';
};

const steps: Step[] = [
  {
    titleKey: 'Iam',
    subTitleKey: 'pickRole',
    options: [
      { labelKey: 'student', value: VisitorRole.Student },
      { labelKey: 'teacher', value: VisitorRole.Teacher },
      { labelKey: 'visitor', value: VisitorRole.Visitor },
      { labelKey: 'researcher', value: VisitorRole.Researcher },
      { labelKey: 'kurator', value: VisitorRole.Curator },
      { labelKey: 'other', value: null },
    ],
    preferenceKey: 'visitorRole',
  },
  {
    titleKey: 'IwishTo',
    subTitleKey: 'pickWish',
    options: [
      { labelKey: 'learn', value: VisitorWish.Education },
      { labelKey: 'research', value: VisitorWish.Research },
      { labelKey: 'work', value: VisitorWish.Work },
      {
        labelKey: 'entertainment',
        value: VisitorWish.Entertainment,
      },
      { labelKey: 'other', value: null },
    ],
    preferenceKey: 'visitorWish',
  },
  {
    titleKey: 'myGoalsAre',
    subTitleKey: 'pickGoals',
    options: [
      {
        labelKey: 'createContent',
        value: VisitorTarget.ContentCreation,
      },
      { labelKey: 'watchContent', value: VisitorTarget.Inspiration },
      {
        labelKey: 'findSomethingSpecific',
        value: VisitorTarget.FindSomething,
      },
      {
        labelKey: 'learnSomethingNew',
        value: VisitorTarget.LearnSomethingNew,
      },
      { labelKey: 'other', value: null },
    ],
    preferenceKey: 'visitorTarget',
  },
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

export default function Preferences({}) {
  const [currentStep, setCurrentStep] = useState(0);
  const { fields, changeHandler } = useFormFields<PreferencesType>(
    {
      continents: [],
      epochs: [],
      visitorRole: '',
      visitorWish: '',
      visitorTarget: '',
    },
    setCurrentStep
  );
  const translate = useTranslations('Preferences');
  const router = useRouter();
  const [updateProfile] = useUpdateUserProfileMutation();
  const { pathBeforeRedirectRef } = useProfile();
  const { username } = useAuth();
  const [errorToast, setErrorToast] = React.useState(false);
  const { setOnboardingSuccess } = useGlobalToasts();

  const locale = router.locale;
  const language = localeToLanguage(locale);

  return (
    <>
      <Head>
        <title>{translate('seoOnboardingTitle')}</title>
        <meta
          name="description"
          content={translate('seoOnboardingDescription')}
        />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      <Box mt="5">
        <Box px="7">
          <Flex justifyContent="flex-end">
            <Link
              aria-label={translate('close')}
              href={pathBeforeRedirectRef.current || '/canvas'}
              onClick={() => {
                pathBeforeRedirectRef.current = undefined;
              }}
            >
              <CrossIcon width="27px" height="27px" />
            </Link>
          </Flex>
        </Box>
        <Box mt="3" pb="5">
          <Flex flexDirection="column" alignItems="center">
            <Text
              css={{ '@bp1': { fontSize: '36px', fontWeight: 700 } }}
              as="h1"
              weight="bold"
              size="xxlarge"
            >
              {translate(steps[currentStep].titleKey)}
            </Text>
            <Box
              mt={{ '@initial': 5, '@bp1': 12 }}
              css={{ width: '106px', '@bp2': { width: '200px' } }}
            >
              <ProgressBar value={currentStep + 1} max={steps.length} />
            </Box>
            <Box mb="5" mt="8">
              <Text>{translate(steps[currentStep].subTitleKey)}</Text>
            </Box>
          </Flex>
          <Flex
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
            {steps[currentStep].options.map(option => {
              const field = fields[steps[currentStep].preferenceKey];
              return (
                option.image && (
                  <Box
                    css={{
                      marginTop: '$3',
                      height: '$32',
                      width: '100%',
                      backgroundImage:
                        'image' in option ? `url(${option.image})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      '@bp1': {
                        margin: '40px 20px 0 20px',
                        height: '240px',
                        width: '45%',
                      },
                    }}
                  >
                    <Frame
                      frame={
                        (Array.isArray(field) &&
                          (field as string[]).includes(option.value!)) ||
                        (field as string) === option.value
                      }
                    >
                      <Button
                        variant="hero"
                        onClick={changeHandler(
                          steps[currentStep].preferenceKey,
                          option.value!
                        )}
                      >
                        <Text weight="bold">{translate(option.labelKey)}</Text>
                      </Button>
                    </Frame>
                  </Box>
                )
              );
            })}
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {steps[currentStep].options.map(option => {
              const field = fields[steps[currentStep].preferenceKey];
              return (
                !option.image && (
                  <Box mt="5" key={option.value}>
                    <Frame
                      frame={
                        (Array.isArray(field) &&
                          (field as string[]).includes(option.value!)) ||
                        (field as string) === option.value
                      }
                    >
                      <Button
                        variant="hero"
                        onClick={changeHandler(
                          steps[currentStep].preferenceKey,
                          option.value!
                        )}
                      >
                        <Text weight="bold">{translate(option.labelKey)}</Text>
                      </Button>
                    </Frame>
                  </Box>
                )
              );
            })}
          </Flex>
          <Flex justifyContent="center">
            <Box
              css={{
                width: '350px',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '50px',
                bottom: '50px',
                '@bp1': {
                  bottom: '100px',
                  marginTop: '50px',
                },
              }}
            >
              <Button
                variant="ghost"
                css={{ color: '$blue' }}
                disabled={currentStep == 0}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                {translate('back')}
              </Button>
              <Button
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    updateProfile({
                      variables: {
                        username: username,
                        continents: fields.continents,
                        preferredLanguage: language,
                        visitorRole: fields.visitorRole
                          ? fields.visitorRole
                          : null,
                        visitorWish: fields.visitorWish
                          ? fields.visitorWish
                          : null,
                        visitorTarget: fields.visitorTarget
                          ? fields.visitorTarget
                          : null,
                        epochs: fields.epochs,
                      },
                      refetchQueries: [namedOperations.Query.Profile],
                      onCompleted() {
                        router.push(pathBeforeRedirectRef.current || '/canvas');
                        pathBeforeRedirectRef.current = undefined;
                        setOnboardingSuccess(true);
                      },
                      onError() {
                        setErrorToast(true);
                      },
                    });
                  } else {
                    setCurrentStep(previousStep => previousStep + 1);
                  }
                }}
              >
                {translate('next')}
              </Button>
            </Box>
          </Flex>
        </Box>
        <Toast open={errorToast} onOpenChange={setErrorToast}>
          <Flex justifyContent="space-between">
            <ToastDescription>
              <Flex gap="2" css={{ mt: '$3' }}>
                <Flex
                  css={{ display: 'inline-flex', pt: '2px', flexShrink: 0 }}
                >
                  <AlertIcon />
                </Flex>
                <Box>{translate('error')}</Box>
              </Flex>
            </ToastDescription>
            <Box css={{ pt: '6px', flexShrink: 0 }}>
              <ToastAction asChild altText="Close">
                <Button variant="ghost-blue">
                  <Flex css={{ display: 'inline-flex' }}>
                    <CrossIcon />
                  </Flex>
                </Button>
              </ToastAction>
            </Box>
          </Flex>
        </Toast>
      </Box>
    </>
  );
}

function useFormFields<T extends { [key: string]: string | string[] }>(
  initialValues: T,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
) {
  const [fields, setFields] = useState<T>(initialValues);

  const changeHandler = useCallback(
    (key: keyof T, value: string) => () => {
      setFields(previous => {
        if (Array.isArray(previous[key])) {
          if (previous[key].includes(value))
            return {
              ...previous,
              [key]: (previous[key] as string[]).filter(v => v !== value),
            };
          else {
            return {
              ...previous,
              [key]: [...(previous[key] as string[]), value],
            };
          }
        } else {
          setCurrentStep(step => step + 1);
          return {
            ...previous,
            [key]: value,
          };
        }
      });
    },
    [setCurrentStep]
  );

  return {
    fields,
    changeHandler,
  };
}

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
        border: '4px solid',
        borderColor: 'white',
        outline: '2px solid $blue',
      }}
    >
      {children}
    </Box>
  ) : (
    children
  );
};

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      locale: locale,
    },
  };
}
