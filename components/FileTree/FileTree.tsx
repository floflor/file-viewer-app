"use client";
import React from "react";
import { TreeNodeI } from "./types";
import TreeNode from "./TreeNode";
import { useSelectedFile } from "@/lib/hooks/useSelectedFile";

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
    setTreeData((prevData) => {
      try {
        const newData = JSON.parse(JSON.stringify(prevData));

        const isSameLevel =
          from.length === to.length &&
          from.slice(0, -1).every((num, i) => to[i] === num);

        const originalTargetIndex = to[to.length - 1];

        let current = newData;
        let sourceParent = current;

        for (let i = 0; i < from.length - 1; i++) {
          if (!current[from[i]].children) {
            return prevData;
          }
          current = current[from[i]].children;
          if (i === from.length - 2) sourceParent = current;
        }

        const nodeToMove = sourceParent.splice(from[from.length - 1], 1)[0];
        if (!nodeToMove) return prevData;

        let adjustedTargetIndex = to[to.length - 1];
        if (isSameLevel && from[from.length - 1] < originalTargetIndex) {
          adjustedTargetIndex--;
        }

        current = newData;
        for (let i = 0; i < to.length; i++) {
          if (i === to.length - 1) {
            const targetNode = current[adjustedTargetIndex];

            if (!targetNode) {
              const lastNode = current[current.length - 1];
              if (!lastNode.children) lastNode.children = [];
              lastNode.children.push(nodeToMove);
              return newData;
            }

            if (targetNode.id) {
              return prevData;
            }
            if (!targetNode.children) targetNode.children = [];
            targetNode.children.push(nodeToMove);
          } else {
            if (!current[to[i]].children) return prevData;
            current = current[to[i]].children;
          }
        }
        console.dir(newData, { depth: 1000 });
        return newData;
      } catch (error) {
        console.error("Error moving node:", error);
        return prevData;
      }
    });
  };

  return (
    <div className="bg-[#E7E8EC] w-fit p-2 min-h-screen dark:text-[#B2B3BD] dark:bg-[#292A2E]">
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
