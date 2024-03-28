export type BookProps = {
  id?: string;
  title: string;
  writer: string;
  coverImage: string;
  rating: number;
  price: number;
  onClick?: () => void;
  tags: { name: string }[];
};
