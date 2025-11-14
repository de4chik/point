import { $api } from "@/root/http";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export interface IUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export const useGetProfileUser = () => {
  return useQuery<IUser, AxiosError>({
    queryKey: "getProile",
    queryFn: () => $api.get("/user/profile").then(({ data }) => data),
  });
};
