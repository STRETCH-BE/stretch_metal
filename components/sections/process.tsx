/**
 * Process — five numbered steps from file to delivery.
 * File path: /components/sections/process.tsx
 *
 * Server component, copy-free (HomeContent["process"]). Reused on the home
 * page, RFQ page and service pages, hence the `tone` prop: "light" (white,
 * default) or "surface" (off-white .section-surface) so it can slot into
 * either rhythm — cells stay bg-white in both, keeping the hairlines
 * visible.
 *
 * Steps sit in a .grid-lines row (1 → 2 → 5 columns) with an oversized red
 * index per cell — numbers derive from array order, never from copy. Ends
 * with the primary CTA → the locale's RFQ route (`cta_click`
 * {location:"process"}).
 */

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { TrackedCTA } from "@/components/ui/tracked-cta";
import { FadeIn } from "@/components/ui/fade-in";
import { routes } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["process"];
  locale: Locale;
  /** Section background — "light" (white) or "surface" (off-white). */
  tone?: "light" | "surface";
  /** Eyebrow number — default "03"; pages may reorder. */
  number?: string;
};

export function Process({
  content,
  locale,
  tone = "surface",
  number = "03",
}: Props) {
  return (
    <section
      className={`section ${tone === "surface" ? "section-surface" : ""}`.trim()}
    >
      <Container>
        <FadeIn className="max-w-[820px]">
          <Eyebrow number={number}>{content.eyebrow}</Eyebrow>
          <SectionTitle>{content.title}</SectionTitle>
          <p className="lead mt-6 max-w-[560px]">{content.lead}</p>
        </FadeIn>

        <ol className="grid-lines mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {content.steps.map((step, i) => (
            <FadeIn
              key={i}
              as="li"
              delay={i * 80}
              className="flex flex-col bg-white p-6 md:p-7"
            >
              <span
                aria-hidden="true"
                className="h2-sm block text-red"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[16px] font-bold leading-snug">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">
                {step.description}
              </p>
            </FadeIn>
          ))}
        </ol>

        <FadeIn delay={120} className="mt-10">
          <TrackedCTA
            event="cta_click"
            props={{ location: "process", label: content.cta }}
            href={routes.rfq[locale]}
            className="btn btn-primary"
          >
            {content.cta}
            <span aria-hidden="true" className="btn-arrow">
              →
            </span>
          </TrackedCTA>
        </FadeIn>
      </Container>
    </section>
  );
}
