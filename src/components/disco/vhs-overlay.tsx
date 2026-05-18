"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "@/hooks/use-media-query";

/** Как на просмотре свадебной кассеты на старом ЭЛТ: шум, полосы, штамп слева снизу. */

export function VhsOverlay() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");

  /* ─── Мобилка: только статичные сканлайны — никаких blend-mode и CSS-анимаций ─── */
  if (isMobile) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[60]"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.16) 2px, rgba(0,0,0,0.16) 3px)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "min(14px, 2vh)",
            background:
              "repeating-linear-gradient(90deg, rgba(14,12,16,0.9) 0px, rgba(50,44,50,0.94) 1px, rgba(10,9,12,0.97) 2px, rgba(38,34,40,0.93) 3px, rgba(12,11,14,0.95) 5px)",
          }}
        />
      </div>
    );
  }

  if (reduce) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-soft-light opacity-80"
        aria-hidden
      >
        <TubeCurtain staticOnly />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <HeadSwitchingBand staticOnly />
        <BottomStaticBand staticOnly />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden opacity-[0.62] [animation:vhs-playback-jitter_0.38s_linear_infinite]"
      aria-hidden
    >
      <TubeCurtain />

      {/* Сильнее затемнение по углам «колба» */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 70px 28px rgba(0,0,0,0.28), inset 0 0 160px 90px rgba(15,10,8,0.16)",
        }}
      />

      {/* Выцветание и жёлтизна ЭЛТ */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(ellipse 115% 80% at 50% 42%, rgba(255,230,190,0.55), transparent 58%), rgba(245,220,160,0.06)",
        }}
      />

      {/* Лёгкая «грязь» по полям цвета (как смаз на ленте) */}
      <motion.div
        className="absolute inset-0 opacity-[0.12] mix-blend-hard-light"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,55,95,0.5) 0%, transparent 12%, transparent 88%, rgba(70,255,220,0.4) 100%)",
        }}
        animate={{ opacity: [0.08, 0.14, 0.1, 0.12] }}
        transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.3] mix-blend-color-dodge"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,20,70,0.07), transparent 34%, rgba(0,240,200,0.08), transparent 68%)",
        }}
        animate={{ x: ["-22%", "20%"] }}
        transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Зерно + «снег» */}
      <motion.div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        animate={{ x: [0, -12, 8, 0], y: [0, 10, -6, 0] }}
        transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        animate={{ opacity: [0.05, 0.1, 0.06, 0.08] }}
        transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Строки развёртки */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.26] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.14) 1px, rgba(0,0,0,0.14) 2px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay [animation:vhs-scan-warp_2.4s_linear_infinite]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Плотные горизонтали внизу кадра */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, transparent 1px, transparent 2px, rgba(40,40,48,0.08) 3px, transparent 4px)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] opacity-[0.22] [animation:vhs-bottom-static_2.8s_steps(3)_infinite] mix-blend-soft-light">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent, transparent 6px, rgba(255,255,255,0.028) 7px, transparent 8px, transparent 14px, rgba(0,0,0,0.06) 15px)",
          }}
        />
      </div>

      {/* Рвущиеся линии */}
      {[
        { top: "62%", delay: "0s", dur: 3.8 },
        { top: "78%", delay: "1.1s", dur: 4.6 },
        { top: "88%", delay: "2.4s", dur: 3.2 },
      ].map((row, i) => (
        <div
          key={i}
          className="absolute left-[-5%] right-[-5%] h-[4px] origin-left bg-white/14 blur-[0.4px]"
          style={
            {
              top: row.top,
              animation: `vhs-tearing-line ${row.dur}s linear infinite`,
              animationDelay: row.delay,
            } satisfies CSSProperties
          }
        />
      ))}

      {/* Полосы дорожки */}
      <div
        className="absolute inset-x-0 top-0 h-[18%] opacity-0 [animation:vhs-tracking-drift_6.5s_linear_infinite]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.14) 58%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-[-8%] top-0 h-[11%] opacity-0 [animation:vhs-tracking-ribbon_10.5s_linear_infinite] [animation-delay:2.2s]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,248,230,0.14), rgba(25,22,28,0.38), transparent)",
          filter: "blur(0.5px)",
        }}
      />

      <motion.div
        className="absolute inset-x-0 h-[2.5px] bg-white/14 blur-[0.5px]"
        animate={{ top: ["-6%", "108%"] }}
        transition={{ duration: 11.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute -left-[5%] -right-[5%] top-0 h-[14%] bg-black/12 blur-[2.5px]"
        animate={{ top: ["120%", "-28%"], x: ["0%", "1.8%", "-1%", "0%"] }}
        transition={{ duration: 13.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <HeadSwitchingBand />
      <BottomStaticBand />
    </div>
  );
}

function TubeCurtain({ staticOnly }: { staticOnly?: boolean }) {
  const edge =
    "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 8%, transparent 22%, transparent 78%, rgba(0,0,0,0.35) 92%, rgba(0,0,0,0.72) 100%)";
  return (
    <div
      className={
        staticOnly
          ? "absolute inset-0 z-0 opacity-[0.85]"
          : "absolute inset-0 z-0 opacity-[0.85] [animation:vhs-title-flicker_6s_ease-in-out_infinite]"
      }
      style={{ background: edge, mixBlendMode: "multiply" }}
    />
  );
}

function HeadSwitchingBand({ staticOnly }: { staticOnly?: boolean }) {
  return (
    <div
      className={
        staticOnly
          ? "absolute inset-x-0 bottom-0 z-[2]"
          : "absolute inset-x-0 bottom-0 z-[2] [animation:vhs-head-switch-breathe_0.12s_linear_infinite]"
      }
      style={{
        height: "min(16px, 2.2vh)",
        background: `repeating-linear-gradient(90deg, rgba(14,12,16,0.94) 0px, rgba(58,50,54,0.96) 1px, rgba(10,9,12,0.99) 2px, rgba(44,40,46,0.95) 3px, rgba(12,11,14,0.97) 5px)`,
        boxShadow: "0 -2px 0 rgba(255,255,255,0.05), 0 -4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,240,220,0.035)",
        opacity: staticOnly ? 0.92 : undefined,
      }}
    >
      <div
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)",
        }}
      />
    </div>
  );
}

function BottomStaticBand({ staticOnly }: { staticOnly?: boolean }) {
  return (
    <div
      className={
        staticOnly
          ? "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(22vh,200px)] opacity-30"
          : "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(22vh,200px)] opacity-30 [animation:vhs-bottom-static_1.9s_linear_infinite]"
      }
      style={{
        background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 2px, rgba(0,0,0,0.08) 3px, transparent 5px)",
        mixBlendMode: "overlay",
      }}
    />
  );
}
