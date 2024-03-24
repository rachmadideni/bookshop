"use client";
import Rating from "@/components/rating";

type BookProps = {
  title: string;
  writer: string;
  coverImage: string;
  rating: number;
  // price: number;
};

export const Book = (props: BookProps) => {
  return (
    <div className="flex flex-row min-w-72 h-40 rounded-md p-4 gap-4 bg-gray-300/0 border hover:shadow-lg hover:cursor-pointer">
      <div>
        <img
          alt=""
          src={props.coverImage}
          className="bg-cover w-36 min-w-36 h-32"
        />
      </div>
      <div className="space-y-2">
        <h1 className="font-poppins font-bold text-xl capitalize leading-none">
          {props.title}
        </h1>
        <p className="text-sm text-slate-600">by {props.writer}</p>
        <Rating value={props.rating} />
      </div>
    </div>
  );
};

export default Book;
