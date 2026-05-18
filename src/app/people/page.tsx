import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { OrganizerCard } from "@/components/dvizh/shared/OrganizerCard";
import type { OrganizerCardProps } from "@/components/dvizh/shared/OrganizerCard";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";
import { PeopleMapWrapper } from "@/components/dvizh/people/PeopleMapWrapper";

export const metadata: Metadata = makeMeta({
  title: "Наши люди",
  description:
    "ДВИЖ — это структура из 5 уровней. От главного в стране (@XXIBRO) до главного по улице. Найди своего и стань частью движения.",
  alternates: { canonical: pageUrl("/people/") },
  openGraph: {
    title: "ДВИЖ · Наши люди — 5 уровней, вся страна",
    description: "Структура ДВИЖА: страна → регион → город → район → улица.",
  },
});

const TIERS = [
  {
    num: 1,
    name: "ГЛАВНЫЙ В СТРАНЕ",
    desc: "Основатель и идеолог. Задаёт вектор, определяет правила кодекса, выстраивает сеть. Один на всю страну.",
    width: "20%",
  },
  {
    num: 2,
    name: "ГЛАВНЫЙ ПО РЕГИОНУ",
    desc: "Отвечает за федеральный округ. Координирует городских, организует межрегиональные встречи и туры.",
    width: "40%",
  },
  {
    num: 3,
    name: "ГЛАВНЫЙ ПО ГОРОДУ",
    desc: "Держит движ в своём городе. Знает всех своих, встречает новых, организует события на уровне города.",
    width: "60%",
  },
  {
    num: 4,
    name: "ГЛАВНЫЙ ПО РАЙОНУ",
    desc: "Ближайший к земле уровень структуры. Свой двор, свой район, свои люди. Без него города не существует.",
    width: "80%",
  },
  {
    num: 5,
    name: "ГЛАВНЫЙ ПО УЛИЦЕ",
    desc: "Первичная ячейка. Одна улица — одна точка входа. Именно здесь рождается настоящий движ.",
    width: "100%",
  },
];

const TIER1: OrganizerCardProps[] = [
  { name: "ЮРА МАКСИМОВ", handle: "@XXIBRO", role: "ГЛАВНЫЙ В СТРАНЕ", tier: 1, city: "Санкт-Петербург", since: "2012" },
];

const TIER2: OrganizerCardProps[] = [
  { name: "ДЕНИС РБ", handle: "@denisrb", role: "ГЛАВНЫЙ ПО СЗФО", tier: 2, city: "Санкт-Петербург" },
  { name: "ЛЁША ЦМФ", handle: "@alexcmf", role: "ГЛАВНЫЙ ПО ЦФО", tier: 2, city: "Москва" },
  { name: "ЖЕНЯ УРАЛ", handle: "@evgural", role: "ГЛАВНЫЙ ПО УФО", tier: 2, city: "Екатеринбург" },
  { name: "СЕРЁГА ЮГ", handle: "@serugf", role: "ГЛАВНЫЙ ПО ЮФО", tier: 2, city: "Краснодар" },
  { name: "КОЛЯ СИБ", handle: "@kolsib", role: "ГЛАВНЫЙ ПО СФО", tier: 2, city: "Новосибирск" },
  { name: "ТОЛЯ ВОЛГА", handle: "@tolyvlg", role: "ГЛАВНЫЙ ПО ПФО", tier: 2, city: "Нижний Новгород" },
];

const TIER3: OrganizerCardProps[] = [
  { name: "СТАС КУПЧИНО", handle: "@skupch", role: "ГЛАВНЫЙ ПО ГОРОДУ", tier: 3, city: "Купчино, СПб" },
  { name: "МИША ГРАЖДАНКА", handle: "@mgrazh", role: "ГЛАВНЫЙ ПО ГОРОДУ", tier: 3, city: "Гражданка, СПб" },
  { name: "ВАНЯ ДЕВЯТКИНО", handle: "@idevyat", role: "ГЛАВНЫЙ ПО ГОРОДУ", tier: 3, city: "Девяткино" },
  { name: "ДИМА МЫТИЩИ", handle: "@dmityt", role: "ГЛАВНЫЙ ПО ГОРОДУ", tier: 3, city: "Мытищи, МО" },
  { name: "ПАША СЕСТРОРЕЦК", handle: "@psestro", role: "ГЛАВНЫЙ ПО ГОРОДУ", tier: 3, city: "Сестрорецк" },
  { name: "РОМА КУНЦЕВО", handle: "@romakun", role: "ГЛАВНЫЙ ПО ГОРОДУ", tier: 3, city: "Кунцево, Москва" },
];

