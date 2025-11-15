import { Button } from "@/shared/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FormatNotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <span className="text-8xl font-black">404</span>
      <p className="text-2xl font-bold">Not-found</p>
      <Link href={"/"} className="relative group mt-20 hover:text-accent duration-200">
        Go home{" "}
        <ArrowRight
          size={14}
          className="absolute top-1/2 -translate-y-1/2  group-hover:left-[calc(100%+6px)] group-hover:opacity-100 left-full duration-200 opacity-0 "
        />
      </Link>
    </div>
  );
};
export default FormatNotFound;
