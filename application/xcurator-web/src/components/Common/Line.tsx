import { Box, CSS, VariantProps } from '@3pc/layout-components-react';

interface LineProps {
  color?: 'blue50' | 'blue100' | 'blue200' | 'blue' | 'blueDark' | 'white';
  width?: CSS['width'];
  mt?: VariantProps<typeof Box>['mt'];
}

export const Line = ({ color = 'blue200', width, mt }: LineProps) => (
  <Box
    as="hr"
    mt={mt}
    css={{
      backgroundColor: '$' + color,
      width: width,
      height: '1px',
      border: 'none',
      mx: 'auto',
    }}
  />
);
