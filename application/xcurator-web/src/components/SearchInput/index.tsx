import { Box, Flex, styled } from '@3pc/layout-components-react';
import React, { forwardRef } from 'react';
import { SearchIcon } from 'src/icons';

const InputField = styled('input', {
  '&::placeholder': {
    color: '$black600',
    fontSize: '1rem',
  },
  fontSize: '1rem',
  height: '36px',
  border: 'none',
  outline: 'none',
  width: '150px',
  p: 0,

  '@bp2': {
    width: '300px',
  },
});

const SearchInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <Flex alignItems="center">
      <Box
        css={{
          mx: '$2',
          height: '22px',
          width: '22px',
          flexShrink: 0,
          color: '$blueDark',
        }}
      >
        <SearchIcon aria-hidden="true" width="22px" height="20px" />
      </Box>
      <InputField ref={ref} type="text" {...props} />
    </Flex>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
