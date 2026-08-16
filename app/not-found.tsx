/**
 * Custom 404 page.
 * File path: /app/not-found.tsx
 *
 * One not-found boundary serves ALL locale trees (the App Router renders
 * the root not-found for any unmatched URL), so the page is trilingual:
 * Polish first (primary market), one English and one Dutch line below,
 * and link rows to the highest-value pages — home / services / RFQ — in
 * all three locales.
 *
 * Standalone black screen in the design system (display type, single red
 * accent, hard-edged buttons). No Nav/Footer chrome: chrome needs a
 * locale and this boundary has none — the links are the navigation.
 */

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { routes } from "@/lib/i18n-routes";

export const metadata: Metadata = {
  title: "404 — nie znaleziono strony",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh items-center bg-black text-white">
      <Container className="py-20">
        <Logo tone="on-dark" size={20} />

        <p className="mt-12 text-[13px] font-bold uppercase tracking-[0.2em] text-red-bright">
          Błąd 404 / Error 404 / Fout 404
        </p>

        <h1 className="h-display mt-5 max-w-[1000px]">
          Tu nie ma <span className="text-red">stali.</span>
        </h1>

        <p className="lead mt-8 max-w-[560px] text-on-dark-soft">
          Strona nie istnieje albo zmieniła adres. Zacznij od strony głównej
          albo wyślij rysunek do wyceny.
        </p>
        <p className="mt-3 max-w-[560px] text-[14px] leading-relaxed text-on-dark-muted" lang="en">
          This page does not exist. Start from the home page or send a drawing
          for a quote.
        </p>
        <p className="mt-3 max-w-[560px] text-[14px] leading-relaxed text-on-dark-muted" lang="nl">
          Deze pagina bestaat niet. Start op de Nederlandse startpagina of
          stuur een tekening voor een offerte.
        </p>

        {/* PL row — primary market first */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button href={routes.rfq.pl} variant="primary" arrow>
            Wyślij rysunek
          </Button>
          <Button href={routes.home.pl} variant="ghost-light">
            Strona główna
          </Button>
          <Button href={routes.services.pl} variant="ghost-light">
            Usługi
          </Button>
        </div>

        {/* EN row */}
        <div className="mt-4 flex flex-wrap items-center gap-4" lang="en">
          <Button href={routes.rfq.en} variant="ghost-light" size="sm" arrow>
            Send your drawing
          </Button>
          <Button href={routes.home.en} variant="ghost-light" size="sm">
            English home
          </Button>
          <Button href={routes.services.en} variant="ghost-light" size="sm">
            Services
          </Button>
        </div>

        {/* NL row */}
        <div className="mt-4 flex flex-wrap items-center gap-4" lang="nl">
          <Button href={routes.rfq.nl} variant="ghost-light" size="sm" arrow>
            Stuur uw tekening
          </Button>
          <Button href={routes.home.nl} variant="ghost-light" size="sm">
            Nederlandse versie
          </Button>
          <Button href={routes.services.nl} variant="ghost-light" size="sm">
            Diensten
          </Button>
        </div>
      </Container>
    </main>
  );
}
