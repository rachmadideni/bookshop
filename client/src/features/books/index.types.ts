import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import { type BookProps } from "@/components/book/book.types";

export type BookDataResponse {
  pages?: { data: BookProps[] }[];
}

export type BookQueryResult = Pick<
  UseInfiniteQueryResult<BookDataResponse, Error>,
  | "data"
  | "fetchNextPage"
  | "hasNextPage"
  | "status"
  | "isFetching"
  | "isFetchingNextPage"
>;