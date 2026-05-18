"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Палитра в духе афиши: факелы, неон вокзала и оранжевый заголовок */
const RADIO_RECORD_NEON: { base: string; hover: string; glow: string }[] = [
  { base: "#ffcc4d", hover: "#fff3c4", glow: "rgba(255, 200, 70, 0.95)" },
  { base: "#ff6b35", hover: "#ffd4b8", glow: "rgba(255, 100, 50, 0.92)" },
  { base: "#ff3d3d", hover: "#ffc9c9", glow: "rgba(255, 50, 50, 0.9)" },
  { base: "#ffb020", hover: "#ffe9b8", glow: "rgba(255, 175, 30, 0.9)" },
  { base: "#00e5ff", hover: "#b5fcff", glow: "rgba(0, 229, 255, 0.88)" },
  { base: "#ff00c8", hover: "#ffb8ee", glow: "rgba(255, 0, 200, 0.88)" },
  { base: "#d4ff00", hover: "#efffb3", glow: "rgba(212, 255, 0, 0.85)" },
  { base: "#ff8c00", hover: "#ffd18a", glow: "rgba(255, 140, 0, 0.88)" },
  { base: "#a855f7", hover: "#e9d5ff", glow: "rgba(168, 85, 247, 0.85)" },
  { base: "#40c4ff", hover: "#d6f2ff", glow: "rgba(64, 196, 255, 0.85)" },
];

function Letter({
  ch,
  heavy,
  onPulse,
  i,
  radioRecord,
  goldIngot3d,
  colorIndexOffset = 0,
}: {
  ch: string;
  heavy?: boolean;
  onPulse: () => void;
  i: number;
  radioRecord?: boolean;
  /** Золотые 3D-слитки + блики (приоритет над radioRecord) */
  goldIngot3d?: boolean;
  /** Смещение в палитре, чтобы вторая строка мобильного заголовка не начиналась с тех же цветов */
  colorIndexOffset?: number;
}) {
  const reduce = useReducedMotion();
  if (ch === " ") {
    return <span className="inline-block w-[0.25em]" />;
  }

  const gold = goldIngot3d && !heavy;
  const rr = !gold && radioRecord && !heavy;
  const pi = i + colorIndexOffset;
  const slot = RADIO_RECORD_NEON[pi % RADIO_RECORD_NEON.length]!;
  const rrHoverSlot = RADIO_RECORD_NEON[(pi + 4) % RADIO_RECORD_NEON.length]!;

  if (gold) {
    /**
     * Внешний motion — только transform; буква внутри с .gold-ingot-letter,
     * иначе Framer кладёт transform на тот же узел, что и text-shadow / неон — свечение «пропадает» в браузере.
     */
    return (
      <motion.span
        className="inline-block select-none [cursor:var(--mc-cursor-kinetic)]"
        style={{ display: "inline-block" }}
        whileTap={
          reduce
            ? undefined
            : { scale: 0.92, transition: { duration: 0.16 } }
        }
        whileHover={
          reduce ? undefined : { y: -3, transition: { type: "spring", stiffness: 400, damping: 22 } }
        }
        onClick={onPulse}
        animate={
          reduce
            ? undefined
            : {
                y: [0, -1.2, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                y: {
                  duration: 2.4 + (i % 7) * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: ((i * 5) % 10) * 0.06,
                },
              }
        }
      >
        <span
          className="relative inline-block isolate"
          style={
            {
              "--gi": i,
            } as CSSProperties
          }
        >
          <span className="gold-ingot-letter inline-block">{ch}</span>
          {!reduce && (
            <span
              className="rambov-cc-sheen-duplicate pointer-events-none absolute left-0 top-0 inline-block"
              aria-hidden
            >
              {ch}
            </span>
          )}
        </span>
      </motion.span>
    );
  }

  if (rr) {
    return (
      <motion.span
        className={cn(
          "disco-radio-letter inline-block select-none [cursor:var(--mc-cursor-kinetic)]",
        )}
        style={{
          color: slot.base,
          ["--rr-hover" as string]: rrHoverSlot.hover,
          ["--rr-glow" as string]: rrHoverSlot.glow,
          textShadow: [
            `0 0 10px ${slot.glow}`,
            `0 0 22px color-mix(in srgb, ${slot.glow} 55%, transparent)`,
            `1px 1px 0 rgba(0,0,0,0.92)`,
            `-1px -1px 0 rgba(0,0,0,0.92)`,
            `0 2px 0 rgba(0,0,0,0.75)`,
          ].join(", "),
          WebkitTextStroke: "0.45px rgba(0,0,0,0.35)",
        }}
        whileTap={
          reduce
            ? undefined
            : { scale: 0.9, rotate: [-2, 2, 0], transition: { duration: 0.16 } }
        }
        whileHover={
          reduce
            ? undefined
            : { y: -5, scale: 1.06, transition: { type: "spring", stiffness: 420, damping: 18 } }
        }
        onClick={onPulse}
        animate={
          reduce
            ? undefined
            : {
                y: [0, -1.5, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                y: {
                  duration: 2.2 + (i % 9) * 0.08,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: ((i * 7) % 10) * 0.07,
                },
              }
        }
      >
        {ch}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn(
        "inline-block select-none [cursor:var(--mc-cursor-kinetic)]",
        !heavy && "text-white",
        heavy &&
          "bg-gradient-to-b from-[#fffef5] via-[#ffd057] to-[#e65100] bg-clip-text font-[family-name:var(--font-marker-deck),cursive] text-transparent tracking-wide",
      )}
      style={
        !heavy
          ? {
              textShadow:
                "0 0 18px rgba(255,80,40,0.85), 0 0 2px #fff, 2px 2px 0 #000",
            }
          : {
              WebkitTextStroke: "0.55px rgba(42, 12, 0, 0.55)",
              filter:
                "drop-shadow(2px 3px 0 #1a0502) drop-shadow(0 0 18px rgba(255,120,30,0.75)) drop-shadow(0 0 36px rgba(255,60,20,0.35))",
            }
      }
      whileTap={
        reduce
          ? undefined
          : { scale: 0.88, rotate: [-2, 2, 0], transition: { duration: 0.18 } }
      }
      whileHover={
        reduce ? undefined : { y: -4, transition: { type: "spring", stiffness: 500 } }
      }
      onClick={onPulse}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -2, 0],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              y: {
                duration: 2.0 + (i % 9) * 0.09,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: ((i * 7) % 10) * 0.08,
              },
            }
      }
    >
      {ch}
    </motion.span>
  );
}

