"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "./useSelector";
import { bookSelector } from "@/slices/book";
import { baseUrl } from "@/lib/config";

const fetchBooks = async (page: string, category: string, keyword: string) => {
  const url = page
    ? `${baseUrl}/book/filter?` +
      new URLSearchParams({
        page,
        category,
        keyword,
      })
    : "";

  const response = await fetch(url as string, {
    method: "GET",
  });
  return await response.json();
};

const useInfiniteBooks = () => {
  const { filterRequest } = useSelector(bookSelector);
  const category = filterRequest.category;
  const keyword = filterRequest.keyword;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["books", category, keyword],
    queryFn: ({ pageParam }) =>
      fetchBooks(String(pageParam), String(category), String(keyword)),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages) => {
      return lastPage.data.length > 0 ? lastPage.next : undefined;
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  };
};

export default useInfiniteBooks;
