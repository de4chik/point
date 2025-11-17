import { $api } from "@/root/http";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";

export interface ITemplate {
  id: string;
  name: string;
  files: string;
  formatName: SandpackPredefinedTemplate;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type TTemplateCreate = Omit<
  ITemplate,
  "createdAt" | "updatedAt" | "id" | "userId"
>;
export const useCreateTemplate = () => {
  return useMutation<ITemplate, AxiosError, TTemplateCreate>({
    mutationKey: ["postCreateTemplate"],
    mutationFn: async (template) => {
      return await $api
        .post("template/create", template)
        .then(({ data }) => data);
    },
  });
};

export const useGetAllTemplates = () => {
  return useQuery<ITemplate[]>({
    queryKey: "getAllTemplates",
    queryFn: async () => {
      return await $api.get("template/all").then(({ data }) => data);
    },
  });
};
