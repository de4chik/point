import Link from "next/link";

interface FormatCardProps {
  name: string;
  href: string;
}

const FormatCard: React.FC<FormatCardProps> = ({ name, href }) => {
  return (
    <Link
      href={href}
      className="flex justify-center items-center aspect-square border border-gray rounded-2xl text-2xl  hover:text-accent hover:border-accent duration-200 cursor-pointer"
    >
      {name}
    </Link>
  );
};
export { FormatCard };
