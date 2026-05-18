"use client";

import { motion } from "framer-motion";

/** Пиксельный прицел в духе CS 1.6 (зелёный + чёрная кайма), image-rendering crisp */
export function CsPixelCrosshair({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{
        imageRendering: "pixelated",
        width: size,
        height: size,
      }}
      aria-hidden
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="drop-shadow-[2px_2px_0_#000]"
      >
        <title>прицел</title>
        {/* пиксели: outline #0a0 + fill #5f5 / #0f0 типичный HUD */}
        {[
          [7, 0, 2, 1],
          [7, 1, 2, 1],
          [6, 2, 4, 1],
          [7, 3, 2, 1],
          [4, 4, 2, 1],
          [6, 4, 1, 2],
          [9, 4, 1, 2],
          [10, 4, 2, 1],
          [4, 6, 1, 4],
          [11, 6, 1, 4],
          [4, 10, 2, 1],
          [6, 10, 1, 2],
          [9, 10, 1, 2],
          [10, 10, 2, 1],
          [7, 11, 2, 1],
          [6, 12, 4, 1],
          [7, 13, 2, 1],
          [7, 14, 2, 1],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={Number(x)}
            y={Number(y)}
            width={Number(w)}
            height={Number(h)}
            className="fill-[#00ee44]"
          />
        ))}
        <rect x={7} y={7} width={2} height={2} className="fill-[#b4ffc8]" />
      </svg>
    </motion.div>
  );
}
