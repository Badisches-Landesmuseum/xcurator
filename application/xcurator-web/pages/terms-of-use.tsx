import { Box, Inline, Stack } from 'src/@3pc/layout-components-react';
import { GetStaticPropsContext } from 'next';
import { Text } from 'src/components/Common/Text';
import Head from 'next/head';
import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Impressum() {
  const translate = useTranslations('TermsOfUse');

  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('seoDescription')} />
        <meta name="keyword" content={translate('seoKeywords')} />
      </Head>
      <Box
        css={{
          px: '$6',
          width: '100%',
          margin: '0 auto',
          '@bp2': {
            maxWidth: '900px',
          },
        }}
      >
        <Box mt={{ '@initial': '8', '@bp2': '20' }}>
          <Stack space="14">
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('termsOfUse')}
              </Text>
              <Text>{translate('section-1')}</Text>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('possibilities')}
              </Text>
              <Text>{translate('possibilities-1')}</Text>
              <Text>{translate('possibilities-2')}</Text>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('registration')}
              </Text>
              <Text>{translate('registration-1')}</Text>
              <Text>{translate('registration-2')}</Text>
              <Text>{translate('registration-3')}</Text>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('aiGenerated')}
              </Text>
              <Text>{translate('aiGenerated-1')}</Text>
              <Text>{translate('aiGenerated-2')}</Text>
              <Box as="ul">
                {translate.rich('aiGenerated-list', {
                  li: chunk => <li>{chunk}</li>,
                })}
              </Box>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('publicContent')}
              </Text>
              <Text>{translate('publicContent-1')}</Text>
              <Text>{translate('publicContent-2')}</Text>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('responsibility')}
              </Text>
              <Text>{translate('responsibility-1')}</Text>
              <Text>{translate('responsibility-2')}</Text>
              <Text>{translate('responsibility-3')}</Text>
              <Text>{translate('responsibility-4')}</Text>
              <Text>{translate('responsibility-5')}</Text>
              <Text>{translate('responsibility-6')}</Text>
              <Text>{translate('responsibility-7')}</Text>
              <Text>{translate('responsibility-8')}</Text>
              <Text>{translate('responsibility-9')}</Text>
              <Text>{translate('responsibility-10')}</Text>
              <Text>{translate('responsibility-11')}</Text>
              <Text>{translate('responsibility-12')}</Text>
              <Text>{translate('responsibility-13')}</Text>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('deleteStories')}
              </Text>
              <Text>{translate('deleteStories-1')}</Text>
              <Text>{translate('deleteStories-2')}</Text>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('availability')}
              </Text>
              <Text>{translate('availability-1')}</Text>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('dataPrivacy')}
              </Text>
              <Stack space="3">
                <Text>{translate('dataPrivacy-1')}</Text>
                <Link
                  href="https://www.landesmuseum.de/datenschutz"
                  target="_blank"
                >
                  <Text css={{ textDecoration: 'underline' }}>
                    www.landesmuseum.de/datenschutz
                  </Text>
                </Link>
              </Stack>
            </Stack>
            <Stack space="6">
              <Text size="xxlarge" weight="bold">
                {translate('deleteProfil')}
              </Text>
              <Text>{translate('deleteProfil-1')}</Text>
              <Text>{translate('deleteProfil-2')}</Text>
              <Text>{translate('deleteProfil-3')}</Text>
              <Text>{translate('deleteProfil-4')}</Text>
              <Text>{translate('deleteProfil-5')}</Text>
            </Stack>
            <Box mb="10">
              <Inline space="2" alignY="center">
                <Text>{translate('stand')}</Text>
                <Text>12/2023</Text>
              </Inline>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
