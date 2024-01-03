import { Suspense } from 'react';
import IssueActions from './_components/IssueActions';
import IssuesTable from './_components/IssuesTable';
import IssuesTableSkeleton from './_components/IssuesTableSkeleton';
import { Status } from '@prisma/client';

interface Props {
  searchParams: {
    status: Status;
  };
}

const IssuesPage = ({ searchParams }: Props) => {
  return (
    <div>
      <IssueActions />
      <Suspense fallback={<IssuesTableSkeleton />}>
        <IssuesTable filter={searchParams.status} />
      </Suspense>
    </div>
  );
};
export default IssuesPage;