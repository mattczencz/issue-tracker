'use client'; // Error components must be Client Components

import { Flex, Heading, Button, Text } from '@radix-ui/themes';
import { useEffect } from 'react';
import { AiFillBug } from 'react-icons/ai';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className="screen-height"
      gap="4"
    >
      <Heading size={{ initial: "8", md: "9" }} align="center" className="flex items-center gap-2">
        Ah! Bugs! <span className="animate-pulse inline-block"><AiFillBug /></span>
      </Heading>
      <Text align="center">
        <strong>Oops!</strong> Something went wrong. But don't worry! Let's try again.
      </Text>
      <Button className="hover:cursor-pointer" mt="2" onClick={() => reset()}>
        Try again
      </Button>
    </Flex>
  );
}