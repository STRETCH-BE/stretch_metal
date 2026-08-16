/**
 * Projects page — /realizacje
 * File path: /app/realizacje/page.tsx
 *
 * Full listing of every entry in /content/projects.ts — the home page
 * shows a trimmed teaser via <ProjectsGrid limit>, this page renders a
 * richer page-level grid: WorkshopImage placeholder, title, MetaChips
 * (services / material / finish), description.
 *
 * Honesty contract: the entries are REPRESENTATIVE SAMPLES of the
 * workshop's actual work types, pending documented case studies with
 * photos. The visible note („Przykładowe wpisy — wkrótce pełne
 * realizacje.") is required page furniture, not decoration — the content
 * file carries the [CONFIRM] flags on every number.
 *
 * Page-frame copy (hero, note, CTA) lives in the COPY const below — the
 * EN mirror (/app/en/projects/page.tsx) has the same structure.
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
import { projects } from "@/content/projects";
import { nav, footer, stickyCta } from "@/content/ui";

const COPY = {
  hero: {
    eyebrow: "Realizacje",
    lead: "To, co schodzi z naszej hali: podkonstrukcje i kanały świetlne dla ekip Stretchgroup oraz elementy na zamówienie dla klientów zewnętrznych. Każdy wpis to typ pracy, który wykonujemy seryjnie.",
    /* Required honesty note — entries in /content/projects.ts are
       representative samples until real case studies with photos exist. */
    note: "Przykładowe wpisy — wkrótce pełne realizacje. Opisy pokazują typy prac z naszej produkcji; dokumentowane studia przypadków ze zdjęciami dodamy po zgodzie klientów.",
  },
  cta: {
    title: "Twój projekt może być następny.",
    accent: "następny.",
    lead: "Wyślij rysunek techniczny — DXF, DWG, STEP albo PDF. W 48 godzin dostaniesz konkretną cenę i termin.",
    primary: "Wyślij rysunek",
    secondary: "Zobacz park maszynowy",
  },
} as const;

export const metadata: Metadata = {
  title: "Realizacje — przykłady naszej produkcji",
  description:
    "Przykładowe realizacje StretchMetal: podkonstrukcje sufitowe, kanały świetlne, wsporniki, ramy LED i antresole. Od rysunku do malowanego elementu.",
  alternates: {
    canonical: routes.projects.pl,
    languages: languageAlternates(routes.projects),
  },
  openGraph: {
    title: "Realizacje — przykłady naszej produkcji | StretchMetal",
    description:
      "Typy prac z hali StretchMetal w Częstochowie: konstrukcje spawane, elementy cięte laserem, obróbka CNC i malowanie proszkowe.",
    url: routes.projects.pl,
    images: defaultOgImages,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Nav content={nav} locale="pl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Strona główna", url: `${siteConfig.url}${routes.home.pl}` },
            { name: "Realizacje", url: `${siteConfig.url}${routes.projects.pl}` },
          ])}
        />

        {/* Hero — black, with the visible sample-entries note */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Stal, która <span className="text-red">pracuje.</span>
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
                  href={routes.rfq.pl}
                  className="btn btn-primary btn-lg"
                >
                  {COPY.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button
                  href={routes.machinePark.pl}
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

      <Footer content={footer} locale="pl" />
      {/* Clearance for the mobile sticky bar (h-14, md:hidden) */}
      <div aria-hidden="true" className="h-14 md:hidden" />
      <MobileStickyCta content={stickyCta} locale="pl" />
    </>
  );
}
