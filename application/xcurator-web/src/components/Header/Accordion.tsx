import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';
import { keyframes, styled } from '@3pc/layout-components-react';
import { ChevronDownIcon } from 'src/icons';
import { AccordionTriggerProps } from '@radix-ui/react-accordion';

function Trigger({
  value,
  ...props
}: { value: string } & AccordionTriggerProps) {
  return (
    <StyledTrigger {...props}>
      {value}
      <ChevronDownIcon
        aria-hidden
        className="AccordionChevron"
        color="white"
        width="22px"
        height="22px"
        style={{ transition: 'transform 0.1s ease' }}
      />
    </StyledTrigger>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <StyledContent>{children}</StyledContent>;
}

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  display: 'inline-flex',
  alignItems: 'center',
  border: '0px',
  padding: '0px',
  boxShadow: 'none',
  color: 'white',
  fontSize: '16px',
  gap: '5px',
  '&:hover': {
    cursor: 'pointer',
  },
  '&[data-state="open"] > .AccordionChevron': {
    transform: 'rotate(180deg)',
  },
  zIndex: 3,
});

const slideDown = keyframes({
  from: {
    height: 0,
    opacity: 0,
  },
  to: {
    height: 'var(--radix-accordion-content-height)',
    opacity: 1,
  },
});

const slideUp = keyframes({
  from: {
    height: 'var(--radix-accordion-content-height)',
    opacity: 1,
  },
  to: {
    height: 0,
    opacity: 0,
  },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  animationDuration: '125ms',
  animationTimingFunction: 'ease',
  willChange: 'height, opacity',
  '&[data-state="open"]': {
    animationName: `${slideDown}`,
  },
  '&[data-state="closed"]': {
    animationName: `${slideUp}`,
  },
});

export const Accordion = AccordionPrimitive.Root;
export const AccordionTrigger = Trigger;
export const AccordionContent = Content;
export const AccordionItem = AccordionPrimitive.Item;
