/**
 * Sitemap — auto-generated at request time.
 * File path: /app/sitemap.ts
 *
 * Covers all three locale trees (pl root, /en, /nl): every static route
 * plus the six service pages. Each entry carries the full hreflang
 * alternate set so Google/Bing consolidate the locale versions instead of
 * ranking them as separate competing pages.
 *
 * Hosts: pl/en URLs are absolute on the .pl host (BASE_URL). The Dutch
 * tree is canonical on stretchmetal.be — nl entries use the absolute .be
 * URL from nlCanonical(), both as their <loc> and inside every alternates
 * map. languageAlternates() already returns nl-BE absolute, so abs() must
 * pass through anything that is already a full URL — prefixing it again
 * would mint a broken "https://stretchmetal.plhttps://…" address.
 *
 * Intentionally absent: /wycena/dziekujemy · /en/quote/thank-you ·
 * /nl/offerte/bedankt — the thank-you pages are noindex and must never
 * appear here.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  routes,
  serviceSlugs,
  servicePaths,
  languageAlternates,
  nlCanonical,
  type LocalePaths,
} from "@/lib/i18n-routes";

const BASE_URL = siteConfig.url;

type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry["changeFrequency"];

/**
 * Absolute URL for a site-relative path ("/" → BASE_URL). Values that are
 * already absolute (the nl-BE alternate from languageAlternates) pass
 * through untouched — never double-prefix the .pl host onto them.
 */
function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return path === "/" ? BASE_URL : `${BASE_URL}${path}`;
}

/**
 * Emits one sitemap entry per locale version of a route, each carrying
 * the full hreflang alternate set (absolute URLs, as the spec requires).
 * EN and NL entries are priced 0.1 below Polish — PL is the primary
 * market and its tree carries the domain's strongest signals.
 */
function localized(
  paths: LocalePaths,
  lastModified: Date,
  changeFrequency: Freq,
  priority: number
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(paths)).map(([lang, path]) => [
      lang,
      abs(path),
    ])
  );

  const localePriority = {
    pl: priority,
    en: priority - 0.1,
    nl: priority - 0.1,
  };

  // nl <loc> is the absolute .be URL — the Dutch tree's canonical host.
  const locByLocale = {
    pl: abs(paths.pl),
    en: abs(paths.en),
    nl: nlCanonical(paths.nl),
  };

  return (["pl", "en", "nl"] as const).map((locale) => ({
    url: locByLocale[locale],
    lastModified,
    changeFrequency,
    priority: Math.max(0.1, Math.round(localePriority[locale] * 10) / 10),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    ...localized(routes.home, lastModified, "weekly", 1.0),
    // /wycena is the site's #1 conversion page — priority just below home
    ...localized(routes.rfq, lastModified, "monthly", 0.9),
    // routes.rfqThanks intentionally missing — noindex
    ...localized(routes.services, lastModified, "monthly", 0.9),
    ...localized(routes.machinePark, lastModified, "monthly", 0.7),
    ...localized(routes.projects, lastModified, "monthly", 0.7),
    ...localized(routes.about, lastModified, "monthly", 0.7),
    ...localized(routes.contact, lastModified, "monthly", 0.6),
    ...localized(routes.privacy, lastModified, "yearly", 0.3),
    ...localized(routes.cookies, lastModified, "yearly", 0.3),
  ];

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap((s) =>
    localized(servicePaths(s), lastModified, "monthly", 0.8)
  );

  return [...staticEntries, ...serviceEntries];
}
