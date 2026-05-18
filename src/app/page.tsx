import type { Metadata } from "next";
import { makeMeta, pageUrl, SITE_NAME } from "@/lib/seo";
import { HeroSection } from "@/components/dvizh/home/HeroSection";
import { Ticker } from "@/components/dvizh/home/Ticker";
import { ManifestoSection } from "@/components/dvizh/home/ManifestoSection";
import { StatsSection } from "@/components/dvizh/home/StatsSection";
import { TimelineSection } from "@/components/dvizh/home/TimelineSection";
import { ServicesSection } from "@/components/dvizh/home/ServicesSection";
import { TourPreview } from "@/components/dvizh/home/TourPreview";
import { CampPreview } from "@/components/dvizh/home/CampPreview";
import { QuoteSection } from "@/components/dvizh/home/QuoteSection";
import { ReviewsPreview } from "@/components/dvizh/home/ReviewsPreview";
import { ContactSection } from "@/components/dvizh/home/ContactSection";
import { HomeAnimations } from "@/components/dvizh/home/HomeAnimations";
import { JsonLd } from "@/components/dvizh/shared/JsonLd";

export const metadata: Metadata = makeMeta({
  title: `${SITE_NAME} — Юра Максимов (@XXIBRO) · Туры · Тусы · Лагерь`,
  alternates: { canonical: pageUrl("/") },
});

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ДВИЖ",
  url: "https://xn--b1aajbbhwfgep.xn--p1ai",
  foundingDate: "2012",
  founder: {
    "@type": "Person",
    name: "Юрий Николаевич Максимов",
    alternateName: "XXIBRO",
  },
  description:
    "Сообщество единомышленников из Санкт-Петербурга. Туры по 37 городам, 2417 тусовок, 14 смен лагеря у воды. С 2012 года.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Санкт-Петербург",
    addressCountry: "RU",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={ORG_JSONLD} />
      <HeroSection />
      <Ticker />
      <ManifestoSection />
      <StatsSection />
      <TimelineSection />
      <ServicesSection />
      <TourPreview />
      <CampPreview />
      <QuoteSection />
      <ReviewsPreview />
      <ContactSection />
      <HomeAnimations />
    </>
  );
}
