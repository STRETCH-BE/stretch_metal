/**
 * Machine park content — English.
 * File path: /content/en/machines.ts
 *
 * Mirrors /content/machines.ts: same machines in the same order, same export
 * names (`machines`, `workshopFacts`), EN type names and spec labels. The
 * machine list is the canonical inventory rendered on /en/machine-park and
 * (highlights) on the home page.
 *
 * No machine brands/models are named — none are confirmed. Every numeric
 * spec is a placeholder pending the owner's machine list: `// [CONFIRM]`.
 */

import type { Machine, Stat } from "@/content/types";

/* ─── Machines (ordered: cutting → forming → welding → machining →
 *     finishing → handling) ─────────────────────────────────── */

export const machines: Machine[] = [
  {
    name: "Fiber laser 3000 × 1500",
    type: "Fiber laser cutting machine",
    specs: [
      { label: "Laser power", value: "6 kW" }, // [CONFIRM]
      { label: "Sheet format", value: "3 000 × 1 500 mm" }, // [CONFIRM]
      { label: "Structural steel", value: "up to 20 mm" }, // [CONFIRM]
      { label: "Stainless / aluminium", value: "up to 12 / 10 mm" }, // [CONFIRM]
    ],
  },
  {
    name: "CNC press brake",
    type: "Hydraulic CNC press brake",
    specs: [
      { label: "Bending length", value: "3 000 mm" }, // [CONFIRM]
      { label: "Press force", value: "135 t" }, // [CONFIRM]
      { label: "Control", value: "CNC back gauge, programmed sequences" }, // [CONFIRM]
    ],
  },
  {
    name: "MIG/MAG welding stations",
    type: "MIG/MAG welding cell (4 stations)", // [CONFIRM] station count
    specs: [
      { label: "Process", value: "MIG/MAG (135/136)" },
      { label: "Output", value: "up to 400 A" }, // [CONFIRM]
      { label: "Materials", value: "Structural steel, stainless steel" },
    ],
  },
  {
    name: "TIG welding stations",
    type: "TIG welding cell (2 stations)", // [CONFIRM] station count
    specs: [
      { label: "Process", value: "TIG (141), AC/DC" }, // [CONFIRM]
      { label: "Materials", value: "Stainless steel, aluminium, thin steel" },
      { label: "Use", value: "Visible seams, thin-wall and aluminium work" },
    ],
  },
  {
    name: "CNC machining centre",
    type: "3-axis CNC vertical machining centre",
    specs: [
      { label: "Travels X/Y/Z", value: "1 000 × 500 × 500 mm" }, // [CONFIRM]
      { label: "Materials", value: "Steel, stainless, aluminium, plastics" },
      { label: "Use", value: "Plates, housings, post-weld machining" },
    ],
  },
  {
    name: "CNC lathe",
    type: "CNC turning centre",
    specs: [
      { label: "Max turning diameter", value: "Ø 400 mm" }, // [CONFIRM]
      { label: "Max turning length", value: "1 000 mm" }, // [CONFIRM]
      { label: "Use", value: "Shafts, bushings, flanges, adapters" },
    ],
  },
  {
    name: "Powder coating line",
    type: "Powder coating booth + curing oven",
    specs: [
      { label: "Max part size", value: "3 000 × 1 500 × 2 000 mm" }, // [CONFIRM]
      { label: "Colours", value: "Full RAL palette" }, // [CONFIRM]
      { label: "Finishes", value: "Matt, satin, gloss, fine structure" }, // [CONFIRM]
    ],
  },
  {
    name: "Automatic band saw",
    type: "Band saw for profiles and bar stock",
    specs: [
      { label: "Capacity", value: "up to Ø 300 mm" }, // [CONFIRM]
      { label: "Mitre cutting", value: "up to 60°" }, // [CONFIRM]
      { label: "Use", value: "Profile and tube cutting for weldments" },
    ],
  },
  {
    name: "Assembly hall & crane",
    type: "Assembly bays with overhead crane",
    specs: [
      { label: "Production floor", value: "1 200 m²" }, // [CONFIRM]
      { label: "Crane capacity", value: "3.2 t" }, // [CONFIRM]
      { label: "Use", value: "Trial assembly of structures before dispatch" },
    ],
  },
];

/* ─── Workshop facts (stats strip on /en/machine-park) ────── */

export const workshopFacts: Stat[] = [
  { value: "1 200 m²", label: "production floor" }, // [CONFIRM]
  { value: "20 t", label: "of steel processed monthly" }, // [CONFIRM]
  { value: "48 h", label: "to a quote from your drawing" }, // [CONFIRM]
  { value: "1–2 days", label: "road delivery to DE / BE / NL" }, // [CONFIRM]
];
