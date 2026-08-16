/**
 * Machine park content — Dutch (nl-BE).
 * File path: /content/nl/machines.ts
 *
 * Mirrors /content/machines.ts 1:1: same nine machines in the same order,
 * same export names (`machines`, `workshopFacts`), NL type names and spec
 * labels. Rendered on /nl/machinepark; the home page shows its own
 * condensed highlights in /content/nl/home.ts — keep both in sync when
 * specs get confirmed.
 *
 * Facts are canonical in the POLISH file. No machine brands/models are
 * named — none are confirmed. Every numeric spec is a placeholder pending
 * the owner's machine list: `// [CONFIRM]` (greppable).
 *
 * Order = hall logic, same as PL: welding stations first (the workshop's
 * origin), then cutting, forming, machining, coating, saw and drill.
 */

import type { Machine, Stat } from "@/content/types";

export const machines: Machine[] = [
  {
    name: "MIG/MAG-lasposten",
    type: "Lasafdeling — halfautomaten",
    specs: [
      { label: "Aantal posten", value: "4" }, // [CONFIRM]
      { label: "Stroombereik", value: "tot 350 A" }, // [CONFIRM]
      { label: "Materialen", value: "constructiestaal, inox" }, // [CONFIRM]
      { label: "Uitrusting", value: "lastafels, mallen voor seriewerk" }, // [CONFIRM]
    ],
  },
  {
    name: "TIG-lasposten",
    type: "Lasafdeling — TIG AC/DC",
    specs: [
      { label: "Aantal posten", value: "2" }, // [CONFIRM]
      { label: "Modi", value: "AC/DC — aluminium en inox" }, // [CONFIRM]
      { label: "Toepassing", value: "zichtnaden, dunwandig werk" },
    ],
  },
  {
    name: "Fiberlasersnijmachine",
    type: "Plaatsnijden",
    specs: [
      { label: "Bronvermogen", value: "6 kW" }, // [CONFIRM]
      { label: "Werkbereik", value: "3 000 × 1 500 mm" }, // [CONFIRM]
      { label: "Constructiestaal", value: "tot 20 mm" }, // [CONFIRM]
      { label: "Inox / aluminium", value: "tot 12 mm / tot 10 mm" }, // [CONFIRM]
    ],
  },
  {
    name: "CNC-plooibank",
    type: "Plaatwerk plooien",
    specs: [
      { label: "Perskracht", value: "135 t" }, // [CONFIRM]
      { label: "Plooilengte", value: "3 000 mm" }, // [CONFIRM]
      { label: "Sturing", value: "CNC — herhaalbare hoek over de hele serie" }, // [CONFIRM]
    ],
  },
  {
    name: "CNC-freesmachine",
    type: "Verspaning — frezen",
    specs: [
      { label: "Assen", value: "3" }, // [CONFIRM]
      { label: "Werktafel", value: "1 000 × 500 mm" }, // [CONFIRM]
      { label: "Toleranties", value: "tot ±0,02 mm" }, // [CONFIRM]
    ],
  },
  {
    name: "CNC-draaibank",
    type: "Verspaning — draaien",
    specs: [
      { label: "Max. draaidiameter", value: "400 mm" }, // [CONFIRM]
      { label: "Max. draailengte", value: "1 000 mm" }, // [CONFIRM]
      { label: "Materialen", value: "staal, inox, aluminium, messing" }, // [CONFIRM]
    ],
  },
  {
    name: "Poedercoatlijn met oven",
    type: "Poedercoaterij",
    specs: [
      { label: "Max. afmeting stuk", value: "3 000 × 1 200 × 1 500 mm" }, // [CONFIRM]
      { label: "Kleuren", value: "volledig RAL-gamma" }, // [CONFIRM]
      { label: "Moffelen", value: "180–200 °C" }, // [CONFIRM]
    ],
  },
  {
    name: "Bandzaag",
    type: "Zagen van profielen en staven",
    specs: [
      { label: "Zaagbereik", value: "profielen tot 300 mm" }, // [CONFIRM]
      { label: "Verstekzagen", value: "tot 60°" }, // [CONFIRM]
    ],
  },
  {
    name: "Kolomboormachine",
    type: "Boren en draadtappen",
    specs: [
      { label: "Max. boordiameter", value: "32 mm in staal" }, // [CONFIRM]
      { label: "Machinaal draadtappen", value: "tot M24" }, // [CONFIRM]
    ],
  },
];

/* ─── Workshop facts (stats strip on /nl/machinepark) ─────── */

export const workshopFacts: Stat[] = [
  { value: "1 200 m²", label: "productiehal" }, // [CONFIRM]
  { value: "6", label: "lasposten" }, // [CONFIRM]
  { value: "9", label: "machines en hoofdposten" }, // [CONFIRM]
  { value: "20 t", label: "staalverwerking per maand" }, // [CONFIRM]
  { value: "48 u", label: "tot een offerte op basis van uw tekening" }, // [CONFIRM]
];
