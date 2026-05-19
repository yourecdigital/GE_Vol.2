"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/georgian-menu";

const LINKS = [
  { label: "Меню",     href: "/menu"    },
  { label: "О нас",    href: "/about"   },
  { label: "Доставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "nav-glass" : ""}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-10 flex items-center h-[66px] gap-8">
          {/* Logo */}
          <a href="#" onClick={() => setOpen(false)} className="flex-shrink-0 flex flex-col leading-none group">
            <span className="label-caps text-gold/70 group-hover:text-gold transition-colors">Доставка</span>
            <span className="font-bold text-cream text-[19px] sm:text-[21px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Вкусно как в Грузии
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="label-caps text-cream/50 hover:text-cream transition-colors duration-200 tracking-widest">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Phone CTA */}
          <a href={`tel:${CONTACT.phoneRaw}`}
            className="hidden lg:flex btn-red px-5 py-2.5 text-sm ml-4">
            <PhoneIcon />
            {CONTACT.phone}
          </a>

          {/* Burger */}
          <button aria-label="Меню" onClick={() => setOpen(v => !v)}
            className="md:hidden ml-auto p-2 -mr-1 text-cream">
            <div className="flex flex-col gap-[5px] w-6">
              <span className={`h-px bg-current rounded-full transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`h-px bg-current rounded-full transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`h-px bg-current rounded-full transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div key="drawer"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col px-8 pt-[90px] pb-12">
            <nav className="flex flex-col gap-5 flex-1">
              {LINKS.map((l, i) => (
                <motion.a key={l.href} href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.08 }}
                  className="text-cream font-bold leading-none border-b border-cream/10 pb-5"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 8vw, 3rem)" }}>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-8">
              <a href={`tel:${CONTACT.phoneRaw}`} onClick={() => setOpen(false)}
                className="btn-primary justify-center text-base py-4">
                <PhoneIcon /> {CONTACT.phone}
              </a>
              <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-outline justify-center text-base py-4">
                <VkIcon /> ВКонтакте
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
