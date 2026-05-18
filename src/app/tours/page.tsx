import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { JsonLd } from "@/components/dvizh/shared/JsonLd";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";

export const metadata: Metadata = makeMeta({
  title: "Туры",
  description:
    "ДВИЖ.Туры — Юра Максимов (@XXIBRO) приедет в твой город. Тур 2026 по 6 городам России + Euro ДВИЖ по 6 европейским столицам. Без афиш, по сарафану.",
  alternates: { canonical: pageUrl("/tours/") },
  openGraph: {
    title: "ДВИЖ.Туры — Тур 2026 по России и Европе",
    description: "6 городов РФ + 6 европейских. Юра Максимов привозит ДВИЖ в твой район.",
  },
});

const TOUR_EVENTS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "ДВИЖ.Тур 2026",
  organizer: { "@type": "Person", name: "Юрий Максимов", alternateName: "XXIBRO" },
  subEvent: [
    { "@type": "Event", name: "ДВИЖ — Купчино", startDate: "2026-01-14", location: { "@type": "Place", name: "Купчино, Санкт-Петербург" } },
    { "@type": "Event", name: "ДВИЖ — Кунцино", startDate: "2026-02-09", location: { "@type": "Place", name: "Кунцино" } },
    { "@type": "Event", name: "ДВИЖ — Гражданка", startDate: "2026-03-19", location: { "@type": "Place", name: "Гражданка, Санкт-Петербург" } },
    { "@type": "Event", name: "ДВИЖ — Шушары", startDate: "2026-05-31", location: { "@type": "Place", name: "Шушары" } },
    { "@type": "Event", name: "ДВИЖ — Девяткино", startDate: "2026-06-20", location: { "@type": "Place", name: "Девяткино" } },
    { "@type": "Event", name: "ДВИЖ — Сестрорецк (Финал)", startDate: "2026-08-31", location: { "@type": "Place", name: "Сестрорецк, залив" } },
  ],
};

const RU_DATES = [
  { date: "14 ЯНВ", dt: "2026-01-14", loc: "Купчино · обнимка во дворе", status: "ПРОШЛО" },
  { date: "9 ФЕВ", dt: "2026-02-09", loc: "Кунцино · хата у Толика", status: "ПРОШЛО" },
  { date: "19 МАР", dt: "2026-03-19", loc: "Гражданка · набережная", status: "ПРОШЛО" },
  { date: "31 МАЯ", dt: "2026-05-31", loc: "Шушары · озеро", status: "СКОРО" },
  { date: "20 ИЮН", dt: "2026-06-20", loc: "Девяткино · крыша", status: "СКОРО" },
  { date: "31 АВГ", dt: "2026-08-31", loc: "Сестрорецк · залив", status: "ФИНАЛ", final: true },
];

const EURO_DATES = [
  { city: "Берлин", country: "Германия" },
  { city: "Прага", country: "Чехия" },
  { city: "Вена", country: "Австрия" },
  { city: "Будапешт", country: "Венгрия" },
  { city: "Варшава", country: "Польша" },
  { city: "Белград", country: "Сербия" },
];

export default function ToursPage() {
  return (
    <>
      <JsonLd data={TOUR_EVENTS_JSONLD} />
      <PageHero
        label="// ДВИЖ.ТУРЫ · TOUR 2026 · СЕЗОН XII"
        title="ТУРЫ."
        accent="по своим!"
        description="За 14 лет ДВИЖ побывал в 37 городах. Тур 2026 — шесть остановок по России от Купчино до Сестрорецка. Без афиш, без билетов — вход через @XXIBRO. Плюс Euro ДВИЖ — шесть европейских столиц."
      />

      <section className="page-content" aria-labelledby="ru-tour-title">
        <p className="page-section-label">// ТУР ПО РОССИИ · 2026</p>
        <h2 id="ru-tour-title">ТУР 2026 <span className="accent">по своим!</span></h2>
        <p>
          Каждый город — это не концерт и не мероприятие. Это встреча своих.
          Юра приезжает, собирает район, и начинается то, что невозможно
          описать словами — это нужно прожить. 6 остановок, январь — август,
          вход только через личку.
        </p>

        <div className="tour-dates" style={{ marginTop: "3rem" }}>
          {RU_DATES.map((d, i) => (
            <div key={i} className={`tour-date${d.final ? " final" : ""}`}>
              <div className="date-num">
                <time dateTime={d.dt}>{d.date}</time>
                {d.final && <span className="date-star">★</span>}
              </div>
              <div className="date-loc">{d.loc}</div>
              <div className="date-note">{d.status}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-content euro-section" aria-labelledby="euro-title">
        <p className="page-section-label">// EURO ДВИЖ · COMING SOON</p>
        <h2 id="euro-title">EURO ДВИЖ <span className="accent">заграница!</span></h2>
        <p>
          ДВИЖ выходит за пределы России. Шесть европейских городов, где живут
          свои. Берлин, Прага, Вена, Будапешт, Варшава, Белград — русскоязычная
          диаспора, которая скучает по настоящему движу. Даты и детали — в личке
          у @XXIBRO.
        </p>

        <div className="tour-dates" style={{ marginTop: "3rem" }}>
          {EURO_DATES.map((d, i) => (
            <div key={i} className="tour-date">
              <div className="date-num">{d.city}</div>
              <div className="date-loc">{d.country}</div>
              <div className="date-note">TBA</div>
            </div>
          ))}
        </div>
      </section>

      <SubPageAnimations />
    </>
  );
}
