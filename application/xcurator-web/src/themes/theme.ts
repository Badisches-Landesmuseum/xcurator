import { createTheme } from 'src/@3pc/layout-components-react';

export const colors = {
  white: '#fff',
  blue50: '#f2f5ff',
  blue100: '#e5eaff',
  blue200: '#ccd5ff',
  blue: '#002fff',
  blueDark: '#0025c2',
  blue900: '#000E4E ',

  black50: '#f2f2f2',
  black100: '#e6e6e6',
  black300: '#cccccc',
  black600: '#666666',

  purple100: '#f2e6fb',
  purple: '#c500d7',

  green: '#00CC66',
};

export const baseTheme = {
  breakpoints: { 0: '600px', 1: '768px', 2: '992px', 3: '1200px', 4: '1440px' },
  fonts: {
    text: 'Cabin, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  fontSizes: {
    xsmall: '14px',
    small: '16px',
    normal: '18px',
    large: '22px',
    xlarge: '24px',
    xxlarge: '26px',
    xxxlarge: '36px',
  },
  easings: { out: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
};

export const theme = createTheme('xcurator', {
  ...baseTheme,
  colors: {
    ...colors,
    background: '#fff',
    text: '#000',
  },
});

export const darkTheme = createTheme('xcurator-dark', {
  ...baseTheme,
  colors: {
    ...colors,
    background: '#000',
    text: '#fff',
  },
});

export const fontMetrics = {
  ascent: 1930,
  descent: -500,
  lineGap: 0,
  unitsPerEm: 2000,
  capHeight: 1400,
};

// Reference custom theme so it will get passed to getCssText
// https://github.com/stitchesjs/stitches/issues/738
theme.className;
