import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, styled } from 'src/@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import {
  CC0Icon,
  CCBYIcon,
  CCBYNCIcon,
  CCBYNCNDIcon,
  CCBYNCSAIcon,
  CCBYNDIcon,
  CCBYSAIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronIcon,
  CloseIcon,
  CrossIcon,
  IsPublicIcon,
  LicenseIcon,
  NotPublicIcon,
  PreviewIcon,
  ShareIcon,
  ThreeDotsIcon,
} from 'src/icons';
import Link from 'next/link';
import {
  LicenceType,
  usePublishStoryMutation,
  useStoryQuery,
  useUnpublishStoryMutation,
  useUpdateStoryMutation,
} from 'src/graphql/_generated/types';
import { Button } from 'src/components/Common/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from 'src/components/Common/Dialog';
import { RadioGroup, RadioGroupItem } from 'src/components/Common/RadioGroup';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { HEADER_HEIGHT } from './Header';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownButton,
  DropdownLink,
  DropdownTrigger,
} from 'src/components/Common/Dropdown';
import { localeToLanguage } from 'src/utils/useLanguage';
import { useAuth } from '../Context/AuthContext';
import { Toast, ToastAction, ToastDescription } from '../Common/Toast';
import useMatchMedia from 'src/utils/useMatchMedia';

