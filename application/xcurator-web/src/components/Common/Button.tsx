import { styled } from 'src/@3pc/layout-components-react';
import Link from 'next/link';

export const Button = styled('button', {
  all: 'unset',
  height: '28px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2',
  px: '12px',
  lineHeight: 1,
  fontWeight: '$regular',
  color: '$white',
  backgroundColor: '$blue',
  textAlign: 'center',
  border: '1px solid $blue',
  cursor: 'pointer',
  userSelect: 'none',

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&[disabled]': {
    cursor: 'default',
    color: '$black600',
    backgroundColor: '$black100',
    borderColor: '$black100',
  },

  '@bp2': {
    height: '35px',
  },

  variants: {
    variant: {
      default: {
        '&:hover:not([disabled])': {
          backgroundColor: '$blueDark',
          borderColor: '$blueDark',
        },
      },
      secondary: {
        color: '$blue',
        backgroundColor: '$blue100',
        fontSize: '$small',
        border: 'none',
        '&:hover': {
          color: 'white',
          backgroundColor: '$blueDark',
        },
        '&[disabled]': {
          color: '$black600',
          backgroundColor: '$black100',
          borderColor: '$black100',
        },
      },
      icon: {
        color: 'black',
        backgroundColor: 'transparent',
        border: 'none',
        '&:hover': {
          color: '$blueDark',
        },
        '&:active': {
          color: '$blueDark',
        },
        '&[disabled]': {
          color: '$black600',
        },
      },
      hero: {
        color: 'white',
        backgroundColor: '$blueDark',
        height: '14px',
        padding: '18px 28px 18px 28px',
        '&:hover': {
          backgroundColor: '$blueDark',
        },
        '&[disabled]': {
          color: '$black600',
          backgroundColor: '$black100',
          borderColor: '$black100',
        },
      },
      'ghost-dark': {
        color: 'black',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover': {
          color: 'black',
          backgroundColor: '$black50',
          borderColor: '$black50',
        },
        '&:active': {
          backgroundColor: '$black100',
          borderColor: '$black100',
        },
        '&[disabled]': {
          color: '$black600',
          backgroundColor: '$black100',
          borderColor: '$black100',
        },
      },
      ghost: {
        color: '$blue',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover:not([disabled])': {
          color: '$blueDark',
          borderColor: '$blueDark',
        },
        '&:active:not([disabled])': {
          backgroundColor: '$blue100',
          borderColor: '$blueDark',
        },
        '&[disabled]': {
          color: '$black600',
        },
      },
      'ghost-blue': {
        color: 'white',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        '&:hover:not([disabled])': {
          backgroundColor: '$blue',
          borderColor: '$blue',
        },
        '&:active:not([disabled])': {
          color: '$blue200',
          backgroundColor: '$blueDark',
          borderColor: '$blue',
        },
        '&[disabled]': {
          color: '$black600',
          backgroundColor: '$black100',
          borderColor: '$black100',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const ButtonLink = styled(Link, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '30px',
  px: '16px',
  borderRadius: '$2',
  fontSize: '$normal',
  lineHeight: 1,
  fontWeight: '$regular',
  color: '$white',
  backgroundColor: '$blue',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    backgroundColor: '$blue',
  },
  '&:active': {
    backgroundColor: '$blue200',
  },
});

export const FooterButton = styled('button', {
  all: 'unset',
  height: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2',
  px: '16px',
  fontSize: '$normal',
  lineHeight: 1,
  fontWeight: '$regular',
  color: '$white',
  backgroundColor: '$blue',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    backgroundColor: '$blue',
  },
  '&:active': {
    backgroundColor: '$blue200',
  },
});
