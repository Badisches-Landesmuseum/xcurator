import { Box, Flex, Stack, styled } from 'src/@3pc/layout-components-react';
import { Orbit } from '@uiball/loaders';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { EntityProps } from 'src/components/Canvas/Entity';
import { Button } from 'src/components/Common/Button';
import { Line } from 'src/components/Common/Line';
import { useAuth } from 'src/components/Context/AuthContext';
import {
  useEntitiesDetailQuery,
  useVerifyEntityMutation,
} from 'src/graphql/_generated/types';
import {
  ArrowUpRightIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  CloseIcon,
  CrossIcon,
  QuestionMarkIcon,
} from 'src/icons';
import { Text } from 'src/components/Common/Text';
import Image from 'next/image';
import { Dialog, DialogContent } from 'src/components/Common/Dialog';
import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { Toast, ToastAction, ToastDescription } from '../Common/Toast';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/Common/Popover';

export const Entity = ({
  language,
  wikipediaId,
  wikipediaUrl,
  wikiDataId,
  wikiDataUrl,
  gndUrl,
  artefactID,
  startPosition,
  endPosition,
  property,
}: EntityProps) => {
  const {
    data: details,
    loading,
    error,
  } = useEntitiesDetailQuery({
    variables: {
      where: {
        language: language,
        wikidataId: wikiDataId,
        wikipediaId: wikipediaId,
      },
    },
  });

  const translate = useTranslations('Canvas');
  const [verifyEntity] = useVerifyEntityMutation();
  const { isLoggedIn, authenticate } = useAuth();
  const [failToast, setFailToast] = useState(false);
  const [sucessToast, setSucessToast] = useState(false);

  if (loading)
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        css={{ width: '100%', height: '100%' }}
      >
        <Orbit aria-label={translate('loading')} color="#002fff" />
      </Flex>
    );

  if (error) return <Text>Error {error.message}</Text>;

  return (
    <Flex
      flexDirection={{ '@initial': 'column', '@bp2': 'row' }}
      css={{
        width: '100%',
        height: '100%',
        gap: '30px',
        overflow: 'auto',
      }}
    >
      {details?.entitiesDetail.image && (
        <Box
          css={{
            position: 'relative',
            width: '100%',
            height: '250px',
            minWidth: '250px',
            '> img': {
              objectFit: 'contain',
            },
          }}
        >
          <Image
            src={details?.entitiesDetail.image}
            alt={details?.entitiesDetail.title}
            sizes="(min-width: 768px) 250px 90vw"
            fill={true}
          />
        </Box>
      )}
      <Flex flexDirection="column" gap="6">
        <Text
          as="h1"
          css={{ width: '100%', fontSize: '26px', fontWeight: '700' }}
        >
          {details?.entitiesDetail.title}
        </Text>

        <Text as="p" css={{ width: '100%' }}>
          {details?.entitiesDetail.description}
        </Text>
        <Text css={{ width: '100%' }}>
          {translate('sources')}: {wikipediaUrl ? 'Wikipedia' : null},{' '}
          {wikiDataUrl ? 'Wikidata' : null}, {gndUrl ? 'GND' : null}
        </Text>
        <Stack space="5">
          {wikipediaUrl ? (
            <StyledEntityLink href={wikipediaUrl} target="_blank">
              {translate('toArticle')} (Wikipedia)
              <ArrowUpRightIcon
                aria-hidden="true"
                fill="white"
                width="11px"
                height="14px"
              />
            </StyledEntityLink>
          ) : null}
          {wikiDataUrl ? (
            <StyledEntityLink href={wikiDataUrl} target="_blank">
              {translate('toArticle')} (Wikidata)
              <ArrowUpRightIcon
                aria-hidden="true"
                fill="white"
                width="11px"
                height="14px"
              />
            </StyledEntityLink>
          ) : null}
          {gndUrl && (
            <StyledEntityLink href={gndUrl} target="_blank">
              {translate('toArticle')}(GND)
              <ArrowUpRightIcon
                aria-hidden="true"
                fill="white"
                width="11px"
                height="14px"
              />
            </StyledEntityLink>
          )}
        </Stack>
        <Line width="100%" color="white" />
        <Flex alignItems="flex-end" gap="2">
          <Popover modal={true}>
            <Flex alignItems="center" gap="2">
              <Text size="normal" weight="bold">
                {translate('didTheLinkMatch')}
              </Text>
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
                  zIndex: 20,
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

                <Text size="small">{translate('linkInfo')}</Text>
              </Box>
            </PopoverContent>
          </Popover>
        </Flex>
        {isLoggedIn ? (
          <Stack space="4">
            <Flex gap="5" alignItems="flex-end">
              <UnstyledButton
                onClick={() => {
                  verifyEntity({
                    variables: {
                      artefactId: artefactID as string,
                      language: language,
                      entityStartPosition: startPosition,
                      entityEndPosition: endPosition,
                      isCorrect: true,
                      artefactProperty: property,
                    },
                    onCompleted: () => {
                      setSucessToast(true);
                    },
                    onError: () => {
                      setFailToast(true);
                    },
                  });
                }}
              >
                <Flex gap="2" alignItems="center">
                  <Box css={{ pb: '1px' }}>
                    <ThumbUpIcon />
                  </Box>
                  <Text>{translate('didMatch')}</Text>
                </Flex>
              </UnstyledButton>
              <UnstyledButton
                onClick={() => {
                  verifyEntity({
                    variables: {
                      artefactId: artefactID as string,
                      language: language,
                      entityStartPosition: startPosition,
                      entityEndPosition: endPosition,
                      isCorrect: false,
                      artefactProperty: property,
                    },
                    onCompleted: () => {
                      setSucessToast(true);
                    },
                    onError: () => {
                      setFailToast(true);
                    },
                  });
                }}
              >
                <Flex gap="2" alignItems="center">
                  <ThumbDownIcon />
                  <Box pb="1">
                    <Text>{translate('noMatch')}</Text>
                  </Box>
                </Flex>
              </UnstyledButton>
            </Flex>
          </Stack>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Flex gap="5" alignItems="flex-end">
                <UnstyledButton>
                  <Flex gap="2" alignItems="center">
                    <Box css={{ pb: '1px' }}>
                      <ThumbUpIcon />
                    </Box>
                    <Text>{translate('didMatch')}</Text>
                  </Flex>
                </UnstyledButton>
                <UnstyledButton>
                  <Flex gap="2" alignItems="center">
                    <ThumbDownIcon />
                    <Box pb="1">
                      <Text>{translate('noMatch')}</Text>
                    </Box>
                  </Flex>
                </UnstyledButton>
              </Flex>
            </DialogTrigger>
            <DialogContent small>
              <Box p="4">
                <Flex justifyContent="flex-end">
                  <DialogClose asChild>
                    <UnstyledButton>
                      <CloseIcon />
                    </UnstyledButton>
                  </DialogClose>
                </Flex>
                <Flex
                  flexDirection="column"
                  gap="8"
                  alignItems="center"
                  justifyContent="center"
                  css={{ my: '$7' }}
                >
                  <Text size="large" css={{ textAlign: 'center' }}>
                    {translate('pleaseLogin')}
                  </Text>
                  <Button onClick={() => authenticate()}>
                    {translate('login')}
                  </Button>
                </Flex>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Flex>
      <Toast open={sucessToast} onOpenChange={setSucessToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex css={{ mt: '$3' }}>{translate('entityRated')}</Flex>
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
      <Toast open={failToast} onOpenChange={setFailToast}>
        <Flex justifyContent="space-between">
          <ToastDescription>
            <Flex css={{ mt: '$3' }}>{translate('entityRatedFailed')}</Flex>
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
    </Flex>
  );
};

const StyledEntityLink = styled(Link, {
  color: 'white',
  backgroundColor: 'var(--colors-blue)',
  padding: '8px',
  borderRadius: '4px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  width: 'fit-content',
});

const UnstyledButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});
