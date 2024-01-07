import { Issue, Status } from '@prisma/client';
import { Flex, Button, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

type TSortingOption = {
  label: string;
  value: string;
  color: 'indigo' | 'orange' | 'crimson';
};

const SortingButtons = ({ searchParams }: Props) => {
  const options: TSortingOption[] = [
    { label: 'Issue', value: 'title', color: 'indigo', },
    { label: 'Status', value: 'status', color: 'orange' },
    { label: 'Created', value: 'createdAt', color: 'crimson' },
  ];

  return (
    <Flex
      gap="4"
      mb="4"
      align={{ initial: "start", md: "center" }}
      direction={{ initial: "column", md: "row" }}
    >
      <Text>Order by:</Text>
      <Flex gap="3" wrap="wrap">
        {options.map(option => (
          <Button
            asChild
            key={option.value}
            size="1"
            variant="outline"
            color={option.color}
            className="hover:cursor-pointer"
          >
            <Link href={{ query: { ...searchParams, orderBy: option.value } }}>
              {option.label}
            </Link>
          </Button>
        ))}
        <Button
          asChild
          size="1"
          variant="outline"
          className="hover:cursor-pointer"
          color="gray"
        >
          <Link href={{ query: { ...searchParams, orderBy: null } }}>
            Clear Sorting
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
};
export default SortingButtons;