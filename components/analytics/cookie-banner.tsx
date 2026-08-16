"use client";

/**
 * Cookie consent banner — RODO/GDPR-compliant, trilingual.
 * File path: /components/analytics/cookie-banner.tsx
 *
 * Fixed-bottom bar asking for consent; hidden once the visitor decides.
 * Mounted once in the root layout (which wraps all locale trees), so it
 * localizes itself from the pathname: /en… → English, /nl… → Dutch
 * (formal "u" — Flemish B2B register), anything else → Polish. Links go
 * to the locale-correct privacy + cookie policy routes.
 *
 * RODO constraints baked in:
 *   - accept and reject carry EQUAL visual weight (same .btn class) —
 *     no dark-pattern "big accept / tiny reject"
 *   - nothing loads before a decision (see consent-provider.tsx)
 *   - both policies are one click away
 *
 * Design-system constraints: hard edges (no radius), black bar with a
 * hairline top border, .btn buttons (≥44px touch targets). No focus trap
 * — the page stays usable behind the bar; role="dialog" + aria-label
 * announce it to assistive tech.
 */

import { usePathname } from "next/navigation";

import { routes, type SiteLocale } from "@/lib/i18n-routes";
import { useConsent } from "./consent-provider";

type BannerCopy = {
  ariaLabel: string;
  heading: string;
  body: string;
  privacyLabel: string;
  cookiesLabel: string;
  accept: string;
  reject: string;
};

const COPY: Record<SiteLocale, BannerCopy> = {
  pl: {
    ariaLabel: "Zgoda na pliki cookie",
    heading: "Ta strona używa plików cookie",
    body: "Pliki niezbędne działają zawsze. Statystyka i marketing — tylko za Twoją zgodą. Zgodę możesz cofnąć w każdej chwili.",
    privacyLabel: "Polityka prywatności",
    cookiesLabel: "Polityka cookies",
    accept: "Akceptuję wszystkie",
    reject: "Tylko niezbędne",
  },
  en: {
    ariaLabel: "Cookie consent",
    heading: "This site uses cookies",
    body: "Essential cookies always run. Analytics and marketing — only with your consent. You can withdraw it at any time.",
    privacyLabel: "Privacy policy",
    cookiesLabel: "Cookie policy",
    accept: "Accept all",
    reject: "Essential only",
  },
  nl: {
    ariaLabel: "Toestemming voor cookies",
    heading: "Deze site gebruikt cookies",
    body: "Noodzakelijke cookies staan altijd aan. Statistiek en marketing — enkel met uw toestemming. U kunt uw toestemming op elk moment intrekken.",
    privacyLabel: "Privacybeleid",
    cookiesLabel: "Cookiebeleid",
    accept: "Alles aanvaarden",
    reject: "Enkel noodzakelijke",
  },
};

function localeFromPath(pathname: string | null): SiteLocale {
  if (pathname === "/en" || pathname?.startsWith("/en/")) return "en";
  if (pathname === "/nl" || pathname?.startsWith("/nl/")) return "nl";
  return "pl";
}

export function CookieBanner() {
  const { hasInteracted, accept, reject } = useConsent();
  const pathname = usePathname();

  if (hasInteracted) return null;

  const locale = localeFromPath(pathname);
  const t = COPY[locale];

  return (
    <div
      role="dialog"
      aria-label={t.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-line-dark bg-black text-white"
    >
      <div className="container-sm flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between md:py-6">
        <div className="max-w-2xl">
          <h2 className="text-[15px] font-bold uppercase tracking-wide">
            {t.heading}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-on-dark-soft">
            {t.body}{" "}
            <a
              href={routes.privacy[locale]}
              className="underline underline-offset-4 transition-colors hover:text-white"
            >
              {t.privacyLabel}
            </a>
            {" · "}
            <a
              href={routes.cookies[locale]}
              className="underline underline-offset-4 transition-colors hover:text-white"
            >
              {t.cookiesLabel}
            </a>
          </p>
        </div>

        {/* Equal weight by design — identical class on both (RODO). */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-none">
          <button
            type="button"
            onClick={() => accept()}
            aria-label={t.accept}
            className="btn btn-ghost-light"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => reject()}
            aria-label={t.reject}
            className="btn btn-ghost-light"
          >
            {t.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
