'use client';
import { cn } from "@/root/utils/cn";
import Avatar from "@/shared/ui/avatar";
import Button from "@/shared/ui/button";
import { SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import { Heart, Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TemplateProps {
    username: string;
    title: string;
    description: string;
    price: number;
    srcAvatar?: string;
    id: string;
}

const Template: React.FC<TemplateProps> = ({ description, price, title, username, srcAvatar, id }) => {
    const { push } = useRouter()
    const [size, setSize] = useState<'desktop' | 'mobile'>('desktop');
    return (
        <div>
            <header className="flex justify-between items-center mb-2.5 px-2.5">
                <div className="flex items-center gap-1.5">
                    <Avatar src={srcAvatar} />
                    <span className="text-sm">{username}</span>
                </div>
                <div className="flex gap-1.5">
                    <Button className="aspect-square" variant={size === 'desktop' ? 'accent' : "default"} onClick={() => setSize('desktop')}><Monitor size={14} /></Button>
                    <Button className="aspect-square" variant={size === 'mobile' ? 'accent' : "default"} onClick={() => setSize('mobile')}><Smartphone size={14} /></Button>
                </div>
            </header>
            <div className="p-1 rounded-root bg-foreground/10 ">
                <SandpackProvider template="react" >
                    <SandpackLayout>
                        <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton={false} className={cn("rounded-mini min-h-96 transition-all duration-500 mx-auto ", size === 'desktop' ? "max-w-full" : size === 'mobile' ? "max-w-[360px]" : "")} />
                    </SandpackLayout>
                </SandpackProvider>
            </div>
            <footer className="px-2.5 pt-2.5 ">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm">{title}</span>
                        <p className="text-sm opacity-50">{description}</p>
                    </div>
                    <span>{price > 0 ? price : 'free'}</span>
                </div>
                <div className="mt-5 flex gap-1.5">
                    <Button onClick={() => push(`/template/${id}`)}>View code</Button>
                    <Button className="aspect-square"><Heart size={14} /></Button>
                </div>
            </footer>
        </div>
    );
}
export default Template;