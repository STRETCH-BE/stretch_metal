/**
 * Home page content — Dutch (nl-BE).
 * File path: /content/nl/home.ts
 *
 * Mirrors /content/home.ts (same shape from @/content/types). Section order
 * follows the home composition: hero → ticker → stats → services → process →
 * machine park → why us → heritage → projects teaser → final CTA.
 *
 * Hero contract (fixed by the NL brief): words STAAL. GESNEDEN. GELAST.
 * GECOAT. with accentIndex 3; badge carries the Belgian group line — the
 * 🇧🇪 🇵🇱 flags are the site's single permitted emoji use.
 *
 * Register: zakelijk Vlaams for a Flemish B2B buyer — this is the group's
 * HOME market. The Belgian angle leads: Belgische groep, Nederlandstalig
 * contact, offerte in EUR, 1–2 dagen levering naar België.
 *
 * `machinePark.highlights` are editorial condensations (2 spec rows each)
 * of machines defined in full in ./machines — facts canonical in the POLISH
 * files; keep all three locales in sync when specs get confirmed.
 */

import type { HomeContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";
import { serviceCards } from "./services";

export const home: HomeContent = {
  hero: {
    badge: "Onderdeel van de Belgische Stretchgroup · 🇧🇪 🇵🇱",
    words: ["STAAL.", "GESNEDEN.", "GELAST.", "GECOAT."],
    accentIndex: 3,
    lead: "Deze werkplaats bouwden we voor onze eigen productie. Nu produceert ze voor u. Lasersnijden, lassen, CNC-bewerking en poedercoaten — van tekening tot gecoat stuk, onder één dak in Częstochowa. U belt of mailt gewoon in het Nederlands.",
    ctaPrimary: "Stuur uw tekening",
    ctaSecondary: "Bekijk onze diensten",
    imageCaption: "Productiehal — Częstochowa, Polen",
    image: "/images/hero/tig-welding-aluminium.jpg",
    imageAlt: "TIG-lassen van aluminium op een montagetafel in de werkplaats van StretchMetal",
  },

  ticker: [
    "LASERSNIJDEN",
    "LASSEN",
    "CNC-BEWERKING",
    "POEDERCOATEN",
    "STAALCONSTRUCTIES",
    "ENGINEERING",
  ],

  stats: {
    eyebrow: "In cijfers",
    items: [
      { value: "1 200 m²", label: "productiehal" }, // [CONFIRM]
      { value: "48 u", label: "tot een offerte op basis van uw tekening" }, // [CONFIRM]
      { value: "20 t", label: "staalverwerking per maand" }, // [CONFIRM]
      { value: "1–2 dagen", label: "levering naar België en Nederland" }, // [CONFIRM]
    ],
  },

  services: {
    eyebrow: "Diensten",
    title: "Zes diensten. Eén werkplaats.",
    accent: "Eén",
    lead: "Elke stap onder één dak — geen onderaannemers tussen het snijden en de kleur. U stuurt een tekening, u ontvangt een gecoat, montageklaar stuk.",
    cards: serviceCards,
    linkLabel: "Alle diensten",
  },

  process: {
    eyebrow: "Proces",
    title: "Van tekening tot levering",
    lead: "Vijf stappen. Geen verrassingen. En alles in het Nederlands geregeld.",
    steps: [
      {
        title: "Stuur uw tekening",
        description:
          "DXF, DWG, STEP of PDF via het offerteformulier — een schets met maten volstaat ook. NDA vooraf als u dat wenst.",
      },
      {
        title: "Offerte binnen 48 u",
        description:
          "Een concrete prijs in EUR en een concrete datum, geen vork. Technische vragen stellen wij meteen — in het Nederlands.", // [CONFIRM] 48 u
      },
      {
        title: "Productie",
        description:
          "Snijden, plooien, lassen, verspanen — volgens de goedgekeurde documentatie, op eigen machines.",
      },
      {
        title: "Controle en coating",
        description:
          "Meting van de geometrie, reinigen van de lasnaden, poedercoating ter plaatse — zonder onderaannemer.",
      },
      {
        title: "Levering in de EU",
        description:
          "Verpakt voor transport en verzonden. Naar België en Nederland 1–2 dagen vanaf de A1-autosnelweg.", // [CONFIRM] transporttijd
      },
    ],
    cta: "Stuur uw tekening",
  },

  machinePark: {
    eyebrow: "Machinepark",
    title: "Machines, geen beloften",
    lead: "Een eigen machinepark — geen wachtrij bij onderaannemers en geen data die afhangen van andermans capaciteit. De volledige lijst staat op de machineparkpagina.",
    highlights: [
      {
        name: "Fiberlasersnijmachine",
        type: "Plaatsnijden",
        specs: [
          { label: "Bronvermogen", value: "6 kW" }, // [CONFIRM]
          { label: "Werkbereik", value: "3 000 × 1 500 mm" }, // [CONFIRM]
        ],
      },
      {
        name: "Lasafdeling MIG/MAG en TIG",
        type: "6 lasposten", // [CONFIRM] aantal
        specs: [
          { label: "Methoden", value: "MIG/MAG (135/136), TIG (141)" },
          { label: "Materialen", value: "staal, inox, aluminium" },
        ],
      },
      {
        name: "CNC-plooibank",
        type: "Plaatwerk plooien",
        specs: [
          { label: "Perskracht", value: "135 t" }, // [CONFIRM]
          { label: "Plooilengte", value: "3 000 mm" }, // [CONFIRM]
        ],
      },
      {
        name: "Poedercoatlijn met oven",
        type: "Poedercoaterij",
        specs: [
          { label: "Kleuren", value: "volledig RAL-gamma" },
          { label: "Max. afmeting stuk", value: "3 000 mm" }, // [CONFIRM]
        ],
      },
    ],
    linkLabel: "Het volledige machinepark",
  },

  whyUs: {
    eyebrow: "Waarom StretchMetal",
    title: "Belgische standaarden, Poolse productie",
    items: [
      {
        title: "Belgische standaarden en service",
        description:
          "Wij zijn de werkplaats van de Belgische Stretchgroup. U belt of mailt gewoon in het Nederlands, u krijgt één vaste contactpersoon en antwoorden in dagen, niet in weken.",
      },
      {
        title: "Poolse productie-economie",
        description:
          "Productiekosten uit Częstochowa, niet uit West-Europa. Dezelfde documentatie, dezelfde maat — een lagere stukprijs, met de offerte gewoon in EUR en zonder douane binnen de EU.",
      },
      {
        title: "Staalregio aan de A1-autosnelweg",
        description:
          "Częstochowa is een staalbekken met een vaste materiaalbasis. Vanaf de A1 staat een oplegger in 1–2 dagen in België of Nederland.", // [CONFIRM] transporttijd
      },
      {
        title: "Van tekening tot gecoat stuk",
        description:
          "Ontwerp, snijden, lassen, verspanen en kleur onder één dak. Eén overeenkomst, één verantwoordelijke, één datum.",
      },
    ],
  },

  heritage: {
    eyebrow: "De groep",
    title: "Gebouwd voor de eigen productie",
    paragraphs: [
      "De Belgische Stretchgroup plaatst al jaren spanplafonds in heel Europa. Elk groter project heeft staal nodig: frames, lichtkanalen, onderconstructies. In plaats van die op de markt te kopen, wierf de groep in Częstochowa professionele lassers en metaalbewerkers aan en bouwde ze een eigen metaalwerkplaats.",
      "Die werkplaats heeft vandaag meer capaciteit dan de groep zelf verbruikt. Dat overschot werkt voor externe klanten — onder de naam StretchMetal, op dezelfde machines en volgens dezelfde standaarden die onze eigen montageteams dagelijks keuren.",
      "Voor u betekent dat één ding: deze werkplaats moest eerst haar strengste klant tevredenstellen — zichzelf.",
    ],
    brands: [
      {
        name: siteConfig.group.belgium.name,
        description: "Naadloze spanplafonds — België",
        url: siteConfig.group.belgium.url,
      },
      {
        name: siteConfig.group.poland.name,
        description: "Spanplafonds — productie in Polen",
        url: siteConfig.group.poland.url,
      },
    ],
    imageCaption: "Groepsproductie — België en Polen",
    image: "/images/heritage/steel-substructure-stretch-ceiling.jpg",
    imageAlt: "Stalen onderconstructie onder een verlicht spanplafond — een realisatie van de groep",
  },

  projects: {
    eyebrow: "Projecten",
    title: "Wat de hal verlaat",
    lead: "Onderconstructies, lichtkanalen, frames, mezzanines. Voorbeeldprojecten uit de productie voor de groep en voor externe klanten.",
    linkLabel: "Bekijk de projecten",
  },

  ctaFinal: {
    title: "Heeft u een tekening? De rest is voor ons.",
    accent: "tekening?",
    lead: "Stuur uw documentatie via het formulier — wij maken de offerte binnen 48 uur. Een concrete prijs in EUR, een concrete datum.", // [CONFIRM] 48 u
    cta: "Stuur uw tekening",
    ctaSecondary: `Bel ons: ${siteConfig.contact.phoneDisplay}`,
  },
};
