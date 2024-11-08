import { TreeNodeI } from "@/components/FileTree/types";

export const updateTreeData = (
  prevData: TreeNodeI[],
  from: number[],
  to: number[]
): TreeNodeI[] => {
  try {
    const newData: TreeNodeI[] = JSON.parse(JSON.stringify(prevData));

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
      current = current[from[i]].children as TreeNodeI[];
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
        current = current[to[i]].children as TreeNodeI[];
      }
    }
    console.dir(newData, { depth: 1000 });
    return newData;
  } catch (error) {
    console.error("Error moving node:", error);
    return prevData;
  }
};
