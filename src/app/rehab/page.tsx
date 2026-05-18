import type { Metadata } from "next";
import { makeMeta, pageUrl } from "@/lib/seo";
import { PageHero } from "@/components/dvizh/shared/PageHero";
import { SubPageAnimations } from "@/components/dvizh/shared/SubPageAnimations";

export const metadata: Metadata = makeMeta({
  title: "Главврач",
  description:
    "ГЛАВВРАЧ — проект Юры Максимова о том, как жить в кайф. Для тех, кому громко в голове — делаем тише. F20.0 — это визитка, а не медкарта.",
  alternates: { canonical: pageUrl("/rehab/") },
  openGraph: {
    title: "ГЛАВВРАЧ — жить в кайф",
    description: "Для тех, кому громко в голове — делаем тише. Главврач — Юра Максимов.",
  },
});

export default function RehabPage() {
  return (
    <>
      <PageHero
        label="// ГЛАВВРАЧ · F20.0 · ЖИТЬ В КАЙФ"
        title="ГЛАВВРАЧ."
        accent="жить в кайф!"
        description="Флагманский проект ДВИЖА. Для тех, кто попал в топ. Для тех, кому громко в голове — делаем тише. Главврач — Юра Максимов."
      />

      <section className="page-content" aria-labelledby="rehab-about-title">
        <p className="page-section-label">// О ПРОЕКТЕ · ABOUT</p>
        <h2 id="rehab-about-title">ЧТО ТАКОЕ <span className="accent">главврач?</span></h2>
        <p>
          ГЛАВВРАЧ — это подход к жизни, а не медицинская программа. Это когда
          ты понимаешь, что можно жить в кайф без того, что тебя разрушает.
          Юра Максимов сам прошёл этот путь — и теперь помогает своим.
        </p>
        <p>
          Это не реабилитационный центр и не клиника. Это разговор,
          поддержка, пример. Когда видишь, что человек рядом живёт
          в кайф без лишнего — это мотивирует сильнее любого врача.
        </p>
        <p>
          F20.0 — это код в международной классификации болезней.
          Но здесь это визитка, а не медкарта. Это способ сказать:
          да, мы все немного не в себе. И это нормально.
        </p>
      </section>

      <section className="page-content" aria-labelledby="rehab-approach-title">
        <p className="page-section-label">// ПОДХОД · APPROACH</p>
        <h2 id="rehab-approach-title">КАК ЭТО <span className="accent">работает?</span></h2>
        <p>
          Без расписания, без программы, без 12 шагов. Просто свои рядом,
          которые понимают. Движ, лагерь, туры — всё это часть процесса.
          Когда ты занят жизнью, когда вокруг люди, которым не всё равно —
          становится тише.
        </p>
        <p>
          Главврач — это Юра. Не потому что у него диплом, а потому что
          он рядом. Всегда. И своих не бросает.
        </p>

        <div className="rehab-disclaimer">
          ⚕ ДИСКЛЕЙМЕР: Это визитка, а не медкарта. F20.0 is serious.
          Если тебе действительно нужна помощь — сходи к специалисту.
          Раньше — лучше. Телефон доверия: 8-800-2000-122 (бесплатно, круглосуточно).
        </div>
      </section>

      <SubPageAnimations />
    </>
  );
}
