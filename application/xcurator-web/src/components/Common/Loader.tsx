import { Box, Flex } from '@3pc/layout-components-react';
import { Text } from 'src/components/Common/Text';

const loaderStyles = {
  width: '80px',
  height: '80px',
  margin: '20px',
  border: '5px solid #666',
  borderRadius: '50%',
  display: 'inline-block',
  position: 'relative',
  animation: 'spin 1s linear infinite', // Use a unique animation name here
};

const Loader = () => {
  return (
    <>
      <Flex flexDirection="column" alignItems="center">
        <Text size="large" weight="bold">
          Loading...
        </Text>
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        <Box css={loaderStyles}>
          <Box
            css={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '5px solid transparent',
              borderBottomColor: '$blue',
              borderRadius: '50%',
              width: '65px',
              height: '65px',
            }}
          ></Box>
        </Box>
      </Flex>
    </>
  );
};

export default Loader;
