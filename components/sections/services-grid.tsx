/**
 * ServicesGrid — the six services in the signature hairline grid.
 * File path: /components/sections/services-grid.tsx
 *
 * Server component, copy-free (HomeContent["services"]). Light section:
 * eyebrow (default 02) + accented title + lead, then .grid-lines with one
 * bg-white cell per service — red two-digit index, line-art ServiceIcon,
 * name, short description, capability MetaChips, and an arrow link to the
 * service page via servicePath(key, locale).
 *
 * `showAll`: pass true on the services hub page itself — it suppresses the
 * "all services" hub CTA (content.linkLabel), which would link to the page
 * the visitor is already on. The grid always renders every card.
 *
 * CARD_LINK_LABEL: ServiceCard carries no per-card link label, so the
 * „Zobacz usługę" / "View service" microcopy is the one locale literal
 * this component owns (mandated by the build contract).
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { MetaChip } from "@/components/ui/meta-chip";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { routes, servicePath } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["services"];
  locale: Locale;
  /** True on the services hub page — hides the hub CTA link. */
  showAll?: boolean;
  /** Eyebrow number — default "02"; pages may reorder. */
  number?: string;
};

const CARD_LINK_LABEL: Record<Locale, string> = {
  pl: "Zobacz usługę",
  en: "View service",
  nl: "Bekijk dienst",
};

/** Wraps the accent substring of a title in the single allowed red span. */
function withAccent(title: string, accent?: string): ReactNode {
  if (!accent) return title;
  const at = title.indexOf(accent);
  if (at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-red">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  );
}

export function ServicesGrid({
  content,
  locale,
  showAll = false,
  number = "02",
}: Props) {
  return (
    <section className="section">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <FadeIn className="max-w-[720px]">
            <Eyebrow number={number}>{content.eyebrow}</Eyebrow>
            <SectionTitle>{withAccent(content.title, content.accent)}</SectionTitle>
            <p className="lead mt-6 max-w-[560px]">{content.lead}</p>
          </FadeIn>

          {!showAll && (
            <FadeIn delay={120} className="shrink-0">
              <Button href={routes.services[locale]} variant="ghost" arrow>
                {content.linkLabel}
              </Button>
            </FadeIn>
          )}
        </div>

        <ul className="grid-lines mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card, i) => (
            <FadeIn
              key={card.key}
              as="li"
              delay={(i % 3) * 90}
              className="flex flex-col bg-white p-7 md:p-8"
            >
              <div className="flex items-start justify-between">
                <ServiceIcon service={card.key} size={34} />
                <span
                  aria-hidden="true"
                  className="text-[13px] font-black tracking-[0.16em] text-red"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="h3 mt-6">{card.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                {card.short}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <MetaChip key={tag} tone="light">
                    {tag}
                  </MetaChip>
                ))}
              </div>

              <Link
                href={servicePath(card.key, locale)}
                className="lnk mt-auto inline-flex w-fit items-center gap-2 pt-7 text-[12.5px] font-bold uppercase tracking-[0.1em] text-black"
              >
                {CARD_LINK_LABEL[locale]}
                <span aria-hidden="true" className="text-red">
                  →
                </span>
              </Link>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
