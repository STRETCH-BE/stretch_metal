/**
 * i18n route map — single source of truth for locale URL correspondence.
 * File path: /lib/i18n-routes.ts
 *
 * Used by:
 *   - /app/sitemap.ts (emits every locale URL + hreflang alternates)
 *   - every page's `metadata.alternates.languages` (hreflang tags)
 *   - nav / footer / language switcher (locale-aware links)
 *
 * Why hreflang matters: Google/Bing use it to serve the right language
 * version in search results and to consolidate ranking signals across the
 * two trees instead of treating them as competing pages.
 *
 * Locale codes:
 *   pl-PL     — Polish (default, root tree)
 *   en        — English (/en tree, not region-specific — targets EU buyers)
 *   x-default — falls back to the Polish root
 */

export type LocalePaths = { pl: string; en: string };

/* ─── Static routes ───────────────────────────────────────── */
export const routes = {
  home: { pl: "/", en: "/en" },
  services: { pl: "/uslugi", en: "/en/services" },
  machinePark: { pl: "/park-maszynowy", en: "/en/machine-park" },
  about: { pl: "/o-nas", en: "/en/about" },
  projects: { pl: "/realizacje", en: "/en/projects" },
  rfq: { pl: "/wycena", en: "/en/quote" },
  rfqThanks: { pl: "/wycena/dziekujemy", en: "/en/quote/thank-you" },
  contact: { pl: "/kontakt", en: "/en/contact" },
  privacy: { pl: "/polityka-prywatnosci", en: "/en/privacy-policy" },
  cookies: { pl: "/polityka-cookies", en: "/en/cookie-policy" },
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
export const serviceSlugs: { key: ServiceKey; pl: string; en: string }[] = [
  { key: "welding", pl: "spawanie", en: "welding" },
  { key: "laser", pl: "ciecie-laserowe", en: "laser-cutting" },
  { key: "cnc", pl: "obrobka-cnc", en: "cnc-machining" },
  { key: "coating", pl: "malowanie-proszkowe", en: "powder-coating" },
  { key: "design", pl: "projektowanie", en: "design-engineering" },
  { key: "structures", pl: "konstrukcje-stalowe", en: "steel-structures" },
];

/* ─── Path builders ───────────────────────────────────────── */

export function servicePaths(entry: { pl: string; en: string }): LocalePaths {
  return {
    pl: `${routes.services.pl}/${entry.pl}`,
    en: `${routes.services.en}/${entry.en}`,
  };
}

/** Full localized path for a service by key ("welding", "laser", …). */
export function servicePath(key: ServiceKey, locale: "pl" | "en"): string {
  const entry = serviceSlugs.find((s) => s.key === key);
  if (!entry) return routes.services[locale];
  return servicePaths(entry)[locale];
}

/** Look up a service entry by its slug in either locale. */
export function findService(
  locale: "pl" | "en",
  slug: string
): { key: ServiceKey; pl: string; en: string } | undefined {
  return serviceSlugs.find((s) => s[locale] === slug);
}

/* ─── hreflang builder ────────────────────────────────────── */

/**
 * Builds the `metadata.alternates.languages` object for a route.
 * Relative paths are fine — Next resolves them against `metadataBase`.
 * x-default points at the Polish version (the site's primary market).
 */
export function languageAlternates(
  paths: LocalePaths
): Record<string, string> {
  return {
    "pl-PL": paths.pl,
    en: paths.en,
    "x-default": paths.pl,
  };
}
