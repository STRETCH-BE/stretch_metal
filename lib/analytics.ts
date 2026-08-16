"use client";

/**
 * Unified analytics tracking helper.
 * File path: /lib/analytics.ts
 *
 * Fires the same event into PostHog, GA4, and Meta Pixel. Each platform
 * is checked for presence before firing, so this works even when env vars
 * are missing or consent was refused (every call becomes a no-op).
 *
 * Site-wide event vocabulary (the integration contract — keep in sync
 * with the RFQ form and TrackedCTA callers):
 *   cta_click            { location, label }
 *   phone_click          { location }
 *   rfq_form_start       —
 *   rfq_submitted        { services, locale, files }
 *   contact_form_submit  —
 *   scroll_depth         { percent }
 *
 * Usage:
 *   import { track, analytics } from "@/lib/analytics";
 *   track("cta_click", { location: "hero", label: "Wyślij rysunek" });
 *   analytics.phoneClick("footer");
 */

import type { PostHog } from "posthog-js";

type EventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    /** Set by PostHogProvider after the SDK is lazy-loaded on consent. */
    __ph?: PostHog;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(eventName: string, props?: EventProps) {
  if (typeof window === "undefined") return;

  // PostHog — instance is attached to window by PostHogProvider after
  // consent-gated lazy load; a static import here would drag the ~55 KiB
  // SDK back into the main bundle for every page.
  try {
    window.__ph?.capture(eventName, props);
  } catch {
    /* no-op */
  }

  // Google Analytics 4
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, props || {});
    }
  } catch {
    /* no-op */
  }

  // Meta Pixel — map our events to standard conversion events.
  // A completed RFQ is THE conversion on this site; every other mapped
  // event is a lighter intent signal, but all funnel into Lead/Contact so
  // Ads optimization has volume to work with (B2B traffic is thin).
  try {
    const metaMap: Record<string, string> = {
      rfq_submitted: "Lead",
      cta_click: "Lead",
      phone_click: "Contact",
      contact_form_submit: "Lead",
    };
    if (typeof window.fbq === "function" && metaMap[eventName]) {
      window.fbq("track", metaMap[eventName], props || {});
    }
  } catch {
    /* no-op */
  }
}

// Autocomplete-friendly helpers for the site-wide events
export const analytics = {
  ctaClick: (location: string, label: string) =>
    track("cta_click", { location, label }),

  phoneClick: (location: string) => track("phone_click", { location }),

  /** Visitor focused the first RFQ field — funnel entry. */
  rfqFormStart: () => track("rfq_form_start"),

  /** The site's #1 conversion. `services` = selected ServiceKey values. */
  rfqSubmitted: (data: {
    services: string[];
    locale: string;
    files: number;
  }) =>
    track("rfq_submitted", {
      services: data.services.join(","),
      locale: data.locale,
      files: data.files,
    }),

  contactFormSubmit: () => track("contact_form_submit"),

  scrollDepth: (percent: number) => track("scroll_depth", { percent }),
};
