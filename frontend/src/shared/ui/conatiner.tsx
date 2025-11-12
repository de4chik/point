import { cn } from "@/root/utils/lib/utils";

interface IContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
}

const Container: React.FC<React.PropsWithChildren<IContainerProps>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn(`max-w-[1600px] min-w-5xl px-5 mx-auto`, className)}>
      {children}
    </div>
  );
};
export { Container };
