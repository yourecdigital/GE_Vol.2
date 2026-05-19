"use client";

import { TelegramEmoji } from "@/components/ui/telegram-emoji";
import type { TelegramEmojiId } from "@/lib/telegram-emoji";

const ITEMS: { icon: TelegramEmojiId; title: string; desc: string }[] = [
  { icon: "stopwatch", title: "30–45 минут", desc: "Среднее время доставки в пределах города" },
  { icon: "money", title: "От 250₽", desc: "Минимальный размер заказа для доставки" },
  { icon: "compass", title: "Вся область", desc: "Доставляем во все районы и пригороды" },
  { icon: "fire", title: "Горячая еда", desc: "Упаковываем специально, чтобы сохранить тепло" },
  { icon: "mobile", title: "Online или звонок", desc: "Закажите через сайт или позвоните нам" },
  { icon: "check", title: "Без вопросов", desc: "Если что-то не понравилось, вернём деньги" },
];

export function DeliveryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {ITEMS.map((item) => (
        <div key={item.title} className="menu-card">
          <TelegramEmoji name={item.icon} size={40} />
          <h3
            className="text-ink font-bold leading-snug text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {item.title}
          </h3>
          <p className="text-ink/40 text-sm text-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
