/**
 * Homepage — English, `/en`.
 * File path: /app/en/page.tsx
 *
 * Mirror of /app/page.tsx with /content/en/* data and locale "en" — same
 * section order, same chrome, no copy in this file. Written for the
 * German/Benelux purchasing manager the EN tree targets.
 *
 * Metadata: `title.absolute` with the EN tagline (the PL default would
 * leak otherwise); canonical /en with hreflang alternates back to the
 * Polish root; description ≤155 chars.
 *
 * Schema: LocalBusiness (home + contact only). Organization + WebSite
 * come from the root layout; the /en layout corrects the lang signal.
 */

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { buildLocalBusiness } from "@/lib/schema";
import { defaultOgImages, siteConfig } from "@/lib/site-config";
import { languageAlternates, routes } from "@/lib/i18n-routes";

import { home } from "@/content/en/home";
import { projects } from "@/content/en/projects";
import { footer, nav, stickyCta } from "@/content/en/ui";

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
  "MIG/MAG and TIG welding, laser cutting, CNC machining and powder coating in Częstochowa, Poland. Quotes from your drawing, EU-wide delivery.";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.taglineEn}` },
  description: DESCRIPTION,
  alternates: {
    canonical: routes.home.en,
    languages: languageAlternates(routes.home),
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.taglineEn}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}${routes.home.en}`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: defaultOgImages,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLocalBusiness()} />

      <div className="pb-14 md:pb-0">
        <Nav content={nav} locale="en" />

        <main id="main">
          <Hero content={home.hero} locale="en" />
          <Ticker items={home.ticker} />
          <Stats content={home.stats} number="01" />
          <ServicesGrid content={home.services} locale="en" number="02" />
          <Process content={home.process} locale="en" tone="surface" number="03" />
          <MachineParkTeaser content={home.machinePark} locale="en" number="04" />
          <WhyUs content={home.whyUs} number="05" />
          <Heritage content={home.heritage} number="06" />
          <ProjectsGrid
            content={home.projects}
            projects={projects}
            locale="en"
            limit={3}
            number="07"
          />
          <CtaFinal content={home.ctaFinal} locale="en" />
        </main>

        <Footer content={footer} locale="en" />
      </div>

      <MobileStickyCta content={stickyCta} locale="en" />
    </>
  );
}
