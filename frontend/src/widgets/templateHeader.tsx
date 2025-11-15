"use client";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/conatiner";
import Link from "next/link";
import { useState } from "react";

const TemplateHeader: React.FC = () => {
  const [value, setValue] = useState("unknown");
//   console.log(value);

  return (
    <header>
      <Container className="max-w-full py-1 grid grid-cols-3 items-center">
        <Link href={"/"} className="text-2xl font-bold uppercase">
          Point
        </Link>
        <div className="place-self-center">
          <span>name: </span>
          <span
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setValue(e.currentTarget.innerText)}
            className="bg-gray p-1 rounded-sm"
          >
            unknown
          </span>
        </div>
        <span className="place-self-end">
          <Button variant={"ghost"}>Public</Button>
        </span>
      </Container>
    </header>
  );
};
export { TemplateHeader };
