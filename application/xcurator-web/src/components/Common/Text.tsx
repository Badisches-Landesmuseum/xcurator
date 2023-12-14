import * as React from 'react';
import { styled, VariantProps, CSS } from 'src/@3pc/layout-components-react';
import useText from './use-text';

const Text = React.forwardRef<
  HTMLParagraphElement,
  TextProps<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span'>
>(
  (
    {
      children,
      as = 'p',
      size = 'small',
      truncate = false,
      capsize = true,
      weight = 'regular',
      italic,
      css,
      ...props
    },
    ref
  ) => {
    const shouldCapsize = capsize && !css?.fontSize;
    const textStyles = useText(size, shouldCapsize);

    return (
      <StyledText
        as={as}
        weight={weight}
        truncate={truncate}
        italic={italic}
        size={size}
        css={{
          ...textStyles,
          ...css,
        }}
        {...props}
        ref={ref}
      >
        {truncate ? <span>{children}</span> : children}
      </StyledText>
    );
  }
);

export type TextProps<T extends React.ElementType> = {
  children?: React.ReactNode;
  className?: string;
  as?: T;
  size?: VariantProps<typeof StyledText>['size'];
  weight?: VariantProps<typeof StyledText>['weight'];
  truncate?: VariantProps<typeof StyledText>['truncate'];
  italic?: VariantProps<typeof StyledText>['italic'];
  color?: VariantProps<typeof StyledText>['color'];
  capsize?: boolean;
  css?: CSS;
  onClick?: () => void;
};

// exported for use-text.ts and use-text.test.ts
export const StyledText = styled('p', {
  margin: 0,
  fontFamily: 'inherit',
  boxSizing: 'border-box',

  variants: {
    size: {
      xsmall: {
        fontSize: '$fontSizes$xsmall',
        lineHeight: 1.375,
      },
      small: {
        fontSize: '$fontSizes$small',
        lineHeight: 1.375,
      },
      normal: {
        fontSize: '$fontSizes$normal',
        lineHeight: 1.215,
      },
      large: {
        fontSize: '$fontSizes$large',
        lineHeight: 1.215,
      },
      xlarge: {
        fontSize: '$fontSizes$xlarge',
        lineHeight: 1.215,
      },
      xxlarge: {
        fontSize: '$fontSizes$xxlarge',
        lineHeight: 1.215,
      },
      xxxlarge: {
        fontSize: '$fontSizes$xxxlarge',
        lineHeight: 1.215,
      },
    },
    weight: {
      regular: {
        fontWeight: '$fontWeights$regular',
      },
      medium: {
        fontWeight: '$fontWeights$medium',
      },
      semiBold: {
        fontWeight: '$fontWeights$semiBold',
      },
      bold: {
        fontWeight: '$fontWeights$bold',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    truncate: {
      true: {
        '& > span': {
          display: 'block',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
    color: {
      text: {
        color: '$text',
      },
      white: {
        color: '$white',
      },
      green: {
        color: '$green',
      },
      blue: {
        color: '$blue',
      },
      blue50: {
        color: '$blue50',
      },
      blue100: {
        color: '$blue100',
      },
      blue200: {
        color: '$blue200',
      },
      blueDark: {
        color: '$blueDark',
      },
      black50: {
        color: '$black50',
      },
      black100: {
        color: '$black100',
      },
      black300: {
        color: '$black300',
      },
      black600: {
        color: '$black600',
      },
      black: {
        color: 'black',
      },
    },
  },
});

Text.displayName = 'Text';
export { Text };
