"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/**
 * Плавный скролл колёсиком на десктопе (медленнее и мягче). На тач-устройствах и при
 * prefers-reduced-motion не подключается — нативный скролл без лишней работы GPU.
 */
export function SmoothScrollProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mq = window.matchMedia("(min-width: 768px)");
    let lenis: Lenis | null = null;

    const start = () => {
      lenis?.destroy();
      lenis = null;
      if (!mq.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        /** Ниже lerp / wheel — дольше «доезжает» и мягче шаг колеса (герой короче — не уезжает в хаос) */
        lerp: 0.026,
        wheelMultiplier: 0.4,
        touchMultiplier: 1,
      });
    };

    start();
    mq.addEventListener("change", start);
    return () => {
      mq.removeEventListener("change", start);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