export default function PeoplePage() {
  return (
    <>
      <PageHero
        label="// ДВИЖ · СТРУКТУРА · НАШИ ЛЮДИ"
        title="НАШИ"
        accent="люди!"
        description="ДВИЖ — это не один человек. Пять уровней структуры покрывают страну от Калининграда до Сибири. Найди своего главного — и ты уже в движении."
      />

      {/* Hierarchy */}
      <section className="page-content" aria-labelledby="hierarchy-title">
        <p className="page-section-label">// ИЕРАРХИЯ · 5 УРОВНЕЙ</p>
        <h2 id="hierarchy-title">КАК МЫ <span className="accent">устроены</span></h2>
        <p>
          Каждый уровень — это зона ответственности. Чем ниже уровень,
          тем ближе к людям. Чем выше — тем шире охват. Все уровни
          связаны: без улицы нет района, без района нет города, без города нет страны.
        </p>

        <div className="hierarchy-list">
          {TIERS.map((tier) => (
            <div className="hierarchy-tier" key={tier.num}>
              <div className={`hierarchy-tier-num${tier.num === 1 ? " active" : ""}`}>
                {String(tier.num).padStart(2, "0")}
              </div>
              <div>
                <div className="hierarchy-tier-name">{tier.name}</div>
                <div className="hierarchy-bar" style={{ width: tier.width }} />
              </div>
              <div className="hierarchy-tier-desc">{tier.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="page-content page-content--dark" aria-labelledby="map-title">
        <p className="page-section-label">// КАРТА · GEOGRAPHY</p>
        <h2 id="map-title">ГДЕ НАС <span className="accent">найти?</span></h2>
        <p>
          Оранжевые точки — активные точки ДВИЖА. Большая точка — главный в стране.
          Малые — региональные лидеры и точки Euro ДВИЖА.
        </p>
        <div className="people-map-wrap">
          <PeopleMapWrapper />
        </div>
      </section>

      {/* Tier 1 */}
      <section className="page-content" aria-labelledby="t1-title">
        <p className="page-section-label">// ТИР I · СТРАНА</p>
        <h2 id="t1-title">ГЛАВНЫЙ <span className="accent">в стране</span></h2>
        <div className="org-grid org-grid--hero">
          {TIER1.map((p, i) => (
            <OrganizerCard key={i} {...p} />
          ))}
        </div>
      </section>

      {/* Tier 2 */}
      <section className="page-content page-content--alt" aria-labelledby="t2-title">
        <p className="page-section-label">// ТИР II · РЕГИОНЫ</p>
        <h2 id="t2-title">ГЛАВНЫЕ <span className="accent">по регионам</span></h2>
        <div className="org-grid">
          {TIER2.map((p, i) => (
            <OrganizerCard key={i} {...p} />
          ))}
        </div>
      </section>

      {/* Tier 3 */}
      <section className="page-content" aria-labelledby="t3-title">
        <p className="page-section-label">// ТИР III · ГОРОДА</p>
        <h2 id="t3-title">ГЛАВНЫЕ <span className="accent">по городам</span></h2>
        <p>
          Хочешь стать главным по своему городу?
          Пиши в личку — <strong style={{ color: "var(--orange)" }}>@XXIBRO</strong>.
        </p>
        <div className="org-grid">
          {TIER3.map((p, i) => (
            <OrganizerCard key={i} {...p} />
          ))}
        </div>
      </section>

      {/* CTA for tiers 4-5 */}
      <section className="page-content page-content--alt" aria-labelledby="join-title">
        <p className="page-section-label">// ТИР IV–V · РАЙОН · УЛИЦА</p>
        <h2 id="join-title">СТАНЬ <span className="accent">главным!</span></h2>
        <p>
          Уровни IV и V открыты для тех, кто готов взять ответственность
          за свой район или улицу. Требования простые: знать своих, быть надёжным,
          жить по кодексу ДВИЖА. Если ты — это ты, то пиши.
        </p>
        <a
          href="https://t.me/xxibro"
          target="_blank"
          rel="noopener noreferrer"
          className="people-cta-link"
        >
          СТАТЬ ГЛАВНЫМ → @XXIBRO
        </a>
      </section>

      <SubPageAnimations />
    </>
  );
}
