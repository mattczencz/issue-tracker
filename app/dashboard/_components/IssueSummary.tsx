import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

type TIssueSummary = {
  label: string;
  value: number;
  status: Status;
};

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: TIssueSummary[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    // TODO: Refactor to make the card the link so entire element is clickable
    <Flex gap="4">
      {containers.map(({ label, status, value }) => (
        <Card key={label}>
          <Flex direction="column" gap="2">
            <Link href={`/issues?status=${status}`} className="font-medium text-sm">{label}</Link>
            <Text size="4" className="font-bold">{value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};
export default IssueSummary;