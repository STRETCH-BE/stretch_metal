/**
 * Home page content — English.
 * File path: /content/en/home.ts
 *
 * Mirrors /content/home.ts (same shape from @/content/types). Section order
 * follows the home composition: hero → ticker → stats → services → process →
 * machine park → why us → heritage → projects teaser → final CTA.
 *
 * Hero contract (fixed by the build brief): words STEEL. CUT. WELDED.
 * COATED. with accentIndex 3; badge carries the group line — the 🇧🇪 🇵🇱
 * flags are the site's single permitted emoji use.
 *
 * `machinePark.highlights` are deliberately short inline entries (2–3 spec
 * rows) — the full inventory lives in /content/en/machines.ts. Keep the two
 * lists consistent when specs are confirmed.
 */

import type { HomeContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";
import { serviceCards } from "./services";

export const home: HomeContent = {
  hero: {
    badge: "Part of the Belgian Stretchgroup · 🇧🇪 🇵🇱",
    words: ["STEEL.", "CUT.", "WELDED.", "COATED."],
    accentIndex: 3,
    lead: "MIG/MAG and TIG welding, laser cutting, CNC machining and powder coating — one workshop in Częstochowa, Poland. We built it for our own production. Now it builds for you.",
    ctaPrimary: "Send your drawing",
    ctaSecondary: "See our services",
    imageCaption: "Workshop floor — Częstochowa, Poland",
    image: "/images/hero/tig-welding-aluminium.jpg",
    imageAlt: "TIG welding of aluminium on a fixture table at the StretchMetal workshop",
  },

  ticker: [
    "LASER CUTTING",
    "WELDING",
    "CNC MACHINING",
    "POWDER COATING",
    "STEEL STRUCTURES",
    "DESIGN & ENGINEERING",
  ],

  stats: {
    eyebrow: "In numbers",
    items: [
      { value: "1 200 m²", label: "production floor" }, // [CONFIRM]
      { value: "48 h", label: "to a quote from your drawing" }, // [CONFIRM]
      { value: "20 t", label: "of steel processed monthly" }, // [CONFIRM]
      { value: "1–2 days", label: "road delivery to DE & Benelux" }, // [CONFIRM]
    ],
  },

  services: {
    eyebrow: "Services",
    title: "From drawing to finished part",
    accent: "finished",
    lead: "Six services, one roof, one responsible supplier. Send a drawing for any single step — or hand us the whole chain and collect coated, ready-to-mount parts.",
    cards: serviceCards,
    linkLabel: "All services",
  },

  process: {
    eyebrow: "Process",
    title: "Five steps from file to delivery",
    lead: "No portals, no ticket systems. You send a file, an engineer reads it, and 48 hours later you have a price and a date.", // [CONFIRM] 48 h
    steps: [
      {
        title: "Send your drawing",
        description:
          "DXF, DWG, STEP or PDF through the quote form — a dimensioned sketch works too. NDA first if you prefer.",
      },
      {
        title: "Quote within 48 h",
        description:
          "Price, lead time and any design-for-manufacture notes, prepared by an engineer who will answer your questions in English.", // [CONFIRM] 48 h
      },
      {
        title: "Production",
        description:
          "Cutting, forming, welding and machining on our own machines in Częstochowa — with one contact keeping you informed.",
      },
      {
        title: "QC & powder coating",
        description:
          "Dimensional and visual inspection against your drawing, then in-house powder coating in the RAL you specified.",
      },
      {
        title: "EU-wide delivery",
        description:
          "Road freight from the A1 motorway — Germany and Benelux in 1–2 days, the rest of the EU on schedule.", // [CONFIRM] delivery claim
      },
    ],
    cta: "Start with your drawing",
  },

  machinePark: {
    eyebrow: "Machine park",
    title: "The machines behind the parts",
    lead: "A compact, complete line: cut, form, weld, machine and coat without a subcontractor in the chain. The full inventory is on the machine park page.",
    highlights: [
      {
        name: "Fiber laser cutting machine",
        type: "Sheet cutting",
        specs: [
          { label: "Laser power", value: "6 kW" }, // [CONFIRM]
          { label: "Working area", value: "3 000 × 1 500 mm" }, // [CONFIRM]
        ],
      },
      {
        name: "CNC press brake",
        type: "Sheet bending",
        specs: [
          { label: "Press force", value: "135 t" }, // [CONFIRM]
          { label: "Bending length", value: "3 000 mm" }, // [CONFIRM]
        ],
      },
      {
        name: "CNC milling machine",
        type: "Machining — milling",
        specs: [
          { label: "Table size", value: "1 000 × 500 mm" }, // [CONFIRM]
          { label: "Use", value: "Plates, housings, post-weld machining" },
        ],
      },
      {
        name: "Powder coating line with oven",
        type: "Powder coating shop",
        specs: [
          { label: "Max part size", value: "3 000 × 1 200 × 1 500 mm" }, // [CONFIRM]
          { label: "Colours", value: "Full RAL palette" }, // [CONFIRM]
        ],
      },
    ],
    linkLabel: "Full machine park",
  },

  whyUs: {
    eyebrow: "Why StretchMetal",
    title: "Western standards, Polish economics",
    items: [
      {
        title: "A Western group's standards",
        description:
          "Belgian service culture runs the workshop: committed dates, proactive communication, and answers in English, Dutch or Polish from people who read drawings.",
      },
      {
        title: "Polish manufacturing economics",
        description:
          "Częstochowa cost base, EU legal framework, no customs, quotes in EUR on request. The saving is in the rate card, not in the quality.",
      },
      {
        title: "Steel region, A1 motorway",
        description:
          "We buy steel where Poland makes it and ship from the A1 — road freight reaches Germany and Benelux in 1–2 days.", // [CONFIRM] delivery claim
      },
      {
        title: "One workshop, whole chain",
        description:
          "Drawing to coated part under one roof. One quote, one date, one supplier responsible when something needs fixing.",
      },
    ],
  },

  heritage: {
    eyebrow: "The group",
    title: "Born inside the Stretchgroup",
    paragraphs: [
      "StretchMetal did not start as a job shop looking for customers. The Belgian Stretchgroup — stretch-ceiling companies in Belgium and Poland — needed steel substructures, frames and light channels it could trust, delivered on the day its installation crews stood on site. So it hired professional metalworkers in Częstochowa and built its own workshop.",
      "The workshop now has more capacity than the group consumes. That surplus serves external clients across Poland and the EU — on the same machines, by the same people, to the same standard our own installers demand. Quality is verified the hard way: the group is this workshop's first customer.",
    ],
    brands: [
      {
        name: siteConfig.group.belgium.name,
        description: "Seamless stretch ceilings — Belgium",
        url: siteConfig.group.belgium.url,
      },
      {
        name: siteConfig.group.poland.name,
        description: "Stretch ceilings — Poland",
        url: siteConfig.group.poland.url,
      },
    ],
    imageCaption: "Group production — Belgium & Poland",
    image: "/images/heritage/steel-substructure-stretch-ceiling.jpg",
    imageAlt: "Steel substructure supporting a backlit stretch ceiling — a group installation",
  },

  projects: {
    eyebrow: "Projects",
    title: "Recent work from the floor",
    lead: "Substructure frames, coated light channels, machined carriers, a mezzanine platform — a cross-section of what leaves the workshop.",
    linkLabel: "See all projects",
  },

  ctaFinal: {
    title: "Send the drawing. Get a price.",
    accent: "price.",
    lead: "DXF, DWG, STEP or PDF — an engineer reads it and quotes within 48 hours. NDA on request.", // [CONFIRM] 48 h
    cta: "Send your drawing",
    ctaSecondary: "Call us",
  },
};
