"use client";

import { useState, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, clearCart } from "@/lib/cart-store";
import { sendOrderToTelegram, type OrderData } from "@/lib/telegram-bot";
import { CONTACT } from "@/lib/georgian-menu";
import { PhoneIcon, CloseIcon } from "@/components/ui/icons";

type Stage = "form" | "sending" | "success" | "error";

export function OrderForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, count } = useCart();
  const [stage, setStage] = useState<Stage>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const reset = useCallback(() => {
    setStage("form");
    setErrorMsg("");
    setName("");
    setPhone("");
    setAddress("");
    setComment("");
  }, []);

  const handleClose = useCallback(() => {
    if (stage === "success") reset();
    onClose();
  }, [stage, reset, onClose]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || items.length === 0) return;

    setStage("sending");
    const order: OrderData = {
      name: name.trim(), phone: phone.trim(), address: address.trim(),
      comment: comment.trim() || undefined, items, total,
    };

    const result = await sendOrderToTelegram(order);
    if (result.ok) {
      setStage("success");
      clearCart();
    } else {
      setErrorMsg(result.error ?? "Неизвестная ошибка");
      setStage("error");
    }
  }, [name, phone, address, comment, items, total]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="order-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="fixed inset-0 z-[80] bg-black/80" />

          <motion.div key="order-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[90] w-auto sm:w-full sm:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto order-form-modal rounded-2xl"
            role="dialog" aria-modal="true" aria-label="Оформление заказа"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-cream/[0.06] bg-[#0e0a0c]/95 backdrop-blur-md rounded-t-2xl">
              <h2 className="text-cream font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                {stage === "success" ? "Заказ отправлен" : "Оформление заказа"}
              </h2>
              <button onClick={handleClose} className="text-cream/40 hover:text-cream transition-colors p-1" aria-label="Закрыть">
                <CloseIcon size={24} />
              </button>
            </div>

            <div className="px-6 py-5">
              {stage === "form" && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="order-summary-box">
                    <div className="flex items-center justify-between mb-3">
                      <span className="label-caps text-cream/40">Ваш заказ · {count} шт</span>
                      <span className="text-gold font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                        {total.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-cream/70 truncate mr-3">
                            {item.name} <span className="text-cream/30">× {item.qty}</span>
                          </span>
                          <span className="text-cream/50 shrink-0">{(item.price * item.qty).toLocaleString("ru-RU")} ₽</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="order-field-group">
                      <label className="order-label" htmlFor="order-name">Ваше имя *</label>
                      <input id="order-name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Как вас зовут" className="order-input" autoComplete="name" />
                    </div>
                    <div className="order-field-group">
                      <label className="order-label" htmlFor="order-phone">Телефон *</label>
                      <input id="order-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__" className="order-input" autoComplete="tel" />
                    </div>
                    <div className="order-field-group">
                      <label className="order-label" htmlFor="order-address">Адрес доставки *</label>
                      <input id="order-address" type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
                        placeholder="Улица, дом, квартира" className="order-input" autoComplete="street-address" />
                    </div>
                    <div className="order-field-group">
                      <label className="order-label" htmlFor="order-comment">Комментарий</label>
                      <textarea id="order-comment" value={comment} onChange={(e) => setComment(e.target.value)}
                        placeholder="Пожелания, подъезд, этаж..." className="order-input order-textarea" rows={3} />
                    </div>
                  </div>

                  <button type="submit" disabled={!name.trim() || !phone.trim() || !address.trim()}
                    className="btn-primary w-full justify-center py-4 mt-2 disabled:opacity-40 disabled:pointer-events-none">
                    Отправить заказ · {total.toLocaleString("ru-RU")} ₽
                  </button>
                  <p className="text-cream/25 text-xs text-center" style={{ fontFamily: "var(--font-mono)" }}>
                    Мы свяжемся с вами для подтверждения
                  </p>
                </form>
              )}

              {stage === "sending" && (
                <div className="flex flex-col items-center justify-center gap-5 py-12">
                  <div className="order-spinner" />
                  <p className="text-cream/60 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Отправляем заказ...</p>
                </div>
              )}

              {stage === "success" && (
                <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
                  <div className="order-success-icon">✓</div>
                  <div>
                    <h3 className="text-cream font-bold text-xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>Заказ принят!</h3>
                    <p className="text-cream/50 text-sm max-w-xs mx-auto leading-relaxed">
                      Мы получили вашу заявку и скоро свяжемся для подтверждения. Спасибо!
                    </p>
                  </div>
                  <button onClick={handleClose} className="btn-primary justify-center px-8 py-3 mt-2">Отлично</button>
                </div>
              )}

              {stage === "error" && (
                <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
                  <div className="order-error-icon">!</div>
                  <div>
                    <h3 className="text-cream font-bold text-xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>Не удалось отправить</h3>
                    <p className="text-cream/50 text-sm max-w-xs mx-auto">{errorMsg}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button onClick={() => setStage("form")} className="btn-primary justify-center px-6 py-3">Попробовать снова</button>
                    <a href={`tel:${CONTACT.phoneRaw}`} className="btn-outline-light justify-center px-6 py-3">
                      <PhoneIcon /> Позвонить
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
