"use client";

import Rating from "@/components/rating";

type BookProps = {
  title: string;
  writer: string;
  coverImage: string;
  rating: number;
  price: number;
  onClick?: () => void;
};

export const Book = (props: BookProps) => {
  return (
    <div
      onClick={props.onClick}
      className="flex flex-row items-start justify-start aspect-video min-w-72 h-40 rounded-md p-4 gap-6 bg-gray-300/0 cursor-pointer"
    >
      <div>
        <img
          alt=""
          src={props.coverImage}
          className="block bg-cover bg-center aspect-square rounded-md shadow-lg w-24 min-w-24 h-28"
        />
      </div>
      <div className="flex flex-col space-y-2 ">
        <h1 className="font-bold text-lg capitalize leading-tight line-clamp-2">
          {props.title}
        </h1>
        <p className="text-xs text-black">by {props.writer}</p>
        <Rating value={props.rating} />
        <p className="text-md text-amber-700 font-bold">${props.price}</p>
      </div>
    </div>
  );
};

export default Book;
