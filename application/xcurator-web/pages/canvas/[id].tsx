import { GetStaticPropsContext } from 'next';
import Page from '.';

// We want to render canvas/index.tsx here as well. We only have this Page so Nextjs understands the routing.
export default Page;

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
      locale,
      artefactId: params?.id || '',
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
