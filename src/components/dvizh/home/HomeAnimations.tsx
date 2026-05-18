"use client";

import { useEffect } from "react";
import { loadGSAP } from "@/lib/gsap";
import { revealUp, fadeIn, countUp } from "@/lib/animations";

export function HomeAnimations() {
  useEffect(() => {
    loadGSAP().then(() => {
      const { gsap } = window as any;

      const heroTL = gsap.timeline({ defaults: { ease: "expo" } });
      heroTL
        .to("#heroName1", { y: "0%", duration: 1.1, delay: 0.3 })
        .to("#heroName2", { y: "0%", duration: 1.1 }, "-=0.85")
        .to("#heroDvizh", { y: "0%", duration: 1 }, "-=0.7")
        .to("#heroMeta", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to("#heroSub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to("#heroCount", { opacity: 1, duration: 0.7 }, "-=0.2");

      fadeIn("#mLabel", "#manifesto", { x: 0 });
      revealUp(["#m1", "#m2", "#m3", "#m4"], "#manifesto", 0.1);
      gsap.to("#m5", {
        y: "0%", duration: 1.2, ease: "bounce",
        scrollTrigger: { trigger: "#manifesto", start: "top 60%" },
      });
      fadeIn("#manifestoBody", "#manifesto", { delay: 0.4 });

      fadeIn("#statsLabel", "#stats", {});
      ["#s1", "#s2", "#s3", "#s4", "#s5", "#s6"].forEach((id, i) => {
        gsap.to(id, {
          opacity: 1, y: 0, duration: 0.8, ease: "expo", delay: i * 0.08,
          scrollTrigger: { trigger: "#stats", start: "top 75%" },
        });
      });

      document.querySelectorAll("[data-target]").forEach((el) => countUp(el));

      fadeIn("#tlLabel", "#timeline", {});
      revealUp(["#tlt1", "#tlt2"], "#timeline", 0.1);
      gsap.to("#tlt3", {
        y: "0%", duration: 1.1, ease: "bounce",
        scrollTrigger: { trigger: "#timeline", start: "top 70%" },
      });
      ["#ti1", "#ti2", "#ti3", "#ti4"].forEach((id, i) => {
        gsap.to(id, {
          opacity: 1, y: 0, duration: 0.7, ease: "expo", delay: i * 0.12,
          scrollTrigger: { trigger: "#timeline", start: "top 60%" },
        });
      });

      fadeIn("#svLabel", "#services", {});
      revealUp(["#svT1", "#svT2"], "#services", 0.1);
      ["#sc1", "#sc2", "#sc3", "#sc4"].forEach((id, i) => {
        gsap.to(id, {
          opacity: 1, y: 0, duration: 0.8, ease: "expo", delay: i * 0.1,
          scrollTrigger: { trigger: "#services", start: "top 65%" },
        });
      });

      fadeIn("#tourLabel", "#tour", {});
      revealUp(["#tourT1", "#tourT2"], "#tour", 0.12);
      ["#td1", "#td2", "#td3", "#td4", "#td5", "#td6"].forEach((id, i) => {
        gsap.to(id, {
          opacity: 1, x: 0, duration: 0.7, ease: "expo", delay: i * 0.08,
          scrollTrigger: { trigger: "#tour", start: "top 65%" },
        });
      });

      fadeIn("#campLabel", "#camp", {});
      revealUp(["#campT1"], "#camp", 0.1);
      gsap.to("#campT2", {
        y: "0%", duration: 1.1, ease: "bounce",
        scrollTrigger: { trigger: "#camp", start: "top 70%" },
      });
      fadeIn("#campDesc", "#camp", { delay: 0.3 });
      gsap.to("#campDetails", {
        opacity: 1, y: 0, duration: 0.9, ease: "expo", delay: 0.2,
        scrollTrigger: { trigger: "#camp", start: "top 65%" },
      });

      fadeIn("#qLabel", "#quote", {});
      revealUp(["#qt1", "#qt2"], "#quote", 0.15);
      gsap.to("#qt3", {
        y: "0%", duration: 1.2, ease: "bounce",
        scrollTrigger: { trigger: "#quote", start: "top 70%" },
      });
      gsap.to("#qSig", {
        opacity: 1, duration: 0.7, delay: 0.4,
        scrollTrigger: { trigger: "#quote", start: "top 65%" },
      });

      fadeIn("#revLabel", "#reviews", {});
      revealUp(["#revT1", "#revT2"], "#reviews", 0.12);
      ["#rv1", "#rv2", "#rv3"].forEach((id, i) => {
        gsap.to(id, {
          opacity: 1, y: 0, duration: 0.8, ease: "expo", delay: i * 0.12,
          scrollTrigger: { trigger: "#reviews", start: "top 70%" },
        });
      });

      fadeIn("#ctEye", "#contact", {});
      revealUp("#ctT1", "#contact");
      gsap.to("#ctT2", {
        y: "0%", duration: 1.2, ease: "bounce",
        scrollTrigger: { trigger: "#contact", start: "top 70%" },
      });
      gsap.to("#ctHandle", {
        opacity: 1, y: 0, duration: 0.8, ease: "expo", delay: 0.3,
        scrollTrigger: { trigger: "#contact", start: "top 65%" },
      });
      gsap.to("#ctMeta", {
        opacity: 1, duration: 0.7, delay: 0.5,
        scrollTrigger: { trigger: "#contact", start: "top 65%" },
      });

      gsap.to("#hero .hero-headline", {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, []);

  return null;
}
