"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBasket, ArrowLeftIcon } from "lucide-react";
import Login from "@/features/login";
import { Button } from "@/components/button";
import useBookDetail from "@/hooks/useBookDetail";
import { useSelector, useDispatch } from "@/hooks";
import {
  userSelector,
  setOpenLoginModal,
  openLoginModal,
  login,
  addPoints,
} from "@/slices/user";
import { setNotification } from "@/slices/global";

const BookDetail = ({ params }: { params: { slug: string } }) => {
  const bookId = params.slug;
  const router = useRouter();
  const { book } = useBookDetail({ bookId });

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
      <div className="flex flex-row gap-16">
        <div className="space-y-4">
          <Image
            alt="book cover"
            src={book?.data.coverImage}
            className="rounded-md shadow-md w-96 h-80"
            width={150}
            height={120}
          />

          <div className="flex w-96 bg-slate-400/0 justify-center">
            <p className="text-2xl text-amber-700 font-bold">
              ${book?.data.price}
            </p>
          </div>
          <div className="w-96 bg-slate-400/0">
            {user.isLogin ? (
              <Button
                variant="default"
                className="font-bold w-full rounded-md capitalize gap-2 bg-green-600 text-white"
                onClick={() => dispatch(addPoints(40))}
              >
                <ShoppingBasket size={20} />
                add to cart
              </Button>
            ) : (
              <Login
                isOpen={user.openLoginModal}
                openModal={() => {
                  dispatch(setOpenLoginModal(true));
                }}
                onLogin={() => {
                  dispatch(login());
                  dispatch(
                    setNotification({
                      isOpen: true,
                      message:
                        "Welcome to Bookshop! 🎉 As our new customer you'll receive 100 bonus points 🎉",
                    })
                  );

                  dispatch(addPoints(100));
                }}
                onCancel={oncancel}
                triggerComponent={
                  <Button
                    variant="default"
                    className="font-bold w-full rounded-md capitalize gap-2 bg-green-600 text-white"
                    onClick={() => {
                      if (user.isLogin) dispatch(addPoints(50));
                      dispatch(setOpenLoginModal(true));
                    }}
                  >
                    <ShoppingBasket size={20} />
                    add to cart
                  </Button>
                }
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {JSON.stringify(user, null, 2)}
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
        </div>
      </div>

      {/* <Book
        title={book?.data.title}
        writer={book?.data.writer}
        coverImage={book?.data.coverImage}
        price={book?.data.price}
        rating={3}
      /> */}
    </div>
  );
};

export default BookDetail;
