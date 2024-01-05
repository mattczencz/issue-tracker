import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { TbPointerSearch } from 'react-icons/tb';

export default function Home() {
  return (
    <Flex direction="column" align="center" py="9" gap="6">
      <Heading size="9" className="flex flex-col items-center gap-4">
        <TbPointerSearch />
        TrackFlow
      </Heading>
      <Text align="center" className="max-w-4xl">Keep your projects on the fast track to success with TrackFlow, the intuitive task tracking app designed to streamline your workflow and boost productivity.</Text>
      <Flex gap="4">
        <Button asChild variant="outline">
          <Link href="/dashboard">View the Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/issues">View current Issues</Link>
        </Button>
      </Flex>
    </Flex>
  );
}