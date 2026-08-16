/**
 * Privacy policy — /polityka-prywatnosci
 * File path: /app/polityka-prywatnosci/page.tsx
 *
 * RODO information duty (art. 13) in Polish, rendered in .prose-legal.
 * Describes ONLY what the site actually does — the RFQ/contact mail flow
 * (app/api/rfq/route.ts → Microsoft Graph), the consent-gated analytics
 * stack (PostHog EU, GA4, Clarity — analytics consent; Meta Pixel —
 * marketing consent) and Vercel hosting. Uploaded technical files exist
 * only inside the e-mail flow — the site keeps no database.
 *
 * Controller: Alto Design Sp. z o.o. // [CONFIRM] legal entity — flagged
 * where rendered. Bump LAST_UPDATED on substantive changes.
 *
 * Disclaimer: drafted from common RODO compliance patterns; before
 * commercial use it should be reviewed by a Polish data-protection
 * lawyer.
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
import { routes, languageAlternates } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";
import { nav, footer, stickyCta } from "@/content/ui";

const LAST_UPDATED = "16 sierpnia 2026";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności StretchMetal — jak zgodnie z RODO przetwarzamy dane z formularzy wyceny i kontaktu, w tym przesyłane pliki techniczne.",
  alternates: {
    canonical: routes.privacy.pl,
    languages: languageAlternates(routes.privacy),
  },
  openGraph: {
    title: "Polityka prywatności | StretchMetal",
    description:
      "Informacje o przetwarzaniu danych osobowych na stronie StretchMetal zgodnie z RODO.",
    url: routes.privacy.pl,
    images: defaultOgImages,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav content={nav} locale="pl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Strona główna", url: `${siteConfig.url}${routes.home.pl}` },
            {
              name: "Polityka prywatności",
              url: `${siteConfig.url}${routes.privacy.pl}`,
            },
          ])}
        />

        {/* Header */}
        <section className="section-sm border-b border-border">
          <Container>
            <Eyebrow>Dokument prawny</Eyebrow>
            <h1 className="h2 max-w-[800px]">
              Polityka <span className="text-red">prywatności</span>
            </h1>
            <p className="lead mt-6 max-w-[640px]">
              Ten dokument wyjaśnia, jakie dane osobowe zbieramy, po co, na
              jakiej podstawie prawnej i jakie prawa przysługują Ci na gruncie
              RODO.
            </p>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-text-faint">
              Ostatnia aktualizacja: {LAST_UPDATED}
            </p>
          </Container>
        </section>

        {/* Body */}
        <section className="section-sm">
          <Container>
            <article className="prose-legal">
              <h2>§ 1. Administrator danych</h2>
              <p>
                Administratorem Twoich danych osobowych jest{" "}
                <strong>
                  {siteConfig.legalName /* [CONFIRM] podmiot prawny */}
                </strong>{" "}
                — spółka z grupy Stretchgroup, właściciel marki{" "}
                {siteConfig.name} (dalej: „my”).
              </p>
              <ul>
                <li>
                  Adres: {siteConfig.contact.address.street},{" "}
                  {siteConfig.contact.address.postalCode}{" "}
                  {siteConfig.contact.address.city}, Polska{" "}
                  {/* [CONFIRM] adres */}
                </li>
                <li>
                  E-mail:{" "}
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  Telefon:{" "}
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              </ul>
              <p>
                W sprawach dotyczących danych osobowych napisz na powyższy
                adres e-mail z dopiskiem „RODO” w temacie wiadomości.
              </p>

              <h2>§ 2. Jakie dane zbieramy</h2>
              <h3>Formularz wyceny (RFQ)</h3>
              <ul>
                <li>imię i nazwisko (wymagane), adres e-mail (wymagany)</li>
                <li>
                  opcjonalnie: firma, telefon, kraj, wybrane usługi, materiał,
                  ilość, termin
                </li>
                <li>treść wiadomości (wymagana)</li>
                <li>
                  załączone pliki techniczne (DXF, DWG, STEP, IGES, PDF, ZIP) —
                  rysunki i modele, które przesyłasz do wyceny
                </li>
              </ul>
              <h3>Formularz kontaktowy</h3>
              <ul>
                <li>imię i nazwisko, adres e-mail, treść wiadomości</li>
              </ul>
              <h3>Analityka (wyłącznie za zgodą)</h3>
              <ul>
                <li>anonimowy identyfikator (cookie / local storage)</li>
                <li>typ urządzenia i przeglądarki, odwiedzone strony</li>
                <li>źródło wejścia (wyszukiwarka, link, reklama)</li>
              </ul>
              <p>
                Narzędzia analityczne i marketingowe uruchamiają się{" "}
                <strong>dopiero po wyrażeniu zgody</strong> w banerze cookies.
                Bez zgody nie ładują się wcale.
              </p>

              <h2>§ 3. Cele i podstawy prawne</h2>
              <ul>
                <li>
                  <strong>Przygotowanie wyceny i odpowiedź na zapytanie</strong>{" "}
                  (formularz wyceny i kontaktowy) — art. 6 ust. 1 lit. b RODO:
                  działania na Twoje żądanie przed zawarciem umowy.
                </li>
                <li>
                  <strong>Analityka i statystyka strony</strong> (PostHog, Google
                  Analytics 4, Microsoft Clarity) oraz{" "}
                  <strong>pomiar reklam</strong> (Meta Pixel) — art. 6 ust. 1
                  lit. a RODO: Twoja zgoda z banera cookies, odrębna dla
                  kategorii analitycznej i marketingowej.
                </li>
                <li>
                  <strong>Bezpieczeństwo serwisu i obrona przed nadużyciami</strong>{" "}
                  (logi serwerowe, limity zgłoszeń, filtry antyspamowe) — art. 6
                  ust. 1 lit. f RODO: nasz prawnie uzasadniony interes.
                </li>
              </ul>

              <h2>§ 4. Pliki techniczne z formularza wyceny</h2>
              <p>
                Przesłane pliki traktujemy jako <strong>poufne dane
                projektowe</strong>. Strona nie zapisuje ich w żadnej bazie —
                trafiają wyłącznie jako załączniki do wiadomości e-mail w naszej
                skrzynce (Microsoft 365, centra danych w UE) i służą tylko do
                przygotowania wyceny oraz realizacji zlecenia. Przechowujemy je
                do zamknięcia wyceny, a jeśli dojdzie do zlecenia — przez okres
                wymagany przepisami o rachunkowości. Na życzenie podpisujemy
                NDA.
              </p>

              <h2>§ 5. Odbiorcy danych</h2>
              <p>
                Dane powierzamy wyłącznie dostawcom niezbędnym do działania
                serwisu, na podstawie umów powierzenia (art. 28 RODO):
              </p>
              <ul>
                <li>
                  <strong>Microsoft Corporation</strong> (Microsoft 365 /
                  Microsoft Graph) — skrzynka e-mail, przez którą przechodzą
                  zgłoszenia z formularzy wraz z załącznikami; centra danych w
                  UE.
                </li>
                <li>
                  <strong>Vercel Inc.</strong> — hosting strony i standardowe
                  logi dostępowe.
                </li>
                <li>
                  <strong>PostHog Inc.</strong> (PostHog EU, Frankfurt) —
                  analityka; tylko po zgodzie analitycznej.
                </li>
                <li>
                  <strong>Google LLC</strong> (Google Analytics 4) — statystyka
                  ruchu; tylko po zgodzie analitycznej.
                </li>
                <li>
                  <strong>Microsoft Corporation</strong> (Clarity) — mapy
                  kliknięć i nagrania sesji z maskowaniem pól formularzy; tylko
                  po zgodzie analitycznej.
                </li>
                <li>
                  <strong>Meta Platforms</strong> (Meta Pixel) — pomiar
                  skuteczności reklam; tylko po zgodzie marketingowej.
                </li>
              </ul>

              <h2>§ 6. Transfer poza EOG</h2>
              <p>
                Skrzynka pocztowa i analityka PostHog działają w centrach danych
                w UE. W przypadku Google i Meta część przetwarzania może odbywać
                się w USA — na podstawie decyzji Komisji Europejskiej o
                adekwatności (EU-US Data Privacy Framework) oraz standardowych
                klauzul umownych (SCC).
              </p>

              <h2>§ 7. Okres przechowywania</h2>
              <ul>
                <li>
                  zgłoszenia z formularzy (bez zlecenia) — do zamknięcia wyceny,
                  nie dłużej niż 12 miesięcy;
                </li>
                <li>
                  zgłoszenia zakończone zleceniem — przez okres wymagany
                  przepisami o rachunkowości (co do zasady 5 lat od końca roku
                  obrotowego);
                </li>
                <li>dane analityczne — zgodnie z tabelą w polityce cookies;</li>
                <li>logi serwerowe — do 30 dni.</li>
              </ul>

              <h2>§ 8. Twoje prawa</h2>
              <ul>
                <li>prawo dostępu do danych (art. 15 RODO),</li>
                <li>prawo do sprostowania (art. 16 RODO),</li>
                <li>prawo do usunięcia danych (art. 17 RODO),</li>
                <li>prawo do ograniczenia przetwarzania (art. 18 RODO),</li>
                <li>prawo do przenoszenia danych (art. 20 RODO),</li>
                <li>
                  prawo sprzeciwu wobec przetwarzania opartego na uzasadnionym
                  interesie (art. 21 RODO),
                </li>
                <li>
                  prawo cofnięcia zgody w dowolnym momencie — bez wpływu na
                  zgodność z prawem wcześniejszego przetwarzania,
                </li>
                <li>
                  prawo skargi do organu nadzorczego: Prezes Urzędu Ochrony
                  Danych Osobowych (PUODO), ul. Stawki 2, 00-193 Warszawa.
                </li>
              </ul>
              <p>
                Żądania kieruj na{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                . Odpowiadamy najpóźniej w ciągu 30 dni.
              </p>

              <h2>§ 9. Zautomatyzowane decyzje</h2>
              <p>
                Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na
                zautomatyzowanym przetwarzaniu, w tym profilowaniu, które
                wywoływałyby skutki prawne.
              </p>

              <h2>§ 10. Pliki cookies</h2>
              <p>
                Zasady używania cookies i podobnych technologii, pełną tabelę
                wpisów oraz sposób cofnięcia zgody opisuje odrębna{" "}
                <Link href={routes.cookies.pl}>polityka cookies</Link>.
              </p>

              <h2>§ 11. Zmiany polityki</h2>
              <p>
                Politykę aktualizujemy przy zmianach w infrastrukturze,
                dostawcach lub przepisach. Obowiązująca wersja z datą
                aktualizacji jest zawsze dostępna pod tym adresem. Dokument
                realizuje obowiązek informacyjny z art. 13 RODO i nie zastępuje
                porady prawnej.
              </p>
            </article>
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
