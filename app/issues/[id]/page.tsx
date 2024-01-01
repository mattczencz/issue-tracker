import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';

interface Props {
  params: { id: string; };
}

const IssueDetailPage = async ({ params }: Props) => {
  const parsedId = parseInt(params.id);

  if (isNaN(parsedId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parsedId }
  });

  if (!issue)
    notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="4">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};
export default IssueDetailPage;