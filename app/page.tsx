import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { TbPointerSearch } from 'react-icons/tb';

export default function Home() {
  return (
    <Flex direction="column" justify="center" align="center" gap="6" className="screen-height">
      <Heading size="9" align="center" className="flex flex-col items-center gap-6">
        <TbPointerSearch />
        TrackFlow
      </Heading>
      <Text align="center" className="max-w-4xl">Supercharge collaboration, streamline tasks, and achieve milestones seamlessly. TrackFlow brings simplicity to project management, making progress tracking a breeze. Elevate your productivity today!</Text>
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