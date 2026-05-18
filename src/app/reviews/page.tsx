import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { JsonLd } from "@/components/dvizh/shared/JsonLd";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";

export const metadata: Metadata = makeMeta({
  title: "Отзывы",
  description:
    "Отзывы своих о ДВИЖЕ и Юре Максимове (@XXIBRO). Что говорят те, кто был на тусах, турах и в лагере.",
  alternates: { canonical: pageUrl("/reviews/") },
  openGraph: {
    title: "Отзывы своих — ДВИЖ",
    description: "Что говорят свои о тусах, турах и лагере ДВИЖА.",
  },
});

const REVIEWS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ДВИЖ",
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Толик" },
      datePublished: "2014",
      reviewBody: "Юра поднял мне район за вечер. Думал — не бывает. Бывает.",
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Катя" },
      datePublished: "2019",
      reviewBody: "Не отвечает в личке день — а потом ставит трек и оказывается рядом.",
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Лёха" },
      datePublished: "2023",
      reviewBody: "На лагере он первый у костра и последний у воды. Это и есть движ.",
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    },
  ],
};

const REVIEWS = [
  {
    text: "Юра поднял мне район за вечер. Думал — не бывает. Бывает.",
    name: "Толик",
    meta: "Купчино · 2014",
  },
  {
    text: "Не отвечает в личке день — а потом ставит трек и оказывается рядом.",
    name: "Катя",
    meta: "Гражданка · 2019",
  },
  {
    text: "На лагере он первый у костра и последний у воды. Это и есть движ.",
    name: "Лёха",
    meta: "Смена 2 · 2023",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={REVIEWS_JSONLD} />
      <PageHero
        label="// ОТЗЫВЫ СВОИХ · REFERENCES"
        title="ОТЗЫВЫ."
        accent="своих!"
        description="Слова тех, кто был рядом. Не рекламные цитаты, а настоящие слова от настоящих людей."
      />

      <section className="page-content" aria-labelledby="reviews-list-title">
        <p className="page-section-label">// ЧТО ГОВОРЯТ · WHAT THEY SAY</p>
        <h2 id="reviews-list-title">СВОИ <span className="accent">говорят</span></h2>

        <div className="reviews-grid" style={{ marginTop: "3rem" }}>
          {REVIEWS.map((r, i) => (
            <article key={i} className="review-card" style={{ opacity: 1, transform: "none" }}>
              <span className="review-quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <span className="review-name">{r.name}</span>
                <span className="review-meta">{r.meta}</span>
              </div>
            </article>
          ))}
        </div>

        <p style={{ marginTop: "4rem" }}>
          Хочешь оставить свой отзыв? Пиши @XXIBRO в Telegram. Своих слышим всегда.
        </p>
      </section>

      <SubPageAnimations />
    </>
  );
}
