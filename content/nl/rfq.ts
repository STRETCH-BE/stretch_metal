/**
 * RFQ page content — Dutch (nl-BE). /nl/offerte.
 * File path: /content/nl/rfq.ts
 *
 * Mirrors /content/rfq.ts exactly (same export name, same RfqContent
 * shape) so the NL page renders through identical components.
 *
 * Register: written natively for a Flemish/Belgian purchasing manager or
 * technical buyer — zakelijk Vlaams-Nederlands, formal "u", short
 * sentences, zero marketing fluff. The Belgian angle leads: a Belgian
 * group's own workshop in Poland, Dutch-language contact, quotes in EUR,
 * 1–2 days road delivery to Belgium/Benelux. Not a translation.
 *
 * Field option VALUES (country codes, ServiceKey, material keys) are the
 * API contract with /app/api/rfq/route.ts — labels are free to change,
 * values are not. Every unverified promise (48 h, delivery times)
 * carries `// [CONFIRM]` on its line — greppable.
 * Never claim certifications (EN 1090, ISO 3834, ISO 9001).
 */

import type { RfqContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";

export const rfq: RfqContent = {
  metaTitle: "Offerte — stuur uw tekening", // template appends "| StretchMetal"
  metaDescription:
    "Voeg uw tekening toe (DXF, DWG, STEP, PDF) en beschrijf de opdracht. Een ingenieur antwoordt binnen 48 uur — in het Nederlands, met prijzen in euro.", // [CONFIRM] 48 h

  hero: {
    eyebrow: "Offerte aanvragen",
    title: "Stuur uw tekening. Ontvang uw offerte.",
    accent: "offerte.",
    lead: "Voeg uw documentatie toe — DXF, DWG, STEP of PDF — en beschrijf wat wij moeten maken. Uw aanvraag komt rechtstreeks bij een ingenieur terecht, niet in een verkoopmailbox. U krijgt een prijs in euro en een leverdatum, geen brochure — en u communiceert gewoon in het Nederlands.",
  },

  form: {
    company: "Bedrijf",
    name: "Naam *",
    email: "E-mail *",
    phone: "Telefoon",
    country: "Land",
    countries: [
      { value: "PL", label: "Polen" },
      { value: "DE", label: "Duitsland" },
      { value: "BE", label: "België" },
      { value: "NL", label: "Nederland" },
      { value: "FR", label: "Frankrijk" },
      { value: "AT", label: "Oostenrijk" },
      { value: "CZ", label: "Tsjechië" },
      { value: "SK", label: "Slowakije" },
      { value: "LT", label: "Litouwen" },
      { value: "SE", label: "Zweden" },
      { value: "DK", label: "Denemarken" },
      { value: "other", label: "Ander land" },
    ],
    services: "Uit te voeren werk",
    serviceOptions: [
      { value: "welding", label: "Lassen" },
      { value: "laser", label: "Lasersnijden" },
      { value: "cnc", label: "CNC-bewerking" },
      { value: "coating", label: "Poedercoaten" },
      { value: "design", label: "Engineering" },
      { value: "structures", label: "Staalconstructies" },
    ],
    material: "Materiaal",
    materialOptions: [
      { value: "steel", label: "Constructiestaal" },
      { value: "stainless", label: "Inox (roestvast staal)" },
      { value: "aluminium", label: "Aluminium" },
      { value: "other", label: "Ander / gemengd" },
    ],
    quantity: "Aantal / seriegrootte",
    quantityPlaceholder: "bv. 25 stuks, maandelijks terugkerende serie",
    deadline: "Gewenste levertermijn",
    deadlinePlaceholder: "bv. 3 weken, of een concrete datum",
    message: "Omschrijving van de opdracht *",
    messagePlaceholder:
      "Wat moeten wij maken? Afmetingen, diktes, materiaalkwaliteit, RAL-kleur, aantallen. Hoe concreter, hoe sneller de offerte.",
    files: {
      label: "Bestanden — tekeningen en documentatie",
      hint: "DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP · max. 10 bestanden, samen 4 MB — grotere pakketten als ZIP of per e-mail",
      drop: "Sleep uw bestanden hierheen",
      browse: "Bestanden kiezen",
      remove: "Verwijderen",
      errorType:
        "Bestandstype niet ondersteund of bestand is leeg. Toegelaten: DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP.",
      errorSize:
        "Limiet: max. 10 bestanden, samen 4 MB. Pak een groter pakket in een ZIP of stuur het per e-mail.",
    },
    consent:
      "Ik ga akkoord met de verwerking van mijn gegevens voor het opstellen van een offerte en het verdere contact, zoals beschreven in het",
    consentLinkLabel: "privacybeleid",
    submit: "Verstuur aanvraag",
    submitting: "Versturen…",
    errorGeneric: `Versturen mislukt. Mail ons: ${siteConfig.contact.email} of bel: ${siteConfig.contact.phoneDisplay}.`, // [CONFIRM] email, phone
    errorRequired: "Dit veld is verplicht.",
    errorEmail: "Geef een geldig e-mailadres op.",
  },

  trust: {
    title: "Zo werken wij",
    items: [
      {
        title: "Antwoord binnen 48 uur", // [CONFIRM] quote turnaround
        description:
          "Een offerte of technische vragen binnen 48 uur, met prijzen in euro. Geen automatische antwoorden — u hoort van de persoon die uw opdracht heeft doorgerekend.",
      },
      {
        title: "Uw bestanden blijven vertrouwelijk",
        description:
          "De documentatie dient uitsluitend om de offerte op te stellen. Ze wordt met niemand gedeeld buiten het team dat de berekening maakt.",
      },
      {
        title: "NDA op verzoek",
        description:
          "Werkt u aan een beschermd ontwerp? Wij ondertekenen een NDA vóór u documentatie overmaakt — vermeld het gewoon in uw bericht.",
      },
      {
        title: "Rechtstreeks contact met een ingenieur",
        description:
          "Vanaf het eerste antwoord spreekt u met een technisch profiel, niet met een accountmanager. En u belt of mailt gewoon in het Nederlands — de groep achter de werkplaats is Belgisch.",
      },
    ],
  },

  process: {
    title: "Van tekening tot levering",
    steps: [
      {
        title: "U stuurt de tekening",
        description:
          "DXF, DWG, STEP of PDF. Een schets met maten volstaat ook — de productietekeningen maken wij dan aan onze kant.",
      },
      {
        title: "Offerte binnen 48 u", // [CONFIRM] quote turnaround
        description:
          "Een ingenieur antwoordt met een prijs in euro en een realistische datum. Ontbreekt er iets in de documentatie, dan vragen wij eerst door en rekenen wij daarna.",
      },
      {
        title: "Productie",
        description:
          "Snijden, lassen en verspanen onder één dak in Częstochowa, Polen. Geometrie vastgehouden op mallen, maten tussentijds gecontroleerd.",
      },
      {
        title: "Controle en poedercoating",
        description:
          "Maat- en lascontrole, daarna poedercoaten in eigen huis — het volledige RAL-gamma, zonder onderaannemers.",
      },
      {
        title: "Levering tot in België",
        description:
          "Verpakt en verzonden naar uw adres. België en de Benelux liggen doorgaans op 1–2 dagen rijden — de werkplaats ligt aan de A1-autosnelweg.", // [CONFIRM] delivery time
      },
    ],
  },

  faq: {
    title: "Vragen over de offerte",
    items: [
      {
        question: "Welke bestandsformaten kan ik toevoegen?",
        answer:
          "DXF of DWG voor lasersnijden, STEP/STP of IGES/IGS voor CNC-bewerking en 3D-modellen, PDF voor samenstellingstekeningen. Meerdere bestanden mogen samen in één ZIP. De uploadlimiet is 4 MB in totaal — vermeld het bij grotere documentatiepakketten, dan sturen wij een transferlink.",
      },
      {
        question: "Wat versnelt de offerte?",
        answer:
          "Volledige gegevens: afmetingen en diktes, materiaalkwaliteit (bv. S235, 1.4301, EN AW-5754), aantallen en of de serie terugkeert, RAL-kleur bij coating, en uw gewenste datum. Een aanvraag met complete gegevens rekenen wij meteen door, zonder vragenronde.",
      },
      {
        question: "Verloopt de communicatie in het Nederlands?",
        answer:
          "Ja. U belt of mailt gewoon in het Nederlands — StretchMetal is de werkplaats van een Belgische groep. De offerte is opgesteld in het Nederlands, met prijzen in euro. De productie staat in Częstochowa, Polen; de technische documentatie mag in het Nederlands, Engels of Pools aangeleverd worden.",
      },
      {
        question: "Is er een minimale bestelhoeveelheid?",
        answer:
          "Geen vast minimum. Wij maken offertes voor zowel losse stukken als terugkerende series — bij kleine aantallen weegt de productievoorbereiding het zwaarst door in de prijs, en dat staat open en bloot in de offerte.",
      },
      {
        question: "Hoe verloopt de levering naar België?",
        answer:
          "Wij leveren in de hele EU — op pallet, of met een aparte vrachtwagen voor grotere constructies. De werkplaats ligt aan de A1-autosnelweg in Częstochowa: België en de Benelux zijn doorgaans 1–2 dagen onderweg. De transportkost staat apart vermeld in de offerte.", // [CONFIRM] delivery time
      },
    ],
  },

  contactStrip: {
    title: "Liever eerst even praten voor u bestanden stuurt?",
    phoneLabel: "Bel ons",
    emailLabel: "Mail ons",
  },

  thanks: {
    metaTitle: "Aanvraag verzonden",
    title: "Aanvraag verzonden.",
    lead: "Bedankt. Uw aanvraag en bestanden zijn rechtstreeks bij het engineeringteam in Częstochowa terechtgekomen.",
    steps: [
      "Een bevestiging is onderweg naar uw e-mailadres.",
      "Een ingenieur bekijkt de documentatie en antwoordt binnen 48 uur met een offerte of met vragen — in het Nederlands.", // [CONFIRM] 48 h
      "Uw bestanden zijn vertrouwelijk — ze worden uitsluitend gebruikt om de offerte op te stellen.",
    ],
    backHome: "Terug naar de startpagina",
    backServices: "Bekijk onze diensten",
  },
};
