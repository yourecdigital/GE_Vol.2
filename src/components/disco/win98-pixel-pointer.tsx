"use client";

import type { ReactElement } from "react";

import {
  WIN98_CURSOR_COLORS as COLORS,
  WIN98_CURSOR_GRID as GRID,
  WIN98_CURSOR_H as H,
  WIN98_CURSOR_SVG_DATA_URI,
  WIN98_CURSOR_W as W,
} from "@/lib/win98-cursor";

export { WIN98_CURSOR_SVG_DATA_URI };

function buildRects(): ReactElement[] {
  const rects: ReactElement[] = [];
  let key = 0;
  for (let y = 0; y < H; y++) {
    const row = GRID[y] ?? "";
    for (let x = 0; x < W; x++) {
      const ch = row[x] ?? ".";
      if (ch === ".") continue;
      rects.push(
        <rect
          key={key++}
          x={x}
          y={y}
          width={1}
          height={1}
          fill={COLORS[ch] ?? "#000"}
        />,
      );
    }
  }
  return rects;
}

export function Win98PixelPointer({
  className,
  scale = 3,
}: {
  className?: string;
  /** условный «пиксель» = scale CSS px */
  scale?: number;
}) {
  const px = W * scale;
  const py = H * scale;
  return (
    <div
      className={className}
      style={{
        width: px,
        height: py,
        imageRendering: "pixelated",
      }}
      aria-hidden
    >
      <svg
        width={px}
        height={py}
        viewBox={`0 0 ${W} ${H}`}
        className="overflow-visible drop-shadow-[1px_2px_0_rgba(0,0,0,0.35)]"
      >
        <title>Win98 cursor</title>
        {buildRects()}
      </svg>
    </div>
  );
}
