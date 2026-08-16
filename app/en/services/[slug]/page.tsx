/**
 * Service detail page — English, `/en/services/[slug]`.
 * File path: /app/en/services/[slug]/page.tsx
 *
 * Mirror of /app/uslugi/[slug]/page.tsx: statically generates the six EN
 * service slugs (welding, laser-cutting, cnc-machining, powder-coating,
 * design-engineering, steel-structures) from lib/i18n-routes and renders
 * each through the shared <ServicePage> template with /content/en/*.
 * Unknown slugs → notFound().
 *
 * Metadata from the EN content file (metaTitle ≤45 chars before the
 * "| StretchMetal" suffix; metaDescription ≤155). Canonical + hreflang
 * derive from servicePaths(entry).
 *
 * Schema: Service + BreadcrumbList (Home → Services → name) here; FAQPage
 * renders inside the ServicePage template (it owns the FAQ data).
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

import { serviceCards, services } from "@/content/en/services";
import { home } from "@/content/en/home";
import { footer, nav, stickyCta } from "@/content/en/ui";

import { ServicePage } from "@/components/sections/service-page";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return serviceSlugs.map((s) => ({ slug: s.en }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findService("en", slug);
  if (!entry) return {};

  const content = services[entry.key];
  const paths = servicePaths(entry);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: paths.en,
      languages: languageAlternates(paths),
    },
    openGraph: {
      title: `${content.metaTitle} | ${siteConfig.name}`,
      description: content.metaDescription,
      url: `${siteConfig.url}${paths.en}`,
      siteName: siteConfig.name,
      locale: "en_US",
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
  const entry = findService("en", slug);
  if (!entry) notFound();

  const content = services[entry.key];
  const paths = servicePaths(entry);

  return (
    <>
      <JsonLd
        data={buildService({
          name: content.name,
          description: content.metaDescription,
          path: paths.en,
        })}
      />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${siteConfig.url}${routes.home.en}` },
          { name: "Services", url: `${siteConfig.url}${routes.services.en}` },
          { name: content.name, url: `${siteConfig.url}${paths.en}` },
        ])}
      />

      <ServicePage
        content={content}
        locale="en"
        nav={nav}
        footer={footer}
        stickyCta={stickyCta}
        process={home.process}
        allServices={serviceCards}
      />
    </>
  );
}
