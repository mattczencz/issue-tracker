import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';
import DeleteIssueButton from './_components/DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './_components/AssigneeSelect';
import { Metadata } from 'next';

interface Props {
  params: { id: string; };
}

const IssueDetailPage = async ({ params }: Props) => {
  const parsedId = parseInt(params.id);
  const session = await getServerSession(authOptions);

  if (isNaN(parsedId)) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parsedId }
  });

  if (!issue)
    notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="6">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};
export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

  return {
    title: `Issue #${issue?.id} - ${issue?.title}`,
    description: 'Details of issue ' + issue?.id
  };
}