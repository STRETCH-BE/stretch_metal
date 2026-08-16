/**
 * CtaFinal — closing black band that points everything at the RFQ form.
 * File path: /components/sections/cta-final.tsx
 *
 * Server component, copy-free (HomeContent["ctaFinal"]). Display-tier
 * heading with the single red accent word, short lead, then two actions:
 * primary → the locale's RFQ route (`cta_click` {location:"cta_final"}),
 * ghost-light → contact. No form here — the RFQ page owns the form; this
 * band exists only to hand traffic to it.
 */

import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { routes } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["ctaFinal"];
  locale: Locale;
};

/** Wraps the accent substring of the title in the single allowed red span. */
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

export function CtaFinal({ content, locale }: Props) {
  return (
    <section className="section section-dark">
      <Container>
        <FadeIn>
          <SectionTitle size="display" className="max-w-[1000px]">
            {withAccent(content.title, content.accent)}
          </SectionTitle>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="lead mt-8 max-w-[560px]">{content.lead}</p>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <TrackedCTA
              event="cta_click"
              props={{ location: "cta_final", label: content.cta }}
              href={routes.rfq[locale]}
              className="btn btn-primary btn-lg"
            >
              {content.cta}
              <span aria-hidden="true" className="btn-arrow">
                →
              </span>
            </TrackedCTA>

            <Button
              href={routes.contact[locale]}
              variant="ghost-light"
              size="lg"
            >
              {content.ctaSecondary}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
