/**
 * Contact page — /kontakt
 * File path: /app/kontakt/page.tsx
 *
 * Two-column layout: left — every contact channel spelled out from
 * siteConfig (address, phone as TrackedCTA `phone_click`, email, hours,
 * company data) plus a static map placeholder (WorkshopImage — no
 * external embeds, no consent problem) with a plain <a> to Google Maps
 * directions; right — the mini contact form (client leaf).
 *
 * The RFQ funnel stays primary: the hero lead and the note under the
 * form both point anyone holding a drawing at /wycena.
 *
 * JSON-LD: LocalBusiness (this page and home only) + breadcrumbs.
 * Company data lines carry [CONFIRM] where the value is unverified —
 * same flags as lib/site-config.
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
import { nav, footer, stickyCta } from "@/content/ui";

/** Directions target — built from siteConfig.geo, never hardcoded. */
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${siteConfig.contact.geo.lat},${siteConfig.contact.geo.lng}`;

const COPY = {
  hero: {
    eyebrow: "Kontakt",
    lead: "Masz rysunek techniczny? Najszybsza droga to formularz wyceny — trafia prosto do technologa. Na wszystkie inne pytania odpowiadamy tutaj: telefonicznie, mailowo albo przez formularz obok.",
  },
  address: {
    title: "Adres warsztatu",
    country: "Polska",
  },
  phone: { title: "Telefon" },
  email: { title: "E-mail" },
  hours: {
    title: "Godziny pracy",
    value: "pon.–pt. 08:00–16:00", // [CONFIRM] godziny pracy
  },
  company: {
    title: "Dane firmy",
    // [CONFIRM] podmiot prawny — marka StretchMetal w strukturze grupy
    legal: `${siteConfig.legalName} — właściciel marki ${siteConfig.name}`,
    // [CONFIRM] NIP — dodać wiersz z numerem po jego potwierdzeniu
  },
  map: {
    caption: "MAPA: Częstochowa — ul. Legionów 59",
    directions: "Wyznacz trasę w Google Maps",
  },
  form: {
    eyebrow: "Napisz do nas",
    title: "Krótka wiadomość",
    lead: "Do pytań ogólnych. Jeśli chcesz wycenę konkretnego detalu, użyj formularza wyceny — tam załączysz pliki DXF, DWG, STEP lub PDF.",
    rfqLink: "Przejdź do wyceny",
  },
} as const;

export const metadata: Metadata = {
  title: "Kontakt — warsztat w Częstochowie",
  description:
    "Skontaktuj się ze StretchMetal: ul. Legionów 59, 42-200 Częstochowa. Telefon, e-mail i formularz kontaktowy. Wyceny z rysunku w 48 godzin.",
  alternates: {
    canonical: routes.contact.pl,
    languages: languageAlternates(routes.contact),
  },
  openGraph: {
    title: "Kontakt — warsztat w Częstochowie | StretchMetal",
    description:
      "Telefon, e-mail, adres i formularz kontaktowy warsztatu StretchMetal w Częstochowie.",
    url: routes.contact.pl,
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
      <Nav content={nav} locale="pl" />

      <main id="main">
        <JsonLd data={buildLocalBusiness()} />
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Strona główna", url: `${siteConfig.url}${routes.home.pl}` },
            { name: "Kontakt", url: `${siteConfig.url}${routes.contact.pl}` },
          ])}
        />

        {/* Hero — black */}
        <section className="section-sm section-dark">
          <Container>
            <FadeIn className="max-w-[1000px]">
              <Eyebrow number="01">{COPY.hero.eyebrow}</Eyebrow>
              <SectionTitle as="h1" size="display">
                Porozmawiajmy o <span className="text-red">stali.</span>
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
                      {siteConfig.contact.address.street /* [CONFIRM] adres — za lib/site-config */}
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
                    href={routes.rfq.pl}
                    className="font-bold text-red underline underline-offset-2"
                  >
                    {COPY.form.rfqLink}
                  </TrackedCTA>
                  .
                </p>
                <div className="mt-8">
                  <ContactForm locale="pl" />
                </div>
              </FadeIn>
            </div>
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
