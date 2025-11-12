import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface IUserAvatarProps {
  src?: string;
  username: string;
}

const UserAvatar: React.FC<IUserAvatarProps> = ({ src, username }) => {
  const firstLetterUsername = username.split("")[0];
  return (
    <Avatar>
      <AvatarImage alt={username} src={src} />
      <AvatarFallback>{firstLetterUsername}</AvatarFallback>
    </Avatar>
  );
};
export { UserAvatar };
