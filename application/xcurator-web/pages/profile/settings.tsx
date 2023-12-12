import React, { useMemo, useState } from 'react';
import { Flex, Box, styled } from '@3pc/layout-components-react';
import { ArrowDownIcon, CloseIcon, DeleteIcon } from 'src/icons';
import { GetStaticPropsContext } from 'next';
import { Text } from 'src/components/Common/Text';
import {
  Language,
  VisitorRole,
  VisitorTarget,
  VisitorWish,
  useDeleteProfileMutation,
  useMeQuery,
  useUpdateUserProfileMutation,
} from 'src/graphql/_generated/types';
import { useProfile } from 'src/components/Context/ProfileContext';
import Layout from 'src/components/Profile/layout';
import { NextPageWithLayout } from 'pages/_app';
import { Button } from 'src/components/Common/Button';
import { ToastSucess, FailToast } from 'src/components/Profile/Toasts';
import { useTranslations } from 'next-intl';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from 'src/components/Common/Dropdown';
import { Line } from 'src/components/Common/Line';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
} from 'src/components/Common/Dialog';
import { useAuth } from 'src/components/Context/AuthContext';
import Head from 'next/head';

type RoleOptions = {
  labelKey: keyof Messages['Profile'];
  value: string | null;
};

type WishOptions = {
  labelKey: keyof Messages['Profile'];
  value: string | null;
};

type TargetOption = {
  labelKey: keyof Messages['Profile'];
  value: string | null;
};

const role: RoleOptions[] = [
  { labelKey: 'student', value: VisitorRole.Student },
  { labelKey: 'teacher', value: VisitorRole.Teacher },
  { labelKey: 'visitor', value: VisitorRole.Visitor },
  { labelKey: 'researcher', value: VisitorRole.Researcher },
  { labelKey: 'kurator', value: VisitorRole.Curator },
  { labelKey: 'other', value: null },
];
const wish: WishOptions[] = [
  { labelKey: 'learn', value: VisitorWish.Education },
  { labelKey: 'research', value: VisitorWish.Research },
  { labelKey: 'work', value: VisitorWish.Work },
  {
    labelKey: 'entertainment',
    value: VisitorWish.Entertainment,
  },
  { labelKey: 'other', value: null },
];
const targets: TargetOption[] = [
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
];

