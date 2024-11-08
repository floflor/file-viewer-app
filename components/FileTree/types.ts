export interface TreeNodeI {
  id?: string;
  label: string;
  children?: TreeNodeI[];
}

export interface TreeNodeProps {
  node: TreeNodeI;
  path: number[];
  onMove: (from: number[], to: number[]) => void;
  onNodeClick: (path: number[], node: TreeNodeI) => void;
  isHighlighted: boolean;
  highlightedNodes: Set<string>;
}
