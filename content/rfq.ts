/**
 * RFQ page content (PL) — /wycena.
 * File path: /content/rfq.ts
 *
 * Everything the RFQ page and <RfqForm> render: hero, all form labels
 * and localized error strings, the trust rail, the 5-step mini process,
 * the RFQ FAQ and the thank-you page copy. Mirrored 1:1 in shape by
 * /content/en/rfq.ts (EN page imports that one).
 *
 * Copy rules: workshop register — millimetres and dates, short
 * sentences, no marketing adjectives. Every unverified promise (48 h,
 * delivery times) carries `// [CONFIRM]` on its line — greppable.
 * Never claim certifications (EN 1090, ISO 3834, ISO 9001).
 *
 * Field option VALUES (country codes, ServiceKey, material keys) are the
 * API contract with /app/api/rfq/route.ts — labels are free to change,
 * values are not.
 */

import type { RfqContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";

export const rfq: RfqContent = {
  metaTitle: "Wycena — wyślij rysunek", // template appends "| StretchMetal"
  metaDescription:
    "Załącz rysunek (DXF, DWG, STEP, PDF) i opisz zlecenie. Inżynier odpowie wyceną lub pytaniami w 48 h roboczych. Pliki traktujemy poufnie, NDA na życzenie.", // [CONFIRM] 48 h

  hero: {
    eyebrow: "Wycena",
    title: "Wyślij rysunek. Odbierz wycenę.",
    accent: "wycenę.",
    lead: "Załącz dokumentację — DXF, DWG, STEP albo PDF — i napisz, co mamy wykonać. Zapytanie trafia prosto do inżyniera, nie do działu handlowego. Odpowiadamy ceną i terminem, nie folderem reklamowym.",
  },

  form: {
    company: "Firma",
    name: "Imię i nazwisko *",
    email: "E-mail *",
    phone: "Telefon",
    country: "Kraj",
    countries: [
      { value: "PL", label: "Polska" },
      { value: "DE", label: "Niemcy" },
      { value: "BE", label: "Belgia" },
      { value: "NL", label: "Holandia" },
      { value: "FR", label: "Francja" },
      { value: "AT", label: "Austria" },
      { value: "CZ", label: "Czechy" },
      { value: "SK", label: "Słowacja" },
      { value: "LT", label: "Litwa" },
      { value: "SE", label: "Szwecja" },
      { value: "DK", label: "Dania" },
      { value: "other", label: "Inny kraj" },
    ],
    services: "Zakres prac",
    serviceOptions: [
      { value: "welding", label: "Spawanie" },
      { value: "laser", label: "Cięcie laserowe" },
      { value: "cnc", label: "Obróbka CNC" },
      { value: "coating", label: "Malowanie proszkowe" },
      { value: "design", label: "Projektowanie" },
      { value: "structures", label: "Konstrukcje stalowe" },
    ],
    material: "Materiał",
    materialOptions: [
      { value: "steel", label: "Stal czarna" },
      { value: "stainless", label: "Stal nierdzewna" },
      { value: "aluminium", label: "Aluminium" },
      { value: "other", label: "Inny / mieszany" },
    ],
    quantity: "Ilość / wielkość serii",
    quantityPlaceholder: "np. 25 szt., seria powtarzalna co miesiąc",
    deadline: "Oczekiwany termin",
    deadlinePlaceholder: "np. 3 tygodnie albo konkretna data",
    message: "Opis zlecenia *",
    messagePlaceholder:
      "Co mamy wykonać? Wymiary, grubości, gatunek materiału, kolor RAL, ilości. Im konkretniej, tym szybsza wycena.",
    files: {
      label: "Pliki — rysunki i dokumentacja",
      hint: "DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP · maks. 10 plików, łącznie 15 MB",
      drop: "Przeciągnij pliki tutaj",
      browse: "Wybierz pliki",
      remove: "Usuń",
      errorType:
        "Nieobsługiwany lub pusty plik. Formaty: DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP.",
      errorSize: "Limit plików: maks. 10 sztuk, łącznie 15 MB.",
    },
    consent:
      "Wyrażam zgodę na przetwarzanie moich danych w celu przygotowania wyceny i kontaktu zwrotnego, zgodnie z",
    consentLinkLabel: "polityką prywatności",
    submit: "Wyślij zapytanie",
    submitting: "Wysyłanie…",
    errorGeneric: `Nie udało się wysłać zgłoszenia. Napisz: ${siteConfig.contact.email} lub zadzwoń: ${siteConfig.contact.phoneDisplay}.`, // [CONFIRM] email, phone
    errorRequired: "To pole jest wymagane.",
    errorEmail: "Podaj poprawny adres e-mail.",
  },

  trust: {
    title: "Zasady współpracy",
    items: [
      {
        title: "Odpowiedź w 48 h", // [CONFIRM] quote turnaround
        description:
          "Wycena albo pytania techniczne w ciągu 48 godzin roboczych. Bez automatów — odpowiada człowiek, który policzył Twoje zlecenie.",
      },
      {
        title: "Pliki traktujemy poufnie",
        description:
          "Dokumentacja służy wyłącznie do przygotowania oferty. Nie udostępniamy jej nikomu poza zespołem, który liczy wycenę.",
      },
      {
        title: "NDA na życzenie",
        description:
          "Pracujesz nad projektem objętym tajemnicą? Podpisujemy NDA przed przekazaniem dokumentacji — wystarczy wspomnieć w wiadomości.",
      },
      {
        title: "Bezpośredni kontakt z inżynierem",
        description:
          "Od pierwszej wiadomości rozmawiasz z osobą techniczną, nie z handlowcem. Pytania o tolerancje i materiał padają od razu, nie po tygodniu.",
      },
    ],
  },

  process: {
    title: "Od rysunku do dostawy",
    steps: [
      {
        title: "Wysyłasz rysunek",
        description:
          "DXF, DWG, STEP albo PDF. Wystarczy też szkic z wymiarami — dokumentację możemy przygotować po naszej stronie.",
      },
      {
        title: "Wycena w 48 h", // [CONFIRM] quote turnaround
        description:
          "Inżynier odpowiada ceną i realnym terminem. Jeśli czegoś brakuje w dokumentacji — najpierw dopyta, potem policzy.",
      },
      {
        title: "Produkcja",
        description:
          "Cięcie, spawanie i obróbka na jednej hali w Częstochowie. Geometria trzymana na przyrządach, wymiary mierzone na bieżąco.",
      },
      {
        title: "Kontrola i malowanie",
        description:
          "Sprawdzenie wymiarów i spoin, potem malarnia proszkowa na miejscu — pełna paleta RAL, bez podwykonawców.",
      },
      {
        title: "Dostawa w UE",
        description:
          "Pakujemy i wysyłamy pod wskazany adres. Do Niemiec i Beneluksu zwykle 1–2 dni transportu z A1.", // [CONFIRM] delivery time
      },
    ],
  },

  faq: {
    title: "Pytania o wycenę",
    items: [
      {
        question: "Jakie pliki mogę załączyć?",
        answer:
          "Najlepiej DXF lub DWG do cięcia laserowego, STEP/STP albo IGES/IGS do obróbki CNC i modeli 3D, PDF do rysunków złożeniowych. Kilka plików możesz spakować w ZIP. Limit to 15 MB łącznie — przy większej dokumentacji napisz, odeślemy link do transferu.",
      },
      {
        question: "Co przyspiesza wycenę?",
        answer:
          "Komplet konkretów: wymiary i grubości, gatunek materiału (np. S235, 1.4301, EN AW-5754), ilość sztuk i czy seria będzie się powtarzać, kolor RAL przy malowaniu oraz oczekiwany termin. Zapytanie z pełnymi danymi liczymy od razu, bez rundy pytań.",
      },
      {
        question: "Czy podpisujecie NDA?",
        answer:
          "Tak, na życzenie — przed przekazaniem dokumentacji. Niezależnie od NDA każde przesłane pliki traktujemy jako poufne i używamy ich wyłącznie do przygotowania oferty.",
      },
      {
        question: "Czy macie minimalną wielkość zamówienia?",
        answer:
          "Nie ma sztywnego minimum. Wyceniamy zarówno pojedyncze detale, jak i powtarzalne serie — przy małych ilościach największy udział w cenie ma przygotowanie produkcji, co widać wprost w ofercie.",
      },
      {
        question: "Jak wygląda dostawa?",
        answer:
          "Wysyłamy na terenie całej UE — paletowo lub transportem dedykowanym przy większych konstrukcjach. Warsztat leży przy A1 w Częstochowie: do Niemiec i Beneluksu zwykle 1–2 dni w drodze. Koszt transportu podajemy w wycenie.", // [CONFIRM] delivery time
      },
    ],
  },

  contactStrip: {
    title: "Wolisz porozmawiać, zanim wyślesz pliki?",
    phoneLabel: "Zadzwoń",
    emailLabel: "Napisz",
  },

  thanks: {
    metaTitle: "Zapytanie wysłane",
    title: "Zapytanie wysłane.",
    lead: "Dziękujemy. Twoje zapytanie i pliki trafiły prosto do zespołu technicznego w Częstochowie.",
    steps: [
      "Potwierdzenie wysłaliśmy na Twój adres e-mail.",
      "Inżynier przeanalizuje dokumentację i w ciągu 48 godzin roboczych odpowie wyceną albo pytaniami.", // [CONFIRM] 48 h
      "Pliki traktujemy poufnie — służą wyłącznie do przygotowania oferty.",
    ],
    backHome: "Wróć na stronę główną",
    backServices: "Zobacz nasze usługi",
  },
};
