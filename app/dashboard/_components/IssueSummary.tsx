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
    <Flex gap="4">
      {containers.map(({ label, status, value }) => (
        <Card asChild key={label}>
          <Link href={`/issues?status=${status}`}>
            <Flex direction="column" gap="2">
              <Text size="3" className="font-medium">{label}</Text>
              <Text size="4" className="font-bold">{value}</Text>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};
export default IssueSummary;