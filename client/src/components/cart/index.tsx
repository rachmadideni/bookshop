import Image from "next/image";
import { CircleXIcon } from "lucide-react";
import {
  AlertDialog as Dialog,
  AlertDialogContent as DialogContent,
} from "@/components/dialog";
import { type BookProps } from "@/components/book/book.types";
import { Button } from "@/components/button";
import { useSelector, useDispatch } from "@/hooks";
import useMakePurchase from "@/hooks/useMakePurchase";
import { cartSelector } from "@/slices/cart";
import {
  addCartItems,
  removeCartItems,
  toggleCartOpen,
  resetItems,
} from "@/slices/cart";

type ConfirmAddItemProps = {
  isOpen: boolean;
  book: BookProps;
  toggleDialog: () => void;
};

const ConfirmAddItem = ({
  isOpen,
  book,
  toggleDialog,
}: ConfirmAddItemProps) => {
  const dispatch = useDispatch();
  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-white max-w-sm">
        <h1 className="text-black font-bold ">Do you want to add this item?</h1>
        <div className="flex flex-row gap-4 my-2">
          <Image
            src={
              "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
            }
            alt={book?.title}
            width={65}
            height={20}
          />
          <div>
            <p className="text-amber-700 font-bold">{book?.title}</p>
            <p className="font-bold">${book?.price}</p>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            className=" border border-red-500 text-red-500"
            onClick={toggleDialog}
          >
            Cancel
          </Button>
          <Button
            className="bg-green-500 text-white"
            onClick={() => {
              dispatch(addCartItems(book));
              toggleDialog();
            }}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const { isOpen, items } = useSelector(cartSelector);
  const purchase = useMakePurchase();

  const handlePurchase = () => {
    purchase.mutate();
    dispatch(toggleCartOpen(false));
    dispatch(resetItems());
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-[85%] rounded-lg bg-white">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold font-inter">Shopping Cart</h1>
          <Button
            className="absolute top-0 -right-1"
            onClick={() => dispatch(toggleCartOpen(false))}
          >
            <CircleXIcon size={20} />
          </Button>
        </div>
        <p className="text-black">your items</p>
        <div className="flex flex-col gap-4 min-h-100 ">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start ">
              <div className="flex w-full justify-end text-black font-semibold">
                <p className="flex w-full leading-tight text-md">
                  {item?.title}
                </p>
                <p className="flex w-full justify-center">${item?.price}</p>
              </div>
              <Button
                size="sm"
                className="border border-red-500 text-red-500"
                onClick={() => {
                  dispatch(removeCartItems(item?.id));
                }}
              >
                remove
              </Button>
            </div>
          ))}
        </div>
        <div>
          <Button
            onClick={handlePurchase}
            className="w-full bg-green-600 text-white capitalize"
            disabled={purchase.isPending || items.length === 0}
          >
            {purchase.isPending ? "loading" : "order books now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { Cart, ConfirmAddItem };
export default Cart;
