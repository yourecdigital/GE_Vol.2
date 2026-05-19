"use client";

import Link from "next/link";
import { CONTACT, MENU, SITE } from "@/lib/georgian-menu";
import { VkIcon } from "@/components/ui/icons";

const LINKS = [
  { label: "Меню", href: "/menu" },
  { label: "О нас", href: "/about" },
  { label: "Доставка", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

export function Footer() {
  return (
    <footer className="bg-dark border-t border-cream/[0.06] py-16 sm:py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col leading-none">
              <span className="label-caps text-gold/70">Доставка</span>
              <span className="font-bold text-cream text-[19px] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {SITE.name}
              </span>
            </div>
            <p className="text-cream/40 text-sm">{SITE.description.slice(0, 80)}...</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="label-caps text-cream font-bold">Навигация</h3>
            <nav className="flex flex-col gap-3" aria-label="Навигация в подвале">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-cream/40 hover:text-cream transition-colors text-sm">{link.label}</Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="label-caps text-cream font-bold">Категории</h3>
            <nav className="flex flex-col gap-3" aria-label="Категории меню">
              {MENU.slice(0, 5).map((cat) => (
                <Link key={cat.id} href="/menu" className="text-cream/40 hover:text-cream transition-colors text-sm">{cat.title}</Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="label-caps text-cream font-bold">Контакты</h3>
            <div className="flex flex-col gap-3">
              <a href={`tel:${CONTACT.phoneRaw}`} className="text-cream/40 hover:text-gold transition-colors text-sm">{CONTACT.phone}</a>
              <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-gold transition-colors text-sm">@{CONTACT.vkHandle}</a>
              <p className="text-cream/40 text-sm">Пн–Вс: {SITE.hours.open}–{SITE.hours.close}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">© {new Date().getFullYear()} Доставка «{SITE.name}». Все права защищены.</p>
          <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors" aria-label="ВКонтакте">
            <VkIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
