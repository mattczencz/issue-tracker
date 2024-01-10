export const dynamic = 'force-dynamic';

import prisma from '@/prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueChart from './_components/IssueChart';
import IssueSummary from './_components/IssueSummary';
import LatestIssues from './_components/LatestIssues';
import UserIssues from './_components/UserIssues';

const Dashboard = async ({ searchParams: { page } }: { searchParams: { page: string; }; }) => {
  const total = await prisma.issue.count();
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });



  return (
    <section className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
      <Flex direction="column" gap="6">
        <IssueSummary total={total} open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
      <UserIssues page={page} />
    </section>
  );
};
export default Dashboard;

export const metadata: Metadata = {
  title: 'TrackFlow - Dashboard',
  description: 'View a summary of project issues'
};