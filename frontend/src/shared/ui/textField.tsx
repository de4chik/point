import { forwardRef } from "react";
import { Input } from "./input";
import { cn } from "@/root/utils/lib/utils";

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  errorMessage?: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = forwardRef(
  ({ label, errorMessage, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative",
          errorMessage ? "text-red-500" : "focus-within:[&>span]:text-accent"
        )}
      >
        <span className="block px-1 absolute -top-2 left-5 bg-white">
          {label}
        </span>
        <Input
          name={label}
          ref={ref}
          {...props}
          className={cn(className, errorMessage && "border-red-500")}
        />
        {errorMessage && (
          <span className="pl-5 pt-1 block text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";
export { TextField };
