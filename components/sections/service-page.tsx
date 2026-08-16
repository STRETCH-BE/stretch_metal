/**
 * ServicePage — shared server template for the six service detail pages.
 * File path: /components/sections/service-page.tsx
 *
 * One layout, six data sets: /app/uslugi/[slug] and /app/en/services/[slug]
 * pass a ServiceContent (from /content/services.ts per locale) plus the
 * page chrome content, and this template renders the full page:
 *
 *   Nav → dark hero (service-number eyebrow, display H1 with the single
 *   red accent word, lead) → spec table (surface, hairline definition rows,
 *   sample-values note) → applications grid (white, .grid-lines cells) →
 *   Process strip (the home 5-step content, tone surface) → FAQ
 *   (details/summary accordion + FAQPage JSON-LD) → related-service
 *   cross-links (surface, .grid-lines cards via servicePath) → CtaFinal
 *   band → Footer → MobileStickyCta.
 *
 * Spec values are [CONFIRM] placeholders (flagged in the content files) —
 * the note under the table says so in visitor language, so no range reads
 * as a verified fact.
 *
 * SECTION_STRINGS: ServiceContent carries no labels for the template's own
 * furniture (spec/FAQ/related headings, the sample-values note, the CTA
 * band) — these are the locale literals this component owns, same pattern
 * as CARD_LINK_LABEL in services-grid.tsx (flagged in the build report).
 *
 * Motion: FadeIn only. No radius, no gradients, tokens/classes only.
 */

import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { ServiceIcon } from "@/components/ui/service-icon";
import { FadeIn } from "@/components/ui/fade-in";
import { JsonLd } from "@/components/seo/json-ld";
import { buildFaqPage } from "@/lib/schema";

import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";
import { Process } from "@/components/sections/process";
import { CtaFinal } from "@/components/sections/cta-final";

import { servicePath, serviceSlugs } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type {
  FooterContent,
  HomeContent,
  NavContent,
  ServiceCard,
  ServiceContent,
  StickyCtaContent,
} from "@/content/types";

type Props = {
  content: ServiceContent;
  locale: Locale;
  nav: NavContent;
  footer: FooterContent;
  stickyCta: StickyCtaContent;
  /** The home 5-step process — reused as the "how to order" strip. */
  process: HomeContent["process"];
  /** All six cards (serviceCards) — `content.related` filters them. */
  allServices: ServiceCard[];
};

type SectionStrings = {
  specEyebrow: string;
  /** Rendered under the spec table — spec rows are [CONFIRM] samples. */
  specNote: string;
  applicationsEyebrow: string;
  faqEyebrow: string;
  faqTitle: string;
  relatedEyebrow: string;
  relatedTitle: string;
  relatedLink: string;
  ctaFinal: HomeContent["ctaFinal"];
};

const SECTION_STRINGS: Record<Locale, SectionStrings> = {
  pl: {
    specEyebrow: "Specyfikacja",
    specNote: "Wartości przykładowe — potwierdzamy w wycenie.",
    applicationsEyebrow: "Zastosowania",
    faqEyebrow: "FAQ",
    faqTitle: "Częste pytania",
    relatedEyebrow: "Usługi",
    relatedTitle: "Zobacz też",
    relatedLink: "Zobacz usługę",
    ctaFinal: {
      title: "Wyślij rysunek. Odbierz gotowy element.",
      accent: "rysunek.",
      lead: "Formularz przyjmuje DXF, DWG, STEP i PDF. Odpowiadamy konkretną ceną i konkretnym terminem.",
      cta: "Wyślij rysunek do wyceny",
      ctaSecondary: "Kontakt",
    },
  },
  en: {
    specEyebrow: "Specification",
    specNote: "Sample ranges — confirmed in your quote.",
    applicationsEyebrow: "Applications",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    relatedEyebrow: "Services",
    relatedTitle: "Related services",
    relatedLink: "View service",
    ctaFinal: {
      title: "Send the drawing. Collect the parts.",
      accent: "drawing.",
      lead: "The quote form takes DXF, DWG, STEP and PDF. You get a firm price and a firm date back.",
      cta: "Send your drawing",
      ctaSecondary: "Contact us",
    },
  },
  nl: {
    specEyebrow: "Specificaties",
    specNote: "Richtwaarden — we bevestigen ze in uw offerte.",
    applicationsEyebrow: "Toepassingen",
    faqEyebrow: "FAQ",
    faqTitle: "Veelgestelde vragen",
    relatedEyebrow: "Diensten",
    relatedTitle: "Bekijk ook",
    relatedLink: "Bekijk dienst",
    ctaFinal: {
      title: "Stuur uw tekening. Ontvang uw onderdelen.",
      accent: "tekening.",
      lead: "Het offerteformulier aanvaardt DXF, DWG, STEP en PDF. U krijgt een vaste prijs en een vaste termijn terug.",
      cta: "Stuur uw tekening",
      ctaSecondary: "Contact",
    },
  },
};

/** Wraps the accent substring of a title in the single allowed red span. */
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

