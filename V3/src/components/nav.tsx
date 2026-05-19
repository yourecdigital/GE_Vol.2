"use client";

import { useEffect, useState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/georgian-menu";
import { PhoneIcon, VkIcon, ArrowUpRightIcon } from "@/components/ui/icons";

const LINKS = [
  { label: "Меню", href: "/menu" },
  { label: "О нас", href: "/about" },
  { label: "Доставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

function MobileMenuTrigger({ open, onToggle, controlsId }: {
  open: boolean; onToggle: () => void; controlsId: string;
}) {
  return (
    <button
      type="button"
      className="mobile-menu-trigger"
      data-open={open}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? "Закрыть меню" : "Открыть меню"}
    >
      <span className="mobile-menu-trigger__icon" aria-hidden="true">
        <span className="mobile-menu-trigger__bar" />
        <span className="mobile-menu-trigger__bar" />
        <span className="mobile-menu-trigger__bar" />
      </span>
      <span className="mobile-menu-trigger__label">{open ? "закрыть" : "меню"}</span>
    </button>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <>
      <header className={`site-header ${scrolled || open ? "nav-glass" : ""}`}>
        <div className="site-header__inner">
          <Link href="/" onClick={close} className="site-header__brand group">
            <span className="site-header__brand-tag group-hover:text-gold transition-colors">доставка</span>
            <span className="site-header__brand-title">вкусно как в грузии</span>
          </Link>

          <nav className="site-header__desktop" aria-label="Основная навигация">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`label-caps transition-colors duration-200 tracking-widest ${
                  pathname === l.href ? "text-gold" : "text-ink/40 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <div className="site-header__actions--mobile flex items-center gap-1.5">
              <a href={`tel:${CONTACT.phoneRaw}`} className="mobile-phone-chip" aria-label={`Позвонить ${CONTACT.phone}`}>
                <PhoneIcon size={15} />
              </a>
              <MobileMenuTrigger open={open} onToggle={toggle} controlsId={panelId} />
            </div>
            <a href={`tel:${CONTACT.phoneRaw}`} className="site-header__phone-desktop btn-wine px-5 py-2.5 text-xs">
              <PhoneIcon size={15} /> {CONTACT.phone}
            </a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="mobile-menu-backdrop"
              aria-label="Закрыть меню"
              onClick={close}
            />

            <motion.div
              key="panel"
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Навигация"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="mobile-menu-panel"
            >
              <motion.div className="mobile-menu-panel__head"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.35 }}>
                <p className="mobile-menu-panel__tag">навигация · доставка</p>
                <p className="mobile-menu-panel__title">вкусно как в грузии</p>
              </motion.div>

              <nav className="mobile-menu-nav" aria-label="Разделы сайта">
                {LINKS.map((l, i) => (
                  <motion.div key={l.href}
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.055, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    <Link href={l.href} onClick={close} data-active={pathname === l.href} className="mobile-menu-link">
                      <span className="mobile-menu-link__index">{String(i + 1).padStart(2, "0")}</span>
                      <span className="mobile-menu-link__label">{l.label}</span>
                      <span className="mobile-menu-link__arrow"><ArrowUpRightIcon /></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div className="mobile-menu-footer"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.4 }}>
                <a href={`tel:${CONTACT.phoneRaw}`} onClick={close} className="btn-primary justify-center py-4 w-full">
                  <PhoneIcon /> {CONTACT.phone}
                </a>
                <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer" onClick={close}
                  className="btn-outline justify-center py-4 w-full">
                  <VkIcon /> ВКонтакте
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
