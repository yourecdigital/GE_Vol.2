import type { Metadata } from "next";
import { MenuSection } from "@/components/menu-section";

export const metadata: Metadata = {
  title: "Меню",
  description: "Полное меню грузинской кухни: хинкали, хачапури, шашлыки, супы, салаты. Доставка по городу.",
};

export default function MenuPage() {
  return (
    <main className="page-top">
      <MenuSection />
    </main>
  );
}
