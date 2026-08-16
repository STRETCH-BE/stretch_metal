/**
 * Machine park content — English.
 * File path: /content/en/machines.ts
 *
 * Mirrors /content/machines.ts 1:1: same machines in the same order, same
 * export names (`machines`, `workshopFacts`), EN type names and spec labels.
 * The machine list is the canonical inventory rendered on /en/machine-park
 * and (highlights) on the home page.
 *
 * No machine brands/models are named — none are confirmed. Every numeric
 * spec is a placeholder pending the owner's machine list: `// [CONFIRM]`.
 *
 * Order = hall logic, same as PL: welding stations first (the workshop's
 * origin), then cutting, forming, machining, coating, saw and drill.
 */

import type { Machine, Stat } from "@/content/types";

export const machines: Machine[] = [
  {
    name: "MIG/MAG welding stations",
    type: "Welding shop — MIG/MAG",
    specs: [
      { label: "Number of stations", value: "4" }, // [CONFIRM]
      { label: "Current range", value: "up to 350 A" }, // [CONFIRM]
      { label: "Materials", value: "structural steel, stainless steel" }, // [CONFIRM]
      { label: "Equipment", value: "welding tables, series fixtures" }, // [CONFIRM]
    ],
  },
  {
    name: "TIG welding stations",
    type: "Welding shop — TIG AC/DC",
    specs: [
      { label: "Number of stations", value: "2" }, // [CONFIRM]
      { label: "Modes", value: "AC/DC — aluminium and stainless" }, // [CONFIRM]
      { label: "Use", value: "visible seams, thin-wall work" },
    ],
  },
  {
    name: "Fiber laser cutting machine",
    type: "Sheet cutting",
    specs: [
      { label: "Laser power", value: "6 kW" }, // [CONFIRM]
      { label: "Working area", value: "3 000 × 1 500 mm" }, // [CONFIRM]
      { label: "Structural steel", value: "up to 20 mm" }, // [CONFIRM]
      { label: "Stainless / aluminium", value: "up to 12 mm / up to 10 mm" }, // [CONFIRM]
    ],
  },
  {
    name: "CNC press brake",
    type: "Sheet bending",
    specs: [
      { label: "Press force", value: "135 t" }, // [CONFIRM]
      { label: "Bending length", value: "3 000 mm" }, // [CONFIRM]
      { label: "Control", value: "CNC — repeatable angle across the series" }, // [CONFIRM]
    ],
  },
  {
    name: "CNC milling machine",
    type: "Machining — milling",
    specs: [
      { label: "Axes", value: "3" }, // [CONFIRM]
      { label: "Table size", value: "1 000 × 500 mm" }, // [CONFIRM]
      { label: "Tolerances", value: "to ±0.02 mm" }, // [CONFIRM]
    ],
  },
  {
    name: "CNC lathe",
    type: "Machining — turning",
    specs: [
      { label: "Max turning diameter", value: "400 mm" }, // [CONFIRM]
      { label: "Max turning length", value: "1 000 mm" }, // [CONFIRM]
      { label: "Materials", value: "steel, stainless, aluminium, brass" }, // [CONFIRM]
    ],
  },
  {
    name: "Powder coating line with oven",
    type: "Powder coating shop",
    specs: [
      { label: "Max part size", value: "3 000 × 1 200 × 1 500 mm" }, // [CONFIRM]
      { label: "Colours", value: "full RAL palette" }, // [CONFIRM]
      { label: "Curing", value: "180–200 °C" }, // [CONFIRM]
    ],
  },
  {
    name: "Band saw",
    type: "Profile and bar cutting",
    specs: [
      { label: "Cutting range", value: "profiles up to 300 mm" }, // [CONFIRM]
      { label: "Mitre cutting", value: "up to 60°" }, // [CONFIRM]
    ],
  },
  {
    name: "Column drill press",
    type: "Drilling and tapping",
    specs: [
      { label: "Max drilling diameter", value: "32 mm in steel" }, // [CONFIRM]
      { label: "Machine tapping", value: "up to M24" }, // [CONFIRM]
    ],
  },
];

/* ─── Workshop facts (stats strip on /en/machine-park) ────── */

export const workshopFacts: Stat[] = [
  { value: "1 200 m²", label: "production floor" }, // [CONFIRM]
  { value: "6", label: "welding stations" }, // [CONFIRM]
  { value: "9", label: "main machines and stations" }, // [CONFIRM]
  { value: "20 t", label: "of steel processed monthly" }, // [CONFIRM]
  { value: "48 h", label: "to a quote from your drawing" }, // [CONFIRM]
];
