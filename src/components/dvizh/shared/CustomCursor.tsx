"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function animate() {
      cur!.style.left = mx + "px";
      cur!.style.top = my + "px";
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring!.style.left = rx + "px";
      ring!.style.top = ry + "px";
      raf = requestAnimationFrame(animate);
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

    document.addEventListener("mousemove", onMove);
    animate();

    const targets = document.querySelectorAll("a, button, .service-card, .review-card, .camp-detail");
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
      <div ref={curRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
