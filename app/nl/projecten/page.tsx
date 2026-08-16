/**
 * Projects page — /nl/projecten
 * File path: /app/nl/projecten/page.tsx
 *
 * Dutch (nl-BE) mirror of /app/en/projects/page.tsx: dark hero with the
 * visible sample-entries note, full grid of every entry in
 * /content/nl/projects.ts (WorkshopImage placeholder, MetaChips for
 * services / material / finish, description), CTA band → RFQ.
 *
 * Canonical host is stretchmetal.be: canonical via nlCanonical(),
 * breadcrumbs and og:url absolute on the .be domain.
 *
 * Honesty contract: entries are representative samples of real work
 * types pending documented case studies — the visible note
 * ("Voorbeelditems — volledige realisaties volgen.") is required page
 * furniture. Numbers carry [CONFIRM] in the content file.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { MetaChip } from "@/components/ui/meta-chip";
import { FadeIn } from "@/components/ui/fade-in";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { Button } from "@/components/ui/button";
import { WorkshopImage } from "@/components/ui/workshop-image";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { routes, languageAlternates, nlCanonical } from "@/lib/i18n-routes";
import { defaultOgImages } from "@/lib/site-config";
import { projects } from "@/content/nl/projects";
import { nav, footer, stickyCta } from "@/content/nl/ui";

const COPY = {
  hero: {
    eyebrow: "Projecten",
    lead: "Wat onze hal verlaat: onderconstructies en lichtkanalen voor de eigen teams van de Stretchgroup, en stukken op tekening voor externe klanten. Elk item hieronder is een werktype dat wij in serie draaien.",
    /* Required honesty note — entries in /content/nl/projects.ts are
       representative samples until real case studies with photos exist. */
    note: "Voorbeelditems — volledige realisaties volgen. De beschrijvingen tonen werktypes uit onze productie; gedocumenteerde referenties met foto's volgen zodra klanten hun akkoord geven.",
  },
  cta: {
    title: "Het volgende project kan het uwe zijn.",
    accent: "uwe zijn.",
    lead: "Stuur een technische tekening — DXF, DWG, STEP of PDF. Binnen 48 uur ontvangt u een concrete prijs en datum.",
    primary: "Stuur uw tekening",
    secondary: "Bekijk het machinepark",
  },
} as const;

export const metadata: Metadata = {
  title: "Projecten — voorbeelden van ons werk",
  description:
    "Voorbeeldprojecten van StretchMetal: plafond-onderconstructies, lichtkanalen, machinesteunen, ledframes en een mezzanine. Van tekening tot gecoat stuk.",
  alternates: {
    canonical: nlCanonical(routes.projects.nl),
    languages: languageAlternates(routes.projects),
  },
  openGraph: {
    title: "Projecten — voorbeelden van ons werk | StretchMetal",
    description:
      "Werktypes uit de StretchMetal-hal in Częstochowa, Polen: gelaste constructies, lasersnijwerk, CNC-bewerking en poedercoating.",
    url: nlCanonical(routes.projects.nl),
    images: defaultOgImages,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Nav content={nav} locale="nl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: nlCanonical(routes.home.nl) },
            { name: "Projecten", url: nlCanonical(routes.projects.nl) },
          ])}
        />

        {/* Hero — black, with the visible sample-entries note */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Staal dat <span className="text-red">werkt.</span>
              </SectionTitle>
              <p className="lead mt-8 max-w-[640px]">{COPY.hero.lead}</p>
            </FadeIn>
            <FadeIn delay={140}>
              <p className="mt-8 flex max-w-[640px] items-start gap-3 border border-line-dark p-4 text-[13.5px] leading-relaxed text-on-dark-soft">
                <span aria-hidden="true" className="tick tick-sm mt-1.5" />
                <span>{COPY.hero.note}</span>
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* Full project grid — all entries, no limit */}
        <section className="section">
          <Container>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <FadeIn key={project.title} as="li" delay={(i % 3) * 90}>
                  <article className="flex h-full flex-col">
                    <WorkshopImage
                      caption={project.imageCaption}
                      src={project.image}
                      alt={project.title}
                      aspect="aspect-[3/2]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <h2 className="h3 mt-5">{project.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[...project.services, project.material, project.finish].map(
                        (tag) => (
                          <MetaChip key={tag} tone="light">
                            {tag}
                          </MetaChip>
                        )
                      )}
                    </div>
                    <p className="mt-3.5 text-sm leading-relaxed text-text-muted">
                      {project.description}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </ul>
          </Container>
        </section>

        {/* CTA band → RFQ */}
        <section className="section section-dark">
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
                  props={{ location: "projects", label: COPY.cta.primary }}
                  href={routes.rfq.nl}
                  className="btn btn-primary btn-lg"
                >
                  {COPY.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button
                  href={routes.machinePark.nl}
                  variant="ghost-light"
                  size="lg"
                >
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
