import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { Editor as MonacoEditor } from "@monaco-editor/react";

const Editor: React.FC = () => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
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
