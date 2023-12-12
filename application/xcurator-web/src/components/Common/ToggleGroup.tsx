import { styled } from '@3pc/layout-components-react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

export const ToggleGroupItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '25px',
  width: 'auto',
  padding: '0 8px',
  fontSize: '$xsmall',
  lineHeight: 1,
  borderRadius: '2px',
  border: '1px solid $blue',
  userSelect: 'none',

  '&:hover': {
    backgroundColor: '$blue50',
  },

  '&:focus-visible': {
    outline: '3px solid $green',
  },

  '&[data-state="on"]': {
    backgroundColor: '$blue',
    color: '$white',
  },
});

export const ToggleGroup = ToggleGroupPrimitive.Root;