const Settings: NextPageWithLayout = () => {
  const { data: userData } = useMeQuery();
  const { profile, loading } = useProfile();
  const [addPreferences, { loading: loadingMutation }] =
    useUpdateUserProfileMutation({
      onCompleted: () => {
        setShowSuccessToast(true);
      },
      onError: () => {
        setShowErrorToast(true);
      },
    });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const translate = useTranslations('Profile');
  const [visitorRole, setVisitorRole] = useState(profile?.visitorRole);
  const [visitorTarget, setVisitorTarget] = useState(profile?.visitorTarget);
  const [visitorWish, setVisitorWish] = useState(profile?.visitorWish);
  const [roleOpen, setRoleOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [targetOpen, setTargetOpen] = useState(false);
  const [delteProfile] = useDeleteProfileMutation();
  const { userId, unAuthenticate } = useAuth();
  const disableSaveButton = useMemo(() => {
    return (
      profile?.visitorRole === visitorRole &&
      profile?.visitorTarget === visitorTarget &&
      profile?.visitorWish === visitorWish
    );
  }, [profile, visitorRole, visitorTarget, visitorWish]);

  const roleLabel =
    role.find(role => role.value === visitorRole)?.labelKey || '';
  const wishLabel =
    wish.find(wish => wish.value == visitorWish)?.labelKey || '';
  const targetLabel =
    targets.find(target => target.value === visitorTarget)?.labelKey || '';

  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      <Box
        css={{
          maxWidth: '750px',
          margin: '$10 auto',
          width: '100%',
          paddingLeft: '5%',
          paddingRight: '5%',
          '@bp2': {
            paddingLeft: '0',
            paddingRight: '0',
          },
        }}
      >
        <Flex
          css={{
            fontSize: '16px',
          }}
          justifyContent={{ '@initial': 'flex-start', '@bp2': 'space-between' }}
          flexDirection={{ '@initial': 'column', '@bp2': 'row' }}
          alignItems="flex-start"
          flexWrap={{ '@initial': 'noWrap', '@bp2': 'wrap' }}
          gap={{ '@initial': '4', '@bp2': '64' }}
        >
          <Flex
            justifyContent="flex-start"
            flexDirection="column"
            alignItems="flex-start"
            gap="4"
          >
            <Box>
              <Text
                size={{ '@initial': 'large', '@bp2': 'xxlarge' }}
                weight="bold"
              >
                {translate('name')}
              </Text>
            </Box>
            <Text size="small" css={{ fontWeight: '400' }}>
              {userData?.me?.preferred_username}
            </Text>
            <Box mt="6">
              <Text
                size={{ '@initial': 'large', '@bp2': 'xxlarge' }}
                weight="bold"
              >
                E-Mail
              </Text>
            </Box>
            <Text size="small" css={{ fontWeight: '400' }}>
              {userData?.me?.email}
            </Text>
          </Flex>
          <Box
            mt="6"
            css={{
              width: '250px',
              '@bp2': {
                width: '310px',
              },
            }}
          >
            <Flex
              justifyContent="flex-start"
              flexDirection="column"
              alignItems="flex-start"
              gap="4"
            >
              <Text
                css={{ marginTop: '10px' }}
                size={{ '@initial': 'large', '@bp2': 'xxlarge' }}
                weight="bold"
              >
                {translate('role')}
              </Text>
              <Box css={{ width: '100%' }}>
                <Dropdown
                  open={roleOpen}
                  onOpenChange={() => setRoleOpen(!roleOpen)}
                >
                  <DropdownTrigger asChild>
                    <DropdownButton css={{ px: 0 }}>
                      <Box
                        css={{
                          width: '100%',
                          svg: {
                            transform: roleOpen
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                          },
                        }}
                      >
                        <Flex justifyContent="space-between">
                          <Text color="blueDark">
                            {translate(roleLabel as keyof Messages['Profile'])}
                          </Text>
                          <Box css={{ color: '$blue' }}>
                            <ArrowDownIcon aria-hidden="true" />
                          </Box>
                        </Flex>
                        <Box
                          mt="1"
                          css={{
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'black',
                          }}
                        />
                      </Box>
                    </DropdownButton>
                  </DropdownTrigger>
                  <DropdownContent
                    css={{ minWidth: '200px', pr: '5px' }}
                    align="start"
                  >
                    {role.map(role => (
                      <DropdownItem
                        key={role.labelKey}
                        onClick={() => {
                          setVisitorRole(role.value as VisitorRole);
                          setRoleOpen(false);
                        }}
                      >
                        <Option
                          css={{
                            color:
                              visitorRole === role.value ? '$blue' : '$text',
                            textDecoration:
                              visitorRole === role.value ? 'underline' : 'none',
                          }}
                        >
                          {translate(role.labelKey)}
                        </Option>
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              </Box>
              <Text
                css={{ marginTop: '10px' }}
                size={{ '@initial': 'large', '@bp2': 'xxlarge' }}
                weight="bold"
              >
                {translate('wish')}
              </Text>
              <Dropdown
                open={wishOpen}
                onOpenChange={() => setWishOpen(!wishOpen)}
              >
                <DropdownTrigger asChild>
                  <DropdownButton css={{ px: 0 }}>
                    <Box
                      css={{
                        width: '100%',
                        svg: {
                          transform: wishOpen
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        },
                      }}
                    >
                      <Flex justifyContent="space-between">
                        <Text color="blueDark">
                          {translate(wishLabel as keyof Messages['Profile'])}
                        </Text>
                        <Box css={{ display: 'inline-flex', color: '$blue' }}>
                          <ArrowDownIcon aria-hidden="true" />
                        </Box>
                      </Flex>
                      <Box
                        mt="1"
                        css={{
                          width: '100%',
                          height: '1px',
                          backgroundColor: 'black',
                        }}
                      />
                    </Box>
                  </DropdownButton>
                </DropdownTrigger>
                <DropdownContent
                  css={{ minWidth: '200px', pr: '5px' }}
                  align="start"
                >
                  {wish.map(wish => (
                    <DropdownItem
                      key={wish.labelKey}
                      onClick={() => {
                        setVisitorWish(wish.value as VisitorWish);
                        setWishOpen(false);
                      }}
                    >
                      <Option
                        css={{
                          color: visitorWish === wish.value ? '$blue' : '$text',
                          textDecoration:
                            visitorWish === wish.value ? 'underline' : 'none',
                        }}
                      >
                        {translate(wish.labelKey)}
                      </Option>
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
              <Text
                css={{ marginTop: '10px' }}
                size={{ '@initial': 'large', '@bp2': 'xxlarge' }}
                weight="bold"
              >
                {translate('target')}
              </Text>
              <Dropdown
                open={targetOpen}
                onOpenChange={() => setTargetOpen(!targetOpen)}
              >
                <DropdownTrigger asChild>
                  <DropdownButton css={{ px: 0 }}>
                    <Box
                      css={{
                        width: '100%',
                        svg: {
                          transform: targetOpen
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        },
                      }}
                    >
                      <Flex justifyContent="space-between">
                        <Text css={{ paddingRight: '10px' }} color="blueDark">
                          {translate(targetLabel as keyof Messages['Profile'])}
                        </Text>
                        <Box css={{ display: 'inline-flex', color: '$blue' }}>
                          <ArrowDownIcon aria-hidden="true" />
                        </Box>
                      </Flex>
                      <Box
                        mt="1"
                        css={{
                          width: '100%',
                          height: '1px',
                          backgroundColor: 'black',
                        }}
                      />
                    </Box>
                  </DropdownButton>
                </DropdownTrigger>
                <DropdownContent
                  css={{ minWidth: '200px', pr: '5px' }}
                  align="start"
                >
                  {targets.map(targets => (
                    <DropdownItem
                      key={targets.labelKey}
                      onClick={() => {
                        setVisitorTarget(targets.value as VisitorTarget);
                        setTargetOpen(false);
                      }}
                    >
                      <Option
                        css={{
                          color:
                            visitorTarget === targets.value ? '$blue' : '$text',
                          textDecoration:
                            visitorTarget === targets.value
                              ? 'underline'
                              : 'none',
                        }}
                      >
                        {translate(targets.labelKey)}
                      </Option>
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </Flex>
          </Box>
        </Flex>
        <Flex justifyContent="flex-end">
          <Box
            css={{
              marginTop: '$20',
              marginBottom: '2rem',
            }}
          >
            <Flex justifyContent="center">
              <Button
                variant="default"
                disabled={disableSaveButton || loading || loadingMutation}
                onClick={() => {
                  addPreferences({
                    variables: {
                      username: userData?.me?.preferred_username,
                      preferredLanguage: Language.De,
                      continents: profile?.continents,
                      epochs: profile?.epochs,
                      visitorWish: visitorWish,
                      visitorRole: visitorRole,
                      visitorTarget: visitorTarget,
                    },
                    update: cache => {
                      cache.modify({
                        fields: {
                          profile(existingProfile) {
                            return {
                              ...existingProfile,
                              visitorWish: visitorWish,
                              visitorRole: visitorRole,
                              visitorTarget: visitorTarget,
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
            </Flex>
            <ToastSucess
              open={showSuccessToast}
              setOpen={setShowSuccessToast}
            />
            <FailToast open={showErrorToast} setOpen={setShowErrorToast} />
          </Box>
        </Flex>
        <Box>
          <Flex
            css={{ width: '100%' }}
            flexDirection="column"
            gap="4"
            justifyContent="center"
          >
            <Line width="100%" color="blueDark" />
            <Box>
              <Box mb="4" css={{ fontSize: '20px' }}>
                <Text weight="bold">Profil Löschen</Text>
              </Box>
              <Box>
                <Text>{translate('deleteAccountInfo')}</Text>
              </Box>
            </Box>
            <Flex
              justifyContent="flex-end"
              css={{
                marginTop: '$5',
                marginBottom: '2rem',
              }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">
                    <Flex alignItems="center" gap="1">
                      <DeleteIcon aria-hidden="true" />
                      <Text>{translate('deleteAccount')}</Text>
                    </Flex>
                  </Button>
                </DialogTrigger>
                <DialogContent small>
                  <Box p="8" css={{ textAlign: 'center' }}>
                    <Box>
                      <Flex justifyContent="flex-end">
                        <DialogClose asChild>
                          <Button
                            aria-label={translate('close')}
                            variant="ghost"
                          >
                            <CloseIcon
                              aria-hidden="true"
                              color="black"
                              width="30px"
                              height="30px"
                            />
                          </Button>
                        </DialogClose>
                      </Flex>
                    </Box>
                    <Box p="5">
                      <Box mb="6" css={{ fontSize: '20px' }}>
                        <Text weight="bold" size="large">
                          {translate('deleteAccountText')}
                        </Text>
                      </Box>
                      <Box
                        css={{
                          marginBottom: '12px',
                          marginTop: '12px',
                        }}
                      >
                        <Text size="small">
                          {translate('deleteWarningText')}
                        </Text>
                      </Box>
                    </Box>
                    <Flex justifyContent="center" alignItems="center" gap="4">
                      <DialogClose asChild>
                        <Button variant="ghost">
                          <Text weight="bold">{translate('abort')}</Text>
                        </Button>
                      </DialogClose>
                      <Button
                        onClick={() => {
                          delteProfile({
                            variables: { sub: userId },
                            onCompleted: () => {
                              unAuthenticate();
                            },
                          });
                        }}
                      >
                        <Text weight="bold">{translate('delete')}</Text>
                      </Button>
                    </Flex>
                  </Box>
                </DialogContent>
              </Dialog>
              <Flex justifyContent="center"></Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

const Option = styled('div', {
  fontWeight: '400',
  fontSize: '16px',
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '8px',
  transitionProperty: 'color',
  transitionDuration: '250ms',
  transitionTimingFunction: '$easings$out',
  transition: 'background-color 0.3s',
  '&:active': {
    backgroundColor: '$blue100',
    color: '$blue',
  },
  '@bp2': {
    fontSize: '24px',
  },
});

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

export default Settings;
