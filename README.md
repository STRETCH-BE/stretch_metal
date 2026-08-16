# StretchMetal

The B2B marketing website for **StretchMetal** — the metal-fabrication business unit of the Belgian Stretchgroup, operating from Częstochowa, Poland. The site's one job is to get a prospect to send a technical drawing through the RFQ form (`/wycena` · `/en/quote` · `/nl/offerte`). Built with Next.js 15 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4, trilingual — Polish at the root (default), English mirror under `/en`, Dutch mirror under `/nl` — and deployed on Vercel with **zero required environment variables**.

The Dutch tree is canonical on **stretchmetal.be**: `middleware.ts` 308-redirects the `.be` root to `/nl`, and every NL page's canonical + the `nl-BE` hreflang point at the absolute `.be` URL (`nlCanonical()` in `lib/i18n-routes.ts`). The `/nl` tree is served on both hosts — no rewrites, the canonicals settle host ownership.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit (strict mode)
npm run lint       # eslint
npm run build      # production build
```

## Environment variables

All variables are optional — the app builds, runs and deploys without any of them. Without the four `MS_GRAPH_*` vars the RFQ endpoint logs a submission summary to the server console (file names + sizes, never contents) and still returns success, so the form works end-to-end in development. Add vars in Vercel → Project Settings → Environment Variables for production. See `env.example`.

| Variable | Purpose | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL — metadata, hreflang, sitemap, JSON-LD | `https://stretchmetal.pl` after the domain is bought |
| `NEXT_PUBLIC_SITE_URL_BE` | Canonical host for the Dutch `/nl` tree — NL canonicals, `nl-BE` hreflang, sitemap | `https://stretchmetal.be` (fallback baked into `lib/site-config.ts`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | Product analytics + session replay | posthog.com (EU cloud) |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog ingestion host | `https://eu.i.posthog.com` |
| `NEXT_PUBLIC_CLARITY_ID` | Heatmaps + session replay (free) | clarity.microsoft.com |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | analytics.google.com |
| `NEXT_PUBLIC_META_PIXEL_ID` | Facebook/Instagram ads conversion tracking | business.facebook.com |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console ownership verification | search.google.com/search-console |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification | bing.com/webmasters |
| `MS_GRAPH_TENANT_ID` | Microsoft 365 tenant that sends RFQ mail | Microsoft Entra admin center → Overview |
| `MS_GRAPH_CLIENT_ID` | Entra app registration (application) ID | Entra → App registrations |
| `MS_GRAPH_CLIENT_SECRET` | App registration client secret **value** | Entra → App registrations → Certificates & secrets |
| `MS_GRAPH_FROM_ADDRESS` | Mailbox RFQ + auto-reply mail is sent from | e.g. `info@stretchmetal.pl` (Exchange Online mailbox) |
| `RFQ_DESTINATION` | Inbox that receives RFQ/contact submissions | any mailbox — falls back to `MS_GRAPH_FROM_ADDRESS`, then `siteConfig.contact.email` |

Microsoft Graph setup: register an app in Microsoft Entra, grant `Mail.Send` (Application) permission, then restrict it with an Exchange Online Application Access Policy so a leaked secret can only send from the one configured mailbox.

## Project structure

```
middleware.ts              stretchmetal.be root → 308 /nl (matcher limited to "/")

/app                       Routes — Polish tree at the root, English under /en, Dutch under /nl
  layout.tsx               Root layout — font, consent, analytics, Organization/Website schema
  page.tsx                 Homepage (PL)
  globals.css              Tailwind v4 @theme tokens + utility classes (the design system)
  uslugi/                  Services hub + 6 service pages (spawanie, ciecie-laserowe,
                           obrobka-cnc, malowanie-proszkowe, projektowanie, konstrukcje-stalowe)
  park-maszynowy/          Machine park
  o-nas/                   About (workshop origin inside Stretchgroup)
  realizacje/              Projects
  wycena/                  RFQ form (+ dziekujemy/ thank-you page, noindex)
  kontakt/                 Contact
  polityka-prywatnosci/    Privacy policy
  polityka-cookies/        Cookie policy
  en/                      English tree: services/ (+ welding, laser-cutting, cnc-machining,
                           powder-coating, design-engineering, steel-structures), machine-park/,
                           about/, projects/, quote/ (+ thank-you), contact/,
                           privacy-policy/, cookie-policy/
  nl/                      Dutch tree (canonical host stretchmetal.be): diensten/ (+ lassen,
                           lasersnijden, cnc-bewerking, poedercoaten, engineering,
                           staalconstructies), machinepark/, over-ons/, projecten/,
                           offerte/ (+ bedankt), contact/, privacybeleid/, cookiebeleid/
  api/rfq/route.ts         RFQ + contact endpoint — multipart, file validation, honeypot,
                           per-IP rate limit, Graph mail or console fallback
  robots.ts                Allows AI crawlers (GPTBot, ClaudeBot, etc.)
  sitemap.ts               Emits all three locale trees with hreflang alternates (nl on .be)
  icon.tsx · apple-icon.tsx · opengraph-image.tsx · manifest.ts   Generated assets

/components
  /sections                Page sections (Nav, Hero, ServicesGrid, MachinePark, Footer, …)
  /ui                      Primitives (Button, Container, Eyebrow, FadeIn, WorkshopImage, …)
  /rfq                     RFQ form — fields, file dropzone, submit states
  /analytics               Consent provider + consent-gated tracking scripts
  /seo                     JsonLd component

/content                   Typed Polish copy (home, services, machines, projects, about, rfq, ui)
  types.ts                 THE content contract — every content file satisfies these types
  /en                      English mirror — identical export names and shapes
  /nl                      Dutch mirror (Vlaams-Nederlands, Belgian angle) — same contract

/lib                       site-config, i18n-routes, schema builders, analytics, email (MS Graph)
/fonts                     Archivo variable font (self-hosted, one file for body + display)
/public
  llms.txt                 AI crawler context file
```

## Adding a new page

Every page must include metadata (unique title ≤ 60 chars, description ≤ 155 chars, canonical + hreflang) and breadcrumb JSON-LD. Route paths come from `lib/i18n-routes.ts` — never hardcode URLs. A new page means **three** routes: add a `{ pl, en, nl }` entry to the route map in `lib/i18n-routes.ts` (the `LocalePaths` type enforces all three slugs), then build the page in all three trees. Pattern (Polish tree; the `/en` twin is identical with `.en` paths and English copy):

```typescript
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbs } from "@/lib/schema";
import { routes, languageAlternates } from "@/lib/i18n-routes";
import { siteConfig, defaultOgImages } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Park maszynowy",        // template appends "| StretchMetal"
  description: "...",             // ≤155 chars
  alternates: {
    canonical: routes.machinePark.pl,             // .en on the /en tree
    languages: languageAlternates(routes.machinePark),
  },
  openGraph: { images: defaultOgImages },         // pages replace, never merge
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Start", url: siteConfig.url },
          { name: "Park maszynowy", url: `${siteConfig.url}${routes.machinePark.pl}` },
        ])}
      />
      <main id="main">...</main>
    </>
  );
}
```

The `/nl` twin differs in one way: its canonical must be the **absolute** `.be` URL — `canonical: nlCanonical(routes.machinePark.nl)` — because the Dutch tree's canonical host is stretchmetal.be, not the `metadataBase` (.pl) host. `languageAlternates()` needs no per-locale change; it already emits `pl-PL`/`en` relative and `nl-BE` absolute. NL breadcrumb URLs use `nlCanonical(...)` too.

Additional schema rules: service pages use `servicePaths(entry)` for the canonical (NL: `nlCanonical(servicePaths(entry).nl)`) and add `buildService` + `buildFaqPage`; home and contact add `buildLocalBusiness`; thank-you pages set `robots: { index: false, follow: false }` and stay out of the sitemap — in all three locales.

## Content & the `[CONFIRM]` policy

Components are copy-free — every string a visitor reads lives in typed TS files under `/content` (Polish), `/content/en` (English) and `/content/nl` (Dutch), all satisfying `content/types.ts` with identical export names and shapes. Business facts the owner has not yet verified (legal name, address, phone, domain, capacity, machine specs, spec-table values, …) carry a greppable `// [CONFIRM]` comment on the line where they appear. Find every unverified value in one pass:

```bash
grep -rn "\[CONFIRM\]" content lib env.example
```

Do not present `[CONFIRM]` values as verified facts in prose, and never claim certifications (EN 1090, ISO 3834, ISO 9001) anywhere — the only permitted quality statement is that quality is verified by the group's own installation teams, the workshop's first customer.

## Replacing placeholder images

No photography exists yet. Every image slot renders `<WorkshopImage>` — a dark branded placeholder printing a caption of the intended shot. To switch a slot to a real photo, drop the file into `/public/images/` and set the `image` path next to the `imageCaption` in the relevant content file — the component switches to `next/image` on its own, no component changes needed.

## Deploy checklist

1. Create the Vercel project from the Git repo — it builds and deploys with zero env vars.
2. Add optional env vars (analytics, verification, Microsoft Graph mail + `RFQ_DESTINATION`) as they become available.
3. After the domain purchases, set `NEXT_PUBLIC_SITE_URL` (and `NEXT_PUBLIC_SITE_URL_BE` if it differs from the baked-in `https://stretchmetal.be`) and redeploy — canonicals, hreflang, sitemap and JSON-LD all follow them. Point both stretchmetal.pl and stretchmetal.be at the Vercel project; the middleware handles the `.be` root redirect.
4. Confirm every `[CONFIRM]` value with the owner (`grep -rn "\[CONFIRM\]" content lib env.example`) and delete the comments as facts are verified.
5. Replace `WorkshopImage` placeholders with real workshop photos.
6. Verify the site in Google Search Console and Bing Webmaster Tools (via the verification env vars) and submit `/sitemap.xml`.
