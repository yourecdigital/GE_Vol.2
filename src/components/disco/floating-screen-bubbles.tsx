"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import { useCallback, useId, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { GumShards } from "@/components/disco/gum-bubble-interactive";
import { useMediaQuery } from "@/hooks/use-media-query";

const GRADIENTS = [
  "radial-gradient(circle at 35% 35%, #ffb8e8, #ff4d8c 48%, #6e1438)",
  "radial-gradient(circle at 32% 34%, #b8fff0, #2de8c8 50%, #0a4d42)",
  "radial-gradient(circle at 36% 32%, #ffd6f4, #e848a8 46%, #5c1038)",
  "radial-gradient(circle at 34% 34%, #fff4c8, #ffb04a 50%, #8a3d08)",
  "radial-gradient(circle at 33% 33%, #d4c8ff, #8866ff 48%, #2a1860)",
  "radial-gradient(circle at 35% 33%, #c8f5ff, #40c4e8 47%, #084a5c)",
  "radial-gradient(circle at 34% 35%, #ffc8e8, #ff5090 47%, #601830)",
] as const;

type BubbleCfg = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  size: number;
  drift: number;
  delay: number;
  hue: number;
  /** Пик скролла 0…1 — «перегиб», как у жвачки на герое */
  peak: number;
};

/** Равномерно по высоте всего документа + пара от низа, чтобы были видны над подвалом */
const BUBBLES: BubbleCfg[] = [
  { left: "5%", top: "4%", size: 118, drift: 4.4, delay: 0, hue: 0, peak: 0.06 },
  { right: "4%", top: "16%", size: 112, drift: 5.1, delay: 0.28, hue: 1, peak: 0.2 },
  { left: "8%", top: "32%", size: 124, drift: 3.9, delay: 0.12, hue: 2, peak: 0.38 },
  { right: "10%", top: "48%", size: 108, drift: 4.8, delay: 0.48, hue: 3, peak: 0.52 },
  { left: "40%", top: "64%", size: 116, drift: 5.4, delay: 0.06, hue: 4, peak: 0.68 },
  { right: "6%", top: "80%", size: 102, drift: 4.2, delay: 0.38, hue: 5, peak: 0.82 },
  { left: "5%", bottom: "14%", size: 108, drift: 4.6, delay: 0.22, hue: 6, peak: 0.93 },
];

function bubblePosition(cfg: BubbleCfg): CSSProperties {
  const s: CSSProperties = {
    width: cfg.size,
    height: cfg.size,
  };
  if (cfg.left != null) s.left = cfg.left;
  if (cfg.right != null) s.right = cfg.right;
  if (cfg.top != null) s.top = cfg.top;
  if (cfg.bottom != null) s.bottom = cfg.bottom;
  return s;
}

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

/** Диапазоны без повторяющихся узлов для useTransform */
function band5(peak: number): [number, number, number, number, number] {
  const d = 0.14;
  const x0 = clamp(peak - d * 1.4, 0, 1);
  const x1 = clamp(peak - d * 0.55, 0.008, 1);
  const x2 = clamp(peak, 0.02, 0.98);
  const x3 = clamp(peak + d * 0.55, 0.03, 0.995);
  const x4 = clamp(peak + d * 1.25, 0, 1);
  const arr = [x0, x1, x2, x3, x4];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) arr[i] = Math.min(1, arr[i - 1] + 0.004 * (i + 1));
  }
  return arr as [number, number, number, number, number];
}

/** Поверхность пузыря без теней — иначе после «лопа» остаётся тёмное пятно/ореол */
function bubbleSurfaceClass() {
  return "rounded-full";
}

type ScreenBubbleProps = {
  cfg: BubbleCfg;
  gradient: string;
  reduce: boolean;
  smooth: MotionValue<number>;
};

