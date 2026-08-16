/**
 * Privacy policy — /nl/privacybeleid
 * File path: /app/nl/privacybeleid/page.tsx
 *
 * Dutch (nl-BE) mirror of /app/en/privacy-policy/page.tsx — the GDPR/AVG
 * art. 13 information duty for the Belgian market. Same structure, same
 * honest scope: RFQ/contact mail flow (no database — submissions and
 * uploaded technical files exist only inside the Microsoft 365 e-mail
 * flow), consent-gated analytics (PostHog EU, GA4, Clarity — analytics
 * consent; Meta Pixel — marketing consent), Vercel hosting.
 *
 * Controller: Alto Design Sp. z o.o. // [CONFIRM] legal entity — flagged
 * where rendered. Complaint route names BOTH supervisory authorities:
 * the Gegevensbeschermingsautoriteit (Belgium, the reader's own) and
 * PUODO (Poland, the controller's). Bump LAST_UPDATED on substantive
 * changes.
 *
 * Disclaimer: drafted from common GDPR compliance patterns; review by a
 * qualified data-protection lawyer is advised before commercial use.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { MobileStickyCta } from "@/components/sections/mobile-sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { routes, languageAlternates, nlCanonical } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { nav, footer, stickyCta } from "@/content/nl/ui";

const LAST_UPDATED = "16 augustus 2026";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Privacybeleid van StretchMetal — hoe gegevens uit het offerte- en contactformulier, inclusief technische bestanden, verwerkt worden onder de AVG.",
  alternates: {
    canonical: nlCanonical(routes.privacy.nl),
    languages: languageAlternates(routes.privacy),
  },
  openGraph: {
    title: "Privacybeleid | StretchMetal",
    description:
      "Hoe persoonsgegevens op de website van StretchMetal verwerkt worden onder de AVG.",
    url: nlCanonical(routes.privacy.nl),
    images: defaultOgImages,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav content={nav} locale="nl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: nlCanonical(routes.home.nl) },
            {
              name: "Privacybeleid",
              url: nlCanonical(routes.privacy.nl),
            },
          ])}
        />

        {/* Header */}
        <section className="section-sm border-b border-border">
          <Container>
            <Eyebrow>Juridisch document</Eyebrow>
            <h1 className="h2 max-w-[800px]">
              Privacy<span className="text-red">beleid</span>
            </h1>
            <p className="lead mt-6 max-w-[640px]">
              Dit document legt uit welke persoonsgegevens wij verzamelen,
              waarom, op welke rechtsgrond, en welke rechten de AVG u geeft.
            </p>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-text-faint">
              Laatst bijgewerkt: {LAST_UPDATED}
            </p>
          </Container>
        </section>

        {/* Body */}
        <section className="section-sm">
          <Container>
            <article className="prose-legal">
              <h2>§ 1. Verwerkingsverantwoordelijke</h2>
              <p>
                De verwerkingsverantwoordelijke voor uw persoonsgegevens is{" "}
                <strong>
                  {siteConfig.legalName /* [CONFIRM] juridische entiteit */}
                </strong>{" "}
                — een vennootschap van de Stretchgroup en eigenaar van het merk{" "}
                {siteConfig.name} (“wij”).
              </p>
              <ul>
                <li>
                  Adres: {siteConfig.contact.address.street},{" "}
                  {siteConfig.contact.address.postalCode}{" "}
                  {siteConfig.contact.address.city}, Polen{" "}
                  {/* [CONFIRM] adres */}
                </li>
                <li>
                  E-mail:{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  Telefoon:{" "}
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              </ul>
              <p>
                Voor elke vraag over gegevensbescherming mailt u naar het
                bovenstaande adres met “AVG” in de onderwerpregel. U mag in het
                Nederlands schrijven.
              </p>

              <h2>§ 2. Welke gegevens wij verzamelen</h2>
              <h3>Offerteformulier (RFQ)</h3>
              <ul>
                <li>naam (verplicht), e-mailadres (verplicht)</li>
                <li>
                  optioneel: bedrijf, telefoon, land, gekozen diensten,
                  materiaal, aantallen, gewenste termijn
                </li>
                <li>de tekst van uw bericht (verplicht)</li>
                <li>
                  toegevoegde technische bestanden (DXF, DWG, STEP, IGES, PDF,
                  ZIP) — de tekeningen en modellen die u voor de offerte
                  aanlevert
                </li>
              </ul>
              <h3>Contactformulier</h3>
              <ul>
                <li>naam, e-mailadres, de tekst van uw bericht</li>
              </ul>
              <h3>Analytics (alleen met toestemming)</h3>
              <ul>
                <li>een anonieme identificator (cookie / local storage)</li>
                <li>toestel- en browsertype, bezochte pagina&apos;s</li>
                <li>verkeersbron (zoekmachine, link, advertentie)</li>
              </ul>
              <p>
                Analyse- en marketingtools laden{" "}
                <strong>uitsluitend nadat u toestemming geeft</strong> in de
                cookiebanner. Zonder toestemming laden ze helemaal niet.
              </p>

              <h2>§ 3. Doeleinden en rechtsgronden</h2>
              <ul>
                <li>
                  <strong>Uw offerte opstellen en vragen beantwoorden</strong>{" "}
                  (offerte- en contactformulier) — art. 6, lid 1, b) AVG:
                  maatregelen op uw verzoek vóór het sluiten van een
                  overeenkomst.
                </li>
                <li>
                  <strong>Websiteanalyse</strong> (PostHog, Google Analytics 4,
                  Microsoft Clarity) en <strong>advertentiemeting</strong>{" "}
                  (Meta Pixel) — art. 6, lid 1, a) AVG: uw toestemming via de
                  cookiebanner, afzonderlijk gegeven voor de categorieën
                  analyse en marketing.
                </li>
                <li>
                  <strong>Beveiliging van de site en misbruikpreventie</strong>{" "}
                  (serverlogs, verzendlimieten, antispamfilters) — art. 6,
                  lid 1, f) AVG: ons gerechtvaardigd belang.
                </li>
              </ul>

              <h2>§ 4. Technische bestanden uit het offerteformulier</h2>
              <p>
                Geüploade bestanden behandelen wij als{" "}
                <strong>vertrouwelijke ontwerpgegevens</strong>. De website
                slaat ze in geen enkele databank op — ze reizen uitsluitend als
                bijlage van de e-mail die in onze mailbox aankomt (Microsoft
                365, datacenters in de EU) en dienen alleen om uw offerte op te
                stellen en de opdracht uit te voeren. Wij bewaren ze tot de
                offerte is afgesloten en, wanneer een bestelling volgt, zolang
                de boekhoudwetgeving dat vereist. Een NDA is op verzoek
                beschikbaar.
              </p>

              <h2>§ 5. Ontvangers van de gegevens</h2>
              <p>
                Wij vertrouwen gegevens alleen toe aan dienstverleners die
                nodig zijn om de site te laten draaien, onder
                verwerkersovereenkomsten (art. 28 AVG):
              </p>
              <ul>
                <li>
                  <strong>Microsoft Corporation</strong> (Microsoft 365 /
                  Microsoft Graph) — de mailbox die formulierinzendingen en hun
                  bijlagen vervoert; datacenters in de EU.
                </li>
                <li>
                  <strong>Vercel Inc.</strong> — hosting van de website en
                  standaard toegangslogs.
                </li>
                <li>
                  <strong>PostHog Inc.</strong> (PostHog EU, Frankfurt) —
                  analyse; alleen na toestemming voor analyse.
                </li>
                <li>
                  <strong>Google LLC</strong> (Google Analytics 4) —
                  verkeersstatistieken; alleen na toestemming voor analyse.
                </li>
                <li>
                  <strong>Microsoft Corporation</strong> (Clarity) — klikkaarten
                  en sessieopnames met gemaskeerde formuliervelden; alleen na
                  toestemming voor analyse.
                </li>
                <li>
                  <strong>Meta Platforms</strong> (Meta Pixel) — meting van
                  advertentieprestaties; alleen na toestemming voor marketing.
                </li>
              </ul>

              <h2>§ 6. Doorgiften buiten de EER</h2>
              <p>
                Onze mailbox en de PostHog-analyse draaien in datacenters in de
                EU. Voor Google en Meta kan een deel van de verwerking in de
                Verenigde Staten plaatsvinden — op basis van het
                adequaatheidsbesluit van de Europese Commissie (EU-US Data
                Privacy Framework) en standaardcontractbepalingen (SCC&apos;s).
              </p>

              <h2>§ 7. Bewaartermijnen</h2>
              <ul>
                <li>
                  inzendingen die niet tot een bestelling leiden — tot de
                  offerte is afgesloten, maximaal 12 maanden;
                </li>
                <li>
                  inzendingen die tot een bestelling leiden — zolang de
                  boekhoudwetgeving dat vereist (in de regel 5 jaar vanaf het
                  einde van het boekjaar);
                </li>
                <li>analysegegevens — volgens de tabel in het cookiebeleid;</li>
                <li>serverlogs — maximaal 30 dagen.</li>
              </ul>

              <h2>§ 8. Uw rechten</h2>
              <ul>
                <li>recht op inzage (art. 15 AVG),</li>
                <li>recht op rectificatie (art. 16 AVG),</li>
                <li>recht op wissing (art. 17 AVG),</li>
                <li>recht op beperking van de verwerking (art. 18 AVG),</li>
                <li>recht op overdraagbaarheid van gegevens (art. 20 AVG),</li>
                <li>
                  recht van bezwaar tegen verwerking op basis van
                  gerechtvaardigd belang (art. 21 AVG),
                </li>
                <li>
                  recht om uw toestemming op elk moment in te trekken — zonder
                  dat dit de rechtmatigheid aantast van de verwerking vóór de
                  intrekking,
                </li>
                <li>
                  recht om een klacht in te dienen bij een
                  toezichthoudende autoriteit — in België: de{" "}
                  <strong>Gegevensbeschermingsautoriteit (GBA)</strong>,
                  Drukpersstraat 35, 1000 Brussel; in Polen (het land van de
                  verwerkingsverantwoordelijke): de voorzitter van het bureau
                  voor de bescherming van persoonsgegevens (
                  <strong>PUODO</strong>), ul. Stawki 2, 00-193 Warschau. U mag
                  ook klagen bij de autoriteit van uw eigen EU-lidstaat.
                </li>
              </ul>
              <p>
                Stuur uw verzoek naar{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                . Wij antwoorden uiterlijk binnen 30 dagen.
              </p>

              <h2>§ 9. Geautomatiseerde besluitvorming</h2>
              <p>
                Wij nemen geen besluiten over u die uitsluitend op
                geautomatiseerde verwerking berusten, profilering inbegrepen,
                en die rechtsgevolgen zouden hebben.
              </p>

              <h2>§ 10. Cookies</h2>
              <p>
                Hoe cookies en gelijkaardige technologieën gebruikt worden, de
                volledige inventaristabel en hoe u uw toestemming intrekt,
                staat in het afzonderlijke{" "}
                <Link href={routes.cookies.nl}>cookiebeleid</Link>.
              </p>

              <h2>§ 11. Wijzigingen aan dit beleid</h2>
              <p>
                Wij werken dit beleid bij wanneer onze infrastructuur, onze
                dienstverleners of de wetgeving veranderen. De actuele versie,
                met datum van bijwerking, is altijd op dit adres beschikbaar.
                Dit document vervult de informatieplicht van art. 13 AVG en is
                geen juridisch advies.
              </p>
            </article>
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
