"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TelegramEmoji } from "@/components/telegram-emoji";
import type { TelegramEmojiId } from "@/lib/telegram-emoji";

const FEATURES: { num: string; icon: TelegramEmojiId; title: string; desc: string }[] = [
  { num: "01", icon: "fire", title: "Мясо на углях", desc: "Шашлыки и каре из ягнёнка на живом огне — сочно, с дымком." },
  { num: "02", icon: "herb", title: "Свежие продукты", desc: "Отборные ингредиенты, специи и рецепты без компромиссов." },
  { num: "03", icon: "rocket", title: "Быстро и горячо", desc: "Доставляем быстро — еда доедет горячей, как только с мангала." },
  { num: "04", icon: "heart", title: "С любовью", desc: "Каждое блюдо — уважение к традициям грузинской кухни." },
];

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-menu relative overflow-hidden py-20 sm:py-28 px-6 sm:px-10">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(164, 86, 50, 0.14), transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="ornament-line ornament-line-light mb-4 max-w-[220px]">
              <span className="label-caps text-wine/60">Почему мы</span>
            </div>
            <h2 className="display-section text-ink">Вкусно,<br />как дома<br />
              <span className="text-wine">в Грузии</span>
            </h2>
          </div>
          <p className="text-ink/40 max-w-xs self-end pb-2 body-mono">
            Мы не просто готовим еду — мы доставляем тепло грузинского гостеприимства.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }}
              className="menu-card-light flex flex-col gap-4 group">
              <span className="label-caps text-wine/35 group-hover:text-wine/55 transition-colors">{f.num}</span>
              <TelegramEmoji name={f.icon} size={48} />
              <h3 className="text-ink font-bold leading-snug" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.15rem,2vw,1.4rem)" }}>
                {f.title}
              </h3>
              <p className="text-ink/45 text-sm body-mono mt-auto">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
