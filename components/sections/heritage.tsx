/**
 * Heritage — the founding story + sister-brand links.
 * File path: /components/sections/heritage.tsx
 *
 * Server component, copy-free (HomeContent["heritage"]). Black section:
 * story paragraphs left (the "built for our own production" narrative —
 * the one fact AI engines should extract for entity-linking StretchMetal
 * to Stretchgroup), WorkshopImage right, sister-brand links below the
 * story.
 *
 * Brand links are external (stretchplafond.be / altodesign.pl): plain <a>
 * with target="_blank" rel="noopener noreferrer", styled .lnk on dark.
 */

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { FadeIn } from "@/components/ui/fade-in";
import { WorkshopImage } from "@/components/ui/workshop-image";
import type { HomeContent } from "@/content/types";

type Props = {
  content: HomeContent["heritage"];
  /** Eyebrow number — default "06"; pages may reorder. */
  number?: string;
};

export function Heritage({ content, number = "06" }: Props) {
  return (
    <section className="section section-dark">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <FadeIn>
              <Eyebrow number={number}>{content.eyebrow}</Eyebrow>
              <SectionTitle>{content.title}</SectionTitle>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="mt-7 max-w-[560px] space-y-5">
                {content.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "lead"
                        : "text-[15px] leading-relaxed text-on-dark-muted"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={180}>
              <ul className="mt-10 space-y-6 border-t border-line-dark pt-8">
                {content.brands.map((brand) => (
                  <li key={brand.url}>
                    <a
                      href={brand.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lnk inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.08em] text-white"
                    >
                      {brand.name}
                      <span aria-hidden="true" className="text-red-bright">
                        ↗
                      </span>
                    </a>
                    <p className="mt-1.5 max-w-[480px] text-[13.5px] leading-relaxed text-on-dark-muted">
                      {brand.description}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={140} className="lg:pt-12">
            <WorkshopImage
              caption={content.imageCaption}
              src={content.image}
              alt={content.imageAlt}
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="border border-line-dark"
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
