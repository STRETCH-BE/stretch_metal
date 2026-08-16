/**
 * WhyUs — four arguments in a hairline grid.
 * File path: /components/sections/why-us.tsx
 *
 * Server component, copy-free (HomeContent["whyUs"]). Off-white
 * .section-surface with .grid-lines: four bg-white cells, each opening
 * with the red square .tick, then title + description. The four arguments
 * (Western group standards / Polish economics / Częstochowa + A1 /
 * drawing-to-coated-part) live in the content files.
 */

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/ui/fade-in";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["whyUs"];
  /** Eyebrow number — default "05"; pages may reorder. */
  number?: string;
};

export function WhyUs({ content, number = "05" }: Props) {
  return (
    <section className="section section-surface">
      <Container>
        <FadeIn className="max-w-[820px]">
          <Eyebrow number={number}>{content.eyebrow}</Eyebrow>
          <SectionTitle>{content.title}</SectionTitle>
        </FadeIn>

        <ul className="grid-lines mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, i) => (
            <FadeIn
              key={i}
              as="li"
              delay={i * 90}
              className="bg-white p-7 md:p-8"
            >
              <span aria-hidden="true" className="tick block" />
              <h3 className="mt-5 text-[16px] font-bold leading-snug">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
