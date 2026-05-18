"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { useMounted } from "@/hooks/use-mounted";
import { useMediaQuery } from "@/hooks/use-media-query";

const SHELL_COLORS = [
  "#ff1a2e",
  "#ff3355",
  "#e31837",
  "#00f5e0",
  "#ffcc00",
  "#ff4d6d",
  "#ff6b3d",
  "#b8fff0",
  "#ffffff",
];

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ttl: number;
  ttl0: number;
  r: number;
  color: string;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function explode(
  x: number,
  y: number,
  accent: string,
  isLowEnd: boolean,
  sparks: Spark[],
  sparkCap: number,
) {
  const n = isLowEnd ? 52 : 78 + Math.floor(Math.random() * 56);
  const room = Math.max(0, sparkCap - sparks.length);
  const count = Math.min(n, room);
  for (let i = 0; i < count; i++) {
    const ring = i < count * 0.55 ? 1 : 0.72 + Math.random() * 0.38;
    const ang = (i / Math.max(count, 1)) * Math.PI * 2 + (Math.random() - 0.5) * 0.22;
    const spd = ring * (2.4 + Math.random() * 5.2);
    const useAccent = Math.random() < 0.34;
    const color = useAccent
      ? accent
      : Math.random() < 0.12
        ? "#ffffff"
        : pick(SHELL_COLORS);
    const ttl = 38 + Math.floor(Math.random() * 55);

    sparks.push({
      x,
      y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd,
      ttl,
      ttl0: ttl,
      r: 0.55 + Math.random() * 1.35,
      color,
    });
  }

  // Лёгкий «хвост» вторым кольцом (как растянутая вспышка)
  if (room > 24 && Math.random() < (isLowEnd ? 0.25 : 0.42)) {
    const n2 = Math.min(28, room - count);
    for (let j = 0; j < n2; j++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 0.9 + Math.random() * 2.4;
      const ttl2 = 28 + Math.floor(Math.random() * 28);
      sparks.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        ttl: ttl2,
        ttl0: ttl2,
        r: 0.4 + Math.random() * 0.55,
        color: pick(SHELL_COLORS),
      });
    }
  }

  // Короткая вспышка в точке взрыва (белёсый ореол)
  if (sparks.length < sparkCap) {
    const flashTtl = 5 + Math.floor(Math.random() * 4);
    sparks.push({
      x,
      y,
      vx: 0,
      vy: 0,
      ttl: flashTtl,
      ttl0: flashTtl,
      r: 14 + Math.random() * 18,
      color: "rgba(255,248,235,0.85)",
    });
  }
}

/**
 * Настоящий салют: снаряд снизу вверх, в зените — радиальный взрыв искр
 * (не конфетти-ленты).
 */
