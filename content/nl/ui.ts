/**
 * Chrome content (nav / footer / sticky CTA) — Dutch (nl-BE).
 * File path: /content/nl/ui.ts
 *
 * Mirrors /content/en/ui.ts: same export names (`nav`, `footer`,
 * `stickyCta`), same column structure — only labels differ. Consumed by
 * <Nav>, <Footer> and <MobileStickyCta> on every /nl page.
 *
 * All hrefs come from @/lib/i18n-routes (NL paths) and contact data from
 * @/lib/site-config — nothing hardcoded except display labels. The language
 * switcher lists the OTHER locales (PL, EN); hrefs are computed at render
 * time via alternatePath() so the visitor stays on the equivalent page.
 */

import type {
  NavContent,
  FooterContent,
  StickyCtaContent,
} from "@/content/types";
import { routes, servicePath } from "@/lib/i18n-routes";
import { siteConfig } from "@/lib/site-config";

/* ─── Nav ─────────────────────────────────────────────────── */

export const nav: NavContent = {
  links: [
    { label: "Diensten", href: routes.services.nl },
    { label: "Machinepark", href: routes.machinePark.nl },
    { label: "Projecten", href: routes.projects.nl },
    { label: "Over ons", href: routes.about.nl },
    { label: "Contact", href: routes.contact.nl },
  ],
  cta: "Stuur uw tekening",
  switchers: [
    { target: "pl", label: "PL" },
    { target: "en", label: "EN" },
  ],
  menuOpen: "Menu",
  menuClose: "Sluiten",
};

/* ─── Footer ──────────────────────────────────────────────── */

export const footer: FooterContent = {
  services: {
    title: "Diensten",
    links: [
      { label: "Alle diensten", href: routes.services.nl },
      { label: "Lassen", href: servicePath("welding", "nl") },
      { label: "Lasersnijden", href: servicePath("laser", "nl") },
      { label: "CNC-bewerking", href: servicePath("cnc", "nl") },
      { label: "Poedercoaten", href: servicePath("coating", "nl") },
      { label: "Engineering", href: servicePath("design", "nl") },
      { label: "Staalconstructies", href: servicePath("structures", "nl") },
    ],
  },
  company: {
    title: "Bedrijf",
    links: [
      { label: "Over ons", href: routes.about.nl },
      { label: "Machinepark", href: routes.machinePark.nl },
      { label: "Projecten", href: routes.projects.nl },
      { label: "Offerte aanvragen", href: routes.rfq.nl },
      { label: "Contact", href: routes.contact.nl },
    ],
  },
  contact: {
    title: "Contact",
    addressLines: [
      siteConfig.legalName, // [CONFIRM] juridische entiteit (via site-config)
      siteConfig.contact.address.street, // [CONFIRM] adres (via site-config)
      `${siteConfig.contact.address.postalCode} ${siteConfig.contact.address.city}, Polen`,
    ],
    phoneLabel: "Telefoon",
    emailLabel: "E-mail",
    hoursLabel: "Openingsuren",
    hours: "ma–vr 08:00–16:00", // [CONFIRM]
  },
  group: {
    title: "Stretchgroup",
    description:
      "StretchMetal is de metaalafdeling van de Belgische Stretchgroup — de werkplaats achter de spanplafondmerken van de groep in België en Polen.",
    links: [
      {
        label: `${siteConfig.group.belgium.name} — spanplafonds, België`,
        url: siteConfig.group.belgium.url,
      },
      {
        label: `${siteConfig.group.poland.name} — spanplafonds, Polen`,
        url: siteConfig.group.poland.url,
      },
    ],
  },
  legalLine: `© ${new Date().getFullYear()} ${siteConfig.legalName} — onderdeel van de Belgische Stretchgroup.`, // [CONFIRM] juridische entiteit; BTW-nummer toevoegen zodra bevestigd
  legalLinks: [
    { label: "Privacybeleid", href: routes.privacy.nl },
    { label: "Cookiebeleid", href: routes.cookies.nl },
  ],
};

/* ─── Mobile sticky CTA ───────────────────────────────────── */

export const stickyCta: StickyCtaContent = {
  call: "Bel ons",
  rfq: "Stuur uw tekening",
};