export function ServicePage({
  content,
  locale,
  nav,
  footer,
  stickyCta,
  process: orderProcess,
  allServices,
}: Props) {
  const t = SECTION_STRINGS[locale];

  /* Catalog index 01–06 — derived from serviceSlugs order, the same order
     that numbers the cards in ServicesGrid. */
  const serviceNumber = String(
    serviceSlugs.findIndex((s) => s.key === content.key) + 1
  ).padStart(2, "0");

  /* Cross-link cards in the order content.related declares them. */
  const related = content.related
    .map((key) => allServices.find((card) => card.key === key))
    .filter((card): card is ServiceCard => Boolean(card));

  return (
    <>
      <JsonLd data={buildFaqPage(content.faq)} />

      {/* pb-14 keeps the last content clear of the fixed mobile CTA bar. */}
      <div className="pb-14 md:pb-0">
        <Nav content={nav} locale={locale} />

        <main id="main">
          {/* ── Hero — dark intro ─────────────────────────────── */}
          <section className="section section-dark">
            <Container>
              <FadeIn>
                <Eyebrow number={serviceNumber}>{content.hero.eyebrow}</Eyebrow>
              </FadeIn>
              <FadeIn delay={80}>
                <h1 className="h1 mt-2 max-w-[1100px]">
                  {withAccent(content.hero.title, content.hero.accent)}
                </h1>
              </FadeIn>
              <FadeIn delay={160}>
                <p className="lead mt-7 max-w-[640px]">{content.hero.lead}</p>
              </FadeIn>
            </Container>
          </section>

          {/* ── Spec table — surface, hairline definition rows ── */}
          <section className="section section-surface">
            <Container>
              <FadeIn>
                <Eyebrow number="01">{t.specEyebrow}</Eyebrow>
                <SectionTitle size="section-sm">
                  {content.specTable.title}
                </SectionTitle>
              </FadeIn>

              <FadeIn delay={100}>
                <dl className="mt-10 max-w-[880px] border-t border-border-input">
                  {content.specTable.rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-border-input py-4 sm:grid-cols-[260px_1fr]"
                    >
                      <dt className="pt-[3px] text-[11.5px] font-bold uppercase tracking-[0.14em] text-text-faint">
                        {row.label}
                      </dt>
                      <dd className="text-[15px] font-semibold text-black">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                {/* Spec rows are [CONFIRM] samples (flagged in content) —
                    say so to the visitor. */}
                <p className="mt-5 max-w-[880px] text-[13px] text-text-faint">
                  {t.specNote}
                </p>
              </FadeIn>
            </Container>
          </section>

          {/* ── Applications — white, hairline grid ───────────── */}
          <section className="section">
            <Container>
              <FadeIn className="max-w-[820px]">
                <Eyebrow number="02">{t.applicationsEyebrow}</Eyebrow>
                <SectionTitle>{content.applications.title}</SectionTitle>
                {content.applications.intro && (
                  <p className="lead mt-6 max-w-[560px]">
                    {content.applications.intro}
                  </p>
                )}
              </FadeIn>

              <ul className="grid-lines mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {content.applications.items.map((item, i) => (
                  <FadeIn
                    key={item.name}
                    as="li"
                    delay={(i % 3) * 90}
                    className="bg-white p-7 md:p-8"
                  >
                    <span aria-hidden="true" className="tick block" />
                    <h3 className="mt-5 text-[16px] font-bold leading-snug">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </FadeIn>
                ))}
              </ul>
            </Container>
          </section>

          {/* ── How to order — the home 5-step process ────────── */}
          <Process
            content={orderProcess}
            locale={locale}
            tone="surface"
            number="03"
          />

          {/* ── FAQ — hard-edged details/summary accordion ────── */}
          <section className="section">
            <Container>
              <FadeIn className="max-w-[820px]">
                <Eyebrow number="04">{t.faqEyebrow}</Eyebrow>
                <SectionTitle>{t.faqTitle}</SectionTitle>
              </FadeIn>

              <div className="mt-10 max-w-[880px] border-t border-border-2">
                {content.faq.map((item, i) => (
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

          {/* ── Related services — surface, hairline cards ────── */}
          <section className="section-sm section-surface">
            <Container>
              <FadeIn>
                <Eyebrow number="05">{t.relatedEyebrow}</Eyebrow>
                <SectionTitle size="section-sm">{t.relatedTitle}</SectionTitle>
              </FadeIn>

              <ul className="grid-lines mt-10 grid-cols-1 sm:grid-cols-3">
                {related.map((card, i) => (
                  <FadeIn key={card.key} as="li" delay={i * 90} className="bg-white">
                    <Link
                      href={servicePath(card.key, locale)}
                      className="flex h-full flex-col p-7 transition-colors hover:bg-surface md:p-8"
                    >
                      <ServiceIcon service={card.key} size={30} />
                      <h3 className="h3 mt-5">{card.name}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                        {card.short}
                      </p>
                      <span className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-[12.5px] font-bold uppercase tracking-[0.1em] text-black">
                        {t.relatedLink}
                        <span aria-hidden="true" className="text-red">
                          →
                        </span>
                      </span>
                    </Link>
                  </FadeIn>
                ))}
              </ul>
            </Container>
          </section>

          {/* ── CTA band → RFQ ────────────────────────────────── */}
          <CtaFinal content={t.ctaFinal} locale={locale} />
        </main>

        <Footer content={footer} locale={locale} />
      </div>

      <MobileStickyCta content={stickyCta} locale={locale} />
    </>
  );
}
