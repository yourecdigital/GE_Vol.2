"use client";

import { useEffect } from "react";
import { loadGSAP } from "@/lib/gsap";

export function SubPageAnimations() {
  useEffect(() => {
    loadGSAP().then(() => {
      const { gsap } = window as any;

      gsap.from(".page-hero-label", {
        opacity: 0, x: -20, duration: 0.8, ease: "expo", delay: 0.2,
      });
      gsap.from(".page-hero-title", {
        opacity: 0, y: 40, duration: 1, ease: "expo", delay: 0.3,
      });
      gsap.from(".page-hero-desc", {
        opacity: 0, y: 20, duration: 0.8, ease: "expo", delay: 0.5,
      });

      gsap.utils.toArray(".page-section-label").forEach((el: unknown) => {
        gsap.from(el as Element, {
          opacity: 0, x: -20, duration: 0.7, ease: "expo",
          scrollTrigger: { trigger: el as Element, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".page-content h2").forEach((el: unknown) => {
        gsap.from(el as Element, {
          opacity: 0, y: 30, duration: 0.9, ease: "expo",
          scrollTrigger: { trigger: el as Element, start: "top 80%" },
        });
      });

      gsap.utils.toArray(".page-content p").forEach((el: unknown) => {
        gsap.from(el as Element, {
          opacity: 0, y: 20, duration: 0.7, ease: "expo",
          scrollTrigger: { trigger: el as Element, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".tour-date, .culture-rule, .camp-detail, .review-card, .service-card").forEach((el: unknown, i: number) => {
        gsap.from(el as Element, {
          opacity: 0, y: 20, duration: 0.6, ease: "expo", delay: i * 0.06,
          scrollTrigger: { trigger: el as Element, start: "top 85%" },
        });
      });
    });
  }, []);

  return null;
}
