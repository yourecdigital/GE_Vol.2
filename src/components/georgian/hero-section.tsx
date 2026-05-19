"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONTACT } from "@/lib/georgian-menu";
import { CaucasusMountains } from "@/components/ui/caucasus-mountains";

function Word({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <div style={{ overflow: "hidden", display: "inline-block" }}>
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="bg-menu hero-with-header relative min-h-[100dvh] flex flex-col overflow-hidden pb-0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[12%] right-[8%] w-[min(320px,55vw)] h-[min(320px,55vw)] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(164, 86, 50, 0.35), transparent 68%)" }} />
        <div className="absolute bottom-[28%] left-[4%] w-[min(420px,70vw)] h-[min(420px,70vw)] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(196, 154, 114, 0.22), transparent 70%)" }} />
      </div>

      <motion.div style={{ y: contentY, opacity }}
        className="relative z-10 flex flex-col flex-1 justify-center px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full pb-[min(28vh,200px)] sm:pb-[min(26vh,220px)]">

        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 sm:mb-8 flex items-center gap-3">
          <span className="w-8 h-px bg-gold/40" />
          <span className="label-caps text-ink/50">настоящая грузинская кухня</span>
        </motion.div>

        <h1 className="display-hero text-ink mb-0 flex flex-col gap-0">
          <Word delay={0.2}>вкусно</Word>
          <span className="text-gold-shimmer display-hero block leading-[0.95]">
            <Word delay={0.32}>как</Word>{" "}
            <Word delay={0.42}>в грузии</Word>
          </span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-7 sm:mt-9 text-ink/50 max-w-lg body-mono">
          Хинкали, хачапури, шашлыки на мангале и харчо по&nbsp;традиционным
          рецептам — доставляем горячим прямо к&nbsp;вашему столу.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.65 }}
          className="mt-9 sm:mt-10 flex flex-wrap gap-4">
          <Link href="/menu" className="btn-primary px-8 py-4">
            Открыть меню <ArrowDown />
          </Link>
          <a href={`tel:${CONTACT.phoneRaw}`} className="btn-outline px-8 py-4"><PhoneIcon /> {CONTACT.phone}</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-14 sm:mt-16 flex flex-wrap gap-x-10 gap-y-3">
          {[
            { val: "50+", label: "блюд в меню" },
            { val: "10", label: "категорий" },
            { val: "7", label: "дней в неделю" },
          ].map((m) => (
            <div key={m.label} className="flex items-baseline gap-2">
              <span className="font-medium text-gold" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>{m.val}</span>
              <span className="label-caps text-ink/30">{m.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="relative z-20 self-center mb-2 flex flex-col items-center gap-2 pointer-events-none">
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-ink/30 to-transparent" />
      </motion.div>

      <CaucasusMountains
        scrollRef={ref}
        groundColor="#100e0c"
        heroBg="#100e0c"
        className="absolute inset-x-0 bottom-0 z-[5]"
        heightClassName="h-[min(58vh,520px)] sm:h-[min(54vh,560px)] md:h-[min(50vh,580px)]"
      />
    </section>
  );
}

function ArrowDown() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>; }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>; }
