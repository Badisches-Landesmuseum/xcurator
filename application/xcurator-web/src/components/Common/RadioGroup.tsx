import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Flex, styled } from 'src/@3pc/layout-components-react';
import * as React from 'react';

function Item({
  value,
  children,
  ...props
}: {
  value: string;
  children: React.ReactNode;
} & RadioGroupPrimitive.RadioGroupItemProps) {
  return (
    <Flex alignItems="center" justifyContent="center" gap="2">
      <RadioItem value={value} {...props}>
        <RadioGroupIndicator />
      </RadioItem>
      {children}
    </Flex>
  );
}

const RadioItem = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  width: '25px',
  height: '25px',
  border: '1.5px solid',
  borderColor: '$blue',
  borderRadius: '50%',
  flexShrink: 0,

  '&:hover': {
    backgroundColor: '$blue100',
  },
});

const RadioGroupIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',

  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    border: '5px solid',
    borderColor: '$blue',
    borderRadius: '100%',
    backgroundColor: '$blue50',
  },
});

const StyledRadioGroup = styled(RadioGroupPrimitive.Root, {
  width: '100%',
});

export const RadioGroup = StyledRadioGroup;
export const RadioGroupItem = Item;
