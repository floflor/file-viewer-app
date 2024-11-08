import { FileData } from "@/components/FileViewer/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useFileData(
  fileId: string | null
): UseQueryResult<FileData, Error> {
  return useQuery({
    queryKey: ["fileData", fileId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IMGLY_BASE_DATA_FILE}/${fileId}.json`
      );
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.json();
    },
    enabled: !!fileId,
  });
}
