"use client";

import { CONTACT } from "@/lib/georgian-menu";
import { motion } from "framer-motion";

export function ContactsContent() {
  return (
    <>
      <section className="bg-hero py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h1 className="display-section text-ink mb-4 leading-tight">
              Свяжитесь<br /><span className="text-wine">с нами</span>
            </h1>
            <p className="text-ink/50 max-w-lg body-mono">Закажите доставку прямо сейчас или напишите нам вопрос. Ответим в течение часа.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.a href={`tel:${CONTACT.phoneRaw}`}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="group menu-card p-8 sm:p-10 bg-gradient-to-br from-wine/10 to-gold/5">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">☎️</span>
                <div>
                  <h3 className="text-ink font-bold text-xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>Позвоните нам</h3>
                  <p className="text-ink/40 text-sm body-mono">Быстро и удобно</p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl text-ink font-bold mb-6 group-hover:text-wine transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                {CONTACT.phone}
              </p>
              <button className="btn-wine w-full justify-center">Позвонить</button>
            </motion.a>

            <motion.a href={CONTACT.vk} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
              className="group menu-card p-8 sm:p-10 bg-gradient-to-br from-gold/10 to-wine/5">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">💬</span>
                <div>
                  <h3 className="text-ink font-bold text-xl mb-1" style={{ fontFamily: "var(--font-heading)" }}>Напишите в ВКонтакте</h3>
                  <p className="text-ink/40 text-sm body-mono">Ответим вскоре</p>
                </div>
              </div>
              <p className="text-2xl sm:text-3xl text-ink font-bold mb-6 group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                {CONTACT.vkHandle}
              </p>
              <button className="btn-primary w-full justify-center">Открыть ВКонтакте</button>
            </motion.a>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
            className="menu-card p-8 sm:p-10">
            <h2 className="text-ink font-bold text-2xl mb-8" style={{ fontFamily: "var(--font-heading)" }}>Информация</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-wine text-sm font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>Режим работы</p>
                <p className="text-ink/60 text-lg body-mono">Ежедневно<br />с 11:00 до 23:00</p>
              </div>
              <div>
                <p className="text-wine text-sm font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono)" }}>Область доставки</p>
                <p className="text-ink/60 text-lg body-mono">Весь город<br />и пригороды</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="display-section text-cream mb-6">Готовы заказать?</h2>
            <p className="text-cream/50 mb-8 max-w-xl mx-auto body-mono">Свежая, горячая грузинская кухня доставляется к вашему дому за 30–45 минут.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT.phoneRaw}`} className="btn-primary px-8 py-4 justify-center">Позвонить сейчас</a>
              <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer" className="btn-outline-light px-8 py-4 justify-center">Написать в ВК →</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
