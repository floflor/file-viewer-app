import { FileTree } from "@/components/FileTree";
import type { TreeNodeI } from "@/components/FileTree/types";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

const mockSelectFile = jest.fn();
jest.mock("@/lib/hooks/useSelectedFile", () => ({
  useSelectedFile: () => ({
    selectFile: mockSelectFile,
  }),
}));

describe("FileTree", () => {
  const mockData: TreeNodeI[] = [
    {
      label: "folder1",
      children: [{ id: "1", label: "file1" }],
    },
    {
      label: "folder2",
      children: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("initial render", () => {
    it("should render the tree structure", () => {
      render(<FileTree data={mockData} />);

      expect(screen.getByText("folder1")).toBeInTheDocument();
      expect(screen.getByText("file1")).toBeInTheDocument();
      expect(screen.getByText("folder2")).toBeInTheDocument();
    });
  });

  describe("node clicking", () => {
    it("should call selectFile when clicking a file", async () => {
      render(<FileTree data={mockData} />);

      await act(async () => {
        fireEvent.click(screen.getByText("file1"));
      });

      expect(mockSelectFile).toHaveBeenCalledWith("1");
    });

    it("should highlight a folder and its descendants when clicked", async () => {
      render(<FileTree data={mockData} />);

      const folderNode = screen.getByText("folder1").closest("div[draggable]");
      const fileNode = screen.getByText("file1").closest("div[draggable]");

      expect(folderNode).toBeInTheDocument();
      expect(fileNode).toBeInTheDocument();

      await act(async () => {
        folderNode && fireEvent.click(folderNode);
      });

      expect(folderNode).toHaveClass("bg-[#F9F9FB]");
      expect(fileNode).toHaveClass("bg-[#F9F9FB]");
    });

    it("should remove highlight when clicking the same folder twice", async () => {
      render(<FileTree data={mockData} />);
      const folder = screen.getByText("folder1");

      await act(async () => {
        fireEvent.click(folder);
      });

      await act(async () => {
        fireEvent.click(folder);
      });

      const folderDiv = folder.closest("div");
      expect(folderDiv).not.toHaveClass("bg-[#F9F9FB]");
    });
  });
});
