"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

type fetchBooksProps = {
  pageParam?: number;
  param?: {
    next: string;
  };
};

const fetchBooks = async (props: fetchBooksProps) => {
  const url = props?.pageParam
    ? "http://localhost:3001/api/book?page=" + props.pageParam
    : props.param?.next;
  const response = await fetch(url as string);
  return await response.json();
};

const useInfiniteBooks = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["books"],
      queryFn: fetchBooks,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.next;
      },
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useInfiniteBooks;
