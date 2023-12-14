import { createStyleObject } from '@capsizecss/core';
import { StyledText } from './Text';
import { fontMetrics, theme } from 'src/themes/theme';
import { VariantProps, CSS } from 'src/@3pc/layout-components-react';

const useText = (
  size: VariantProps<typeof StyledText>['size'],
  capsize = true
) => {
  if (!size || !capsize) return null;
  if (typeof size === 'string') {
    const fontSize = fontSizeNameToValue(size);
    const leading = fontSizeNameToLeading(size);
    const styleObject = createStyleObject({
      fontSize,
      leading: fontSize * leading,
      fontMetrics,
    });
    return {
      '&::before': styleObject['::before'],
      '&::after': styleObject['::after'],
    };
  }

  const result: CSS = {};

  for (const [key, value] of Object.entries(size)) {
    if (!value) continue;
    const fontSize = fontSizeNameToValue(value);
    const leading = fontSizeNameToLeading(value);
    const styleObject = createStyleObject({
      fontSize,
      leading: fontSize * leading,
      fontMetrics,
    });
    if (key === '@initial') {
      result['&::before'] = styleObject['::before'];
      result['&::after'] = styleObject['::after'];
    } else {
      result[key] = {
        '&::before': styleObject['::before'],
        '&::after': styleObject['::after'],
      };
    }
  }

  return result;
};

function fontSizeNameToValue(name: keyof typeof theme.fontSizes) {
  return name === 'xxxlarge'
    ? parseInt(theme.fontSizes.xxxlarge.value)
    : name === 'xxlarge'
    ? parseInt(theme.fontSizes.xxlarge.value)
    : name === 'xlarge'
    ? parseInt(theme.fontSizes.xlarge.value)
    : name === 'large'
    ? parseInt(theme.fontSizes.large.value)
    : name === 'normal'
    ? parseInt(theme.fontSizes.normal.value)
    : name === 'small'
    ? parseInt(theme.fontSizes.small.value)
    : parseInt(theme.fontSizes.xsmall.value);
}

function fontSizeNameToLeading(name: keyof typeof theme.fontSizes) {
  return name === 'xxxlarge'
    ? 1.215
    : name === 'xxlarge'
    ? 1.215
    : name === 'xlarge'
    ? 1.215
    : name === 'large'
    ? 1.215
    : name === 'normal'
    ? 1.215
    : name === 'small'
    ? 1.375
    : name === 'xsmall'
    ? 1.375
    : 1.375;
}

export default useText;
