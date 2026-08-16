/**
 * About page content — English.
 * File path: /content/en/about.ts
 *
 * Mirrors /content/about.ts (same shape, same timeline years). Carries the
 * founding story — the site's central trust argument for a foreign buyer:
 * this is not an anonymous job shop, it is a Belgian group's own workshop
 * with surplus capacity. Every timeline year is unverified: `// [CONFIRM]`.
 *
 * Certification rule: no EN 1090 / ISO 3834 / ISO 9001 claims anywhere.
 * Quality may only be attributed to the group's own installation teams
 * being the first customer.
 */

import type { AboutContent } from "@/content/types";

export const about: AboutContent = {
  metaTitle: "About Us — Metal Fabrication in Częstochowa",
  metaDescription:
    "StretchMetal is the metal-fabrication workshop of the Belgian Stretchgroup in Częstochowa, Poland. Built for our own production — now open to yours.",

  hero: {
    eyebrow: "About us",
    title: "Built for our own production. Now building for you.",
    accent: "you.",
    lead: "StretchMetal is the metal workshop of the Belgian Stretchgroup, based in Częstochowa, Poland. It exists because our stretch-ceiling business needed steel it could rely on — frames, light channels, substructures — made to its own dates and its own tolerances. The workshop grew past our needs. The surplus capacity is yours.",
  },

  timeline: {
    eyebrow: "History",
    title: "From ceilings to steel",
    entries: [
      {
        year: "2008", // [CONFIRM]
        title: "STRETCH — Belgium",
        description:
          "The group's origin: STRETCH begins installing seamless stretch ceilings across Belgium, building the service culture and project discipline the group still runs on.",
      },
      {
        year: "2016", // [CONFIRM]
        title: "Production in Częstochowa",
        description:
          "The group establishes its Polish operation — Stretch Sufit, under Alto Design Sp. z o.o. — in Częstochowa, in the heart of the Polish steel region.", // [CONFIRM] legal entity
      },
      {
        year: "2022", // [CONFIRM]
        title: "The metal workshop",
        description:
          "Tired of waiting on subcontracted steelwork, the group hires professional metalworkers and equips its own workshop to fabricate the frames, channels and substructures its projects consume.",
      },
      {
        year: "2024", // [CONFIRM]
        title: "Open to external clients",
        description:
          "The workshop's capacity outgrows the group's internal demand. It begins taking fabrication orders from external clients in Poland and across the EU.",
      },
      {
        year: "Today",
        title: "StretchMetal",
        description:
          "The workshop operates under its own name: laser cutting, welding, CNC machining, powder coating and complete steel structures — with the group's projects still running through the same machines as yours.",
      },
    ],
  },

  story: {
    eyebrow: "Why we exist",
    title: "A workshop born of impatience",
    paragraphs: [
      "Every stretch-ceiling project the group installs stands on steel: mounting frames, light channels, substructures that no one ever sees but everything hangs on. For years that steel came from subcontractors — with subcontractor lead times, subcontractor tolerances and subcontractor excuses.",
      "So the group did the direct thing. It hired professional welders and machinists in Częstochowa — a city that has worked steel for over a century — and built a workshop to its own standard: Belgian expectations of communication and deadlines, Polish manufacturing craft and cost base.",
      "That origin still defines how the workshop runs. Our first and most demanding customer is internal: the group's own installation teams in Belgium and Poland build with these parts, on scheduled site days, in front of their clients. A frame that arrives late or out of square is not an abstract complaint here — it is a colleague's ruined installation day. Parts get made right because we are the ones standing under them.",
      "External clients get exactly the same production line, the same people and the same discipline. We built this workshop for our own production. Now it builds for you.",
    ],
  },

  team: {
    eyebrow: "The team",
    title: "Metalworkers first",
    lead: "Welders, machine operators and engineers recruited from the Częstochowa steel trade, run with the group's Belgian project discipline. Your point of contact is an engineer who reads your drawing and answers in English; the group also works in Dutch and Polish.",
    imageCaption: "The workshop team — Częstochowa",
  },

  values: {
    eyebrow: "How we work",
    title: "Four things you can hold us to",
    items: [
      {
        title: "Millimetres and dates",
        description:
          "A quote states a price, a tolerance and a delivery date. All three are commitments, not opening positions.",
      },
      {
        title: "Straight communication",
        description:
          "One engineering contact, answers in English, and bad news early — if a date moves, you hear it from us before it matters.",
      },
      {
        title: "One roof, one responsibility",
        description:
          "Cutting, welding, machining and coating under one roof. When a part is wrong, there is no chain of suppliers to hide in — it is ours to fix.",
      },
      {
        title: "The first customer is us",
        description:
          "Quality is verified the hard way: the group's own installation teams build with this workshop's parts every week. What we ship to you is what we ship to ourselves.",
      },
    ],
  },
};
