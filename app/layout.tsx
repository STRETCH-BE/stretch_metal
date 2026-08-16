/**
 * Root layout.
 * File path: /app/layout.tsx
 *
 * Wires up:
 *   - Archivo variable font (self-hosted, one file for body + display)
 *   - ConsentProvider (RODO) + CookieBanner
 *   - PostHog, Clarity, GA4, Meta Pixel (consent-gated, env-gated)
 *   - ScrollTracker
 *   - Organization + Website JSON-LD on every page
 *   - Default metadata (Polish — the /en layout overrides EN-tree keys)
 */

import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import { archivo } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { buildOrganization, buildWebsite } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ConsentProvider } from "@/components/analytics/consent-provider";
import {
  GoogleConsentDefaults,
  GoogleConsentUpdate,
} from "@/components/analytics/google-consent-mode";
import { CookieBanner } from "@/components/analytics/cookie-banner";
import { PostHogProvider } from "@/components/analytics/posthog-provider";
import { Clarity } from "@/components/analytics/clarity";
import { GA4 } from "@/components/analytics/ga4";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { ScrollTracker } from "@/components/analytics/scroll-tracker";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  generator: "Next.js",
  keywords: [
    "obróbka metali",
    "spawanie Częstochowa",
    "cięcie laserowe blach",
    "obróbka CNC",
    "malowanie proszkowe",
    "konstrukcje stalowe",
    "StretchMetal",
    "metal fabrication Poland",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={archivo.variable}>
      <body className="antialiased">
        {/* Consent Mode v2 defaults — must execute before any Google tag */}
        <GoogleConsentDefaults />

        {/* Site-wide structured data */}
        <JsonLd data={buildOrganization()} />
        <JsonLd data={buildWebsite()} />

        <ConsentProvider>
          {/*
            Children render OUTSIDE any Suspense/analytics wrapper so the
            full page body is present in the prerendered HTML (critical for
            AI crawlers that don't execute JavaScript).
          */}
          {children}

          {/* PostHog uses useSearchParams which requires a Suspense boundary in Next 15 */}
          <Suspense fallback={null}>
            <PostHogProvider />
          </Suspense>

          <Suspense fallback={null}>
            <ScrollTracker />
          </Suspense>

          {/* Third-party scripts — each is consent-gated and env-gated */}
          <GoogleConsentUpdate />
          <Clarity />
          <GA4 />
          <MetaPixel />

          <CookieBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
