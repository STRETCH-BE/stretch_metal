/**
 * Stats — hairline-grid band of oversized numbers.
 * File path: /components/sections/stats.tsx
 *
 * Server component, copy-free (HomeContent["stats"]). White section with
 * the signature .grid-lines texture: 2 columns on mobile, 4 (or 5 when a
 * fifth stat exists) on desktop; each cell is bg-white so the 1px lines
 * show through. Huge value + small uppercase label per cell.
 *
 * All stat values are [CONFIRM] placeholders — flagged in the content
 * files, not here; this component renders whatever it is given.
 */

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeIn } from "@/components/ui/fade-in";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["stats"];
  /** Eyebrow number — default "01"; pages may reorder. */
  number?: string;
};

export function Stats({ content, number = "01" }: Props) {
  /* Both branches are literal class names so Tailwind can generate them. */
  const desktopCols =
    content.items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <section className="section">
      <Container>
        <FadeIn>
          <Eyebrow number={number}>{content.eyebrow}</Eyebrow>
        </FadeIn>

        <ul className={`grid-lines mt-8 grid-cols-2 ${desktopCols}`}>
          {content.items.map((stat, i) => (
            <FadeIn
              key={i}
              as="li"
              delay={i * 80}
              className="bg-white p-6 md:p-8"
            >
              <span className="h2-sm block">{stat.value}</span>
              <span className="mt-3 block text-[11.5px] font-bold uppercase tracking-[0.14em] text-text-faint">
                {stat.label}
              </span>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
