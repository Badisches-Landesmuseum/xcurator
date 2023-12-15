import { Box, Flex, styled } from 'src/@3pc/layout-components-react';
import { Rating, Star } from '@smastrom/react-rating';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'src/components/Common/Button';
import { Line } from 'src/components/Common/Line';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import { useAuth } from 'src/components/Context/AuthContext';
import {
  StoryFragment,
  useRateStoryMutation,
  useReportStoryMutation,
  namedOperations,
} from 'src/graphql/_generated/types';
import { CheckIcon, CloseIcon, CrossIcon, KiIcon, ShareIcon } from 'src/icons';
import { saveSizeImage } from 'src/utils/formatImage';
import Image from 'next/image';
import { Text } from 'src/components/Common/Text';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from 'src/components/Common/Dialog';

export const Feedback = ({
  story,
  id,
}: {
  story: StoryFragment;
  id: string;
}) => {
  const [rateStory] = useRateStoryMutation();
  const translate = useTranslations('Presentation');
  const { isLoggedIn, userId } = useAuth();
  const [showClipboardToast, setShowClipboardToast] = useState(false);
  const [reportStory] = useReportStoryMutation();
  const [dialogReportOpen, setDialogReportOpen] = useState(false);
  const [reportedToast, setReportedToast] = useState(false);
  const [reportedToastError, setReportedToastError] = useState(false);

  if (!story.modules) return;

  return (
    <>
      <Box
        css={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box
          css={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: '$blue900',
          }}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            css={{
              position: 'sticky',
              height: '100%',
              width: '100%',
            }}
          >
            <Box
              css={{
                position: 'relative',
                height: '100%',
                width: '100%',
                '> img': {
                  objectFit: 'cover',
                },
              }}
            >
              <Image
                src={story.modules[0].artefacts[0].images[0].url}
                alt={story.modules[0].artefacts[0].title}
                loader={saveSizeImage(story.modules[0].artefacts[0].images[0])}
                fill
              />
            </Box>
          </Flex>
          <Box
            css={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              backgroundColor: '$blue900',
              opacity: 0.7,
            }}
          />
          <Flex
            justifyContent="center"
            alignItems="flex-start"
            flexDirection="column"
            gap="8"
            css={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: '0 auto',
              width: '100%',
              zIndex: 1,
              px: '$4',
              height: '100%',
              '@bp2': {
                width: '700px',
              },
            }}
          >
            {story.author.sub !== userId ? (
              <>
                <Text
                  as="h1"
                  weight="bold"
                  italic
                  css={{
                    fontSize: '40px',
                    lineHeight: '44px',
                  }}
                >
                  {translate('likedTheStory')}
                </Text>
                {isLoggedIn ? (
                  <Rating
                    id={id}
                    value={story.myRating || 0}
                    style={{ maxWidth: 300 }}
                    onChange={(selectedValue: number) => {
                      rateStory({
                        variables: {
                          id: id,
                          rating: selectedValue as number,
                        },
                        update(cache) {
                          cache.modify({
                            id: cache.identify(story),
                            fields: {
                              myRating() {
                                return selectedValue;
                              },
                            },
                          });
                        },
                        refetchQueries: [namedOperations.Query.Story],
                      });
                    }}
                    itemStyles={{
                      itemShapes: Star,
                      activeFillColor: '#FFF',
                      inactiveFillColor: 'transparent',
                      itemStrokeWidth: 2,
                      inactiveStrokeColor: '#FFF',
                      activeStrokeColor: '#FFF',
                    }}
                  />
                ) : (
                  <Dialog
                    open={dialogReportOpen}
                    onOpenChange={setDialogReportOpen}
                  >
                    <DialogTrigger asChild>
                      <Rating
                        id=""
                        value={0}
                        style={{ maxWidth: 300 }}
                        itemStyles={{
                          itemShapes: Star,
                          activeFillColor: '#FFF',
                          inactiveFillColor: 'transparent',
                          itemStrokeWidth: 2,
                          inactiveStrokeColor: '#FFF',
                          activeStrokeColor: '#FFF',
                        }}
                        onChange={() => {
                          setDialogReportOpen(true);
                        }}
                      />
                    </DialogTrigger>
                    <LoginDialogContent />
                  </Dialog>
                )}
              </>
            ) : (
              <Text
                as="h1"
                weight="bold"
                italic
                css={{
                  fontSize: '40px',
                  lineHeight: '44px',
                }}
              >
                {translate('shareYourStory')}
              </Text>
            )}
            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    url: window.location.href,
                    title: story.title,
                  });
                } else {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      setShowClipboardToast(true);
                    })
                    .catch(error => {
                      console.error('Error writing to clipboard:', error);
                    });
                }
              }}
            >
              <Flex alignItems="center" gap="2">
                <ShareIcon aria-hidden="true" width="19px" height="19px" />
                <Text>{translate('share')}</Text>
              </Flex>
            </Button>
            <Flex gap="1">
              <Text css={{ verticalAlign: 'center' }}>
                {translate('createdWithAi')}
                <StyledSpan>
                  <KiIcon />
                </StyledSpan>
                .
              </Text>
            </Flex>
            <Line width="100%" color="white" />
            <Text as="h3" size="large" weight="regular">
              {translate('createStoryTitle')}
            </Text>
            <Flex gap="8" css={{ paddingTop: '20px' }}>
              <Flex justifyContent="space-between" alignItems="center" gap="8">
                {isLoggedIn ? (
                  <Link href="/canvas">
                    <Box
                      css={{
                        fontSize: '18px',
                        fontWeight: 400,
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: '2px solid #FFF',

                        '&:focus-visible': {
                          outline: '3px solid $green',
                        },
                      }}
                    >
                      <Text>{translate('createStory')}</Text>
                    </Box>
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <ReportButton>
                        <Text>{translate('createStory')}</Text>
                      </ReportButton>
                    </DialogTrigger>
                    <LoginDialogContent />
                  </Dialog>
                )}
                {story.author.sub !== userId && isLoggedIn ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <ReportButton>
                        <Text>{translate('reportStory')}</Text>
                      </ReportButton>
                    </DialogTrigger>
                    <DialogContent small>
                      <Box p="4">
                        <DialogClose asChild>
                          <Flex justifyContent="flex-end">
                            <Button
                              aria-label={translate('close')}
                              variant="ghost-dark"
                              css={{
                                '&:hover': {
                                  backgroundColor: '$blue900',
                                  borderColor: 'transparent',
                                },
                              }}
                            >
                              <CloseIcon
                                height="27px"
                                width="27px"
                                color="white"
                              />
                            </Button>
                          </Flex>
                        </DialogClose>
                        <Flex
                          alignItems="center"
                          flexDirection="column"
                          gap="10"
                          css={{ textAlign: 'center', paddingTop: '$6' }}
                        >
                          <Text as="h3" size="xxlarge" weight="bold">
                            {translate('reportStory')}
                          </Text>
                          <Text size="normal">
                            {translate('reportStoryText')}
                          </Text>
                          <DialogClose asChild>
                            <Flex
                              gap="5"
                              css={{ paddingBottom: '$6', paddingTop: '$5' }}
                            >
                              <Button variant="ghost-blue">
                                <Text>{translate('abort')}</Text>
                              </Button>
                              <Button
                                onClick={() => {
                                  reportStory({
                                    variables: {
                                      create: {
                                        storyId: story.id,
                                      },
                                    },
                                    onCompleted: () => {
                                      setReportedToast(true);
                                    },
                                    onError: () => {
                                      setReportedToastError(true);
                                    },
                                  });
                                }}
                              >
                                <Text>{translate('reportStory')}</Text>
                              </Button>
                            </Flex>
                          </DialogClose>
                        </Flex>
                      </Box>
                    </DialogContent>
                  </Dialog>
                ) : !isLoggedIn ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <ReportButton>
                        <Text>{translate('reportStory')}</Text>
                      </ReportButton>
                    </DialogTrigger>
                    <LoginDialogContent />
                  </Dialog>
                ) : null}
              </Flex>
            </Flex>
          </Flex>
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
          <Toast open={reportedToast} onOpenChange={setReportedToast}>
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
                  {translate('storyWasReported')}
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
          <Toast open={reportedToastError} onOpenChange={setReportedToastError}>
            <Flex justifyContent="space-between">
              <ToastDescription>
                <Flex css={{ mt: '$3' }}>
                  {translate('errorPleaseTryLater')}
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
      </Box>
    </>
  );
};

