import { cn } from "@/root/utils/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({ children, className, ...props }) => {
    return <div className={cn(`max-w-container min-w-5xl w-full mx-auto`, className)} {...props}>{children}</div>;
}
export default Container;