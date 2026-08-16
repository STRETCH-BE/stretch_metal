/**
 * Site-wide configuration — single source of truth.
 * File path: /lib/site-config.ts
 *
 * Import from here, never hardcode brand data in components.
 *
 * Every value marked [CONFIRM] is a placeholder awaiting confirmation by
 * the owner — grep for "[CONFIRM]" to find them all in one pass.
 */

export const siteConfig = {
  name: "StretchMetal",
  /** Wordmark as rendered in the logo lockup. */
  displayName: "STRETCHMETAL",
  // [CONFIRM] legal entity — assumed the group's Polish company carries the brand
  legalName: "Alto Design Sp. z o.o.",
  parent: "Stretchgroup",
  tagline: "Stal. Cięta. Spawana. Malowana.",
  taglineEn: "Steel. Cut. Welded. Coated.",
  description:
    "StretchMetal — usługi obróbki metali z Częstochowy: spawanie MIG/MAG i TIG, cięcie laserowe blach, obróbka CNC, malowanie proszkowe, projektowanie i kompletne konstrukcje stalowe. Część belgijskiej Stretchgroup. Dostawy w całej UE.",
  descriptionEn:
    "StretchMetal — metal fabrication services from Częstochowa, Poland: MIG/MAG and TIG welding, sheet-metal laser cutting, CNC machining, powder coating, technical design and complete custom steel structures. Part of the Belgian Stretchgroup. EU-wide delivery.",

  // [CONFIRM] domain — read from env, this fallback assumed
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://stretchmetal.pl",

  locales: ["pl", "en"] as const,
  defaultLocale: "pl" as const,

  contact: {
    // [CONFIRM] phone — currently the group's Polish number
    phone: "+48730700333",
    phoneDisplay: "+48 730 700 333",
    // [CONFIRM] email
    email: "info@stretchmetal.pl",
    address: {
      // [CONFIRM] address — assumed same premises as Stretch Sufit / Alto Design
      street: "ul. Legionów 59",
      city: "Częstochowa",
      postalCode: "42-200",
      region: "Śląskie",
      country: "PL",
    },
    geo: { lat: 50.80759, lng: 19.15894 },
    // [CONFIRM] opening hours
    hours: "Mo-Fr 08:00-16:00",
  },

  /** Sister brands inside the Stretchgroup — linked in Heritage + footer. */
  group: {
    belgium: { name: "STRETCH", url: "https://stretchplafond.be" },
    poland: { name: "Stretch Sufit", url: "https://altodesign.pl" },
  },

  // [CONFIRM] social profiles — none exist for StretchMetal yet; group profiles listed
  sameAs: ["https://stretchplafond.be", "https://altodesign.pl"],

  /** Generated at build time by /app/opengraph-image.tsx (black, red bar,
   *  STRETCHMETAL wordmark) — replace with a photo-based static file later. */
  ogImage: "/opengraph-image",
  ogImageAlt: "STRETCHMETAL — metal fabrication, Częstochowa",
} as const;

export type Locale = (typeof siteConfig.locales)[number];

/**
 * Default OpenGraph images array — import this into any page that defines
 * its own `openGraph` block so we never ship an OG-less page.
 *
 * Next.js does NOT merge `images` from the layout when a page provides its
 * own `openGraph` — the whole object is replaced. Paths are relative;
 * `metadataBase` in the root layout resolves them to absolute URLs.
 */
export const defaultOgImages = [
  {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: siteConfig.ogImageAlt,
  },
];
