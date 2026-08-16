/**
 * Projects (case entries) — English.
 * File path: /content/en/projects.ts
 *
 * Mirrors /content/projects.ts: the same 5 sample cases, same order. These
 * are representative work types drawn from the workshop's real product mix
 * (group substructures, light channels, brackets, LED carriers, mezzanine) —
 * presented as sample cases until the owner supplies documented references
 * with photos. Quantities are illustrative: `// [CONFIRM]` on every figure.
 *
 * `image` is intentionally omitted — WorkshopImage renders the captioned
 * placeholder until real photography exists; add `image: "/images/…"` per
 * entry to swap it in.
 */

import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    title: "Ceiling substructure frames",
    services: ["Laser cutting", "Welding", "Powder coating"],
    material: "Structural steel S235", // [CONFIRM]
    finish: "Powder coat, RAL 9005 matt", // [CONFIRM]
    imageCaption: "Substructure frames — series production for the group",
    image: "/images/projects/ceiling-substructure.jpg",
    description:
      "Repeat series of welded mounting frames for the Stretchgroup's stretch-ceiling installations in Belgium and Poland — the product line this workshop was founded to build. Laser-cut components with tab-and-slot location, welded in fixtures for repeatability, coated in-house and shipped with the group's installation crews' schedule as the deadline. Around 200 frames per month across variants.", // [CONFIRM] volume
  },
  {
    title: "Powder-coated light channels",
    services: ["Laser cutting", "Bending", "Powder coating"],
    material: "Steel sheet, 1.5 mm", // [CONFIRM]
    finish: "Powder coat, RAL 9016 satin", // [CONFIRM]
    imageCaption: "Formed light channels after coating",
    image: "/images/projects/powder-coating-light-channels.jpg",
    description:
      "Long formed channels for linear lighting: cut on the fiber laser, folded on the CNC press brake in lengths up to 3 m, and powder-coated in-house so the visible surface arrives unmarked. Colour consistency held batch to batch across a running series — the same powder specification on every reorder.", // [CONFIRM] max length
  },
  {
    title: "Custom mounting brackets",
    services: ["Laser cutting", "Bending", "Welding"],
    material: "Steel S355, 4–8 mm", // [CONFIRM]
    finish: "Powder coat, RAL 7016", // [CONFIRM]
    imageCaption: "Welded bracket set, batch before dispatch",
    image: "/images/projects/machine-brackets.jpg",
    description:
      "A family of load-bearing brackets developed from the client's 2D sketch: our engineering produced the 3D models and flat patterns, first articles were approved on photos and dimensions, then the batch ran. From sketch to delivered, coated parts in three weeks.", // [CONFIRM] lead time
  },
  {
    title: "LED profile carriers",
    services: ["CNC machining", "TIG welding"],
    material: "Aluminium", // [CONFIRM] alloy
    finish: "Mill finish, ready for anodising", // [CONFIRM]
    imageCaption: "Aluminium carriers — TIG-welded, machined ends",
    image: "/images/projects/laser-cut-profiles.jpg",
    description:
      "Aluminium carrier assemblies for LED profile systems: sawn and machined extrusions joined by TIG (AC) welding, end faces milled square after welding so the carriers align in continuous runs. Built to the tolerances lighting installers actually need on site — because our own installers set them.",
  },
  {
    title: "Mezzanine platform",
    services: ["Design & engineering", "Welding", "Powder coating"],
    material: "Structural steel S355", // [CONFIRM]
    finish: "Powder coat, RAL 7035; galvanized fasteners", // [CONFIRM]
    imageCaption: "Mezzanine steelwork, trial-assembled before dispatch",
    description:
      "A storage mezzanine of roughly 60 m²: columns, main beams, stair flight and railings engineered in-house from the client's floor loads and hall dimensions. Fabricated in bolt-together sections sized for one truck, trial-assembled in our hall, then coated and delivered with assembly drawings.", // [CONFIRM] area
  },
];
