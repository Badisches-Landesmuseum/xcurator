import React, { ReactNode, forwardRef } from 'react';
import { Box, keyframes, styled } from '@3pc/layout-components-react';
import { ChevronIcon } from 'src/icons';
import * as Accordion from '@radix-ui/react-accordion';

type AccordionTriggerProps = {
  children: ReactNode;
  ref: React.RefObject<HTMLButtonElement>;
};

export const AccordionRoot = styled(Accordion.Root, {
  width: '100%',
});

export const AccordionItem = styled(Accordion.Item, {
  marginTop: 1,

  '&:first-child': {
    marginTop: 0,
  },

  '&:focus-within': {
    position: 'relative',
    border: '1px solid $gray500',
    zIndex: 1,
  },
});

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <StyledHeader>
    <StyledTrigger {...props} ref={forwardedRef}>
      <span>{children}</span>
      <Box
        aria-hidden
        css={{
          display: 'inline-flex',
          transform: 'rotate(90deg)',
          mr: '5px',
          transition: 'transform 300ms $easings$out',
          '[data-state=closed] &': { transform: 'rotate(270deg)' },
        }}
      >
        <ChevronIcon />
      </Box>
    </StyledTrigger>
  </StyledHeader>
));

AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
  </StyledContent>
));

AccordionContent.displayName = 'AccordionContent';

const StyledHeader = styled(Accordion.Header, {
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledTrigger = styled(Accordion.Trigger, {
  all: 'unset',
  width: '100%',
  py: '$3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'black',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: '$large',
  fontWeight: 'bold',
  lineHeight: 1.215,
  userSelect: 'none',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $blue',
  },
});

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledContent = styled(Accordion.Content, {
  overflow: 'hidden',
  fontSize: 15,

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});
