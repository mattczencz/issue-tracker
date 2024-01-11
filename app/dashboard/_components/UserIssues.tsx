import { IssueStatusBadge, Pagination } from '@/app/components';
import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const UserIssues = async ({ page }: { page: string; }) => {
  const session = await getServerSession();
  const parsedPage = parseInt(page) || 1;
  const pageSize = 6;
  const where = { assignedToUser: { email: session?.user?.email } };

  if (!session) return null;

  const issues = await prisma.issue.findMany({
    where,
    skip: (parsedPage - 1) * pageSize,
    take: pageSize,
    include: { assignedToUser: true }
  });

  const totalIssues = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4" className="col-span-2">
      <Heading>My Issues</Heading>
      {issues.length ? (
        <Flex direction="column" gap="4">
          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6">
            {issues.map(issue => (
              <Card asChild key={issue.id}>
                <Link href={`/issues/${issue.id}`}>
                  <Flex direction="column" gap="2" align="start">
                    <Avatar src={issue.assignedToUser?.image || undefined} fallback="?" radius="full" />
                    <Text className="font-medium">{issue.title}</Text>
                    <IssueStatusBadge status={issue.status} />
                    <Text mt="2" size="1">Created on: {issue.createdAt.toLocaleDateString()}</Text>
                    <Text className="line-clamp-2">{issue.description}</Text>
                  </Flex>
                </Link>
              </Card>
            ))}
          </Grid>
          <Pagination pageSize={pageSize} currentPage={parsedPage} itemCount={totalIssues} />
        </Flex>
      ) : (
        <Flex>
          <Text>You aren&apos;t currently assigned to any issues.</Text>
        </Flex>
      )}
    </Flex>
  );
};
export default UserIssues;