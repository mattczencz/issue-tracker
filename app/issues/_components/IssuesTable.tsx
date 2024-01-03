import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { TextLink, IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import Link from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

type TableColumn = {
  label: string;
  value: keyof Issue;
  className?: string;
};

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const IssuesTable = async ({ searchParams }: Props) => {
  const columns: TableColumn[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const issues = await prisma.issue.findMany({
    where: { status }
  });

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell key={column.value}>
              <Link href={{ query: { ...searchParams, orderBy: column.value } }}>
                {column.label}
              </Link>
              {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" height="12px" />}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <TextLink href={`/issues/${issue.id}`}>
                {issue.title}
              </TextLink>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
export default IssuesTable;