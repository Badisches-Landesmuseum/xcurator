import * as React from 'react';
import { GetStaticPropsContext } from 'next';
import { useAuth } from 'src/components/Context/AuthContext';
import { Box, Flex, Stack, styled } from 'src/@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';
import { Button } from 'src/components/Common/Button';
import { useTranslations } from 'next-intl';
import { HEADER_HEIGHT } from 'src/components/Header/Header';
import Link from 'next/link';
import { AlertIcon, CheckIcon, ChevronIcon, CrossIcon } from 'src/icons';
import * as Tabs from '@radix-ui/react-tabs';
import { Textarea } from 'src/components/Common/Textarea';
import {
  useConclusionTemplateQuery,
  useIntroductionTemplateQuery,
  useSetModuleThoughtPromptMutation,
  useSetStoryConclusionTemplateMutation,
  useSetStoryIntroductionTemplateMutation,
  useThoughtTemplateQuery,
} from 'src/graphql/_generated/types';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'src/components/Common/Accordion';
import {
  Toast,
  ToastAction,
  ToastDescription,
} from 'src/components/Common/Toast';
import { Orbit } from '@uiball/loaders';
import Head from 'next/head';

const Page = () => {
  const translate = useTranslations('Admin');
  const { isLoggedIn, admin, authenticate } = useAuth();
  const [tab, setTab] = React.useState('objects');
  const [objectsKeywordsExist, setObjectsKeywordsExist] = React.useState(false);
  const [storyIntroductionKeywordsExist, setStoryIntroductionKeywordsExist] =
    React.useState(false);
  const [storyConclusionKeywordsExist, setStoryConclusionKeywordsExist] =
    React.useState(false);
  const [templateUpdated, setTemplateUpdated] = React.useState(false);
  const [templateUpdateError, setTemplateUpdateError] = React.useState(false);
  const [setModuleThoughtPrompt] = useSetModuleThoughtPromptMutation();
  const [setStoryIntroductionPrompt] =
    useSetStoryIntroductionTemplateMutation();
  const [setStoryConclusionPrompt] = useSetStoryConclusionTemplateMutation();
  const [objectUserTemplate, setObjectUserTemplate] = React.useState('');
  const [objectSystemTemplate, setObjectSystemTemplate] = React.useState('');
  const [storyIntroductionUserTemplate, setStoryIntroductionUserTemplate] =
    React.useState('');
  const [storyIntroductionSystemTemplate, setStoryIntroductionSystemTemplate] =
    React.useState('');
  const [storyConclusionUserTemplate, setStoryConclusionUserTemplate] =
    React.useState('');
  const [storyConclusionSystemTemplate, setStoryConclusionSystemTemplate] =
    React.useState('');

  const { data, loading: thoughtTemplateLoading } = useThoughtTemplateQuery({
    skip: !admin,
    onCompleted: data => {
      setObjectUserTemplate(data.thoughtTemplate.userTemplate);
      setObjectSystemTemplate(data.thoughtTemplate.systemTemplate);
    },
  });
  const { data: storyIntroduction, loading: introductionTemplateLoading } =
    useIntroductionTemplateQuery({
      skip: !admin,
      onCompleted: data => {
        setStoryIntroductionUserTemplate(
          data.introductionTemplate.userTemplate
        );
        setStoryIntroductionSystemTemplate(
          data.introductionTemplate.systemTemplate
        );
      },
    });
  const { data: storyConclusion, loading: conclusionTemplateLoading } =
    useConclusionTemplateQuery({
      skip: !admin,
      onCompleted: data => {
        setStoryConclusionUserTemplate(data.conclusionTemplate.userTemplate);
        setStoryConclusionSystemTemplate(
          data.conclusionTemplate.systemTemplate
        );
      },
    });

  // NOTE: check if the object template is modifiable, that means it has either language or data in both templates and USER_INPUT in both fields.
  const isObjectTemplateModifiable = React.useMemo(() => {
    return (
      objectUserTemplate &&
      objectSystemTemplate &&
      (objectUserTemplate + objectSystemTemplate).includes('<LANGUAGE>') &&
      (objectUserTemplate + objectSystemTemplate).includes('<DATA>')
    );
  }, [objectUserTemplate, objectSystemTemplate]);

  // NOTE: check if the story conclusion template is modifiable, that means it has either language or data in both templates.
  const isStoryConclusionTemplateModifiable = React.useMemo(() => {
    return (
      storyConclusionSystemTemplate &&
      storyConclusionUserTemplate &&
      (storyConclusionSystemTemplate.includes('<DATA>') ||
        storyConclusionSystemTemplate.includes('<LANGUAGE>')) &&
      (storyConclusionUserTemplate.includes('<LANGUAGE>') ||
        storyConclusionUserTemplate.includes('<DATA>')) &&
      (storyConclusionSystemTemplate + storyConclusionUserTemplate).includes(
        '<LANGUAGE>'
      ) &&
      (storyConclusionSystemTemplate + storyConclusionUserTemplate).includes(
        '<DATA>'
      )
    );
  }, [storyConclusionSystemTemplate, storyConclusionUserTemplate]);

  // NOTE: same here as story conclusion.
  const isStoryIntroductionTemplateModifiable = React.useMemo(() => {
    return (
      storyIntroductionSystemTemplate &&
      storyIntroductionUserTemplate &&
      (storyIntroductionSystemTemplate.includes('<DATA>') ||
        storyIntroductionSystemTemplate.includes('<LANGUAGE>')) &&
      (storyIntroductionUserTemplate.includes('<LANGUAGE>') ||
        storyIntroductionUserTemplate.includes('<DATA>')) &&
      (
        storyIntroductionSystemTemplate + storyIntroductionUserTemplate
      ).includes('<LANGUAGE>') &&
      (
        storyIntroductionSystemTemplate + storyIntroductionUserTemplate
      ).includes('<DATA>')
    );
  }, [storyIntroductionSystemTemplate, storyIntroductionUserTemplate]);

  React.useEffect(() => {
    if (isObjectTemplateModifiable) {
      setObjectsKeywordsExist(true);
    } else {
      setObjectsKeywordsExist(false);
    }
  }, [isObjectTemplateModifiable]);

  React.useEffect(() => {
    if (isStoryConclusionTemplateModifiable) {
      setStoryConclusionKeywordsExist(true);
    } else {
      setStoryConclusionKeywordsExist(false);
    }
  }, [isStoryConclusionTemplateModifiable]);

  React.useEffect(() => {
    if (isStoryIntroductionTemplateModifiable) {
      setStoryIntroductionKeywordsExist(true);
    } else {
      setStoryIntroductionKeywordsExist(false);
    }
  }, [isStoryIntroductionTemplateModifiable]);

  if (
    thoughtTemplateLoading ||
    introductionTemplateLoading ||
    conclusionTemplateLoading
  ) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        css={{ width: '100%', height: '100%' }}
      >
        <Orbit color="#002fff" />
      </Flex>
    );
  }

  return (
    <>
      <Head>
        <title>{translate('seoAdminTemplatesTitle')}</title>
        <meta
          name="description"
          content={translate('seoAdminTemplatesDescription')}
        />
        <meta name="keyword" content={translate('seoAdminTemplatesKeywords')} />
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
                    {translate('editLlmTemplates')}
                  </Text>
                </Box>
              </Box>
              <Tabs.Root value={tab} onValueChange={value => setTab(value)}>
                <Tabs.List>
                  <Flex
                    gap="5"
                    css={{
                      borderBottom: '1px solid',
                      borderColor: '$blue100',
                      p: '$4',
                      px: '$3',
                      '@bp2': {
                        px: '$10',
                      },
                    }}
                  >
                    <Tabs.Trigger asChild value="objects">
                      <TabButton selected={tab === 'objects'}>
                        {translate('objects')}
                      </TabButton>
                    </Tabs.Trigger>
                    <Tabs.Trigger asChild value="stories">
                      <TabButton selected={tab === 'stories'}>
                        {translate('stories')}
                      </TabButton>
                    </Tabs.Trigger>
                  </Flex>
                </Tabs.List>
                <Box
                  px={{ '@initial': '3', '@bp2': '10' }}
                  pb="4"
                  mt="4"
                  css={{
                    position: 'relative',
                    backgroundColor: 'white',

                    '@bp2': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Tabs.Content asChild value="objects">
                    <Flex flexDirection="column" gap="4">
                      <Flex flexDirection="column" css={{ px: '$4' }}>
                        <Text>{translate('helpAI')}</Text>
                        <Box as="ul" css={{ px: '-$4' }}>
                          <StyledListItem>
                            <Text css={{ mt: '$3' }}>
                              {translate.rich('userTemplateExplanation', {
                                important: chunks => <strong>{chunks}</strong>,
                              })}
                            </Text>
                          </StyledListItem>
                          <StyledListItem>
                            <Text css={{ mt: '$3' }}>
                              {translate.rich('systemTemplateExplanation', {
                                important: chunks => <strong>{chunks}</strong>,
                              })}
                            </Text>
                          </StyledListItem>
                          <StyledListItem>
                            <Flex
                              flexDirection="column"
                              gap="4"
                              css={{ mt: '$3' }}
                            >
                              <Text weight="bold">{translate('example')} </Text>
                              <Flex
                                flexDirection="column"
                                gap="2"
                                css={{ paddingLeft: '$2' }}
                              >
                                <Text>
                                  System Template: Given {'<DATA>'}: Please use
                                  only this input as source.
                                </Text>
                                <Text>
                                  User Template: What is this artefact made of?
                                  Please answer in the language {'<LANGUAGE>'}
                                </Text>
                              </Flex>
                            </Flex>
                          </StyledListItem>
                        </Box>
                      </Flex>
                      <AccordionRoot
                        type="single"
                        collapsible
                        defaultValue="object"
                      >
                        <Box css={{ maxWidth: '500px' }}>
                          <AccordionItem value="object">
                            <AccordionTrigger>
                              {translate('editObjectTemplate')}
                            </AccordionTrigger>
                            <AccordionContent>
                              <Flex
                                flexDirection="column"
                                gap="4"
                                css={{ px: '$4', pt: '$2' }}
                              >
                                <Flex gap="4" alignItems="center">
                                  <Text css={{ flexShrink: 0 }}>
                                    {translate('userTemplate')}
                                  </Text>
                                  <Box
                                    css={{ width: '100%', maxWidth: '500px' }}
                                  >
                                    <Textarea
                                      id="text"
                                      placeholder={translate('adjustTemplate')}
                                      value={objectUserTemplate}
                                      onChange={e =>
                                        setObjectUserTemplate(e.target.value)
                                      }
                                      rows={3}
                                    />
                                  </Box>
                                </Flex>
                                <Flex gap="4" alignItems="center">
                                  <Text css={{ flexShrink: 0 }}>
                                    {translate('systemTemplate')}
                                  </Text>
                                  <Box
                                    css={{ width: '100%', maxWidth: '500px' }}
                                  >
                                    <Textarea
                                      id="text"
                                      placeholder={translate('adjustTemplate')}
                                      value={objectSystemTemplate}
                                      onChange={e =>
                                        setObjectSystemTemplate(e.target.value)
                                      }
                                      rows={3}
                                    />
                                  </Box>
                                </Flex>
                                <Box>
                                  <Flex flexDirection="column" gap="4">
                                    <Text
                                      css={{
                                        color: 'red',
                                        display:
                                          !objectsKeywordsExist &&
                                          objectUserTemplate &&
                                          objectSystemTemplate
                                            ? 'block'
                                            : 'none',
                                      }}
                                    >
                                      {translate.rich(
                                        'checkKeywordExistenceObject',
                                        {
                                          important: chunks => (
                                            <strong>{chunks}</strong>
                                          ),
                                        }
                                      )}
                                    </Text>
                                    <Box>
                                      <Button
                                        disabled={
                                          !objectsKeywordsExist ||
                                          (objectUserTemplate ===
                                            data?.thoughtTemplate
                                              .userTemplate &&
                                            objectSystemTemplate ===
                                              data?.thoughtTemplate
                                                .systemTemplate)
                                        }
                                        onClick={() =>
                                          setModuleThoughtPrompt({
                                            variables: {
                                              where: {
                                                userTemplate:
                                                  objectUserTemplate,
                                                systemTemplate:
                                                  objectSystemTemplate,
                                              },
                                            },
                                            update: cache => {
                                              cache.modify({
                                                fields: {
                                                  thoughtTemplate: () => {
                                                    return {
                                                      userTemplate:
                                                        objectUserTemplate,
                                                      systemTemplate:
                                                        objectSystemTemplate,
                                                    };
                                                  },
                                                },
                                              });
                                            },
                                            onCompleted: () => {
                                              setTemplateUpdated(true);
                                            },
                                            onError: () => {
                                              setTemplateUpdateError(true);
                                            },
                                          })
                                        }
                                      >
                                        {translate('save')}
                                      </Button>
                                    </Box>
                                  </Flex>
                                </Box>
                              </Flex>
                            </AccordionContent>
                          </AccordionItem>
                        </Box>
                      </AccordionRoot>
                    </Flex>
                  </Tabs.Content>
                  <Tabs.Content asChild value="stories">
                    <Flex flexDirection="column" gap="4">
                      <Flex flexDirection="column" css={{ px: '$4' }}>
                        <Text>{translate('helpAI')}</Text>
                        <Box as="ul" css={{ px: '-$4' }}>
                          <StyledListItem>
                            <Text css={{ mt: '$3' }}>
                              {translate.rich('userTemplateExplanation', {
                                important: chunks => <strong>{chunks}</strong>,
                              })}
                            </Text>
                          </StyledListItem>
                          <StyledListItem>
                            <Text css={{ mt: '$3' }}>
                              {translate.rich('systemTemplateExplanation', {
                                important: chunks => <strong>{chunks}</strong>,
                              })}
                            </Text>
                          </StyledListItem>
                          <StyledListItem>
                            <Flex
                              flexDirection="column"
                              gap="4"
                              css={{ mt: '$3' }}
                            >
                              <Text weight="bold">{translate('example')} </Text>
                              <Flex
                                flexDirection="column"
                                gap="2"
                                css={{ paddingLeft: '$2' }}
                              >
                                <Text>
                                  System Template: Given {'<DATA>'}: Please use
                                  only this input as source.
                                </Text>
                                <Text>
                                  User Template: What is this artefact made of?
                                  Please answer in the language {'<LANGUAGE>'}
                                </Text>
                              </Flex>
                            </Flex>
                          </StyledListItem>
                        </Box>
                      </Flex>
                      <AccordionRoot
                        type="multiple"
                        defaultValue={['introduction']}
                      >
                        <Box css={{ maxWidth: '500px' }}>
                          <AccordionItem value="introduction">
                            <AccordionTrigger>
                              {translate('editStoryIntroductionTemplate')}
                            </AccordionTrigger>
                            <AccordionContent>
                              <Flex
                                flexDirection="column"
                                gap="4"
                                css={{ px: '$4', pt: '$1' }}
                              >
                                <Flex gap="4" alignItems="center">
                                  <Text css={{ flexShrink: 0 }}>
                                    {translate('userTemplate')}
                                  </Text>
                                  <Box
                                    css={{ width: '100%', maxWidth: '500px' }}
                                  >
                                    <Textarea
                                      id="text"
                                      placeholder={translate('adjustTemplate')}
                                      value={storyIntroductionUserTemplate}
                                      onChange={e =>
                                        setStoryIntroductionUserTemplate(
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                    />
                                  </Box>
                                </Flex>
                                <Flex gap="4" alignItems="center">
                                  <Text css={{ flexShrink: 0 }}>
                                    {translate('systemTemplate')}
                                  </Text>
                                  <Box
                                    css={{ width: '100%', maxWidth: '500px' }}
                                  >
                                    <Textarea
                                      id="text"
                                      placeholder={translate('adjustTemplate')}
                                      value={storyIntroductionSystemTemplate}
                                      onChange={e =>
                                        setStoryIntroductionSystemTemplate(
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                    />
                                  </Box>
                                </Flex>
                                <Box>
                                  <Flex flexDirection="column" gap="4">
                                    <Text
                                      css={{
                                        color: 'red',
                                        display:
                                          !storyIntroductionKeywordsExist &&
                                          storyIntroductionUserTemplate &&
                                          storyIntroductionSystemTemplate
                                            ? 'block'
                                            : 'none',
                                      }}
                                    >
                                      {translate.rich('checkKeywordExistence', {
                                        important: chunks => (
                                          <strong>{chunks}</strong>
                                        ),
                                      })}
                                    </Text>
                                    <Box>
                                      <Button
                                        disabled={
                                          !storyIntroductionKeywordsExist ||
                                          (storyIntroductionUserTemplate ===
                                            storyIntroduction
                                              ?.introductionTemplate
                                              .userTemplate &&
                                            storyIntroductionSystemTemplate ===
                                              storyIntroduction
                                                .introductionTemplate
                                                .systemTemplate)
                                        }
                                        onClick={() =>
                                          setStoryIntroductionPrompt({
                                            variables: {
                                              where: {
                                                userTemplate:
                                                  storyIntroductionUserTemplate,
                                                systemTemplate:
                                                  storyIntroductionSystemTemplate,
                                              },
                                            },
                                            update: cache => {
                                              cache.modify({
                                                fields: {
                                                  introductionTemplate: () => {
                                                    return {
                                                      userTemplate:
                                                        storyIntroductionUserTemplate,
                                                      systemTemplate:
                                                        storyIntroductionSystemTemplate,
                                                    };
                                                  },
                                                },
                                              });
                                            },
                                            onCompleted: () => {
                                              setTemplateUpdated(true);
                                            },
                                            onError: () => {
                                              setTemplateUpdateError(true);
                                            },
                                          })
                                        }
                                      >
                                        {translate('save')}
                                      </Button>
                                    </Box>
                                  </Flex>
                                </Box>
                              </Flex>
                            </AccordionContent>
                          </AccordionItem>
                        </Box>
                        <Box css={{ maxWidth: '500px' }}>
                          <AccordionItem value="conclusion">
                            <AccordionTrigger>
                              {translate('editStoryConclusionTemplate')}
                            </AccordionTrigger>
                            <AccordionContent>
                              <Flex
                                flexDirection="column"
                                gap="4"
                                css={{ px: '$4', pt: '$1' }}
                              >
                                <Flex gap="4" alignItems="center">
                                  <Text css={{ flexShrink: 0 }}>
                                    {translate('userTemplate')}
                                  </Text>
                                  <Box
                                    css={{ width: '100%', maxWidth: '500px' }}
                                  >
                                    <Textarea
                                      id="text"
                                      placeholder={translate('adjustTemplate')}
                                      value={storyConclusionUserTemplate}
                                      onChange={e =>
                                        setStoryConclusionUserTemplate(
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                    />
                                  </Box>
                                </Flex>
                                <Flex gap="4" alignItems="center">
                                  <Text css={{ flexShrink: 0 }}>
                                    {translate('systemTemplate')}
                                  </Text>
                                  <Box
                                    css={{ width: '100%', maxWidth: '500px' }}
                                  >
                                    <Textarea
                                      id="text"
                                      placeholder={translate('adjustTemplate')}
                                      value={storyConclusionSystemTemplate}
                                      onChange={e =>
                                        setStoryConclusionSystemTemplate(
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                    />
                                  </Box>
                                </Flex>
                                <Box>
                                  <Flex flexDirection="column" gap="4">
                                    <Text
                                      css={{
                                        color: 'red',
                                        display:
                                          !storyConclusionKeywordsExist &&
                                          storyConclusionUserTemplate &&
                                          storyConclusionSystemTemplate
                                            ? 'block'
                                            : 'none',
                                      }}
                                    >
                                      {translate.rich('checkKeywordExistence', {
                                        important: chunks => (
                                          <strong>{chunks}</strong>
                                        ),
                                      })}
                                    </Text>
                                    <Box>
                                      <Button
                                        disabled={
                                          !storyConclusionKeywordsExist ||
                                          (storyConclusionUserTemplate ===
                                            storyConclusion?.conclusionTemplate
                                              .userTemplate &&
                                            storyConclusionSystemTemplate ===
                                              storyConclusion
                                                ?.conclusionTemplate
                                                .systemTemplate)
                                        }
                                        onClick={() =>
                                          setStoryConclusionPrompt({
                                            variables: {
                                              where: {
                                                userTemplate:
                                                  storyConclusionUserTemplate,
                                                systemTemplate:
                                                  storyConclusionSystemTemplate,
                                              },
                                            },
                                            update: cache => {
                                              cache.modify({
                                                fields: {
                                                  conclusionTemplate: () => {
                                                    return {
                                                      userTemplate:
                                                        storyConclusionUserTemplate,
                                                      systemTemplate:
                                                        storyConclusionSystemTemplate,
                                                    };
                                                  },
                                                },
                                              });
                                            },
                                            onCompleted: () => {
                                              setTemplateUpdated(true);
                                            },
                                            onError: () => {
                                              setTemplateUpdateError(true);
                                            },
                                          })
                                        }
                                      >
                                        {translate('save')}
                                      </Button>
                                    </Box>
                                  </Flex>
                                </Box>
                              </Flex>
                            </AccordionContent>
                          </AccordionItem>
                        </Box>
                      </AccordionRoot>
                    </Flex>
                  </Tabs.Content>
                </Box>
              </Tabs.Root>
              <Toast open={templateUpdated} onOpenChange={setTemplateUpdated}>
                <Flex justifyContent="space-between">
                  <ToastDescription>
                    <Flex css={{ mt: '$3' }}>
                      <Flex
                        css={{
                          display: 'inline-flex',
                          pt: '2px',
                          flexShrink: 0,
                        }}
                      >
                        <CheckIcon />
                      </Flex>
                      {translate('templateUpdated')}
                    </Flex>
                  </ToastDescription>
                  <Box css={{ pt: '6px', flexShrink: 0 }}>
                    <ToastAction asChild altText="Close">
                      <Button variant="ghost-blue">
                        <Flex css={{ display: 'inline-flex' }}>
                          <CrossIcon />
                        </Flex>
                      </Button>
                    </ToastAction>
                  </Box>
                </Flex>
              </Toast>
              <Toast
                open={templateUpdateError}
                onOpenChange={setTemplateUpdateError}
              >
                <Flex justifyContent="space-between">
                  <ToastDescription>
                    <Flex css={{ mt: '$3' }}>
                      <Flex
                        css={{
                          display: 'inline-flex',
                          pt: '2px',
                          flexShrink: 0,
                        }}
                      >
                        <AlertIcon />
                      </Flex>
                      {translate('templateUpdateError')}
                    </Flex>
                  </ToastDescription>
                  <Box css={{ pt: '6px', flexShrink: 0 }}>
                    <ToastAction asChild altText="Close">
                      <Button variant="ghost-blue">
                        <Flex css={{ display: 'inline-flex' }}>
                          <CrossIcon />
                        </Flex>
                      </Button>
                    </ToastAction>
                  </Box>
                </Flex>
              </Toast>
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

const StyledListItem = styled('li', {
  display: 'flex',
  marginBottom: '$3',
  fontSize: '18px',
  '&::before': {
    content: '"•"',
    marginRight: '$3',
    fontSize: '30px',
    alignSelf: 'flex-start',
  },
});

const TabButton = styled('button', {
  all: 'unset',
  position: 'relative',
  fontSize: '$normal',
  fontWeight: '$bold',
  py: '6px',
  cursor: 'pointer',
  textAlign: 'center',

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: 'translateX(-50%) scaleX(0)',
    transitionProperty: 'transform',
    transitionDuration: '250ms',
    transitionTimingFunction: '$easings$out',
    height: '2px',
    width: '50%',
    backgroundColor: '$blue',
  },

  variants: {
    selected: {
      true: {
        '&:before': {
          transform: 'translateX(-50%) scaleX(1)',
        },
      },
    },
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

export default Page;
