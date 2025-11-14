import * as React from "react";

import { cn } from "@/root/utils/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "p-5 border border-black rounded-default outline-none focus:border-accent duration-200 text-black",
        className
      )}
      {...props}
    />
  );
}

export { Input };
