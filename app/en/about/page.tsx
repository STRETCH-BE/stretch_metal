/**
 * About page — /en/about
 * File path: /app/en/about/page.tsx
 *
 * English mirror of /app/o-nas/page.tsx: identical section rhythm
 * (dark hero → timeline → story → team → values → sister brands → CTA),
 * copy from /content/en/about.ts. The page argues the site's central
 * trust point for a foreign buyer: this is a Belgian group's own
 * workshop with surplus capacity, not an anonymous job shop.
 *
 * Frame copy (CTA band, sister-brand labels, story image caption) has no
 * AboutContent field and lives in the FRAME const below.
 * Certification rule: no EN 1090 / ISO claims anywhere.
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
import { about } from "@/content/en/about";
import { nav, footer, stickyCta } from "@/content/en/ui";

/** Page-frame copy with no AboutContent field — kept minimal on purpose. */
const FRAME = {
  storyImageCaption: "The StretchMetal hall — welding bay and assembly area",
  group: {
    eyebrow: "Stretchgroup",
    title: "The group's brands",
    lead: "StretchMetal is the metal-fabrication unit of the Stretchgroup. The group's sister brands install stretch ceilings in Belgium and Poland — their site crews build with this workshop's parts.",
    links: [
      {
        name: siteConfig.group.belgium.name,
        description: "Stretch ceilings — Belgium",
        url: siteConfig.group.belgium.url,
      },
      {
        name: siteConfig.group.poland.name,
        description: "Stretch ceilings — Poland",
        url: siteConfig.group.poland.url,
      },
    ],
  },
  cta: {
    title: "Now it builds for you.",
    accent: "you.",
    lead: "Send a technical drawing — we answer with a quote within 48 hours, in English, Dutch or Polish.",
    primary: "Send your drawing",
    secondary: "Contact us",
  },
} as const;

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
  alternates: {
    canonical: routes.about.en,
    languages: languageAlternates(routes.about),
  },
  openGraph: {
    title: `${about.metaTitle} | ${siteConfig.name}`,
    description: about.metaDescription,
    url: routes.about.en,
    images: defaultOgImages,
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav content={nav} locale="en" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
            { name: "About us", url: `${siteConfig.url}${routes.about.en}` },
          ])}
        />

        {/* Hero — black, display H1 with the single red accent */}
        <section className="section section-dark">
          <Container>
            <FadeIn className="max-w-[1100px]">
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
                  src="/images/about/welding-detail.jpg"
                  alt="Welding head over a fixture table — detail from the StretchMetal workshop"
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
                  href={routes.rfq.en}
                  className="btn btn-primary btn-lg"
                >
                  {FRAME.cta.primary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>
                <Button href={routes.contact.en} variant="ghost-light" size="lg">
                  {FRAME.cta.secondary}
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
