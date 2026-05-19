"use client";

import Link from "next/link";
import { CONTACT, MENU } from "@/lib/georgian-menu";

const LINKS = [
  { label: "Меню", href: "/menu" },
  { label: "О нас", href: "/about" },
  { label: "Доставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

export function Footer() {
  return (
    <footer className="bg-ink border-t border-cream/[0.06] py-16 sm:py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col leading-none">
              <span className="label-caps text-gold/70">Доставка</span>
              <span className="font-bold text-cream text-[19px] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Вкусно как в Грузии
              </span>
            </div>
            <p className="text-cream/40 text-sm body-mono">
              Настоящая грузинская кухня, доставленная с любовью. Горячо, вкусно, быстро.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="label-caps text-cream font-bold">Навигация</h3>
            <nav className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-cream/40 hover:text-cream transition-colors text-sm">{link.label}</Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="label-caps text-cream font-bold">Категории</h3>
            <nav className="flex flex-col gap-3">
              {MENU.slice(0, 4).map((cat) => (
                <Link key={cat.id} href="/menu" className="text-cream/40 hover:text-cream transition-colors text-sm">{cat.title}</Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="label-caps text-cream font-bold">Контакты</h3>
            <div className="flex flex-col gap-3">
              <a href={`tel:${CONTACT.phoneRaw}`} className="text-cream/40 hover:text-gold transition-colors text-sm">{CONTACT.phone}</a>
              <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-gold transition-colors text-sm">{CONTACT.vkHandle}</a>
              <p className="text-cream/40 text-sm">Пн–Вс: 11:00–23:00</p>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">© 2026 Доставка «Вкусно как в Грузии». Все права защищены.</p>
          <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.75h-1.54c-.58 0-.76-.47-1.8-1.52-.9-.88-1.3-.99-1.52-.99-.31 0-.4.09-.4.52v1.39c0 .37-.12.59-1.1.59-1.62 0-3.42-.98-4.68-2.8C5.57 11.15 5 9.33 5 8.93c0-.22.09-.43.52-.43h1.54c.39 0 .54.18.69.6.76 2.2 2.03 4.12 2.55 4.12.2 0 .29-.09.29-.58V10.4c-.06-1.04-.61-1.13-.61-1.5 0-.18.15-.36.39-.36h2.42c.33 0 .45.18.45.57v3.06c0 .33.15.45.24.45.2 0 .36-.12.72-.49 1.11-1.24 1.9-3.15 1.9-3.15.1-.22.29-.43.68-.43h1.54c.46 0 .56.24.46.57-.19.88-2.05 3.51-2.05 3.51-.16.26-.22.37 0 .66.16.22.68.67 1.03 1.08.64.73 1.13 1.34 1.26 1.76.13.42-.09.64-.52.64z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