export function KineticLetters({
  text,
  className,
  heavy,
  onBurst,
  radioRecord,
  goldIngot3d,
  colorIndexOffset = 0,
}: {
  text: string;
  className?: string;
  heavy?: boolean;
  onBurst?: () => void;
  /** Неоновые разноцветные буквы + смена цвета и свечения при наведении (стиль радио-диско) */
  radioRecord?: boolean;
  /** Золото 3D-слиток + перелив и блики */
  goldIngot3d?: boolean;
  colorIndexOffset?: number;
}) {
  const pulse = useCallback(() => {
    onBurst?.();
  }, [onBurst]);

  return (
    <span
      className={cn(
        "relative inline-block",
        className,
      )}
    >
      {Array.from(text).map((ch, i) => (
        <Letter
          key={`${i}-${ch}`}
          ch={ch}
          heavy={heavy}
          i={i}
          onPulse={pulse}
          radioRecord={radioRecord}
          goldIngot3d={goldIngot3d}
          colorIndexOffset={colorIndexOffset}
        />
      ))}
    </span>
  );
}

/** Random RGB split on keypress for the whole hero */
export function useKeyboardGlitch(
  active: boolean
): { shift: string; skew: string } {
  const [g, setG] = useState({ shift: "0px", skew: "0deg" });

  useEffect(() => {
    if (!active) return;
    const onKey = () => {
      const x = (Math.random() - 0.5) * 8;
      const s = (Math.random() - 0.5) * 3;
      setG({
        shift: `${x}px`,
        skew: `${s}deg`,
      });
      window.setTimeout(() => setG({ shift: "0px", skew: "0deg" }), 120);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return g;
}
