import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';

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
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};
export default IssueDetailPage;