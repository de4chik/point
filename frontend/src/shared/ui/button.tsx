import { cn } from "@/root/utils/cn";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    className?: string;
    variant?: keyof typeof variants;
}

const variants = {
    default: "bg-foreground/10 hover:opacity-80 duration-200",
    accent: "bg-accent/10 duration-200 text-accent hover:opacity-80",
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ children, className, variant = 'default', ...props }) => {
    return <button className={cn(`px-5 py-3.5 flex justify-center items-center gap-1 rounded-root text-sm`, variants[variant], className)} {...props}>{children}</button>;
}
export default Button;