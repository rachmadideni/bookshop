"use client";

import Books from "@/features/books";
import BookFilter from "@/components/book-filter";
import useInfiniteBooks from "@/hooks/useInfiniteBooks";

export default function Home() {
  const infiniteQueries = useInfiniteBooks();

  return (
    <>
      <div className="flex flex-col md:flex-row w-full md:space-x-12">
        <div className="grow-0 w-full md:w-80 md:block">
          <BookFilter fetchNextPage={infiniteQueries.fetchNextPage} />
        </div>
        <div className="flex-2 grow-0 ">
          <Books {...infiniteQueries} />
        </div>
      </div>
    </>
  );
}
