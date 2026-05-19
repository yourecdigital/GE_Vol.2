"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONTACT } from "@/lib/georgian-menu";

export function FooterSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer id="contact" ref={ref} className="bg-dark border-t border-cream/[0.05]">
      {/* CTA block */}
      <div className="relative overflow-hidden py-24 sm:py-32 px-6 sm:px-10">
        {/* glow */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(139,24,24,0.18), transparent 65%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl text-gold/15 select-none float-orb"
            style={{ fontFamily: "var(--font-display)" }}>
            ✦
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display-section text-cream">
            Готовы<br />
            <span className="text-gold-shimmer">заказать?</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-cream/45 max-w-sm"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem,1.5vw,1.15rem)" }}>
            Позвоните или напишите в ВКонтакте — ответим быстро и с удовольствием!
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center">
            <motion.a href={`tel:${CONTACT.phoneRaw}`}
              whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
              className="btn-primary text-lg px-10 py-5">
              <PhoneIcon />
              {CONTACT.phone}
            </motion.a>
            <motion.a href={CONTACT.vk} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
              className="btn-outline text-lg px-10 py-5">
              <VkIcon />
              ВКонтакте
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-cream/[0.06] py-7 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4
          text-cream/25 text-xs" style={{ fontFamily: "var(--font-sans)" }}>
          <div className="flex items-center gap-3">
            <span className="font-bold text-gold/40 text-sm" style={{ fontFamily: "var(--font-display)" }}>
              «Вкусно как в Грузии»
            </span>
            <span>·</span>
            <span>Доставка грузинской кухни</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer"
              className="hover:text-cream/50 transition-colors">
              vk.com/{CONTACT.vkHandle}
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="hover:text-cream/50 transition-colors">
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
function VkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.75h-1.54c-.58 0-.76-.47-1.8-1.52-.9-.88-1.3-.99-1.52-.99-.31 0-.4.09-.4.52v1.39c0 .37-.12.59-1.1.59-1.62 0-3.42-.98-4.68-2.8C5.57 11.15 5 9.33 5 8.93c0-.22.09-.43.52-.43h1.54c.39 0 .54.18.69.6.76 2.2 2.03 4.12 2.55 4.12.2 0 .29-.09.29-.58V10.4c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.36.39-.36h2.42c.33 0 .45.18.45.57v3.06c0 .33.15.45.24.45.2 0 .36-.12.72-.49 1.11-1.24 1.9-3.15 1.9-3.15.1-.22.29-.43.68-.43h1.54c.46 0 .56.24.46.57-.19.88-2.05 3.51-2.05 3.51-.16.26-.22.37 0 .66.16.22.68.67 1.03 1.08.64.73 1.13 1.34 1.26 1.76.13.42-.09.64-.52.64z"/>
    </svg>
  );
}
