import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { keyframes, styled, Box, Flex } from '@3pc/layout-components-react';
import { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

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

const StyledContent = styled(DropdownPrimitive.Content, {
  borderRadius: '4px',
  backgroundColor: '$blue50',
  minWidth: '120px',
  width: '100%',
  boxShadow: 'rgb(0 0 0 / 9%) 0px 3px 12px',
  border: '0.5px solid rgb(223, 225, 228)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  zIndex: 99,

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

const StyledItem = styled(DropdownPrimitive.Item, {
  display: 'flex',
  alignItems: 'center',
  height: '30px',
  color: '$blue',
  fontSize: '$small',
  fontWeight: '$regular',
  outline: 'none',

  '&[data-disabled]': {
    color: '$black600',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: '$blue100',
    textDecoration: 'underline',
  },
});

type ContentProps = React.ComponentProps<typeof StyledContent> & {
  children: React.ReactNode;
};

const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <DropdownPrimitive.Portal>
        <StyledContent {...props} ref={ref}>
          {children}
        </StyledContent>
      </DropdownPrimitive.Portal>
    );
  }
);

Content.displayName = 'DropdownContent';

const LinkWrapper = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & LinkProps) => {
  return (
    <Box
      css={{
        width: '100%',
        height: '100%',
        '> a': {
          display: 'block',
          height: '100%',
          width: '100%',
        },
      }}
    >
      <Link {...props}>
        <Flex
          alignItems="center"
          css={{
            px: '$3',
            height: '100%',
            width: '100%',
          }}
        >
          <Flex alignItems="center">{children}</Flex>
        </Flex>
      </Link>
    </Box>
  );
};

export const DropdownButton = styled('button', {
  border: 'unset',
  outline: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  px: '$3',
  m: 0,
  backgroundColor: 'unset',
  color: '$blue',
  fontSize: 'unset',
  fontFamily: 'unset',
  cursor: 'pointer',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:hover': {
    borderColor: '$blue',
  },

  '&:active, &[data-state="open"]': {
    borderColor: '$blue',
  },

  '&[disabled]': {
    cursor: 'default',
    color: '$black600',
  },
});

export const Dropdown = DropdownPrimitive.Root;
export const DropdownTrigger = DropdownPrimitive.Trigger;
export const DropdownContent = Content;
export const DropdownItem = StyledItem;
export const DropdownLink = LinkWrapper;
