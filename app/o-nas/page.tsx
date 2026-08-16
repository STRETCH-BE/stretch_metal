/**
 * About page — /o-nas
 * File path: /app/o-nas/page.tsx
 *
 * The founding-story page: the workshop existed BEFORE it had external
 * customers — the Belgian group built it for its own ceiling production.
 * All copy from /content/about.ts (AboutContent); the page only frames it.
 *
 * Section rhythm (site skews dark): hero on black → timeline on white
 * (vertical hairline, red year markers) → story on surface with a
 * WorkshopImage → team on black (placeholder image + lead) → values as a
 * light .grid-lines quartet → sister-brand band (heritage-style links from
 * siteConfig.group) → CTA band → RFQ.
 *
 * The CTA band and sister-brand labels have no AboutContent fields, so
 * they live in the small FRAME const below — the only page-local copy.
 * Certification rule: nothing here (or in the content) claims EN 1090 /
 * ISO — quality is only ever "verified by the group's own teams".
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
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
import { about } from "@/content/about";
import { nav, footer, stickyCta } from "@/content/ui";

/** Page-frame copy with no AboutContent field — kept minimal on purpose. */
const FRAME = {
  storyImageCaption: "ZDJĘCIE: hala StretchMetal — spawalnia i strefa montażu",
  group: {
    eyebrow: "Stretchgroup",
    title: "Marki grupy",
    lead: "StretchMetal jest jednostką produkcji metalowej Stretchgroup. Siostrzane marki grupy wykonują sufity napinane w Belgii i w Polsce — to ich ekipy montażowe odbierają nasze elementy.",
    links: [
      {
        name: siteConfig.group.belgium.name,
        description: "Sufity napinane — Belgia",
        url: siteConfig.group.belgium.url,
      },
      {
        name: siteConfig.group.poland.name,
        description: "Sufity napinane — Polska",
        url: siteConfig.group.poland.url,
      },
    ],
  },
  cta: {
    title: "Teraz produkuje dla Ciebie.",
    accent: "Ciebie.",
    lead: "Wyślij rysunek techniczny — odpowiadamy wyceną w 48 godzin, po polsku, angielsku lub niderlandzku.",
    primary: "Wyślij rysunek",
    secondary: "Skontaktuj się",
  },
} as const;

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
  alternates: {
    canonical: routes.about.pl,
    languages: languageAlternates(routes.about),
  },
  openGraph: {
    title: `${about.metaTitle} | ${siteConfig.name}`,
    description: about.metaDescription,
    url: routes.about.pl,
    images: defaultOgImages,
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav content={nav} locale="pl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Strona główna", url: `${siteConfig.url}${routes.home.pl}` },
            { name: "O nas", url: `${siteConfig.url}${routes.about.pl}` },
          ])}
        />

        {/* Hero — black, display H1 with the single red accent */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{about.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                {about.hero.accent ? (
                  <>
                    {about.hero.title.slice(
                      0,
                      about.hero.title.indexOf(about.hero.accent)
                    )}
                    <span className="text-red">{about.hero.accent}</span>
                    {about.hero.title.slice(
                      about.hero.title.indexOf(about.hero.accent) +
                        about.hero.accent.length
                    )}
                  </>
                ) : (
                  about.hero.title
                )}
              </SectionTitle>
              <p className="lead mt-8 max-w-[640px]">{about.hero.lead}</p>
            </FadeIn>
          </Container>
        </section>

        {/* Timeline — vertical hairline, red year markers */}
        <section className="section">
          <Container>
            <FadeIn className="max-w-[820px]">
              <Eyebrow number="02">{about.timeline.eyebrow}</Eyebrow>
              <SectionTitle>{about.timeline.title}</SectionTitle>
            </FadeIn>

            <ol className="mt-14 max-w-[760px] space-y-12 border-l-2 border-border-2 pl-8 md:pl-10">
              {about.timeline.entries.map((entry, i) => (
                <FadeIn key={entry.year} as="li" delay={i * 90} className="relative">
                  {/* Red square marker centred on the hairline */}
                  <span
                    aria-hidden="true"
                    className="tick absolute -left-[38px] top-[7px] md:-left-[46px]"
                  />
                  <span className="block text-[15px] font-bold tracking-[0.08em] text-red">
                    {entry.year}
                  </span>
                  <h3 className="h3 mt-2">{entry.title}</h3>
                  <p className="mt-2.5 max-w-[560px] text-[15px] leading-relaxed text-text-muted">
                    {entry.description}
                  </p>
                </FadeIn>
              ))}
            </ol>
          </Container>
        </section>

        {/* Story — paragraphs + workshop image */}
        <section className="section section-surface">
          <Container>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <FadeIn>
                <Eyebrow number="03">{about.story.eyebrow}</Eyebrow>
                <SectionTitle size="section-sm">{about.story.title}</SectionTitle>
                <div className="mt-8 space-y-5">
                  {about.story.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="max-w-[560px] text-[15.5px] leading-relaxed text-text-body"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={120}>
                <WorkshopImage
                  caption={FRAME.storyImageCaption}
                  aspect="aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Team — black band, placeholder photo + lead */}
        <section className="section section-dark">
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <FadeIn>
                <WorkshopImage
                  caption={about.team.imageCaption}
                  aspect="aspect-[3/2]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </FadeIn>
              <FadeIn delay={120}>
                <Eyebrow number="04">{about.team.eyebrow}</Eyebrow>
                <SectionTitle size="section-sm">{about.team.title}</SectionTitle>
                <p className="lead mt-6 max-w-[520px]">{about.team.lead}</p>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Values — light hairline quartet */}
        <section className="section">
          <Container>
            <FadeIn className="max-w-[820px]">
              <Eyebrow number="05">{about.values.eyebrow}</Eyebrow>
              <SectionTitle>{about.values.title}</SectionTitle>
            </FadeIn>

            <ul className="grid-lines mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.items.map((item, i) => (
                <FadeIn
                  key={item.title}
                  as="li"
                  delay={i * 80}
                  className="flex flex-col bg-white p-7"
                >
                  <span aria-hidden="true" className="tick" />
                  <h3 className="mt-5 text-[16px] font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </FadeIn>
              ))}
            </ul>
          </Container>
        </section>

        {/* Sister brands — heritage-style external links */}
        <section className="section-sm section-surface">
          <Container>
            <FadeIn className="max-w-[820px]">
              <Eyebrow number="06">{FRAME.group.eyebrow}</Eyebrow>
              <SectionTitle size="section-sm">{FRAME.group.title}</SectionTitle>
              <p className="lead mt-6 max-w-[560px]">{FRAME.group.lead}</p>
            </FadeIn>

            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-[760px]">
              {FRAME.group.links.map((brand, i) => (
                <FadeIn key={brand.url} as="li" delay={i * 90}>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col border-2 border-black bg-white p-6 transition-colors hover:bg-black hover:text-white"
                  >
                    <span className="flex items-center justify-between gap-4 text-[17px] font-bold uppercase tracking-[0.04em]">
                      {brand.name}
                      <span aria-hidden="true" className="text-red">
                        ↗
                      </span>
                    </span>
                    <span className="mt-2 text-[13.5px] text-text-muted transition-colors group-hover:text-on-dark-soft">
                      {brand.description}
                    </span>
                  </a>
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
                {FRAME.cta.title.slice(0, FRAME.cta.title.indexOf(FRAME.cta.accent))}
                <span className="text-red">{FRAME.cta.accent}</span>
                {FRAME.cta.title.slice(
                  FRAME.cta.title.indexOf(FRAME.cta.accent) +
                    FRAME.cta.accent.length
                )}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="lead mt-8 max-w-[560px]">{FRAME.cta.lead}</p>
            </FadeIn>
            <FadeIn delay={180}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <TrackedCTA
                  event="cta_click"
                  props={{ location: "about", label: FRAME.cta.primary }}
                  href={routes.rfq.pl}
                  className="btn btn-primary btn-lg"
                >
                  {FRAME.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button href={routes.contact.pl} variant="ghost-light" size="lg">
                  {FRAME.cta.secondary}
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
