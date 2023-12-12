import * as React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Inline,
  keyframes,
  Stack,
  styled,
} from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import { darkTheme } from 'src/themes/theme';
import {
  BellIcon,
  BookmarkIcon,
  CollectionIcon,
  HeartIcon,
  InfoIcon,
  ProfileIcon,
} from 'src/icons';
import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { GetStaticPropsContext } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';
import { useAuth } from 'src/components/Context/AuthContext';

interface HeaderProps {
  children?: React.ReactNode;
}
export const HEADER_HEIGHT = '53px';

type SelectOption = {
  label: string;
  value: string;
};

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.6 },
});

const languages: SelectOption[] = [
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Nederlands', value: 'nl' },
];

export const Header = ({}: HeaderProps) => {
  const router = useRouter();
  const { pathname, asPath } = router;
  const translate = useTranslations('Header');
  const sammlungHeaderActive = pathname.startsWith('/canvas');
  const storiesHeaderActive = pathname.startsWith('/stories');
  const adminHeader = pathname.startsWith('/admin');
  const isPresentation = pathname.startsWith('/presentation');
  const isLandingPage = pathname === '/';
  const [open, setOpen] = React.useState(false);
  //NOTE: we use string to control the accordion if it opens or not
  const [languageOpen, setLanguageOpen] = React.useState('undefined');
  const { isLoggedIn, authenticate, unAuthenticate, admin } = useAuth();
  const handleLinkClick = () => {
    setOpen(false);
  };

  const selectedLanguage = React.useMemo(() => {
    return (
      languages.find(({ value }) => value === router.locale)?.label || 'Deutsch'
    );
  }, [router.locale]);

  const onLanguageChange = (e: string) => {
    setLanguageOpen('undefined');
    router.push(asPath, asPath, {
      locale: languages.find(({ label }) => label === e)?.value,
      scroll: false,
    });
  };

  return (
    <>
      {!isPresentation && !isLandingPage && (
        <Popover.Root open={open} onOpenChange={setOpen} modal={true}>
          {open ? (
            <Box
              css={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'black',
                opacity: 0.6,
                zIndex: 98,

                '@media (prefers-reduced-motion: no-preference)': {
                  animationDuration: '250ms',
                  animationTimingFunction: '$easings$out',
                  animationName: overlayShow,
                },
              }}
            />
          ) : null}
          <Box
            id="header"
            px={{
              '@initial': 4,
              '@bp2': 10,
            }}
            css={{
              position: 'sticky',
              top: 0,
              left: 0,
              width: '100%',
              height: HEADER_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '$blue',
              borderColor: open ? '$blue' : 'transparent',
              transitionProperty: open ? 'none' : 'border-color',
              transitionDelay: '270ms',
              transitionDuration: '30ms',
              overflow: 'hidden',
              [`.${darkTheme} &`]: {
                transitionProperty: open
                  ? 'none'
                  : 'border-color, background-color',

                backgroundColor: open ? '$blue' : 'transparent',
              },
            }}
          >
            <Popover.Trigger asChild>
              <PlainButton aria-label={translate('menuButton')}>
                <Stack space="1">
                  <Box
                    css={{
                      width: '22px',
                      height: '2px',
                      backgroundColor: '$white',
                      borderRadius: '2px',
                    }}
                  />
                  <Box
                    css={{
                      width: '22px',
                      height: '2px',
                      backgroundColor: '$white',
                      borderRadius: '2px',
                    }}
                  />
                  <Box
                    css={{
                      width: '22px',
                      height: '2px',
                      backgroundColor: '$white',
                      borderRadius: '2px',
                    }}
                  />
                </Stack>
              </PlainButton>
            </Popover.Trigger>
            <Flex
              gap="4"
              justifyContent="center"
              css={{ flexGrow: 1, pr: '22px' }}
            >
              {!adminHeader ? (
                <nav>
                  <Ul css={{ display: 'flex', gap: '$4' }}>
                    <li>
                      <HeaderLink href="/canvas" active={sammlungHeaderActive}>
                        {translate('collection')}
                      </HeaderLink>
                    </li>
                    <li>
                      <HeaderLink
                        href={isLoggedIn ? '/stories' : '/stories/all'}
                        active={storiesHeaderActive}
                      >
                        {translate('stories')}
                      </HeaderLink>
                    </li>
                  </Ul>
                </nav>
              ) : (
                <Box
                  css={{
                    userSelect: 'none',
                  }}
                >
                  <Text
                    size={{ '@initial': 'normal', '@bp1': 'xlarge' }}
                    weight="bold"
                    color="white"
                  >
                    {translate('admin')}
                  </Text>
                </Box>
              )}
            </Flex>
          </Box>
          <Popover.Anchor asChild>
            <Box
              css={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </Popover.Anchor>
          <PopoverContent>
            <Box
              pt={{ '@initial': 5, '@bp2': 7 }}
              px={{ '@initial': 5, '@bp2': 10 }}
            >
              <Flex
                justifyContent={{
                  '@initial': 'flex-end',
                  '@bp2': 'flex-start',
                }}
              >
                <Popover.Close asChild>
                  <PlainButton aria-label={translate('close')}>
                    <Box
                      css={{
                        position: 'relative',
                        height: '23px',
                        width: '40px',
                      }}
                    >
                      <Box
                        css={{
                          position: 'absolute',
                          width: '45px',
                          height: '2px',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) rotate(-30deg)',
                          backgroundColor: '$white',
                        }}
                      />
                      <Box
                        css={{
                          position: 'absolute',
                          width: '45px',
                          height: '2px',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) rotate(30deg)',
                          backgroundColor: '$white',
                        }}
                      />
                    </Box>
                  </PlainButton>
                </Popover.Close>
              </Flex>
            </Box>
            <Box
              px={{ '@initial': 5, '@bp2': 10 }}
              pt={{ '@initial': 5, '@bp2': 10 }}
            >
              <nav>
                <Ul>
                  <Stack space={{ '@initial': 4, '@bp2': 6 }}>
                    <li>
                      <Inline alignY="center" space="3">
                        <CollectionIcon
                          aria-hidden="true"
                          width="22px"
                          height="22px"
                          color="white"
                        />
                        <MenuLink href="/canvas" onClick={handleLinkClick}>
                          {translate('collection')}
                        </MenuLink>
                      </Inline>
                    </li>
                    <li>
                      <Inline alignY="center" space="3">
                        <BookmarkIcon
                          aria-hidden="true"
                          width="22px"
                          height="22px"
                          color="white"
                        />
                        <MenuLink
                          href={isLoggedIn ? '/stories' : '/stories/all'}
                          onClick={handleLinkClick}
                        >
                          {translate('stories')}
                        </MenuLink>
                      </Inline>
                    </li>
                    <li>
                      <Inline alignY="center" space="3">
                        <HeartIcon
                          aria-hidden="true"
                          width="22px"
                          height="22px"
                          color="white"
                        />
                        <MenuLink href="/favourites" onClick={handleLinkClick}>
                          {translate('favourites')}
                        </MenuLink>
                      </Inline>
                    </li>
                    <li>
                      <Inline alignY="center" space="3">
                        <InfoIcon
                          aria-hidden="true"
                          width="22px"
                          height="22px"
                          color="white"
                        />
                        <MenuLink href="/about" onClick={handleLinkClick}>
                          {translate('aboutXCurator')}
                        </MenuLink>
                      </Inline>
                    </li>
                    <li>
                      <Inline alignY="center" space="3">
                        <ProfileIcon
                          aria-hidden="true"
                          width="22px"
                          height="22px"
                          color="white"
                        />
                        <MenuLink
                          href={'/profile/preference'}
                          onClick={handleLinkClick}
                        >
                          {translate('profile')}
                        </MenuLink>
                        <PlainButton
                          onClick={() =>
                            isLoggedIn ? unAuthenticate() : authenticate()
                          }
                        >
                          <Text
                            size="normal"
                            color="white"
                            css={{
                              textDecoration: 'underline',
                              transitionProperty: 'color',
                              transitionDuration: '250ms',
                              transitionTimingFunction: '$easings$out',
                              cursor: 'pointer',
                              '&:hover': {
                                fontWeight: 'bold',
                              },
                            }}
                          >
                            {isLoggedIn
                              ? translate('logout')
                              : translate('login')}
                          </Text>
                        </PlainButton>
                      </Inline>
                    </li>
                    {admin ? (
                      <li>
                        <Inline alignY="center" space="3">
                          <BellIcon width="22px" height="22px" color="white" />
                          <MenuLink href="/admin" onClick={handleLinkClick}>
                            {translate('admin')}
                          </MenuLink>
                        </Inline>
                      </li>
                    ) : null}
                    {isLoggedIn ? (
                      <li>
                        <Inline alignY="center" space="3">
                          <MenuLink
                            href="/onboarding"
                            onClick={handleLinkClick}
                          >
                            Onboarding
                          </MenuLink>
                        </Inline>
                      </li>
                    ) : null}
                    <Box>
                      <Accordion
                        type="single"
                        collapsible
                        value={languageOpen}
                        onValueChange={setLanguageOpen}
                      >
                        <AccordionItem value="language">
                          <AccordionTrigger
                            value={selectedLanguage}
                            style={{ backgroundColor: 'transparent' }}
                          />
                          <AccordionContent>
                            <Flex
                              flexDirection="column"
                              alignItems="flex-start"
                              css={{ paddingTop: '5px' }}
                            >
                              {['English', 'Deutsch', 'Nederlands'].map(
                                language => (
                                  <Button
                                    onClick={() => {
                                      onLanguageChange(language);
                                    }}
                                    key={language}
                                    value={language}
                                  >
                                    <Text
                                      weight={
                                        selectedLanguage === language
                                          ? 'bold'
                                          : 'regular'
                                      }
                                    >
                                      {language}
                                    </Text>
                                  </Button>
                                )
                              )}
                            </Flex>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </Box>
                    <li>
                      <Link href="/impressum" onClick={handleLinkClick}>
                        <Text>{translate('impressum')}</Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms-of-use" onClick={handleLinkClick}>
                        <Text>{translate('termsOfUse')}</Text>
                      </Link>
                    </li>
                  </Stack>
                </Ul>
              </nav>
              <Box
                mt={{ '@initial': 20, '@bp4': 30 }}
                css={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'none',

                  '@bp3': {
                    display: 'inline-flex',
                  },

                  '@media(min-height: 830px)': {
                    bottom: '-50px',
                  },
                }}
              >
                <Image
                  src="/icons/Curator_Bildmarke_deko.svg"
                  alt="X Logo"
                  width={300}
                  height={300}
                />
              </Box>
            </Box>
          </PopoverContent>
        </Popover.Root>
      )}
    </>
  );
};

