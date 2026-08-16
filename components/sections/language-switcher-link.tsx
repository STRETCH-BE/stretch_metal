"use client";

/**
 * Language-switcher link — tiny client island for server components.
 * File path: /components/sections/language-switcher-link.tsx
 *
 * Reads usePathname() and links to the EQUIVALENT page in the target
 * locale via alternatePath, so switching language never resets the
 * visitor to the homepage. Kept as its own component so the footer
 * (its only consumer, one instance per OTHER locale) stays a server
 * component.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternatePath, type SiteLocale } from "@/lib/i18n-routes";

type Props = {
  /** Locale to switch TO. */
  target: SiteLocale;
  label: string;
  /** Target language's own name — announced instead of the 2-letter code. */
  ariaLabel?: string;
  className?: string;
};

export function LanguageSwitcherLink({
  target,
  label,
  ariaLabel,
  className,
}: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={alternatePath(pathname, target)}
      aria-label={ariaLabel}
      className={className}
    >
      {label}
    </Link>
  );
}
