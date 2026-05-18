import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { JsonLd } from "@/components/dvizh/shared/JsonLd";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";

export const metadata: Metadata = makeMeta({
  title: "Лагерь",
  description:
    "ДВИЖ.Лагерь — 10 дней у воды без интернета. Палатки, костёр, гитара, рыба. 2 смены в год, 14 смен за всё время. Координаты только в личке @XXIBRO.",
  alternates: { canonical: pageUrl("/camp/") },
  openGraph: {
    title: "ДВИЖ.Лагерь — 10 дней у воды, OFF THE GRID",
    description: "Палатки, костёр, рыба, гитара. 2 смены/год. Заявка → @XXIBRO.",
  },
});

const CAMP_EVENT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "ДВИЖ.Лагерь — Смена №2, 2026",
  startDate: "2026-07-12",
  endDate: "2026-07-22",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  organizer: { "@type": "Person", name: "Юрий Максимов", alternateName: "XXIBRO" },
  description: "10 дней у воды без интернета. Палатки, костёр, гитара, рыба.",
};

const DETAILS = [
  { key: "ДЛИТЕЛЬНОСТЬ", val: "10 ДНЕЙ", accent: true },
  { key: "СМЕНА №2", val: "12–22 ИЮЛЯ", accent: true },
  { key: "ПАЛАТКА", val: "СВОЯ", accent: false },
  { key: "ЕДА", val: "ОБЩАК", accent: false },
  { key: "ИНТЕРНЕТ", val: "НЕТ", accent: false, dim: true },
  { key: "ДВИЖ", val: "ДА", accent: true },
  { key: "СМЕН ЗА ВСЁ ВРЕМЯ", val: "14", accent: true },
  { key: "ЗАЯВКА", val: "→ @XXIBRO", accent: true },
];

export default function CampPage() {
  return (
    <>
      <JsonLd data={CAMP_EVENT_JSONLD} />
      <PageHero
        label="// ДВИЖ.ЛАГЕРЬ · OFF THE GRID"
        title="ЛАГЕРЬ."
        accent="у воды!"
        description="10 дней без интернета — и ты уедешь другим человеком. Палатки, костёр, гитара, рыба, утро у воды. 14 смен за всю историю, 2 смены каждый год. Координаты только в личке."
      />

      <section className="page-content" aria-labelledby="camp-details-title">
        <p className="page-section-label">// ДЕТАЛИ · DETAILS</p>
        <h2 id="camp-details-title">КАК ЭТО <span className="accent">устроено?</span></h2>
        <p>
          Лагерь ДВИЖ — это полная перезагрузка. Ты оставляешь телефон,
          суету, город — и оказываешься у воды с теми, кто понимает без слов.
          Каждый лагерь — уникальный. Но формула одна: природа, свои, тишина
          и движ, который рождается сам.
        </p>
        <p>
          Приезжай со своей палаткой. Еда — общая. Готовим вместе, едим вместе,
          живём вместе. Утром — рыбалка и кофе на костре. Днём — река и солнце.
          Вечером — гитара, разговоры, звёзды. И так 10 дней.
        </p>

        <div className="camp-details" style={{ marginTop: "3rem", opacity: 1 }}>
          {DETAILS.map((d, i) => (
            <div key={i} className="camp-detail">
              <span className="key">{d.key}</span>
              <span
                className={`val${d.accent ? " accent" : ""}`}
                style={d.dim ? { color: "var(--gray)" } : undefined}
              >
                {d.val}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-content" aria-labelledby="camp-rules-title">
        <p className="page-section-label">// ПРАВИЛА · RULES</p>
        <h2 id="camp-rules-title">ПРАВИЛА <span className="accent">лагеря</span></h2>
        <p>
          Нет расписания. Нет обязаловки. Единственное правило — уважай своих
          и место, где ты находишься. Убираем за собой. Помогаем друг другу.
          Не грузим тех, кто хочет тишины. Это не детский лагерь и не фестиваль.
          Это движ у воды — в чистом виде.
        </p>
      </section>

      <SubPageAnimations />
    </>
  );
}
