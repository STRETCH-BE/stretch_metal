/**
 * Chrome content (PL) — nav, footer, mobile sticky CTA.
 * File path: /content/ui.ts
 *
 * Consumed by <Nav>, <Footer> and <MobileStickyCta> on every PL page.
 * The EN mirror (/content/en/ui.ts) exports the same three names.
 *
 * Href policy: every internal link is built from lib/i18n-routes
 * (routes.*.pl / servicePath) — never a hardcoded path string, so a slug
 * change propagates site-wide from one file. Footer service labels come
 * from serviceCards (./services), keeping names in one place.
 *
 * Contact data (address, hours, group URLs, legal name) is spelled out
 * from siteConfig — the [CONFIRM] flags on those values live in
 * lib/site-config.ts; lines below that add their own guesses (hours
 * wording, NIP) carry their own `// [CONFIRM]`.
 */

import type {
  FooterContent,
  NavContent,
  StickyCtaContent,
} from "@/content/types";
import { routes, servicePath } from "@/lib/i18n-routes";
import { siteConfig } from "@/lib/site-config";
import { serviceCards } from "@/content/services";

/* ─── Nav ─────────────────────────────────────────────────── */

export const nav: NavContent = {
  links: [
    { label: "Usługi", href: routes.services.pl },
    { label: "Park maszynowy", href: routes.machinePark.pl },
    { label: "Realizacje", href: routes.projects.pl },
    { label: "O nas", href: routes.about.pl },
    { label: "Kontakt", href: routes.contact.pl },
  ],
  cta: "Wyślij rysunek",
  switcher: { label: "EN", href: routes.home.en },
  menuOpen: "Menu",
  menuClose: "Zamknij",
};

/* ─── Footer ──────────────────────────────────────────────── */

export const footer: FooterContent = {
  services: {
    title: "Usługi",
    links: [
      { label: "Wszystkie usługi", href: routes.services.pl },
      ...serviceCards.map((card) => ({
        label: card.name,
        href: servicePath(card.key, "pl"),
      })),
    ],
  },
  company: {
    title: "Firma",
    links: [
      { label: "O nas", href: routes.about.pl },
      { label: "Park maszynowy", href: routes.machinePark.pl },
      { label: "Realizacje", href: routes.projects.pl },
      { label: "Wycena", href: routes.rfq.pl },
      { label: "Kontakt", href: routes.contact.pl },
    ],
  },
  contact: {
    title: "Kontakt",
    addressLines: [
      siteConfig.name,
      siteConfig.contact.address.street, // [CONFIRM] adres — za lib/site-config
      `${siteConfig.contact.address.postalCode} ${siteConfig.contact.address.city}`,
      "Polska",
    ],
    phoneLabel: "Telefon",
    emailLabel: "E-mail",
    hoursLabel: "Godziny pracy",
    hours: "pon.–pt. 08:00–16:00", // [CONFIRM]
  },
  group: {
    title: "Stretchgroup",
    description:
      "StretchMetal jest częścią belgijskiej Stretchgroup — producenta i wykonawcy sufitów napinanych w Belgii i Polsce.",
    links: [
      {
        label: `${siteConfig.group.belgium.name} — stretchplafond.be`,
        url: siteConfig.group.belgium.url,
      },
      {
        label: `${siteConfig.group.poland.name} — altodesign.pl`,
        url: siteConfig.group.poland.url,
      },
    ],
  },
  legalLine: `© ${new Date().getFullYear()} ${siteConfig.legalName}`, // [CONFIRM] podmiot prawny; NIP dopisać po potwierdzeniu numeru
  legalLinks: [
    { label: "Polityka prywatności", href: routes.privacy.pl },
    { label: "Polityka cookies", href: routes.cookies.pl },
  ],
};

/* ─── Mobile sticky CTA ───────────────────────────────────── */

export const stickyCta: StickyCtaContent = {
  call: "Zadzwoń",
  rfq: "Wyślij rysunek",
};
