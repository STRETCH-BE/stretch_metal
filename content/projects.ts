/**
 * Projects content (PL) — case entries for /realizacje + the home teaser.
 * File path: /content/projects.ts
 *
 * [CONFIRM] STATUS OF THIS WHOLE FILE: every entry is a REPRESENTATIVE
 * SAMPLE of the workshop's actual work types (group substructures, light
 * channels, brackets, LED frames, mezzanine), written to be replaced or
 * confirmed by the owner with real jobs, quantities and photos. Numbers
 * inside entries carry their own `// [CONFIRM]` lines.
 *
 * No `image` paths yet — `imageCaption` ("ZDJĘCIE: …") describes the shot
 * to take; WorkshopImage renders it on the placeholder until a real photo
 * lands in `image`, then the caption becomes its alt-text base.
 */

import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    title: "Podkonstrukcje sufitowe dla ekip grupy",
    services: ["Cięcie laserowe", "Spawanie", "Malowanie proszkowe"],
    material: "Stal S235, profile zamknięte 30 × 30 mm", // [CONFIRM]
    finish: "Malowanie proszkowe, RAL 9005 mat", // [CONFIRM]
    imageCaption: "ZDJĘCIE: partia spawanych ram podkonstrukcji na palecie transportowej",
    description:
      "Powtarzalna produkcja dla ekip montażowych Stretchgroup w Belgii i Polsce: ramy i profile nośne pod sufity napinane. Serie schodzą z przyrządów spawalniczych, więc każda rama ma tę samą geometrię. To zlecenie, dla którego ten warsztat powstał.",
  },
  {
    title: "Kanały świetlne malowane proszkowo",
    services: ["Cięcie laserowe", "Gięcie", "Malowanie proszkowe"],
    material: "Blacha stalowa 1,5–2,0 mm", // [CONFIRM]
    finish: "RAL 9016, struktura drobna", // [CONFIRM]
    imageCaption: "ZDJĘCIE: kanały świetlne po malowaniu, przed pakowaniem",
    description:
      "Kanały pod liniowe oświetlenie LED w sufitach napinanych: rozwinięcie cięte laserem, gięcie na prasie krawędziowej, malowanie pod kolor membrany. Długości na wymiar pomieszczenia, pakowane w kolejności montażu.",
  },
  {
    title: "Wsporniki maszynowe na wymiar",
    services: ["Cięcie laserowe", "Spawanie", "Obróbka CNC"],
    material: "Stal S355, blacha 8–12 mm", // [CONFIRM]
    finish: "Malowanie proszkowe, RAL 7016", // [CONFIRM]
    imageCaption: "ZDJĘCIE: wsporniki po spawaniu, przed frezowaniem otworów pasowanych",
    description:
      "Partia wsporników pod urządzenia dla klienta przemysłowego. Otwory pasowane frezowane po spawaniu — geometria w tolerancji mimo skurczu spawalniczego. Od pliku STEP do dostawy w trzy tygodnie.", // [CONFIRM] termin
  },
  {
    title: "Ramy nośne pod moduły LED",
    services: ["Projektowanie", "Cięcie laserowe", "Spawanie"],
    material: "Stal — profile i blacha 2–3 mm", // [CONFIRM]
    finish: "Malowanie proszkowe, RAL 9005 półmat", // [CONFIRM]
    imageCaption: "ZDJĘCIE: rama LED podczas montażu próbnego na hali",
    description:
      "Lekkie ramy pod panele LED do zabudowy wystawienniczej. Konstruktor przygotował model 3D na podstawie szkicu klienta; ramy podzielone na segmenty ze złączami śrubowymi pod szybki montaż i demontaż.",
  },
  {
    title: "Antresola magazynowa z platformą roboczą",
    services: ["Projektowanie", "Spawanie", "Konstrukcje stalowe"],
    material: "Profile HEA/IPE, stal S355", // [CONFIRM]
    finish: "Malowanie proszkowe, RAL 7035; krata pomostowa", // [CONFIRM]
    imageCaption: "ZDJĘCIE: segmenty antresoli przygotowane do transportu",
    description:
      "Konstrukcja antresoli podzielona na segmenty pod naczepę i skręcana na miejscu — bez spawania na budowie. Dokumentacja warsztatowa i montażowa po naszej stronie; klient otrzymał ponumerowane elementy i plan montażu.",
  },
];
