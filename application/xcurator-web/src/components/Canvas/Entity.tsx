import React, { useState } from 'react';
import {
  Language,
  useEntitiesDetailQuery,
  useVerifyEntityMutation,
} from 'src/graphql/_generated/types';
import { Text } from 'src/components/Common/Text';
import {
  Box,
  Flex,
  Inline,
  Stack,
  styled,
} from 'src/@3pc/layout-components-react';
import {
  ArrowUpRightIcon,
  CloseIcon,
  CrossIcon,
  QuestionMarkIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from 'src/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Orbit } from '@uiball/loaders';
import { useTranslations } from 'next-intl';
import { Line } from '../Common/Line';
import { Button } from '../Common/Button';
import { useAuth } from '../Context/AuthContext';
import { Toast, ToastAction, ToastDescription } from '../Common/Toast';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../Common/Dialog';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../Common/Popover';

export type NamedEntity = {
  __typename: string;
  literal: string;
  startPosition: number;
  endPosition: number;
  type: string;
  wikidataId?: string; // Assuming wikidataId is optional
  linkedData: Array<{
    __typename: string;
    link: {
      __typename: string;
      id: string;
      url: string;
    };
    source: string;
  }>;
};

export interface EntityProps {
  artefactID?: string;
  language: Language;
  wikipediaId: string;
  wikipediaUrl: string;
  wikiDataId: string;
  wikiDataUrl: string;
  gndUrl: string;
  startPosition: number;
  endPosition: number;
  property: string;
}

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
    <>
      <Flex
        flexDirection="column"
        css={{
          width: '100%',
          height: '100%',
          gap: '30px',
          overflow: 'hidden',
          padding: '0 $4',
        }}
      >
        <Text
          as="h1"
          css={{ width: '100%', fontSize: '26px', fontWeight: '700' }}
        >
          {details?.entitiesDetail.title}
        </Text>

        {details?.entitiesDetail.image && (
          <Box
            css={{
              position: 'relative',
              width: '100%',
              height: '250px',
              '> img': {
                objectFit: 'contain',
              },
            }}
          >
            <Image
              src={details?.entitiesDetail.image}
              alt={details?.entitiesDetail.title}
              sizes="(min-width: 968) 469px, 100vw"
              fill={true}
            />
          </Box>
        )}
        <Text as="p" css={{ width: '100%' }}>
          {details?.entitiesDetail.description}
        </Text>
        <Text css={{ width: '100%' }}>
          {translate('sources')}: Wikipedia, Wikidata, {gndUrl ? 'GND' : null}
        </Text>
        <Inline space="3">
          <Link
            href={wikipediaUrl}
            target="_blank"
            style={{
              color: 'white',
              backgroundColor: 'var(--colors-blueDark)',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingTop: '4px',
              paddingBottom: '4px',
              borderRadius: '4px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {translate('toArticle')} (Wikipedia)
            <ArrowUpRightIcon
              aria-hidden="true"
              fill="white"
              width="11px"
              height="14px"
            />
          </Link>
          <Link
            href={wikiDataUrl}
            target="_blank"
            style={{
              color: 'white',
              backgroundColor: 'var(--colors-blueDark)',
              paddingLeft: '8px',
              paddingRight: '8px',
              paddingTop: '4px',
              paddingBottom: '4px',
              borderRadius: '4px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {translate('toArticle')} (Wikidata)
            <ArrowUpRightIcon
              aria-hidden="true"
              fill="white"
              width="11px"
              height="14px"
            />
          </Link>
          {gndUrl && (
            <Link
              href={gndUrl}
              target="_blank"
              style={{
                color: 'white',
                backgroundColor: 'var(--colors-blueDark)',
                paddingLeft: '8px',
                paddingRight: '8px',
                paddingTop: '4px',
                paddingBottom: '4px',
                borderRadius: '4px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {translate('toArticle')}(GND)
              <ArrowUpRightIcon
                aria-hidden="true"
                fill="white"
                width="11px"
                height="14px"
              />
            </Link>
          )}
        </Inline>
      </Flex>
      <Box mb="10" css={{ padding: '0 $4', maxWidth: '80%' }}>
        <Box mb="4">
          <Line width="100%" color="black300" mt="10" />
        </Box>

        <Flex alignItems="flex-end" gap="2" css={{ position: 'relative' }}>
          <Popover>
            <Flex alignItems="center" gap="2">
              <Text size="normal" weight="bold">
                {translate('didTheLinkMatch')}
              </Text>
              <PopoverTrigger asChild>
                <Button
                  variant="icon"
                  css={{
                    p: '0',
                    '&[data-state="open"]': { color: '$blueDark' },
                  }}
                >
                  <QuestionMarkIcon width="22px" height="22px" />
                </Button>
              </PopoverTrigger>
            </Flex>
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
                    <ThumbUpIcon fill="black" />
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
                  <ThumbDownIcon fill="black" />
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
      </Box>
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
    </>
  );
};

const UnstyledButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});
