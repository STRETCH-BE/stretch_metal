/**
 * Cookie policy — /nl/cookiebeleid
 * File path: /app/nl/cookiebeleid/page.tsx
 *
 * Dutch (nl-BE) mirror of /app/en/cookie-policy/page.tsx. Describes the
 * consent model exactly as implemented (consent-provider.tsx +
 * cookie-banner.tsx): decision stored in localStorage "sm_consent",
 * opt-in analytics and marketing categories, nothing loads pre-decision,
 * equal-weight banner buttons, and — honestly — no banner-reopen button:
 * withdrawal works by clearing the site's browser data (banner
 * reappears) or via browser settings.
 *
 * Inventory lists only what the site can actually set: sm_consent,
 * PostHog (ph_*), GA4 (_ga, _ga_*), Clarity (_clck, _clsk), Meta (_fbp),
 * with the vendors' documented default durations. The table scrolls
 * inside its own overflow container on narrow screens. The site-data
 * mention uses the .be host — the NL tree's canonical home.
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

/** Cookie / storage inventory — keep in sync with the analytics stack. */
const INVENTORY = [
  {
    name: "sm_consent",
    provider: "StretchMetal (local storage)",
    purpose: "Onthoudt uw keuze in de cookiebanner",
    duration: "tot u de sitegegevens wist",
    category: "Noodzakelijk",
  },
  {
    name: "ph_*",
    provider: "PostHog EU",
    purpose: "Anonieme identificator en sessie — analyse",
    duration: "tot 12 maanden",
    category: "Analyse",
  },
  {
    name: "_ga, _ga_*",
    provider: "Google Analytics 4",
    purpose: "Verkeersstatistieken en bezoekbronnen",
    duration: "tot 2 jaar",
    category: "Analyse",
  },
  {
    name: "_clck, _clsk",
    provider: "Microsoft Clarity",
    purpose: "Klikkaarten en sessieopnames (formuliervelden gemaskeerd)",
    duration: "_clck: 12 maanden, _clsk: 1 dag",
    category: "Analyse",
  },
  {
    name: "_fbp",
    provider: "Meta Pixel",
    purpose: "Meting van de prestaties van Meta-advertenties",
    duration: "3 maanden",
    category: "Marketing",
  },
] as const;

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description:
    "Cookiebeleid van StretchMetal — het toestemmingsmodel, de inventaris van cookies en local storage (PostHog, GA4, Clarity, Meta) en hoe u toestemming intrekt.",
  alternates: {
    canonical: nlCanonical(routes.cookies.nl),
    languages: languageAlternates(routes.cookies),
  },
  openGraph: {
    title: "Cookiebeleid | StretchMetal",
    description:
      "Welke cookies en local-storage-vermeldingen de website van StretchMetal gebruikt en hoe u uw toestemming intrekt.",
    url: nlCanonical(routes.cookies.nl),
    images: defaultOgImages,
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Nav content={nav} locale="nl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Home", url: nlCanonical(routes.home.nl) },
            {
              name: "Cookiebeleid",
              url: nlCanonical(routes.cookies.nl),
            },
          ])}
        />

        {/* Header */}
        <section className="section-sm border-b border-border">
          <Container>
            <Eyebrow>Juridisch document</Eyebrow>
            <h1 className="h2 max-w-[800px]">
              Cookie<span className="text-red">beleid</span>
            </h1>
            <p className="lead mt-6 max-w-[640px]">
              Welke cookies en gelijkaardige technologieën deze site gebruikt,
              onder welke voorwaarden — en hoe u uw toestemming intrekt.
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
              <h2>§ 1. Wat cookies en local storage zijn</h2>
              <p>
                Cookies zijn kleine tekstbestanden die uw browser op uw toestel
                bewaart. Local storage is een gelijkaardig mechanisme —
                gegevens die zonder vervaldatum in de browser blijven en alleen
                voor deze site toegankelijk zijn. Wij gebruiken beide, in de
                minimale omvang die hieronder beschreven staat.
              </p>

              <h2>§ 2. Het toestemmingsmodel</h2>
              <p>
                Bij uw eerste bezoek vraagt een banner onderaan de pagina om
                toestemming. Tot u beslist, laadt{" "}
                <strong>
                  geen enkele analyse- of marketingtool
                </strong>{" "}
                — er bestaat geen “stilzwijgende toestemming”. Beide
                bannerknoppen (“Alles aanvaarden” en “Enkel noodzakelijke”)
                hebben hetzelfde visuele gewicht.
              </p>
              <ul>
                <li>
                  <strong>Noodzakelijk</strong> — altijd actief: uitsluitend de
                  registratie van uw toestemmingskeuze (de
                  local-storage-vermelding “sm_consent”).
                </li>
                <li>
                  <strong>Analyse</strong> — PostHog, Google Analytics 4 en
                  Microsoft Clarity; laadt alleen nadat u aanvaardt.
                </li>
                <li>
                  <strong>Marketing</strong> — Meta Pixel; laadt alleen nadat u
                  aanvaardt.
                </li>
              </ul>

              <h2>§ 3. Inventaris van cookies en local storage</h2>
              <div className="overflow-x-auto border border-border-2">
                <table className="w-full min-w-[680px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-border-2 bg-surface">
                      <th className="px-4 py-3 font-bold">Naam</th>
                      <th className="px-4 py-3 font-bold">Aanbieder</th>
                      <th className="px-4 py-3 font-bold">Doel</th>
                      <th className="px-4 py-3 font-bold">Bewaartermijn</th>
                      <th className="px-4 py-3 font-bold">Categorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INVENTORY.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-border last:border-b-0"
                      >
                        <td className="px-4 py-3 font-semibold">{row.name}</td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.provider}
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.purpose}
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.duration}
                        </td>
                        <td className="px-4 py-3 text-text-muted">
                          {row.category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Analyse- en marketingvermeldingen verschijnen alleen wanneer de
                betrokken dienst geconfigureerd is en u met de categorie hebt
                ingestemd. De bewaartermijnen zijn de gedocumenteerde
                standaardwaarden van de aanbieders en kunnen licht afwijken.
              </p>

              <h2>§ 4. Hoe u uw toestemming intrekt</h2>
              <p>
                Uw keuze wordt in uw browser bewaard (de vermelding
                “sm_consent”). De banner heeft geen aparte heropen-knop; u
                trekt uw toestemming dus op een van twee manieren in:
              </p>
              <ul>
                <li>
                  <strong>Wis de gegevens van deze site in uw browser</strong>{" "}
                  (cookies en sitegegevens / local storage voor{" "}
                  {siteConfig.urlBe.replace(/^https?:\/\//, "")}) — bij uw
                  volgende bezoek verschijnt de banner opnieuw en kunt u
                  “Enkel noodzakelijke” kiezen;
                </li>
                <li>
                  <strong>blokkeer cookies in uw browserinstellingen</strong>{" "}
                  (Chrome, Firefox, Safari en Edge kunnen cookies voor gekozen
                  sites blokkeren of automatisch wissen).
                </li>
              </ul>
              <p>
                Het intrekken van uw toestemming tast de rechtmatigheid van de
                verwerking vóór de intrekking niet aan. Toestemming weigeren
                beperkt de site op geen enkele manier.
              </p>

              <h2>§ 5. Verwante documenten</h2>
              <p>
                Hoe persoonsgegevens verwerkt worden — inclusief de volledige
                lijst van ontvangers en uw rechten — staat in het{" "}
                <Link href={routes.privacy.nl}>privacybeleid</Link>. Vragen:{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                .
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
