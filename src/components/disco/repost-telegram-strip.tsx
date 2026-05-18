"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { TELEGRAM_REPOST_URL } from "@/lib/disco-config";
import { cn } from "@/lib/utils";

/** PNG из `public/cursors/cursor-17-discount.cur` (скрипт scripts/cur-17-to-png.mjs); hotspot 10×10 */
const DISCOUNT_CURSOR_PNG = "/cursors/cursor-17-discount.png";
const CURSOR_HOTSPOT = 10;
const CURSOR_SIZE = 32;
const CURSOR_DISPLAY_SCALE = 2.35;
const HOTSPOT_PX = CURSOR_HOTSPOT * CURSOR_DISPLAY_SCALE;
const ORIGIN_XY = `${HOTSPOT_PX}px ${HOTSPOT_PX}px`;

type CursorPts = {
  idleLeft: number;
  idleTop: number;
  aimLeft: number;
  aimTop: number;
};

/**
 * Координаты левого верхнего угла слоя курсора (absolute внутри контейнера),
 * чтобы активная точка (хотспот) совпала с центром @xxibro / «idle» в правом верху.
 */
function measureCursorPositions(
  container: HTMLElement,
  handle: HTMLElement,
  hotspot: number,
): CursorPts {
  const c = container.getBoundingClientRect();
  const t = handle.getBoundingClientRect();

  const aimCenterX = t.left + t.width / 2 - c.left;
  const aimCenterY = t.top + t.height / 2 - c.top;
  /** Чуть выше центра глифов — визуально по «кликабельной» зоне @xxibro */
  const AIM_TOP_OFFSET = -4;
  const aimLeft = Math.round(aimCenterX - hotspot);
  const aimTop = Math.round(aimCenterY - hotspot) + AIM_TOP_OFFSET;

  const iw = c.width;
  const ih = c.height;
  const idleCenterX = iw * 0.82;
  const idleCenterY = ih * 0.12;
  const idleLeft = Math.round(idleCenterX - hotspot);
  const idleTop = Math.round(idleCenterY - hotspot);

  return { idleLeft, idleTop, aimLeft, aimTop };
}

/** Полоска-призыв: ширина может совпадать с первой строкой героя (измеряется снаружи). */
export function RepostTelegramStrip({
  className,
  matchWidthPx,
}: {
  className?: string;
  /** Ширина в px как у надписи «СУПЕР ДИСКОТЕКА 90х» */
  matchWidthPx?: number | null;
}) {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const handleRef = useRef<HTMLSpanElement>(null);
  const [pts, setPts] = useState<CursorPts | null>(null);

  const boom = useCallback(() => {
    setBurst((n) => n + 1);
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    const tg = handleRef.current;
    if (!el || !tg) return;

    const update = () => {
      setPts(measureCursorPositions(el, tg, HOTSPOT_PX));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(tg);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [matchWidthPx]);

  return (
    <a
      ref={containerRef}
      href={TELEGRAM_REPOST_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={boom}
      style={
        matchWidthPx != null && matchWidthPx > 0
          ? {
              width: matchWidthPx,
              maxWidth: "100%",
            }
          : undefined
      }
      className={cn(
        "mc-cursor-disk-discount group relative mb-8 box-border block overflow-hidden rounded-xl border-2 border-[#00ffd5]/45 bg-black/75 px-4 py-4 text-left shadow-[0_0_32px_rgba(0,255,210,0.22)] backdrop-blur-sm transition hover:border-[#ff3050]/75 hover:shadow-[0_0_40px_rgba(255,50,80,0.38)] sm:px-6 sm:py-5 md:mb-12 md:px-8 md:py-6",
        matchWidthPx == null || matchWidthPx <= 0 ? "w-full" : "max-w-full",
        className
      )}
    >
      <p
        className="relative z-[1] pr-1 text-[13px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#00ffd5] break-words sm:text-[14px] md:pr-3 md:text-base md:leading-relaxed md:tracking-[0.16em] lg:text-[1.05rem]"
        style={{ fontFamily: "var(--font-disco-display)" }}
      >
        Скидка за{" "}
        <span className="relative inline-block text-white underline decoration-[#ff4060] decoration-2 underline-offset-[5px] md:decoration-[3px] md:underline-offset-[6px]">
          репост афиши в историю
        </span>
        — тап сюда, промокод в Telegram
      </p>
      <span className="relative z-[1] mt-2 block text-xs text-white/60 sm:mt-2.5 sm:text-[13px] md:mt-3 md:text-sm">
        Откроется{" "}
        <span
          ref={handleRef}
          className="relative z-[1] inline-block rounded-sm text-[#ff9ec6] group-hover:text-[#7cf7ff]"
        >
          @xxibro
        </span>
      </span>

      {!reduce && pts != null && (
        <motion.div
          key={`cur-${Math.round(pts.aimLeft)}-${Math.round(pts.aimTop)}`}
          aria-hidden
          className="pointer-events-none absolute z-20"
          style={{
            width: CURSOR_SIZE * CURSOR_DISPLAY_SCALE,
            height: CURSOR_SIZE * CURSOR_DISPLAY_SCALE,
            transformOrigin: ORIGIN_XY,
          }}
          initial={false}
          animate={{
            left: [
              `${pts.idleLeft}px`,
              `${pts.aimLeft}px`,
              `${pts.aimLeft}px`,
              `${pts.aimLeft}px`,
              `${pts.aimLeft}px`,
              `${pts.idleLeft}px`,
            ],
            top: [
              `${pts.idleTop}px`,
              `${pts.aimTop}px`,
              `${pts.aimTop}px`,
              `${pts.aimTop}px`,
              `${pts.aimTop}px`,
              `${pts.idleTop}px`,
            ],
            scale: [1, 1, 0.68, 0.68, 0.88, 1],
          }}
          transition={{
            duration: 4.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            times: [0, 0.31, 0.36, 0.43, 0.52, 1],
          }}
        >
          <Image
            src={DISCOUNT_CURSOR_PNG}
            alt=""
            width={CURSOR_SIZE}
            height={CURSOR_SIZE}
            className="pointer-events-none block h-full w-full select-none object-contain object-left-top [image-rendering:pixelated]"
            draggable={false}
          />
        </motion.div>
      )}

      {burst > 0 && !reduce && (
        <motion.div
          key={burst}
          initial={{ opacity: 0.9, scale: 0.2 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,80,40,0.9),rgba(255,200,0,0.4),transparent_70%)]"
        />
      )}
    </a>
  );
}
