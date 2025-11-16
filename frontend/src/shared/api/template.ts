import { $api } from "@/root/http";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

export interface ITemplate {
  id: string;
  name: string;
  files: string[];
  formatName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type TTemplateCreate = Omit<
  ITemplate,
  "createdAt" | "updatedAt" | "id" | "files" | "userId"
> & {
  files: File[];
};

export const useCreateTemplate = () => {
  return useMutation<ITemplate, AxiosError, TTemplateCreate>({
    mutationKey: ["createTemplate"],
    mutationFn: async (template) => {
      const formData = new FormData();

      formData.append("name", template.name);
      formData.append("formatName", template.formatName);

      template.files.forEach((file) => {
        formData.append("files", file);
      });

      return await $api
        .post("template/create", formData)
        .then(({ data }) => data);
    },
  });
};
