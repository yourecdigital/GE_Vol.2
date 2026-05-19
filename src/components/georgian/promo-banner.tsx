"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROMO, CONTACT } from "@/lib/georgian-menu";

export function PromoBanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="promo" ref={ref} className="bg-promo relative overflow-hidden py-20 sm:py-28 px-6 sm:px-10">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(114,47,55,0.08), transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-wine/80 text-cream label-caps px-5 py-2 rounded-full mb-7">
            <span className="text-base">🎉</span>
            <span>{PROMO.title}</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="text-ink/50 mb-3 body-mono">
            {PROMO.condition} —
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h2 className="text-gold-shimmer display-section leading-[1.0] mb-6">
              Хачапури<br />по-Аджарски<br />
              <span className="text-ink">— ПОДАРОК!</span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-ink/35 mb-8 label-caps">
            <CalIcon />
            <span>Акция: {PROMO.dateFrom} — {PROMO.dateTo}</span>
          </motion.div>

          <motion.a href={`tel:${CONTACT.phoneRaw}`}
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.52, duration: 0.55 }}
            whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
            className="btn-wine px-10 py-4">
            <PhoneIcon /> Успеть заказать!
          </motion.a>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-full lg:w-72 xl:w-80">
          <div className="rounded-2xl border border-wine/15 p-8 flex flex-col items-center text-center gap-5"
            style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(12px)" }}>
            <motion.div className="text-5xl spin-slow opacity-40 text-gold select-none"
              style={{ fontFamily: "var(--font-heading)" }}>✦</motion.div>
            <p className="label-caps text-wine/60">Абсолютно бесплатно</p>
            <div className="text-4xl">🎁</div>
            <p className="text-ink font-bold leading-snug" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.2rem,2.5vw,1.6rem)" }}>
              Хачапури<br />по-Аджарски
            </p>
            <p className="text-ink/35 text-sm body-mono">Успей порадовать себя!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CalIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>; }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>; }
