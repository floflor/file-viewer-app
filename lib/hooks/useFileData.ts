import { FileData } from "@/components/FileViewer/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useFileData(
  fileId: string | null
): UseQueryResult<FileData, Error> {
  return useQuery({
    queryKey: ["fileData", fileId],
    queryFn: async () => {
      const response = await fetch(
        `https://ubique.img.ly/frontend-tha/entries/${fileId}.json`
      );
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.json();
    },
    enabled: !!fileId,
  });
}
