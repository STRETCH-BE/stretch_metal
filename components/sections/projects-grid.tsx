/**
 * ProjectsGrid — sample-work cards with placeholder photography.
 * File path: /components/sections/projects-grid.tsx
 *
 * Server component, copy-free. Section chrome (eyebrow/title/lead/link
 * label) comes from HomeContent["projects"]; the cards from the Project[]
 * array (/content/projects.ts) so home and /realizacje share one renderer —
 * `limit` trims the list for the home teaser.
 *
 * White section, plain card grid (the hairline-grid texture is reserved
 * for services / machines / stats / footer). Each card: WorkshopImage
 * (placeholder caption until real photos land), title, MetaChips for
 * services + material + finish, description. Bottom link → the projects
 * page; omitted when no `limit` is set (the full-list page links nowhere).
 */

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";
import { MetaChip } from "@/components/ui/meta-chip";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { WorkshopImage } from "@/components/ui/workshop-image";
import { routes } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";
import type { HomeContent, Project } from "@/content/types";

type Props = {
  content: HomeContent["projects"];
  projects: Project[];
  locale: Locale;
  /** Render only the first N projects (home teaser). Omit for all. */
  limit?: number;
  /** Eyebrow number — default "07"; pages may reorder. */
  number?: string;
};

export function ProjectsGrid({
  content,
  projects,
  locale,
  limit,
  number = "07",
}: Props) {
  const visible = limit ? projects.slice(0, limit) : projects;
  const isTeaser = typeof limit === "number";

  return (
    <section className="section">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <FadeIn className="max-w-[720px]">
            <Eyebrow number={number}>{content.eyebrow}</Eyebrow>
            <SectionTitle>{content.title}</SectionTitle>
            <p className="lead mt-6 max-w-[560px]">{content.lead}</p>
          </FadeIn>

          {isTeaser && (
            <FadeIn delay={120} className="shrink-0">
              <Button href={routes.projects[locale]} variant="ghost" arrow>
                {content.linkLabel}
              </Button>
            </FadeIn>
          )}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <FadeIn key={project.title} as="li" delay={(i % 3) * 90}>
              <article className="flex h-full flex-col">
                <WorkshopImage
                  caption={project.imageCaption}
                  src={project.image}
                  alt={project.title}
                  aspect="aspect-[3/2]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <h3 className="h3 mt-5">{project.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[...project.services, project.material, project.finish].map(
                    (tag) => (
                      <MetaChip key={tag} tone="light">
                        {tag}
                      </MetaChip>
                    )
                  )}
                </div>
                <p className="mt-3.5 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