const MenuLink = ({
  href,
  children,
  ...props
}: { children: React.ReactNode } & LinkProps) => {
  return (
    <Link href={href} {...props}>
      <Text
        size="xxlarge"
        weight="bold"
        color="white"
        css={{
          fontStyle: 'italic',
          transitionProperty: 'color',
          transitionDuration: '250ms',
          transitionTimingFunction: '$easings$out',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {children}
      </Text>
    </Link>
  );
};

const Button = styled('button', {
  all: 'unset',
  height: '28px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2',
  lineHeight: 1,
  fontWeight: '$regular',
  color: '$white',
  backgroundColor: '$blue',
  textAlign: 'center',
  border: '1px solid $blue',
  cursor: 'pointer',
  userSelect: 'none',
});

const HeaderLink = ({
  href,
  children,
  active,
  ...props
}: { children: React.ReactNode; active: boolean } & LinkProps) => {
  return (
    <Link href={href} {...props}>
      <Box
        css={{
          position: 'relative',
          '&::before': {
            content: '',
            position: 'absolute',
            width: '32px',
            height: '2px',
            bottom: '-10px',
            left: '50%',
            backgroundColor: '$background',
            transform: active
              ? 'scaleX(1) translateX(-50%)'
              : 'scaleX(0) translateX(calc(-50% - 16px))',
            transition: `transform 300ms $easings$out`,
          },
        }}
      >
        <Text size="xlarge" weight="bold" color={active ? 'white' : 'blue100'}>
          {children}
        </Text>
      </Box>
    </Link>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}

const Ul = styled('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const slideDown = keyframes({
  from: {
    transform: 'translateY(-100%)',
  },
  to: {
    transform: 'translateY(0)',
  },
});

const slideOutUp = keyframes({
  from: {
    transform: 'translateY(0)',
  },
  to: {
    transform: 'translateY(-100%)',
  },
});

const slideRight = keyframes({
  from: {
    transform: 'translateX(-100%)',
  },
  to: {
    transform: 'translateX(0)',
  },
});

const slideOutLeft = keyframes({
  from: {
    transform: 'translateX(0)',
  },
  to: {
    transform: 'translateX(-100%)',
  },
});

const PopoverContent = styled(Popover.Content, {
  position: 'relative',
  zIndex: 99,
  backgroundColor: '$blue',
  height: '100vh',
  width: '100vw',
  transformOrigin: 'center top',
  // prevent horizontal blur boxShadow
  boxShadow: 'rgb(0 0 0 / 10%) 0px 6px 4px -4px',
  color: '$background',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '250ms',
    animationTimingFunction: '$easings$out',
    '&[data-state="open"]': {
      animationName: slideDown,
    },
    '&[data-state="closed"]': {
      animation: slideOutUp,
    },
    '@bp2': {
      '&[data-state="open"]': {
        animationName: slideRight,
      },
      '&[data-state="closed"]': {
        animation: slideOutLeft,
      },
    },
  },

  '@bp2': {
    width: 'auto',
    borderTopRightRadius: '$1',
    borderBottomRightRadius: '$1',
  },
});

const PlainButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  userSelect: 'none',

  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: '$green',
  },
});
