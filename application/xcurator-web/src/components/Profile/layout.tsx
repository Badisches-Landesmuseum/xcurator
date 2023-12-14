import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { Text } from 'src/components/Common/Text';
import { Box, Flex } from 'src/@3pc/layout-components-react';
import { useRouter } from 'next/router';
import { useAuth } from 'src/components/Context/AuthContext';
import { useTranslations } from 'next-intl';
import { useProfile } from 'src/components/Context/ProfileContext';
import { GetServerSidePropsContext } from 'next';
import { Button } from 'src/components/Common/Button';

export default function Layout({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const translate = useTranslations('Profile');
  const { authenticate } = useAuth();
  const { profile, loading } = useProfile();

  if (profile === undefined && isLoggedIn) return null;

  return (
    <>
      {isLoggedIn && !loading ? (
        <Box>
          <Box
            mt={{ '@initial': '8', '@bp2': '16' }}
            mb={{ '@initial': '3', '@bp2': '10' }}
          >
            <Flex justifyContent="center" alignItems="center">
              <Text size="xxxlarge" weight="bold">
                {translate('profile')}
              </Text>
            </Flex>
          </Box>
          <Box css={{ position: 'relative' }}>
            <Box css={{ position: 'sticky', zIndex: '1', top: '0' }}>
              <Flex
                gap="10"
                alignItems="flex-start"
                justifyContent="flex-start"
                css={{
                  backgroundColor: 'white',
                  pt: '20px',
                  pb: '10px',
                  pl: '5%',
                  borderBottom: '1px solid $blue50',
                  '@bp2': {
                    pl: '100px',
                  },
                }}
              >
                <NavLink
                  href="/profile/preference"
                  active={router.pathname === '/profile/preference'}
                >
                  {translate('prefernces')}
                </NavLink>
                <NavLink
                  href="/profile/settings"
                  active={router.pathname === '/profile/settings'}
                >
                  {translate('settings')}
                </NavLink>
              </Flex>
            </Box>
            {children}
          </Box>
        </Box>
      ) : (
        <Box mt="16" px="4" css={{ textAlign: 'center' }}>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="16"
          >
            <Text size="xlarge" weight="bold">
              {translate('notLoggedIn')}
            </Text>
            <Text size="normal" weight="bold">
              {translate('logInToSave')}
            </Text>
            <Button
              onClick={() => {
                authenticate();
              }}
              css={{ margin: '0 auto' }}
            >
              <Text size="large">{translate('login')}</Text>
            </Button>
          </Flex>
        </Box>
      )}
    </>
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
          '&::before': {
            content: '',
            position: 'absolute',
            width: '34px',
            height: '2px',
            bottom: '-10px',
            left: '50%',
            backgroundColor: '$blue',
            transform: active ? 'scaleX(1) translateX(-50%)' : 'scaleX(0)',
            transition: `transform 300ms $easings$out`,
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

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
