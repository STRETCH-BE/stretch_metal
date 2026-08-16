/**
 * About page content (PL) — /o-nas, the founding-story page.
 * File path: /content/about.ts
 *
 * The page argues one thing: this workshop existed BEFORE it had external
 * customers — the Belgian group built it for its own ceiling production,
 * so its first and toughest client is itself. Timeline years are the
 * owner's to confirm (all `// [CONFIRM]`, greppable).
 *
 * Never claim certifications here — quality is only ever "verified by the
 * group's own installation teams".
 */

import type { AboutContent } from "@/content/types";

export const about: AboutContent = {
  metaTitle: "O nas — warsztat metalowy w Częstochowie",
  metaDescription:
    "Warsztat metalowy belgijskiej Stretchgroup w Częstochowie. Zbudowany dla własnej produkcji sufitów, dziś produkuje także dla klientów w całej UE.",

  hero: {
    eyebrow: "O nas",
    title: "Ten warsztat zbudowaliśmy dla siebie.",
    accent: "siebie.",
    lead: "Stretchgroup potrzebowała stali dla własnych realizacji sufitowych — na czas, w wymiarze, w kolorze. Tak w Częstochowie powstał warsztat metalowy, który dziś, jako StretchMetal, produkuje także dla klientów zewnętrznych w całej UE.",
  },

  timeline: {
    eyebrow: "Historia",
    title: "Od Belgii do Częstochowy",
    entries: [
      {
        year: "2008", // [CONFIRM]
        title: "STRETCH w Belgii",
        description:
          "Początek grupy: sufity napinane bez szwów, montaże w Beneluksie i Francji. Rośnie liczba realizacji — i zapotrzebowanie na stal.",
      },
      {
        year: "2016", // [CONFIRM]
        title: "Produkcja sufitów w Częstochowie",
        description:
          "Grupa uruchamia w Polsce produkcję sufitów napinanych (Alto Design / Stretch Sufit). Częstochowa staje się zapleczem produkcyjnym grupy.",
      },
      {
        year: "2022", // [CONFIRM]
        title: "Własny warsztat metalowy",
        description:
          "Realizacje sufitowe potrzebują ram, kanałów świetlnych i podkonstrukcji. Grupa zatrudnia zawodowych spawaczy i ślusarzy i buduje warsztat na własne potrzeby.",
      },
      {
        year: "2024", // [CONFIRM]
        title: "StretchMetal otwiera się na rynek",
        description:
          "Warsztat ma więcej mocy, niż zużywa grupa. Nadwyżka pracuje dla klientów zewnętrznych — pod marką StretchMetal, na tych samych maszynach.",
      },
    ],
  },

  story: {
    eyebrow: "Kim jesteśmy",
    title: "Najpierw własna produkcja, potem rynek",
    paragraphs: [
      "Większość warsztatów powstaje, żeby sprzedawać usługi. Ten powstał, żeby rozwiązać problem: belgijska Stretchgroup potrzebowała stalowych ram, kanałów świetlnych i podkonstrukcji do swoich realizacji sufitowych — na czas, w wymiarze, w kolorze.",
      "Kupowanie tych elementów na rynku oznaczało kompromisy w terminach i jakości. Grupa wybrała inną drogę: zatrudniła w Częstochowie zawodowych spawaczy i ślusarzy, kupiła maszyny i zbudowała warsztat pod własne wymagania.",
      "Ten układ ma konsekwencję, którą czuć do dziś: naszym pierwszym klientem są własne ekipy montażowe. Element, który nie trzyma wymiaru, wraca z budowy do nas — więc kontrola zaczyna się na hali, nie u klienta.",
      "Dziś moce warsztatu przewyższają potrzeby grupy. Różnicę sprzedajemy na zewnątrz: firmom z Polski, Niemiec i Beneluksu, które potrzebują partnera odpowiadającego w milimetrach i datach.",
    ],
  },

  team: {
    eyebrow: "Zespół",
    title: "Ludzie od stali",
    lead: "Zawodowi spawacze, ślusarze, operatorzy CNC i konstruktor — zespół, który grupa kompletowała latami do własnej produkcji. Zlecenia zewnętrzne prowadzi jeden opiekun: po polsku, angielsku lub niderlandzku.",
    imageCaption: "ZDJĘCIE: zespół warsztatu przy stole spawalniczym — hala StretchMetal",
  },

  values: {
    eyebrow: "Zasady",
    title: "Cztery zasady pracy",
    items: [
      {
        title: "Precyzja",
        description:
          "Rysunek jest umową. Wymiar z dokumentacji to wymiar na hali — mierzony przed wysyłką, nie po reklamacji.",
      },
      {
        title: "Komunikacja",
        description:
          "Jeden opiekun zlecenia i odpowiedzi w dniach, nie tygodniach — po polsku, angielsku lub niderlandzku. Problemy zgłaszamy, zanim zobaczysz je w dostawie.",
      },
      {
        title: "Terminy",
        description:
          "Termin podajemy przy wycenie i go pilnujemy. Jeśli coś zagraża dacie, wiesz o tym od razu — z nowym terminem, nie z wymówką.",
      },
      {
        title: "Odpowiedzialność za całość",
        description:
          "Od rysunku po malowany, zapakowany element — jedna firma. Nie rozkładamy rąk między podwykonawcami, bo ich nie ma.",
      },
    ],
  },
};
