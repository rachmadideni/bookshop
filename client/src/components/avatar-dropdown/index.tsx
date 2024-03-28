import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/dropdown-menu";
import { userSelector } from "@/slices/user";
import { useSelector } from "@/hooks";

const AvatarDropdown = () => {
  const { user } = useSelector(userSelector);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage
            alt="Shadcn's avatar"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute w-44 px-4 py-2 mt-2 z-10 bg-white">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-col justify-start items-start">
            <p className="text-xs text-black">you&apos;re logged in as</p>
            <span className="font-bold font-poppins">{user.name}</span>
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

export default AvatarDropdown;
