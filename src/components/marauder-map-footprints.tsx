"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_PRINTS = 28;
const MIN_STEP_PX = 20;
const FOOT_OFFSET_PX = 12;

type Print = {
  id: number;
  x: number;
  y: number;
  deg: number;
  flip: boolean;
};

function FootprintSvg({ flip, className }: { flip: boolean; className?: string }) {
  return (
    <svg
      className={className}
      width={22}
      height={28}
      viewBox="0 0 32 40"
      aria-hidden
      style={{
        transform: `scaleX(${flip ? -1 : 1})`,
        filter:
          "drop-shadow(0 0 4px rgba(218, 165, 32, 0.35)) drop-shadow(0 1px 0 rgba(0,0,0,0.5))",
      }}
    >
      <g
        fill="rgba(196, 165, 120, 0.72)"
        stroke="rgba(42, 28, 18, 0.65)"
        strokeWidth={0.85}
        strokeLinejoin="round"
      >
        <ellipse cx="10" cy="6.5" rx="2.3" ry="3.1" />
        <ellipse cx="14.5" cy="4.8" rx="2.5" ry="3.3" />
        <ellipse cx="19.5" cy="5.3" rx="2.4" ry="3.05" />
        <ellipse cx="23.5" cy="7.5" rx="2.1" ry="2.85" />
        <path d="M8.5 13 Q16 10.5 24 14 Q26.5 22 20.5 31 Q12.5 35.5 8 28 Q6.5 20 8.5 13Z" />
        <ellipse cx="15" cy="33.5" rx="5.2" ry="4.1" />
      </g>
    </svg>
  );
}

function PrintItem({
  item,
  onEnd,
}: {
  item: Print;
  onEnd: (id: number) => void;
}) {
  return (
    <span
      className="pointer-events-none absolute marauder-footprint-print"
      style={{
        left: item.x,
        top: item.y,
        zIndex: 0,
      }}
      onAnimationEnd={() => onEnd(item.id)}
    >
      <span
        className="inline-block origin-center"
        style={{
          transform: `translate(-50%, -50%) rotate(${item.deg}deg)`,
        }}
      >
        <FootprintSvg flip={item.flip} />
      </span>
    </span>
  );
}

/**
 * Следы за курсором в духе карты Мародёров: чернильно-пергаментные отпечатки, по очереди левый/правый.
 * Только тонкий указатель (мышь); отключено при reduced-motion и на coarse pointer.
 */
export function MarauderMapFootprints() {
  const [prints, setPrints] = useState<Print[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const leftNextRef = useRef(true);
  const rafRef = useRef<number>(0);
  const latestRef = useRef<{ x: number; y: number } | null>(null);

  const removePrint = useCallback((id: number) => {
    setPrints((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduce.matches || coarse.matches) return;

    const flush = () => {
      rafRef.current = 0;
      const pos = latestRef.current;
      latestRef.current = null;
      if (!pos) return;

      const { x, y } = pos;
      const last = lastRef.current;

      if (!last) {
        lastRef.current = { x, y };
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < MIN_STEP_PX) return;

      const ang = Math.atan2(dy, dx);
      const px = x - Math.cos(ang) * FOOT_OFFSET_PX;
      const py = y - Math.sin(ang) * FOOT_OFFSET_PX;
      const deg = (ang * 180) / Math.PI + 90;
      const flip = leftNextRef.current;
      leftNextRef.current = !leftNextRef.current;

      const id = ++idRef.current;
      const next: Print = { id, x: px, y: py, deg: deg + (flip ? -8 : 8), flip };

      setPrints((prev) => [...prev.slice(-(MAX_PRINTS - 1)), next]);
      lastRef.current = { x, y };
    };

    const onMove = (e: MouseEvent) => {
      latestRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[62] overflow-hidden"
      aria-hidden
    >
      {prints.map((p) => (
        <PrintItem key={p.id} item={p} onEnd={removePrint} />
      ))}
    </div>
  );
}
