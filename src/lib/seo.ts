import { CONTACT } from "./data";

/* Domain comes from the deploy env; the fallback matches the address on the
   contact block (info@autonex.ua) so nothing breaks before it is set. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://autonex.ua"
).replace(/\/$/, "");

export const SITE_NAME = "AUTONEX Logistics";

export const SITE_TITLE =
  "Доставка авто з США та Європи під ключ — AUTONEX";

export const SITE_DESCRIPTION =
  "Пригін авто з аукціонів США (Copart, IAAI) та 12 країн Європи під ключ: викуп, доставка, розмитнення. Термін від 8 днів, страхування та GPS-трекінг на кожному етапі. Розрахунок вартості за 30 секунд.";

/* Schema.org — describes only what the page actually shows. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "AUTONEX",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-full.webp`,
    image: `${SITE_URL}/og.jpg`,
    description: SITE_DESCRIPTION,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "Україна" },
      { "@type": "Country", name: "Німеччина" },
      { "@type": "Country", name: "Польща" },
      { "@type": "Country", name: "Литва" },
      { "@type": "Country", name: "Нідерланди" },
      { "@type": "Country", name: "США" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "customer service",
      availableLanguage: ["uk", "ru"],
    },
    sameAs: [CONTACT.telegram],
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    serviceType: "Міжнародна доставка автомобілів",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Україна" },
    description:
      "Повний цикл: викуп авто на аукціоні або в дилера, інспекція, транспортування до порту, морське перевезення RoRo чи контейнером, розмитнення та доставка до дверей.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Напрямки доставки",
      itemListElement: [
        { country: "Німеччина", days: "12—16", price: "1778" },
        { country: "Польща", days: "8—12", price: "1708" },
        { country: "Литва", days: "9—13", price: "1748" },
        { country: "Нідерланди", days: "13—17", price: "1828" },
        { country: "США", days: "28—35", price: "2578" },
      ].map((o) => ({
        "@type": "Offer",
        name: `Доставка авто з країни: ${o.country}`,
        priceCurrency: "USD",
        price: o.price,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: o.price,
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        deliveryLeadTime: {
          "@type": "QuantitativeValue",
          minValue: Number(o.days.split("—")[0]),
          maxValue: Number(o.days.split("—")[1]),
          unitCode: "DAY",
        },
      })),
    },
  };
}
