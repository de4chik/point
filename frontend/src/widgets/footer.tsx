import Button from "@/shared/ui/button";
import Container from "@/shared/ui/container";
import { Github, Instagram } from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-t-foreground/10">
            <Container className="p-5 border-x border-x-foreground/10 flex justify-between items-center">
                <p className="text-sm max-w-md opacity-50">This project is independent and not affiliated. Copyright © 2025 </p>

                <div className="flex gap-1.5">
                    <Button className="aspect-square"><Github size={14} /></Button>
                    <Button className="aspect-square"><Instagram size={14} /></Button>
                </div>
            </Container>
        </footer>
    );
}
export default Footer;