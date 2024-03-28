"use client";

import Rating from "@/components/rating";
import { type BookProps } from "./book.types";

// export type BookProps = {
//   id?: string;
//   title: string;
//   writer: string;
//   coverImage: string;
//   rating: number;
//   price: number;
//   onClick?: () => void;
//   tags: { name: string }[];
// };

export const Book = (props: BookProps) => {
  return (
    <div
      onClick={props.onClick}
      className="flex flex-row items-start justify-start aspect-video min-w-72 h-48 rounded-md p-4 gap-6 cursor-pointer"
    >
      <div>
        <img
          alt="cover image"
          src={props.coverImage}
          className="block bg-cover bg-center aspect-square rounded-md w-24 min-w-24 h-28"
        />
      </div>
      <div className="flex flex-col space-y-2 ">
        <h1 className="font-bold text-lg capitalize leading-tight line-clamp-2">
          {props.title}
        </h1>
        <p className="text-xs text-black">by {props.writer}</p>
        <Rating value={props.rating} />
        <p className="text-md text-amber-700 font-bold">${props.price}</p>

        <div className="flex flex-wrap gap-1">
          {props.tags?.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="text-black text-[10px] gap-2 px-2 py-1 border  rounded-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Book;
