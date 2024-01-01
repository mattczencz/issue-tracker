import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './_components/EditIssueButton';
import IssueDetails from './_components/IssueDetails';

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
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};
export default IssueDetailPage;