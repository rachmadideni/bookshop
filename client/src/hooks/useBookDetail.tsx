"use client";

import { useQuery } from "@tanstack/react-query";

type fetchBookDetailProps = {
  bookId: string;
};

const fetchBookDetail = async ({ bookId }: fetchBookDetailProps) => {
  const url = `http://localhost:3001/api/book/${bookId}`;
  const response = await fetch(url, {
    method: "get",
  });
  return await response.json();
};

const useBookDetail = ({ bookId }: fetchBookDetailProps) => {
  const { data: book } = useQuery({
    queryKey: ["bookDetail", bookId],
    queryFn: () => fetchBookDetail({ bookId }),
  });

  return {
    book,
  };
};

export default useBookDetail;
