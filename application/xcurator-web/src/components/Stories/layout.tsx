import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { Text } from 'src/components/Common/Text';
import { Box, Flex } from 'src/@3pc/layout-components-react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import { TutorialDialog } from 'src/components/Stories/Tutorial';
import { useHasHydrated } from 'src/utils/useHasHydrated';

export default function Layout({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const translate = useTranslations('Stories');
  const hasHydrated = useHasHydrated();

  return (
    <Flex
      flexDirection="column"
      css={{
        position: 'relative',
        minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
      }}
    >
      <Box css={{ position: 'sticky', top: '0', flexShrink: 0, zIndex: '1' }}>
        <Flex
          gap={4}
          alignItems="center"
          css={{
            backgroundColor: 'white',
            pt: '20px',
            px: '12px',
            pb: '10px',
            borderBottom: '1px solid $blue50',

            '@bp2': {
              pt: '40px',
              px: '40px',
              pb: '12px',
            },
          }}
        >
          <NavLink href="/stories" active={router.pathname === '/stories'}>
            {translate('myStories')}
          </NavLink>
          <NavLink
            href="/stories/all"
            active={router.pathname === '/stories/all'}
          >
            {translate('allStories')}
          </NavLink>
        </Flex>
      </Box>
      {children}
      {hasHydrated ? <TutorialDialog /> : null}
    </Flex>
  );
}

const NavLink = ({
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
          '&:before': {
            content: '',
            display: 'block',
            height: '2px',
            width: '50%',
            position: 'absolute',
            left: '50%',
            bottom: '-10px',
            transform: `translateX(-50%) scaleX(${active ? 1 : 0})`,
            transitionProperty: 'transform',
            transitionDuration: '250ms',
            transitionTimingFunction: '$easings$out',
            backgroundColor: '$blue',

            '@bp2': {
              bottom: '-12px',
            },
          },
        }}
      >
        <Text as="h1" size="large" weight="bold" color="black">
          {children}
        </Text>
      </Box>
    </Link>
  );
};
