import React from 'react';
import { Box, Grid, styled } from '@3pc/layout-components-react';
import { EditIcon } from 'src/icons';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// TODO: this component can't be uncontrolled
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, value, rows = 1, ...props }, ref) => {
    const fallbackId = React.useId();
    const inputId = id || fallbackId;

    return (
      <Grid css={{ position: 'relative' }}>
        {!value ? (
          <Box
            css={{
              position: 'absolute',
              display: 'inline-flex',
              alignItems: rows === 1 ? 'center' : 'flex-start',
              justifyContent: 'center',
              height: '100%',
              color: '$blue',
              left: '10px',
              top: rows === 1 ? undefined : '10px',
              pointerEvents: 'none',
            }}
          >
            <EditIcon height="20px" width="20px" />
          </Box>
        ) : null}
        <StyledTextArea
          ref={ref}
          id={inputId}
          value={value}
          empty={!value}
          rows={rows}
          {...props}
        />
        <Box
          css={{
            visibility: 'hidden',
            gridArea: '1 / 1 / 2 / 2',
            width: '100%',
            whiteSpace: 'pre-wrap',
            fontSize: '$small',
            fontWeight: '$regular',
            lineHeight: 1.375,
            wordBreak: 'break-word',
            px: '8px',
            py: '6px',
            border: '3px solid',
            maxHeight: '128px',
          }}
        >
          {value + ' '}
        </Box>
      </Grid>
    );
  }
);

Textarea.displayName = 'Textarea';

const StyledTextArea = styled('textarea', {
  resize: 'none',
  overflow: 'hidden',
  gridArea: '1 / 1 / 2 / 2',
  fontFamily: 'inherit',
  fontSize: '$small',
  fontWeight: '$regular',
  lineHeight: 1.375,
  wordBreak: 'break-word',
  px: '10px',
  py: '8px',
  border: 'none',
  borderRadius: '$1',
  backgroundColor: '$blue50',
  maxHeight: '128px',
  overflowY: 'auto',

  '&:focus-visible': {
    outlineWidth: '2px',
  },

  '&::placeholder': {
    color: '$blue',
    opacity: 1,
  },

  variants: {
    empty: {
      true: {
        pl: '36px',
      },
    },
  },
});
