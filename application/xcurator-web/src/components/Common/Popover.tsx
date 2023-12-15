import { styled, keyframes } from 'src/@3pc/layout-components-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { forwardRef } from 'react';

const slideUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});
const slideRightAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});
const slideDownAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});
const slideLeftAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(2px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const StyledContent = styled(PopoverPrimitive.Content, {
  position: 'relative',
  zIndex: 10,
  borderRadius: '8px',
  backgroundColor: '$background',
  boxShadow: 'rgb(0 0 0 / 9%) 0px 3px 12px',
  border: '0.5px solid rgb(223, 225, 228)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',

  '&[data-state="open"][data-side="top"]': {
    animationName: `${slideDownAndFade}`,
  },
  '&[data-state="open"][data-side="right"]': {
    animationName: `${slideLeftAndFade}`,
  },
  '&[data-state="open"][data-side="bottom"]': {
    animationName: `${slideUpAndFade}`,
  },
  '&[data-state="open"][data-side="left"]': {
    animationName: `${slideRightAndFade}`,
  },
});

type ContentProps = React.ComponentProps<typeof StyledContent> & {
  children: React.ReactNode;
};

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <PopoverPrimitive.Portal>
        <StyledContent {...props} ref={ref}>
          {children}
        </StyledContent>
      </PopoverPrimitive.Portal>
    );
  }
);

Content.displayName = 'PopoverContent';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = Content;
export const PopoverClose = PopoverPrimitive.Close;

export const PopoverAnchor = PopoverPrimitive.Anchor;
