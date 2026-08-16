/**
 * Hero — full-height black opening statement.
 * File path: /components/sections/hero.tsx
 *
 * Server component; the only client leaves are TrackedCTA and FadeIn.
 * Copy-free — everything (badge, stacked headline words, lead, CTA labels,
 * image caption) arrives via `content` (HomeContent["hero"]).
 *
 * Headline: content.words render as stacked display lines; the word at
 * content.accentIndex is the single red accent the identity allows.
 *
 * Layout: .section-dark at min-h 100svh minus the sticky header, copy left,
 * WorkshopImage placeholder right (priority — LCP candidate once a real
 * photo lands). Primary CTA fires `cta_click` {location:"hero"} → RFQ;
 * secondary is a ghost link to the services hub.
 */

import { Container } from "@/components/ui/container";
import { MetaChip } from "@/components/ui/meta-chip";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { WorkshopImage } from "@/components/ui/workshop-image";
import { routes } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["hero"];
  locale: Locale;
};

export function Hero({ content, locale }: Props) {
  return (
    <section className="section-dark flex min-h-[calc(100svh-var(--header-h))] items-center py-14 md:py-20">
      <Container className="w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Copy block */}
          <div>
            <FadeIn>
              <MetaChip tone="dark" className="mb-7">
                {content.badge}
              </MetaChip>
            </FadeIn>

            <FadeIn delay={60}>
              <h1 className="h-display">
                {content.words.map((word, i) => (
                  <span
                    key={i}
                    className={`block ${i === content.accentIndex ? "text-red" : ""}`.trim()}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </FadeIn>

            <FadeIn delay={140}>
              <p className="lead mt-7 max-w-[520px]">{content.lead}</p>
            </FadeIn>

            <FadeIn delay={220}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <TrackedCTA
                  event="cta_click"
                  props={{ location: "hero", label: content.ctaPrimary }}
                  href={routes.rfq[locale]}
                  className="btn btn-primary btn-lg"
                >
                  {content.ctaPrimary}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </TrackedCTA>

                <Button
                  href={routes.services[locale]}
                  variant="ghost-light"
                  size="lg"
                >
                  {content.ctaSecondary}
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Photo slot — hairline frame keeps the placeholder anchored to
              the grid texture until real photography arrives. */}
          <FadeIn delay={160}>
            <WorkshopImage
              caption={content.imageCaption}
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              className="border border-line-dark"
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
