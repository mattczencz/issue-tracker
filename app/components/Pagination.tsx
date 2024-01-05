'use client';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="4">
      <Button className="hover:enabled:cursor-pointer" variant="ghost" disabled={currentPage === 1} onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button className="hover:enabled:cursor-pointer" variant="ghost" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Text size="2">Page {currentPage} of {pageCount}</Text>
      <Button className="hover:enabled:cursor-pointer" variant="ghost" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button className="hover:enabled:cursor-pointer" variant="ghost" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};
export default Pagination;