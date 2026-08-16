/**
 * Contact page — /nl/contact
 * File path: /app/nl/contact/page.tsx
 *
 * Dutch (nl-BE) mirror of /app/en/contact/page.tsx: two-column layout —
 * left spells out every contact channel from siteConfig (address, phone
 * as TrackedCTA `phone_click`, email, hours, company data) with a static
 * map placeholder + Google Maps directions link; right renders the mini
 * contact form (locale "nl"). The RFQ funnel stays primary — copy points
 * anyone with a drawing at /nl/offerte.
 *
 * Canonical host is stretchmetal.be: canonical via nlCanonical(),
 * breadcrumbs and og:url absolute on the .be domain.
 *
 * JSON-LD: LocalBusiness + breadcrumbs. Unverified company data lines
 * carry [CONFIRM] — same flags as lib/site-config.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/ui/fade-in";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { WorkshopImage } from "@/components/ui/workshop-image";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs, buildLocalBusiness } from "@/lib/schema";
import { routes, languageAlternates, nlCanonical } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { nav, footer, stickyCta } from "@/content/nl/ui";

/** Directions target — built from siteConfig.geo, never hardcoded. */
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${siteConfig.contact.geo.lat},${siteConfig.contact.geo.lng}`;

const COPY = {
  hero: {
    eyebrow: "Contact",
    lead: "Hebt u een technische tekening? De snelste weg is het offerteformulier — uw aanvraag komt rechtstreeks bij een ingenieur terecht. Voor al het andere bereikt u ons hier: telefonisch, per e-mail of via het formulier. Gewoon in het Nederlands.",
  },
  address: {
    title: "Adres van de werkplaats",
    country: "Polen",
  },
  phone: { title: "Telefoon" },
  email: { title: "E-mail" },
  hours: {
    title: "Openingsuren",
    value: "ma–vr 08:00–16:00 (CET)", // [CONFIRM] openingsuren
  },
  company: {
    title: "Bedrijfsgegevens",
    // [CONFIRM] juridische entiteit — merk StretchMetal binnen de groepsstructuur
    legal: `${siteConfig.legalName} — eigenaar van het merk ${siteConfig.name}`,
    // [CONFIRM] BTW-nummer (NIP) — rij toevoegen zodra het nummer bevestigd is
  },
  map: {
    caption: "KAART: Częstochowa — ul. Legionów 59",
    directions: "Routebeschrijving in Google Maps",
  },
  form: {
    eyebrow: "Schrijf ons",
    title: "Kort bericht",
    lead: "Voor algemene vragen. Wilt u een offerte voor een concreet stuk, gebruik dan het offerteformulier — daar voegt u DXF-, DWG-, STEP- of PDF-bestanden toe.",
    rfqLink: "Ga naar het offerteformulier",
  },
} as const;

export const metadata: Metadata = {
  title: "Contact — werkplaats in Częstochowa, Polen",
  description:
    "Contact met StretchMetal: ul. Legionów 59, 42-200 Częstochowa, Polen. Telefoon, e-mail en contactformulier — in het Nederlands. Offerte binnen 48 uur.",
  alternates: {
    canonical: nlCanonical(routes.contact.nl),
    languages: languageAlternates(routes.contact),
  },
  openGraph: {
    title: "Contact — werkplaats in Częstochowa, Polen | StretchMetal",
    description:
      "Telefoon, e-mail, adres en contactformulier van de StretchMetal-werkplaats in Częstochowa, Polen.",
    url: nlCanonical(routes.contact.nl),
    images: defaultOgImages,
  },
};

/** Small uppercase heading for the left-column blocks. */
function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-text-faint">
      {children}
    </h2>
  );
}

export default function ContactPage() {
  return (
    <>
      <Nav content={nav} locale="nl" />

      <main id="main">
        <JsonLd data={buildLocalBusiness()} />
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: nlCanonical(routes.home.nl) },
            { name: "Contact", url: nlCanonical(routes.contact.nl) },
          ])}
        />

        {/* Hero — black */}
        <section className="section-sm section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Praten over <span className="text-red">staal.</span>
              </SectionTitle>
              <p className="lead mt-8 max-w-[640px]">{COPY.hero.lead}</p>
            </FadeIn>
          </Container>
        </section>

        {/* Two columns: contact data | mini form */}
        <section className="section">
          <Container>
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
              {/* Left — every channel spelled out from siteConfig */}
              <FadeIn>
                <div className="space-y-9">
                  <div>
                    <BlockTitle>{COPY.address.title}</BlockTitle>
                    <address className="mt-3 text-[17px] font-semibold not-italic leading-relaxed text-black">
                      {siteConfig.name}
                      <br />
                      {siteConfig.contact.address.street /* [CONFIRM] adres — via lib/site-config */}
                      <br />
                      {siteConfig.contact.address.postalCode}{" "}
                      {siteConfig.contact.address.city}
                      <br />
                      {COPY.address.country}
                    </address>
                  </div>

                  <div>
                    <BlockTitle>{COPY.phone.title}</BlockTitle>
                    <TrackedCTA
                      event="phone_click"
                      props={{ location: "contact_page" }}
                      href={`tel:${siteConfig.contact.phone}`}
                      className="lnk mt-3 inline-block py-1 text-[22px] font-bold text-black"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </TrackedCTA>
                  </div>

                  <div>
                    <BlockTitle>{COPY.email.title}</BlockTitle>
                    <TrackedCTA
                      event="cta_click"
                      props={{ location: "contact_page", label: "email" }}
                      href={`mailto:${siteConfig.contact.email}`}
                      className="lnk mt-3 inline-block py-1 text-[17px] font-semibold text-black"
                    >
                      {siteConfig.contact.email}
                    </TrackedCTA>
                  </div>

                  <div>
                    <BlockTitle>{COPY.hours.title}</BlockTitle>
                    <p className="mt-3 text-[15px] font-medium text-text-body">
                      {COPY.hours.value}
                    </p>
                  </div>

                  <div>
                    <BlockTitle>{COPY.company.title}</BlockTitle>
                    <p className="mt-3 text-[14px] leading-relaxed text-text-muted">
                      {COPY.company.legal}
                    </p>
                  </div>

                  {/* Static map placeholder — no external embed, no consent
                      problem; the link opens Google Maps directions. */}
                  <div>
                    <WorkshopImage
                      caption={COPY.map.caption}
                      aspect="aspect-[3/2]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lnk mt-4 inline-flex items-center gap-2 py-1 text-[13px] font-bold uppercase tracking-[0.06em] text-black"
                    >
                      {COPY.map.directions}
                      <span aria-hidden="true" className="text-red">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Right — mini contact form */}
              <FadeIn delay={120}>
                <Eyebrow number="02">{COPY.form.eyebrow}</Eyebrow>
                <SectionTitle size="section-sm">{COPY.form.title}</SectionTitle>
                <p className="mt-5 max-w-[480px] text-[14.5px] leading-relaxed text-text-muted">
                  {COPY.form.lead}{" "}
                  <TrackedCTA
                    event="cta_click"
                    props={{ location: "contact_form_note", label: COPY.form.rfqLink }}
                    href={routes.rfq.nl}
                    className="font-bold text-red underline underline-offset-2"
                  >
                    {COPY.form.rfqLink}
                  </TrackedCTA>
                  .
                </p>
                <div className="mt-8">
                  <ContactForm locale="nl" />
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>
      </main>

      <Footer content={footer} locale="nl" />
      {/* Clearance for the mobile sticky bar (h-14, md:hidden) */}
      <div aria-hidden="true" className="h-14 md:hidden" />
      <MobileStickyCta content={stickyCta} locale="nl" />
    </>
  );
}
