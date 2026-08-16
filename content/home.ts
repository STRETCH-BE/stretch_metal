/**
 * Home page content (PL) — every section of `/` in source order.
 * File path: /content/home.ts
 *
 * Section order mirrors the page composition: hero → ticker → stats →
 * services → process → machine park → why us → heritage → projects →
 * final CTA. The EN mirror (/content/en/home.ts) exports the identical
 * shape — components never carry copy.
 *
 * Reuse rules:
 *   - `services.cards` re-exports `serviceCards` from ./services — one
 *     source of truth for the six-card grid, order is the contract.
 *   - `machinePark.highlights` are EDITORIAL CONDENSATIONS (2 spec rows
 *     each) of machines defined in full in ./machines — keep both in sync
 *     when specs get confirmed.
 *   - Contact data (phone in ctaFinal) comes from siteConfig — never
 *     hardcoded.
 *
 * Every unverified number carries `// [CONFIRM]` on its line (greppable).
 */

import type { HomeContent } from "@/content/types";
import { siteConfig } from "@/lib/site-config";
import { serviceCards } from "@/content/services";

export const home: HomeContent = {
  hero: {
    badge: "Część belgijskiej Stretchgroup · 🇧🇪 🇵🇱",
    words: ["STAL.", "CIĘTA.", "SPAWANA.", "MALOWANA."],
    accentIndex: 3,
    lead: "Ten warsztat zbudowaliśmy dla własnej produkcji. Teraz produkuje dla Ciebie. Cięcie laserowe, spawanie, obróbka CNC i malowanie proszkowe — od rysunku do gotowego elementu, pod jednym dachem w Częstochowie.",
    ctaPrimary: "Wyślij rysunek do wyceny",
    ctaSecondary: "Zobacz usługi",
    imageCaption: "ZDJĘCIE: hala StretchMetal — stanowiska spawalnicze i strefa cięcia",
    image: "/images/hero/tig-welding-aluminium.jpg",
    imageAlt: "Spawanie TIG aluminium na stole montażowym w hali StretchMetal",
  },

  ticker: [
    "CIĘCIE LASEROWE",
    "SPAWANIE",
    "CNC",
    "MALOWANIE PROSZKOWE",
    "KONSTRUKCJE STALOWE",
    "PROJEKTOWANIE",
  ],

  stats: {
    eyebrow: "Warsztat w liczbach",
    items: [
      { value: "1 200 m²", label: "hali produkcyjnej" }, // [CONFIRM]
      { value: "48 h", label: "na wycenę z rysunku" }, // [CONFIRM]
      { value: "20 t", label: "przerobu stali miesięcznie" }, // [CONFIRM]
      { value: "1–2 dni", label: "transportu do DE i Beneluksu" }, // [CONFIRM]
    ],
  },

  services: {
    eyebrow: "Usługi",
    title: "Sześć usług. Jeden warsztat.",
    accent: "Jeden",
    lead: "Każdy etap pod jednym dachem — bez podwykonawców między cięciem a kolorem. Wysyłasz rysunek, odbierasz gotowy element.",
    cards: serviceCards,
    linkLabel: "Wszystkie usługi",
  },

  process: {
    eyebrow: "Proces",
    title: "Od rysunku do dostawy",
    lead: "Pięć kroków. Zero niespodzianek.",
    steps: [
      {
        title: "Wyślij rysunek",
        description:
          "DXF, DWG, STEP albo PDF — przez formularz wyceny. Szkic z wymiarami też wystarczy.",
      },
      {
        title: "Wycena w 48 h",
        description:
          "Konkretna cena i konkretny termin, nie widełki. Pytania techniczne zadajemy od razu.", // [CONFIRM] 48 h
      },
      {
        title: "Produkcja",
        description:
          "Cięcie, gięcie, spawanie, obróbka — według zatwierdzonej dokumentacji, na własnych maszynach.",
      },
      {
        title: "Kontrola i malowanie",
        description:
          "Pomiar geometrii, czyszczenie spoin, malowanie proszkowe na miejscu — bez podwykonawcy.",
      },
      {
        title: "Dostawa w UE",
        description:
          "Pakowanie pod transport i wysyłka. Do Niemiec i Beneluksu 1–2 dni z autostrady A1.", // [CONFIRM] czas transportu
      },
    ],
    cta: "Wyślij rysunek",
  },

  machinePark: {
    eyebrow: "Park maszynowy",
    title: "Maszyny, nie obietnice",
    lead: "Własny park maszynowy — bez kolejki u podwykonawców i bez terminów zależnych od cudzych mocy. Pełna lista w parku maszynowym.",
    highlights: [
      {
        name: "Wycinarka laserowa fiber",
        type: "Cięcie blach",
        specs: [
          { label: "Moc źródła", value: "6 kW" }, // [CONFIRM]
          { label: "Obszar roboczy", value: "3 000 × 1 500 mm" }, // [CONFIRM]
        ],
      },
      {
        name: "Spawalnia MIG/MAG i TIG",
        type: "6 stanowisk spawalniczych", // [CONFIRM] liczba
        specs: [
          { label: "Metody", value: "MIG/MAG (135/136), TIG (141)" },
          { label: "Materiały", value: "stal, nierdzewna, aluminium" },
        ],
      },
      {
        name: "Prasa krawędziowa CNC",
        type: "Gięcie blach",
        specs: [
          { label: "Nacisk", value: "135 t" }, // [CONFIRM]
          { label: "Długość gięcia", value: "3 000 mm" }, // [CONFIRM]
        ],
      },
      {
        name: "Malarnia proszkowa z piecem",
        type: "Lakiernia proszkowa",
        specs: [
          { label: "Kolory", value: "pełna paleta RAL" },
          { label: "Maks. wymiar detalu", value: "3 000 mm" }, // [CONFIRM]
        ],
      },
    ],
    linkLabel: "Cały park maszynowy",
  },

  whyUs: {
    eyebrow: "Dlaczego my",
    title: "Belgijskie standardy, polska produkcja",
    items: [
      {
        title: "Standardy zachodniej grupy",
        description:
          "Jesteśmy częścią belgijskiej Stretchgroup. Komunikacja po polsku, angielsku i niderlandzku, jeden opiekun zlecenia, odpowiedzi w dniach, nie tygodniach.",
      },
      {
        title: "Polska ekonomia produkcji",
        description:
          "Koszty wytwarzania z Częstochowy, nie z Europy Zachodniej. Ta sama dokumentacja, ten sam wymiar — niższa cena jednostkowa.",
      },
      {
        title: "Region stali przy autostradzie A1",
        description:
          "Częstochowa to zagłębie stalowe ze stałym zapleczem materiałowym. Z węzła A1 naczepa dojeżdża do Niemiec i Beneluksu w 1–2 dni.", // [CONFIRM] czas transportu
      },
      {
        title: "Od rysunku do malowanego elementu",
        description:
          "Projekt, cięcie, spawanie, obróbka i kolor pod jednym dachem. Jedna umowa, jedna odpowiedzialność, jeden termin.",
      },
    ],
  },

  heritage: {
    eyebrow: "Grupa",
    title: "Zbudowany dla własnej produkcji",
    paragraphs: [
      "Belgijska Stretchgroup od lat realizuje sufity napinane w całej Europie. Każdy większy projekt potrzebuje stali: ram, kanałów świetlnych, podkonstrukcji. Zamiast kupować je na rynku, grupa zatrudniła w Częstochowie zawodowych ślusarzy i spawaczy i zbudowała własny warsztat metalowy.",
      "Warsztat ma dziś więcej mocy, niż zużywa grupa. Ta nadwyżka pracuje dla klientów zewnętrznych — pod marką StretchMetal, na tych samych maszynach i według tych samych standardów, które codziennie odbierają nasze ekipy montażowe.",
      "Dla klienta oznacza to jedno: ten warsztat najpierw musiał zadowolić najbardziej wymagającego odbiorcę — samego siebie.",
    ],
    brands: [
      {
        name: siteConfig.group.belgium.name,
        description: "Sufity napinane bez szwów — Belgia",
        url: siteConfig.group.belgium.url,
      },
      {
        name: siteConfig.group.poland.name,
        description: "Sufity napinane — produkcja w Polsce",
        url: siteConfig.group.poland.url,
      },
    ],
    imageCaption: "ZDJĘCIE: montaż podkonstrukcji stalowej pod sufit napinany — realizacja grupy",
    image: "/images/heritage/steel-substructure-stretch-ceiling.jpg",
    imageAlt: "Stalowa podkonstrukcja pod podświetlanym sufitem napinanym — realizacja grupy",
  },

  projects: {
    eyebrow: "Realizacje",
    title: "Co schodzi z hali",
    lead: "Podkonstrukcje, kanały świetlne, ramy, antresole. Przykładowe realizacje z produkcji dla grupy i dla klientów zewnętrznych.",
    linkLabel: "Zobacz realizacje",
  },

  ctaFinal: {
    title: "Masz rysunek? Reszta jest po naszej stronie.",
    accent: "rysunek?",
    lead: "Prześlij dokumentację przez formularz — wycenimy w 48 godzin. Konkretna cena, konkretny termin.", // [CONFIRM] 48 h
    cta: "Wyślij rysunek do wyceny",
    ctaSecondary: `Zadzwoń: ${siteConfig.contact.phoneDisplay}`,
  },
};
