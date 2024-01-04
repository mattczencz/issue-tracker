import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './_components/IssueChart';
import IssueSummary from './_components/IssueSummary';
import LatestIssues from './_components/LatestIssues';

const Dashboard = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="6">
      <Flex direction="column" gap="6">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};
export default Dashboard;