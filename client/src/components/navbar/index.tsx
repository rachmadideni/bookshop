"use client";

import { focusManager } from "@tanstack/react-query";
import { ShoppingCartIcon, NotebookIcon } from "lucide-react";
import Login from "@/features/login";
import AvatarDropdown from "@/components/avatar-dropdown";
import { Button } from "@/components/button";
import Cart from "@/components/cart";
import OrderHistory from "@/components/order";
import { useSelector, useDispatch } from "@/hooks";
import { userSelector, setOpenLoginModal } from "@/slices/user";
import { totalItemsSelector, toggleCartOpen } from "@/slices/cart";
import { toggleDialog } from "@/slices/orders";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const totalItems = useSelector(totalItemsSelector);

  const oncancel = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setOpenLoginModal(false));
  };

  const onOpenModal = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setOpenLoginModal(true));
  };

  return (
    <nav className="flex md:justify-end justify-center w-full gap-0 px-4 bg-slate-400/0">
      <ul className="flex gap-4 items-center">
        <li>
          {user.isLogin ? (
            <AvatarDropdown />
          ) : (
            <Login
              isOpen={user.openLoginModal}
              openModal={onOpenModal}
              onCancel={oncancel}
            />
          )}
        </li>
        <li>
          {/* Shopping Cart */}
          <Button
            className="relative text-black font-poppins w-10 h-10 p-2 rounded-full hover:bg-slate-100 hover:outline-gray-500 hover:outline-2 hover:outline-offset-2"
            onClick={() => {
              if (!user.isLogin) return;
              dispatch(toggleCartOpen(true));
            }}
          >
            <ShoppingCartIcon size={20} />
            {totalItems > 0 && (
              <span className="absolute flex items-center justify-center -top-1 -right-2 text-xs font-bold bg-green-600 text-white w-5 h-5 rounded-full">
                {totalItems}
              </span>
            )}
          </Button>
        </li>
        <li>
          {/* Order History */}
          <Button
            onClick={() => {
              if (!user.isLogin) return;
              dispatch(toggleDialog(true));
              focusManager.setFocused(true);
            }}
            className="relative text-black font-poppins w-10 h-10 p-2 rounded-full hover:bg-slate-100 hover:outline-gray-500 hover:outline-2 hover:outline-offset-2"
          >
            <NotebookIcon size={20} />
          </Button>
        </li>
      </ul>
      {user.isLogin ? (
        <>
          <Cart />
          <OrderHistory />
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
