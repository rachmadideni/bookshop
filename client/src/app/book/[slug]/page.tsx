"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBasket, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/button";
import { ConfirmAddItem } from "@/components/cart";
import useBookDetail from "@/hooks/useBookDetail";
import { useSelector, useDispatch } from "@/hooks";
import { userSelector, setOpenLoginModal } from "@/slices/user";

const BookDetail = ({ params }: { params: { slug: string } }) => {
  const bookId = params.slug;
  const router = useRouter();
  const { book } = useBookDetail({ bookId });

  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const oncancel = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setOpenLoginModal(false));
  };

  return (
    <div className="flex flex-col w-full bg-slate-400/0 space-y-2">
      <div className="my-4">
        <Button
          onClick={() => router.back()}
          variant="default"
          className="bg-slate-400/0 gap-2 capitalize"
        >
          <ArrowLeftIcon size={22} />
          <p className="capitalize font-bold text-black text-2xl">back</p>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex flex-col space-y-4 items-center justify-center">
          <Image
            alt="book cover"
            src={
              "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
            }
            className="rounded-md shadow-md w-60 h-72 md:w-72 md:h-96 bg-contain"
            width={150}
            height={120}
            priority
          />

          <div className="flex md:w-96 bg-slate-400/0 justify-center">
            <p className="text-2xl text-amber-700 font-bold">
              ${book?.data.price}
            </p>
          </div>
          <div className="md:w-96 bg-slate-400/0">
            {user.isLogin ? (
              <>
                <ConfirmAddItem
                  isOpen={cartOpen}
                  book={book?.data}
                  toggleDialog={() => {
                    setCartOpen(false);
                  }}
                />
                <Button
                  variant="default"
                  className="font-bold w-full rounded-md capitalize gap-2 bg-green-600 text-white"
                  onClick={() => {
                    setCartOpen(true);
                  }}
                >
                  <ShoppingBasket size={20} />
                  add to cart
                </Button>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-poppins text-amber-700 font-bold capitalize">
            {book?.data.title}
          </h1>
          <p className="font-bold text-black capitalize">
            writer {book?.data.writer}
          </p>
          <p className="text-black font-inter max-w-2xl leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            mollitia facilis quaerat, quas ducimus nam eligendi tempora,
            obcaecati ipsam nostrum libero laudantium, saepe unde tempore? Id
            dolore veritatis dolorem voluptatum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Doloribus mollitia facilis quaerat,
            quas ducimus nam eligendi tempora, obcaecati ipsam nostrum libero
            laudantium, saepe unde tempore? Id dolore veritatis dolorem
            voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Doloribus mollitia facilis quaerat, quas ducimus nam eligendi
            tempora, obcaecati ipsam nostrum libero laudantium, saepe unde
            tempore? Id dolore veritatis dolorem voluptatum. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Doloribus mollitia facilis
            quaerat, quas ducimus nam eligendi tempora, obcaecati ipsam nostrum
            libero laudantium, saepe unde tempore? Id dolore veritatis dolorem
            voluptatum!
          </p>
          <div className="flex flex-wrap gap-1">
            {book?.data.tags?.map(
              (tag: Record<string, string>, tagIndex: number) => (
                <span
                  key={tagIndex}
                  className="text-black text-sm gap-2 px-2 py-1 border-2 border-blue-gray-500  rounded-sm"
                >
                  {tag.name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
