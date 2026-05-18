"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { useHeroSmoothProgress } from "@/components/disco/hero-street-scene";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const POSTER_W = 686;
const POSTER_H = 1024;
const DESKTOP_POSTER_MAX_W_PX = 1300;

/** Начало «голливудского» ульта: гасим idle-качку */
const FLY_IDLE_GATE = 0.64;

function pointerNorm(clientX: number, clientY: number) {
  const w = typeof window !== "undefined" ? window.innerWidth : 1;
  const h = typeof window !== "undefined" ? window.innerHeight : 1;
  return {
    nx: (clientX / w - 0.5) * 2,
    ny: (clientY / h - 0.5) * 2,
  };
}

type PosterFrameProps = {
  desktopFx: boolean;
  /** Лёгкий «живой» изгиб листа (пружина + перекос), не картон */
  paperElastic?: boolean;
  /** Вуаль при скролле — только под рамкой (иначе z перекрывал кромку) */
  matrixVeilOpacity?: MotionValue<number> | null;
};

/** Пружинный изгиб листа: сумма «порывов»; верх развевается при опоре снизу у родителя. */
function PaperWindElastic({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  const gustY = useMotionValue(0);
  const gustX = useMotionValue(0);
  const gustZ = useMotionValue(0);
  const gustSkew = useMotionValue(0);
  const gustScaleY = useMotionValue(1);

  const rotateY = useSpring(gustY, { stiffness: 92, damping: 16, mass: 0.52 });
  const rotateX = useSpring(gustX, { stiffness: 98, damping: 17, mass: 0.55 });
  const rotateZ = useSpring(gustZ, { stiffness: 78, damping: 13, mass: 0.62 });
  const skewX = useSpring(gustSkew, { stiffness: 68, damping: 14, mass: 0.64 });
  const scaleY = useSpring(gustScaleY, { stiffness: 118, damping: 19, mass: 0.48 });

  const updateWind = useCallback(
    (timeMs: number) => {
      if (reduce) return;
      const t = timeMs * 0.001;
      gustY.set(
        Math.sin(t * 1.85) * 7.2 +
          Math.sin(t * 2.95 + 1.05) * 4.9 +
          Math.sin(t * 4.65 + 2.2) * 2.85,
      );
      gustX.set(
        5.2 +
          Math.sin(t * 2.05 + 0.4) * 3.55 +
          Math.sin(t * 3.55 + 1.7) * 1.45 +
          Math.sin(t * 5.2 + 2.8) * 0.85,
      );
      gustZ.set(
        Math.sin(t * 2.35 + 0.9) * 2.15 + Math.sin(t * 5.15 + 0.2) * 1.05 + Math.sin(t * 7.2 + 1.4) * 0.55,
      );
      gustSkew.set(Math.sin(t * 2.25 + 1.2) * 2.5 + Math.sin(t * 4.9) * 0.72 + Math.sin(t * 6.4 + 0.3) * 0.35);
      gustScaleY.set(1 + Math.sin(t * 3.1 + 0.5) * 0.014 + Math.sin(t * 5.4 + 1.1) * 0.008 + Math.sin(t * 2.7 + 0.2) * 0.004);
    },
    [reduce, gustY, gustX, gustZ, gustSkew, gustScaleY],
  );

  useAnimationFrame(updateWind);

  if (reduce) {
    return (
      <div
        className="w-fit max-w-full origin-bottom will-change-transform [transform-box:fill-box] [-webkit-transform-style:preserve-3d] [transform-style:preserve-3d]"
        style={{ transform: "perspective(1100px) rotateX(5.4deg) rotateY(-0.35deg)" }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="w-fit max-w-full origin-bottom will-change-transform [-webkit-transform-style:preserve-3d] [transform-box:fill-box] [transform-style:preserve-3d] [perspective:1100px]"
      style={{
        rotateX,
        rotateY,
        rotateZ,
        skewX,
        scaleY,
      }}
    >
      {children}
    </motion.div>
  );
}

function PosterFrame({
  desktopFx,
  paperElastic = false,
  matrixVeilOpacity = null,
}: PosterFrameProps) {
  const posterDropShadow = cn(
    "overflow-visible rounded-md shadow-[0_30px_90px_rgba(0,0,0,0.85)]",
    desktopFx && "shadow-[0_28px_100px_rgba(0,0,0,0.88),0_0_42px_rgba(255,100,40,0.28)]",
  );

  const body = (
    <div className="relative isolate z-[1] w-fit max-w-full leading-none">
      <div className="relative w-fit max-w-full">
        <picture className="block leading-none">
          <source srcSet="/poster.webp" type="image/webp" />
          <Image
            src="/poster.png"
            alt="Афиша: супер-дискотека 90-х в Рамбове, DJ Pototskiy, розыгрыш среди пришедших"
            width={POSTER_W}
            height={POSTER_H}
            priority
            sizes={`(max-width: 767px) 100vw, ${DESKTOP_POSTER_MAX_W_PX}px`}
            className={cn(
              "block h-auto w-auto max-w-full rounded-md",
              "object-contain object-center",
              "max-w-[min(96vw,720px)]",
              "md:max-w-[min(94vw,82rem)]",
            )}
          />
        </picture>
        {desktopFx && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen rounded-md"
              style={{
                background:
                  "linear-gradient(118deg, transparent 40%, rgba(255,240,200,0.38) 50%, rgba(255,80,60,0.1) 54%, transparent 64%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["18% 0%", "82% 0%", "18% 0%"] }}
              transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[3] rounded-md opacity-[0.12] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px z-[4] rounded-md mix-blend-screen opacity-20"
              style={{
                boxShadow:
                  "inset 2px 0 0 rgba(0,200,255,0.18), inset -2px 0 0 rgba(255,60,80,0.22)",
              }}
            />
          </>
        )}
        {matrixVeilOpacity != null && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[8] rounded-md mix-blend-soft-light"
            style={{
              opacity: matrixVeilOpacity,
              backgroundImage: `linear-gradient(
              168deg,
              transparent 8%,
              rgba(255, 50, 70, 0.12) 38%,
              rgba(255, 120, 90, 0.1) 48%,
              rgba(0, 240, 220, 0.09) 58%,
              transparent 82%
            ),
            repeating-linear-gradient(
              92deg,
              transparent,
              transparent 10px,
              rgba(255, 60, 80, 0.05) 10px,
              rgba(255, 60, 80, 0.05) 11px
            )`,
            }}
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[20] rounded-md"
          style={{
            boxShadow: `
            inset 0 0 0 3px rgba(255, 120, 35, 0.98),
            inset 0 0 0 6px rgba(0, 0, 0, 0.38),
            inset 0 1px 0 rgba(255, 235, 200, 0.35),
            inset 0 -1px 0 rgba(140, 55, 12, 0.42)
          `,
          }}
        />
      </div>
    </div>
  );

  const flexWrap = paperElastic ? (
    <PaperWindElastic>
      <div className={cn("w-fit max-w-full", posterDropShadow)}>{body}</div>
    </PaperWindElastic>
  ) : (
    <motion.div
      className={cn(
        "w-fit max-w-full will-change-transform [-webkit-transform-style:preserve-3d] [transform-box:fill-box] [transform-style:preserve-3d] [perspective:1100px]",
        posterDropShadow,
      )}
      animate={{ rotateX: 5.4, rotateY: -0.35 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {body}
    </motion.div>
  );

  return (
    <div className="relative w-fit max-w-full overflow-visible leading-none">
      <div className="[transform:translateZ(0)]">{flexWrap}</div>
    </div>
  );
}

/**
 * Афиша: клей снизу → срыв. Полёт + мышь + турбулентность; лист ведёт себя как бумага, не как картон.
 */
export function PosterBanditBlock() {
  const reduce = useReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)");
  const smooth = useHeroSmoothProgress();
  const zero = useMotionValue(0);
  const src = smooth ?? zero;

  const idleGateRef = useRef(true);
  const [idleSwayOn, setIdleSwayOn] = useState(true);

  const mouseXN = useMotionValue(0);
  const mouseYN = useMotionValue(0);
  const mouseX = useSpring(mouseXN, { stiffness: 112, damping: 26, mass: 0.46 });
  const mouseY = useSpring(mouseYN, { stiffness: 112, damping: 26, mass: 0.46 });

  useEffect(() => {
    if (typeof window === "undefined" || reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: MouseEvent) => {
      const { nx, ny } = pointerNorm(e.clientX, e.clientY);
      mouseXN.set(nx);
      mouseYN.set(ny);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mouseXN, mouseYN]);

  useMotionValueEvent(src, "change", (v) => {
    const on = v < FLY_IDLE_GATE;
    if (idleGateRef.current !== on) {
      idleGateRef.current = on;
      setIdleSwayOn(on);
    }
  });

  const mouseMix = useTransform(src, [0, 0.48, 0.6, 0.7, 0.82, 1], [0, 0, 0.18, 0.55, 0.92, 1]);

  const flutterZ = useMotionValue(0);
  const flutterX = useMotionValue(0);
  const flutterY = useMotionValue(0);

  const updateFlutter = useCallback(
    (timeMs: number) => {
      if (reduce) {
        flutterZ.set(0);
        flutterX.set(0);
        flutterY.set(0);
        return;
      }
      const p = src.get();
      if (p < 0.62 || !isMd) {
        flutterZ.set(0);
        flutterX.set(0);
        flutterY.set(0);
        return;
      }
      const t = timeMs * 0.001;
      const w = Math.min(1, Math.max(0, (p - 0.62) / 0.38));
      const envelope = w * w * (3 - 2 * w);
      flutterZ.set(
        (Math.sin(t * 2.45) * 0.55 +
          Math.sin(t * 4.15 + 1.1) * 0.38 +
          Math.sin(t * 6.9 + 0.4) * 0.28) *
          32 *
          envelope,
      );
      flutterX.set(Math.sin(t * 3.05 + 0.65) * 11 * envelope);
      flutterY.set(Math.cos(t * 2.75 + 0.9) * 16 * envelope);
    },
    [src, isMd, flutterZ, flutterX, flutterY, reduce],
  );

  useAnimationFrame(updateFlutter);

  const rotateZScroll = useTransform(
    src,
    [0, 0.32, 0.55, 0.64, 0.72, 0.78, 0.84, 0.9, 0.95, 1],
    isMd
      ? [0, 2.2, -2.4, -3.2, -10, -26, -54, -95, -158, -225]
      : [0, 1.8, -2.0, -2.8, -7.5, -18, -40, -68, -104, -142],
  );

  const rotateXScroll = useTransform(
    src,
    [0, 0.5, 0.68, 0.82, 0.92, 1],
    isMd ? [0, 2.8, 7.5, 17, 28, 42] : [0, 3.5, 9.5, 16, 24, 32],
  );

  const rotateYScroll = useTransform(
    src,
    [0, 0.58, 0.74, 0.86, 1],
    isMd ? [0, -4.5, -26, -58, -88] : [0, -3.5, -16, -38, -58],
  );

  const translateZScroll = useTransform(
    src,
    [0, 0.62, 0.76, 0.9, 1],
    isMd ? [0, 24, 12, -55, -95] : [0, 16, 8, -38, -68],
  );

  const flyXScroll = useTransform(
    src,
    [0, 0.72, 0.8, 0.89, 1],
    isMd ? [0, 0, 48, 160, 280] : [0, 0, 32, 105, 210],
  );

  /** Плавное опускание афишы: к концу героя ~⅓ высоты уходит под блок «2000» (z секции выше). */
  const scrollDriftY = useTransform(
    src,
    [0, 0.14, 0.38, 0.62, 0.84, 1],
    isMd
      ? [0, 32, 98, 185, 298, 322]
      : [0, 20, 60, 108, 158, 172],
  );

  /** Лёгкая донастройка вниз в самом конце скролла героя */
  const flyYExtra = useTransform(
    src,
    [0, 0.84, 0.94, 1],
    isMd ? [0, 0, 16, 26] : [0, 0, 12, 18],
  );

  const flyScale = useTransform(
    src,
    [0, 0.26, 0.72, 0.92, 1],
    isMd ? [0.9, 0.97, 1.02, 0.96, 0.9] : [0.86, 0.94, 1.0, 0.94, 0.88],
  );

  const flyOpacity = useTransform(src, [0, 0.88, 1], [1, 0.97, 0.9]);

  const flyBlur = useTransform(
    src,
    [0, 0.9, 1],
    isMd
      ? ["blur(0px)", "blur(0px)", "blur(1.8px)"]
      : ["blur(0px)", "blur(0px)", "blur(1px)"],
  );

  const glow = useTransform(src, [0, 0.45, 0.72, 1], [0.88, 0.55, 0.22, 0]);

  const matrixVeilOpacity = useTransform(src, [0, 0.58, 0.72, 0.88, 1], [0, 0, 0.14, 0.32, 0.48]);

  const mxBoost = isMd ? 1 : 0.72;

  const rotateZ = useTransform(
    [rotateZScroll, flutterZ, mouseX, mouseY, mouseMix],
    ([rz, fz, mx, my, mix]) =>
      (rz as number) +
      (fz as number) +
      (mix as number) * mxBoost * ((mx as number) * 26 + (my as number) * 11),
  );

  const rotateX = useTransform(
    [rotateXScroll, flutterX, mouseY, mouseMix],
    ([rx, fx, my, mix]) =>
      (rx as number) + (fx as number) + (mix as number) * mxBoost * ((my as number) * 14 + 4),
  );

  const rotateY = useTransform(
    [rotateYScroll, flutterY, mouseX, mouseMix],
    ([ry, fy, mx, mix]) =>
      (ry as number) + (fy as number) + (mix as number) * mxBoost * ((mx as number) * -18 - 6),
  );

  const translateZ = useTransform(
    [translateZScroll, mouseY, mouseMix],
    ([tz, my, mix]) =>
      (tz as number) + (mix as number) * mxBoost * ((my as number) * 55 + 12),
  );

  const flyX = useTransform(
    [flyXScroll, mouseX, mouseY, mouseMix],
    ([x, mx, my, mix]) =>
      (x as number) +
      (mix as number) *
        mxBoost *
        ((mx as number) * (isMd ? 200 : 130) + (my as number) * (isMd ? 55 : 38)),
  );

  const flyY = useTransform(
    [scrollDriftY, flyYExtra, mouseX, mouseY, mouseMix],
    ([d, f, mx, my, mix]) =>
      (d as number) +
      (f as number) +
      (mix as number) *
        mxBoost *
        ((my as number) * (isMd ? -145 : -95) + (mx as number) * (isMd ? -42 : -28)),
  );

  const flyYReduced = useTransform(
    [scrollDriftY, flyYExtra],
    ([d, f]) => (d as number) + (f as number),
  );

  if (!smooth) {
    return (
      <div className="relative flex w-full justify-center px-0.5">
        <div className="pointer-events-none absolute inset-[-6%] z-0 rounded-lg bg-[radial-gradient(circle_at_50%_48%,rgba(255,60,40,0.48),transparent_58%)] blur-2xl opacity-50" />
        <div className="relative z-[1] w-fit max-w-full">
          <PosterFrame desktopFx={false} paperElastic={false} />
        </div>
      </div>
    );
  }

  if (reduce) {
    return (
      <motion.div
        className="relative flex w-full justify-center px-0.5"
        style={{
          x: flyXScroll,
          y: flyYReduced,
          opacity: flyOpacity,
          scale: flyScale,
        }}
      >
        <div className="pointer-events-none absolute inset-[-6%] z-0 rounded-lg bg-[radial-gradient(circle_at_50%_48%,rgba(255,60,40,0.48),transparent_58%)] blur-2xl opacity-50" />
        <div className="relative z-[1] w-fit max-w-full">
          <PosterFrame desktopFx={false} paperElastic={false} />
        </div>
      </motion.div>
    );
  }

  const paperElastic = idleSwayOn;

  return (
    <motion.div
      key={isMd ? "poster-md" : "poster-sm"}
      className="relative flex w-full justify-center px-0.5 [-webkit-transform-style:preserve-3d]"
      style={{
        x: flyX,
        y: flyY,
        z: translateZ,
        rotateX,
        rotateY,
        rotateZ,
        scale: flyScale,
        opacity: flyOpacity,
        filter: flyBlur,
        transformPerspective: isMd ? 920 : 720,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 92%",
        willChange: isMd ? "transform, opacity, filter" : "transform, opacity",
      }}
    >
      <motion.div
        className="relative z-[1] flex w-fit max-w-full flex-col items-center [transform-box:fill-box] [-webkit-transform-style:preserve-3d]"
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 92%" }}
        animate={
          idleSwayOn
            ? isMd
              ? {
                  rotateZ: [-7.8, 9.2, -6.4, 9.8, -7.8],
                  rotateX: [-1.35, 1.55, -1.1, 1.72, -1.35],
                  rotateY: [-3.95, 4.85, -3.25, 5.35, -3.95],
                  y: [-7.2, 8.4, -6.2, 7.6, -7.2],
                }
              : {
                  rotateZ: [-3.6, 4.1, -3.6],
                  rotateY: [-1.85, 2.05, -1.85],
                  y: [-3.6, 4.1, -3.6],
                }
            : { rotateZ: 0, rotateX: 0, rotateY: 0, y: 0 }
        }
        transition={
          idleSwayOn
            ? {
                duration: isMd ? 7.9 : 5.55,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: isMd ? [0, 0.23, 0.48, 0.74, 1] : undefined,
              }
            : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
        }
      >
        <div className="relative z-[1] mx-auto w-fit max-w-full">
          <motion.div
            className="pointer-events-none absolute inset-[-10%] z-0 rounded-lg bg-[radial-gradient(circle_at_50%_42%,rgba(255,80,50,0.62),rgba(255,30,40,0.22)_35%,transparent_58%)] blur-[22px]"
            style={{ opacity: glow }}
            aria-hidden
          />
          <PosterFrame
            desktopFx={isMd}
            paperElastic={paperElastic}
            matrixVeilOpacity={isMd ? matrixVeilOpacity : null}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
