"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart, updateQty, removeFromCart, clearCart } from "@/lib/cart-store";
import { CONTACT } from "@/lib/georgian-menu";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, count } = useCart();

  const orderText = items
    .map((i) => `${i.name} × ${i.qty} = ${(i.price * i.qty).toLocaleString("ru-RU")}₽`)
    .join("\n");
  const fullText = `Здравствуйте! Хочу заказать:\n\n${orderText}\n\nИтого: ${total.toLocaleString("ru-RU")}₽`;
  const vkLink = `https://vk.com/im?sel=-${CONTACT.vkHandle}&msg=${encodeURIComponent(fullText)}`;
  const phoneLink = `tel:${CONTACT.phoneRaw}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/70"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md cart-drawer bg-ink-mid flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream/[0.06]">
              <div className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                <h2 className="text-cream font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                  Корзина
                </h2>
                <span className="label-caps text-cream/30">{count} шт</span>
              </div>
              <button onClick={onClose} className="text-cream/40 hover:text-cream transition-colors p-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-cream/30">
                  <span className="text-5xl">🛒</span>
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
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span className="text-cream text-sm font-bold w-6 text-center">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-cream/20 hover:text-wine transition-colors p-1"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      </svg>
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

                <a href={phoneLink} className="btn-primary w-full justify-center py-4">
                  <PhoneIcon /> Позвонить и заказать
                </a>
                <a href={CONTACT.vk} target="_blank" rel="noopener noreferrer"
                  className="btn-outline-light w-full justify-center py-4">
                  <VkIcon /> Написать в ВК
                </a>

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

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
