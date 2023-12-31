import { Suspense } from 'react';
import IssueActions from './_components/IssueActions';
import IssuesTable from './_components/IssuesTable';
import IssuesTableSkeleton from './_components/IssuesTableSkeleton';

const IssuesPage = () => {
  return (
    <div>
      <IssueActions />
      <Suspense fallback={<IssuesTableSkeleton />}>
        <IssuesTable />
      </Suspense>
    </div>
  );
};
export default IssuesPage;