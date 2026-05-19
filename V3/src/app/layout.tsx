import type { Metadata, Viewport } from "next";
import { Unbounded, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { RestaurantJsonLd } from "@/components/restaurant-json-ld";

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
  width: "device-width",
  initialScale: 1,
  themeColor: "#080608",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yourecdigital.github.io/GE_Vol.2/"),
  title: {
    default: "Доставка «Вкусно как в Грузии» — грузинская кухня с доставкой",
    template: "%s | Вкусно как в Грузии",
  },
  description:
    "Премиум-доставка грузинской кухни: хинкали, хачапури, шашлыки на мангале, харчо. Готовим по традиционным рецептам. +7 (909) 577-75-80",
  keywords: [
    "доставка грузинской кухни",
    "хинкали доставка",
    "хачапури доставка",
    "шашлык доставка",
    "харчо",
    "грузинский ресторан",
    "кавказская кухня",
    "доставка еды",
  ],
  alternates: {
    canonical: "https://yourecdigital.github.io/GE_Vol.2/",
  },
  openGraph: {
    title: "«Вкусно как в Грузии» — доставка грузинской кухни",
    description: "Хинкали, хачапури, шашлыки на мангале — доставляем горячим",
    locale: "ru_RU",
    type: "website",
    siteName: "Вкусно как в Грузии",
    url: "https://yourecdigital.github.io/GE_Vol.2/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Вкусно как в Грузии — премиум доставка грузинской кухни",
      },
    ],
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
        <RestaurantJsonLd />
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
