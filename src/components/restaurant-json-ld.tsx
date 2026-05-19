import { CONTACT, MENU } from "@/lib/georgian-menu";

export function RestaurantJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Вкусно как в Грузии",
    description:
      "Премиум-доставка грузинской кухни: хинкали, хачапури, шашлыки на мангале, харчо. Готовим по традиционным рецептам.",
    servesCuisine: "Georgian",
    telephone: CONTACT.phone,
    url: "https://yourecdigital.github.io/GE_Vol.2/",
    sameAs: [CONTACT.vk],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "23:00",
    },
    hasMenu: {
      "@type": "Menu",
      name: "Основное меню",
      hasMenuSection: MENU.map((cat) => ({
        "@type": "MenuSection",
        name: cat.title,
        hasMenuItem: cat.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.shortDesc,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "RUB",
          },
        })),
      })),
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
