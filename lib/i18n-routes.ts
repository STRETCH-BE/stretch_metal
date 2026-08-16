/**
 * i18n route map — single source of truth for locale URL correspondence.
 * File path: /lib/i18n-routes.ts
 *
 * Used by:
 *   - /app/sitemap.ts (emits every locale URL + hreflang alternates)
 *   - every page's `metadata.alternates.languages` (hreflang tags)
 *   - nav / footer / language switcher (locale-aware links)
 *   - /middleware.ts (stretchmetal.be root → /nl)
 *
 * Why hreflang matters: Google/Bing use it to serve the right language
 * version in search results and to consolidate ranking signals across the
 * three trees instead of treating them as competing pages.
 *
 * Hosts: PL and EN are canonical on stretchmetal.pl (relative paths,
 * resolved against metadataBase). Dutch is canonical on stretchmetal.be —
 * the /nl tree is served on both hosts, but canonicals and hreflang point
 * the nl-BE entry at the absolute .be URL (see `languageAlternates` and
 * `nlCanonical`).
 *
 * Locale codes:
 *   pl-PL     — Polish (default, root tree)
 *   en        — English (/en tree, not region-specific — targets EU buyers)
 *   nl-BE     — Dutch (/nl tree, canonical on stretchmetal.be — Flanders)
 *   x-default — falls back to the Polish root
 */

import { siteConfig } from "@/lib/site-config";

export type LocalePaths = { pl: string; en: string; nl: string };

export type SiteLocale = "pl" | "en" | "nl";

/* ─── Static routes ───────────────────────────────────────── */
export const routes = {
  home: { pl: "/", en: "/en", nl: "/nl" },
  services: { pl: "/uslugi", en: "/en/services", nl: "/nl/diensten" },
  machinePark: {
    pl: "/park-maszynowy",
    en: "/en/machine-park",
    nl: "/nl/machinepark",
  },
  about: { pl: "/o-nas", en: "/en/about", nl: "/nl/over-ons" },
  projects: { pl: "/realizacje", en: "/en/projects", nl: "/nl/projecten" },
  rfq: { pl: "/wycena", en: "/en/quote", nl: "/nl/offerte" },
  rfqThanks: {
    pl: "/wycena/dziekujemy",
    en: "/en/quote/thank-you",
    nl: "/nl/offerte/bedankt",
  },
  contact: { pl: "/kontakt", en: "/en/contact", nl: "/nl/contact" },
  privacy: {
    pl: "/polityka-prywatnosci",
    en: "/en/privacy-policy",
    nl: "/nl/privacybeleid",
  },
  cookies: {
    pl: "/polityka-cookies",
    en: "/en/cookie-policy",
    nl: "/nl/cookiebeleid",
  },
} satisfies Record<string, LocalePaths>;

export type RouteKey = keyof typeof routes;

/* ─── Service slugs — index-aligned across locales ────────── */

export type ServiceKey =
  | "welding"
  | "laser"
  | "cnc"
  | "coating"
  | "design"
  | "structures";

/** Same service, same key, per-locale slug under the services hub. */
export const serviceSlugs: {
  key: ServiceKey;
  pl: string;
  en: string;
  nl: string;
}[] = [
  { key: "welding", pl: "spawanie", en: "welding", nl: "lassen" },
  { key: "laser", pl: "ciecie-laserowe", en: "laser-cutting", nl: "lasersnijden" },
  { key: "cnc", pl: "obrobka-cnc", en: "cnc-machining", nl: "cnc-bewerking" },
  {
    key: "coating",
    pl: "malowanie-proszkowe",
    en: "powder-coating",
    nl: "poedercoaten",
  },
  {
    key: "design",
    pl: "projektowanie",
    en: "design-engineering",
    nl: "engineering",
  },
  {
    key: "structures",
    pl: "konstrukcje-stalowe",
    en: "steel-structures",
    nl: "staalconstructies",
  },
];

/* ─── Path builders ───────────────────────────────────────── */

export function servicePaths(entry: {
  pl: string;
  en: string;
  nl: string;
}): LocalePaths {
  return {
    pl: `${routes.services.pl}/${entry.pl}`,
    en: `${routes.services.en}/${entry.en}`,
    nl: `${routes.services.nl}/${entry.nl}`,
  };
}

/** Full localized path for a service by key ("welding", "laser", …). */
export function servicePath(key: ServiceKey, locale: SiteLocale): string {
  const entry = serviceSlugs.find((s) => s.key === key);
  if (!entry) return routes.services[locale];
  return servicePaths(entry)[locale];
}

/** Look up a service entry by its slug in any locale. */
export function findService(
  locale: SiteLocale,
  slug: string
): { key: ServiceKey; pl: string; en: string; nl: string } | undefined {
  return serviceSlugs.find((s) => s[locale] === slug);
}

/* ─── Language-switcher path mapping ──────────────────────── */

/**
 * Maps a known pathname to its equivalent in the target locale, so the
 * language switcher preserves the visitor's page instead of resetting to
 * the homepage. Exact match on the static route table first, then service
 * detail pages by slug; unknown paths fall back to the target home.
 */
export function alternatePath(pathname: string, target: SiteLocale): string {
  // Normalize a trailing slash (except the root itself) before matching
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  for (const paths of Object.values(routes)) {
    if (paths.pl === path || paths.en === path || paths.nl === path) {
      return paths[target];
    }
  }

  for (const entry of serviceSlugs) {
    const paths = servicePaths(entry);
    if (paths.pl === path || paths.en === path || paths.nl === path) {
      return paths[target];
    }
  }

  return routes.home[target];
}

/* ─── hreflang / canonical builders ───────────────────────── */

/**
 * Absolute canonical URL for a Dutch page: the /nl tree's canonical host
 * is stretchmetal.be, so NL pages must not rely on metadataBase (which
 * resolves to the .pl host).
 */
export function nlCanonical(nlPath: string): string {
  return `${siteConfig.urlBe}${nlPath}`;
}

/**
 * Builds the `metadata.alternates.languages` object for a route.
 * pl/en are relative — Next resolves them against `metadataBase` (.pl).
 * nl-BE is absolute to the .be host, its canonical home.
 * x-default points at the Polish version (the site's primary market).
 */
export function languageAlternates(
  paths: LocalePaths
): Record<string, string> {
  return {
    "pl-PL": paths.pl,
    en: paths.en,
    "nl-BE": nlCanonical(paths.nl),
    "x-default": paths.pl,
  };
}
