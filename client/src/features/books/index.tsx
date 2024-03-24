"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Book from "@/components/book";
import useInfiniteBooks from "@/hooks/useInfiniteBooks";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Books = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteBooks();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const books = data?.pages
    ?.map((page) => page.data)
    .flat()
    .map((book, idx) => (
      <Book
        key={idx}
        title={book.title}
        writer={book.writer}
        rating={3}
        price={book.price}
        coverImage={book.coverImage}
        onClick={() => router.push(`book/${book.id}`)}
        // coverImage="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {books}
        {firstLoad}
        {nextLoad}
      </div>
      <div ref={ref} className="flex w-full items-center justify-center" />
    </div>
  );
};

const SkeletonBox = ({ children }: React.PropsWithChildren<unknown>) => (
  <div className="flex flex-row aspect-video min-w-72 h-40 rounded-md p-4 gap-8 bg-gray-300/0 hover:shadow-lg hover:cursor-pointer">
    {children}
  </div>
);

export default Books;
