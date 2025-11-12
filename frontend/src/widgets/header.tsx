import { UserAvatar } from "@features/userAvatar";
import { LINKS } from "@constants/link.constant";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/conatiner";
import { Plus } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="border-b ">
      <Container className="py-2.5 border-x flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-bold uppercase">Point</span>
          <nav className="flex gap-5 text-sm">
            {LINKS.map(({ name, href }) => (
              <Link
                href={href}
                key={href}
                className="hover:text-accent duration-200"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <Button size={"icon"} variant={"ghost"}>
            <Plus />
            <span>Create</span>
          </Button>

          <UserAvatar username="Evir" />
        </div>
      </Container>
    </header>
  );
};
export { Header };
