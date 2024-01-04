import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <Flex mb="6" justify="between">
      <IssueStatusFilter />
      <Link href="/issues/new">
        <Button className="hover:cursor-pointer">New Issue</Button>
      </Link>
    </Flex>
  );
};
export default IssueActions;