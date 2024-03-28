"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import Book from "@/components/book";
import { type BookProps } from "@/components/book/book.types";
import type { BookQueryResult, BookDataResponse } from "./index.types";
import "react-loading-skeleton/dist/skeleton.css";

const Books = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
  isFetching,
}: BookQueryResult) => {
  const router = useRouter();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const books = ((data?.pages as BookDataResponse["pages"]) || [])
    .map((page) => page.data)
    .flat()
    .map((book: BookProps, idx: number) => (
      <Book
        key={idx}
        title={book?.title}
        writer={book?.writer}
        rating={3}
        price={book?.price}
        onClick={() => router.push(`book/${book.id}`)}
        tags={book?.tags}
        coverImage="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
      />
    ));

  const firstLoad =
    status === "pending" &&
    !isFetchingNextPage &&
    Array.from({ length: 10 }).map((_, idx) => (
      <Skeleton
        key={idx}
        duration={2.5}
        wrapper={SkeletonBox}
        className="min-w-72 h-40 gap-8"
      />
    ));

  const nextLoad = isFetchingNextPage && (
    <Skeleton
      duration={2.5}
      wrapper={SkeletonBox}
      className="min-w-72 h-40 gap-8"
    />
  );

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        {data && books}
        {firstLoad}
        {nextLoad}
      </div>
      <div ref={ref} className="flex w-full items-center justify-center" />
    </div>
  );
};

const SkeletonBox = ({ children }: React.PropsWithChildren<unknown>) => (
  <div className="flex flex-row aspect-video min-w-72 h-40 rounded-md p-4 gap-8 bg-gray-300/0">
    {children}
  </div>
);

export default Books;
