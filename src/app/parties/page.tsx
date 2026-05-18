import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";

export const metadata: Metadata = makeMeta({
  title: "Тусы",
  description:
    "ДВИЖ.Тусы — 38+ клубных ночей, Главклуб, Свобода, вписки на хатах, крыши и набережные Санкт-Петербурга. Без афиш, по любви. @XXIBRO.",
  alternates: { canonical: pageUrl("/parties/") },
  openGraph: {
    title: "ДВИЖ.Тусы — 38+ событий в Санкт-Петербурге",
    description: "Клубные ночи, хата-вписки, крыши, набережные. Всё по-братски.",
  },
});

const VENUES = [
  { name: "ГЛАВКЛУБ", type: "Клуб", events: "12 ночей", desc: "Главная площадка города для больших сборов. Звук, свет, энергия — на максимум." },
  { name: "СВОБОДА", type: "Клуб", events: "8 ночей", desc: "Андеграунд-площадка с характером. Тесно, громко, по-настоящему." },
  { name: "ХАТА-ВПИСКИ", type: "Дома", events: "∞", desc: "Классика движа. Хата на районе, колонка на подоконнике, свои и только свои." },
  { name: "КРЫШИ", type: "Город", events: "Лето", desc: "Белые ночи, крыши Петербурга, рассветы над Невой. Когда город — твоя площадка." },
  { name: "НАБЕРЕЖНЫЕ", type: "Город", events: "Лето", desc: "Фонтанка, Мойка, каналы. Гитара, колонка, свои — и ночной Петербург." },
];

export default function PartiesPage() {
  return (
    <>
      <PageHero
        label="// ДВИЖ.ТУСЫ · PARTIES · 38+ EVENTS"
        title="ТУСЫ."
        accent="по братски!"
        description="38+ клубных ночей и бесконечные вписки за 14 лет. Главклуб, Свобода, хаты на районе, крыши и набережные Санкт-Петербурга. Вход — через личку, афиш не было и не будет."
      />

      <section className="page-content" aria-labelledby="venues-title">
        <p className="page-section-label">// ПЛОЩАДКИ · VENUES</p>
        <h2 id="venues-title">ГДЕ ДВИЖ <span className="accent">гремит!</span></h2>
        <p>
          ДВИЖ — это не про место, а про состояние. Но есть площадки, которые стали
          легендарными. Каждая — со своей энергией, своим характером, своими историями.
          От клубных ночей на 500 человек до камерных вписок на 15 своих.
        </p>

        <div className="services-grid" style={{ marginTop: "3rem" }}>
          {VENUES.map((v, i) => (
            <div key={i} className="service-card">
              <span className="service-num">{v.type} · {v.events}</span>
              <div className="service-name">{v.name}</div>
              <p className="service-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-content" aria-labelledby="party-format-title">
        <p className="page-section-label">// ФОРМАТ · FORMAT</p>
        <h2 id="party-format-title">КАК ЭТО <span className="accent">работает?</span></h2>
        <p>
          Никаких афиш. Никаких билетов. Узнаёшь о тусе через @XXIBRO в Telegram.
          Пишешь в личку — получаешь координаты. Приходишь — и понимаешь,
          что вот оно, то самое. Своих не бросаем.
        </p>
        <p>
          Каждая туса — уникальная. Нет повторений, нет расписания, нет гарантий.
          Есть только обещание: если Юра собирает — будет движ.
          38 клубных ночей — и каждая запомнилась.
        </p>
      </section>

      <SubPageAnimations />
    </>
  );
}
