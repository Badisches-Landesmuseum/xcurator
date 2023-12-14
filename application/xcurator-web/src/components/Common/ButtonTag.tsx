import { forwardRef } from 'react';
import { Flex, styled, VariantProps } from 'src/@3pc/layout-components-react';
import { Text } from './Text';
import { CrossIcon, KiIcon } from 'src/icons';

type ButtonTagProps = {
  variant?: VariantProps<typeof StyledButtonTag>['variant'];
  isActive?: VariantProps<typeof StyledButtonTag>['isActive'];
  children?: React.ReactNode;
};

export const ButtonTag = forwardRef<
  HTMLButtonElement,
  ButtonTagProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ isActive, variant, children, ...restProps }, ref) => {
  return (
    <StyledButtonTag
      isActive={isActive}
      variant={variant}
      {...restProps}
      ref={ref}
    >
      {variant === 'ai' ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          css={{
            display: 'inline-flex',
            mr: '$1',
          }}
        >
          <KiIcon height="13" width="13" />
        </Flex>
      ) : null}
      <Text size="xsmall">{children}</Text>
      {isActive ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          css={{
            display: 'inline-flex',
            ml: '$1',
          }}
        >
          <CrossIcon height="13" width="13" color="white" />
        </Flex>
      ) : null}
    </StyledButtonTag>
  );
});

ButtonTag.displayName = 'ButtonTag';

const StyledButtonTag = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '25px',
  p: 0,
  px: '10px',
  border: '1px solid',
  borderColor: '#E6E7FF',
  borderRadius: '15px',
  backgroundColor: 'transparent',
  textAlign: 'center',
  userSelect: 'none',
  fontSize: '$small',
  color: '$blueDark',
  cursor: 'default',
  transitionProperty: 'color, border-color, background-color',
  transitionDuration: '150ms',
  transitionTimingFunction: '$easings$out',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&:disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },

  variants: {
    isActive: {
      true: {
        color: 'white',
        backgroundColor: '$blueDark',
        borderColor: '#5B00FF',
      },
    },
    variant: {
      ai: {
        color: '#C500D7',
        backgroundColor: 'transparent',
        borderColor: '#F2E6FB',
      },
    },
  },

  compoundVariants: [
    {
      isActive: true,
      variant: 'ai',
      css: {
        color: 'white',
        backgroundColor: '#C500D7',
        borderColor: '#C500D7',
      },
    },
  ],

  default: {
    active: true,
  },
});
