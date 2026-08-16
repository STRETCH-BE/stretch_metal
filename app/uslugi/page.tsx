/**
 * Services hub — Polish, `/uslugi`.
 * File path: /app/uslugi/page.tsx
 *
 * Dark intro hero → the full six-card ServicesGrid (showAll suppresses the
 * self-referencing hub CTA) → Process strip (surface) → CtaFinal band,
 * inside the Nav/Footer/MobileStickyCta chrome.
 *
 * HUB_COPY: the contract allocates no content file to the hub, so the hero
 * headline + lead below are the locale literals this page owns — written to
 * complement (not repeat) the grid's own header from /content/home.ts.
 * They carry no [CONFIRM] figures.
 *
 * Schema: BreadcrumbList (Strona główna → Usługi). Service + FAQPage
 * schema live on the six detail pages, not here.
 */

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { defaultOgImages, siteConfig } from "@/lib/site-config";
import { languageAlternates, routes } from "@/lib/i18n-routes";

import { home } from "@/content/home";
import { footer, nav, stickyCta } from "@/content/ui";

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
  "Sześć usług pod jednym dachem: spawanie, cięcie laserowe, obróbka CNC, malowanie proszkowe, projektowanie i konstrukcje stalowe. Wycena z rysunku.";

export const metadata: Metadata = {
  title: "Usługi obróbki metali",
  description: DESCRIPTION,
  alternates: {
    canonical: routes.services.pl,
    languages: languageAlternates(routes.services),
  },
  openGraph: {
    title: `Usługi obróbki metali | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}${routes.services.pl}`,
    siteName: siteConfig.name,
    locale: "pl_PL",
    type: "website",
    images: defaultOgImages,
  },
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Strona główna", url: siteConfig.url },
          { name: "Usługi", url: `${siteConfig.url}${routes.services.pl}` },
        ])}
      />

      <div className="pb-14 md:pb-0">
        <Nav content={nav} locale="pl" />

        <main id="main">
          {/* ── Hero — dark intro ─────────────────────────────── */}
          <section className="section section-dark">
            <Container>
              <FadeIn>
                <Eyebrow number="01">Usługi</Eyebrow>
              </FadeIn>
              <FadeIn delay={80}>
                <h1 className="h1 mt-2 max-w-[1100px]">
                  Od rysunku do <span className="text-red">gotowego</span>{" "}
                  elementu.
                </h1>
              </FadeIn>
              <FadeIn delay={160}>
                <p className="lead mt-7 max-w-[640px]">
                  Cięcie, spawanie, obróbka i kolor w jednym warsztacie w
                  Częstochowie. Wybierz usługę albo od razu wyślij rysunek do
                  wyceny.
                </p>
              </FadeIn>
            </Container>
          </section>

          <ServicesGrid content={home.services} locale="pl" showAll number="02" />
          <Process content={home.process} locale="pl" tone="surface" number="03" />
          <CtaFinal content={home.ctaFinal} locale="pl" />
        </main>

        <Footer content={footer} locale="pl" />
      </div>

      <MobileStickyCta content={stickyCta} locale="pl" />
    </>
  );
}
