/**
 * English locale layout — /en/*
 * File path: /app/en/layout.tsx
 *
 * The root layout renders <html lang="pl"> for the whole site (nested
 * layouts cannot change the <html> element in the App Router). This layout
 * corrects the language signal for the English tree two ways:
 *
 *   1. An inline script sets document.documentElement.lang before paint —
 *      picked up by Google (which renders JS), screen readers, and
 *      translation tooling.
 *   2. A lang="en" wrapper (display: contents, so it has no box and no
 *      layout impact) marks the actual content for crawlers that only
 *      read the raw HTML.
 *
 * It also overrides the metadata defaults that would otherwise leak
 * Polish into the English tree. Next.js shallow-merges nested-layout
 * metadata over the root, so only these keys are replaced — titles,
 * descriptions and OpenGraph stay per-page.
 */

import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  description: siteConfig.descriptionEn,
  keywords: [
    "metal fabrication Poland",
    "welding services Poland",
    "laser cutting Poland",
    "CNC machining Poland",
    "powder coating Poland",
    "custom steel structures",
    "StretchMetal",
    "contract manufacturing Poland",
  ],
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.taglineEn}`,
    description: siteConfig.descriptionEn,
    images: [siteConfig.ogImage],
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="en";`,
        }}
      />
      <div lang="en" style={{ display: "contents" }}>
        {children}
      </div>
    </>
  );
}
