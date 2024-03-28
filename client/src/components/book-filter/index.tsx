"use client";

import { useState } from "react";
// import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Switch } from "../switch";
import { Label } from "../label";
import { Button } from "../button";
import { setFilterRequest } from "@/slices/book";
import { useDispatch } from "@/hooks";

const BookFilter = ({ fetchNextPage }: any) => {
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleSwitchChange = (checkvalue: boolean, text: string) => {
    if (checkvalue) {
      setSearchCategory(text);
    } else {
      setSearchCategory("");
    }
  };

  return (
    <div className="flex flex-col bg-violet-500/0 h-full md:px-10 py-4 my-6 rounded-lg space-y-6">
      <h1 className="text-lg text-black font-bold">Filter</h1>
      <div className="flex w-full items-center gap-2">
        <Switch
          className="bg-gray-300"
          checked={searchCategory === "title"}
          onCheckedChange={(checkvalue) =>
            handleSwitchChange(checkvalue, "title")
          }
        />
        <Label>Book Title</Label>
      </div>
      <div className="flex w-full items-center gap-2">
        <Switch
          className="bg-gray-300"
          checked={searchCategory === "writer"}
          onCheckedChange={(checkvalue) =>
            handleSwitchChange(checkvalue, "writer")
          }
        />
        <Label>Writer</Label>
      </div>
      <div className="flex w-full">
        <input
          type="text"
          placeholder="keyword"
          className="w-full px-4 py-2 outline-none border border-gray-300 rounded-md"
          onChange={(evt) => {
            setKeyword(evt.target.value);
          }}
        />
      </div>
      <div className="flex w-full">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            dispatch(
              setFilterRequest({
                category: searchCategory,
                keyword,
              })
            );
          }}
        >
          Search
        </Button>
      </div>
      {/* <div className="flex flex-col space-y-2">
        <p className="text-black font-inter">Price Range</p>
        <Slider
          marks={{ 0: "free", 50: "$50", 100: "$100" }}
          max={100}
          step={10}
          trackStyle={{ backgroundColor: "blue" }}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-black font-normal font-inter">Rating</p>
        <Slider
          marks={{ 0: "no rate", 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }}
          max={5}
          step={1}
        />
      </div> */}
    </div>
  );
};

export default BookFilter;