function ScreenBubble({ cfg, gradient, reduce, smooth }: ScreenBubbleProps) {
  const id = useId();
  const controls = useAnimationControls();
  const busy = useRef(false);
  const [shards, setShards] = useState(false);
  const scrollPopArmed = useRef(true);

  const peak = cfg.peak;
  const [b0, b1, b2, b3, b4] = band5(peak);

  const scrollScale = useTransform(
    smooth,
    [b0, b1, b2, b3, b4],
    [0.28, 0.58, 1.06, 1.14, 0.52]
  );

  let yA = clamp(peak - 0.12, 0, 1);
  const yB = peak;
  let yC = clamp(peak + 0.12, 0, 1);
  if (yB <= yA) yA = Math.max(0, yB - 0.02);
  if (yC <= yB) yC = Math.min(1, yB + 0.02);

  const scrollY = useTransform(smooth, [yA, yB, yC], [16, -14, 6]);

  const runPop = useCallback(async () => {
    if (busy.current || reduce) return;
    busy.current = true;
    try {
      await controls.start({
        scale: 1.42,
        transition: {
          type: "tween",
          ease: [0.2, 1.15, 0.3, 1],
          duration: 0.75,
        },
      });
      setShards(true);
      await controls.start({
        scale: 0.04,
        opacity: 0,
        transition: { duration: 0.09 },
      });
      await new Promise((r) => setTimeout(r, 420));
      setShards(false);
      await controls.start({
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 380, damping: 26 },
      });
    } finally {
      busy.current = false;
    }
  }, [controls, reduce]);

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduce) return;
    if (v < peak - 0.05) {
      scrollPopArmed.current = true;
      return;
    }
    if (
      scrollPopArmed.current &&
      v >= peak - 0.025 &&
      v <= peak + 0.04
    ) {
      scrollPopArmed.current = false;
      void runPop();
    }
  });

  const surf = bubbleSurfaceClass();

  if (reduce) {
    return (
      <div
        className="pointer-events-none absolute max-md:scale-[0.78] bg-transparent"
        style={bubblePosition(cfg)}
        aria-hidden
      >
        <div
          className={`h-full w-full ${surf}`}
          style={{ background: gradient }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-auto absolute max-md:scale-[0.78] bg-transparent"
      style={{
        ...bubblePosition(cfg),
        scale: scrollScale,
        y: scrollY,
      }}
    >
      <ScrollBubbleFloater delay={cfg.delay} drift={cfg.drift}>
        <motion.button
          type="button"
          aria-label="Пузырь — наведи или прокрути страницу, чтобы надуть и лопнуть"
          className={`use-crosshair-cursor group/bubble relative flex h-full w-full cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none outline-none transition-none focus-visible:ring-2 focus-visible:ring-white/45 ${surf}`}
          onMouseEnter={runPop}
          whileTap={{ scale: 0.94 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.38),0_6px_20px_rgba(0,0,0,0.45)] transition-[box-shadow,filter] duration-200 group-hover/bubble:shadow-[0_0_0_2px_rgba(255,255,255,0.55),0_8px_24px_rgba(0,0,0,0.5)] group-hover/bubble:brightness-110"
            style={{ background: gradient }}
            animate={controls}
            initial={{ scale: 1, opacity: 1 }}
          />
          {shards && <GumShards key={`${id}-pop`} />}
        </motion.button>
      </ScrollBubbleFloater>
    </motion.div>
  );
}

function ScrollBubbleFloater({
  children,
  delay,
  drift,
}: {
  children: ReactNode;
  delay: number;
  drift: number;
}) {
  return (
    <motion.div
      className="h-full w-full bg-transparent will-change-transform"
      animate={{
        y: [0, -10, 3, 0],
        x: [0, 7, -5, 0],
        rotate: [0, 2, -1.4, 0],
      }}
      transition={{
        duration: drift,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingScreenBubbles({
  scrollRootRef,
}: {
  scrollRootRef: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const narrow = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: scrollRootRef,
    offset: ["start start", "end end"],
  });

  /** На узком экране пружина жёстче — меньше «хвоста» и чуть дешевле к скроллу */
  const smooth = useSpring(scrollYProgress, {
    stiffness: narrow ? 72 : 28,
    damping: narrow ? 38 : 42,
    mass: narrow ? 0.62 : 1.05,
  });

  /* Пузыри — только на десктопе: на мобилке лишняя нагрузка на GPU */
  if (narrow) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-[99] overflow-x-clip bg-transparent"
      aria-hidden
    >
      {BUBBLES.map((cfg, i) => (
        <ScreenBubble
          key={`${cfg.peak}-${i}`}
          cfg={cfg}
          gradient={GRADIENTS[cfg.hue % GRADIENTS.length]}
          reduce={!!reduce}
          smooth={smooth}
        />
      ))}
    </div>
  );
}
