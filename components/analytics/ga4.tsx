"use client";

/**
 * Google Analytics 4.
 * File path: /components/analytics/ga4.tsx
 *
 * Uses @next/third-parties for the official, optimized integration.
 * Consent-gated AND env-gated: no NEXT_PUBLIC_GA_ID or no analytics
 * consent → renders null, gtag.js never loads. Consent Mode v2 defaults
 * (google-consent-mode.tsx) are already on the dataLayer by the time
 * this mounts, so every hit carries a consent state.
 */

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "./consent-provider";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GA4() {
  const { consent } = useConsent();
  if (!GA_ID || !consent.analytics) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
