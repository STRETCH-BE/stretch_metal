"use client";

/**
 * Top navigation — sticky black bar.
 * File path: /components/sections/nav.tsx
 *
 * Client component: mobile-menu state + usePathname for the active-link
 * red underline. Copy-free — all labels and hrefs arrive via `content`
 * (NavContent from /content/ui.ts per locale).
 *
 * Structure: Logo left · desktop links · language switcher · primary CTA
 * (TrackedCTA `cta_click` {location:"nav"} → the locale's RFQ route).
 *
 * Mobile menu: hamburger with aria-expanded/aria-controls, full-screen
 * black overlay, Escape closes and returns focus to the toggle, body
 * scroll locked while open, route change closes it. No open/close
 * transition — the identity allows no motion beyond FadeIn + ticker.
 *
 * A11Y_LABELS: skip-link + nav aria-labels are chrome plumbing, not page
 * copy, and NavContent has no fields for them — the only locale literals
 * this component carries (flagged in the build report).
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { routes } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type { NavContent } from "@/content/types";

type Props = {
  content: NavContent;
  locale: Locale;
  /** Override for the active-link check — defaults to usePathname(). */
  currentPath?: string;
};

const A11Y_LABELS: Record<Locale, { skip: string; nav: string }> = {
  pl: { skip: "Przejdź do treści", nav: "Nawigacja główna" },
  en: { skip: "Skip to content", nav: "Main navigation" },
};

export function Nav({ content, locale, currentPath }: Props) {
  const routerPath = usePathname();
  const pathname = currentPath ?? routerPath;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const a11y = A11Y_LABELS[locale];
  const rfqHref = routes.rfq[locale];

  /* Close on route change (link clicks also close eagerly below). */
  useEffect(() => {
    setOpen(false);
  }, [routerPath]);

  /* Escape closes the menu and hands focus back to the toggle. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Body scroll lock while the overlay is up. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /** Active when on the page or anywhere below it (e.g. /uslugi/spawanie). */
  const isActive = (href: string) => {
    if (href === routes.home.pl || href === routes.home.en) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <a href="#main" className="skip-link">
        {a11y.skip}
      </a>

      <nav
        aria-label={a11y.nav}
        className="sticky top-0 z-50 border-b border-line-dark bg-black text-white"
      >
        <div className="container-sm flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo tone="on-dark" size={20} />

          {/* Desktop links — active link gets the red text + red underline. */}
          <ul className="hidden items-center gap-7 lg:flex">
            {content.links.map((link) => (
              <li key={link.href} className="flex h-[var(--header-h)]">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`inline-flex items-center border-b-2 px-1 text-[12.5px] font-bold uppercase tracking-[0.08em] transition-colors ${
                    isActive(link.href)
                      ? "border-red text-red-bright"
                      : "border-transparent text-on-dark-soft hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href={content.switcher.href}
              className="inline-flex min-h-[44px] items-center border border-line-dark px-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-on-dark-soft transition-colors hover:border-white hover:text-white"
            >
              {content.switcher.label}
            </Link>

            <TrackedCTA
              event="cta_click"
              props={{ location: "nav", label: content.cta }}
              href={rfqHref}
              className="btn btn-primary btn-sm"
            >
              {content.cta}
              <span aria-hidden="true" className="btn-arrow">
                →
              </span>
            </TrackedCTA>
          </div>

          {/* Hamburger — 44px target, hard-edged bars. */}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? content.menuClose : content.menuOpen}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              aria-hidden="true"
              className={`block h-[2px] w-6 bg-white ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              aria-hidden="true"
              className={`block h-[2px] w-6 bg-white ${open ? "opacity-0" : ""}`}
            />
            <span
              aria-hidden="true"
              className={`block h-[2px] w-6 bg-white ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay — rendered only while open so it never traps focus
          or leaks into the accessibility tree when closed. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-black pt-[var(--header-h)] text-white lg:hidden"
        >
          <div className="container-sm flex min-h-[calc(100svh-var(--header-h))] flex-col pb-10 pt-8">
            <ul className="flex flex-col border-t border-line-dark">
              {content.links.map((link) => (
                <li key={link.href} className="border-b border-line-dark">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`h2-sm block py-4 ${
                      isActive(link.href) ? "text-red-bright" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-5 pt-10">
              <Link
                href={content.switcher.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[44px] w-fit items-center border border-line-dark px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-on-dark-soft"
              >
                {content.switcher.label}
              </Link>

              <TrackedCTA
                event="cta_click"
                props={{ location: "nav_mobile", label: content.cta }}
                href={rfqHref}
                onClick={() => setOpen(false)}
                className="btn btn-primary btn-lg w-full"
              >
                {content.cta}
                <span aria-hidden="true" className="btn-arrow">
                  →
                </span>
              </TrackedCTA>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
