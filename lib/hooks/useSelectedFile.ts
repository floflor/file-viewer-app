"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSelectedFile() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedFileId = searchParams.get("fileId");

  const selectFile = (fileId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("fileId", fileId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearSelection = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("fileId");
    router.push(pathname);
  };

  return {
    selectedFileId,
    selectFile,
    clearSelection,
  };
}
