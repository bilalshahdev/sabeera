import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type TornEdges = "top" | "bottom" | "both" | "left" | "right" | "all";
type TornStyle = CSSProperties & { "--torn-color"?: string; "--torn-size"?: string };

const edgeMap: Record<TornEdges, Array<"top" | "right" | "bottom" | "left">> = {
  top: ["top"],
  right: ["right"],
  bottom: ["bottom"],
  left: ["left"],
  both: ["top", "bottom"],
  all: ["top", "right", "bottom", "left"],
};

type TornEdgeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  edges?: TornEdges;
  color?: string;
  size?: number;
};

export function TornEdge({ children, edges = "top", color = "currentColor", size = 12, className = "", style, ...props }: TornEdgeProps) {
  const tornStyle: TornStyle = { ...style, "--torn-color": color, "--torn-size": `${size}px` };
  return <div className={`torn-edge ${className}`.trim()} style={tornStyle} {...props}>
    <div className="torn-edge__content">{children}</div>
    {edgeMap[edges].map(edge => <span className={`torn-edge__edge-shell torn-edge__edge-shell--${edge}`} aria-hidden="true" key={edge}><i className={`torn-edge__edge torn-edge__edge--${edge}`} /></span>)}
  </div>;
}
