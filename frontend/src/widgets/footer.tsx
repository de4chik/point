import { Telegram } from "@/shared/icons/telegram.icon";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/conatiner";
import { Github } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-t-gray">
      <Container className="border-x border-x-gray py-5 flex items-center justify-between">
        <span className="opacity-50 block w-[560px]">
          This project is independent and not affiliated with Figma or
          shadcn/ui.Copyright © 2025
        </span>
        <div className="flex items-center gap-1.5">
          <Button size={"icon"} variant={"ghost"}>
            <Github />
          </Button>
          <Button size={"icon"} variant={"ghost"} className="group">
            <Telegram className="group-hover:fill-white" />
          </Button>
        </div>
      </Container>
    </footer>
  );
};
export { Footer };
