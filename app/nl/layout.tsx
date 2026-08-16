/**
 * Dutch locale layout — /nl/*
 * File path: /app/nl/layout.tsx
 *
 * The root layout renders <html lang="pl"> for the whole site (nested
 * layouts cannot change the <html> element in the App Router). This layout
 * corrects the language signal for the Dutch tree two ways:
 *
 *   1. An inline script sets document.documentElement.lang before paint —
 *      picked up by Google (which renders JS), screen readers, and
 *      translation tooling.
 *   2. A lang="nl" wrapper (display: contents, so it has no box and no
 *      layout impact) marks the actual content for crawlers that only
 *      read the raw HTML.
 *
 * It also overrides the metadata defaults that would otherwise leak
 * Polish into the Dutch tree. Next.js shallow-merges nested-layout
 * metadata over the root, so only these keys are replaced — titles,
 * descriptions and OpenGraph stay per-page. Keywords target Flemish
 * searches; canonical URLs point at stretchmetal.be per-page via
 * nlCanonical() — the /nl tree is served on both hosts.
 */

import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  description: siteConfig.descriptionNl,
  keywords: [
    "metaalbewerking op maat",
    "lasersnijden",
    "lassen op maat",
    "CNC-bewerking",
    "poedercoaten",
    "staalconstructies",
    "België",
    "Polen",
  ],
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.taglineNl}`,
    description: siteConfig.descriptionNl,
    images: [siteConfig.ogImage],
  },
};

export default function NlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="nl";`,
        }}
      />
      <div lang="nl" style={{ display: "contents" }}>
        {children}
      </div>
    </>
  );
}
