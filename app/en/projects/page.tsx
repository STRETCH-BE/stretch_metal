/**
 * Projects page — /en/projects
 * File path: /app/en/projects/page.tsx
 *
 * English mirror of /app/realizacje/page.tsx: dark hero with the visible
 * sample-entries note, full grid of every entry in
 * /content/en/projects.ts (WorkshopImage placeholder, MetaChips for
 * services / material / finish, description), CTA band → RFQ.
 *
 * Honesty contract: entries are representative samples of real work
 * types pending documented case studies — the visible note is required
 * page furniture. Numbers carry [CONFIRM] in the content file.
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
import { routes, languageAlternates } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { projects } from "@/content/en/projects";
import { nav, footer, stickyCta } from "@/content/en/ui";

const COPY = {
  hero: {
    eyebrow: "Projects",
    lead: "What leaves our hall: substructures and light channels for the Stretchgroup's own crews, and made-to-drawing parts for external clients. Each entry below is a work type we run in series.",
    /* Required honesty note — entries in /content/en/projects.ts are
       representative samples until real case studies with photos exist. */
    note: "Sample entries — full case studies coming soon. The descriptions show work types from our production; documented references with photos will follow once clients sign off.",
  },
  cta: {
    title: "Your project could be next.",
    accent: "next.",
    lead: "Send a technical drawing — DXF, DWG, STEP or PDF. Within 48 hours you get a concrete price and date.",
    primary: "Send your drawing",
    secondary: "See the machine park",
  },
} as const;

export const metadata: Metadata = {
  title: "Projects — Sample Fabrication Work",
  description:
    "Sample StretchMetal projects: ceiling substructures, light channels, brackets, LED carriers and a mezzanine platform. From drawing to coated part.",
  alternates: {
    canonical: routes.projects.en,
    languages: languageAlternates(routes.projects),
  },
  openGraph: {
    title: "Projects — Sample Fabrication Work | StretchMetal",
    description:
      "Work types from the StretchMetal hall in Częstochowa, Poland: welded structures, laser-cut parts, CNC machining and powder coating.",
    url: routes.projects.en,
    images: defaultOgImages,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Nav content={nav} locale="en" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
            { name: "Projects", url: `${siteConfig.url}${routes.projects.en}` },
          ])}
        />

        {/* Hero — black, with the visible sample-entries note */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Steel that <span className="text-red">works.</span>
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
                  href={routes.rfq.en}
                  className="btn btn-primary btn-lg"
                >
                  {COPY.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button
                  href={routes.machinePark.en}
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

      <Footer content={footer} locale="en" />
      {/* Clearance for the mobile sticky bar (h-14, md:hidden) */}
      <div aria-hidden="true" className="h-14 md:hidden" />
      <MobileStickyCta content={stickyCta} locale="en" />
    </>
  );
}
