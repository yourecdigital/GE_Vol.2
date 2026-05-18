import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { JsonLd } from "@/components/dvizh/shared/JsonLd";
import { OrganizerCard } from "@/components/dvizh/shared/OrganizerCard";
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

const SESSIONS = [
  { num: "01", dates: "2026-06-01/2026-06-10", label: "1–10 ИЮНЯ", title: "СМЕНА №1", status: "ЗАЯВКИ ЗАКРЫТЫ", closed: true },
  { num: "02", dates: "2026-07-12/2026-07-22", label: "12–22 ИЮЛЯ", title: "СМЕНА №2", status: "ЗАЯВКИ ОТКРЫТЫ", closed: false },
];

const DETAILS = [
  { key: "ДЛИТЕЛЬНОСТЬ", val: "10 ДНЕЙ", accent: true },
  { key: "ПАЛАТКА", val: "СВОЯ" },
  { key: "ЕДА", val: "ОБЩАК" },
  { key: "ИНТЕРНЕТ", val: "НЕТ", dim: true },
  { key: "СОТОВЫЙ", val: "СДАТЬ НА ХРАНЕНИЕ", dim: true },
  { key: "ДВИЖ", val: "ДА", accent: true },
  { key: "СМЕН ЗА ВСЁ ВРЕМЯ", val: "14", accent: true },
  { key: "ЗАЯВКА", val: "→ @XXIBRO", accent: true },
];

const CAMP_PROGRAM = [
  { time: "УТРО", desc: "Рыбалка, кофе на костре, купание" },
  { time: "ДЕНЬ", desc: "Река, солнце, настолки, разговоры" },
  { time: "ВЕЧЕР", desc: "Общий котёл, гитара у костра" },
  { time: "НОЧЬ", desc: "Звёзды, тишина, свои" },
];

const ORGANIZERS = [
  { name: "ЮРА МАКСИМОВ", handle: "@XXIBRO", role: "Директор лагеря · Founder", tier: 1 as const, city: "Санкт-Петербург", since: "2012" },
  { name: "ЛЁША ЦЕНТР", handle: "@alexcmf", role: "Хозяйственная часть", tier: 2 as const, city: "ЦФО" },
  { name: "ЖЕНЯ УРАЛ", handle: "@evgural", role: "Медицина · Безопасность", tier: 2 as const, city: "Урал" },
];

export default function CampPage() {
  return (
    <>
      <JsonLd data={CAMP_EVENT_JSONLD} />
      <PageHero
        label="// ДВИЖ.ЛАГЕРЬ · OFF THE GRID"
        title="ЛАГЕРЬ."
        accent="у воды!"
        description="10 дней без интернета — и ты уедешь другим человеком. Палатки, костёр, гитара, рыба, утро у воды. 14 смен за всю историю, 2 смены каждый год."
      />

      {/* Sessions */}
      <section className="page-content" aria-labelledby="sessions-title">
        <p className="page-section-label">// СМЕНЫ 2026 · SESSIONS</p>
        <h2 id="sessions-title">ДАТЫ <span className="accent">лагеря</span></h2>

        <div className="session-grid">
          {SESSIONS.map((s) => (
            <article key={s.num} className={`session-card${s.closed ? " session-card--closed" : " session-card--open"}`}>
              <div className="session-card-num">{s.num}</div>
              <div className="session-card-title">{s.title}</div>
              <time className="session-card-dates" dateTime={s.dates}>{s.label}</time>
              <div className={`session-card-status${s.closed ? " closed" : " open"}`}>{s.status}</div>
              {!s.closed && (
                <a href="https://t.me/xxibro" target="_blank" rel="noopener noreferrer" className="session-card-cta">
                  ПОДАТЬ ЗАЯВКУ →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="page-content page-content--alt" aria-labelledby="camp-details-title">
        <p className="page-section-label">// ДЕТАЛИ · DETAILS</p>
        <h2 id="camp-details-title">КАК ЭТО <span className="accent">устроено?</span></h2>
        <p>
          Лагерь ДВИЖ — это полная перезагрузка. Ты оставляешь телефон,
          суету, город — и оказываешься у воды с теми, кто понимает без слов.
        </p>

        <div className="camp-details" style={{ marginTop: "2rem", opacity: 1 }}>
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

      {/* Program */}
      <section className="page-content" aria-labelledby="camp-prog-title">
        <p className="page-section-label">// ПРОГРАММА · A DAY IN CAMP</p>
        <h2 id="camp-prog-title">КАК ПРОХОДИТ <span className="accent">день?</span></h2>

        <div className="camp-program-grid">
          {CAMP_PROGRAM.map((p, i) => (
            <div key={i} className="camp-program-item">
              <span className="camp-program-time">{p.time}</span>
              <span className="camp-program-desc">{p.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Organizers */}
      <section className="page-content page-content--alt" aria-labelledby="camp-org-title">
        <p className="page-section-label">// ОРГАНИЗАТОРЫ · TEAM</p>
        <h2 id="camp-org-title">КТО ВЕЗЁТ <span className="accent">лагерь?</span></h2>
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
