"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "@/hooks";
import {
  userSelector,
  login,
  addPoints,
  setOpenLoginModal,
} from "@/slices/user";
import { setNotification } from "@/slices/global";

import { ShoppingCartIcon } from "lucide-react";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/dropdown-menu";
import { Button } from "@/components/button";

import Login from "@/features/login";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const onLogin = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setOpenLoginModal(false));
    dispatch(login());
    dispatch(
      setNotification({
        isOpen: true,
        message:
          "Welcome to Bookshop! 🎉 As our new customer you'll receive 100 bonus points 🎉",
      })
    );

    dispatch(addPoints(100));
  };

  const oncancel = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setOpenLoginModal(false));
  };

  const onOpenModal = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setOpenLoginModal(true));
  };

  return (
    <nav className="flex justify-end w-full gap-0 px-4 bg-slate-400/0">
      <ul className="flex gap-4 items-center">
        <li>
          {user.isLogin ? (
            <UserAvatar />
          ) : (
            <Login
              isOpen={user.openLoginModal}
              openModal={onOpenModal}
              onLogin={onLogin}
              onCancel={oncancel}
            />
          )}
        </li>
        <li>
          <Button className="text-black font-poppins p-0" onClick={() => {}}>
            <ShoppingCartIcon size={20} />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

const UserAvatar = () => {
  const user = useSelector(userSelector);
  return (
    <DropdownMenu className="cursor-pointer">
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage
            alt="Shadcn's avatar"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 px-4 py-2 mt-2">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-col justify-start items-start">
            <p className="text-xs text-black">you're logged in as</p>
            <span className="font-bold font-poppins">Denny</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-slate-100 rounded-md">
            <Link className="text-black" href="#">
              {user.points} Points
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="underline" href="#">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
