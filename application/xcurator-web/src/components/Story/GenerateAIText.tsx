import * as React from 'react';
import { Box, Flex, styled } from 'src/@3pc/layout-components-react';
import { useTranslations } from 'next-intl';
import { ApolloError } from '@apollo/client';
import { KiIcon } from 'src/icons';
import { Text } from 'src/components/Common/Text';
import { Button } from 'src/components/Common/Button';
import { DialogClose } from 'src/components/Common/Dialog';
import { Orbit } from '@uiball/loaders';
import { theme } from 'src/themes/theme';

export const GenerateAIText = ({
  text,
  loading,
  error,
  refetch,
  insert,
}: {
  text?: string | null;
  loading: boolean;
  error?: ApolloError;
  refetch: () => void;
  insert: (text: string) => void;
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
          <Text>{translate('generate')}</Text>
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
          <Button variant="ghost" type="button">
            {translate('Cancel')}
          </Button>
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
