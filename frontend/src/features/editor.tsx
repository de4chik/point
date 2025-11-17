import { useTemplate } from "@/shared/store/template.store";
import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect } from "react";

const Editor: React.FC = () => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { setTemplate, template } = useTemplate();
  console.log(template);

  useEffect(() => {
    setTemplate({ files: JSON.stringify(sandpack.files) });
  }, [sandpack.files]);
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