export function FireworksBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  /* На мобилке canvas-фейерверк — лишняя нагрузка, показываем только градиент */
  const runCanvas = mounted && !reduce && !isMobile;

  useEffect(() => {
    if (!runCanvas) return;
    const surface = ref.current;
    if (!surface) return;
    const ctxMaybe = surface.getContext("2d");
    if (!ctxMaybe) return;
    const paintCtx: CanvasRenderingContext2D = ctxMaybe;

    let raf = 0;
    let w = 0;
    let h = 0;
    let lastT = 0;
    let spawnAcc = 0;

    const mem =
      typeof navigator !== "undefined"
        ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory
        : undefined;
    const conn =
      typeof navigator !== "undefined"
        ? (
            navigator as Navigator & {
              connection?: { saveData?: boolean; effectiveType?: string };
            }
          ).connection
        : undefined;
    const saveData = conn?.saveData === true;
    const slowNet =
      conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g";
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isLegacyTouch =
      /iP(hone|od|ad)/i.test(ua) ||
      (/Macintosh/i.test(ua) && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1);

    const isLowEnd =
      (mem !== undefined && mem <= 4) || saveData || slowNet || isLegacyTouch;

    const gravityRocket = 0.15;
    const gravitySpark = 0.11;
    const dragSpark = 0.987;
    const maxRockets = isLowEnd ? 2 : 4;
    const sparkCap = isLowEnd ? 380 : 620;
    const spawnEveryMs = isLowEnd ? 1500 : 780;
    const spawnJitterMs = 900;

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastT = 0;
      } else if (raf === 0) {
        raf = requestAnimationFrame(tick);
      }
    }

    function resize() {
      const c = ref.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1 : 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      paintCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnRocket() {
      if (rockets.length >= maxRockets) return;
      const color = pick(SHELL_COLORS);
      rockets.push({
        x: w * (0.12 + Math.random() * 0.76),
        y: h - 6 - Math.random() * (h * 0.06),
        vx: (Math.random() - 0.5) * 1.1,
        vy: -(11.5 + Math.random() * 8),
        color,
      });
    }

    function tick(now: number) {
      if (document.hidden) {
        raf = 0;
        return;
      }
      const dt = lastT ? Math.min(now - lastT, 48) : 16;
      lastT = now;

      paintCtx.globalCompositeOperation = "source-over";
      paintCtx.fillStyle = "rgba(14, 2, 5, 0.34)";
      paintCtx.fillRect(0, 0, w, h);

      spawnAcc += dt;
      const gap = spawnEveryMs + Math.random() * spawnJitterMs;
      if (spawnAcc >= gap) {
        spawnAcc = 0;
        spawnRocket();
        if (Math.random() < (isLowEnd ? 0.18 : 0.38)) {
          spawnAcc = spawnEveryMs * 0.35;
          spawnRocket();
        }
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]!;
        r.vy += gravityRocket;
        r.x += r.vx;
        r.y += r.vy;

        const apex = r.vy >= 0;
        const offscreen = r.x < -40 || r.x > w + 40;
        const tooHigh = r.y < h * 0.04;

        if (apex || tooHigh || offscreen) {
          const burstY = Math.max(r.y, h * 0.06);
          const burstX = Math.min(Math.max(r.x, 8), w - 8);
          explode(burstX, burstY, r.color, isLowEnd, sparks, sparkCap);
          rockets.splice(i, 1);
          continue;
        }

        paintCtx.save();
        paintCtx.globalCompositeOperation = "lighter";
        paintCtx.fillStyle = r.color;
        paintCtx.globalAlpha = 0.95;
        paintCtx.shadowColor = r.color;
        paintCtx.shadowBlur = 8;
        paintCtx.beginPath();
        paintCtx.arc(r.x, r.y, 1.5, 0, Math.PI * 2);
        paintCtx.fill();
        paintCtx.shadowBlur = 0;
        paintCtx.fillStyle = "rgba(255,255,255,0.65)";
        paintCtx.globalAlpha = 0.5;
        paintCtx.beginPath();
        paintCtx.arc(r.x - r.vx * 0.6, r.y - r.vy * 0.6, 0.9, 0, Math.PI * 2);
        paintCtx.fill();
        paintCtx.restore();
      }

      paintCtx.globalCompositeOperation = "lighter";
      for (let j = sparks.length - 1; j >= 0; j--) {
        const s = sparks[j]!;
        s.vy += gravitySpark;
        s.vx *= dragSpark;
        s.vy *= dragSpark;
        s.x += s.vx;
        s.y += s.vy;
        s.ttl -= 1;

        if (s.ttl <= 0 || s.y > h + 24 || s.x < -60 || s.x > w + 60) {
          sparks.splice(j, 1);
          continue;
        }

        const a = (s.ttl / s.ttl0) * 0.92;
        const rad = s.r * (0.45 + 0.55 * (s.ttl / s.ttl0));

        paintCtx.globalAlpha = a;
        paintCtx.fillStyle = s.color;
        paintCtx.shadowColor = s.color;
        paintCtx.shadowBlur = isLowEnd ? rad * 1.25 : rad * 2.2;
        paintCtx.beginPath();
        paintCtx.arc(s.x, s.y, rad, 0, Math.PI * 2);
        paintCtx.fill();
        paintCtx.shadowBlur = 0;
      }

      paintCtx.globalCompositeOperation = "source-over";
      paintCtx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [runCanvas]);

  if (!runCanvas) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_10%_16%,rgba(255,40,55,0.4),transparent_50%),radial-gradient(ellipse_at_90%_28%,rgba(200,20,40,0.22),transparent_54%),radial-gradient(ellipse_at_50%_98%,rgba(0,255,230,0.08),transparent_48%),#0a0406]"
        aria-hidden
      />
    );
  }

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
