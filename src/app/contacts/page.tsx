import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";

export const metadata: Metadata = makeMeta({
  title: "Контакты",
  description:
    "Контакты Юры Максимова (@XXIBRO) — основателя ДВИЖА. Telegram: @xxibro. Город: Санкт-Петербург. Пиши в личку.",
  alternates: { canonical: pageUrl("/contacts/") },
  openGraph: {
    title: "Контакты — ДВИЖ · @XXIBRO",
    description: "Telegram: @xxibro. Санкт-Петербург. Отвечаю когда выхожу из воды.",
  },
});

export default function ContactsPage() {
  return (
    <>
      <PageHero
        label="// КОНТАКТЫ · GET IN TOUCH"
        title="ПИШИ."
        accent="в личку!"
        description="Единственный способ связи — Telegram. Никаких форм, никаких email. Личка — это личное."
      />

      <section className="page-content" style={{ textAlign: "center" }} aria-labelledby="contact-info-title">
        <h2 id="contact-info-title" style={{ marginBottom: "3rem" }}>
          @XXIBRO
        </h2>

        <a
          href="https://t.me/xxibro"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-handle"
          style={{ opacity: 1, transform: "none" }}
        >
          НАПИСАТЬ В TELEGRAM
        </a>

        <address className="contact-meta" style={{ opacity: 1, marginTop: "4rem", fontStyle: "normal" }}>
          <strong>TELEGRAM</strong> t.me/xxibro<br />
          <strong>ГОРОД</strong> Санкт-Петербург<br />
          <strong>РЕЖИМ</strong> Отвечаю когда выхожу из воды<br />
          <strong>ДВИЖ</strong> с 2012 года
        </address>

        <p style={{ marginTop: "4rem" }}>
          Пиши, если хочешь попасть на тур, в лагерь, на тусу — или просто поговорить.
          Своих не бросаем. Отвечаю всем, но не сразу. Терпение — тоже часть движа.
        </p>
      </section>

      <SubPageAnimations />
    </>
  );
}
