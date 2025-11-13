import { $api } from "@/root/http";
import { useQuery } from "react-query";

export const useGetProfileUser = () => {
  return useQuery({
    queryKey: "getProile",
    queryFn: () => $api.get("/user/all").then(({ data }) => data),
  });
};
