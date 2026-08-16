/**
 * RFQ thank-you page — /nl/offerte/bedankt
 * File path: /app/nl/offerte/bedankt/page.tsx
 *
 * Dutch (nl-BE) mirror of /app/en/quote/thank-you/page.tsx: one calm
 * black band with the confirmation heading, a three-step "wat er nu
 * gebeurt" (numbered hairline cells from rfq.thanks.steps), the phone
 * number for anything urgent, and two ways back (diensten / home via
 * routes). No form, no conversion furniture, no MobileStickyCta.
 *
 * Analytics: this page fires NOTHING on load or click — `rfq_submitted`
 * fired in the form before the redirect, so a refresh here can never
 * double-count. The phone number is a plain <a>, not a TrackedCTA, on
 * purpose. SEO: robots noindex/nofollow, excluded from the sitemap, no
 * JSON-LD, no canonical — a receipt page has no business in an index.
 *
 * Copy from /content/nl/rfq.ts (rfq.thanks); FRAME below holds only
 * labels RfqContent has no fields for. The display heading gets the
 * identity's single red accent by tinting the title's last word —
 * derived, not hardcoded, so the content file stays the source of truth.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { routes } from "@/lib/i18n-routes";
import { siteConfig } from "@/lib/site-config";
import { rfq } from "@/content/nl/rfq";
import { nav, footer } from "@/content/nl/ui";

/** Page-frame copy with no RfqContent field — kept minimal on purpose. */
const FRAME = {
  eyebrow: "Bevestiging",
  stepsTitle: "Wat er nu gebeurt",
  phoneLead: "Iets dringends? Bel ons:",
} as const;

export const metadata: Metadata = {
  title: rfq.thanks.metaTitle,
  description: "Bedankt voor uw aanvraag. Wij antwoorden binnen 48 uur.", // [CONFIRM] 48 u
  robots: { index: false, follow: false },
};

/** Tints the title's last word — the one red accent the identity allows. */
function accentLastWord(title: string): ReactNode {
  const at = title.lastIndexOf(" ");
  if (at === -1) return <span className="text-red">{title}</span>;
  return (
    <>
      {title.slice(0, at + 1)}
      <span className="text-red">{title.slice(at + 1)}</span>
    </>
  );
}

export default function QuoteThanksPage() {
  return (
    <>
      <Nav content={nav} locale="nl" />

      <main id="main">
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow>{FRAME.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                {accentLastWord(rfq.thanks.title)}
              </SectionTitle>
              <p className="lead mt-8 max-w-[640px]">{rfq.thanks.lead}</p>
            </FadeIn>

            {/* What happens next — numbered hairline cells */}
            <FadeIn delay={120} className="mt-16">
              <h2 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-on-dark-muted">
                {FRAME.stepsTitle}
              </h2>
              <ol className="grid-lines grid-lines-dark mt-5 max-w-[980px] grid-cols-1 md:grid-cols-3">
                {rfq.thanks.steps.map((step, i) => (
                  <li key={i} className="bg-black p-7">
                    <span
                      aria-hidden="true"
                      className="block text-[24px] font-black leading-none text-red"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 text-[14px] leading-relaxed text-on-dark-soft">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </FadeIn>

            {/* Urgent line — plain <a>: no analytics fire on this page */}
            <FadeIn delay={200} className="mt-12">
              <p className="text-[14px] text-on-dark-muted">
                {FRAME.phoneLead}{" "}
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="lnk inline-block py-1 font-bold text-white"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href={routes.services.nl}
                  variant="primary"
                  size="lg"
                  arrow
                >
                  {rfq.thanks.backServices}
                </Button>
                <Button href={routes.home.nl} variant="ghost-light" size="lg">
                  {rfq.thanks.backHome}
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>

      <Footer content={footer} locale="nl" />
    </>
  );
}
