/**
 * Privacy policy — /en/privacy-policy
 * File path: /app/en/privacy-policy/page.tsx
 *
 * English mirror of /app/polityka-prywatnosci/page.tsx — the GDPR
 * art. 13 information duty for EU buyers. Same structure, same honest
 * scope: RFQ/contact mail flow (no database — submissions and uploaded
 * technical files exist only inside the Microsoft 365 e-mail flow),
 * consent-gated analytics (PostHog EU, GA4, Clarity — analytics consent;
 * Meta Pixel — marketing consent), Vercel hosting.
 *
 * Controller: Alto Design Sp. z o.o. // [CONFIRM] legal entity — flagged
 * where rendered. Bump LAST_UPDATED on substantive changes.
 *
 * Disclaimer: drafted from common GDPR compliance patterns; review by a
 * qualified data-protection lawyer is advised before commercial use.
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

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "StretchMetal privacy policy — how quote and contact form data, including uploaded technical files, is processed under the GDPR.",
  alternates: {
    canonical: routes.privacy.en,
    languages: languageAlternates(routes.privacy),
  },
  openGraph: {
    title: "Privacy Policy | StretchMetal",
    description:
      "How personal data is processed on the StretchMetal website under the GDPR.",
    url: routes.privacy.en,
    images: defaultOgImages,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav content={nav} locale="en" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
            {
              name: "Privacy policy",
              url: `${siteConfig.url}${routes.privacy.en}`,
            },
          ])}
        />

        {/* Header */}
        <section className="section-sm border-b border-border">
          <Container>
            <Eyebrow>Legal document</Eyebrow>
            <h1 className="h2 max-w-[800px]">
              Privacy <span className="text-red">policy</span>
            </h1>
            <p className="lead mt-6 max-w-[640px]">
              This document explains what personal data we collect, why, on
              which legal basis, and which rights the GDPR gives you.
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
              <h2>§ 1. Data controller</h2>
              <p>
                The controller of your personal data is{" "}
                <strong>
                  {siteConfig.legalName /* [CONFIRM] legal entity */}
                </strong>{" "}
                — a Stretchgroup company and the owner of the{" "}
                {siteConfig.name} brand (“we”).
              </p>
              <ul>
                <li>
                  Address: {siteConfig.contact.address.street},{" "}
                  {siteConfig.contact.address.postalCode}{" "}
                  {siteConfig.contact.address.city}, Poland{" "}
                  {/* [CONFIRM] address */}
                </li>
                <li>
                  Email:{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              </ul>
              <p>
                For any data-protection matter, write to the email address
                above with “GDPR” in the subject line.
              </p>

              <h2>§ 2. What data we collect</h2>
              <h3>Quote (RFQ) form</h3>
              <ul>
                <li>full name (required), email address (required)</li>
                <li>
                  optionally: company, phone, country, selected services,
                  material, quantity, deadline
                </li>
                <li>message text (required)</li>
                <li>
                  attached technical files (DXF, DWG, STEP, IGES, PDF, ZIP) —
                  the drawings and models you submit for quoting
                </li>
              </ul>
              <h3>Contact form</h3>
              <ul>
                <li>full name, email address, message text</li>
              </ul>
              <h3>Analytics (only with consent)</h3>
              <ul>
                <li>an anonymous identifier (cookie / local storage)</li>
                <li>device and browser type, pages visited</li>
                <li>traffic source (search engine, link, ad)</li>
              </ul>
              <p>
                Analytics and marketing tools load{" "}
                <strong>only after you consent</strong> in the cookie banner.
                Without consent they do not load at all.
              </p>

              <h2>§ 3. Purposes and legal bases</h2>
              <ul>
                <li>
                  <strong>Preparing your quote and answering enquiries</strong>{" "}
                  (quote and contact forms) — art. 6(1)(b) GDPR: steps taken at
                  your request prior to entering into a contract.
                </li>
                <li>
                  <strong>Website analytics</strong> (PostHog, Google Analytics
                  4, Microsoft Clarity) and <strong>ad measurement</strong>{" "}
                  (Meta Pixel) — art. 6(1)(a) GDPR: your consent from the
                  cookie banner, given separately for the analytics and
                  marketing categories.
                </li>
                <li>
                  <strong>Site security and abuse prevention</strong> (server
                  logs, submission rate limits, anti-spam filters) — art.
                  6(1)(f) GDPR: our legitimate interest.
                </li>
              </ul>

              <h2>§ 4. Technical files from the quote form</h2>
              <p>
                Uploaded files are treated as <strong>confidential design
                data</strong>. The website stores them in no database — they
                travel exclusively as attachments of the email delivered to our
                mailbox (Microsoft 365, EU data centres) and are used only to
                prepare your quote and execute the order. We keep them until
                the quote is closed and, where an order follows, for the period
                required by accounting law. An NDA is available on request.
              </p>

              <h2>§ 5. Recipients of data</h2>
              <p>
                We entrust data only to providers necessary to run the site,
                under data-processing agreements (art. 28 GDPR):
              </p>
              <ul>
                <li>
                  <strong>Microsoft Corporation</strong> (Microsoft 365 /
                  Microsoft Graph) — the mailbox that carries form submissions
                  and their attachments; EU data centres.
                </li>
                <li>
                  <strong>Vercel Inc.</strong> — website hosting and standard
                  access logs.
                </li>
                <li>
                  <strong>PostHog Inc.</strong> (PostHog EU, Frankfurt) —
                  analytics; only after analytics consent.
                </li>
                <li>
                  <strong>Google LLC</strong> (Google Analytics 4) — traffic
                  statistics; only after analytics consent.
                </li>
                <li>
                  <strong>Microsoft Corporation</strong> (Clarity) — click maps
                  and session recordings with form fields masked; only after
                  analytics consent.
                </li>
                <li>
                  <strong>Meta Platforms</strong> (Meta Pixel) — ad performance
                  measurement; only after marketing consent.
                </li>
              </ul>

              <h2>§ 6. Transfers outside the EEA</h2>
              <p>
                Our mailbox and PostHog analytics run in EU data centres. For
                Google and Meta, part of the processing may take place in the
                United States — based on the European Commission’s adequacy
                decision (EU-US Data Privacy Framework) and standard
                contractual clauses (SCCs).
              </p>

              <h2>§ 7. Retention periods</h2>
              <ul>
                <li>
                  form submissions that do not lead to an order — until the
                  quote is closed, no longer than 12 months;
                </li>
                <li>
                  submissions that lead to an order — for the period required
                  by accounting law (as a rule 5 years from the end of the
                  financial year);
                </li>
                <li>analytics data — per the table in the cookie policy;</li>
                <li>server logs — up to 30 days.</li>
              </ul>

              <h2>§ 8. Your rights</h2>
              <ul>
                <li>right of access (art. 15 GDPR),</li>
                <li>right to rectification (art. 16 GDPR),</li>
                <li>right to erasure (art. 17 GDPR),</li>
                <li>right to restriction of processing (art. 18 GDPR),</li>
                <li>right to data portability (art. 20 GDPR),</li>
                <li>
                  right to object to processing based on legitimate interest
                  (art. 21 GDPR),
                </li>
                <li>
                  right to withdraw consent at any time — without affecting the
                  lawfulness of processing carried out before withdrawal,
                </li>
                <li>
                  right to lodge a complaint with a supervisory authority — in
                  Poland: the President of the Personal Data Protection Office
                  (PUODO), ul. Stawki 2, 00-193 Warsaw; you may also complain
                  to the authority of your own EU member state.
                </li>
              </ul>
              <p>
                Send requests to{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                . We answer within 30 days at the latest.
              </p>

              <h2>§ 9. Automated decision-making</h2>
              <p>
                We make no decisions about you based solely on automated
                processing, including profiling, that would produce legal
                effects.
              </p>

              <h2>§ 10. Cookies</h2>
              <p>
                How cookies and similar technologies are used, the full
                inventory table and how to withdraw consent are described in
                the separate{" "}
                <Link href={routes.cookies.en}>cookie policy</Link>.
              </p>

              <h2>§ 11. Changes to this policy</h2>
              <p>
                We update this policy when our infrastructure, providers or the
                law change. The current version, with its update date, is
                always available at this address. This document fulfils the
                information duty of art. 13 GDPR and is not legal advice.
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
