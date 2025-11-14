import { cn } from "@/root/utils/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
