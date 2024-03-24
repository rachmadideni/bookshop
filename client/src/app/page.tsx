import Books from "@/features/books";
import BookFilter from "@/components/book-filter";

export default function Home() {
  return (
    <>
      <div className="flex flex-row w-full md:space-x-12">
        <div className="grow-0 w-80 hidden md:block">
          <BookFilter />
        </div>
        <div className="flex-2 grow-0 ">
          <Books />
        </div>
      </div>
    </>
  );
}
