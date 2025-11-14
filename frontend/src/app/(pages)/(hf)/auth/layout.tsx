'use client'
import { useGetProfileUser } from "@/shared/api/user";
import { redirect } from "next/navigation";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data } = useGetProfileUser();
  if (data) {
    redirect('/templates')
  }
  return (
    <main className="flex-1 flex justify-center items-center">
      <div className="min-w-2xl aspect-square relative group ">
        <div className="absolute w-[110%] h-full border-y border-y-gray left-1/2 -translate-x-1/2 duration-200 group-hover:w-[120%] -z-10"></div>
        <div className="absolute h-[110%] w-full border-x border-x-gray top-1/2 -translate-y-1/2 duration-200 group-hover:h-[120%] -z-10"></div>
        <div className="p-5 h-full w-full">{children}</div>
      </div>
    </main>
  );
};
export default AuthLayout;
