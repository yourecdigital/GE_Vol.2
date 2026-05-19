"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

const LAYERS = [
  { src: "/mountains/caucasus-near.png", speed: 0.08, z: 1, cls: "caucasus-layer--far" },
  { src: "/mountains/caucasus-mid.png", speed: 0.18, z: 2, cls: "caucasus-layer--mid" },
  { src: "/mountains/caucasus-far.png", speed: 0.3, z: 3, cls: "caucasus-layer--near" },
] as const;

function ParallaxLayer({ src, speed, cls, scrollYProgress }: {
  src: string; speed: number; cls: string; scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  return (
    <motion.div style={{ y }} className={`caucasus-layer-wrap ${cls}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${basePath}${src}`} alt="" aria-hidden className="caucasus-layer__img" decoding="async" loading="eager" />
    </motion.div>
  );
}

type Props = {
  scrollRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  heightClassName?: string;
  groundColor?: string;
  heroBg?: string;
};

export function CaucasusMountains({
  scrollRef,
  className = "",
  heightClassName = "h-[min(58vh,520px)] sm:h-[min(54vh,560px)]",
  groundColor = "#100e0c",
  heroBg = "#100e0c",
}: Props) {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef ?? localRef,
    offset: scrollRef ? ["start start", "end start"] : ["start end", "end start"],
  });
  const mistOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.4, 0.25]);

  return (
    <motion.div
      ref={localRef}
      className={`caucasus-mountains ${heightClassName} ${className}`}
      style={{ "--ground": groundColor, "--hero-bg": heroBg } as React.CSSProperties}
      aria-hidden
    >
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__glow" />
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__mist" />
      <motion.div className="caucasus-mountains__stack">
        {LAYERS.map((layer) => (
          <ParallaxLayer key={layer.src} src={layer.src} speed={layer.speed} cls={layer.cls} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
      <div className="caucasus-mountains__fade-top" />
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__fade-bottom" />
    </motion.div>
  );
}
