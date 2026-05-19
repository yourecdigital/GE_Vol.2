"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart, updateQty, removeFromCart, clearCart } from "@/lib/cart-store";
import { CONTACT } from "@/lib/georgian-menu";
import { TelegramEmoji } from "@/components/ui/telegram-emoji";
import { PhoneIcon, VkIcon, OrderIcon, CartIcon, CloseIcon, TrashIcon } from "@/components/ui/icons";

export function CartDrawer({
  open,
  onClose,
  onOrder,
}: {
  open: boolean;
  onClose: () => void;
  onOrder: () => void;
}) {
  const { items, total, count } = useCart();
  const phoneLink = `tel:${CONTACT.phoneRaw}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70"
          />

          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md cart-drawer bg-ink-mid flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Корзина"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream/[0.06]">
              <div className="flex items-center gap-3">
                <CartIcon size={22} className="text-gold" />
                <h2 className="text-cream font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                  Корзина
                </h2>
                <span className="label-caps text-cream/30">{count} шт</span>
              </div>
              <button onClick={onClose} className="text-cream/40 hover:text-cream transition-colors p-1" aria-label="Закрыть корзину">
                <CloseIcon size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-cream/30">
                  <TelegramEmoji name="cart" size={64} className="opacity-70" />
                  <p className="label-caps">Корзина пуста</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="flex-1 min-w-0">
                      <p className="text-cream text-sm font-semibold truncate" style={{ fontFamily: "var(--font-heading)" }}>
                        {item.name}
                      </p>
                      <p className="text-gold text-sm font-bold mt-1" style={{ fontFamily: "var(--font-heading)" }}>
                        {(item.price * item.qty).toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Уменьшить">−</button>
                      <span className="text-cream text-sm font-bold w-6 text-center">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Увеличить">+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-cream/20 hover:text-wine transition-colors p-1"
                      aria-label={`Удалить ${item.name}`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-cream/[0.06] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="label-caps text-cream/40">Итого</span>
                  <span className="text-gold font-bold text-2xl" style={{ fontFamily: "var(--font-heading)" }}>
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>

                <button onClick={onOrder} className="btn-primary w-full justify-center py-4">
                  <OrderIcon /> Оформить заказ
                </button>

                <div className="flex gap-3">
                  <a href={phoneLink} className="btn-outline-light flex-1 justify-center py-3 text-sm">
                    <PhoneIcon /> Позвонить
                  </a>
                  <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer"
                    className="btn-outline-light flex-1 justify-center py-3 text-sm">
                    <VkIcon /> В ВК
                  </a>
                </div>

                <button onClick={() => { clearCart(); onClose(); }}
                  className="text-cream/25 hover:text-wine text-xs uppercase tracking-widest transition-colors self-center mt-1"
                  style={{ fontFamily: "var(--font-mono)" }}>
                  Очистить корзину
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
