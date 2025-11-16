import { useTemplate } from "@/shared/store/template.store";
import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useMemo } from "react";

const Editor: React.FC = () => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { setTemplate } = useTemplate();

  const files = useMemo(() => {
    return Object.entries(sandpack.files).map(([path, info]) => {
      return new File([info.code], path.replace("/", ""), {
        type: "text/plain",
      });
    });
  }, [sandpack.files]);
  useEffect(() => {
    setTemplate({ files });
  }, [files]);
  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="javascript"
      key={sandpack.activeFile}
      defaultValue={code}
      options={{
        minimap: { enabled: false },
        scrollbar: {
          vertical: "hidden",
          verticalScrollbarSize: 0,
        },
      }}
      onChange={(value) => updateCode(value || "")}
    />
  );
};
export { Editor };
