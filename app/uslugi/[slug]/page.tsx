/**
 * Service detail page — Polish, `/uslugi/[slug]`.
 * File path: /app/uslugi/[slug]/page.tsx
 *
 * Statically generates the six PL service slugs (spawanie, ciecie-laserowe,
 * obrobka-cnc, malowanie-proszkowe, projektowanie, konstrukcje-stalowe)
 * from lib/i18n-routes and renders each through the shared <ServicePage>
 * template with /content/services.ts data. Unknown slugs → notFound().
 *
 * Metadata comes from the content file (metaTitle ≤45 chars so the
 * "| StretchMetal" template suffix keeps the tag ≤60; metaDescription
 * ≤155). Canonical + hreflang derive from servicePaths(entry), so a slug
 * change in i18n-routes propagates here untouched.
 *
 * Schema: Service + BreadcrumbList (Strona główna → Usługi → name) here;
 * FAQPage renders inside the ServicePage template (it owns the FAQ data).
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs, buildService } from "@/lib/schema";
import { defaultOgImages, siteConfig } from "@/lib/site-config";
import {
  findService,
  languageAlternates,
  routes,
  servicePaths,
  serviceSlugs,
} from "@/lib/i18n-routes";

import { serviceCards, services } from "@/content/services";
import { home } from "@/content/home";
import { footer, nav, stickyCta } from "@/content/ui";

import { ServicePage } from "@/components/sections/service-page";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return serviceSlugs.map((s) => ({ slug: s.pl }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findService("pl", slug);
  if (!entry) return {};

  const content = services[entry.key];
  const paths = servicePaths(entry);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: paths.pl,
      languages: languageAlternates(paths),
    },
    openGraph: {
      title: `${content.metaTitle} | ${siteConfig.name}`,
      description: content.metaDescription,
      url: `${siteConfig.url}${paths.pl}`,
      siteName: siteConfig.name,
      locale: "pl_PL",
      type: "website",
      images: defaultOgImages,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const entry = findService("pl", slug);
  if (!entry) notFound();

  const content = services[entry.key];
  const paths = servicePaths(entry);

  return (
    <>
      <JsonLd
        data={buildService({
          name: content.name,
          description: content.metaDescription,
          path: paths.pl,
        })}
      />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Strona główna", url: siteConfig.url },
          { name: "Usługi", url: `${siteConfig.url}${routes.services.pl}` },
          { name: content.name, url: `${siteConfig.url}${paths.pl}` },
        ])}
      />

      <ServicePage
        content={content}
        locale="pl"
        nav={nav}
        footer={footer}
        stickyCta={stickyCta}
        process={home.process}
        allServices={serviceCards}
      />
    </>
  );
}
