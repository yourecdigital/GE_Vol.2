import type { Metadata, Viewport } from "next";
import { Unbounded, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";

const headingFont = Unbounded({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080608",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yourecdigital.github.io/GE_Vol.2/"),
  title: "Доставка «Вкусно как в Грузии» — грузинская кухня с доставкой",
  description:
    "Премиум-доставка грузинской кухни: хинкали, хачапури, шашлыки на мангале, харчо. Готовим по традиционным рецептам. +7 (909) 577-75-80",
  keywords: ["доставка грузинской кухни", "хинкали", "хачапури", "шашлык", "харчо", "грузинский ресторан"],
  openGraph: {
    title: "«Вкусно как в Грузии» — доставка",
    description: "Премиум грузинская кухня с доставкой в ваш дом",
    locale: "ru_RU",
    type: "website",
    url: "https://yourecdigital.github.io/GE_Vol.2/",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${headingFont.variable} ${monoFont.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <Nav />
          <CartProvider>
            {children}
          </CartProvider>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
