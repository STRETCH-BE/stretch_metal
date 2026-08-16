/**
 * Brand logo lockup — typographic "STRETCHMETAL" with the red pixel accent.
 * File path: /components/ui/logo.tsx
 *
 * Pure typography, styled like the STRETCH group wordmark: Archivo at
 * wdth 125, 900 weight, uppercase, tight tracking. "STRETCH" carries the
 * brand red, "METAL" flips black/white per surface, and a red square
 * (the group's pixel motif) closes the lockup. No SVG asset needed.
 */

import Link from "next/link";
import { routes } from "@/lib/i18n-routes";

const ARIA_LABELS: Record<"pl" | "en" | "nl", string> = {
  pl: "StretchMetal — strona główna",
  en: "StretchMetal — home",
  nl: "StretchMetal — startpagina",
};

type Props = {
  tone?: "on-dark" | "on-light";
  /** Pixel font size for the wordmark — default 20 (nav), pass 24 in footer. */
  size?: number;
  /** Locale of the surrounding page — points the link at that locale's home. */
  locale?: "pl" | "en" | "nl";
  className?: string;
};

export function Logo({
  tone = "on-dark",
  size = 20,
  locale = "pl",
  className = "",
}: Props) {
  const metalColor = tone === "on-light" ? "text-black" : "text-white";
  return (
    <Link
      href={routes.home[locale]}
      aria-label={ARIA_LABELS[locale]}
      className={`inline-flex items-baseline font-black uppercase leading-none tracking-[-0.03em] ${className}`.trim()}
      style={{
        fontSize: size,
        fontFamily: "var(--font-display)",
        fontVariationSettings: "'wdth' 125",
      }}
    >
      <span className="text-red">STRETCH</span>
      <span className={metalColor}>METAL</span>
      <span
        aria-hidden="true"
        className="ml-[4px] inline-block bg-red"
        style={{ width: size * 0.28, height: size * 0.28 }}
      />
    </Link>
  );
}
