"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const shells = {
  teal: {
    body: "from-[#0a2624] via-[#061514] to-[#020808]",
    window: "from-[#e8fff9] to-[#b8ede0]",
    accent: "from-[#00ffd5]/35 via-[#00a896]/25 to-[#00ffd5]/30",
    reel: "border-[#5cffea]/55",
    imageFilter:
      "saturate(1.1) hue-rotate(160deg) contrast(1.06) brightness(1.04)",
  },
  orange: {
    body: "from-[#3d1808] via-[#200c04] to-[#0a0301]",
    window: "from-[#fff4e8] to-[#ffd4b0]",
    accent: "from-[#ff6b35]/40 via-[#ff3050]/20 to-[#ffb347]/35",
    reel: "border-[#ffb48a]/50",
    imageFilter:
      "saturate(1.2) hue-rotate(-8deg) contrast(1.08) brightness(1.05)",
  },
  purple: {
    body: "from-[#1e0a28] via-[#100518] to-[#050208]",
    window: "from-[#fce8ff] to-[#e4b8f0]",
    accent: "from-[#e040fb]/35 via-[#7c3aed]/30 to-[#f472b6]/35",
    reel: "border-[#e9a8ff]/45",
    imageFilter:
      "saturate(1.15) hue-rotate(275deg) contrast(1.06) brightness(1.03)",
  },
  /** Малиновая «радио-микс» под бонус-трек */
  ruby: {
    body: "from-[#2a0818] via-[#14050c] to-[#060204]",
    window: "from-[#fff0f5] to-[#ffc8dc]",
    accent: "from-[#ff1a6b]/38 via-[#c9184a]/25 to-[#ff6b9d]/32",
    reel: "border-[#ff9ec4]/50",
    imageFilter:
      "saturate(1.22) hue-rotate(305deg) contrast(1.07) brightness(1.04)",
  },
} as const;

type Shell = keyof typeof shells;

const CASSETTE_PNG = "/disco/cassette-orwo.png";
const CASSETTE_WEBP = "/disco/cassette-orwo.webp";

/** Центры ступиц на ORWO `cassette-orwo.png` (1024×648), в % относительно контейнера с картинкой */
const REEL_LEFT_X = "32%";
const REEL_RIGHT_X = "68%";
const REEL_Y = "47%";
/** Диаметр ≈ 13–14% ширины кадра кассеты */
const REEL_DIAM = "13.5%";

/** Карточка с фото кассеты (фон вырезан), цвет под «ракушку», лёгкая анимация «играет» */
export function CassetteTapeCard({
  children,
  delay = 0,
  className,
  shell = "teal",
  sideLabel = "A",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  shell?: Shell;
  sideLabel?: "A" | "B";
}) {
  const reduce = !!useReducedMotion();
  const skin = shells[shell];

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 36, rotateX: -10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ type: "spring", stiffness: 200, damping: 24, delay }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border-2 border-black/85 shadow-[0_14px_0_rgba(0,0,0,0.5),0_24px_56px_rgba(0,0,0,0.65)]",
        "bg-gradient-to-b",
        skin.body,
        className
      )}
    >
      <CassetteVisual skin={skin} reduce={reduce} />

      <div
        className={cn(
          "relative border-t border-black/40 px-3 py-3 md:px-4 md:py-3.5",
          "bg-gradient-to-br text-zinc-900",
          skin.window
        )}
      >
        <div className="mb-1.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-600">
          <span>Chrome · 90 min</span>
          <span className="rounded border border-zinc-900/30 bg-white/40 px-1.5 py-0.5 text-zinc-800">
            {sideLabel}
          </span>
        </div>
        <div className="text-sm leading-snug md:text-[15px] [&_p]:text-inherit">
          {children}
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={reduce ? undefined : { opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.article>
  );
}

function CassetteVisual({
  skin,
  reduce,
}: {
  skin: (typeof shells)[Shell];
  reduce: boolean;
}) {
  return (
    <div className="relative overflow-hidden bg-black/25 px-2 pt-3 md:px-4 md:pt-4">
      <motion.div
        className="relative mx-auto w-full max-w-[min(100%,34rem)] lg:max-w-none"
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                y: [0, -5, 0, -3, 0],
                rotate: [0, 0.5, 0, -0.4, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={
          reduce
            ? undefined
            : {
                scale: 1.03,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.55, ease: "easeOut" },
              }
        }
        style={{ transformOrigin: "50% 60%" }}
      >
        <div className="relative">
          <picture className="block leading-none">
            <source srcSet={CASSETTE_WEBP} type="image/webp" />
            <Image
              src={CASSETTE_PNG}
              alt=""
              width={1024}
              height={648}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="relative z-[1] h-auto w-full select-none object-contain [image-rendering:auto] drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
              style={{ filter: skin.imageFilter }}
              priority={false}
            />
          </picture>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light",
              "bg-gradient-to-tr",
              skin.accent
            )}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-[3] opacity-[0.12] mix-blend-overlay"
            aria-hidden
            animate={
              reduce
                ? undefined
                : {
                    opacity: [0.08, 0.18, 0.1, 0.16, 0.08],
                  }
            }
            transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY }}
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
            }}
          />

          <SpinningReelAnchor
            style={{ left: REEL_LEFT_X, top: REEL_Y, width: REEL_DIAM }}
          >
            <SpinningReelDecoration
              className={skin.reel}
              reduce={reduce}
              counterClockwise={false}
            />
          </SpinningReelAnchor>
          <SpinningReelAnchor
            style={{ left: REEL_RIGHT_X, top: REEL_Y, width: REEL_DIAM }}
          >
            <SpinningReelDecoration
              className={skin.reel}
              reduce={reduce}
              counterClockwise
            />
          </SpinningReelAnchor>
        </div>
      </motion.div>
    </div>
  );
}

function SpinningReelAnchor({
  style,
  children,
}: {
  style: { left: string; top: string; width: string };
  children: ReactNode;
}) {
  return (
    <div
      className="pointer-events-none absolute z-[4] aspect-square -translate-x-1/2 -translate-y-1/2"
      style={style}
    >
      {children}
    </div>
  );
}

function SpinningReelDecoration({
  className,
  reduce,
  counterClockwise,
}: {
  className?: string;
  reduce: boolean;
  counterClockwise?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none h-full w-full rounded-full border-[3px] border-dashed border-white/20 bg-black/5 shadow-[inset_0_0_12px_rgba(255,255,255,0.15)] md:border-[4px]",
        className
      )}
      animate={reduce ? undefined : { rotate: counterClockwise ? -360 : 360 }}
      transition={{
        duration: 14,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      aria-hidden
    />
  );
}
