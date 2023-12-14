import { Box, Stack, Flex, Inline } from 'src/@3pc/layout-components-react';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { Text } from 'src/components/Common/Text';
import Head from 'next/head';
import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Impressum() {
  const translate = useTranslations('Impressum');

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
          <Box mb="10">
            <Text size="xxxlarge" weight="bold">
              Impressum
            </Text>
          </Box>

          <Stack space="4">
            <Text size="large" weight="bold">
              {translate('publisher')}
            </Text>
            <Stack space="4">
              <Text>Badisches Landesmuseum Karlsruhe</Text>
              <Text>Schlossbezirk 10</Text>
              <Text>76131 Karlsruhe</Text>
              <Text>Direktor: Prof. Dr. Eckart Köhne</Text>
              <Text>Kaufm. Direktorin: Susanne Schulenburg</Text>
              <Text>T +49 (0)721 926-6514</Text>
              <Text>F +49 (0)721 926-6537</Text>
              <Text>info@landesmuseum.de</Text>
            </Stack>
          </Stack>

          <Box my="5">
            <Stack space="4">
              <Text size="large" weight="bold">
                {translate('responsible')}
              </Text>
              <Text>Katrin Lorbeer</Text>
              <Text>T +49 (0)721 926-6599</Text>
            </Stack>
          </Box>
          <Box my="5">
            <Stack space="4">
              <Text size="large" weight="bold">
                {translate('dataSafty')}
              </Text>
              <Text>Despina Antonatou</Text>
            </Stack>
          </Box>
          <Box my="5">
            <Stack space="5">
              <Text size="large" weight="bold">
                {translate('realisationTitle')}
              </Text>
              <Stack space="3">
                <Text weight="bold">{translate('supervision')}:</Text>
                <Text>Sonja Thiel (Badisches Landesmuseum Karlsruhe)</Text>
                <Text>Etienne Posthumus (Universität Amsterdam)</Text>
                <Text>{translate('cooperation')}</Text>
                <Inline space="1">
                  <Text>{translate('datalab')} </Text>
                  <Link href="https://datalab.landesmuseum.de/" target="_blank">
                    <Text css={{ textDecoration: 'underline' }}>
                      www.datalab.landesmuseum.de
                    </Text>
                  </Link>
                </Inline>
              </Stack>
              <Stack space="3">
                <Text weight="bold">{translate('executedBy')}:</Text>
                <Link href="https://3pc.de/" target="_blank">
                  <Text css={{ textDecoration: 'underline' }}>3pc GmbH</Text>
                </Link>
              </Stack>
              <Stack space="3">
                <Text weight="bold">Code: </Text>
                <Link
                  href="https://github.com/Badisches-Landesmuseum/xcurator"
                  target="_blank"
                >
                  <Text css={{ textDecoration: 'underline' }}>
                    https://github.com/Badisches-Landesmuseum/xcurator
                  </Text>
                </Link>
              </Stack>
            </Stack>
          </Box>
          <Box my="4">
            <Text size="large" weight="bold">
              {translate('disclaimer')}
            </Text>
          </Box>
          <Box mb="8">
            <Stack space="6">
              <Text>{translate('disclaimer1')}</Text>
              <Stack space="4">
                <Text size="large" weight="bold">
                  {translate('copyrights')}
                </Text>
                <Text>{translate('copyrightsText')}</Text>
              </Stack>
            </Stack>
          </Box>
          <Box mb="8">
            <Stack space="3">
              <Text size="large" weight="bold">
                {translate('pictureCredits')}
              </Text>
              <Text>{translate('pictureCreditsText')}</Text>
            </Stack>
          </Box>
          <Box mb="8">
            <Stack space="3">
              <Text size="large" weight="bold">
                {translate('moreInfos')}
              </Text>
              <Link
                href="https://www.landesmuseum.de/datenschutz"
                target="_blank"
              >
                <Text css={{ textDecoration: 'underline' }}>
                  {translate('moreInfosText-1')}
                </Text>
              </Link>
              <Link
                href="https://www.landesmuseum.de/erklaerung-zur-barrierefreiheit"
                target="_blank"
              >
                <Text css={{ textDecoration: 'underline' }}>
                  {translate('moreInfosText-2')}
                </Text>
              </Link>
            </Stack>
          </Box>
          <Box>
            <Text size="large" weight="bold">
              {translate('supportedBy')}
            </Text>
            <Box my="6">
              <Link
                href="https://www.kulturstaatsministerin.de/DE/startseite/startseite_node.html"
                target="_blank"
              >
                <Flex gap="1">
                  <Image
                    src="logos/adler.svg"
                    width="100"
                    height="100"
                    alt="regierung"
                  />
                  <Text css={{ maxWidth: '350px' }} size="large">
                    {translate('contracted')}
                  </Text>
                </Flex>
              </Link>
            </Box>
          </Box>
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
