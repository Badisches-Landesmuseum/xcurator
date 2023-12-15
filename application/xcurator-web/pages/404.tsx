import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Box, Flex } from 'src/@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import Head from 'next/head';
import { Button } from '../src/components/Common/Button';
import { ArrowLeft } from '../src/icons';
import Link from 'next/link';

export default function Custom404() {
  const translate = useTranslations('Extra');

  return (
    <>
      <Head>
        <title>{translate('notFound')}</title>
        <meta name="description" content={translate('notFound')} />
        <meta name="keyword" content={translate('notFound')} />
      </Head>
      <Box py="6" px={{ '@initial': 3, '@bp2': 10 }}>
        <Link href="/canvas">
          <Button>
            <ArrowLeft />
            <Text>{translate('backToXCurator')}</Text>
          </Button>
        </Link>
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        css={{ width: '100%', height: '100%' }}
      >
        <Text as="h1">{translate('notFound')}</Text>
      </Flex>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      notFound: true,
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
