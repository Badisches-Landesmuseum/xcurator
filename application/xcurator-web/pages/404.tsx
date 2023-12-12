import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Flex } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import Head from 'next/head';

export default function Custom404() {
  const translate = useTranslations('Extra');

  return (
    <>
      <Head>
        <title>{translate('notFound')}</title>
        <meta name="description" content={translate('notFound')} />
        <meta name="keyword" content={translate('notFound')} />
      </Head>
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
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
