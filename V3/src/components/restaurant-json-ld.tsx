import { CONTACT, MENU, SITE } from "@/lib/georgian-menu";

export function RestaurantJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.name,
    description: SITE.description,
    servesCuisine: "Georgian",
    telephone: CONTACT.phone,
    url: `${SITE.url}/`,
    sameAs: [CONTACT.vk],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: SITE.hours.open,
      closes: SITE.hours.close,
    },
    priceRange: "$$",
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
