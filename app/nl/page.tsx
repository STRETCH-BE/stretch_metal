/**
 * Homepage — Dutch, `/nl`.
 * File path: /app/nl/page.tsx
 *
 * Mirror of /app/page.tsx with /content/nl/* data and locale "nl" — same
 * section order, same chrome, no copy in this file. Written for the
 * Flemish/Belgian purchasing manager the NL tree targets — the group's
 * HOME market.
 *
 * Metadata: `title.absolute` with the NL tagline (the PL default would
 * leak otherwise); canonical is the ABSOLUTE stretchmetal.be URL via
 * nlCanonical() — the /nl tree is served on both hosts but canonical on
 * .be, so it must not rely on metadataBase (.pl); description ≤155 chars.
 *
 * Schema: LocalBusiness (home + contact only). Organization + WebSite
 * come from the root layout; the /nl layout corrects the lang signal.
 */

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { buildLocalBusiness } from "@/lib/schema";
import { defaultOgImages, siteConfig } from "@/lib/site-config";
import { languageAlternates, nlCanonical, routes } from "@/lib/i18n-routes";

import { home } from "@/content/nl/home";
import { projects } from "@/content/nl/projects";
import { footer, nav, stickyCta } from "@/content/nl/ui";

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
  "MIG/MAG- en TIG-lassen, lasersnijden, CNC-bewerking en poedercoaten in Częstochowa. Belgische groep, Nederlandstalig contact, levering in 1–2 dagen.";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.taglineNl}` },
  description: DESCRIPTION,
  alternates: {
    canonical: nlCanonical(routes.home.nl),
    languages: languageAlternates(routes.home),
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.taglineNl}`,
    description: DESCRIPTION,
    url: nlCanonical(routes.home.nl),
    siteName: siteConfig.name,
    locale: "nl_BE",
    type: "website",
    images: defaultOgImages,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusiness()} />

      <div className="pb-14 md:pb-0">
        <Nav content={nav} locale="nl" />

        <main id="main">
          <Hero content={home.hero} locale="nl" />
          <Ticker items={home.ticker} />
          <Stats content={home.stats} number="01" />
          <ServicesGrid content={home.services} locale="nl" number="02" />
          <Process content={home.process} locale="nl" tone="surface" number="03" />
          <MachineParkTeaser content={home.machinePark} locale="nl" number="04" />
          <WhyUs content={home.whyUs} number="05" />
          <Heritage content={home.heritage} number="06" />
          <ProjectsGrid
            content={home.projects}
            projects={projects}
            locale="nl"
            limit={3}
            number="07"
          />
          <CtaFinal content={home.ctaFinal} locale="nl" />
        </main>

        <Footer content={footer} locale="nl" />
      </div>

      <MobileStickyCta content={stickyCta} locale="nl" />
    </>
  );
}
