import { $api } from "@/root/http";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";

export interface IForm {
  id: string;
  name: SandpackPredefinedTemplate;
  createdAt: Date;
  updatedAt: Date;
}

export const useGetFormats = () => {
  return useQuery<IForm[], AxiosError>({
    queryKey: "getFormat",
    queryFn: () => $api.get("/format/all").then(({ data }) => data),
  });
};
