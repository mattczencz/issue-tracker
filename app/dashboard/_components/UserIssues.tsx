import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const UserIssues = async () => {
  const session = await getServerSession();

  if (!session) return null;

  const issues = await prisma.issue.findMany({
    where: {
      assignedToUser: { email: session?.user?.email }
    },
    include: {
      assignedToUser: true
    }
  });

  return (
    <Flex direction="column" gap="4" className="col-span-2">
      <Heading>My Issues</Heading>
      {issues ? (
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
      ) : (
        <Flex>
          <Text>You aren&aps;t currently assigned to any issues.</Text>
        </Flex>
      )}
    </Flex>
  );
};
export default UserIssues;