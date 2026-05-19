"use client";

import { useCart } from "@/lib/cart-store";

export function CartButton({ onClick }: { onClick: () => void }) {
  const { count, total } = useCart();

  if (count === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-wine text-cream font-semibold rounded-full px-6 py-4 shadow-[0_8px_32px_rgba(122,64,32,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(164,86,50,0.55)]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
      </svg>
      <span className="text-sm uppercase tracking-wider">{count} шт</span>
      <span className="text-sm font-bold">{total.toLocaleString("ru-RU")} ₽</span>
    </button>
  );
}
