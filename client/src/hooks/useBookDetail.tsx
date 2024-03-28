"use client";

import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "@/lib/config";

type fetchBookDetailProps = {
  bookId: string;
};

const fetchBookDetail = async ({ bookId }: fetchBookDetailProps) => {
  const url = `${baseUrl}/book/${bookId}/detail`;
  const response = await fetch(url);
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
