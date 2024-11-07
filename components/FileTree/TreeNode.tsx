"use client";
import * as React from "react";
import { TreeNodeI } from "./types";
import { LucideFile, LucideFolder } from "lucide-react";

export default function TreeNode({
  node,
  path = [],
  onMove,
  onNodeClick,
  isHighlighted,
  highlightedNodes,
}: {
  node: TreeNodeI;
  path: number[];
  onMove: (from: number[], to: number[]) => void;
  onNodeClick: (path: number[], node: TreeNodeI) => void;
  isHighlighted: boolean;
  highlightedNodes: Set<string>;
}) {
  const [dropPosition, setDropPosition] = React.useState<boolean>(false);
  const isFolder = !node.id;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text", JSON.stringify({ path }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDropPosition(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dropPosition) return;

    const dragData = JSON.parse(e.dataTransfer.getData("text"));
    const sourcePath = dragData.path;

    if (
      sourcePath.length <= path.length &&
      sourcePath.every((num: number, i: number) => path[i] === num)
    ) {
      return;
    }

    onMove(sourcePath, path);
    setDropPosition(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeClick(path, node);
  };

  const renderChildren = () => {
    if (!isFolder || !node.children) return null;

    return (
      <div>
        {node.children.map((child, index) => (
          <TreeNode
            key={child.id || `${child.label}-${index}`}
            node={child}
            path={[...path, index]}
            onMove={onMove}
            onNodeClick={onNodeClick}
            isHighlighted={highlightedNodes.has([...path, index].join(","))}
            highlightedNodes={highlightedNodes}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="pl-4 pr-2 pt-1 pb-1">
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={() => setDropPosition(false)}
        onClick={handleClick}
        className={`p-1 flex items-center gap-2 relative rounded ${
          isHighlighted ? "bg-blue-100" : ""
        } hover:bg-slate-100 cursor-pointer transition-colors`}
      >
        <span>
          {isFolder ? <LucideFolder width={15} /> : <LucideFile width={15} />}
        </span>
        <span>{node.label}</span>
      </div>
      {renderChildren()}
    </div>
  );
}