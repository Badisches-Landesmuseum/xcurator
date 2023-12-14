import { Box, Stack, styled } from 'src/@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { useTranslations } from 'next-intl';
import { Line } from 'src/components/Common/Line';

import { GetStaticPropsContext } from 'next';
import {
  AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/Common/Accordion';
import Head from 'next/head';
import * as React from 'react';
import { KiIcon } from 'src/icons';

export default function Page() {
  const translate = useTranslations('About');
  return (
    <>
      <Head>
        <title>{translate('seoTitle')}</title>
        <meta name="description" content={translate('description')} />
        <meta name="keyword" content={translate('keywords')} />
      </Head>
      <Box px={4} css={{ maxWidth: '800px', margin: '0 auto' }}>
        <Stack space="4" style={{ marginTop: '20px' }}>
          <Box py={3}>
            <Text as="h1" size="xxxlarge" weight="bold">
              {translate('Header')}
            </Text>
          </Box>
          <Line width="100%" color="blue200" />
          <AccordionRoot type="single" collapsible>
            <AccordionItem value="ForWho">
              <AccordionTrigger>{translate('ForWho.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('ForWho.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="WhatCanIdo">
              <AccordionTrigger>
                {translate('WhatCanIdo.title')}
              </AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('WhatCanIdo.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="Data">
              <AccordionTrigger>{translate('Data.title')} </AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('Data.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    termsLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://xcurator.landesmuseum.de/terms-of-use"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    privacyLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.landesmuseum.de/datenschutz"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="WhatIsAI">
              <AccordionTrigger>{translate('WhatIsAI.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('WhatIsAI.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    ideaLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://de.wikipedia.org/wiki/Ada_Lovelace"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    learningLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://ki-campus.org/"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    readMore: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://ki-campus.org/"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="WhyAI">
              <AccordionTrigger>{translate('WhyAI.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('WhyAI.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    dataLabLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://datalab.landesmuseum.de/"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="WhereAI">
              <AccordionTrigger>{translate('WhereAI.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('WhereAI.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    imageLiSmall: () => (
                      <StyledSpan>
                        <KiIcon color="#C500D7" width="20px" height="30px" />
                      </StyledSpan>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="WhichAI">
              <AccordionTrigger>{translate('WhichAI.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul" display="flex" css={{ flexDirection: 'column' }}>
                  {translate.rich('WhichAI.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    gitLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/Badisches-Landesmuseum/xcurator"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    elasticSimilarLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.elastic.co/guide/en/elasticsearch/reference/current/similarity.html"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    flairLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://flairnlp.github.io/docs/tutorial-basics/entity-linking"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    elasticSearchSpring: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.baeldung.com/spring-data-elasticsearch-queries"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    mappingTypes: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    elasticSearchRelations: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.elastic.co/blog/managing-relations-inside-elasticsearch"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    dslQuery: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    elasticSearchDoc: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/elastic/elasticsearch-py"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    elasticSearchRelation: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.elastic.co/blog/managing-relations-inside-elasticsearch"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    elasticSearchGithub: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/elastic/elasticsearch-py"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    entiyLinker: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/informagi/REL"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    openClip: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/mlfoundations/open_clip"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    pixSolution: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/pixolution/embeddings-grid"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    qualityTest: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://ravius.sbb.berlin/sbb-tools/index.html?ppn=756689090&model_id=precomputed&el_model_id=precomputed&task=ner"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    gitDocs: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/Badisches-Landesmuseum/xcurator"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    dataLabLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://datalab.landesmuseum.de/"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="Ethic">
              <AccordionTrigger>{translate('Ethic.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('Ethic.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    germanEthic: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.ethikrat.org/mitteilungen/mitteilungen/2023/ethikrat-kuenstliche-intelligenz-darf-menschliche-entfaltung-nicht-vermindern/"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="HowDeveloped">
              <AccordionTrigger>
                {translate('HowDeveloped.title')}
              </AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('HowDeveloped.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    dataLabLink: chunk => (
                      <StyledLinkItem target="_blank" href="#">
                        {chunk}
                      </StyledLinkItem>
                    ),
                    dreipc: chunk => (
                      <StyledLinkItem target="_blank" href="https://3pc.de">
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="AIStrategies">
              <AccordionTrigger>
                {translate('AIStrategies.title')}
              </AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('AIStrategies.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="WithoutAI">
              <AccordionTrigger>
                {translate('WithoutAI.title')}
              </AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('WithoutAI.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    museumLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.landesmuseum.de/museum"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    digitalLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.landesmuseum.de/digital"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="HowToUse">
              <AccordionTrigger>{translate('HowToUse.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('HowToUse.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    recommendation: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.landesmuseum.de/kulturvermittlung/schulen-kinder-und-jugendgruppen"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="HowToHelp">
              <AccordionTrigger>
                {translate('HowToHelp.title')}
              </AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('HowToHelp.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
                    codeLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/Badisches-Landesmuseum/xcurator"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
          </AccordionRoot>
        </Stack>
      </Box>
    </>
  );
}

const StyledLinkItem = styled('a', {
  all: 'unset',
  display: 'contents',
  transition: 'color 0.2s ease',
  cursor: 'pointer',
  color: '$blue',

  '&:hover': {
    color: '$blueDark',
  },
});

const StyledSpan = styled('span', {
  mx: '$1',
});

const StyledListItem = styled('li', {
  marginBottom: '$3',
  px: '$5',
  fontSize: '18px',
  lineHeight: '1.4',
  listStyle: 'none',
  '&::before': {
    content: '"•"',
    marginRight: '$3',
    fontSize: '30px',
    alignSelf: 'flex-start',
    marginTop: '-10px',
  },
  '@bp1': {
    lineHeight: '1.8',
  },
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!locale) return {};
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
}
