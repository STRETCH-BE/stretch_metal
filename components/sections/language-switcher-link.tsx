"use client";

/**
 * Language-switcher link — tiny client island for server components.
 * File path: /components/sections/language-switcher-link.tsx
 *
 * Reads usePathname() and links to the EQUIVALENT page in the target
 * locale via alternatePath, so switching language never resets the
 * visitor to the homepage. Kept as its own component so the footer
 * (its only consumer) stays a server component.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternatePath } from "@/lib/i18n-routes";

type Props = {
  /** Locale to switch TO. */
  target: "pl" | "en";
  label: string;
  className?: string;
};

export function LanguageSwitcherLink({ target, label, className }: Props) {
  const pathname = usePathname();
  return (
    <Link href={alternatePath(pathname, target)} className={className}>
      {label}
    </Link>
  );
}
