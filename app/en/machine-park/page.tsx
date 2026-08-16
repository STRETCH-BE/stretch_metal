/**
 * Machine park page — /en/machine-park
 * File path: /app/en/machine-park/page.tsx
 *
 * English mirror of /app/park-maszynowy/page.tsx: same all-black
 * technical layout, same section order (hero → inventory → facts → CTA),
 * data from /content/en/machines.ts. Copy is written for a German/Benelux
 * purchasing manager, not translated word-for-word.
 *
 * Honesty contract: machine specs are [CONFIRM] placeholders — the
 * visible specs note ("Exact specifications are confirmed with your
 * quote.") is required page furniture. No certification claims.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/ui/fade-in";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { routes, languageAlternates } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { machines, workshopFacts } from "@/content/en/machines";
import { nav, footer, stickyCta } from "@/content/en/ui";

const COPY = {
  hero: {
    eyebrow: "Machine park",
    lead: "We built this machine park for our own production — the frames, light channels and substructures the Stretchgroup's ceiling projects consume. It has more capacity than the group uses, so it also runs external work. The full station list is below.",
  },
  machines: {
    eyebrow: "Equipment",
    title: "The full station list",
    /* Required honesty note — specs in /content/en/machines.ts are
       [CONFIRM] placeholders until the owner confirms the inventory. */
    note: "Exact specifications are confirmed with your quote. The ranges below describe the machine class — the binding values for your part are stated in the offer.",
  },
  facts: {
    eyebrow: "The workshop in numbers",
  },
  cta: {
    title: "Put these machines on your part.",
    accent: "your",
    lead: "Send a drawing — DXF, DWG, STEP or PDF. Within 48 hours you get a concrete price and a concrete date.",
    primary: "Send your drawing",
    secondary: "See services",
  },
} as const;

export const metadata: Metadata = {
  title: "Machine Park — Equipment and Capacity",
  description:
    "StretchMetal's machine park in Częstochowa, Poland: fiber laser cutter, CNC press brake, MIG/MAG and TIG welding cells, CNC machining, powder coating line.",
  alternates: {
    canonical: routes.machinePark.en,
    languages: languageAlternates(routes.machinePark),
  },
  openGraph: {
    title: "Machine Park — Equipment and Capacity | StretchMetal",
    description:
      "The full machine list of the StretchMetal workshop in Częstochowa. Cutting, bending, welding, CNC machining and powder coating under one roof.",
    url: routes.machinePark.en,
    images: defaultOgImages,
  },
};

export default function MachineParkPage() {
  return (
    <>
      <Nav content={nav} locale="en" />

      <main id="main" className="bg-black text-white">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
            {
              name: "Machine park",
              url: `${siteConfig.url}${routes.machinePark.en}`,
            },
          ])}
        />

        {/* Hero — display H1, honest lead */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Machines, not <span className="text-red">promises.</span>
              </SectionTitle>
              <p className="lead mt-8 max-w-[640px]">{COPY.hero.lead}</p>
            </FadeIn>
          </Container>
        </section>

        {/* Machine inventory — dark hairline grid */}
        <section className="section-sm section-dark border-t border-line-dark">
          <Container>
            <FadeIn className="max-w-[820px]">
              <Eyebrow number="02">{COPY.machines.eyebrow}</Eyebrow>
              <SectionTitle>{COPY.machines.title}</SectionTitle>
            </FadeIn>

            <ul className="grid-lines grid-lines-dark mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {machines.map((machine, i) => (
                <FadeIn
                  key={machine.name}
                  as="li"
                  delay={(i % 3) * 90}
                  className="flex flex-col bg-black p-7"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-dark-muted">
                    {machine.type}
                  </span>
                  <h3 className="h3 mt-2.5 text-white">{machine.name}</h3>

                  <dl className="mt-6 border-t border-line-dark">
                    {machine.specs.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-4 border-b border-line-dark py-2.5 text-[13px]"
                      >
                        <dt className="text-on-dark-muted">{row.label}</dt>
                        <dd className="text-right font-semibold text-white">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </FadeIn>
              ))}
            </ul>

            {/* Honesty note — specs are confirmed per quote, not marketing */}
            <FadeIn delay={120}>
              <p className="mt-8 flex max-w-[640px] items-start gap-3 text-[13.5px] leading-relaxed text-on-dark-soft">
                <span aria-hidden="true" className="tick tick-sm mt-1.5" />
                <span>{COPY.machines.note}</span>
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* Workshop facts — dark stats strip */}
        <section className="section-sm section-dark border-t border-line-dark">
          <Container>
            <FadeIn>
              <Eyebrow number="03">{COPY.facts.eyebrow}</Eyebrow>
            </FadeIn>

            <ul className="grid-lines grid-lines-dark mt-8 grid-cols-2 lg:grid-cols-4">
              {workshopFacts.map((stat, i) => (
                <FadeIn
                  key={stat.label}
                  as="li"
                  delay={i * 80}
                  className="bg-black p-6 md:p-8"
                >
                  <span className="h2-sm block text-white">{stat.value}</span>
                  <span className="mt-3 block text-[11.5px] font-bold uppercase tracking-[0.14em] text-on-dark-muted">
                    {stat.label}
                  </span>
                </FadeIn>
              ))}
            </ul>
          </Container>
        </section>

        {/* CTA band → RFQ */}
        <section className="section section-dark border-t border-line-dark">
          <Container>
            <FadeIn>
              <SectionTitle className="max-w-[1000px]">
                {COPY.cta.title.slice(0, COPY.cta.title.indexOf(COPY.cta.accent))}
                <span className="text-red">{COPY.cta.accent}</span>
                {COPY.cta.title.slice(
                  COPY.cta.title.indexOf(COPY.cta.accent) + COPY.cta.accent.length
                )}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="lead mt-8 max-w-[560px]">{COPY.cta.lead}</p>
            </FadeIn>
            <FadeIn delay={180}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <TrackedCTA
                  event="cta_click"
                  props={{ location: "machine_park", label: COPY.cta.primary }}
                  href={routes.rfq.en}
                  className="btn btn-primary btn-lg"
                >
                  {COPY.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button href={routes.services.en} variant="ghost-light" size="lg">
                  {COPY.cta.secondary}
                </Button>
              </div>
            </FadeIn>
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