const StyledSpan = styled('span', {
  pl: '5px',
});

const LoginDialogContent = () => {
  const { authenticate } = useAuth();
  const translate = useTranslations('Presentation');

  return (
    <DialogContent small>
      <Box p="4">
        <DialogClose asChild>
          <Flex justifyContent="flex-end">
            <Button
              aria-label={translate('close')}
              variant="ghost-dark"
              css={{
                '&:hover': {
                  backgroundColor: '$blue900',
                  borderColor: 'transparent',
                },
              }}
            >
              <CloseIcon height="30px" width="30px" color="white" />
            </Button>
          </Flex>
        </DialogClose>
        <Flex
          alignItems="center"
          flexDirection="column"
          gap="10"
          css={{ textAlign: 'center', paddingTop: '$6' }}
        >
          <Text as="h3" size="xxlarge" weight="bold">
            {translate('notLoggedIn')}
          </Text>
          <Text size="normal">{translate('pleaseLogin')}</Text>
          <DialogClose asChild>
            <Flex gap="5" css={{ paddingBottom: '$6', paddingTop: '$5' }}>
              <Button variant="ghost-blue">
                <Text>{translate('abort')}</Text>
              </Button>
              <Button
                onClick={() => {
                  authenticate();
                }}
              >
                <Text>{translate('login')}</Text>
              </Button>
            </Flex>
          </DialogClose>
        </Flex>
      </Box>
    </DialogContent>
  );
};

const ReportButton = styled('button', {
  all: 'unset',
  fontSize: '18px',
  fontWeight: 400,
  padding: '8px 16px',
  borderRadius: '6px',
  border: '2px solid #FFF',
  '&:hover': {
    cursor: 'pointer',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});
