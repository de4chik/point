"use client";
import { Editor } from "@/features/editor";
import { SearchFolder } from "@/features/searchFolder";
import { FORMATS } from "@/root/constants/format.constant";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/ui/resizable";
import { TemplateHeader } from "@/widgets/templateHeader";
import {
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { notFound, useParams } from "next/navigation";
const Create = () => {
  const params = useParams() as { format: SandpackPredefinedTemplate };
  if (!FORMATS.includes(params.format)) {
    return notFound();
  }
  return (
    <main className="flex flex-col h-screen">
      <TemplateHeader />
      <div className="max-w-full w-full flex-1">
        <SandpackProvider template={params.format} className="h-full!">
          <SandpackLayout className="h-full! ">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={10} minSize={12} maxSize={15}>
                <SearchFolder />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <Editor />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={60}>
                <SandpackPreview className="h-full" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </main>
  );
};
export default Create;
