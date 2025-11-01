import Avatar from "@/shared/ui/avatar";
import Button from "@/shared/ui/button";
import Container from "@/shared/ui/container";
import { Plus } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
    const isAuth = false
    return (
        <header className="border-b border-b-foreground/10">
            <Container className="p-5 border-x border-x-foreground/10 grid grid-cols-3 items-center">
                <span className="text-xl font-bold">Пойнт</span>
                <nav className="flex justify-center gap-6 text-sm">
                    <Link href="/search" className="hover:text-accent duration-100">search</Link>
                    <Link href="/templates" className="hover:text-accent duration-100">templates</Link>
                    <Link href="/about" className="hover:text-accent duration-100">about</Link>
                </nav>
                {isAuth ? (

                    <div className="flex justify-end items-center gap-2.5">
                        <Button>
                            <Plus size={14} />
                            Create
                        </Button>
                        <Avatar />
                    </div>
                ) : (
                    <Button className="w-fit place-self-end">Auth</Button>
                )}
            </Container>
        </header>
    );
}
export default Header;