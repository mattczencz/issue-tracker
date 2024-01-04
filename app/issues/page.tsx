import { Suspense } from 'react';
import IssueActions from './_components/IssueActions';
import IssuesTable from './_components/IssuesTable';
import IssuesTableSkeleton from './_components/IssuesTableSkeleton';
import { Issue, Status } from '@prisma/client';
import { Metadata } from 'next';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuesPage = ({ searchParams }: Props) => {
  return (
    <div>
      <IssueActions />
      <Suspense fallback={<IssuesTableSkeleton />}>
        <IssuesTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
};
export default IssuesPage;

export const metadata: Metadata = {
  title: 'TrackFlow - Issues',
  description: 'View all project issues'
};