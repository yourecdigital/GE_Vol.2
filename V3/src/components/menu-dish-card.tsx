"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "@/lib/georgian-menu";
import { addToCart } from "@/lib/cart-store";
import { PlusIcon, CheckIcon, CloseIcon } from "@/components/ui/icons";

const basePath =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

export function MenuDishCard({ item, index, categoryLabel = "мангал" }: {
  item: MenuItem; index: number; categoryLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const imageSrc = item.image ? `${basePath}${item.image}` : "";

  const handleAdd = useCallback(() => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }, [item]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="menu-dish-card group"
      >
        <button type="button" onClick={() => setOpen(true)} className="menu-dish-card__media"
          aria-label={`Открыть описание: ${item.name}`}>
          {imageSrc && (
            <Image src={imageSrc} alt={item.name} fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              priority={index < 2} />
          )}
          <div className="menu-dish-card__media-shade" aria-hidden />
          <div className="menu-dish-card__media-top" aria-hidden>
            {item.badge && <span className={`badge ${item.badge === "хит" ? "badge-hit" : "badge-gold"}`}>{item.badge}</span>}
            {item.unit && <span className="menu-dish-card__unit">{item.unit}</span>}
          </div>
          <div className="menu-dish-card__media-bottom" aria-hidden>
            <span className="menu-dish-card__chef-tag">{categoryLabel.toLowerCase()}</span>
            <h4 className="menu-dish-card__title">{item.name}</h4>
          </div>
          <span className="menu-dish-card__open-hint label-caps">подробнее</span>
        </button>

        <div className="menu-dish-card__body">
          <p className="menu-dish-card__teaser">{item.shortDesc}</p>
          <div className="menu-dish-card__footer">
            <div className="menu-dish-card__price">
              <span className="menu-dish-card__price-value">{item.price.toLocaleString("ru-RU")}</span>
              <span className="menu-dish-card__price-currency">₽</span>
            </div>
            <div className="menu-dish-card__actions">
              <button type="button" onClick={() => setOpen(true)} className="menu-dish-card__ghost">Читать</button>
              <button type="button" onClick={handleAdd}
                className={`menu-dish-card__cta ${added ? "menu-dish-card__cta--done" : ""}`}>
                {added ? <><CheckIcon /> В корзине</> : <><PlusIcon /> В корзину</>}
              </button>
            </div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && (
          <>
            <motion.button type="button"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="menu-dish-modal__backdrop" onClick={() => setOpen(false)} aria-label="Закрыть" />
            <motion.div role="dialog" aria-modal="true" aria-labelledby={`dish-${item.name}`}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="menu-dish-modal-wrap">
              <div className="menu-dish-modal">
                <button type="button" className="menu-dish-modal__close" onClick={() => setOpen(false)} aria-label="Закрыть">
                  <CloseIcon />
                </button>
                {imageSrc && (
                  <div className="menu-dish-modal__hero">
                    <Image src={imageSrc} alt={item.name} fill sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover object-center" priority />
                    <div className="menu-dish-modal__hero-shade" aria-hidden />
                  </div>
                )}
                <div className="menu-dish-modal__content">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="label-caps text-gold/70">{categoryLabel}</span>
                    {item.badge && <span className={`badge ${item.badge === "хит" ? "badge-hit" : "badge-gold"}`}>{item.badge}</span>}
                    {item.unit && <span className="label-caps text-ink/35">{item.unit}</span>}
                  </div>
                  <h3 id={`dish-${item.name}`} className="menu-dish-modal__title">{item.name}</h3>
                  <p className="menu-dish-modal__desc">{item.desc ?? item.shortDesc}</p>
                  <div className="menu-dish-modal__bar">
                    <div className="menu-dish-card__price">
                      <span className="menu-dish-card__price-value text-[clamp(1.75rem,4vw,2.25rem)]">{item.price.toLocaleString("ru-RU")}</span>
                      <span className="menu-dish-card__price-currency">₽</span>
                    </div>
                    <button type="button" onClick={handleAdd}
                      className={`btn-primary menu-dish-modal__add ${added ? "!bg-wine" : ""}`}>
                      {added ? <><CheckIcon /> Добавлено</> : <><PlusIcon /> Добавить в корзину</>}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
