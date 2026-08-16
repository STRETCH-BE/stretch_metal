"use client";

/**
 * MobileStickyCta — bottom-pinned two-button bar, mobile only.
 * File path: /components/sections/mobile-sticky-cta.tsx
 *
 * Client component: usePathname decides visibility — the bar returns null
 * on the RFQ routes (all three locales, thank-you subpaths included),
 * where the form itself is the CTA and a competing bar would cover its
 * submit.
 *
 * Two equal hard-edged halves, h-14 (56px targets): black tel: button
 * (`phone_click` {location:"sticky"}) and red RFQ button (`cta_click`
 * {location:"sticky"}), split by a dark hairline. Safe-area inset padding
 * for gesture-nav phones. md:hidden — desktop carries the nav CTA.
 *
 * Self-contained by contract: pages add their own bottom padding to keep
 * content clear of the bar; no body-padding wrapper here.
 */

import { usePathname } from "next/navigation";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { routes } from "@/lib/i18n-routes";
import { siteConfig, type Locale } from "@/lib/site-config";
import type { StickyCtaContent } from "@/content/types";

type Props = {
  content: StickyCtaContent;
  locale: Locale;
};

export function MobileStickyCta({ content, locale }: Props) {
  const pathname = usePathname();

  /* Hidden on RFQ routes in any locale — prefix match also covers the
     thank-you subpaths (/wycena/dziekujemy, /en/quote/thank-you,
     /nl/offerte/bedankt). */
  if (
    pathname.startsWith(routes.rfq.pl) ||
    pathname.startsWith(routes.rfq.en) ||
    pathname.startsWith(routes.rfq.nl)
  ) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-black pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex h-14 items-stretch">
        <TrackedCTA
          event="phone_click"
          props={{ location: "sticky" }}
          href={`tel:${siteConfig.contact.phone}`}
          className="flex flex-1 items-center justify-center gap-2.5 border-r border-line-dark bg-black text-[13px] font-bold uppercase tracking-[0.06em] text-white"
        >
          {content.call}
        </TrackedCTA>

        <TrackedCTA
          event="cta_click"
          props={{ location: "sticky", label: content.rfq }}
          href={routes.rfq[locale]}
          className="flex flex-1 items-center justify-center gap-2.5 bg-red text-[13px] font-bold uppercase tracking-[0.06em] text-white"
        >
          {content.rfq}
          <span aria-hidden="true">→</span>
        </TrackedCTA>
      </div>
    </div>
  );
}
