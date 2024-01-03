import { Suspense } from 'react';
import IssueActions from './_components/IssueActions';
import IssuesTable from './_components/IssuesTable';
import IssuesTableSkeleton from './_components/IssuesTableSkeleton';
import { Issue, Status } from '@prisma/client';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
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