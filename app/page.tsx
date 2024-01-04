import { Pagination } from './components';

export default function Home({ searchParams }: { searchParams: { page: string; }; }) {
  return (
    <main>
      <h1>Hello World!</h1>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </main>
  );
}
