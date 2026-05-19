"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import { MENU, type MenuCategory, type MenuItem, CONTACT } from "@/lib/georgian-menu";
import { addToCart } from "@/lib/cart-store";
import { TelegramEmoji } from "@/components/ui/telegram-emoji";
import { MenuDishCard } from "@/components/menu-dish-card";
import { PlusIcon, CheckIcon, PhoneIcon, VkIcon } from "@/components/ui/icons";

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
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
        ) : (
          <span />
        )}
        {item.unit && <span className="label-caps text-ink-soft/40 text-[0.6rem]">{item.unit}</span>}
      </div>

      <p
        className="text-ink font-bold mt-2 leading-snug"
        style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.05rem,1.8vw,1.3rem)" }}
      >
        {item.name}
      </p>

      <p className="mt-2 text-ink/45 text-[13px] leading-relaxed text-desc flex-1">{item.shortDesc}</p>

      <div className="mt-4 pt-3 border-t border-wine/10 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span
            className="font-bold text-wine"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.4rem,2.5vw,1.8rem)" }}
          >
            {item.price.toLocaleString("ru-RU")}
          </span>
          <span className="text-wine/60 font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
            ₽
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          aria-label={added ? "Добавлено в корзину" : `Добавить ${item.name} в корзину`}
          className={`btn-add-light ${added ? "!bg-wine !text-cream !border-wine" : ""}`}
        >
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
  const featured = category.items.filter((item) => item.image);
  const regular = category.items.filter((item) => !item.image);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-5"
      >
        {featured.length > 0 && (
          <div className="menu-featured-grid grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((item, i) => (
              <MenuDishCard key={item.name} item={item} index={i} categoryLabel={category.title} />
            ))}
          </div>
        )}

        {regular.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regular.map((item, i) => (
              <MenuCard key={item.name} item={item} index={i + featured.length} />
            ))}
          </div>
        )}
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
    <section id="menu" ref={ref} className="bg-menu relative overflow-visible py-20 sm:py-28 px-6 sm:px-10">
      <div className="section-watermark top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-ink pointer-events-none select-none">
        МЕНЮ
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-10 sm:mb-12"
        >
          <div className="ornament-line ornament-line-light mb-4 max-w-xs">
            <span className="label-caps text-wine/60">Меню</span>
          </div>
          <h2 className="display-section text-ink leading-tight">
            Попробуй<br />
            <span className="text-wine">Грузию</span> на вкус
          </h2>
        </motion.div>

        <div className="menu-tabs-sticky">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="tabs-scroll">
              <LayoutGroup id="menu-categories">
                <div className="menu-tabs-track" role="tablist" aria-label="Категории меню">
                  {MENU.map((cat) => {
                    const isActive = cat.id === activeId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveId(cat.id)}
                        className="menu-tab"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="menu-tab-active"
                            className="menu-tab-active-bg"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                          />
                        )}
                        <span className="menu-tab-inner">
                          <TelegramEmoji name={cat.emoji} size={20} />
                          <span>{cat.title}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-3 mb-6"
        >
          <TelegramEmoji name={active.emoji} size={40} />
          <h3
            className="font-bold text-ink"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem,3.5vw,2.4rem)" }}
          >
            {active.title}
          </h3>
          <span className="ml-auto label-caps text-ink/30">{active.items.length} позиций</span>
        </motion.div>

        <CategoryGrid category={active} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.55 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a href={`tel:${CONTACT.phoneRaw}`} className="btn-wine px-10 py-4">
            <PhoneIcon /> Позвонить и заказать
          </a>
          <a
            href={CONTACT.vk}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в ВКонтакте"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-wine/25 text-wine font-semibold text-sm hover:border-wine/60 hover:bg-wine/5 transition-all"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <VkIcon /> ВКонтакте
          </a>
        </motion.div>
      </div>
    </section>
  );
}
