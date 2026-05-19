"use client";

import { useEffect, useState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/georgian-menu";

const LINKS = [
  { label: "Меню", href: "/menu" },
  { label: "О нас", href: "/about" },
  { label: "Доставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

function MobileMenuTrigger({
  open,
  onToggle,
  controlsId,
}: {
  open: boolean;
  onToggle: () => void;
  controlsId: string;
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  const headerClass = [
    "site-header",
    scrolled || open ? "nav-glass" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <motion.div className="site-header__inner" layout={false}>
          <Link href="/" onClick={close} className="site-header__brand group">
            <span className="site-header__brand-tag group-hover:text-gold transition-colors">
              доставка
            </span>
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

          <motion.div className="site-header__actions" layout={false}>
            <div className="site-header__actions--mobile flex items-center gap-1.5">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="mobile-phone-chip"
                aria-label={`Позвонить ${CONTACT.phone}`}
              >
                <PhoneIcon />
              </a>
              <MobileMenuTrigger open={open} onToggle={toggle} controlsId={panelId} />
            </div>

            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="site-header__phone-desktop btn-wine px-5 py-2.5 text-xs"
            >
              <PhoneIcon /> {CONTACT.phone}
            </a>
          </motion.div>
        </motion.div>
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
              <motion.div
                className="mobile-menu-panel__head"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
              >
                <p className="mobile-menu-panel__tag">навигация · доставка</p>
                <p className="mobile-menu-panel__title">вкусно как в грузии</p>
              </motion.div>

              <nav className="mobile-menu-nav" aria-label="Разделы сайта">
                {LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.055,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={close}
                      data-active={pathname === l.href}
                      className="mobile-menu-link"
                    >
                      <span className="mobile-menu-link__index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mobile-menu-link__label">{l.label}</span>
                      <span className="mobile-menu-link__arrow" aria-hidden="true">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
              >
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  onClick={close}
                  className="btn-primary justify-center py-4 w-full"
                >
                  <PhoneIcon /> {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="btn-outline justify-center py-4 w-full"
                >
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

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.75h-1.54c-.58 0-.76-.47-1.8-1.52-.9-.88-1.3-.99-1.52-.99-.31 0-.4.09-.4.52v1.39c0 .37-.12.59-1.1.59-1.62 0-3.42-.98-4.68-2.8C5.57 11.15 5 9.33 5 8.93c0-.22.09-.43.52-.43h1.54c.39 0 .54.18.69.6.76 2.2 2.03 4.12 2.55 4.12.2 0 .29-.09.29-.58V10.4c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.36.39-.36h2.42c.33 0 .45.18.45.57v3.06c0 .33.15.45.24.45.2 0 .36-.12.72-.49 1.11-1.24 1.9-3.15 1.9-3.15.1-.22.29-.43.68-.43h1.54c.46 0 .56.24.46.57-.19.88-2.05 3.51-2.05 3.51-.16.26-.22.37 0 .66.16.22.68.67 1.03 1.08.64.73 1.13 1.34 1.26 1.76.13.42-.09.64-.52.64z" />
    </svg>
  );
}
