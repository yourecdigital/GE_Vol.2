import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";

export const metadata: Metadata = makeMeta({
  title: "Культура",
  description:
    "Кодекс ДВИЖА — 5 правил, по которым живёт сообщество Юры Максимова. Без афиш, по любви, своих не бросаем. Культура ДВИЖ с 2012 года.",
  alternates: { canonical: pageUrl("/culture/") },
  openGraph: {
    title: "Кодекс ДВИЖА — 5 правил культуры",
    description: "Без афиш. По любви. Своих не бросаем. Не грузи. Будь собой.",
  },
});

const RULES = [
  {
    num: "01",
    title: "БЕЗ АФИШ",
    desc: "Никаких объявлений, флаеров, рекламы. О движе узнают по сарафану — через своих. Если тебе рассказали — значит, ты свой. Это не секретность, это фильтр. Кому надо — тот узнает.",
  },
  {
    num: "02",
    title: "ПО ЛЮБВИ",
    desc: "Всё, что делается в движе — делается по любви. Нет оплаты, нет обязательств, нет долгов. Пришёл — потому что хотел. Помог — потому что мог. Это не бизнес, это братство.",
  },
  {
    num: "03",
    title: "СВОИХ НЕ БРОСАЕМ",
    desc: "Главное правило. Ни нормальных, ни психов. Если ты стал своим — ты свой навсегда. В беде, в радости, в 3 часа ночи на набережной — своих не бросаем. Это не лозунг, это формула.",
  },
  {
    num: "04",
    title: "НЕ ГРУЗИ",
    desc: "Движ — это лёгкость. Не тащи сюда драму, выяснения отношений, негатив. Здесь все пришли отдыхать, заряжаться, быть в кайфе. Если тебе плохо — мы поможем. Но не грузи специально.",
  },
  {
    num: "05",
    title: "БУДЬ СОБОЙ",
    desc: "Никаких масок, понтов, ролей. В движе ценят настоящих. Будь тем, кто ты есть — и тебя примут. Здесь нет VIP и нет аутсайдеров. Есть только свои.",
  },
];

export default function CulturePage() {
  return (
    <>
      <PageHero
        label="// КУЛЬТУРА · КОДЕКС ДВИЖА"
        title="КУЛЬТУРА."
        accent="кодекс!"
        description="5 правил, которые сложились естественно за 14 лет. Никто их не придумывал специально — они просто есть. И все свои их знают."
      />

      <section className="page-content" aria-labelledby="codex-title">
        <p className="page-section-label">// 5 ПРАВИЛ · THE CODEX</p>
        <h2 id="codex-title">КОДЕКС <span className="accent">движа</span></h2>
        <p>
          Это не устав и не регламент. Это то, что объединяет всех своих.
          Пять простых правил, которые работают с 2012 года. Они не записаны
          на стене — они записаны в каждом, кто хоть раз был на движе.
        </p>

        <div style={{ marginTop: "3rem" }}>
          {RULES.map((r) => (
            <div key={r.num} className="culture-rule">
              <div className="culture-rule-num">{r.num}</div>
              <div>
                <div className="culture-rule-title">{r.title}</div>
                <p className="culture-rule-desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SubPageAnimations />
    </>
  );
}
