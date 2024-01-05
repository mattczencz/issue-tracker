import { Box, Flex, Heading } from '@radix-ui/themes';
import { TbPointerSearch } from 'react-icons/tb';

const LoadingMessage = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className="screen-height"
      gap="4"
    >
      <Box className="text-4xl animate-bounce">
        <TbPointerSearch />
      </Box>
      <Heading>Loading...</Heading>
    </Flex>
  );
};
export default LoadingMessage;