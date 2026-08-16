/**
 * Services hub — English, `/en/services`.
 * File path: /app/en/services/page.tsx
 *
 * Mirror of /app/uslugi/page.tsx with /content/en/* data: dark intro hero →
 * full six-card ServicesGrid (showAll) → Process strip → CtaFinal band,
 * inside the Nav/Footer/MobileStickyCta chrome.
 *
 * HUB_COPY: no content file is allocated to the hub, so the hero headline +
 * lead below are the locale literals this page owns. The EN grid header
 * from /content/en/home.ts is "From drawing to finished part" — the hero
 * deliberately uses the other axis ("Six services. One workshop.") so the
 * two never repeat. No [CONFIRM] figures in either.
 *
 * Schema: BreadcrumbList (Home → Services). Service + FAQPage schema live
 * on the six detail pages, not here.
 */

import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { defaultOgImages, siteConfig } from "@/lib/site-config";
import { languageAlternates, routes } from "@/lib/i18n-routes";

import { home } from "@/content/en/home";
import { footer, nav, stickyCta } from "@/content/en/ui";

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
  "Welding, laser cutting, CNC machining, powder coating, engineering and steel structures — one workshop in Częstochowa, Poland. EU-wide delivery.";

export const metadata: Metadata = {
  title: "Metal Fabrication Services in Poland",
  description: DESCRIPTION,
  alternates: {
    canonical: routes.services.en,
    languages: languageAlternates(routes.services),
  },
  openGraph: {
    title: `Metal Fabrication Services in Poland | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}${routes.services.en}`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: defaultOgImages,
  },
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
          { name: "Services", url: `${siteConfig.url}${routes.services.en}` },
        ])}
      />

      <div className="pb-14 md:pb-0">
        <Nav content={nav} locale="en" />

        <main id="main">
          {/* ── Hero — dark intro ─────────────────────────────── */}
          <section className="section section-dark">
            <Container>
              <FadeIn>
                <Eyebrow number="01">Services</Eyebrow>
              </FadeIn>
              <FadeIn delay={80}>
                <h1 className="h1 mt-2 max-w-[1100px]">
                  Six services. <span className="text-red">One</span> workshop.
                </h1>
              </FadeIn>
              <FadeIn delay={160}>
                <p className="lead mt-7 max-w-[640px]">
                  Cutting, welding, machining and coating in one workshop in
                  Częstochowa. Pick a service — or send your drawing straight
                  away.
                </p>
              </FadeIn>
            </Container>
          </section>

          <ServicesGrid content={home.services} locale="en" showAll number="02" />
          <Process content={home.process} locale="en" tone="surface" number="03" />
          <CtaFinal content={home.ctaFinal} locale="en" />
        </main>

        <Footer content={footer} locale="en" />
      </div>

      <MobileStickyCta content={stickyCta} locale="en" />
    </>
  );
}
