/**
 * Services content — Dutch (nl-BE).
 * File path: /content/nl/services.ts
 *
 * Mirrors /content/services.ts exactly (same export names, same shapes from
 * @/content/types) so PL, EN and NL pages render through identical
 * components. Facts (spec values, ranges, lead times) are canonical in the
 * POLISH file — mirrored 1:1 here with the same `// [CONFIRM]` markers.
 *
 * Register: zakelijk Vlaams-Nederlands for a Flemish purchasing manager or
 * technical buyer — formal "u", short sentences, millimetres and dates, no
 * marketing fluff. Not a translation: written natively, with the Belgian
 * angle leading (own workshop of a Belgian group, Dutch-speaking contact,
 * quotes in EUR, 1–2 days road delivery to Belgium).
 *
 * metaTitle: page template appends " | StretchMetal" — keep titles ≤45 chars
 * so the full tag stays ≤60. metaDescription ≤155 chars.
 *
 * Certification rule: never claim EN 1090 / ISO 3834 / ISO 9001 — quality
 * is only ever "verified by the group's own installation teams".
 */

import type { ServiceCard, ServiceContent, ServiceKey } from "@/content/types";

/* ─── Service cards (home + services hub grid) ────────────── */
/* Order is fixed by the build brief: welding, laser, cnc, coating,
 * design, structures. Components rely on this order for numbering. */

export const serviceCards: ServiceCard[] = [
  {
    key: "welding",
    name: "MIG/MAG- en TIG-lassen",
    short:
      "Staal, inox en aluminium. Frames, behuizingen en constructies — lasnaden gereinigd en gemeten voor verzending.",
    tags: ["MIG/MAG", "TIG", "Inox", "Aluminium"],
  },
  {
    key: "laser",
    name: "Lasersnijden van plaatwerk",
    short:
      "De fiberlaser snijdt rechtstreeks uit uw DXF-bestand. Herhaalbare series, zuivere snijkant — klaar om te plooien en te lassen.",
    tags: ["Fiberlaser", "DXF/DWG", "Staal tot 20 mm"], // [CONFIRM] diktebereik
  },
  {
    key: "cnc",
    name: "CNC-bewerking",
    short:
      "Frezen en draaien volgens uw documentatie. Machinedelen, pasboringen, schroefdraad — enkelstuks en series.",
    tags: ["Frezen", "Draaien", "STEP/IGES"],
  },
  {
    key: "coating",
    name: "Poedercoaten",
    short:
      "Eigen coaterij met oven, onder hetzelfde dak. Volledig RAL-gamma, mat of structuur — ook voor aangeleverde stukken.",
    tags: ["Volledig RAL", "Mat / structuur", "Aangeleverde stukken"],
  },
  {
    key: "design",
    name: "Engineering en documentatie",
    short:
      "Een constructeur aan de kant van de werkplaats. Van schets of opmeting tot 3D-model en productieklare tekeningen.",
    tags: ["3D-model", "Werkplaatstekeningen", "DXF voor laser"],
  },
  {
    key: "structures",
    name: "Staalconstructies",
    short:
      "Mezzanines, platformen, frames en onderconstructies op maat. Eén leverancier — van ontwerp tot gecoat, montageklaar stuk.",
    tags: ["Mezzanines", "Frames en steunen", "Onderconstructies"],
  },
];

/* ─── Full service pages ──────────────────────────────────── */

