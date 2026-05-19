"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/georgian/hero-section";
import { PromoBanner } from "@/components/georgian/promo-banner";
import { FeaturesSection } from "@/components/georgian/features-section";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Wave: hero → promo */}
      <div className="relative z-20 -mt-px">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
          <path d="M0 30C360 55 720 5 1080 30C1260 42 1380 25 1440 30V60H0Z" fill="#E8C8B8"/>
        </svg>
      </div>

      <PromoBanner />

      {/* Wave: promo → CTA dark */}
      <div className="relative z-20 -mt-px">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
          <path d="M0 30C240 55 480 5 720 30C960 55 1200 5 1440 30V60H0Z" fill="#1A110A"/>
        </svg>
      </div>

      <section className="bg-dark py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }} className="flex-1">
            <h2 className="display-section text-cream mb-6 leading-tight">
              Откроем<br /><span className="text-gold-shimmer">вам Грузию</span>
            </h2>
            <p className="text-cream/45 mb-8 body-mono max-w-sm leading-relaxed">
              50+ блюд в 10 категориях. Отберите свои фавориты или доверьтесь рекомендациям. Доставим горячим.
            </p>
            <Link href="/menu" className="btn-primary px-10 py-4">Перейти в меню →</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }} className="flex-1 w-full">
            <div className="rounded-2xl aspect-square bg-gradient-to-br from-gold/10 to-wine/10 border border-cream/[0.08] flex items-center justify-center">
              <span className="text-8xl text-cream/15 select-none">🍴</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave: CTA dark → features dark (subtle) */}
      <FeaturesSection />
    </main>
  );
}
