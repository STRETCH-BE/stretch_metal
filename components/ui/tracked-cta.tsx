"use client";

/**
 * Tracked CTA — wraps a link with analytics tracking.
 * File path: /components/ui/tracked-cta.tsx
 *
 * Renders an <a> for external/anchor/tel:/mailto: links and a Next <Link>
 * for internal routes. Fires the named event on click via /lib/analytics.ts
 * (a no-op until the visitor grants consent and keys are configured).
 *
 *   <TrackedCTA event="cta_click" props={{ location: "hero" }} href="/wycena">
 *     Wyślij rysunek
 *   </TrackedCTA>
 */

import Link from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";
import { track } from "@/lib/analytics";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  event: string;
  props?: Record<string, string | number | boolean | undefined>;
  href: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function TrackedCTA({
  event,
  props,
  href,
  children,
  onClick,
  ...rest
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track(event, props);
    onClick?.(e);
  };

  // External, anchor, tel:, mailto:, or hash links → plain <a>
  const isExternal =
    /^(https?:|tel:|mailto:|#)/.test(href) || href.startsWith("//");

  if (isExternal) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
