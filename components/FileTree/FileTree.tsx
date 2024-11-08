"use client";
import React from "react";
import { TreeNodeI } from "./types";
import TreeNode from "./TreeNode";
import { useSelectedFile } from "@/lib/hooks/useSelectedFile";
import { updateTreeData } from "@/lib/utils";

export default function FileTree({ data }: { data: TreeNodeI[] }) {
  const { selectFile } = useSelectedFile();
  const [treeData, setTreeData] = React.useState(data);
  const [highlightedNodes, setHighlightedNodes] = React.useState<Set<string>>(
    new Set()
  );
  const [lastClickedPath, setLastClickedPath] = React.useState<string | null>(
    null
  );

  const getDescendantPaths = (
    basePath: number[],
    node: TreeNodeI
  ): string[] => {
    const paths = [basePath.join(",")];

    if (node.children) {
      node.children.forEach((child, index) => {
        const childPath = [...basePath, index];
        paths.push(...getDescendantPaths(childPath, child));
      });
    }

    return paths;
  };

  const handleNodeClick = (clickedPath: number[], node: TreeNodeI) => {
    const pathStr = clickedPath.join(",");

    if (node.id) {
      selectFile(node.id);
    }

    setHighlightedNodes(() => {
      const newHighlighted = new Set<string>();

      if (pathStr === lastClickedPath) {
        setLastClickedPath(null);
        return newHighlighted;
      }

      const descendantPaths = getDescendantPaths(clickedPath, node);
      descendantPaths.forEach((p) => newHighlighted.add(p));
      setLastClickedPath(pathStr);

      return newHighlighted;
    });
  };

  const moveNode = (from: number[], to: number[]) => {
    const newData = updateTreeData(treeData, from, to);
    return setTreeData(newData);
  };

  return (
    <div className="bg-[#E7E8EC] w-[25%] p-2 min-h-screen dark:text-[#B2B3BD] dark:bg-[#292A2E]">
      {treeData.map((node, index) => (
        <TreeNode
          key={node.id || `${node.label}-${index}`}
          node={node}
          path={[index]}
          onMove={moveNode}
          onNodeClick={handleNodeClick}
          isHighlighted={highlightedNodes.has(index.toString())}
          highlightedNodes={highlightedNodes}
        />
      ))}
    </div>
  );
}
