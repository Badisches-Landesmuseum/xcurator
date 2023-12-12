import { globalCss } from '@3pc/layout-components-react';

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Cabin',
      fontStyle: 'normal',
      fontWeight: '400',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_Regular.woff2') format('woff2')",
    },
    {
      fontFamily: 'Cabin',
      fontStyle: 'italic',
      fontWeight: '400',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_Italic.woff2') format('woff2')",
    },
    {
      fontFamily: 'Cabin',
      fontStyle: 'normal',
      fontWeight: '500',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_Medium.woff2') format('woff2')",
    },
    {
      fontFamily: 'Cabin',
      fontStyle: 'italic',
      fontWeight: '500',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_MediumItalic.woff2') format('woff2')",
    },
    {
      fontFamily: 'Cabin',
      fontStyle: 'normal',
      fontWeight: '600',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_SemiBold.woff2') format('woff2')",
    },
    {
      fontFamily: 'Cabin',
      fontStyle: 'italic',
      fontWeight: '600',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_SemiBoldItalic.woff2') format('woff2')",
    },
    {
      fontFamily: 'Cabin',
      fontStyle: 'normal',
      fontWeight: '700',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_Bold.woff2') format('woff2')",
    },
    {
      fontFamily: 'Cabin',
      fontStyle: 'italic',
      fontWeight: '700',
      fontDisplay: 'swap',
      src: "url('/fonts/Cabin_BoldItalic.woff2') format('woff2')",
    },
  ],

  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily: '$text',
    fontSize: '16px',
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },

  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',

    '&:focus-visible': {
      outline: '3px solid $green',
    },
  },

  'a.text-link': {
    color: '$blue',
    transitionProperty: 'color',
    transitionDuration: '100ms',
    transitionTimingFunction: '$easings$out',

    '&:hover': {
      color: '$blue',
    },
  },

  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    clip: 'rect(0, 0, 0, 0)',
    border: 0,
  },

  pre: {
    width: '100%',
    fontSize: '11px',
    lineHeight: '1.25',
  },

  'mark[data-entity-type]': {
    position: 'relative',
    color: 'inherit',
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  'mark[data-entity-type] > button': {
    all: 'unset',
    pl: '15px',
    position: 'relative',
    cursor: 'pointer',
  },

  'mark[data-entity-type] > button::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    transitionProperty: 'transform',
    transitionDuration: '200ms',
    transitionTimingFunction: '$easings$out',
    transform: 'scaleY(0.2)',
    transformOrigin: 'bottom',
    borderRadius: '2px',
    zIndex: -1,
    backgroundColor: '$blue100',
  },

  '.xcurator-dark mark[data-entity-type] > button::before': {
    backgroundColor: '$black600',
  },

  'mark[data-entity-type] > button .icon-wrapper': {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-37%)',
  },

  'mark[data-entity-type] > button[disabled]': {
    cursor: 'default',
  },

  'mark[data-entity-type] > button:disabled::before': {
    backgroundColor: '$black300',
  },

  'mark[data-entity-type] > button:not([disabled]):hover::before': {
    transform: 'scaleY(1)',
  },
});
