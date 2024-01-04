import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className="screen-height"
      gap="4"
    >
      <Heading size={{ initial: "8", md: "9" }}>404</Heading>
      <Text align="center">
        <strong>Uh oh!</strong> We couldn&apos;t find what you were looking for.<br />(In context of bugs... maybe that&apos;s a good thing?)
      </Text>
      <Button asChild mt="2">
        <Link href="/">Back to Home</Link>
      </Button>
    </Flex>
  );
};
export default NotFound;