export const services: Record<ServiceKey, ServiceContent> = {
  /* ── 01 — Lassen ─────────────────────────────────────────── */
  welding: {
    key: "welding",
    name: "MIG/MAG- en TIG-lassen",
    metaTitle: "Laswerk op maat — MIG/MAG en TIG",
    metaDescription:
      "Lassen van staal, inox en aluminium in Częstochowa. Samenstellen tot 6 m, offerte binnen 48 u, levering naar België in 1–2 dagen. Belgische groep.", // [CONFIRM] afmeting, 48 u, levertijd
    hero: {
      eyebrow: "Lasafdeling",
      title: "Laswerk op maat en op datum.",
      accent: "datum.",
      lead: "MIG/MAG voor constructiestaal, TIG voor inox en aluminium. Wij lassen volgens uw tekening, houden de geometrie op lasmallen en reinigen en meten elke naad voor verzending. De eerste afnemer van deze werkplaats zijn de montageteams van onze eigen Belgische groep — zij keuren de kwaliteit voordat u dat doet.",
    },
    specTable: {
      title: "Bereik van de lasafdeling",
      rows: [
        { label: "Methoden", value: "MIG/MAG (135/136), TIG (141)" },
        { label: "Materialen", value: "Staal S235/S355, inox 304/316, aluminium" }, // [CONFIRM] materiaalkwaliteiten
        { label: "Diktebereik", value: "1–30 mm" }, // [CONFIRM]
        { label: "Max. afmeting samenstel", value: "6 000 × 2 000 × 2 000 mm" }, // [CONFIRM]
        { label: "Max. gewicht samenstel", value: "2 000 kg" }, // [CONFIRM]
        { label: "Voorbereiding", value: "Snijden, afschuinen, richten, reinigen van lasnaden" },
        { label: "Aangeleverde documentatie", value: "PDF, DXF, DWG, STEP" },
      ],
    },
    applications: {
      title: "Wat wij het vaakst lassen",
      intro:
        "Werkplaatsconstructies volgens uw documentatie of de onze — van losse frames tot herhaalbare series op lasmallen.",
      items: [
        {
          name: "Machineframes en onderstellen",
          description:
            "Draagconstructies voor machines en installaties — gericht na het lassen, met boringen voor ankerbouten.",
        },
        {
          name: "Onderconstructies en steunen",
          description:
            "Montage-elementen voor gevels, plafonds en installaties. Series met herhaalbare geometrie, gelast op mallen.",
        },
        {
          name: "Behuizingen en afschermingen",
          description:
            "Constructies uit geplooid plaatwerk en profielen — dicht of punctueel gelast, afhankelijk van de functie.",
        },
        {
          name: "Leuningen en ladders",
          description:
            "Staalwerk voor industriële gebouwen — geslepen en in eigen huis gepoedercoat.",
        },
        {
          name: "Inox constructies",
          description:
            "Korven, geleidingen, uitrustingsdelen — TIG-gelast, naden geslepen of chemisch gereinigd.",
        },
      ],
    },
    faq: [
      {
        question: "Welke materialen last u?",
        answer:
          "Constructiestaal S235/S355, inox 304/316 en aluminium. Constructiestaal lassen wij MIG/MAG, inox en aluminium TIG. Andere kwaliteiten bevestigen wij bij de offerte, na controle van de materiaalvoorraad.", // [CONFIRM] materiaalkwaliteiten
      },
      {
        question: "Maakt u ook enkele stuks?",
        answer:
          "Ja. Wij maken zowel enkelstuks als series. Een minimumafname is er niet — bij één stuk ligt de stukprijs gewoon hoger, omdat de insteltijd over minder stukken wordt gespreid. De concrete prijs staat in de offerte.",
      },
      {
        question: "Hoe controleert u de laskwaliteit?",
        answer:
          "Visuele controle en meting van de geometrie voor verzending — elk samenstel, niet steekproefsgewijs. Constructies voor de eigen groep gaan rechtstreeks naar montages in België en Polen: onze montageteams zijn de eerste kwaliteitscontrole. Een stuk dat de maat niet houdt, komt van de werf naar ons terug.",
      },
      {
        question: "Wat is de levertermijn voor laswerk?",
        answer:
          "Een typische werkplaatsopdracht leveren wij in 5–15 werkdagen na goedkeuring van de documentatie, afhankelijk van omvang en bezetting van de hal. De concrete datum krijgt u samen met de offerte — binnen 48 uur na ontvangst van uw tekening. Transport naar België duurt daarna 1–2 dagen.", // [CONFIRM] termijnen
      },
      {
        question: "Kan het stuk meteen gecoat vertrekken?",
        answer:
          "Ja. De poedercoaterij werkt in dezelfde hal — na het lassen en reinigen gaat het stuk rechtstreeks naar de coating, zonder transport naar een onderaannemer. Eén datum, één verantwoordelijke voor maat én laag.",
      },
      {
        question: "Kunnen wij alles in het Nederlands regelen?",
        answer:
          "Ja. StretchMetal is de werkplaats van een Belgische groep: u belt of mailt gewoon in het Nederlands, u krijgt één vaste contactpersoon en de offerte staat in EUR. De technische afwikkeling met de hal in Polen nemen wij op ons.",
      },
    ],
    related: ["structures", "coating", "laser"],
  },

  /* ── 02 — Lasersnijden ───────────────────────────────────── */
  laser: {
    key: "laser",
    name: "Lasersnijden van plaatwerk",
    metaTitle: "Lasersnijden plaatwerk — snel naar België",
    metaDescription:
      "Lasersnijden op een fiberlaser: staal tot 20 mm, inox tot 12 mm, aluminium tot 10 mm. Vanaf 1 stuk. Offerte in 48 u, levering naar België in 1–2 dagen.", // [CONFIRM] diktes, 48 u, levertijd
    hero: {
      eyebrow: "Lasersnijden",
      title: "Van DXF-bestand recht in de plaat.",
      accent: "DXF-bestand",
      lead: "De fiberlaser snijdt constructiestaal, inox en aluminium. U stuurt het bestand, wij bevestigen materiaal en datum — in het Nederlands, met een prijs in EUR. Zuivere snijkant, herhaalbare maat over de hele serie: de delen komen van de machine klaar om te plooien en te lassen.",
    },
    specTable: {
      title: "Snijparameters",
      rows: [
        { label: "Bron", value: "Fiberlaser 6 kW" }, // [CONFIRM]
        { label: "Werkbereik", value: "3 000 × 1 500 mm" }, // [CONFIRM]
        { label: "Constructiestaal", value: "tot 20 mm" }, // [CONFIRM]
        { label: "Inox", value: "tot 12 mm" }, // [CONFIRM]
        { label: "Aluminium", value: "tot 10 mm" }, // [CONFIRM]
        { label: "Snijnauwkeurigheid", value: "±0,1 mm" }, // [CONFIRM]
        { label: "Bestandsformaten", value: "DXF, DWG, STEP, PDF" },
        { label: "Seriegrootte", value: "van 1 stuk tot productieseries" },
      ],
    },
    applications: {
      title: "Wat wij snijden",
      items: [
        {
          name: "Delen voor plooi- en laswerk",
          description:
            "Plaatuitslagen met toeslagen voor onze eigen plooibank — gesneden en geplooid in dezelfde hal.",
        },
        {
          name: "Montageplaten en verbindingsstukken",
          description:
            "Platen met boringen voor bouten en stiften — geometrie uit het bestand, zonder aftekenen of handmatig boren.",
        },
        {
          name: "Panelen en ajourwerk",
          description:
            "Perforaties, logo's, decoratieve uitsnijdingen — de laser snijdt elke contour uit een vectorbestand.",
        },
        {
          name: "Prototypes",
          description:
            "Eerste stuk ter controle van de passing, serie na goedkeuring — zonder kosten voor matrijzen of stempels.",
        },
        {
          name: "Seriematige uitsnijpatronen",
          description:
            "Nesting op de volledige plaat drukt het afval en de stukprijs — hoe groter de serie, hoe goedkoper per stuk.",
        },
      ],
    },
    faq: [
      {
        question: "Welk bestandsformaat is het best voor offerte en productie?",
        answer:
          "DXF op schaal 1:1 — dat gaat vrijwel rechtstreeks naar de machine. DWG en STEP aanvaarden wij ook. Uit een PDF of een schets snijden wij eveneens, maar dan rekenen wij de tijd van de constructeur voor het natekenen van de contour mee — bij kleine reeksen weegt dat door in de prijs.",
      },
      {
        question: "Wat is het minimumaantal stuks?",
        answer:
          "Eén. De stukprijs daalt in serie, omdat wij de delen samen op de plaat nesten en het materiaal beter benutten. Bij terugkerende orders ligt het snijpatroon al klaar — volgende reeksen lopen sneller en goedkoper.",
      },
      {
        question: "Snijdt u ook uit aangeleverd materiaal?",
        answer:
          "Ja, na afspraak over kwaliteit en plaatformaat. Standaard snijden wij uit eigen materiaal met walscertificaat — wij hebben een vaste materiaalbasis in de staalregio rond Częstochowa.", // [CONFIRM] materiaalbeleid
      },
      {
        question: "Welke nauwkeurigheid houdt het lasersnijden aan?",
        answer:
          "Typisch ±0,1 mm op de contourmaten; bij dikke platen groeit de tolerantie mee met de snijspleet. Boringen met een diameter kleiner dan de plaatdikte maakt u beter met de boor of de frees — wij adviseren u bij de offerte.", // [CONFIRM] tolerantie
      },
      {
        question: "Hoe snel liggen de gesneden delen in België?",
        answer:
          "Eenvoudige orders met een klaar DXF-bestand snijden wij in 2–4 werkdagen na bevestiging; grotere patronen volgens de datum in de offerte. De offerte zelf versturen wij binnen 48 uur. Transport vanuit Częstochowa naar België duurt 1–2 dagen over de weg; Incoterms (EXW, DAP of geleverd op de werf) spreken wij per order af.", // [CONFIRM] termijnen
      },
    ],
    related: ["welding", "cnc", "design"],
  },

  /* ── 03 — CNC-bewerking ──────────────────────────────────── */
  cnc: {
    key: "cnc",
    name: "CNC-bewerking",
    metaTitle: "CNC-frezen en -draaien — Poolse productie",
    metaDescription:
      "CNC-frezen en -draaien van staal, inox en aluminium. Toleranties tot ±0,02 mm, nabewerking van laswerk, prototypes en series. STEP/IGES. Offerte in 48 u.", // [CONFIRM] toleranties, 48 u
    hero: {
      eyebrow: "CNC-bewerking",
      title: "Frezen en draaien op tolerantie.",
      accent: "tolerantie.",
      lead: "Wij verspanen machinedelen volgens uw documentatie: enkelstuks, wisselstukken, herhaalbare series. De CNC-frees en -draaibank staan in dezelfde hal als de lasafdeling — wij bewerken ook onze eigen constructies na het lassen, wanneer een vlak of een pasboring telt.",
    },
    specTable: {
      title: "Bewerkingsbereik",
      rows: [
        { label: "Frezen", value: "3 assen, tafel 1 000 × 500 mm" }, // [CONFIRM]
        { label: "Draaien", value: "Ø tot 400 mm, lengte tot 1 000 mm" }, // [CONFIRM]
        { label: "Toleranties", value: "standaard ISO 2768-m, aangeduide maten tot ±0,02 mm" }, // [CONFIRM]
        { label: "Materialen", value: "staal, inox, aluminium, messing, kunststoffen" }, // [CONFIRM]
        { label: "Documentatie", value: "STEP, IGES, DXF, PDF met maten" },
        { label: "Seriegrootte", value: "1–1 000 stuks" }, // [CONFIRM]
      ],
    },
    applications: {
      title: "Wat wij bewerken",
      items: [
        {
          name: "Machinedelen",
          description:
            "Assen, bussen, flenzen, wielen — gedraaid en gefreesd volgens tekening, met schroefdraad en passingen.",
        },
        {
          name: "Pasplaten en basisplaten",
          description:
            "Boringen voor lagers en paspennen, aanligvlakken — waar laser en boormachine niet volstaan.",
        },
        {
          name: "Nabewerking na het lassen",
          description:
            "Frezen van vlakken en boringen in gelaste constructies — de geometrie komt terug binnen tolerantie, ondanks de laskrimp.",
        },
        {
          name: "Wisselstukken",
          description:
            "Wij reconstrueren delen op basis van het versleten stuk of een opmeting — met documentatie voor volgende bestellingen.",
        },
      ],
    },
    faq: [
      {
        question: "Welke toleranties haalt u?",
        answer:
          "Standaard ISO 2768-m; op aangeduide maten gaan wij tot ±0,02 mm. Duid de kritische toleranties aan op de tekening — elk vlak 'voor de zekerheid' nauw tolereren maakt het stuk onnodig duur.", // [CONFIRM] toleranties
      },
      {
        question: "Bewerkt u constructies na het lassen?",
        answer:
          "Ja, dat is onze dagelijkse praktijk. Aanligvlakken en pasboringen frezen wij na het lassen, zodat de laskrimp de tolerantie niet opeet. Lasafdeling en verspaning in één hal — de constructie reist niet tussen firma's.",
      },
      {
        question: "Met welke bestanden werkt u?",
        answer:
          "Het liefst STEP of IGES plus een PDF met toleranties en ruwheid. Een PDF-tekening alleen volstaat ook — het model maakt onze constructeur. Bij wisselstukken is het versleten stuk en een schuifmaat soms de hele basis.",
      },
      {
        question: "Loont één enkel stuk bij u de moeite?",
        answer:
          "Ja — daarvoor hebben wij net een universeel machinepark. Prototypes, wisselstukken en herstellingen zijn een vast deel van de productie. Bij series daalt de stukprijs, omdat programmeren en opspannen over de reeks worden gespreid.",
      },
      {
        question: "Wat is de doorlooptijd van de bewerking?",
        answer:
          "Losse stukken meestal in 3–7 werkdagen, series volgens de datum in de offerte. De termijn krijgt u samen met de prijs, binnen 48 uur na ontvangst van de documentatie — en de levering naar België neemt daarna 1–2 dagen.", // [CONFIRM] termijnen
      },
    ],
    related: ["laser", "welding", "design"],
  },

  /* ── 04 — Poedercoaten ───────────────────────────────────── */
  coating: {
    key: "coating",
    name: "Poedercoaten",
    metaTitle: "Poedercoaten in alle RAL-kleuren",
    metaDescription:
      "Eigen poedercoaterij met oven: volledig RAL-gamma, mat en structuur, stukken tot 3 m. Ook aangeleverde delen. Offerte in 48 u, levering naar België.", // [CONFIRM] afmeting, 48 u
    hero: {
      eyebrow: "Poedercoaterij",
      title: "Laag uit de oven, kleur uit het RAL-gamma.",
      accent: "RAL-gamma.",
      lead: "Een eigen coaterij sluit de productie onder één dak: de constructie reist niet tussen onderaannemers en de datum hangt niet af van andermans wachtrij. Wij coaten stukken uit de eigen productie én aangeleverde delen — van enkelstuks tot series.",
    },
    specTable: {
      title: "Parameters van de coaterij",
      rows: [
        { label: "Kleuren", value: "volledig RAL-gamma" },
        { label: "Afwerkingen", value: "mat, halfmat, glans, structuur" },
        { label: "Max. afmeting stuk", value: "3 000 × 1 200 × 1 500 mm" }, // [CONFIRM]
        { label: "Laagdikte", value: "60–120 µm" }, // [CONFIRM]
        { label: "Voorbehandeling", value: "ontvetten, chemisch reinigen" }, // [CONFIRM] technologie
        { label: "Moffelen", value: "oven, 180–200 °C" }, // [CONFIRM]
        { label: "Aangeleverde stukken", value: "ja — ook zonder andere diensten" },
      ],
    },
    applications: {
      title: "Wat wij coaten",
      items: [
        {
          name: "Constructies uit de eigen hal",
          description:
            "Frames, steunen en onderconstructies coaten wij meteen na het lassen en reinigen — zonder transport en zonder wachten.",
        },
        {
          name: "Lichtkanalen en -profielen",
          description:
            "In serie voor de plafondprojecten van de groep — kleur afgestemd op het doek, laag bestand tegen de montage.",
        },
        {
          name: "Geplooid plaatwerk en behuizingen",
          description:
            "Panelen, afschermingen, machinebehuizingen — gecoat na het plooien, met bescherming van de zichtvlakken.",
        },
        {
          name: "Aangeleverde stukken",
          description:
            "Wij nemen delen van andere werkplaatsen en eindklanten aan — op voorwaarde van een zuiver, voorbereid oppervlak.",
        },
        {
          name: "Interieurelementen",
          description:
            "Metalen meubelen, stellingen, decoratieve frames — een fijne structuurlak maskeert las- en slijpsporen goed.",
        },
      ],
    },
    faq: [
      {
        question: "Coat u ook aangeleverde stukken?",
        answer:
          "Ja — u hoeft bij ons niets anders te bestellen dan het coaten. Voorwaarde: een oppervlak zonder roest, walshuid of oude lagen. Vraagt het stuk voorbereiding, dan prijzen wij die apart voordat wij de opdracht aannemen.",
      },
      {
        question: "Welke kleuren en afwerkingen zijn beschikbaar?",
        answer:
          "Het volledige RAL-gamma in mat, halfmat en glans, plus structuurlakken. Kleuren buiten voorraad bestellen wij per opdracht — bij kleine reeksen rekenen wij de minimumverpakking poeder mee.", // [CONFIRM] kleurenbeleid
      },
      {
        question: "Hoe duurzaam is een poedercoating?",
        answer:
          "Een laag van 60–120 µm is mechanisch sterker dan natlak — ze verdraagt transport, montage en industrieel gebruik. Voor buitentoepassingen kiezen wij poeder met de juiste UV-bestendigheid en adviseren wij een corrosiewering onder de laag.", // [CONFIRM] laagdikte
      },
      {
        question: "Wat is het grootste stuk dat in de oven past?",
        answer:
          "3 000 × 1 200 × 1 500 mm. Grotere constructies delen wij al in de ontwerpfase op in segmenten — de boutverbindingen plannen wij zo dat elk segment in de oven en op de oplegger past.", // [CONFIRM] ovenafmeting
      },
      {
        question: "Hoelang duurt het coaten van een reeks?",
        answer:
          "Typisch 2–3 werkdagen na aanlevering, bij een kleur uit voorraad. Bestelde kleuren verlengen de termijn met de levertijd van het poeder — de concrete datum krijgt u bij de aanname van de opdracht, en de levering naar België volgt in 1–2 dagen.", // [CONFIRM] termijnen
      },
    ],
    related: ["welding", "structures", "laser"],
  },

  /* ── 05 — Engineering ────────────────────────────────────── */
  design: {
    key: "design",
    name: "Engineering en documentatie",
    metaTitle: "Engineering en werkplaatstekeningen",
    metaDescription:
      "Een constructeur aan de kant van de werkplaats: 3D-model, werkplaatstekeningen en DXF-bestanden voor de laser — vanaf een schets, foto of opmeting.",
    hero: {
      eyebrow: "Engineering",
      title: "Van uw schets maken wij documentatie.",
      accent: "documentatie.",
      lead: "Niet elke klant heeft een studiebureau. U stuurt een schets, een foto of maten van ter plaatse — onze constructeur maakt het 3D-model, de werkplaatstekeningen en de productiebestanden. Wij ontwerpen voor ons eigen machinepark, dus de documentatie is meteen produceerbaar.",
    },
    specTable: {
      title: "Bereik van de engineering",
      rows: [
        { label: "Invoer", value: "schets, foto, opmeting ter plaatse, model van de klant" },
        { label: "Modellering", value: "3D-CAD — lasconstructies en geplooid plaatwerk" }, // [CONFIRM] software
        { label: "Uitvoer", value: "werkplaatstekeningen PDF, DXF voor de laser, STEP" },
        { label: "Plaatuitslagen", value: "met de plooiradii van onze eigen plooibank" },
        { label: "Goedkeuring", value: "documentatie goedgekeurd voor de productie start" },
        { label: "Revisies", value: "aanpassingen vóór productie in de prijs inbegrepen" }, // [CONFIRM] afspraken
      ],
    },
    applications: {
      title: "Wanneer de engineering het verschil maakt",
      items: [
        {
          name: "Constructie zonder documentatie",
          description:
            "Er bestaat alleen een idee of een oud stuk. Wij meten, modelleren, documenteren — en produceren.",
        },
        {
          name: "Ontwerp aanpassen aan de productie",
          description:
            "Hetzelfde product, eenvoudigere technologie: minder laswerk, minder plooien, lagere prijs bij dezelfde functie.",
        },
        {
          name: "Plaatuitslagen",
          description:
            "Uit het 3D-model maken wij uitslagen met toeslagen voor onze plooibank — het stuk houdt na het plooien de maat.",
        },
        {
          name: "Werkplaats- en montagedocumentatie",
          description:
            "Tekeningen voor de hal en voor het team op de werf: stuknummering, boutenlijsten, montagevolgorde.",
        },
      ],
    },
    faq: [
      {
        question: "Ik heb alleen een foto en enkele maten. Volstaat dat?",
        answer:
          "Ja. Beschrijf de functie van het stuk en de verwachte belasting, de rest modelleren wij bij. Bij grotere constructies kunnen wij ter plaatse opmeten — de actieradius spreken wij individueel af.", // [CONFIRM] meetbereik
      },
      {
        question: "Krijg ik de ontwerpbestanden?",
        answer:
          "PDF-tekeningen en STEP- en DXF-bestanden leveren wij standaard mee met het product. De overdracht van native CAD-bestanden leggen wij vast in de overeenkomst.", // [CONFIRM] bestandenbeleid
      },
      {
        question: "Ontwerpt u alleen voor uw eigen productie?",
        answer:
          "Hoofdzakelijk wel — dan houdt het ontwerp meteen rekening met ons machinepark en is de technologie het goedkoopst. Documentatie zonder productie maken wij ook, verrekend per uur.",
      },
      {
        question: "Wat kost een ontwerp?",
        answer:
          "Produceert u bij ons, dan zit de documentatie gedeeltelijk of volledig in de productprijs — afhankelijk van de omvang. Een losse documentatieopdracht prijzen wij per uur, na inzage van het aangeleverde materiaal. De offerte staat in EUR.", // [CONFIRM] verrekenmodel
      },
      {
        question: "Maakt u ook statische berekeningen?",
        answer:
          "Profieldoorsneden kiezen wij volgens werkplaatspraktijk en uw richtlijnen. Vraagt het project gecertificeerde statische berekeningen, dan organiseren wij die samen met een extern studiebureau — meld dat bij uw aanvraag.", // [CONFIRM] samenwerking studiebureau
      },
      {
        question: "Tekent u een NDA voordat wij tekeningen doorsturen?",
        answer:
          "Ja, standaard en op eenvoudige vraag — voordat er technische informatie wordt uitgewisseld. Stuur uw model, of vraag het onze. Vertrouwelijkheid is bij industriële projecten de normale gang van zaken.",
      },
    ],
    related: ["structures", "laser", "welding"],
  },

  /* ── 06 — Staalconstructies ──────────────────────────────── */
  structures: {
    key: "structures",
    name: "Staalconstructies",
    metaTitle: "Staalconstructies op maat uit Polen",
    metaDescription:
      "Complete staalconstructies: mezzanines, platformen, frames, onderconstructies. Ontwerp, laswerk, poedercoating en levering naar België in 1–2 dagen.", // [CONFIRM] levertijd
    hero: {
      eyebrow: "Staalconstructies",
      title: "De complete constructie. Eén leverancier.",
      accent: "Eén",
      lead: "Ontwerp, snijden, lassen, coaten, leveren — één overeenkomst en één verantwoordelijke. Zo werken wij al jaren voor de projecten van onze eigen groep in België en Polen. Precies zo leveren wij constructies aan externe klanten.",
    },
    specTable: {
      title: "Uitvoeringsbereik",
      rows: [
        { label: "Constructietypes", value: "mezzanines, platformen, frames, onderconstructies, leuningen, trappen" },
        { label: "Materiaal", value: "profielen en platen S235JR / S355J2" }, // [CONFIRM] kwaliteiten
        { label: "Max. gewicht gelast samenstel", value: "2 000 kg" }, // [CONFIRM]
        {
          label: "Max. afmeting gelast samenstel",
          value: "6 000 × 2 000 × 2 000 mm; grotere constructies in geboute segmenten", // [CONFIRM]
        },
        { label: "Opdeling in segmenten", value: "voor transport en montage — boutverbindingen" },
        { label: "Afwerking", value: "poedercoating in eigen huis, verzinken bij een partner" }, // [CONFIRM] verzinken
        { label: "Documentatie", value: "3D-model, werkplaats- en montagetekeningen" },
        { label: "Levering", value: "heel de EU — naar België en Nederland in 1–2 dagen" }, // [CONFIRM] transporttijd
      ],
    },
    applications: {
      title: "Wat wij bouwen",
      items: [
        {
          name: "Mezzanines en platformen",
          description:
            "Extra vloeroppervlak in hal of magazijn — segmenten die ter plaatse worden samengebout, zonder laswerk op de werf.",
        },
        {
          name: "Onderconstructies voor gevels en plafonds",
          description:
            "Onze specialiteit sinds dag één van de werkplaats — herhaalbare series voor de montageteams van de groep.",
        },
        {
          name: "Frames en draagstellingen voor installaties",
          description:
            "Draagconstructies voor machines en installaties — met montageplaten en boringen voor ankerbouten.",
        },
        {
          name: "Industriële trappen en leuningen",
          description:
            "Circulatie in hallen en technische gebouwen — gepoedercoat in een kleur uit het RAL-gamma.",
        },
        {
          name: "Steunen en leidingtracés",
          description:
            "Consoles en constructies voor leidingen, ventilatiekanalen en kabelgoten — op maat uit het ontwerp.",
        },
      ],
    },
    faq: [
      {
        question: "Staat u ook in voor de montage?",
        answer:
          "Wij leveren constructies montageklaar: genummerde segmenten, boutverbindingen, volledige montagedocumentatie. De montage zelf is aan de klant; ondersteuning van ons team op de werf spreken wij individueel af.", // [CONFIRM] montagebereik
      },
      {
        question: "Heeft u een EN 1090-certificaat?",
        answer:
          "Nee, wij claimen geen certificering. Wij maken werkplaatsconstructies waarvan de kwaliteit dagelijks wordt gekeurd door de montageteams van onze eigen groep — zij zijn de eerste afnemer van deze hal. Vraagt uw project een gecertificeerde uitvoerder, meld het ons dan bij de aanvraag.",
      },
      {
        question: "Hoe verloopt het transport van grote constructies naar België?",
        answer:
          "De constructie delen wij al in de ontwerpfase op in segmenten op maat van de oplegger. Vanuit Częstochowa aan de A1-autosnelweg duurt het transport naar België en Nederland 1–2 dagen. Incoterms — EXW, DAP of geleverd op de werf — spreken wij per order af.", // [CONFIRM] transporttijden
      },
      {
        question: "Wat heeft u nodig voor een offerte?",
        answer:
          "Een tekening of schets met de hoofdmaten, informatie over functie en belasting, en het leveradres. Bestaat er geen documentatie, dan maakt onze engineering die. DXF, DWG, STEP of PDF volstaat — de offerte met datum versturen wij binnen 48 uur, in EUR.", // [CONFIRM] 48 u
      },
      {
        question: "Komt de constructie gecoat aan?",
        answer:
          "Ja. De poedercoaterij werkt in dezelfde hal, dus de segmenten komen in de definitieve kleur aan — op de werf rest alleen het bouten. Op vraag beschermen wij de zichtvlakken voor het transport.",
      },
    ],
    related: ["welding", "coating", "design"],
  },
};
