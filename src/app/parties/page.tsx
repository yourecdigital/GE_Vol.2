import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { OrganizerCard } from "@/components/dvizh/shared/OrganizerCard";
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
  {
    name: "ГЛАВКЛУБ",
    type: "Клуб",
    events: "12 ночей",
    desc: "Главная площадка города для больших сборов. Звук, свет, энергия — на максимум.",
    dates: ["ЯНВ 2025", "МАР 2025", "МАЙ 2025", "ДЕК 2025"],
  },
  {
    name: "СВОБОДА",
    type: "Клуб",
    events: "8 ночей",
    desc: "Андеграунд-площадка с характером. Тесно, громко, по-настоящему.",
    dates: ["ФЕВ 2025", "АПР 2025", "СЕН 2025"],
  },
  {
    name: "ХАТА-ВПИСКИ",
    type: "Дома",
    events: "∞",
    desc: "Классика движа. Хата на районе, колонка на подоконнике, свои и только свои.",
    dates: ["постоянно"],
  },
  {
    name: "КРЫШИ",
    type: "Город",
    events: "Лето",
    desc: "Белые ночи, крыши Петербурга, рассветы над Невой. Когда город — твоя площадка.",
    dates: ["МАЙ–СЕН"],
  },
  {
    name: "НАБЕРЕЖНЫЕ",
    type: "Город",
    events: "Лето",
    desc: "Фонтанка, Мойка, каналы. Гитара, колонка, свои — и ночной Петербург.",
    dates: ["МАЙ–АВГ"],
  },
];

const ORGANIZERS = [
  { name: "ЮРА МАКСИМОВ", handle: "@XXIBRO", role: "Главный организатор", tier: 1 as const, city: "Санкт-Петербург", since: "2012" },
  { name: "ДЕНИС РБ", handle: "@denisrb", role: "Букинг · Клубы", tier: 2 as const, city: "СПб" },
  { name: "СТАС КУПЧИНО", handle: "@skupch", role: "Хата-вписки · Купчино", tier: 3 as const, city: "Купчино" },
  { name: "МИША ГРАЖДАНКА", handle: "@mgrazh", role: "Крыши · Набережные", tier: 3 as const, city: "Гражданка" },
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

      {/* Venues */}
      <section className="page-content" aria-labelledby="venues-title">
        <p className="page-section-label">// ПЛОЩАДКИ · VENUES</p>
        <h2 id="venues-title">ГДЕ ДВИЖ <span className="accent">гремит!</span></h2>
        <p>
          ДВИЖ — это не про место, а про состояние. Но есть площадки, которые стали
          легендарными. От клубных ночей на 500 человек до камерных вписок на 15 своих.
        </p>

        <div className="venue-card-grid">
          {VENUES.map((v, i) => (
            <article key={i} className="venue-card">
              <div className="venue-card-header">
                <div>
                  <span className="venue-card-type">{v.type} · {v.events}</span>
                  <div className="venue-card-name">{v.name}</div>
                </div>
                <div className="venue-card-dates">
                  {v.dates.map((d, di) => (
                    <span key={di} className="venue-date-pill">{d}</span>
                  ))}
                </div>
              </div>
              <p className="venue-card-desc">{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="page-content page-content--alt" aria-labelledby="party-format-title">
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

        <div className="format-steps">
          {[
            { step: "01", text: "Пишешь @XXIBRO в Telegram" },
            { step: "02", text: "Получаешь координаты за 2–4 часа до" },
            { step: "03", text: "Приходишь — знакомишься со своими" },
            { step: "04", text: "Становишься частью движа" },
          ].map((s) => (
            <div key={s.step} className="format-step">
              <span className="format-step-num">{s.step}</span>
              <span className="format-step-text">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Organizers */}
      <section className="page-content" aria-labelledby="parties-org-title">
        <p className="page-section-label">// КОМАНДА · ORGANIZERS</p>
        <h2 id="parties-org-title">КТО ДЕЛАЕТ <span className="accent">тусы?</span></h2>
        <div className="org-grid">
          {ORGANIZERS.map((p, i) => (
            <OrganizerCard key={i} {...p} />
          ))}
        </div>
      </section>

      <SubPageAnimations />
    </>
  );
}
