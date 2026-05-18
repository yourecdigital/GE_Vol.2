"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EVENT_COPY } from "@/lib/disco-config";
import { cn } from "@/lib/utils";

const STAMP_OUTLINE =
  "0 0 0 1px rgba(0,0,0,0.95), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 2px 2px 5px rgba(0,0,0,0.85)";

/**
 * Штамп даты/времени камкордера (как на VHS).
 * Без fixed-позиции — вставляется в фиксированный стек (кнопка, организатор).
 */
export function VhsCamcorderDateStamp({
  className,
  alignEnd,
}: {
  className?: string;
  /** В правом нижнем углу — выравнивание строк по правому краю */
  alignEnd?: boolean;
}) {
  const reduce = useReducedMotion();
  const dateLine = EVENT_COPY.dateTape;
  const timeLine = EVENT_COPY.time;

  /** Колонка по ширине самой длинной строки: время и дата начинаются с одной вертикали (как на камкордере) */
  const inner = (
    <div
      className={cn(
        "relative inline-flex w-fit flex-col items-start tabular-nums tracking-[0.22em]",
        alignEnd && "ml-auto",
        !reduce && "[animation:vhs-title-flicker_4.2s_ease-in-out_infinite]",
      )}
      style={{
        fontFamily: "var(--font-vhs-stamp), ui-monospace, monospace",
        color: "#fafaf8",
        textShadow: `${STAMP_OUTLINE}, 1px 0 0 rgba(255,60,80,0.22), -1px 0 0 rgba(70,230,200,0.18)`,
      }}
    >
      <p className="w-full text-left text-[clamp(1.2rem,4.2vw,2.2rem)] leading-none md:text-[clamp(1.35rem,2.4vw,2.05rem)]">
        {timeLine}
      </p>
      <p className="mt-1 w-full text-left text-[clamp(1rem,3.6vw,1.75rem)] leading-none md:mt-1.5 md:text-[clamp(1.05rem,2vw,1.65rem)]">
        {dateLine}
      </p>
    </div>
  );

  if (reduce) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ x: [0, 0.4, -0.35, 0.25, 0] }}
      transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      {inner}
    </motion.div>
  );
}
