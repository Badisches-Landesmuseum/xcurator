import * as React from 'react';
import { GetServerSidePropsContext } from 'next';
import { useAuth } from 'src/components/Context/AuthContext';
import { Box, Flex, Stack } from 'src/@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { Button } from 'src/components/Common/Button';
import { useTranslations } from 'next-intl';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import Link from 'next/link';
import { ChevronIcon, DocumentIcon, DownloadIcon } from 'src/icons';
import { TextField } from 'src/components/Common/TextField';
import { useExportProfileMutation } from 'src/graphql/_generated/types';
import { Orbit } from '@uiball/loaders';
import Head from 'next/head';

export const Page = () => {
  const translate = useTranslations('Admin');
  const { isLoggedIn, authenticate, admin } = useAuth();
  const [userId, setUserId] = React.useState('');
  const [exportProfile, { loading, error }] = useExportProfileMutation();
  const [file, setFile] = React.useState<File>();

  return (
    <>
      <Head>
        <title>{translate('seoAdminExportsTitle')}</title>
        <meta
          name="description"
          content={translate('seoAdminExportsDescription')}
        />
        <meta name="keyword" content={translate('seoAdminExportsKeywords')} />
      </Head>
      {isLoggedIn ? (
        <>
          {admin ? (
            <>
              <Box
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
                  backgroundColor: '$blue',
                  color: '$white',
                  flexShrink: 0,
                }}
              >
                <Link href="/admin">
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
                    <ChevronIcon />
                  </Flex>
                </Link>
                <Box
                  px={{ '@initial': 2, '@bp1': 4 }}
                  css={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    userSelect: 'none',
                  }}
                >
                  <Text
                    size={{ '@initial': 'normal', '@bp1': 'xlarge' }}
                    weight="bold"
                  >
                    {translate('exportHeader')}
                  </Text>
                </Box>
              </Box>
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                css={{ pt: '$16' }}
                gap="8"
              >
                <Text weight="bold" size="xlarge">
                  {translate('giveUserId')}
                </Text>
                <TextField
                  autoFocus
                  placeholder="User id"
                  required
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                />
                <Button
                  disabled={!userId}
                  onClick={() =>
                    exportProfile({
                      variables: { where: { sub: userId } },
                      onCompleted: value => {
                        setFile(
                          new File(
                            [value.exportProfile],
                            'user : ' + userId + '.txt',
                            { type: 'text/plain:charset=UTF-8' }
                          )
                        );
                      },
                    })
                  }
                >
                  {translate('export')}
                </Button>
                {error ? <Box>{error.message}</Box> : null}
                {loading ? (
                  <Flex css={{ height: '100%' }}>
                    <Orbit color="#002fff" />
                  </Flex>
                ) : null}
                {file ? (
                  <Flex justifyContent="center" alignItems="center" gap="2">
                    <Box css={{ width: '35px', height: '35px' }}>
                      <DocumentIcon height="35px" width="35px" />
                    </Box>
                    <Flex
                      flexDirection="column"
                      gap="2"
                      css={{ width: '200px', '@bp3': { width: '500px' } }}
                    >
                      <Text
                        weight="bold"
                        size="normal"
                        css={{
                          py: '$1',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {file?.name}
                      </Text>
                      <Text weight="bold" size="small">
                        TXT, {file?.size} KB
                      </Text>
                    </Flex>
                    <a download={file.name} href={URL.createObjectURL(file)}>
                      <DownloadIcon color="blue" width="35px" height="35px" />
                    </a>
                  </Flex>
                ) : null}
              </Flex>
            </>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="center"
              css={{ width: '100%', height: '100´%' }}
            >
              {translate('notAdmin')}
            </Flex>
          )}
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" css={{ flexGrow: 1 }}>
          <Box px="4" css={{ textAlign: 'center', maxWidth: '600px' }}>
            <Stack space={{ '@initial': 20, '@bp2': 7 }}>
              <Text size={{ '@initial': 'xlarge', '@bp2': 'xxxlarge' }}>
                {translate('loginPlease')}
              </Text>
              <Button
                onClick={() => {
                  authenticate();
                }}
              >
                <Text size="large">{translate('login')}</Text>
              </Button>
            </Stack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext) {
  if (!locale)
    return {
      storyId: params?.id || '',
    };
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      notificationId: params?.id || '',
      locale,
    },
  };
}

export default Page;
