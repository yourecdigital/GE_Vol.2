"use client";

import { useCart } from "@/lib/cart-store";
import { CartIcon } from "@/components/ui/icons";

export function CartButton({ onClick }: { onClick: () => void }) {
  const { count, total } = useCart();

  if (count === 0) return null;

  return (
    <button
      onClick={onClick}
      aria-label={`Корзина: ${count} товаров на ${total} рублей`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-wine text-cream font-semibold rounded-full px-6 py-4 shadow-[0_8px_32px_rgba(122,64,32,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(164,86,50,0.55)]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <CartIcon />
      <span className="text-sm uppercase tracking-wider">{count} шт</span>
      <span className="text-sm font-bold">{total.toLocaleString("ru-RU")} ₽</span>
    </button>
  );
}
