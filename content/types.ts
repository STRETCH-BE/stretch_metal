/**
 * Shared content types — the contract between /content data files and the
 * section/page components that render them.
 * File path: /content/types.ts
 *
 * Content model: /content holds the Polish (default-locale) data files,
 * /content/en the English mirrors. Both locales export identically-shaped
 * objects typed by this file, so components stay copy-free — they receive
 * everything (labels included) as props.
 *
 * Placeholder policy: any value that is a guess awaiting the owner's
 * confirmation carries a `// [CONFIRM]` comment next to it IN THE CONTENT
 * FILE, so `grep -rn "\[CONFIRM\]" content/` surfaces every unverified
 * claim in one pass.
 */

import type { ServiceKey } from "@/lib/i18n-routes";

export type { ServiceKey };

/* ─── Shared atoms ────────────────────────────────────────── */

export type FaqItem = { question: string; answer: string };

/** One row of a capability/spec table (materials, ranges, formats…). */
export type SpecRow = { label: string; value: string };

export type Stat = { value: string; label: string };

export type ProcessStep = { title: string; description: string };

/* ─── Services ────────────────────────────────────────────── */

/** Card on the home page + services hub grid. */
export type ServiceCard = {
  key: ServiceKey;
  name: string;
  /** Two-line description for the card. */
  short: string;
  /** Capability tags, e.g. ["MIG/MAG", "TIG", "Stal nierdzewna"]. */
  tags: string[];
};

/** Full content for one service detail page. */
export type ServiceContent = {
  key: ServiceKey;
  name: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    /** Display H1; `accent` is rendered as the red word inside it. */
    title: string;
    accent?: string;
    lead: string;
  };
  specTable: {
    title: string;
    rows: SpecRow[];
  };
  applications: {
    title: string;
    intro?: string;
    items: { name: string; description: string }[];
  };
  faq: FaqItem[];
  related: ServiceKey[];
};

/* ─── Machine park ────────────────────────────────────────── */

export type Machine = {
  name: string;
  /** e.g. "Wycinarka laserowa fiber" / "Fiber laser cutter" */
  type: string;
  specs: SpecRow[];
};

/* ─── Projects (case entries) ─────────────────────────────── */

export type Project = {
  title: string;
  services: string[];
  material: string;
  finish: string;
  /** Caption printed on the image placeholder until real photos exist. */
  imageCaption: string;
  /** Real photo path once supplied — drop it in and the placeholder yields. */
  image?: string;
  description: string;
};

/* ─── Home page ───────────────────────────────────────────── */

export type WhyUsItem = { title: string; description: string };

export type HomeContent = {
  hero: {
    badge: string;
    /** Headline words; the one at `accentIndex` renders red. */
    words: string[];
    accentIndex: number;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageCaption: string;
  };
  ticker: string[];
  stats: {
    eyebrow: string;
    items: Stat[];
  };
  services: {
    eyebrow: string;
    title: string;
    accent?: string;
    lead: string;
    cards: ServiceCard[];
    linkLabel: string;
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: ProcessStep[];
    cta: string;
  };
  machinePark: {
    eyebrow: string;
    title: string;
    lead: string;
    highlights: Machine[];
    linkLabel: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    items: WhyUsItem[];
  };
  heritage: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    /** Sister-brand links rendered under the story. */
    brands: { name: string; description: string; url: string }[];
    imageCaption: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    linkLabel: string;
  };
  ctaFinal: {
    title: string;
    accent?: string;
    lead: string;
    cta: string;
    ctaSecondary: string;
  };
};

/* ─── Chrome (nav / footer / sticky CTA) ──────────────────── */

export type NavContent = {
  links: { label: string; href: string }[];
  cta: string;
  /** Language switcher label of the OTHER locale + its home href. */
  switcher: { label: string; href: string };
  menuOpen: string;
  menuClose: string;
};

export type FooterContent = {
  services: { title: string; links: { label: string; href: string }[] };
  company: { title: string; links: { label: string; href: string }[] };
  contact: {
    title: string;
    addressLines: string[];
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hours: string;
  };
  group: {
    title: string;
    description: string;
    links: { label: string; url: string }[];
  };
  legalLine: string;
  legalLinks: { label: string; href: string }[];
};

export type StickyCtaContent = {
  call: string;
  rfq: string;
};

/* ─── RFQ form ────────────────────────────────────────────── */

export type RfqContent = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    accent?: string;
    lead: string;
  };
  form: {
    company: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    countries: { value: string; label: string }[];
    services: string;
    serviceOptions: { value: ServiceKey; label: string }[];
    material: string;
    materialOptions: { value: string; label: string }[];
    quantity: string;
    quantityPlaceholder: string;
    deadline: string;
    deadlinePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    files: {
      label: string;
      hint: string;
      drop: string;
      browse: string;
      remove: string;
      errorType: string;
      errorSize: string;
    };
    consent: string;
    consentLinkLabel: string;
    submit: string;
    submitting: string;
    errorGeneric: string;
    errorRequired: string;
    errorEmail: string;
  };
  trust: {
    title: string;
    items: { title: string; description: string }[];
  };
  process: {
    title: string;
    steps: ProcessStep[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  contactStrip: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
  };
  thanks: {
    metaTitle: string;
    title: string;
    lead: string;
    steps: string[];
    backHome: string;
    backServices: string;
  };
};

/* ─── About page ──────────────────────────────────────────── */

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; title: string; accent?: string; lead: string };
  timeline: {
    eyebrow: string;
    title: string;
    entries: { year: string; title: string; description: string }[];
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  team: {
    eyebrow: string;
    title: string;
    lead: string;
    imageCaption: string;
  };
  values: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
  };
};