export const EditHeader = () => {
  const router = useRouter();
  const language = localeToLanguage(router.locale || '');
  const { id } = router.query;
  const translate = useTranslations('EditStory');
  const [isPrivacyOpen, setPrivacyOpen] = React.useState(false);
  const [publishStory] = usePublishStoryMutation();
  const [unpublishStory] = useUnpublishStoryMutation();
  const [updateStory] = useUpdateStoryMutation();
  const { isLoggedIn, userId } = useAuth();
  const [showClipboardToast, setShowClipboardToast] = React.useState(false);
  const { data } = useStoryQuery({
    variables: { where: { id: id as string, language: language } },
  });
  const [licence, setLicence] = React.useState<LicenceType | undefined>();
  const [dialogForPublic, setDialogForPublic] = React.useState(false);
  const matching = useMatchMedia('(max-width: 1200px)');

  return (
    <Box
      id="edit_header"
      px={{
        '@initial': 4,
        '@bp2': 10,
      }}
      css={{
        position: 'sticky',
        zIndex: 2,
        top: 0,
        left: 0,
        width: '100%',
        height: HEADER_HEIGHT,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '$blue',
        color: '$white',
      }}
    >
      <Link href="/stories" aria-label={translate('backToStories')}>
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
          margin: '0 auto',
          textAlign: 'center',
          userSelect: 'none',

          '@bp2': {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <Text size={{ '@initial': 'normal', '@bp1': 'xlarge' }} weight="bold">
          {translate('editStory')}
        </Text>
      </Box>
      {isLoggedIn && data?.story?.author.sub === userId && (
        <Flex alignItems="center" gap="3">
          <Dialog open={dialogForPublic} onOpenChange={setDialogForPublic}>
            <DialogTrigger asChild />
            <DialogContent small>
              <Box p="8">
                <Flex justifyContent="flex-end">
                  <DialogClose asChild>
                    <UnstyledButton>
                      <CloseIcon width="30px" height="30px" />
                    </UnstyledButton>
                  </DialogClose>
                </Flex>
                <Box mb="5" mt="10" css={{ textAlign: 'center' }}>
                  <Text size="large">{translate('addObjectFirst')}</Text>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
          <Dropdown
            open={isPrivacyOpen}
            onOpenChange={open => setPrivacyOpen(open)}
          >
            <DropdownTrigger asChild>
              <EditHeaderMenuButton>
                <Flex
                  alignItems="center"
                  css={{ display: 'inline-flex', mr: '$1' }}
                >
                  {data?.story?.isPublished ? (
                    <IsPublicIcon
                      aria-hidden="true"
                      width="16px"
                      height="16px"
                      color="#339A03"
                    />
                  ) : (
                    <NotPublicIcon
                      aria-hidden="true"
                      width="16px"
                      height="16px"
                      color="#FFBDBD"
                    />
                  )}
                </Flex>
                <Text>
                  {data?.story?.isPublished
                    ? translate('Public')
                    : translate('Private')}
                </Text>
                <Flex
                  css={{
                    display: 'inline-flex',
                    ml: '$2',
                    transform: isPrivacyOpen ? 'rotate(180deg)' : undefined,
                  }}
                >
                  <ChevronDownIcon aria-hidden="true" color="white" />
                </Flex>
              </EditHeaderMenuButton>
            </DropdownTrigger>

            <DropdownContent align="end" sideOffset={4}>
              <DropdownItem disabled={data?.story?.isPublished}>
                <DropdownButton
                  disabled={data?.story?.isPublished}
                  onClick={() => {
                    if (!data.story?.modules || data.story.modules.length < 1) {
                      setDialogForPublic(true);
                    } else {
                      publishStory({
                        variables: { where: { id: id as string } },
                      });
                    }
                  }}
                >
                  <Box
                    mr="2"
                    css={{
                      display: 'inline-flex',
                    }}
                  >
                    <IsPublicIcon
                      aria-hidden="true"
                      width="16px"
                      height="16px"
                    />
                  </Box>
                  <Text>{translate('Public')}</Text>
                </DropdownButton>
              </DropdownItem>
              <DropdownItem disabled={!data?.story?.isPublished}>
                <DropdownButton
                  disabled={!data?.story?.isPublished}
                  onClick={() =>
                    unpublishStory({
                      variables: { where: { id: id as string } },
                    })
                  }
                >
                  <Box
                    mr="2"
                    css={{
                      display: 'inline-flex',
                    }}
                  >
                    <NotPublicIcon
                      aria-hidden="true"
                      width="16px"
                      height="16px"
                    />
                  </Box>
                  <Text>{translate('Private')}</Text>
                </DropdownButton>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
          <Dialog>
            {matching ? (
              <Dropdown>
                <DropdownTrigger asChild>
                  <ThreeDotsButton>
                    <ThreeDotsIcon fill="white" />
                  </ThreeDotsButton>
                </DropdownTrigger>
                <DropdownContent align="end" sideOffset={4}>
                  <DropdownItem
                    disabled={
                      !data?.story.modules || data.story.modules.length < 1
                    }
                  >
                    <DropdownLink
                      href={`/presentation/${encodeURIComponent(
                        data?.story.title
                      )}/${id}`}
                    >
                      <Box mr="2" css={{ display: 'inline-flex' }}>
                        <PreviewIcon aria-hidden="true" />
                      </Box>
                      <Text>{translate('Preview')}</Text>
                    </DropdownLink>
                  </DropdownItem>
                  <DropdownItem
                    disabled={
                      !data?.story.modules || data.story.modules.length < 1
                    }
                  >
                    <DropdownButton
                      disabled={
                        !data?.story.modules || data.story.modules.length < 1
                      }
                      onClick={() => {
                        const originUrl = window.location.origin;
                        const shareUrl = `${originUrl}/presentation/${
                          data.story!.title
                        }/${data.story!.id}`;
                        if (navigator.share) {
                          navigator.share({
                            url: shareUrl,
                            title: data.story!.title,
                          });
                        } else {
                          navigator.clipboard
                            .writeText(`${shareUrl}`)
                            .then(() => {
                              setShowClipboardToast(true);
                            })
                            .catch(error => {
                              console.error(
                                'Error writing to clipboard:',
                                error
                              );
                            });
                        }
                      }}
                    >
                      <Flex gap="2" alignItems="center">
                        <ShareIcon />
                        <Text>{translate('Share')}</Text>
                      </Flex>
                    </DropdownButton>
                  </DropdownItem>

                  <DropdownItem>
                    <DialogTrigger asChild>
                      <DropdownButton>
                        <Box mr="2" css={{ display: 'inline-flex' }}>
                          <LicenseIcon aria-hidden="true" />
                        </Box>
                        <Text>{translate('License')}</Text>
                      </DropdownButton>
                    </DialogTrigger>
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            ) : (
              <Flex gap="2">
                <Box>
                  <PresentationLink
                    href={`/presentation/${encodeURIComponent(
                      data?.story.title
                    )}/${id}`}
                  >
                    <Box mr="2" css={{ display: 'inline-flex' }}>
                      <PreviewIcon aria-hidden="true" />
                    </Box>
                    <Text>{translate('Preview')}</Text>
                  </PresentationLink>
                </Box>
                <Box>
                  <EditHeaderMenuButton
                    disabled={
                      !data?.story.modules || data.story.modules.length < 1
                    }
                    onClick={() => {
                      const originUrl = window.location.origin;
                      const shareUrl = `${originUrl}/presentation/${encodeURIComponent(
                        data.story!.title
                      )}/${data.story!.id}`;
                      if (navigator.share) {
                        navigator.share({
                          url: shareUrl,
                          title: data.story!.title,
                        });
                      } else {
                        navigator.clipboard
                          .writeText(`${shareUrl}`)
                          .then(() => {
                            setShowClipboardToast(true);
                          })
                          .catch(error => {
                            console.error('Error writing to clipboard:', error);
                          });
                      }
                    }}
                  >
                    <Flex gap="2" alignItems="center">
                      <ShareIcon />
                      <Text>{translate('Share')}</Text>
                    </Flex>
                  </EditHeaderMenuButton>
                </Box>
                <DialogTrigger asChild>
                  <EditHeaderMenuButton>
                    <Box mr="2" css={{ display: 'inline-flex' }}>
                      <LicenseIcon aria-hidden="true" color="white" />
                    </Box>
                    <Text>{translate('License')}</Text>
                  </EditHeaderMenuButton>
                </DialogTrigger>
              </Flex>
            )}
            <DialogContent>
              <Flex justifyContent="flex-end">
                <DialogClose asChild>
                  <Button aria-label={translate('close')} variant="icon">
                    <CrossIcon aria-hidden="true" width="27px" height="27px" />
                  </Button>
                </DialogClose>
              </Flex>
              <Box mt="6">
                <Flex flexDirection="column" alignItems="center">
                  <DialogTitle>{translate('LicenseInformation')}</DialogTitle>
                  <DialogDescription style={{ textAlign: 'center' }}>
                    {translate('LicenseDescription')}
                  </DialogDescription>
                  <RadioGroup
                    defaultValue={data?.story?.licence}
                    value={licence as string}
                    onValueChange={value => setLicence(value as LicenceType)}
                  >
                    <Flex
                      gap="4"
                      flexDirection="column"
                      css={{ width: '100%' }}
                    >
                      <RadioGroupItem id="cc0" value={LicenceType.Cc0}>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          css={{
                            width: '100%',
                          }}
                        >
                          <Box as="label" htmlFor="cc0">
                            <Text>CC0 ({translate('standard')})</Text>
                          </Box>
                          <Link
                            href="https://de.creativecommons.net/was-ist-cc/"
                            target="_blank"
                          >
                            <CC0Icon aria-hidden="true" />
                          </Link>
                        </Flex>
                      </RadioGroupItem>
                      <RadioGroupItem id="CcBy" value={LicenceType.CcBy}>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          css={{
                            width: '100%',
                          }}
                        >
                          <Box as="label" htmlFor="CcBy">
                            <Text>CCBY</Text>
                          </Box>
                          <Link
                            href="https://de.creativecommons.net/was-ist-cc/"
                            target="_blank"
                          >
                            <CCBYIcon aria-hidden="true" />
                          </Link>
                        </Flex>
                      </RadioGroupItem>
                      <RadioGroupItem id="CcBySa" value={LicenceType.CcBySa}>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          css={{
                            width: '100%',
                          }}
                        >
                          <Box as="label" htmlFor="CcBySa">
                            <Text>CCBY SA</Text>
                          </Box>
                          <Link
                            href="https://de.creativecommons.net/was-ist-cc/"
                            target="_blank"
                          >
                            <CCBYSAIcon aria-hidden="true" />
                          </Link>
                        </Flex>
                      </RadioGroupItem>
                      <RadioGroupItem id="CcByNd" value={LicenceType.CcByNd}>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          css={{
                            width: '100%',
                          }}
                        >
                          <Box as="label" htmlFor="CcByNd">
                            <Text>CCBY ND</Text>
                          </Box>
                          <Link
                            href="https://de.creativecommons.net/was-ist-cc/"
                            target="_blank"
                          >
                            <CCBYNDIcon aria-hidden="true" />
                          </Link>
                        </Flex>
                      </RadioGroupItem>
                      <RadioGroupItem id="CcByNc" value={LicenceType.CcByNc}>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          css={{
                            width: '100%',
                          }}
                        >
                          <Box as="label" htmlFor="CcByNc">
                            <Text>CCBY NC</Text>
                          </Box>
                          <Link
                            href="https://de.creativecommons.net/was-ist-cc/"
                            target="_blank"
                          >
                            <CCBYNCIcon aria-hidden="true" />
                          </Link>
                        </Flex>
                      </RadioGroupItem>
                      <RadioGroupItem
                        id="CcByNcSa"
                        value={LicenceType.CcByNcSa}
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          css={{
                            width: '100%',
                          }}
                        >
                          <Box as="label" htmlFor="CcByNcSa">
                            <Text>CC-BY-NC-SA</Text>
                          </Box>
                          <Link
                            href="https://de.creativecommons.net/was-ist-cc/"
                            target="_blank"
                          >
                            <CCBYNCSAIcon aria-hidden="true" />
                          </Link>
                        </Flex>
                      </RadioGroupItem>
                      <RadioGroupItem
                        id="CcByNcNd"
                        value={LicenceType.CcByNcNd}
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          css={{
                            width: '100%',
                          }}
                        >
                          <Box as="label" htmlFor="CcByNcNd">
                            <Text>CC-BY-NC-ND</Text>
                          </Box>
                          <Link
                            href="https://de.creativecommons.net/was-ist-cc/"
                            target="_blank"
                          >
                            <CCBYNCNDIcon aria-hidden="true" />
                          </Link>
                        </Flex>
                      </RadioGroupItem>
                    </Flex>
                  </RadioGroup>
                  <Flex
                    justifyContent="center"
                    gap="4"
                    css={{ marginTop: '$6' }}
                  >
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        css={{
                          padding: '$1 $2',
                        }}
                      >
                        {translate('Cancel')}
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        css={{ padding: '$1 $2' }}
                        onClick={() => {
                          updateStory({
                            variables: {
                              update: {
                                storyID: id as string,
                                licence: licence as LicenceType,
                              },
                            },
                          });
                        }}
                      >
                        {translate('Select')}
                      </Button>
                    </DialogClose>
                  </Flex>
                </Flex>
              </Box>
            </DialogContent>
          </Dialog>
        </Flex>
      )}

      <Toast open={showClipboardToast} onOpenChange={setShowClipboardToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex css={{ mt: '$3' }}>
              <Flex
                css={{
                  display: 'inline-flex',
                  pt: '2px',
                  flexShrink: 0,
                }}
              >
                <CheckIcon />
              </Flex>
              {translate('copiedToClipboard')}
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
  );
};

const ThreeDotsButton = styled('button', {
  all: 'unset',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    backgroundColor: '$blueDark',
  },
  '&:active, &[data-state="open"]': {
    backgroundColor: '$blueDark',
  },
});

const EditHeaderMenuButton = styled('button', {
  all: 'unset',
  height: '35px',
  px: '$3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    backgroundColor: '$blueDark',
  },
  '&:active, &[data-state="open"]': {
    backgroundColor: '$blueDark',
  },
});

const PresentationLink = styled('a', {
  all: 'unset',
  height: '35px',
  px: '$3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    backgroundColor: '$blueDark',
  },
  '&:active, &[data-state="open"]': {
    backgroundColor: '$blueDark',
  },
});

const UnstyledButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',

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
