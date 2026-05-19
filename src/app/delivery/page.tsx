import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доставка — Доставка «Вкусно как в Грузии»",
  description: "Информация о доставке: стоимость, время, зоны обслуживания.",
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
            <p className="text-ink/50 max-w-lg body-mono">Готовим на заказ и доставляем в лучшем виде. Быстро, горячо, вкусно.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "⏱️", title: "30–45 минут", desc: "Среднее время доставки в пределах города" },
              { icon: "💰", title: "От 250₽", desc: "Минимальный размер заказа для доставки" },
              { icon: "📍", title: "Вся область", desc: "Доставляем во все районы и пригороды" },
              { icon: "🔥", title: "Горячая еда", desc: "Упаковываем специально, чтобы сохранить тепло" },
              { icon: "📱", title: "Online или звонок", desc: "Закажите через сайт или позвоните нам" },
              { icon: "👨‍✍️", title: "Без вопросов", desc: "Если что-то не понравилось, вернём деньги" },
            ].map((item) => (
              <div key={item.title} className="menu-card">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-ink font-bold leading-snug text-lg" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-ink/40 text-sm body-mono">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="menu-card p-8 sm:p-10">
            <h2 className="text-ink font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Как заказать</h2>
            <ol className="space-y-4 text-ink/60 body-mono">
              {[
                "Откройте меню и выберите блюда, которые вам нравятся",
                "Позвоните нам по номеру или оставьте заказ в ВКонтакте",
                "Назовите адрес доставки, согласуйте время",
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
