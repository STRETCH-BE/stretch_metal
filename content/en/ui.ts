/**
 * Chrome content (nav / footer / sticky CTA) — English.
 * File path: /content/en/ui.ts
 *
 * Mirrors /content/ui.ts: same export names (`nav`, `footer`, `stickyCta`),
 * same column structure — only labels differ. Consumed by <Nav>, <Footer>
 * and <MobileStickyCta> on every /en page.
 *
 * All hrefs come from @/lib/i18n-routes (EN paths) and contact data from
 * @/lib/site-config — nothing hardcoded except display labels. The language
 * switcher points at the OTHER locale's home (PL root).
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
    { label: "Services", href: routes.services.en },
    { label: "Machine park", href: routes.machinePark.en },
    { label: "Projects", href: routes.projects.en },
    { label: "About", href: routes.about.en },
    { label: "Contact", href: routes.contact.en },
  ],
  cta: "Send your drawing",
  switcher: { label: "PL", href: routes.home.pl },
  menuOpen: "Menu",
  menuClose: "Close",
};

/* ─── Footer ──────────────────────────────────────────────── */

export const footer: FooterContent = {
  services: {
    title: "Services",
    links: [
      { label: "All services", href: routes.services.en },
      { label: "Welding", href: servicePath("welding", "en") },
      { label: "Laser cutting", href: servicePath("laser", "en") },
      { label: "CNC machining", href: servicePath("cnc", "en") },
      { label: "Powder coating", href: servicePath("coating", "en") },
      { label: "Design & engineering", href: servicePath("design", "en") },
      { label: "Steel structures", href: servicePath("structures", "en") },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About us", href: routes.about.en },
      { label: "Machine park", href: routes.machinePark.en },
      { label: "Projects", href: routes.projects.en },
      { label: "Request a quote", href: routes.rfq.en },
      { label: "Contact", href: routes.contact.en },
    ],
  },
  contact: {
    title: "Contact",
    addressLines: [
      siteConfig.legalName, // [CONFIRM] legal entity (via site-config)
      siteConfig.contact.address.street, // [CONFIRM] address (via site-config)
      `${siteConfig.contact.address.postalCode} ${siteConfig.contact.address.city}, Poland`,
    ],
    phoneLabel: "Phone",
    emailLabel: "Email",
    hoursLabel: "Opening hours",
    hours: "Mon–Fri 08:00–16:00", // [CONFIRM]
  },
  group: {
    title: "Stretchgroup",
    description:
      "StretchMetal is the metal-fabrication unit of the Belgian Stretchgroup — the workshop behind the group's stretch-ceiling brands in Belgium and Poland.",
    links: [
      {
        label: `${siteConfig.group.belgium.name} — stretch ceilings, Belgium`,
        url: siteConfig.group.belgium.url,
      },
      {
        label: `${siteConfig.group.poland.name} — stretch ceilings, Poland`,
        url: siteConfig.group.poland.url,
      },
    ],
  },
  legalLine: `© ${new Date().getFullYear()} ${siteConfig.legalName} — part of the Belgian Stretchgroup.`, // [CONFIRM] legal entity; NIP/VAT ID to be added once confirmed
  legalLinks: [
    { label: "Privacy policy", href: routes.privacy.en },
    { label: "Cookie policy", href: routes.cookies.en },
  ],
};

/* ─── Mobile sticky CTA ───────────────────────────────────── */

export const stickyCta: StickyCtaContent = {
  call: "Call us",
  rfq: "Send your drawing",
};
