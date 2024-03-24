"use client";
import { Rating as ReactRating } from "@smastrom/react-rating";

type RatingProps = {
  value: number;
  onChange?: (value: number) => void;
};

const Rating = (props: RatingProps) => {
  return (
    <ReactRating
      style={{ maxWidth: 100, width: 60, height: 12, padding: 0 }}
      value={props.value}
      readOnly
    />
  );
};

export default Rating;
