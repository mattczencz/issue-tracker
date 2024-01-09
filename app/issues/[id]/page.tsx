import prisma from '@/prisma/client';
import { Box, Card, Flex, Grid, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';
import DeleteIssueButton from './_components/DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './_components/AssigneeSelect';
import { cache } from 'react';
import StatusSelector from './_components/StatusSelector';

interface Props {
  params: { id: string; };
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params }: Props) => {
  const parsedId = parseInt(params.id);
  const session = await getServerSession(authOptions);

  if (isNaN(parsedId)) notFound();

  const issue = await fetchIssue(parsedId);

  if (!issue)
    notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="6">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Card>
          <Flex direction="column" gap="5">
            <Flex direction="column" gap="2">
              <Text size="1" className="font-semibold">Assigned to</Text>
              <AssigneeSelect issue={issue} />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="1" className="font-semibold">Issue status</Text>
              <StatusSelector issue={issue} />
            </Flex>
            <Flex direction="column" gap="4">
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Flex>
        </Card>
      )}
    </Grid>
  );
};
export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: `Issue #${issue?.id} - ${issue?.title}`,
    description: 'Details of issue ' + issue?.id
  };
}