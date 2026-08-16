/**
 * Machine park content (PL) — the full equipment list + workshop stats.
 * File path: /content/machines.ts
 *
 * Renders on /park-maszynowy (full grid) — the home page shows its own
 * condensed highlights in /content/home.ts; keep both in sync when specs
 * get confirmed.
 *
 * EVERY spec value below is a placeholder awaiting the owner's walk-through
 * of the hall — models, counts, capacities. Each carries `// [CONFIRM]`
 * (greppable). Machine `name` stays generic until brands/models are
 * confirmed; `type` is the process it serves.
 *
 * Order = hall logic, not marketing: welding stations first (the workshop's
 * origin), then cutting, forming, machining, coating, saw and drill.
 */

import type { Machine, Stat } from "@/content/types";

export const machines: Machine[] = [
  {
    name: "Stanowiska MIG/MAG",
    type: "Spawalnia — półautomaty",
    specs: [
      { label: "Liczba stanowisk", value: "4" }, // [CONFIRM]
      { label: "Zakres prądu", value: "do 350 A" }, // [CONFIRM]
      { label: "Materiały", value: "stal czarna, nierdzewna" },
      { label: "Wyposażenie", value: "stoły spawalnicze, przyrządy seryjne" }, // [CONFIRM]
    ],
  },
  {
    name: "Stanowiska TIG",
    type: "Spawalnia — TIG AC/DC",
    specs: [
      { label: "Liczba stanowisk", value: "2" }, // [CONFIRM]
      { label: "Tryby", value: "AC/DC — aluminium i nierdzewna" }, // [CONFIRM]
      { label: "Zastosowanie", value: "spoiny widoczne, cienkie ścianki" },
    ],
  },
  {
    name: "Wycinarka laserowa fiber",
    type: "Cięcie blach",
    specs: [
      { label: "Moc źródła", value: "6 kW" }, // [CONFIRM]
      { label: "Obszar roboczy", value: "3 000 × 1 500 mm" }, // [CONFIRM]
      { label: "Stal czarna", value: "do 20 mm" }, // [CONFIRM]
      { label: "Nierdzewna / aluminium", value: "do 12 mm / do 10 mm" }, // [CONFIRM]
    ],
  },
  {
    name: "Prasa krawędziowa CNC",
    type: "Gięcie blach",
    specs: [
      { label: "Nacisk", value: "135 t" }, // [CONFIRM]
      { label: "Długość gięcia", value: "3 000 mm" }, // [CONFIRM]
      { label: "Sterowanie", value: "CNC — powtarzalny kąt w całej serii" }, // [CONFIRM]
    ],
  },
  {
    name: "Frezarka CNC",
    type: "Obróbka skrawaniem — frezowanie",
    specs: [
      { label: "Osie", value: "3" }, // [CONFIRM]
      { label: "Stół roboczy", value: "1 000 × 500 mm" }, // [CONFIRM]
      { label: "Tolerancje", value: "do ±0,02 mm" }, // [CONFIRM]
    ],
  },
  {
    name: "Tokarka CNC",
    type: "Obróbka skrawaniem — toczenie",
    specs: [
      { label: "Maks. średnica toczenia", value: "400 mm" }, // [CONFIRM]
      { label: "Maks. długość toczenia", value: "1 000 mm" }, // [CONFIRM]
      { label: "Materiały", value: "stal, nierdzewna, aluminium, mosiądz" }, // [CONFIRM]
    ],
  },
  {
    name: "Malarnia proszkowa z piecem",
    type: "Lakiernia proszkowa",
    specs: [
      { label: "Maks. wymiar detalu", value: "3 000 × 1 200 × 1 500 mm" }, // [CONFIRM]
      { label: "Kolory", value: "pełna paleta RAL" },
      { label: "Polimeryzacja", value: "180–200 °C" }, // [CONFIRM]
    ],
  },
  {
    name: "Przecinarka taśmowa",
    type: "Cięcie profili i prętów",
    specs: [
      { label: "Zakres cięcia", value: "profile do 300 mm" }, // [CONFIRM]
      { label: "Cięcie kątowe", value: "do 60°" }, // [CONFIRM]
    ],
  },
  {
    name: "Wiertarka kolumnowa",
    type: "Wiercenie i gwintowanie",
    specs: [
      { label: "Maks. średnica wiercenia", value: "32 mm w stali" }, // [CONFIRM]
      { label: "Gwintowanie maszynowe", value: "do M24" }, // [CONFIRM]
    ],
  },
];

/* ─── Workshop stats — /park-maszynowy header band ────────── */

export const workshopFacts: Stat[] = [
  { value: "1 200 m²", label: "powierzchni hali" }, // [CONFIRM]
  { value: "6", label: "stanowisk spawalniczych" }, // [CONFIRM]
  { value: "9", label: "maszyn i stanowisk głównych" }, // [CONFIRM]
  { value: "20 t", label: "przerobu stali miesięcznie" }, // [CONFIRM]
  { value: "48 h", label: "na wycenę z rysunku" }, // [CONFIRM]
];
