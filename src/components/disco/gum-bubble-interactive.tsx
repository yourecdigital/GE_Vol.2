"use client";

import { useCallback, useId, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

type Props = {
  gumScale: MotionValue<number>;
  gumY: MotionValue<number>;
  reduce: boolean;
};

/** Жвачка: наведение → надув, затем «лоп» с осколками (как перегнул пузырь) */
export function GumBubbleInteractive({ gumScale, gumY, reduce }: Props) {
  const id = useId();
  const controls = useAnimationControls();
  const busy = useRef(false);
  const [shards, setShards] = useState(false);
  const prefersReduce = useReducedMotion();

  const runPop = useCallback(async () => {
    if (busy.current || reduce || prefersReduce) return;
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
  }, [controls, prefersReduce, reduce]);

  if (reduce || prefersReduce) {
    return (
      <motion.div
        className="pointer-events-none absolute -right-4 bottom-[8%] z-[5] h-24 w-24 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ff9ec8,#ff3d7a_60%,transparent_100%)] md:bottom-[10%] md:h-32 md:w-32"
        style={{ scale: gumScale, y: gumY }}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className="absolute -right-4 bottom-[8%] z-[25] md:bottom-[10%]"
      style={{ y: gumY, scale: gumScale }}
    >
      <motion.button
        type="button"
        aria-label="Пузырь жвачки — наведи на компьютере или нажми на экране, чтобы надуть и лопнуть"
        className="use-crosshair-cursor relative flex h-24 w-24 touch-manipulation items-center justify-center rounded-full border-0 bg-transparent p-0 md:h-32 md:w-32"
        onMouseEnter={runPop}
        onClick={() => void runPop()}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ff9ec8,#ff3d7a_60%,transparent_100%)]"
          animate={controls}
          initial={{ scale: 1, opacity: 1 }}
        />
        {shards && <GumShards key={`${id}-pop`} />}
      </motion.button>
    </motion.div>
  );
}

export function GumShards() {
  const shards = [
    { x: -40, y: -24, rot: -38, s: 0.55 },
    { x: 42, y: -16, rot: 32, s: 0.52 },
    { x: -14, y: 38, rot: 12, s: 0.46 },
    { x: 30, y: 34, rot: 58, s: 0.5 },
    { x: -34, y: 20, rot: -14, s: 0.42 },
    { x: 10, y: -42, rot: 8, s: 0.36 },
    { x: 46, y: 10, rot: 48, s: 0.44 },
  ];
  return (
    <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      {shards.map((sh, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: sh.x,
            y: sh.y,
            rotate: sh.rot,
            scale: sh.s,
          }}
          transition={{ duration: 0.48, ease: "easeOut" }}
          className="absolute h-5 w-5 rounded-full bg-gradient-to-br from-pink-100 to-rose-600"
        />
      ))}
    </span>
  );
}
