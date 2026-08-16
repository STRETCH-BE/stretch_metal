/**
 * Cookie policy — /polityka-cookies
 * File path: /app/polityka-cookies/page.tsx
 *
 * Describes the consent model EXACTLY as implemented in
 * components/analytics/consent-provider.tsx + cookie-banner.tsx:
 *   - decision stored in localStorage under "sm_consent" (not a cookie)
 *   - two opt-in categories (analytics / marketing), necessary always on
 *   - nothing loads before a decision; both banner buttons carry equal
 *     visual weight
 *   - the banner has NO reopen button — withdrawal happens by clearing
 *     the site's browser data (the banner then reappears) or via browser
 *     settings; the policy says so honestly.
 *
 * Inventory table lists only what the site can actually set: sm_consent,
 * PostHog (ph_*), GA4 (_ga, _ga_*), Clarity (_clck, _clsk), Meta (_fbp).
 * Durations are the vendors' documented defaults. Table scrolls inside
 * its own overflow container on narrow screens.
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

/** Cookie / storage inventory — keep in sync with the analytics stack. */
const INVENTORY = [
  {
    name: "sm_consent",
    provider: "StretchMetal (local storage)",
    purpose: "Zapamiętanie Twojej decyzji z banera cookies",
    duration: "do usunięcia danych strony",
    category: "Niezbędne",
  },
  {
    name: "ph_* ",
    provider: "PostHog EU",
    purpose: "Anonimowy identyfikator i sesja — analityka",
    duration: "do 12 miesięcy",
    category: "Analityczne",
  },
  {
    name: "_ga, _ga_*",
    provider: "Google Analytics 4",
    purpose: "Statystyki ruchu i źródła wizyt",
    duration: "do 2 lat",
    category: "Analityczne",
  },
  {
    name: "_clck, _clsk",
    provider: "Microsoft Clarity",
    purpose: "Mapy kliknięć i nagrania sesji (z maskowaniem pól)",
    duration: "_clck: 12 miesięcy, _clsk: 1 dzień",
    category: "Analityczne",
  },
  {
    name: "_fbp",
    provider: "Meta Pixel",
    purpose: "Pomiar skuteczności reklam Meta",
    duration: "3 miesiące",
    category: "Marketingowe",
  },
] as const;

export const metadata: Metadata = {
  title: "Polityka cookies",
  description:
    "Polityka cookies StretchMetal — model zgody, pełna tabela plików cookie i wpisów local storage (PostHog, GA4, Clarity, Meta) oraz sposób cofnięcia zgody.",
  alternates: {
    canonical: routes.cookies.pl,
    languages: languageAlternates(routes.cookies),
  },
  openGraph: {
    title: "Polityka cookies | StretchMetal",
    description:
      "Jakich plików cookie i wpisów local storage używa strona StretchMetal i jak cofnąć zgodę.",
    url: routes.cookies.pl,
    images: defaultOgImages,
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Nav content={nav} locale="pl" />

      <main id="main">
        <JsonLd
          data={buildBreadcrumbs([
            { name: "Strona główna", url: `${siteConfig.url}${routes.home.pl}` },
            {
              name: "Polityka cookies",
              url: `${siteConfig.url}${routes.cookies.pl}`,
            },
          ])}
        />

        {/* Header */}
        <section className="section-sm border-b border-border">
          <Container>
            <Eyebrow>Dokument prawny</Eyebrow>
            <h1 className="h2 max-w-[800px]">
              Polityka <span className="text-red">cookies</span>
            </h1>
            <p className="lead mt-6 max-w-[640px]">
              Jakich plików cookie i podobnych technologii używa ta strona, na
              jakich zasadach — i jak cofnąć zgodę.
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
              <h2>§ 1. Czym są cookies i local storage</h2>
              <p>
                Cookies to małe pliki tekstowe zapisywane przez przeglądarkę na
                Twoim urządzeniu. Local storage to podobny mechanizm — dane
                zapisane w przeglądarce bez daty ważności, dostępne tylko dla
                tej strony. Używamy obu, w minimalnym zakresie opisanym niżej.
              </p>

              <h2>§ 2. Model zgody</h2>
              <p>
                Przy pierwszej wizycie baner na dole strony pyta o zgodę. Do
                czasu Twojej decyzji{" "}
                <strong>
                  żadne narzędzie analityczne ani marketingowe się nie ładuje
                </strong>{" "}
                — nie ma „domyślnej zgody”. Oba przyciski banera („Akceptuję
                wszystkie” i „Tylko niezbędne”) mają identyczną rangę wizualną.
              </p>
              <ul>
                <li>
                  <strong>Niezbędne</strong> — zawsze aktywne: wyłącznie zapis
                  Twojej decyzji o zgodzie (wpis „sm_consent” w local storage).
                </li>
                <li>
                  <strong>Analityczne</strong> — PostHog, Google Analytics 4 i
                  Microsoft Clarity; uruchamiane tylko po akceptacji.
                </li>
                <li>
                  <strong>Marketingowe</strong> — Meta Pixel; uruchamiany tylko
                  po akceptacji.
                </li>
              </ul>

              <h2>§ 3. Tabela cookies i wpisów local storage</h2>
              <div className="overflow-x-auto border border-border-2">
                <table className="w-full min-w-[680px] text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-border-2 bg-surface">
                      <th className="px-4 py-3 font-bold">Nazwa</th>
                      <th className="px-4 py-3 font-bold">Dostawca</th>
                      <th className="px-4 py-3 font-bold">Cel</th>
                      <th className="px-4 py-3 font-bold">Czas życia</th>
                      <th className="px-4 py-3 font-bold">Kategoria</th>
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
                Wpisy analityczne i marketingowe pojawiają się wyłącznie wtedy,
                gdy dana usługa jest skonfigurowana i wyraziłeś/aś na nią
                zgodę. Czasy życia to domyślne wartości dostawców i mogą się
                nieznacznie różnić.
              </p>

              <h2>§ 4. Jak cofnąć zgodę</h2>
              <p>
                Twoja decyzja jest zapisana w przeglądarce (wpis „sm_consent”).
                Baner nie ma osobnego przycisku ponownego otwarcia, więc zgodę
                cofasz w jeden z dwóch sposobów:
              </p>
              <ul>
                <li>
                  <strong>Usuń dane tej strony w przeglądarce</strong> (cookies
                  i dane witryn / local storage dla {siteConfig.url.replace(/^https?:\/\//, "")}) —
                  przy następnej wizycie baner pojawi się ponownie i możesz
                  wybrać „Tylko niezbędne”;
                </li>
                <li>
                  <strong>zablokuj cookies w ustawieniach przeglądarki</strong>{" "}
                  (Chrome, Firefox, Safari i Edge pozwalają blokować cookies dla
                  wybranych witryn lub usuwać je automatycznie).
                </li>
              </ul>
              <p>
                Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania
                sprzed jej cofnięcia. Odmowa zgody w niczym nie ogranicza
                działania strony.
              </p>

              <h2>§ 5. Powiązane dokumenty</h2>
              <p>
                Zasady przetwarzania danych osobowych, w tym pełną listę
                odbiorców i Twoje prawa, opisuje{" "}
                <Link href={routes.privacy.pl}>polityka prywatności</Link>.
                Pytania:{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                .
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
