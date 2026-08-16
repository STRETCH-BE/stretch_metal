/**
 * Footer — black hairline-grid columns + legal bar.
 * File path: /components/sections/footer.tsx
 *
 * Server component, copy-free (FooterContent from /content/ui.ts per
 * locale); contact data comes from siteConfig, never hardcoded. Four
 * bg-black cells in .grid-lines grid-lines-dark: brand/group (Logo 24 +
 * sister-brand links, external with rel="noopener noreferrer"), services,
 * company, contact (address, phone as TrackedCTA `phone_click`, email as
 * TrackedCTA `cta_click`, hours).
 *
 * Legal bar below the grid: legalLine, legal links, and the language
 * switcher — FooterContent carries no switcher field, so the PL/EN link is
 * derived from `locale` + routes (locale codes, not copy).
 */

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { routes } from "@/lib/i18n-routes";
import { siteConfig, type Locale } from "@/lib/site-config";
import type { FooterContent } from "@/content/types";

type Props = {
  content: FooterContent;
  locale: Locale;
};

/** Uppercase hairline column heading. */
function ColumnTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mb-5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-on-dark-muted ${className}`.trim()}
    >
      {children}
    </h2>
  );
}

const footerLink =
  "block py-1.5 text-sm text-on-dark-soft transition-colors hover:text-white";

export function Footer({ content, locale }: Props) {
  const switcher =
    locale === "pl"
      ? { label: "EN", href: routes.home.en }
      : { label: "PL", href: routes.home.pl };

  return (
    <footer className="bg-black py-14 text-white md:py-20">
      <Container>
        <div className="grid-lines grid-lines-dark grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + group */}
          <div className="bg-black p-7 md:p-8">
            <Logo tone="on-dark" size={24} />
            <ColumnTitle className="mt-7">{content.group.title}</ColumnTitle>
            <p className="text-sm leading-relaxed text-on-dark-muted">
              {content.group.description}
            </p>
            <ul className="mt-5 space-y-2.5">
              {content.group.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lnk inline-flex items-center gap-2 py-1 text-[13px] font-bold uppercase tracking-[0.06em] text-on-dark-soft transition-colors hover:text-white"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-red-bright">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="bg-black p-7 md:p-8">
            <ColumnTitle>{content.services.title}</ColumnTitle>
            <ul>
              {content.services.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="bg-black p-7 md:p-8">
            <ColumnTitle>{content.company.title}</ColumnTitle>
            <ul>
              {content.company.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-black p-7 md:p-8">
            <ColumnTitle>{content.contact.title}</ColumnTitle>
            <address className="text-sm not-italic leading-relaxed text-on-dark-soft">
              {content.contact.addressLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </address>

            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-dark-muted">
                  {content.contact.phoneLabel}
                </dt>
                <dd>
                  <TrackedCTA
                    event="phone_click"
                    props={{ location: "footer" }}
                    href={`tel:${siteConfig.contact.phone}`}
                    className="lnk inline-block py-1 font-semibold text-white"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </TrackedCTA>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-dark-muted">
                  {content.contact.emailLabel}
                </dt>
                <dd>
                  <TrackedCTA
                    event="cta_click"
                    props={{ location: "footer", label: "email" }}
                    href={`mailto:${siteConfig.contact.email}`}
                    className="lnk inline-block py-1 font-semibold text-white"
                  >
                    {siteConfig.contact.email}
                  </TrackedCTA>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-on-dark-muted">
                  {content.contact.hoursLabel}
                </dt>
                <dd className="py-1 text-on-dark-soft">
                  {content.contact.hours}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-line-dark pt-6 text-[12px] text-on-dark-muted md:flex-row md:items-center">
          <p className="max-w-[640px]">
            © {new Date().getFullYear()} {siteConfig.name}. {content.legalLine}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {content.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-1 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={switcher.href}
                className="inline-block border border-line-dark px-2.5 py-1 font-bold uppercase tracking-[0.14em] text-on-dark-soft transition-colors hover:border-white hover:text-white"
              >
                {switcher.label}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
