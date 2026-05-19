import { Metadata } from "next";
import { MenuSection } from "@/components/georgian/menu-section";

export const metadata: Metadata = {
  title: "Меню — Доставка «Вкусно как в Грузии»",
  description: "Полное меню грузинской кухни: хинкали, хачапури, шашлыки, супы, салаты. Доставка по городу.",
};

export default function MenuPage() {
  return (
    <main className="page-top">
      <MenuSection />
    </main>
  );
}
