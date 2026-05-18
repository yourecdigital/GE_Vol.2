import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Oswald, Caveat, Space_Mono } from "next/font/google";
import { makeMeta } from "@/lib/seo";
import { Header } from "@/components/dvizh/layout/Header";
import { Footer } from "@/components/dvizh/layout/Footer";
import { GrainOverlay } from "@/components/dvizh/shared/GrainOverlay";
import { CustomCursor } from "@/components/dvizh/shared/CustomCursor";
import { ProgressBar } from "@/components/dvizh/shared/ProgressBar";
import { JsonLd } from "@/components/dvizh/shared/JsonLd";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = makeMeta();

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ДВИЖ",
  url: "https://xn--b1aajbbhwfgep.xn--p1ai",
  description:
    "Юра Максимов (@XXIBRO) — отец ДВИЖА. Туры, тусовки, лагерь у воды, кодекс культуры. С 2012 — Санкт-Петербург.",
};

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Юрий Николаевич Максимов",
  alternateName: "XXIBRO",
  url: "https://t.me/xxibro",
  sameAs: ["https://t.me/xxibro"],
  jobTitle: "Основатель ДВИЖ",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Санкт-Петербург",
    addressCountry: "RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${bebas.variable} ${oswald.variable} ${caveat.variable} ${spaceMono.variable}`}
    >
      <body>
        <JsonLd data={WEBSITE_JSONLD} />
        <JsonLd data={PERSON_JSONLD} />
        <GrainOverlay />
        <CustomCursor />
        <ProgressBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
