"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;
    let moved = false;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (!moved) {
        moved = true;
        cur!.style.opacity = "1";
        ring!.style.opacity = "1";
      }
    }

    function tick() {
      // transform3d triggers compositor — no layout, no paint
      cur!.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring!.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    }

    function onEnter() {
      cur!.style.width = "24px";
      cur!.style.height = "24px";
      ring!.style.width = "60px";
      ring!.style.height = "60px";
    }
    function onLeave() {
      cur!.style.width = "12px";
      cur!.style.height = "12px";
      ring!.style.width = "40px";
      ring!.style.height = "40px";
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    const targets = document.querySelectorAll("a,button,.service-card,.review-card,.org-card,.event-card,.venue-card,.session-card");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={curRef} className="cursor" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
