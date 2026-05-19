import type { Metadata } from "next";
import { DeliveryCards } from "@/components/delivery-cards";

export const metadata: Metadata = {
  title: "Доставка",
  description: "Информация о доставке грузинской кухни: стоимость, время, зоны обслуживания.",
};

export default function DeliveryPage() {
  return (
    <main className="page-top">
      <section className="bg-hero py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h1 className="display-section text-ink mb-4 leading-tight">
              Доставка<br /><span className="text-wine">горячих блюд</span>
            </h1>
            <p className="text-ink/50 max-w-lg text-desc">Готовим на заказ и доставляем в лучшем виде. Быстро, горячо, вкусно.</p>
          </div>

          <DeliveryCards />

          <div className="menu-card p-8 sm:p-10">
            <h2 className="text-ink font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Как заказать</h2>
            <ol className="space-y-4 text-ink/60 text-desc">
              {[
                "Откройте меню и выберите блюда, которые вам нравятся",
                "Добавьте блюда в корзину и нажмите «Оформить заказ»",
                "Заполните имя, телефон и адрес доставки в форме заказа",
                "Оплатите наличными при получении или онлайн",
                "Наслаждайтесь! Готовим с любовью, доставляем с заботой",
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-gold font-bold text-xl flex-shrink-0" style={{ fontFamily: "var(--font-heading)" }}>{i + 1}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
