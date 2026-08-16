/**
 * Machine park page — /park-maszynowy
 * File path: /app/park-maszynowy/page.tsx
 *
 * The DARK technical page: every section on black, machines as
 * .grid-lines-dark cells (bg-black so the hairlines show through), the
 * full inventory from /content/machines.ts plus the workshopFacts strip.
 *
 * Honesty contract: every machine spec is a [CONFIRM] placeholder in the
 * content file, so the visible copy commits to nothing — the specs note
 * („Specyfikacje potwierdzamy przy wycenie.") is REQUIRED page furniture,
 * not decoration. No certifications are claimed anywhere.
 *
 * Page-level copy lives in the COPY const below: the machine data itself
 * is content, but the page frame (hero, notes, CTA band) has no content
 * type — the EN mirror (/app/en/machine-park/page.tsx) carries the same
 * structure with its own const.
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
import { machines, workshopFacts } from "@/content/machines";
import { nav, footer, stickyCta } from "@/content/ui";

const COPY = {
  hero: {
    eyebrow: "Park maszynowy",
    lead: "Ten park maszynowy zbudowaliśmy dla własnej produkcji — ram, kanałów świetlnych i podkonstrukcji dla Stretchgroup. Ma więcej mocy, niż zużywa grupa, więc pracuje też dla klientów zewnętrznych. Poniżej pełna lista stanowisk.",
  },
  machines: {
    eyebrow: "Wyposażenie",
    title: "Pełna lista stanowisk",
    /* Required honesty note — machine specs in /content/machines.ts are
       [CONFIRM] placeholders until the owner's walk-through of the hall. */
    note: "Specyfikacje potwierdzamy przy wycenie. Zakresy i parametry poniżej opisują klasę maszyn — wiążące wartości dla Twojego detalu podajemy w ofercie.",
  },
  facts: {
    eyebrow: "Warsztat w liczbach",
  },
  cta: {
    title: "Sprawdź te maszyny na własnym detalu.",
    accent: "własnym",
    lead: "Wyślij rysunek — DXF, DWG, STEP albo PDF. W 48 godzin odpowiadamy konkretną ceną i terminem.",
    primary: "Wyślij rysunek",
    secondary: "Zobacz usługi",
  },
} as const;

export const metadata: Metadata = {
  title: "Park maszynowy — maszyny i stanowiska",
  description:
    "Park maszynowy StretchMetal w Częstochowie: wycinarka laserowa fiber, prasa krawędziowa CNC, spawalnia MIG/MAG i TIG, obróbka CNC, malarnia proszkowa.",
  alternates: {
    canonical: routes.machinePark.pl,
    languages: languageAlternates(routes.machinePark),
  },
  openGraph: {
    title: "Park maszynowy — maszyny i stanowiska | StretchMetal",
    description:
      "Pełna lista maszyn i stanowisk warsztatu StretchMetal w Częstochowie. Cięcie, gięcie, spawanie, obróbka CNC i malowanie proszkowe pod jednym dachem.",
    url: routes.machinePark.pl,
    images: defaultOgImages,
  },
};

export default function MachineParkPage() {
  return (
    <>
      <Nav content={nav} locale="pl" />

      <main id="main" className="bg-black text-white">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Strona główna", url: `${siteConfig.url}${routes.home.pl}` },
            {
              name: "Park maszynowy",
              url: `${siteConfig.url}${routes.machinePark.pl}`,
            },
          ])}
        />

        {/* Hero — display H1, honest lead */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Maszyny, nie <span className="text-red">obietnice.</span>
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

            <ul className="grid-lines grid-lines-dark mt-8 grid-cols-2 lg:grid-cols-5">
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
                  href={routes.rfq.pl}
                  className="btn btn-primary btn-lg"
                >
                  {COPY.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button href={routes.services.pl} variant="ghost-light" size="lg">
                  {COPY.cta.secondary}
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>

      <Footer content={footer} locale="pl" />
      {/* Clearance for the mobile sticky bar (h-14, md:hidden) */}
      <div aria-hidden="true" className="h-14 md:hidden" />
      <MobileStickyCta content={stickyCta} locale="pl" />
    </>
  );
}
