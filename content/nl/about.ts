/**
 * About page content — Dutch (nl-BE).
 * File path: /content/nl/about.ts
 *
 * Mirrors /content/about.ts (same shape, same timeline years — facts are
 * canonical in the POLISH file, every year `// [CONFIRM]`). The page argues
 * one thing: this workshop existed BEFORE it had external customers — the
 * Belgian group built it for its own ceiling production, so its first and
 * toughest client is itself. For the Flemish reader that argument is
 * doubled: this is a BELGIAN group's own workshop, with Dutch-speaking
 * contact and Belgian service standards on Polish production economics.
 *
 * Certification rule: no EN 1090 / ISO 3834 / ISO 9001 claims anywhere.
 * Quality may only be attributed to the group's own installation teams
 * being the first customer.
 */

import type { AboutContent } from "@/content/types";

export const about: AboutContent = {
  metaTitle: "Over ons — werkplaats van de Stretchgroup",
  metaDescription:
    "De metaalwerkplaats van de Belgische Stretchgroup in Częstochowa. Gebouwd voor de eigen productie, vandaag ook voor uw orders — Nederlandstalig contact.",

  hero: {
    eyebrow: "Over ons",
    title: "Deze werkplaats bouwden we voor onszelf.",
    accent: "onszelf.",
    lead: "De Stretchgroup had staal nodig voor haar eigen plafondprojecten — op tijd, op maat, in de juiste kleur. Zo ontstond in Częstochowa een metaalwerkplaats die vandaag, als StretchMetal, ook voor externe klanten in heel de EU produceert. Met een Belgische groep achter zich — en dus met een aanspreekpunt in het Nederlands.",
  },

  timeline: {
    eyebrow: "Geschiedenis",
    title: "Van België naar Częstochowa",
    entries: [
      {
        year: "2008", // [CONFIRM]
        title: "STRETCH in België",
        description:
          "Het begin van de groep: naadloze spanplafonds, montages in de Benelux en Frankrijk. Het aantal projecten groeit — en daarmee de vraag naar staal.",
      },
      {
        year: "2016", // [CONFIRM]
        title: "Plafondproductie in Częstochowa",
        description:
          "De groep start in Polen de productie van spanplafonds (Alto Design / Stretch Sufit). Częstochowa wordt de productiebasis van de groep.",
      },
      {
        year: "2022", // [CONFIRM]
        title: "Een eigen metaalwerkplaats",
        description:
          "Plafondprojecten hebben frames, lichtkanalen en onderconstructies nodig. De groep werft professionele lassers en metaalbewerkers aan en bouwt een werkplaats voor eigen gebruik.",
      },
      {
        year: "2024", // [CONFIRM]
        title: "StretchMetal opent zich naar de markt",
        description:
          "De werkplaats heeft meer capaciteit dan de groep verbruikt. Het overschot werkt voor externe klanten — onder de naam StretchMetal, op dezelfde machines.",
      },
    ],
  },

  story: {
    eyebrow: "Wie we zijn",
    title: "Eerst de eigen productie, dan de markt",
    paragraphs: [
      "De meeste werkplaatsen ontstaan om diensten te verkopen. Deze ontstond om een probleem op te lossen: de Belgische Stretchgroup had stalen frames, lichtkanalen en onderconstructies nodig voor haar plafondprojecten — op tijd, op maat, in de juiste kleur.",
      "Die stukken op de markt kopen betekende compromissen in termijnen en kwaliteit. De groep koos een andere weg: ze wierf in Częstochowa professionele lassers en metaalbewerkers aan, kocht machines en bouwde een werkplaats naar haar eigen eisen.",
      "Die opzet heeft een gevolg dat u vandaag nog voelt: onze eerste klant zijn onze eigen montageteams. Een stuk dat de maat niet houdt, komt van de werf naar ons terug — de controle begint dus in de hal, niet bij de klant.",
      "Vandaag overstijgt de capaciteit van de werkplaats de behoefte van de groep. Het verschil verkopen wij extern: aan bedrijven uit België, Nederland, Duitsland en Polen die een partner zoeken die antwoordt in millimeters en data.",
    ],
  },

  team: {
    eyebrow: "Het team",
    title: "Mensen van staal",
    lead: "Professionele lassers, metaalbewerkers, CNC-operatoren en een constructeur — een team dat de groep jarenlang opbouwde voor de eigen productie. Externe orders lopen via één vaste contactpersoon: in het Nederlands, Engels of Pools.",
    imageCaption: "FOTO: het werkplaatsteam aan de lastafel — hal StretchMetal",
  },

  values: {
    eyebrow: "Principes",
    title: "Vier werkprincipes",
    items: [
      {
        title: "Precisie",
        description:
          "De tekening is de overeenkomst. De maat uit de documentatie is de maat in de hal — gemeten voor verzending, niet na een klacht.",
      },
      {
        title: "Communicatie",
        description:
          "Eén vaste contactpersoon en antwoorden in dagen, niet in weken — in het Nederlands, Engels of Pools. Problemen melden wij voordat u ze in de levering ziet.",
      },
      {
        title: "Termijnen",
        description:
          "De datum staat in de offerte en wij bewaken hem. Komt de datum in gevaar, dan weet u het meteen — met een nieuwe datum, niet met een excuus.",
      },
      {
        title: "Verantwoordelijkheid voor het geheel",
        description:
          "Van tekening tot gecoat, verpakt stuk — één firma. Wij wijzen niet naar onderaannemers, want die zijn er niet.",
      },
    ],
  },
};
