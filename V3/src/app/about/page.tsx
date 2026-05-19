import type { Metadata } from "next";
import { AboutSection } from "@/components/about-section";

export const metadata: Metadata = {
  title: "О нас",
  description: "История нашего сервиса, команда, философия грузинского гостеприимства.",
};

export default function AboutPage() {
  return (
    <main className="page-top">
      <AboutSection />
      <section className="bg-dark py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="display-section text-cream mb-16 text-center">Наша история</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {[
              { num: "01", title: "Начало", desc: "Всё началось с желания поделиться подлинным вкусом грузинской кухни — той, которую готовят в семьях, в ресторанчиках у гор Кавказа." },
              { num: "02", title: "Рецепты", desc: "Мы собирали рецепты у бабушек, учили технику у шефов, привозили специи из Грузии. Каждое блюдо — это история." },
              { num: "03", title: "Мастерство", desc: "Обучали нашу команду, закупили оборудование, организовали кухню так, чтобы каждый заказ готовился с любовью." },
              { num: "04", title: "Доставка", desc: "Запустили сервис доставки, чтобы горячее и ароматное оказывалось у вас дома в лучшем виде." },
            ].map((item) => (
              <div key={item.num} className="flex gap-6">
                <span className="text-gold/20 font-bold text-4xl flex-shrink-0" style={{ fontFamily: "var(--font-heading)" }}>{item.num}</span>
                <div>
                  <h3 className="text-cream font-bold text-xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                  <p className="text-cream/45 text-desc leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
