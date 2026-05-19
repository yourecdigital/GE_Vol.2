"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { MouseParallax, ScrollParallax } from "react-just-parallax";

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

/* ─────────────────────────────────────────
   3-layer Caucasus mountains with:
   • Scroll parallax (depth illusion on scroll)
   • Mouse parallax (interactive depth on hover)
   • Smooth spring physics
   • Atmospheric haze & glow
   ───────────────────────────────────────── */

const LAYERS = [
  {
    src: "/mountains/caucasus-far.png",
    scrollStrength: 0.12,
    mouseStrength: 0.02,
    z: 1,
    cls: "caucasus-layer--far",
    scale: 1.15,
    blur: 1.2,
  },
  {
    src: "/mountains/caucasus-mid.png",
    scrollStrength: 0.22,
    mouseStrength: 0.04,
    z: 2,
    cls: "caucasus-layer--mid",
    scale: 1.08,
    blur: 0.4,
  },
  {
    src: "/mountains/caucasus-near.png",
    scrollStrength: 0.35,
    mouseStrength: 0.065,
    z: 3,
    cls: "caucasus-layer--near",
    scale: 1.04,
    blur: 0,
  },
] as const;

function ParallaxLayer({
  src,
  scrollStrength,
  mouseStrength,
  cls,
  scale,
  blur,
  scrollYProgress,
}: {
  src: string;
  scrollStrength: number;
  mouseStrength: number;
  cls: string;
  scale: number;
  blur: number;
  scrollYProgress: MotionValue<number>;
}) {
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", `${scrollStrength * 100}%`]);
  const y = useSpring(rawY, { stiffness: 80, damping: 30, mass: 0.8 });

  /* Slight scale animation on scroll — far layers shrink, near grow */
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    [scale, scale + scrollStrength * 0.15]
  );
  const smoothScale = useSpring(rawScale, { stiffness: 60, damping: 25 });

  return (
    <ScrollParallax strength={scrollStrength * 0.3} lerpEase={0.04}>
      <MouseParallax strength={mouseStrength} lerpEase={0.035} isAbsolutelyPositioned>
        <motion.div
          style={{ y, scale: smoothScale }}
          className={`caucasus-layer-wrap ${cls}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}${src}`}
            alt=""
            aria-hidden
            className="caucasus-layer__img"
            decoding="async"
            loading="eager"
            style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined}
          />
        </motion.div>
      </MouseParallax>
    </ScrollParallax>
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

  const mistOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.45, 0.2]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.4, 1], [0.8, 0.55, 0.3]);

  /* Reduced motion respect */
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      ref={localRef}
      className={`caucasus-mountains ${heightClassName} ${className}`}
      style={{ "--ground": groundColor, "--hero-bg": heroBg } as React.CSSProperties}
      aria-hidden
    >
      {/* Atmospheric green glow */}
      <motion.div style={{ opacity: glowIntensity }} className="caucasus-mountains__glow" />

      {/* Mist layer */}
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__mist" />

      {/* Mountain layers */}
      <div className="caucasus-mountains__stack">
        {LAYERS.map((layer) =>
          prefersReduced ? (
            <div key={layer.src} className={`caucasus-layer-wrap ${layer.cls}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}${layer.src}`}
                alt=""
                aria-hidden
                className="caucasus-layer__img"
                decoding="async"
                loading="eager"
              />
            </div>
          ) : (
            <ParallaxLayer
              key={layer.src}
              src={layer.src}
              scrollStrength={layer.scrollStrength}
              mouseStrength={layer.mouseStrength}
              cls={layer.cls}
              scale={layer.scale}
              blur={layer.blur}
              scrollYProgress={scrollYProgress}
            />
          )
        )}
      </div>

      {/* Top fade — blends into hero section */}
      <div className="caucasus-mountains__fade-top" />

      {/* Bottom fade — blends into next section */}
      <motion.div style={{ opacity: mistOpacity }} className="caucasus-mountains__fade-bottom" />

      {/* Floating atmosphere particles (CSS-only) */}
      {!prefersReduced && (
        <div className="caucasus-mountains__particles" aria-hidden>
          <span className="mountain-particle mountain-particle--1" />
          <span className="mountain-particle mountain-particle--2" />
          <span className="mountain-particle mountain-particle--3" />
        </div>
      )}
    </motion.div>
  );
}
