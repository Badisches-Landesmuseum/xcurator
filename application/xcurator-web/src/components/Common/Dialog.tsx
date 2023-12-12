import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogContentProps } from '@radix-ui/react-dialog';
import { VariantProps, styled, keyframes } from '@3pc/layout-components-react';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.6 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: 'black',
  zIndex: 10,
  opacity: 0.6,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  zIndex: 10,
  backgroundColor: 'white',
  borderRadius: '19px',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '740px',
  maxHeight: '85vh',
  padding: '25px',
  height: '100%',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },

  '@bp2': {
    padding: '40px',
  },

  variants: {
    small: {
      true: {
        maxWidth: '450px',
        height: 'fit-content',
        maxHeight: '85vh',
        padding: 0,
      },
    },
    dark: {
      true: {
        backgroundColor: '#00198A',
        padding: '30px',
        color: '$white',
        boxShadow:
          'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
      },
    },
  },
});

function Content({
  children,
  small,
  ...props
}: { children: React.ReactNode } & DialogContentProps &
  VariantProps<typeof StyledContent>) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent small={small} {...props}>
        {children}
      </StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$text',
  fontSize: '$xxlarge',
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '16px 0 24px',
  color: '$text',
  fontSize: '$normal',
  lineHeight: 1.5,
});

// Exports
export const BottomOverlay = DialogPrimitive.Overlay;
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;
