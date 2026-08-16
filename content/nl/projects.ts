/**
 * Projects (case entries) — Dutch (nl-BE).
 * File path: /content/nl/projects.ts
 *
 * Mirrors /content/projects.ts: the same 5 sample cases, same order, same
 * image fields. [CONFIRM] STATUS OF THIS WHOLE FILE: every entry is a
 * REPRESENTATIVE SAMPLE of the workshop's actual work types (group
 * substructures, light channels, brackets, LED frames, mezzanine), written
 * to be replaced or confirmed by the owner with real jobs, quantities and
 * photos. Facts are canonical in the POLISH file; figures carry their own
 * `// [CONFIRM]` lines.
 *
 * Entry 5 (mezzanine) has no `image` yet — WorkshopImage renders the
 * captioned placeholder until a real photo lands; for entries 1–4 the
 * caption doubles as the visible photo caption.
 */

import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    title: "Plafond-onderconstructies voor de teams van de groep",
    services: ["Lasersnijden", "Lassen", "Poedercoaten"],
    material: "Staal S235, gesloten profielen 30 × 30 mm", // [CONFIRM]
    finish: "Poedercoating, RAL 9005 mat", // [CONFIRM]
    imageCaption: "Gelaste onderconstructieframes op transportpallet — seriewerk voor de groep",
    image: "/images/projects/ceiling-substructure.jpg",
    description:
      "Terugkerende productie voor de montageteams van de Stretchgroup in België en Polen: frames en draagprofielen voor spanplafonds. De series komen van lasmallen, dus elk frame heeft dezelfde geometrie. Dit is de opdracht waarvoor deze werkplaats is gebouwd.",
  },
  {
    title: "Poedergecoate lichtkanalen",
    services: ["Lasersnijden", "Plooien", "Poedercoaten"],
    material: "Staalplaat 1,5–2,0 mm", // [CONFIRM]
    finish: "RAL 9016, fijne structuur", // [CONFIRM]
    imageCaption: "Lichtkanalen na het coaten, voor het verpakken",
    image: "/images/projects/powder-coating-light-channels.jpg",
    description:
      "Kanalen voor lineaire ledverlichting in spanplafonds: de uitslag lasergesneden, geplooid op de plooibank, gecoat in de kleur van het plafonddoek. Lengtes op maat van de ruimte, verpakt in montagevolgorde.",
  },
  {
    title: "Machinesteunen op maat",
    services: ["Lasersnijden", "Lassen", "CNC-bewerking"],
    material: "Staal S355, plaat 8–12 mm", // [CONFIRM]
    finish: "Poedercoating, RAL 7016", // [CONFIRM]
    imageCaption: "Steunen na het lassen, voor het frezen van de pasboringen",
    image: "/images/projects/machine-brackets.jpg",
    description:
      "Een reeks machinesteunen voor een industriële klant. De pasboringen zijn na het lassen gefreesd — de geometrie binnen tolerantie, ondanks de laskrimp. Van STEP-bestand tot levering in drie weken.", // [CONFIRM] termijn
  },
  {
    title: "Draagframes voor ledmodules",
    services: ["Engineering", "Lasersnijden", "Lassen"],
    material: "Staal — profielen en plaat 2–3 mm", // [CONFIRM]
    finish: "Poedercoating, RAL 9005 halfmat", // [CONFIRM]
    imageCaption: "Ledframe tijdens de proefmontage in de hal",
    image: "/images/projects/laser-cut-profiles.jpg",
    description:
      "Lichte frames voor ledpanelen in beursbouw. Onze constructeur maakte het 3D-model op basis van de schets van de klant; de frames zijn opgedeeld in segmenten met boutverbindingen voor snelle montage en demontage.",
  },
  {
    title: "Magazijnmezzanine met werkplatform",
    services: ["Engineering", "Lassen", "Staalconstructies"],
    material: "HEA/IPE-profielen, staal S355", // [CONFIRM]
    finish: "Poedercoating, RAL 7035; roostervloer", // [CONFIRM]
    imageCaption: "FOTO: mezzaninesegmenten klaar voor transport",
    description:
      "Een mezzanineconstructie, opgedeeld in segmenten op maat van de oplegger en ter plaatse samengebout — zonder laswerk op de werf. De werkplaats- en montagedocumentatie namen wij voor onze rekening; de klant ontving genummerde stukken en een montageplan.",
  },
];
