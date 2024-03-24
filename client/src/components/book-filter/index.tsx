"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const BookFilter = () => {
  return (
    <div className="flex flex-col bg-violet-500/0 h-full px-10 py-4 my-6 rounded-lg space-y-10">
      <h1 className="text-lg text-black font-bold">Filter</h1>
      <div className="flex flex-col space-y-2">
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
      </div>
    </div>
  );
};

export default BookFilter;
