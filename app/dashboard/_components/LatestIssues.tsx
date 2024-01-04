import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import { IssueStatusBadge } from '../../components';
import Link from 'next/link';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true
    }
  });

  return (
    <Card>
      <Heading size="4" mb="6">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell className="hover:bg-gray-50">
                <Link href={`/issues/${issue.id}`}>
                  <Flex justify="between" align="center">
                    <Flex direction="column" align="start" gap="2">
                      {issue.title}
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar src={issue.assignedToUser.image!} fallback="?" size="2" radius="full" />
                    )}
                  </Flex>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
export default LatestIssues;