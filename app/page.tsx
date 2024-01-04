import { Heading } from '@radix-ui/themes';
import { Metadata } from 'next';

export default function Home() {
  return (
    <Heading>Hello World!</Heading>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Track all of your issues with ease'
};
