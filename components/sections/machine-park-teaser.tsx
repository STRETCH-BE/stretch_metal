/**
 * MachineParkTeaser — dark hairline grid of machine highlights.
 * File path: /components/sections/machine-park-teaser.tsx
 *
 * Server component, copy-free (HomeContent["machinePark"]). Black section
 * with .grid-lines grid-lines-dark; each bg-black cell lists one machine:
 * type (small uppercase), name, then spec rows separated by dark hairlines.
 * Ends with a ghost-light link to the full machine-park page.
 *
 * Highlights are a short inline subset — the complete inventory lives in
 * /content/machines.ts and renders on /park-maszynowy. Machine specs are
 * [CONFIRM] placeholders, flagged in the content files.
 */

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { routes } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["machinePark"];
  locale: Locale;
  /** Eyebrow number — default "04"; pages may reorder. */
  number?: string;
};

export function MachineParkTeaser({ content, locale, number = "04" }: Props) {
  /* Literal class names in both branches — Tailwind must see them. */
  const desktopCols =
    content.highlights.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section className="section section-dark">
      <Container>
        <FadeIn className="max-w-[820px]">
          <Eyebrow number={number}>{content.eyebrow}</Eyebrow>
          <SectionTitle>{content.title}</SectionTitle>
          <p className="lead mt-6 max-w-[560px]">{content.lead}</p>
        </FadeIn>

        <ul
          className={`grid-lines grid-lines-dark mt-12 grid-cols-1 sm:grid-cols-2 ${desktopCols}`}
        >
          {content.highlights.map((machine, i) => (
            <FadeIn
              key={machine.name}
              as="li"
              delay={i * 90}
              className="flex flex-col bg-black p-7"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-on-dark-muted">
                {machine.type}
              </span>
              <h3 className="h3 mt-2.5 text-white">{machine.name}</h3>

              <dl className="mt-6 border-t border-line-dark">
                {machine.specs.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line-dark py-2.5 text-[13px]"
                  >
                    <dt className="text-on-dark-muted">{row.label}</dt>
                    <dd className="text-right font-semibold text-white">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          ))}
        </ul>

        <FadeIn delay={120} className="mt-10">
          <Button href={routes.machinePark[locale]} variant="ghost-light" arrow>
            {content.linkLabel}
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
