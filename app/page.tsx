/**
 * Homepage — Polish root locale, `/`.
 * File path: /app/page.tsx
 *
 * Composes the section components in the contract order: Hero → Ticker →
 * Stats → ServicesGrid → Process → MachineParkTeaser → WhyUs → Heritage →
 * ProjectsGrid (3-card teaser) → CtaFinal, inside the Nav/Footer/
 * MobileStickyCta chrome. All copy arrives from /content/home.ts,
 * /content/projects.ts and /content/ui.ts — this file carries none.
 *
 * Metadata: `title.absolute` (the sufit pattern) so the brand headline
 * carries no "| StretchMetal" suffix duplicating the name; canonical "/"
 * with hreflang alternates; page-level description kept ≤155 chars (the
 * siteConfig.description is layout/OG-tier and too long for a SERP).
 *
 * Schema: LocalBusiness here (home + contact only, per the SEO contract);
 * Organization + WebSite already render in the root layout.
 *
 * The pb-14 md:pb-0 wrapper keeps the footer clear of the fixed mobile
 * CTA bar (h-14) — MobileStickyCta is self-contained by contract and adds
 * no body padding itself.
 */

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { buildLocalBusiness } from "@/lib/schema";
import { defaultOgImages, siteConfig } from "@/lib/site-config";
import { languageAlternates, routes } from "@/lib/i18n-routes";

import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { footer, nav, stickyCta } from "@/content/ui";

import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Stats } from "@/components/sections/stats";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { MachineParkTeaser } from "@/components/sections/machine-park-teaser";
import { WhyUs } from "@/components/sections/why-us";
import { Heritage } from "@/components/sections/heritage";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CtaFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";

const DESCRIPTION =
  "Spawanie MIG/MAG i TIG, cięcie laserowe, obróbka CNC i malowanie proszkowe pod jednym dachem w Częstochowie. Wycena z rysunku, dostawy w całej UE.";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: DESCRIPTION,
  alternates: {
    canonical: routes.home.pl,
    languages: languageAlternates(routes.home),
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: DESCRIPTION,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "pl_PL",
    type: "website",
    images: defaultOgImages,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusiness()} />

      <div className="pb-14 md:pb-0">
        <Nav content={nav} locale="pl" />

        <main id="main">
          <Hero content={home.hero} locale="pl" />
          <Ticker items={home.ticker} />
          <Stats content={home.stats} number="01" />
          <ServicesGrid content={home.services} locale="pl" number="02" />
          <Process content={home.process} locale="pl" tone="surface" number="03" />
          <MachineParkTeaser content={home.machinePark} locale="pl" number="04" />
          <WhyUs content={home.whyUs} number="05" />
          <Heritage content={home.heritage} number="06" />
          <ProjectsGrid
            content={home.projects}
            projects={projects}
            locale="pl"
            limit={3}
            number="07"
          />
          <CtaFinal content={home.ctaFinal} locale="pl" />
        </main>

        <Footer content={footer} locale="pl" />
      </div>

      <MobileStickyCta content={stickyCta} locale="pl" />
    </>
  );
}
