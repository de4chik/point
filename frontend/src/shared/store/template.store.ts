import { create } from "zustand";

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
  "createdAt" | "updatedAt" | "id" | "files"| "userId" 
> & {
  files: File[];
};

export const useTemplate = create<{
  template: TTemplateCreate;
  setTemplate: (newTemplate: Partial<TTemplateCreate>) => void;
}>((set) => ({
  template: { files: [], formatName: "", name: "", userId: "" },
  setTemplate: (newTemplate) =>
    set((state) => ({
      template: { ...state.template, ...newTemplate },
    })),
}));
