"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MENU, type MenuCategory, CONTACT } from "@/lib/georgian-menu";
import { addToCart } from "@/lib/cart-store";

function MenuCard({ item, index }: { item: MenuCategory["items"][0]; index: number }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="menu-card-light flex flex-col"
    >
      <div className="flex items-center justify-between mb-1">
        {item.badge ? (
          <span className={`badge ${item.badge === "хит" ? "badge-hit" : "badge-gold"}`}>{item.badge}</span>
        ) : <span />}
        {item.unit && <span className="label-caps text-ink-soft/40 text-[0.6rem]">{item.unit}</span>}
      </div>

      <p className="text-ink font-bold mt-2 leading-snug"
        style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.05rem,1.8vw,1.3rem)" }}>
        {item.name}
      </p>

      <p className="mt-2 text-ink/45 text-[13px] leading-relaxed body-mono flex-1">
        {item.shortDesc}
      </p>

      <div className="mt-4 pt-3 border-t border-wine/10 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-wine"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem,2.5vw,1.8rem)" }}>
            {item.price.toLocaleString("ru-RU")}
          </span>
          <span className="text-wine/60 font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>₽</span>
        </div>

        <button onClick={handleAdd} className={`btn-add-light ${added ? "!bg-wine !text-cream !border-wine" : ""}`}>
          {added ? (
            <><CheckIcon /> Добавлено</>
          ) : (
            <><PlusIcon /> В корзину</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function CategoryGrid({ category }: { category: MenuCategory }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {category.items.map((item, i) => (
          <MenuCard key={item.name} item={item} index={i} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export function MenuSection() {
  const [activeId, setActiveId] = useState(MENU[0].id);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const active = MENU.find((c) => c.id === activeId) ?? MENU[0];

  return (
    <section id="menu" ref={ref} className="bg-menu relative overflow-hidden py-20 sm:py-28 px-6 sm:px-10">
      <div className="section-watermark top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-ink pointer-events-none select-none">
        МЕНЮ
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }} className="mb-10 sm:mb-12">
          <div className="ornament-line ornament-line-light mb-4 max-w-xs">
            <span className="label-caps text-wine/60">Меню</span>
          </div>
          <h2 className="display-section text-ink leading-tight">
            Попробуй<br /><span className="text-wine">Грузию</span> на вкус
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="tabs-scroll flex gap-2 pb-1 mb-8">
          {MENU.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button key={cat.id} onClick={() => setActiveId(cat.id)}
                className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                  isActive
                    ? "bg-wine text-cream shadow-[0_4px_20px_rgba(114,47,55,0.35)]"
                    : "text-ink/50 hover:text-ink bg-ink/5 hover:bg-ink/10"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}>
                <span>{cat.emoji}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}
          className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{active.emoji}</span>
          <h3 className="font-bold text-ink" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}>
            {active.title}
          </h3>
          <span className="ml-auto label-caps text-ink/30">{active.items.length} позиций</span>
        </motion.div>

        <CategoryGrid category={active} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a href={`tel:${CONTACT.phoneRaw}`} className="btn-wine px-10 py-4">
            <PhoneIcon /> Позвонить и заказать
          </a>
          <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-wine/25 text-wine font-semibold text-sm hover:border-wine/60 hover:bg-wine/5 transition-all"
            style={{ fontFamily: "var(--font-mono)" }}>
            <VkIcon /> ВКонтакте
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PlusIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>; }
function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>; }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>; }
function VkIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.75h-1.54c-.58 0-.76-.47-1.8-1.52-.9-.88-1.3-.99-1.52-.99-.31 0-.4.09-.4.52v1.39c0 .37-.12.59-1.1.59-1.62 0-3.42-.98-4.68-2.8C5.57 11.15 5 9.33 5 8.93c0-.22.09-.43.52-.43h1.54c.39 0 .54.18.69.6.76 2.2 2.03 4.12 2.55 4.12.2 0 .29-.09.29-.58V10.4c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.36.39-.36h2.42c.33 0 .45.18.45.57v3.06c0 .33.15.45.24.45.2 0 .36-.12.72-.49 1.11-1.24 1.9-3.15 1.9-3.15.1-.22.29-.43.68-.43h1.54c.46 0 .56.24.46.57-.19.88-2.05 3.51-2.05 3.51-.16.26-.22.37 0 .66.16.22.68.67 1.03 1.08.64.73 1.13 1.34 1.26 1.76.13.42-.09.64-.52.64z"/></svg>; }
