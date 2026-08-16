/**
 * RFQ page — /wycena
 * File path: /app/wycena/page.tsx
 *
 * The site's #1 conversion surface: everything on this page either IS the
 * form or removes a reason not to fill it in. Layout: dark hero (eyebrow,
 * display H1 with the single red accent word, lead) → surface two-column
 * shell: <RfqForm> in a white hairline card left, sticky trust rail right
 * (red .tick squares — the promises that de-risk uploading a drawing) →
 * mini 5-step process strip → FAQ (details/summary accordion + FAQPage
 * JSON-LD) → dark contact strip for people who want to talk first
 * (phone as TrackedCTA `phone_click` {location:"rfq"}) → Footer.
 *
 * Deliberately NO <MobileStickyCta>: it advertises this very page (and
 * self-hides on RFQ routes anyway) — rendering it here would be noise.
 * Analytics on this page fire from the form (`rfq_form_start`,
 * `rfq_submitted`) and the contact strip; the page itself fires nothing.
 *
 * All copy from /content/rfq.ts (RfqContent); FRAME below holds only the
 * furniture RfqContent has no fields for (eyebrow labels, breadcrumb
 * names) — same page-local pattern as /app/o-nas. Contact data via
 * siteConfig, never hardcoded.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/ui/fade-in";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { RfqForm } from "@/components/rfq/rfq-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs, buildFaqPage } from "@/lib/schema";
import { routes, languageAlternates } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { rfq } from "@/content/rfq";
import { nav, footer } from "@/content/ui";

/** Page-frame copy with no RfqContent field — kept minimal on purpose. */
const FRAME = {
  breadcrumbHome: "Strona główna",
  breadcrumbSelf: "Wycena",
  processEyebrow: "Proces",
  faqEyebrow: "FAQ",
  contactEyebrow: "Kontakt",
} as const;

export const metadata: Metadata = {
  title: rfq.metaTitle,
  description: rfq.metaDescription,
  alternates: {
    canonical: routes.rfq.pl,
    languages: languageAlternates(routes.rfq),
  },
  openGraph: {
    title: `${rfq.metaTitle} | ${siteConfig.name}`,
    description: rfq.metaDescription,
    url: routes.rfq.pl,
    images: defaultOgImages,
  },
};

/** Wraps the accent substring of the title in the single allowed red span. */
function withAccent(title: string, accent?: string): ReactNode {
  if (!accent) return title;
  const at = title.indexOf(accent);
  if (at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-red">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  );
}

export default function RfqPage() {
  return (
    <>
      <Nav content={nav} locale="pl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            {
              name: FRAME.breadcrumbHome,
              url: `${siteConfig.url}${routes.home.pl}`,
            },
            {
              name: FRAME.breadcrumbSelf,
              url: `${siteConfig.url}${routes.rfq.pl}`,
            },
          ])}
        />
        <JsonLd data={buildFaqPage(rfq.faq.items)} />

        {/* ── Hero — black, straight to the point ─────────────── */}
        <section className="section-sm section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{rfq.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                {withAccent(rfq.hero.title, rfq.hero.accent)}
              </SectionTitle>
              <p className="lead mt-7 max-w-[640px]">{rfq.hero.lead}</p>
            </FadeIn>
          </Container>
        </section>

        {/* ── Form + trust rail — surface two-column shell ────── */}
        <section className="section section-surface">
          <Container>
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
              {/* Form in a white hairline card */}
              <FadeIn className="border border-border-2 bg-white p-6 sm:p-8 md:p-10">
                <RfqForm content={rfq} locale="pl" />
              </FadeIn>

              {/* Trust rail — sticks below the sticky nav on desktop */}
              <FadeIn
                as="aside"
                delay={120}
                className="lg:sticky lg:top-[calc(var(--header-h)+32px)]"
              >
                <h2 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-text-faint">
                  {rfq.trust.title}
                </h2>
                <ul className="mt-4 border-b border-border-2">
                  {rfq.trust.items.map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-4 border-t border-border-2 py-5"
                    >
                      <span aria-hidden="true" className="tick mt-1.5" />
                      <div>
                        <h3 className="text-[15px] font-bold leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-muted">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* ── Mini process strip — what happens after "send" ──── */}
        <section className="section-sm">
          <Container>
            <FadeIn className="max-w-[820px]">
              <Eyebrow number="02">{FRAME.processEyebrow}</Eyebrow>
              <SectionTitle size="section-sm">{rfq.process.title}</SectionTitle>
            </FadeIn>

            <ol className="grid-lines mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {rfq.process.steps.map((step, i) => (
                <FadeIn
                  key={step.title}
                  as="li"
                  delay={i * 80}
                  className="flex flex-col bg-white p-6"
                >
                  <span
                    aria-hidden="true"
                    className="block text-[24px] font-black leading-none text-red"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
                    {step.description}
                  </p>
                </FadeIn>
              ))}
            </ol>
          </Container>
        </section>

        {/* ── FAQ — hard-edged details/summary accordion ──────── */}
        <section className="section-sm section-surface">
          <Container>
            <FadeIn className="max-w-[820px]">
              <Eyebrow number="03">{FRAME.faqEyebrow}</Eyebrow>
              <SectionTitle size="section-sm">{rfq.faq.title}</SectionTitle>
            </FadeIn>

            <div className="mt-10 max-w-[880px] border-t border-border-2">
              {rfq.faq.items.map((item, i) => (
                <FadeIn key={item.question} delay={Math.min(i * 60, 240)}>
                  <details className="group border-b border-border-2">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-baseline justify-between gap-6 py-5 text-[16px] font-bold leading-snug [&::-webkit-details-marker]:hidden">
                      {item.question}
                      {/* State glyph: + closed / − open. No transition —
                          the identity allows no motion beyond FadeIn. */}
                      <span
                        aria-hidden="true"
                        className="select-none text-[18px] leading-none text-red"
                      >
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">−</span>
                      </span>
                    </summary>
                    <p className="max-w-[720px] pb-6 text-sm leading-relaxed text-text-muted">
                      {item.answer}
                    </p>
                  </details>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Contact strip — for people who want to talk first ─ */}
        <section className="section-sm section-dark">
          <Container>
            <FadeIn className="max-w-[820px]">
              <Eyebrow number="04">{FRAME.contactEyebrow}</Eyebrow>
              <SectionTitle size="section-sm">
                {rfq.contactStrip.title}
              </SectionTitle>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="mt-10 flex flex-wrap gap-x-14 gap-y-8">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-dark-muted">
                    {rfq.contactStrip.phoneLabel}
                  </p>
                  <TrackedCTA
                    event="phone_click"
                    props={{ location: "rfq" }}
                    href={`tel:${siteConfig.contact.phone}`}
                    className="lnk mt-2 inline-block py-1 text-[24px] font-bold text-white"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </TrackedCTA>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-dark-muted">
                    {rfq.contactStrip.emailLabel}
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="lnk mt-2 inline-block py-1 text-[17px] font-semibold text-white"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>

      <Footer content={footer} locale="pl" />
      {/* No MobileStickyCta here — this page IS its destination. */}
    </>
  );
}
