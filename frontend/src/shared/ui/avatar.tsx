import { UserRound } from "lucide-react";

interface AvatarProps {
    src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <div className="w-10 aspect-square rounded-full bg-foreground/10 flex items-center justify-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${src})` }}>
            <UserRound size={14} />
        </div>
    );
}
export default Avatar;