"use client";
import { SandpackFileExplorer } from "sandpack-file-explorer";
import { FilePlusCorner, FolderPlus, X } from "lucide-react";

const SearchFolder: React.FC = () => {
  // const {
  //   sandpack: { files, activeFile, visibleFiles },
  // } = useSandpack();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: `var(--sp-colors-surface1)`,
      }}
    >
      <div
        style={{
          minWidth: 150,
          width: 1000,
          overflow: "hidden",
        }}
      >
        <SandpackFileExplorer showDelete={false} />
      </div>
    </div>
  );
};
export { SearchFolder };
