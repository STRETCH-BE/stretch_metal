/**
 * Machine park page — /nl/machinepark
 * File path: /app/nl/machinepark/page.tsx
 *
 * Dutch (nl-BE) mirror of /app/en/machine-park/page.tsx: same all-black
 * technical layout, same section order (hero → inventory → facts → CTA),
 * data from /content/nl/machines.ts. Copy is written natively for a
 * Flemish/Belgian technical buyer — zakelijk Vlaams, formal "u" — not
 * translated word-for-word.
 *
 * Canonical host is stretchmetal.be: canonical via nlCanonical(),
 * breadcrumbs and og:url absolute on the .be domain.
 *
 * Honesty contract: machine specs are [CONFIRM] placeholders — the
 * visible specs note ("Specificaties bevestigen we bij de offerte.") is
 * required page furniture. No certification claims.
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
import { routes, languageAlternates, nlCanonical } from "@/lib/i18n-routes";
import { defaultOgImages } from "@/lib/site-config";
import { machines, workshopFacts } from "@/content/nl/machines";
import { nav, footer, stickyCta } from "@/content/nl/ui";

const COPY = {
  hero: {
    eyebrow: "Machinepark",
    lead: "Dit machinepark bouwden we voor onze eigen productie — de frames, lichtkanalen en onderconstructies die de plafondprojecten van de Stretchgroup verbruiken. Het heeft meer capaciteit dan de groep nodig heeft, dus draait het ook externe orders. De volledige lijst van posten staat hieronder.",
  },
  machines: {
    eyebrow: "Uitrusting",
    title: "De volledige lijst van posten",
    /* Required honesty note — specs in /content/nl/machines.ts are
       [CONFIRM] placeholders until the owner confirms the inventory. */
    note: "Specificaties bevestigen we bij de offerte. De waarden hieronder beschrijven de machineklasse — de bindende waarden voor uw stuk staan in de offerte.",
  },
  facts: {
    eyebrow: "De werkplaats in cijfers",
  },
  cta: {
    title: "Zet deze machines in voor uw stuk.",
    accent: "uw stuk.",
    lead: "Stuur een tekening — DXF, DWG, STEP of PDF. Binnen 48 uur ontvangt u een concrete prijs en een concrete datum.",
    primary: "Stuur uw tekening",
    secondary: "Bekijk onze diensten",
  },
} as const;

export const metadata: Metadata = {
  title: "Machinepark — uitrusting en capaciteit",
  description:
    "Het machinepark van StretchMetal in Częstochowa, Polen: fiberlaser, CNC-plooibank, MIG/MAG- en TIG-lasposten, CNC-bewerking en een eigen poedercoatlijn.",
  alternates: {
    canonical: nlCanonical(routes.machinePark.nl),
    languages: languageAlternates(routes.machinePark),
  },
  openGraph: {
    title: "Machinepark — uitrusting en capaciteit | StretchMetal",
    description:
      "De volledige machinelijst van de StretchMetal-werkplaats in Częstochowa. Snijden, plooien, lassen, CNC-bewerking en poedercoaten onder één dak.",
    url: nlCanonical(routes.machinePark.nl),
    images: defaultOgImages,
  },
};

export default function MachineParkPage() {
  return (
    <>
      <Nav content={nav} locale="nl" />

      <main id="main" className="bg-black text-white">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: nlCanonical(routes.home.nl) },
            {
              name: "Machinepark",
              url: nlCanonical(routes.machinePark.nl),
            },
          ])}
        />

        {/* Hero — display H1, honest lead */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Machines, geen <span className="text-red">beloften.</span>
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
                  href={routes.rfq.nl}
                  className="btn btn-primary btn-lg"
                >
                  {COPY.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button href={routes.services.nl} variant="ghost-light" size="lg">
                  {COPY.cta.secondary}
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>

      <Footer content={footer} locale="nl" />
      {/* Clearance for the mobile sticky bar (h-14, md:hidden) */}
      <div aria-hidden="true" className="h-14 md:hidden" />
      <MobileStickyCta content={stickyCta} locale="nl" />
    </>
  );
}
