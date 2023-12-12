import { Box, Stack, styled } from '@3pc/layout-components-react';
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
                    usageLink: chunk => (
                      <StyledLinkItem target="_blank" href="#">
                        {chunk}
                      </StyledLinkItem>
                    ),
                    dataProtectionLink: chunk => (
                      <StyledLinkItem target="_blank" href="#">
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
                      <StyledLinkItem target="_blank" href="#">
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
                    naturalLanguageLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://en.wikipedia.org/wiki/Computational_linguistics"
                      >
                        {chunk}
                      </StyledLinkItem>
                    ),
                    relLink: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/informagi/REL"
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
                    elasticSearch: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://www.elastic.co/guide/en/elasticsearch/reference/current/similarity.html"
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
                    elasticSearchGithub: chunk => (
                      <StyledLinkItem
                        target="_blank"
                        href="https://github.com/elastic/elasticsearch-py"
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
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="DetectAI">
              <AccordionTrigger>{translate('DetectAI.title')}</AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('DetectAI.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
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
                  })}
                </Box>
              </AccordionContent>
              <Line width="100%" color="blue200" />
            </AccordionItem>
            <AccordionItem value="InfoButtons">
              <AccordionTrigger>
                {translate('InfoButtons.title')}
              </AccordionTrigger>
              <AccordionContent>
                <Box as="ul">
                  {translate.rich('InfoButtons.text', {
                    li: chunk => <StyledListItem>{chunk}</StyledListItem>,
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

const StyledListItem = styled('li', {
  display: 'inline-flex',
  marginBottom: '$3',
  px: '$5',
  fontSize: '18px',
  lineHeight: '1.4',
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
