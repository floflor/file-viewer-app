"use client";

import { useFileData } from "@/lib/hooks/useFileData";
import { useSelectedFile } from "@/lib/hooks/useSelectedFile";
import MessageDisplay from "./MessageDisplay";
import FileDetails from "./FileDetails";

export default function FileViewer() {
  const { selectedFileId } = useSelectedFile();
  const { isPending, error, data } = useFileData(selectedFileId);

  if (!selectedFileId) {
    return <MessageDisplay message="Select a file to visualize it" />;
  }

  if (isPending) {
    return <MessageDisplay message="Loading..." />;
  }

  if (error) {
    return <MessageDisplay message="File not found" isError />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#F9F9FB] dark:bg-[#19191B]">
      <FileDetails data={data} />
    </div>
  );
}
