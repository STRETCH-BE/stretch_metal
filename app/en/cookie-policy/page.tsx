/**
 * Cookie policy — /en/cookie-policy
 * File path: /app/en/cookie-policy/page.tsx
 *
 * English mirror of /app/polityka-cookies/page.tsx. Describes the consent
 * model exactly as implemented (consent-provider.tsx + cookie-banner.tsx):
 * decision stored in localStorage "sm_consent", opt-in analytics and
 * marketing categories, nothing loads pre-decision, equal-weight banner
 * buttons, and — honestly — no banner-reopen button: withdrawal works by
 * clearing the site's browser data (banner reappears) or via browser
 * settings.
 *
 * Inventory lists only what the site can actually set: sm_consent,
 * PostHog (ph_*), GA4 (_ga, _ga_*), Clarity (_clck, _clsk), Meta (_fbp),
 * with the vendors’ documented default durations. The table scrolls
 * inside its own overflow container on narrow screens.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { routes, languageAlternates } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { nav, footer, stickyCta } from "@/content/en/ui";

const LAST_UPDATED = "16 August 2026";

/** Cookie / storage inventory — keep in sync with the analytics stack. */
const INVENTORY = [
  {
    name: "sm_consent",
    provider: "StretchMetal (local storage)",
    purpose: "Remembers your cookie-banner decision",
    duration: "until site data is cleared",
    category: "Necessary",
  },
  {
    name: "ph_*",
    provider: "PostHog EU",
    purpose: "Anonymous identifier and session — analytics",
    duration: "up to 12 months",
    category: "Analytics",
  },
  {
    name: "_ga, _ga_*",
    provider: "Google Analytics 4",
    purpose: "Traffic statistics and visit sources",
    duration: "up to 2 years",
    category: "Analytics",
  },
  {
    name: "_clck, _clsk",
    provider: "Microsoft Clarity",
    purpose: "Click maps and session recordings (form fields masked)",
    duration: "_clck: 12 months, _clsk: 1 day",
    category: "Analytics",
  },
  {
    name: "_fbp",
    provider: "Meta Pixel",
    purpose: "Measuring Meta ad performance",
    duration: "3 months",
    category: "Marketing",
  },
] as const;

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "StretchMetal cookie policy — the consent model, the cookie and local-storage inventory (PostHog, GA4, Clarity, Meta) and how to withdraw consent.",
  alternates: {
    canonical: routes.cookies.en,
    languages: languageAlternates(routes.cookies),
  },
  openGraph: {
    title: "Cookie Policy | StretchMetal",
    description:
      "Which cookies and local-storage entries the StretchMetal website uses and how to withdraw consent.",
    url: routes.cookies.en,
    images: defaultOgImages,
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Nav content={nav} locale="en" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
            {
              name: "Cookie policy",
              url: `${siteConfig.url}${routes.cookies.en}`,
            },
          ])}
        />

        {/* Header */}
        <section className="section-sm border-b border-border">
          <Container>
            <Eyebrow>Legal document</Eyebrow>
            <h1 className="h2 max-w-[800px]">
              Cookie <span className="text-red">policy</span>
            </h1>
            <p className="lead mt-6 max-w-[640px]">
              Which cookies and similar technologies this site uses, on what
              terms — and how to withdraw your consent.
            </p>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-text-faint">
              Last updated: {LAST_UPDATED}
            </p>
          </Container>
        </section>

        {/* Body */}
        <section className="section-sm">
          <Container>
            <article className="prose-legal">
              <h2>§ 1. What cookies and local storage are</h2>
              <p>
                Cookies are small text files your browser stores on your
                device. Local storage is a similar mechanism — data kept in the
                browser without an expiry date, accessible only to this site.
                We use both, in the minimal scope described below.
              </p>

              <h2>§ 2. The consent model</h2>
              <p>
                On your first visit, a banner at the bottom of the page asks
                for consent. Until you decide,{" "}
                <strong>
                  no analytics or marketing tool loads at all
                </strong>{" "}
                — there is no “implied consent”. Both banner buttons (“Accept
                all” and “Essential only”) carry equal visual weight.
              </p>
              <ul>
                <li>
                  <strong>Necessary</strong> — always active: solely the record
                  of your consent decision (the “sm_consent” local-storage
                  entry).
                </li>
                <li>
                  <strong>Analytics</strong> — PostHog, Google Analytics 4 and
                  Microsoft Clarity; loaded only after you accept.
                </li>
                <li>
                  <strong>Marketing</strong> — Meta Pixel; loaded only after
                  you accept.
                </li>
              </ul>

              <h2>§ 3. Cookie and local-storage inventory</h2>
              <div className="overflow-x-auto border border-border-2">
                <table className="w-full min-w-[680px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-border-2 bg-surface">
                      <th className="px-4 py-3 font-bold">Name</th>
                      <th className="px-4 py-3 font-bold">Provider</th>
                      <th className="px-4 py-3 font-bold">Purpose</th>
                      <th className="px-4 py-3 font-bold">Duration</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INVENTORY.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-border last:border-b-0"
                      >
                        <td className="px-4 py-3 font-semibold">{row.name}</td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.provider}
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.purpose}
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.duration}
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Analytics and marketing entries appear only when the given
                service is configured and you have consented to its category.
                Durations are the vendors’ documented defaults and may vary
                slightly.
              </p>

              <h2>§ 4. How to withdraw consent</h2>
              <p>
                Your decision is stored in your browser (the “sm_consent”
                entry). The banner has no separate reopen button, so you
                withdraw consent in one of two ways:
              </p>
              <ul>
                <li>
                  <strong>Clear this site’s data in your browser</strong>{" "}
                  (cookies and site data / local storage for{" "}
                  {siteConfig.url.replace(/^https?:\/\//, "")}) — on your next
                  visit the banner appears again and you can choose “Essential
                  only”;
                </li>
                <li>
                  <strong>block cookies in your browser settings</strong>{" "}
                  (Chrome, Firefox, Safari and Edge can block cookies for
                  chosen sites or delete them automatically).
                </li>
              </ul>
              <p>
                Withdrawing consent does not affect the lawfulness of
                processing carried out before withdrawal. Refusing consent does
                not limit the site in any way.
              </p>

              <h2>§ 5. Related documents</h2>
              <p>
                How personal data is processed — including the full list of
                recipients and your rights — is described in the{" "}
                <Link href={routes.privacy.en}>privacy policy</Link>.
                Questions:{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </article>
          </Container>
        </section>
      </main>

      <Footer content={footer} locale="en" />
      {/* Clearance for the mobile sticky bar (h-14, md:hidden) */}
      <div aria-hidden="true" className="h-14 md:hidden" />
      <MobileStickyCta content={stickyCta} locale="en" />
    </>
  );
}
