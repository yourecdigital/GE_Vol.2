import { Nav } from "./nav";
import { HeroSection } from "./hero-section";
import { PromoBanner } from "./promo-banner";
import { FeaturesSection } from "./features-section";
import { MenuSection } from "./menu-section";
import { AboutSection } from "./about-section";
import { FooterSection } from "./footer-section";

export function GeorgianLanding() {
  return (
    <>
      {/* Animated grain overlay — 2026 texture depth */}
      <div className="grain-overlay" aria-hidden />

      <Nav />
      <main>
        <HeroSection />
        <PromoBanner />
        <MenuSection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <FooterSection />
    </>
  );
}
