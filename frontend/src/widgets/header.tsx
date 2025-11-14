"use client";
import { UserAvatar } from "@features/userAvatar";
import { LINKS } from "@constants/link.constant";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/conatiner";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { useGetProfileUser } from "@/shared/api/user";
import { Skeleton } from "@/shared/ui/skeleton";

const Header: React.FC = () => {
  const { data: user, isLoading: loadingUser } = useGetProfileUser();

  return (
    <header className="border-b ">
      <Container className="py-2.5 border-x flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href={"/"} className="text-2xl font-bold uppercase">
            Point
          </Link>
          <nav className="flex gap-5 text-sm items-center">
            {LINKS.map(({ name, href }) => (
              <Link
                href={href}
                key={href}
                className="hover:text-accent duration-200"
              >
                {name}
              </Link>
            ))}
            <Link
              href={"/search"}
              className="hover:text-accent duration-200 flex items-center gap-1.5"
            >
              Search
              <Search size={14} strokeWidth={3} />
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-1">
          {loadingUser ? (
            <Skeleton className="w-28 h-10" />
          ) : user ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={"/templates/create"}>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="rounded-full"
                    >
                      <Plus />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>create</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <UserAvatar username="Evir" />
                </TooltipTrigger>
                <TooltipContent>Profile</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <div className=" flex items-center gap-5">
              <Link
                href={"/auth/signup"}
                className="opacity-50 hover:text-accent duration-200 hover:opacity-100"
              >
                sign up
              </Link>
              <Link
                href={"/auth/login"}
                className=" hover:text-accent duration-200"
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
export { Header };
