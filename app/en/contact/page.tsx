/**
 * Contact page — /en/contact
 * File path: /app/en/contact/page.tsx
 *
 * English mirror of /app/kontakt/page.tsx: two-column layout — left
 * spells out every contact channel from siteConfig (address, phone as
 * TrackedCTA `phone_click`, email, hours, company data) with a static
 * map placeholder + Google Maps directions link; right renders the mini
 * contact form. The RFQ funnel stays primary — copy points anyone with
 * a drawing at /en/quote.
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
import { routes, languageAlternates } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { nav, footer, stickyCta } from "@/content/en/ui";

/** Directions target — built from siteConfig.geo, never hardcoded. */
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${siteConfig.contact.geo.lat},${siteConfig.contact.geo.lng}`;

const COPY = {
  hero: {
    eyebrow: "Contact",
    lead: "Holding a technical drawing? The fastest route is the quote form — it lands directly with an engineer. For everything else, reach us here: by phone, by email or through the form.",
  },
  address: {
    title: "Workshop address",
    country: "Poland",
  },
  phone: { title: "Phone" },
  email: { title: "Email" },
  hours: {
    title: "Opening hours",
    value: "Mon–Fri 08:00–16:00 (CET)", // [CONFIRM] opening hours
  },
  company: {
    title: "Company data",
    // [CONFIRM] legal entity — StretchMetal brand within the group structure
    legal: `${siteConfig.legalName} — owner of the ${siteConfig.name} brand`,
    // [CONFIRM] NIP / VAT ID — re-add the row once the number is confirmed
  },
  map: {
    caption: "MAP: Częstochowa — ul. Legionów 59",
    directions: "Get directions in Google Maps",
  },
  form: {
    eyebrow: "Write to us",
    title: "Quick message",
    lead: "For general questions. If you want a quote for a specific part, use the quote form — you can attach DXF, DWG, STEP or PDF files there.",
    rfqLink: "Go to the quote form",
  },
} as const;

export const metadata: Metadata = {
  title: "Contact — Workshop in Częstochowa, Poland",
  description:
    "Contact StretchMetal: ul. Legionów 59, 42-200 Częstochowa, Poland. Phone, email and contact form. Quotes from your drawing within 48 hours.",
  alternates: {
    canonical: routes.contact.en,
    languages: languageAlternates(routes.contact),
  },
  openGraph: {
    title: "Contact — Workshop in Częstochowa, Poland | StretchMetal",
    description:
      "Phone, email, address and contact form of the StretchMetal workshop in Częstochowa, Poland.",
    url: routes.contact.en,
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
      <Nav content={nav} locale="en" />

      <main id="main">
        <JsonLd data={buildLocalBusiness()} />
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
            { name: "Contact", url: `${siteConfig.url}${routes.contact.en}` },
          ])}
        />

        {/* Hero — black */}
        <section className="section-sm section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Let&apos;s talk <span className="text-red">steel.</span>
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
                      {siteConfig.contact.address.street /* [CONFIRM] address — via lib/site-config */}
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
                    href={routes.rfq.en}
                    className="font-bold text-red underline underline-offset-2"
                  >
                    {COPY.form.rfqLink}
                  </TrackedCTA>
                  .
                </p>
                <div className="mt-8">
                  <ContactForm locale="en" />
                </div>
              </FadeIn>
            </div>
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
