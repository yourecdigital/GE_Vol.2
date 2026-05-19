"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

const LAYERS = [
  {
    src: "/mountains/caucasus-far.svg",
    speed: 0.1,
    className: "caucasus-layer caucasus-layer--far",
  },
  {
    src: "/mountains/caucasus-mid.svg",
    speed: 0.22,
    className: "caucasus-layer caucasus-layer--mid",
  },
  {
    src: "/mountains/caucasus-near.svg",
    speed: 0.36,
    className: "caucasus-layer caucasus-layer--near",
  },
] as const;

type CaucasusMountainsProps = {
  scrollRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  heightClassName?: string;
  groundColor?: string;
  heroBg?: string;
  mist?: boolean;
};

function ParallaxLayer({
  src,
  speed,
  className,
  scrollYProgress,
}: {
  src: string;
  speed: number;
  className: string;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div style={{ y }} className={cn("caucasus-layer-wrap", className)}>
      <Image
        src={`${basePath}${src}`}
        alt=""
        aria-hidden
        width={1440}
        height={400}
        className="caucasus-layer__img"
        priority
      />
    </motion.div>
  );
}

export function CaucasusMountains({
  scrollRef,
  className,
  heightClassName = "h-[min(58vh,520px)] sm:h-[min(54vh,560px)]",
  groundColor = "#100e0c",
  heroBg = "#100e0c",
  mist = true,
}: CaucasusMountainsProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef ?? localRef,
    offset: scrollRef ? ["start start", "end start"] : ["start end", "end start"],
  });

  const mistOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.4, 0.25]);

  return (
    <motion.div
      ref={localRef}
      className={cn("caucasus-mountains", heightClassName, className)}
      style={{
        ["--ground" as string]: groundColor,
        ["--hero-bg" as string]: heroBg,
      }}
      aria-hidden
    >
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__glow" />

      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__mist" />

      <motion.div className="caucasus-mountains__stack">
        {LAYERS.map((layer) => (
          <ParallaxLayer key={layer.src} {...layer} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>

      <div className="caucasus-mountains__fade-top" />
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__fade-bottom" />
    </motion.div>
  );
}
