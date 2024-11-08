import { TreeNodeI } from "@/components/FileTree/types";
import { updateTreeData } from "@/lib/utils";

const mockData: TreeNodeI[] = [
  {
    label: "folder1",
    children: [
      { id: "file1", label: "file1" },
      { id: "file2", label: "file2" },
    ],
  },
  {
    label: "folder2",
    children: [
      { id: "file3", label: "file3" },
      { id: "file4", label: "file4" },
    ],
  },
];

describe("updateTreeData", () => {
  it("should move a node to a new location", () => {
    const newData = updateTreeData(mockData, [0, 0], [1]);

    expect(newData[0].children).not.toContain({ id: "file2", label: "file2" });
    expect(newData[1].children).toStrictEqual([
      { id: "file3", label: "file3" },
      { id: "file4", label: "file4" },
      { id: "file1", label: "file1" },
    ]);
  });
});
