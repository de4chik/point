import { useLogout } from "@/shared/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { UserRound } from "lucide-react";
import Link from "next/link";

interface IUserAvatarProps {
  src?: string;
  username: string;
}

const UserAvatar: React.FC<IUserAvatarProps> = ({ src, username }) => {
  const firstLetterUsername = username.split("")[0];
  const { mutate } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage alt={username} src={src} />
          <AvatarFallback>{firstLetterUsername}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href={"/profile/settings"}>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => mutate()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { UserAvatar };
