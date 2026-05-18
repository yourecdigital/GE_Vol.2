import type { Metadata } from "next";

export const BASE_URL = "https://xn--b1aajbbhwfgep.xn--p1ai";
export const SITE_NAME = "ДВИЖ";
export const SITE_TITLE_TEMPLATE = "%s | ДВИЖ";
export const SITE_DESCRIPTION =
  "Юра Максимов (@XXIBRO) — отец ДВИЖА. Туры по России и Европе, тусовки, лагерь у воды, кодекс культуры. С 2012 года — поднимаем район в Санкт-Петербурге.";

export function pageUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

export function makeMeta(overrides: Metadata = {}): Metadata {
  return {
    metadataBase: new URL(BASE_URL),
    title: { default: `${SITE_NAME} — Юра Максимов`, template: SITE_TITLE_TEMPLATE },
    description: SITE_DESCRIPTION,
    keywords: [
      "движ",
      "ДВИЖ",
      "Юра Максимов",
      "XXIBRO",
      "туры",
      "тусовки",
      "лагерь",
      "Санкт-Петербург",
      "dvizh",
    ],
    openGraph: {
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      url: BASE_URL,
      title: `${SITE_NAME} — Юра Максимов (@XXIBRO)`,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Юра Максимов`,
      description: SITE_DESCRIPTION,
    },
    alternates: { canonical: BASE_URL },
    robots: { index: true, follow: true },
    ...overrides,
  };
}
