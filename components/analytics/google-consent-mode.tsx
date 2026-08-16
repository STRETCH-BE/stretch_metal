/**
 * Google Consent Mode v2.
 * File path: /components/analytics/google-consent-mode.tsx
 *
 * Required for Google Ads conversion measurement in the EU (mandatory
 * since March 2024). Two pieces, both mounted in /app/layout.tsx:
 *
 *   1. GoogleConsentDefaults — a server-rendered inline <script> at the
 *      very top of <body>. It seeds window.dataLayer and pushes
 *      gtag('consent', 'default', … denied) BEFORE any Google tag can
 *      possibly load, so every later hit carries a consent state.
 *
 *   2. GoogleConsentUpdate — a client component that mirrors the site's
 *      own ConsentProvider (localStorage banner) into
 *      gtag('consent', 'update', …) whenever the visitor decides.
 *
 * The site runs "basic" Consent Mode: GA4 / Meta / Clarity components
 * render null until consent, so no cookieless pings are sent while
 * denied. The denied defaults still matter — gtag.js replays the
 * dataLayer on boot, finds default → update, and stamps the granted
 * state on every hit, which is what Google Ads verifies for EU
 * conversions.
 *
 * Deliberately NOT exposed as window.gtag: lib/analytics.ts treats a
 * missing window.gtag as "GA not loaded, drop the event", and a global
 * stub would silently queue pre-consent events instead.
 */

"use client";

import { useEffect } from "react";
import { useConsent } from "./consent-provider";

/**
 * Push a gtag command straight onto the dataLayer. gtag.js expects an
 * Arguments object (not a plain array), hence the old-school function.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtagPush(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

const CONSENT_DEFAULTS_JS = `(function(){
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
})();`;

/** Inline consent defaults — render first inside <body>. */
export function GoogleConsentDefaults() {
  return (
    <script
      id="google-consent-defaults"
      dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_JS }}
    />
  );
}

/** Mirrors the cookie-banner decision into Consent Mode. Renders null. */
export function GoogleConsentUpdate() {
  const { consent, hasInteracted } = useConsent();

  useEffect(() => {
    // Until the visitor has answered the banner (or a stored choice was
    // hydrated) the denied defaults stand — pushing an update would only
    // re-state them.
    if (!hasInteracted) return;
    gtagPush("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }, [consent.analytics, consent.marketing, hasInteracted]);

  return null;
}
