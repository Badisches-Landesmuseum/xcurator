import * as React from 'react';
import { Box, Flex, styled } from '@3pc/layout-components-react';
import { useTranslations } from 'next-intl';
import { ApolloError } from '@apollo/client';
import { CloseIcon, KiIcon } from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { Button } from 'src/components/Common/Button';
import { DialogClose } from 'src/components/Common/Dialog';
import { Orbit } from '@uiball/loaders';
import { theme } from 'src/themes/theme';
import { Textarea } from 'src/components/Common/Textarea';

export const GenerateAIText = ({
  text,
  loading,
  error,
  refetch,
  insert,
  input,
  setInput,
}: {
  text?: string | null;
  loading: boolean;
  error?: ApolloError;
  refetch: () => void;
  insert: (text: string) => void;
  input?: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const translate = useTranslations('EditStory');

  return (
    <Box>
      <Flex alignItems="center" gap="1" css={{ color: '$black600' }}>
        <KiIcon />
        <Text italic css={{ fontSize: '10px' }}>
          {translate('aiGenerated')}
        </Text>
      </Flex>
      <Box mt="1" css={{ color: '$black600' }}>
        <Text italic css={{ fontSize: '12px' }}>
          {translate('explanation')}
        </Text>
      </Box>
      <Box mt="2">
        {loading ? (
          <Flex justifyContent="center">
            <Orbit color={theme.colors.blue.value} />
          </Flex>
        ) : (
          <Box
            css={{
              backgroundColor: error ? undefined : '$purple100',
              px: '8px',
              py: '$3',
              borderRadius: '$1',
              textAlign: error ? 'center' : undefined,
            }}
          >
            <Text color={'black'}>{error ? translate('error') : text}</Text>
          </Box>
        )}
      </Box>
      {input !== undefined && setInput !== undefined ? (
        <Box mt="4">
          <Box as="label" htmlFor="input">
            <Text>{translate('helpTheAi')}...</Text>
          </Box>
          <Box mt="3" css={{ position: 'relative' }}>
            <Textarea
              id="input"
              value={input}
              rows={3}
              onChange={e => setInput(e.target.value)}
              placeholder={translate('helpPlaceholder')}
            />
            {input ? (
              <Box
                css={{
                  position: 'absolute',
                  top: '75%',
                  right: '2%',
                  cursor: 'pointer',
                }}
                onClick={() => setInput('')}
              >
                <CloseIcon width="12px" height="12px" />
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : null}
      <Flex
        justifyContent="center"
        css={{
          mt: '$5',
        }}
      >
        <GenerateButton onClick={() => refetch()}>
          <Box css={{ mr: '6px' }}>
            <KiIcon aria-hidden="true" />
          </Box>
          <Text>
            {!input ? translate('generate') : translate('generateWithKeywords')}
          </Text>
        </GenerateButton>
      </Flex>
      <Box mt="5" css={{ borderTop: '2px solid', borderColor: '$black100' }} />
      <Flex
        justifyContent="center"
        gap="4"
        css={{
          mt: '$7',
        }}
      >
        <DialogClose asChild>
          <AbortButton type="button">{translate('Cancel')}</AbortButton>
        </DialogClose>
        <DialogClose asChild>
          <Button
            disabled={loading || !!error || !text}
            onClick={() => insert(text || '')}
          >
            {translate('insert')}
          </Button>
        </DialogClose>
      </Flex>
    </Box>
  );
};

const GenerateButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: '$3',
  color: '$purple',
  border: '1px solid',
  borderColor: '$purple',
  borderRadius: '$1',
  cursor: 'pointer',
  userSelect: 'none',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    color: '#8E009A',
    borderColor: '#8E009A',
  },

  '&[disabled]': {
    color: '$black600',
    backgroundColor: '$black100',
    borderColor: '$black100',
  },
});

const AbortButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$blue',
  backgroundColor: 'transparent',
  p: '$2',
  cursor: 'pointer',
  border: '1px solid',
  borderColor: 'transparent',
  borderRadius: '$1',
  '&:hover': {
    borderColor: '$blue',
  },
});
