import React from 'react';
import { ArtefactFragment } from 'src/graphql/_generated/types';
import { Text } from 'src/components/Common/Text';
import {
  Box,
  Flex,
  Grid,
  Inline,
  Stack,
  styled,
} from 'src/@3pc/layout-components-react';
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TranslatedIcon,
} from 'src/icons';
import { ButtonTag } from 'src/components/Common/ButtonTag';
import Image from 'next/image';
import { saveSizeImage } from 'src/utils/formatImage';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { localeToLanguage } from 'src/utils/useLanguage';
import { useRouter } from 'next/router';

const DESCRIPTION_HEIGHT = 65;

export const ReportedArtefact = ({
  artefact,
}: {
  artefact: ArtefactFragment;
}) => {
  const router = useRouter();
  const translate = useTranslations('Admin');
  const language = localeToLanguage(router.locale || '');
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
  const [informationExpanded, setInformationExpanded] = React.useState(false);
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] =
    React.useState(false);

  React.useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    setIsDescriptionOverflowing(false);
    setDescriptionExpanded(false);

    if (el.scrollHeight > DESCRIPTION_HEIGHT) {
      setIsDescriptionOverflowing(true);
    }
  }, [artefact.description]);

  React.useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(() => {
      if (el.scrollHeight > DESCRIPTION_HEIGHT)
        setIsDescriptionOverflowing(true);
      else setIsDescriptionOverflowing(false);
    });

    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.unobserve(document.documentElement);
  }, []);

  return (
    <>
      <Box mt="5" px={{ '@initial': 3, '@bp2': 10 }}>
        <Text as="h2" size="large" weight="bold">
          {artefact.title ? (
            <Box
              as="span"
              css={{
                whiteSpace: 'pre-wrap',
              }}
              dangerouslySetInnerHTML={{
                __html: artefact.title,
              }}
            />
          ) : (
            `${translate('noTitle')}`
          )}
        </Text>
      </Box>
      <Box mt="4" px={{ '@initial': 3, '@bp2': 10 }}>
        {artefact.sourceInfo.language !== language ? (
          <Box mb="3" css={{ color: '$black600' }}>
            <Inline space="1" alignY="center">
              <TranslatedIcon width="16px" height="22px" />
              <Text as="p" size="xsmall" italic>
                {translate('translated')}
              </Text>
            </Inline>
          </Box>
        ) : null}
        <Inline space="2">
          {artefact.tags.map((t, i) => (
            <ButtonTag key={i} variant={t.isUsingAI ? 'ai' : undefined}>
              {t.literal}
            </ButtonTag>
          ))}
        </Inline>
      </Box>
      <Box
        mt="5"
        px={{ '@initial': 3, '@bp2': 10 }}
        css={{
          position: 'relative',
          width: '100%',
          height: '300px',

          '> img': {
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          },
        }}
      >
        {artefact.images[0].url ? (
          <Image
            src={artefact.images[0].url}
            alt={artefact.title || ''}
            width={(300 / artefact.images[0].height) * artefact.images[0].width}
            height={300}
            loader={saveSizeImage(artefact.images[0])}
          />
        ) : null}
      </Box>
      <Box mt="5" px={{ '@initial': 3, '@bp2': 10 }}>
        {artefact.description ? (
          <>
            <Box
              ref={descriptionRef}
              css={{
                pt: '4px',
                height: descriptionExpanded
                  ? undefined
                  : `${DESCRIPTION_HEIGHT}px`,
                overflow: descriptionExpanded ? undefined : 'hidden',
                textOverflow: 'ellipsis',
                position: 'relative',
              }}
            >
              <Text color="black">
                <Box
                  as="span"
                  css={{
                    whiteSpace: 'pre-wrap',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: artefact.description,
                  }}
                />
              </Text>
            </Box>
            {isDescriptionOverflowing ? (
              <Box mt="2">
                <ExpandButton
                  onClick={() => setDescriptionExpanded(previous => !previous)}
                >
                  <Text>
                    {descriptionExpanded
                      ? translate('readLess')
                      : translate('readMore')}
                  </Text>
                  <Box ml="1">
                    {descriptionExpanded ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )}
                  </Box>
                </ExpandButton>
              </Box>
            ) : null}
            <Box mt="2" pt="4">
              <Box
                css={{
                  borderTop: '1px solid $blue200 ',
                }}
              >
                <ExpandInformationButton
                  onClick={() => setInformationExpanded(!informationExpanded)}
                >
                  <Flex alignItems="center" gap={1}>
                    <InfoCircledIcon width="22px" height="22px" />
                    <Text size="xsmall">{translate('moreObjectInfos')}</Text>
                  </Flex>
                  <ArrowDownIcon
                    width="22px"
                    height="22px"
                    style={{
                      padding: '5px',
                      transform: informationExpanded ? 'rotate(180deg)' : '',
                    }}
                  />
                </ExpandInformationButton>
                <Grid
                  css={{
                    gridTemplateRows: informationExpanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.25s ease-out',
                    mt: '$4',
                    pb: informationExpanded ? '$4' : 0,
                  }}
                >
                  <Box
                    css={{
                      overflow: 'hidden',
                    }}
                  >
                    <Stack space="6">
                      <Flex
                        gap={2}
                        alignItems="center"
                        css={{ paddingTop: '12px' }}
                      >
                        <Text weight="bold">{translate('date')}</Text>
                        <Text>{artefact.dateRange?.literal}</Text>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <Text weight="bold">{translate('places')}</Text>
                        <Text>
                          {artefact.locations.map(location => location.name)}
                        </Text>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <Text weight="bold">{translate('persons')}</Text>
                        <Text>
                          {artefact.persons.map(person => person.name)}
                        </Text>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <Text weight="bold">{translate('userRights')}</Text>
                        <Text>{artefact.images[0].licence.name}</Text>
                      </Flex>
                      <Flex gap={2} alignItems="center">
                        <Text weight="bold">{translate('photograph')}</Text>
                      </Flex>
                      <Link href={`${artefact.sourceInfo.url}`} target="_blank">
                        <Box
                          css={{
                            color: '$blue',
                            height: '15px',
                          }}
                        >
                          <Text>{translate('goToCataloge')}</Text>
                        </Box>
                      </Link>
                    </Stack>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </>
        ) : (
          <Text color="black600" italic>
            {translate('noDescription')}
          </Text>
        )}
      </Box>
    </>
  );
};

const ExpandInformationButton = styled('button', {
  all: 'unset',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  pt: '$4',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

const ExpandButton = styled('button', {
  all: 'unset',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },
});
