/**
 * Services hub — Dutch, `/nl/diensten`.
 * File path: /app/nl/diensten/page.tsx
 *
 * Mirror of /app/en/services/page.tsx with /content/nl/* data: dark intro
 * hero → full six-card ServicesGrid (showAll) → Process strip → CtaFinal
 * band, inside the Nav/Footer/MobileStickyCta chrome.
 *
 * HUB_COPY: no content file is allocated to the hub, so the hero headline +
 * lead below are the locale literals this page owns. The NL grid header
 * from /content/nl/home.ts is "Zes diensten. Eén werkplaats." — the hero
 * deliberately uses the other axis ("Van tekening tot gecoat stuk.") so the
 * two never repeat. No [CONFIRM] figures in either.
 *
 * Canonical: absolute stretchmetal.be URL via nlCanonical() — the /nl tree
 * is served on both hosts but canonical on .be.
 *
 * Schema: BreadcrumbList (Startpagina → Diensten), .be absolute URLs.
 * Service + FAQPage schema live on the six detail pages, not here.
 */

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { defaultOgImages, siteConfig } from "@/lib/site-config";
import { languageAlternates, nlCanonical, routes } from "@/lib/i18n-routes";

import { home } from "@/content/nl/home";
import { footer, nav, stickyCta } from "@/content/nl/ui";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeIn } from "@/components/ui/fade-in";
import { Nav } from "@/components/sections/nav";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { CtaFinal } from "@/components/sections/cta-final";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";

const DESCRIPTION =
  "Lassen, lasersnijden, CNC-bewerking, poedercoaten, engineering en staalconstructies — één werkplaats van een Belgische groep in Polen. Offerte in EUR.";

export const metadata: Metadata = {
  title: "Metaalbewerking op maat in Polen",
  description: DESCRIPTION,
  alternates: {
    canonical: nlCanonical(routes.services.nl),
    languages: languageAlternates(routes.services),
  },
  openGraph: {
    title: `Metaalbewerking op maat in Polen | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: nlCanonical(routes.services.nl),
    siteName: siteConfig.name,
    locale: "nl_BE",
    type: "website",
    images: defaultOgImages,
  },
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          {
            name: "Startpagina",
            url: `${siteConfig.urlBe}${routes.home.nl}`,
          },
          {
            name: "Diensten",
            url: `${siteConfig.urlBe}${routes.services.nl}`,
          },
        ])}
      />

      <div className="pb-14 md:pb-0">
        <Nav content={nav} locale="nl" />

        <main id="main">
          {/* ── Hero — dark intro ─────────────────────────────── */}
          <section className="section section-dark">
            <Container>
              <FadeIn>
                <Eyebrow number="01">Diensten</Eyebrow>
              </FadeIn>
              <FadeIn delay={80}>
                <h1 className="h1 mt-2 max-w-[1100px]">
                  Van tekening tot <span className="text-red">gecoat</span>{" "}
                  stuk.
                </h1>
              </FadeIn>
              <FadeIn delay={160}>
                <p className="lead mt-7 max-w-[640px]">
                  Snijden, lassen, verspanen en kleur in één werkplaats in
                  Częstochowa. Kies een dienst — of stuur uw tekening meteen
                  door.
                </p>
              </FadeIn>
            </Container>
          </section>

          <ServicesGrid content={home.services} locale="nl" showAll number="02" />
          <Process content={home.process} locale="nl" tone="surface" number="03" />
          <CtaFinal content={home.ctaFinal} locale="nl" />
        </main>

        <Footer content={footer} locale="nl" />
      </div>

      <MobileStickyCta content={stickyCta} locale="nl" />
    </>
  );
}
