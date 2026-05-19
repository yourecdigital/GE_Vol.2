"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/georgian/hero-section";
import { PromoBanner } from "@/components/georgian/promo-banner";
import { FeaturesSection } from "@/components/georgian/features-section";
import { TelegramEmoji } from "@/components/telegram-emoji";

export default function Home() {
  return (
    <main className="home-flow">
      <HeroSection />

      <PromoBanner />

      <section className="bg-menu relative py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }} className="flex-1">
            <div className="ornament-line ornament-line-light mb-4 max-w-xs">
              <span className="label-caps text-wine/60">меню</span>
            </div>
            <h2 className="display-section text-ink mb-6 leading-tight">
              Откроем<br /><span className="text-wine">вам Грузию</span>
            </h2>
            <p className="text-ink/45 mb-8 body-mono max-w-sm leading-relaxed">
              50+ блюд в 10 категориях. Отберите свои фавориты или доверьтесь рекомендациям. Доставим горячим.
            </p>
            <Link href="/menu" className="btn-primary px-10 py-4">Перейти в меню →</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }} className="flex-1 w-full">
            <div className="menu-card-light rounded-2xl aspect-square flex items-center justify-center border border-wine/20">
              <TelegramEmoji name="fork_plate" size={96} className="opacity-90" />
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturesSection />
    </main>
  );
}
