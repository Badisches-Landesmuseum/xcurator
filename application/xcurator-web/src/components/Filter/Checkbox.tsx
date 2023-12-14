import * as Checkbox from '@radix-ui/react-checkbox';
import { styled } from 'src/@3pc/layout-components-react';

export const CheckboxRoot = styled(Checkbox.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: '20px',
  height: '20px',
  border: '2px solid $blue',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:focus-visible': {
    outline: '3px solid $green',
  },
});

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$blue',
  backgroundColor: '$blue',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '> svg': {
    fill: 'white',
  },
});

export const Label = styled('label', {
  fontSize: 15,
  lineHeight: 1,
  color: 'black',
});
