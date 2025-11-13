"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="flex-1 flex justify-center items-center flex-col gap-2">
      <h1 className="text-9xl font-black">POINT</h1>
      <Link href={"/templates"} className="relative group">
        Search templates{" "}
        <ArrowRight
          size={14}
          className="absolute top-1/2 -translate-y-1/2  group-hover:left-[calc(100%+6px)] group-hover:opacity-100 left-full duration-200 opacity-0"
        />
      </Link>
    </main>
  );
};
export default HomePage;
