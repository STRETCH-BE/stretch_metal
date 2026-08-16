"use client";

/**
 * PostHog tracker — lazy-loads the client SDK after analytics consent.
 * File path: /components/analytics/posthog-provider.tsx
 *
 * EU-hosted by default (https://eu.i.posthog.com) — data stays in the EU
 * unless NEXT_PUBLIC_POSTHOG_HOST overrides it. No key → renders null,
 * never loads.
 *
 * Tracks pageviews manually because Next.js App Router doesn't fire
 * router events PostHog can latch onto automatically. The pageview is
 * fired on every pathname or query string change.
 *
 * IMPORTANT (1): this component must NOT wrap the page content. It calls
 * useSearchParams(), which forces everything beneath it out of the
 * static prerender and into client-side rendering. Mount it as a sibling
 * of {children} (inside a Suspense boundary) — never as a wrapper —
 * or the whole page body disappears from the prerendered HTML.
 *
 * IMPORTANT (2): posthog-js is ~55 KiB gzipped. It is dynamic-imported —
 * the bundle is only downloaded once the visitor has granted analytics
 * consent, and the download itself is deferred to browser idle time so
 * it never competes with LCP. The loaded instance is exposed on
 * window.__ph so lib/analytics.ts can fire events without statically
 * importing the library (which would pull it back into the main bundle).
 */

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { PostHog } from "posthog-js";
import { useConsent } from "./consent-provider";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

declare global {
  interface Window {
    __ph?: PostHog;
  }
}

export function PostHogProvider() {
  const { consent } = useConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ph, setPh] = useState<PostHog | null>(null);

  // Lazy-init once consent is granted: dynamic import on browser idle.
  useEffect(() => {
    if (!KEY || !consent.analytics || ph) return;

    let cancelled = false;

    const start = () => {
      import("posthog-js").then(({ default: posthog }) => {
        if (cancelled) return;
        if (!(posthog as unknown as { __loaded?: boolean }).__loaded) {
          posthog.init(KEY, {
            api_host: HOST,
            capture_pageview: false, // we capture manually below
            capture_pageleave: true,
            person_profiles: "identified_only",
            session_recording: {
              maskAllInputs: true,
            },
          });
        }
        window.__ph = posthog;
        setPh(posthog);
      });
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 3000 });
    } else {
      timeoutId = setTimeout(start, 500);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [consent.analytics, ph]);

  // Fire pageview on route change (and once right after init).
  useEffect(() => {
    if (!ph) return;
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    ph.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, ph]);

  return null;
}
