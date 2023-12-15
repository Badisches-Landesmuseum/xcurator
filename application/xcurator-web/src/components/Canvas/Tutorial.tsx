import { useState } from 'react';
import { Box, Flex } from 'src/@3pc/layout-components-react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogClose,
  DialogContent,
} from 'src/components/Common/Dialog';
import { Button } from 'src/components/Common/Button';
import { CrossIcon, KiIcon } from 'src/icons';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Text } from 'src/components/Common/Text';
import Image from 'next/image';
import { ProgressBar } from 'src/components/Common/ProgressBar';
import { localeToLanguage } from 'src/utils/useLanguage';
import router from 'next/router';

function isAbsolved() {
  const done = localStorage.getItem('tutorial-canvas-done');
  return done === 'true';
}

function absolve() {
  localStorage.setItem('tutorial-canvas-done', 'true');
}

export const TutorialDialog = () => {
  const translate = useTranslations('Tutorials');
  const [page, setPage] = useState(1);

  return isAbsolved() ? null : (
    <Dialog
      defaultOpen={true}
      onOpenChange={open => {
        if (!open) absolve();
      }}
    >
      <DialogContent small>
        <DialogClose asChild>
          <Flex justifyContent="flex-end">
            <Box mt="4" mr="1">
              <Button aria-label={translate('close')} variant="icon">
                <CrossIcon aria-hidden="true" width="27px" height="27px" />
              </Button>
            </Box>
          </Flex>
        </DialogClose>
        <Box
          pb="6"
          css={{
            overflowX: 'hidden',
          }}
        >
          <Box
            px="5"
            css={{
              textAlign: 'center',
              mt: '$6',
            }}
          >
            <DialogTitle>
              <Text size="large">{translate('explore')}</Text>
            </DialogTitle>
          </Box>
          <Box mt="5" px="5">
            <Flex justifyContent="center">
              <Box css={{ width: '106px' }}>
                <ProgressBar max={3} value={page} />
              </Box>
            </Flex>
          </Box>
          <Box mt="5">
            <Flex
              css={{
                width: '100%',
                transform: `translateX(-${Math.round((page - 1) * 100)}%)`,
                '@media (prefers-reduced-motion: no-preference)': {
                  transitionProperty: 'transform',
                  transitionDuration: '250ms',
                  transitionTimingFunction: '$easings$out',
                },
              }}
            >
              <Box
                px="5"
                css={{
                  flexGrow: 1,
                  flexShrink: 0,
                  width: '100%',
                }}
              >
                <Page1 />
              </Box>
              <Box
                px="5"
                css={{
                  flexGrow: 1,
                  flexShrink: 0,
                  width: '100%',
                }}
              >
                <Page2 />
              </Box>
              <Box
                px="5"
                css={{
                  flexGrow: 1,
                  flexShrink: 0,
                  width: '100%',
                }}
              >
                <Page3 />
              </Box>
            </Flex>
          </Box>
          <Box mt="10" px="5">
            <Flex justifyContent="center" gap="4">
              <Button
                variant="ghost"
                disabled={page === 1}
                onClick={() => setPage(previous => previous - 1)}
              >
                {translate('back')}
              </Button>
              {page < 3 ? (
                <Button onClick={() => setPage(previous => previous + 1)}>
                  {translate('next')}
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button autoFocus>{translate('close')}</Button>
                </DialogClose>
              )}
            </Flex>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const Page1 = () => {
  const translate = useTranslations('Tutorials');
  return (
    <>
      <Flex justifyContent="center" css={{ width: '100%' }}>
        <Image
          src="/images/tutorial/explore_intro.jpg"
          width={311}
          height={160}
          alt="xCurator Logo mit Schwungvollem x"
        />
      </Flex>
      <Box
        mt="6"
        css={{
          textAlign: 'center',
        }}
      >
        <Text size="xxlarge">{translate('explore-welcome')}</Text>
      </Box>
      <Box mt="6" px={{ '@initial': '0', '@bp2': '12' }}>
        <Text>{translate('explore-page-1-1')}</Text>
        <Text css={{ mt: '13px' }}>{translate('explore-page-1-2')}</Text>
      </Box>
    </>
  );
};

const Page2 = () => {
  const translate = useTranslations('Tutorials');
  return (
    <>
      <Flex justifyContent="center" css={{ width: '100%' }}>
        <Image
          src="/images/tutorial/explore_ai.jpg"
          width={311}
          height={160}
          alt="verteilte magische Sterne"
        />
      </Flex>
      <Box mt="6" px={{ '@initial': '0', '@bp2': '12' }}>
        <Text>
          {translate('explore-page-2-1')} (
          <Box as="span" css={{ display: 'inline-flex' }}>
            <KiIcon />
          </Box>
          ) {translate('explore-page-2-2')}
        </Text>
        <Text css={{ mt: '13px' }}>{translate('explore-page-2-3')}</Text>
      </Box>
    </>
  );
};

const Page3 = () => {
  const translate = useTranslations('Tutorials');
  const language = localeToLanguage(router.locale || '');
  return (
    <>
      <Flex justifyContent="center" css={{ width: '100%' }}>
        <Image
          src={`/images/tutorial/explore_filter_${language}.gif`}
          width={311}
          height={160}
          alt="verteilte magische Sterne"
        />
      </Flex>
      <Box mt="6" px={{ '@initial': '0', '@bp2': '12' }}>
        <Text>{translate('explore-page-3')}</Text>
      </Box>
    </>
  );
};
