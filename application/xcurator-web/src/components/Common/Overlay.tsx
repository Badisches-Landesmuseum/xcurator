import { keyframes, styled } from '@3pc/layout-components-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
});

const slideUpCenter = keyframes({
  '0%': { transform: 'translate(-50%, 100%)' },
  '100%': { transform: 'translate(-50%, 0)' },
});

const slideRight = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(0)' },
});

const StyledContent = styled(DialogPrimitive.Content, {
  zIndex: 10,
  backgroundColor: 'white',
  borderRadius: '$3',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100vw',
  height: '100svh',
  overflow: 'auto',

  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${slideUp} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
    // for minimizing animation
    transitionProperty: 'transform',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },

  '&:focus': { outline: 'none' },

  '@media(min-width: 968px)': {
    animationName: `${slideRight}`,
    width: '470px',
    height: 'calc(100svh - 53px)',
    top: '53px',
    borderRight: '1px solid',
    borderColor: '$blue100',
  },

  variants: {
    minimize: {
      true: {
        transform: 'translateY(calc(100svh - 46px))',
        '@media(min-width: 968px)': {
          transform: 'none',
        },
      },
    },
  },
});

const StyledCenterContent = styled(DialogPrimitive.Content, {
  zIndex: 10,
  backgroundColor: 'white',
  borderRadius: '$3',
  position: 'fixed',
  top: '8px',
  bottom: '8px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100vw - 16px)',
  height: 'calc(100vh - 16px)',
  overflow: 'auto',
  maxWidth: '470px',

  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${slideUpCenter} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },

  '&:focus': { outline: 'none' },
});

function Content({
  children,
  minimize,
  ...props
}: {
  children: React.ReactNode;
  minimize?: boolean;
} & DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      {minimize ? null : <StyledOverlay />}
      <StyledContent {...props} minimize={minimize}>
        {children}
      </StyledContent>
    </DialogPrimitive.Portal>
  );
}

function CenterContent({
  children,
  ...props
}: {
  children: React.ReactNode;
} & DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledCenterContent {...props}>{children}</StyledCenterContent>
    </DialogPrimitive.Portal>
  );
}

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.6 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$text',
  zIndex: 1,
  opacity: 0.6,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export const Overlay = DialogPrimitive.Root;
export const OverlayTrigger = DialogPrimitive.Trigger;
export const OverlayClose = DialogPrimitive.Close;
export const OverlayContent = Content;
export const OverlayCenterContent = CenterContent;
