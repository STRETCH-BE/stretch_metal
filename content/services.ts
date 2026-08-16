/**
 * Services content (PL) — the six-service offer, twice over.
 * File path: /content/services.ts
 *
 * Exports two structures consumed by different surfaces:
 *   - `serviceCards`  → home grid + services hub. Order is the contract:
 *     welding, laser, cnc, coating, design, structures — components number
 *     the cards 01–06 from array position and derive hrefs from `key` via
 *     servicePath(key, locale), so cards carry no href field.
 *   - `services`      → full detail-page content per ServiceKey (hero, spec
 *     table, applications, FAQ, related). FAQ items also feed the FAQPage
 *     JSON-LD on each service page — answers must stand alone in search.
 *
 * Copy rules: workshop register — millimetres and dates, short sentences,
 * no marketing adjectives. Every unverified number carries `// [CONFIRM]`
 * on its line (greppable). Never claim certifications (EN 1090, ISO 3834,
 * ISO 9001) — quality is only ever "verified by the group's own
 * installation teams", who are the workshop's first customer.
 */

import type { ServiceCard, ServiceContent, ServiceKey } from "@/content/types";

/* ─── Cards: home grid + services hub ─────────────────────── */

export const serviceCards: ServiceCard[] = [
  {
    key: "welding",
    name: "Spawanie MIG/MAG i TIG",
    short:
      "Stal czarna, nierdzewna i aluminium. Ramy, obudowy i konstrukcje — spoiny czyszczone i mierzone przed wysyłką.",
    tags: ["MIG/MAG", "TIG", "Stal nierdzewna", "Aluminium"],
  },
  {
    key: "laser",
    name: "Cięcie laserowe blach",
    short:
      "Wycinarka fiber tnie prosto z pliku DXF. Powtarzalne serie, czysta krawędź — detale gotowe do gięcia i spawania.",
    tags: ["Laser fiber", "DXF/DWG", "Stal do 20 mm"], // [CONFIRM] zakres grubości
  },
  {
    key: "cnc",
    name: "Obróbka CNC",
    short:
      "Frezowanie i toczenie według dokumentacji. Detale maszynowe, otwory pasowane, gwinty — pojedyncze sztuki i serie.",
    tags: ["Frezowanie", "Toczenie", "STEP/IGES"],
  },
  {
    key: "coating",
    name: "Malowanie proszkowe",
    short:
      "Własna malarnia i piec na miejscu. Pełna paleta RAL, mat lub struktura — malujemy też detale powierzone.",
    tags: ["Pełny RAL", "Mat / struktura", "Detale powierzone"],
  },
  {
    key: "design",
    name: "Projektowanie i dokumentacja",
    short:
      "Konstruktor po stronie warsztatu. Ze szkicu lub pomiaru z natury powstaje model 3D i rysunki gotowe do produkcji.",
    tags: ["Model 3D", "Rysunki wykonawcze", "DXF pod laser"],
  },
  {
    key: "structures",
    name: "Konstrukcje stalowe",
    short:
      "Antresole, platformy, ramy i podkonstrukcje na wymiar. Jeden wykonawca — od projektu po malowany, gotowy do montażu element.",
    tags: ["Antresole", "Ramy i wsporniki", "Podkonstrukcje"],
  },
];

/* ─── Full detail-page content per service ────────────────── */

export const services: Record<ServiceKey, ServiceContent> = {
  /* ══ 01 — Spawanie ══════════════════════════════════════════ */
  welding: {
    key: "welding",
    name: "Spawanie MIG/MAG i TIG",
    metaTitle: "Spawanie MIG/MAG i TIG — Częstochowa",
    metaDescription:
      "Spawanie stali czarnej, nierdzewnej i aluminium. MIG/MAG i TIG, zespoły do 6 m, czyszczenie i pomiar spoin. Wycena z rysunku w 48 h, dostawa w UE.", // [CONFIRM] gabaryt, 48 h
    hero: {
      eyebrow: "Spawalnia",
      title: "Spawanie na wymiar i na termin.",
      accent: "termin.",
      lead: "MIG/MAG do stali konstrukcyjnej, TIG do nierdzewki i aluminium. Spawamy według rysunku, geometrię trzymamy na przyrządach, spoiny czyścimy i mierzymy przed wysyłką. Pierwszym odbiorcą warsztatu są ekipy montażowe naszej grupy — one odbierają jakość, zanim zrobi to klient.",
    },
    specTable: {
      title: "Zakres spawalni",
      rows: [
        { label: "Metody", value: "MIG/MAG (135/136), TIG (141)" },
        { label: "Materiały", value: "Stal S235/S355, nierdzewna 304/316, aluminium" }, // [CONFIRM] gatunki
        { label: "Zakres grubości", value: "1–30 mm" }, // [CONFIRM]
        { label: "Maks. gabaryt zespołu", value: "6 000 × 2 000 × 2 000 mm" }, // [CONFIRM]
        { label: "Maks. masa zespołu", value: "2 000 kg" }, // [CONFIRM]
        { label: "Przygotowanie", value: "Cięcie, ukosowanie, prostowanie, czyszczenie spoin" },
        { label: "Dokumentacja wejściowa", value: "PDF, DXF, DWG, STEP" },
      ],
    },
    applications: {
      title: "Co spawamy najczęściej",
      intro:
        "Konstrukcje warsztatowe według dokumentacji klienta albo naszej — od pojedynczych ram po powtarzalne serie z przyrządów.",
      items: [
        {
          name: "Ramy i podstawy maszyn",
          description:
            "Konstrukcje nośne pod urządzenia — z prostowaniem po spawaniu i otworami pod kotwy.",
        },
        {
          name: "Podkonstrukcje i wsporniki",
          description:
            "Elementy montażowe pod fasady, sufity i instalacje. Serie o powtarzalnej geometrii, spawane na przyrządach.",
        },
        {
          name: "Obudowy i osłony",
          description:
            "Konstrukcje z blach giętych i profili — spawane szczelnie albo punktowo, zależnie od funkcji.",
        },
        {
          name: "Balustrady i drabiny",
          description:
            "Elementy stalowe do obiektów przemysłowych — szlifowane i malowane proszkowo na miejscu.",
        },
        {
          name: "Konstrukcje z nierdzewki",
          description:
            "Kosze, prowadnice, elementy wyposażenia — spawane TIG, spoiny szlifowane lub czyszczone chemicznie.",
        },
      ],
    },
    faq: [
      {
        question: "Jakie materiały spawacie?",
        answer:
          "Stal czarną S235/S355, stal nierdzewną 304/316 i aluminium. Stal konstrukcyjną spawamy MIG/MAG, nierdzewkę i aluminium — TIG. Inne gatunki potwierdzamy przy wycenie, po sprawdzeniu dostępności materiału.", // [CONFIRM] gatunki
      },
      {
        question: "Czy wykonujecie pojedyncze sztuki?",
        answer:
          "Tak. Robimy i pojedyncze elementy, i serie. Minimalnej partii nie ma — przy jednej sztuce koszt jednostkowy jest po prostu wyższy, bo przygotowanie stanowiska rozkłada się na mniej elementów. Konkretną cenę podajemy w wycenie.",
      },
      {
        question: "Jak kontrolujecie jakość spoin?",
        answer:
          "Kontrola wizualna i pomiar geometrii przed wysyłką — każdy zespół, nie wyrywkowo. Konstrukcje dla własnej grupy jadą prosto na montaż w Belgii i Polsce, więc ekipy montażowe są naszą pierwszą kontrolą jakości: element, który nie trzyma wymiaru, wraca z budowy do nas.",
      },
      {
        question: "Jaki jest termin realizacji zleceń spawalniczych?",
        answer:
          "Typowe zlecenie warsztatowe realizujemy w 5–15 dni roboczych od zatwierdzenia dokumentacji, zależnie od zakresu i obłożenia hali. Konkretny termin dostajesz razem z wyceną — w ciągu 48 godzin od przesłania rysunku.", // [CONFIRM] terminy
      },
      {
        question: "Czy element może wyjechać od razu pomalowany?",
        answer:
          "Tak. Malarnia proszkowa pracuje na tej samej hali — po spawaniu i czyszczeniu element idzie prosto do malowania, bez transportu do podwykonawcy. Jeden termin, jedna odpowiedzialność za wymiar i powłokę.",
      },
      {
        question: "Jakie pliki przygotować do wyceny?",
        answer:
          "Najlepiej PDF z wymiarami plus DXF lub STEP, jeśli istnieją. Wystarczy też szkic albo zdjęcie z wymiarami z natury — nasz konstruktor przygotuje dokumentację przed produkcją i wyśle ją do akceptacji.",
      },
    ],
    related: ["structures", "coating", "laser"],
  },

  /* ══ 02 — Cięcie laserowe ═══════════════════════════════════ */
  laser: {
    key: "laser",
    name: "Cięcie laserowe blach",
    metaTitle: "Cięcie laserowe blach — Częstochowa",
    metaDescription:
      "Cięcie laserowe blach na wycinarce fiber: stal do 20 mm, nierdzewna do 12 mm, aluminium do 10 mm. Pliki DXF, DWG, STEP. Serie od 1 szt. Wycena w 48 h.", // [CONFIRM] grubości, 48 h
    hero: {
      eyebrow: "Cięcie laserowe",
      title: "Z pliku DXF prosto w blachę.",
      accent: "DXF",
      lead: "Wycinarka fiber tnie stal czarną, nierdzewną i aluminium. Wysyłasz plik, my potwierdzamy materiał i termin. Krawędź czysta, wymiar powtarzalny w całej serii — detale schodzą z maszyny gotowe do gięcia i spawania.",
    },
    specTable: {
      title: "Parametry cięcia",
      rows: [
        { label: "Źródło", value: "Laser fiber 6 kW" }, // [CONFIRM]
        { label: "Obszar roboczy", value: "3 000 × 1 500 mm" }, // [CONFIRM]
        { label: "Stal czarna", value: "do 20 mm" }, // [CONFIRM]
        { label: "Stal nierdzewna", value: "do 12 mm" }, // [CONFIRM]
        { label: "Aluminium", value: "do 10 mm" }, // [CONFIRM]
        { label: "Dokładność cięcia", value: "±0,1 mm" }, // [CONFIRM]
        { label: "Formaty plików", value: "DXF, DWG, STEP, PDF" },
        { label: "Wielkość serii", value: "od 1 szt. do serii produkcyjnych" },
      ],
    },
    applications: {
      title: "Co wycinamy",
      items: [
        {
          name: "Detale pod gięcie i spawanie",
          description:
            "Rozwinięcia blach z naddatkami pod naszą prasę krawędziową — wycinane i gięte na jednej hali.",
        },
        {
          name: "Płyty montażowe i łączniki",
          description:
            "Blachy z otworami pod śruby i kołki — geometria z pliku, bez trasowania i wiercenia ręcznego.",
        },
        {
          name: "Panele i elementy ażurowe",
          description:
            "Perforacje, logotypy, wycięcia ozdobne — laser tnie dowolny kontur z pliku wektorowego.",
        },
        {
          name: "Prototypy",
          description:
            "Pierwsza sztuka do weryfikacji pasowania, seria po akceptacji — bez kosztów narzędzi i tłoczników.",
        },
        {
          name: "Rozkroje seryjne",
          description:
            "Nesting na pełnym arkuszu obniża odpad i cenę jednostkową — im większa seria, tym taniej na sztuce.",
        },
      ],
    },
    faq: [
      {
        question: "Jaki format pliku jest najlepszy do wyceny i produkcji?",
        answer:
          "DXF w skali 1:1 — trafia niemal bezpośrednio na maszynę. DWG i STEP też przyjmujemy. Z samego PDF-a albo szkicu również wytniemy, ale doliczamy czas konstruktora na odrysowanie konturu, co podnosi cenę przy małych partiach.",
      },
      {
        question: "Jaka jest minimalna ilość sztuk?",
        answer:
          "Jedna. Cena jednostkowa spada w serii, bo detale układamy razem na arkuszu i lepiej wykorzystujemy materiał. Przy powtarzalnych zleceniach rozkrój mamy już przygotowany — kolejne partie schodzą szybciej i taniej.",
      },
      {
        question: "Czy tniecie z materiału powierzonego?",
        answer:
          "Tak, po uzgodnieniu gatunku i formatu arkusza. Standardowo tniemy z materiału własnego z atestem hutniczym — mamy stałe zaplecze materiałowe w regionie częstochowskim.", // [CONFIRM] polityka materiałowa
      },
      {
        question: "Jaką dokładność trzyma cięcie laserowe?",
        answer:
          "Typowo ±0,1 mm na wymiarach konturu; na grubych blachach tolerancja rośnie wraz ze szczeliną cięcia. Otwory o średnicy mniejszej niż grubość blachy lepiej wykonać wierceniem lub na frezarce — doradzimy przy wycenie.", // [CONFIRM] tolerancja
      },
      {
        question: "Ile czeka się na wycięte detale?",
        answer:
          "Proste zlecenia z gotowym DXF realizujemy w 2–4 dni robocze od potwierdzenia, większe rozkroje według terminu z wyceny. Samą wycenę wysyłamy w ciągu 48 godzin.", // [CONFIRM] terminy
      },
    ],
    related: ["welding", "cnc", "design"],
  },

  /* ══ 03 — Obróbka CNC ═══════════════════════════════════════ */
  cnc: {
    key: "cnc",
    name: "Obróbka CNC",
    metaTitle: "Frezowanie i toczenie CNC — Częstochowa",
    metaDescription:
      "Frezowanie i toczenie CNC: stal, nierdzewna, aluminium. Tolerancje do ±0,02 mm, obróbka po spawaniu, prototypy i serie. Pliki STEP/IGES. Częstochowa.", // [CONFIRM] tolerancje
    hero: {
      eyebrow: "Obróbka CNC",
      title: "Frezowanie i toczenie pod tolerancję.",
      accent: "tolerancję.",
      lead: "Obrabiamy detale maszynowe według dokumentacji: pojedyncze sztuki, części zamienne, powtarzalne serie. Frezarka i tokarka CNC stoją na jednej hali ze spawalnią — obrabiamy także własne konstrukcje po spawaniu, kiedy liczy się płaszczyzna albo otwór pasowany.",
    },
    specTable: {
      title: "Zakres obróbki",
      rows: [
        { label: "Frezowanie", value: "3 osie, stół 1 000 × 500 mm" }, // [CONFIRM]
        { label: "Toczenie", value: "śr. do 400 mm, długość do 1 000 mm" }, // [CONFIRM]
        { label: "Tolerancje", value: "standard ISO 2768-m, wskazane do ±0,02 mm" }, // [CONFIRM]
        { label: "Materiały", value: "stal, nierdzewna, aluminium, mosiądz, tworzywa" }, // [CONFIRM]
        { label: "Dokumentacja", value: "STEP, IGES, DXF, PDF z wymiarami" },
        { label: "Wielkość serii", value: "1–1 000 szt." }, // [CONFIRM]
      ],
    },
    applications: {
      title: "Co obrabiamy",
      items: [
        {
          name: "Części maszyn",
          description:
            "Wałki, tuleje, kołnierze, koła — toczone i frezowane według rysunku, z gwintami i pasowaniami.",
        },
        {
          name: "Płyty i podstawy pasowane",
          description:
            "Otwory pod łożyska i kołki ustalające, płaszczyzny przylegania — tam, gdzie laser i wiertarka nie wystarczą.",
        },
        {
          name: "Obróbka po spawaniu",
          description:
            "Frezowanie płaszczyzn i otworów w konstrukcjach spawanych — geometria wraca w tolerancję mimo skurczu spawalniczego.",
        },
        {
          name: "Części zamienne",
          description:
            "Odtwarzamy detale z pomiaru zużytej części albo z natury — z dokumentacją na przyszłe zamówienia.",
        },
      ],
    },
    faq: [
      {
        question: "Jakie tolerancje wykonujecie?",
        answer:
          "Standardowo ISO 2768-m; na wskazanych wymiarach schodzimy do ±0,02 mm. Tolerancje krytyczne zaznacz na rysunku — obróbka każdej powierzchni „na wszelki wypadek” niepotrzebnie podnosi cenę.", // [CONFIRM] tolerancje
      },
      {
        question: "Czy obrabiacie konstrukcje po spawaniu?",
        answer:
          "Tak, to nasza codzienność. Płaszczyzny przylegania i otwory pasowane frezujemy po spawaniu, więc skurcz spawalniczy nie zjada tolerancji. Spawalnia i obróbka na jednej hali — konstrukcja nie jeździ między firmami.",
      },
      {
        question: "Z jakich plików pracujecie?",
        answer:
          "Najlepiej STEP lub IGES plus PDF z tolerancjami i chropowatością. Sam rysunek PDF też wystarczy — model przygotuje nasz konstruktor. Przy częściach zamiennych podstawą bywa zużyty detal i suwmiarka.",
      },
      {
        question: "Czy opłaca się u was pojedyncza sztuka?",
        answer:
          "Tak — właśnie do tego mamy park uniwersalny. Prototypy, części zamienne i naprawy to stały udział produkcji. Przy seriach cena jednostkowa spada, bo programowanie i uzbrojenie maszyny rozkładają się na partię.",
      },
      {
        question: "Jaki jest czas realizacji obróbki?",
        answer:
          "Pojedyncze detale zwykle w 3–7 dni roboczych, serie według terminu z wyceny. Termin podajemy razem z ceną, w ciągu 48 godzin od otrzymania dokumentacji.", // [CONFIRM] terminy
      },
    ],
    related: ["laser", "welding", "design"],
  },

  /* ══ 04 — Malowanie proszkowe ═══════════════════════════════ */
  coating: {
    key: "coating",
    name: "Malowanie proszkowe",
    metaTitle: "Malowanie proszkowe RAL — Częstochowa",
    metaDescription:
      "Malarnia proszkowa z piecem w Częstochowie: pełna paleta RAL, mat i struktura, detale do 3 m. Malujemy elementy własne i powierzone. Wycena w 48 h.", // [CONFIRM] wymiar, 48 h
    hero: {
      eyebrow: "Malarnia proszkowa",
      title: "Powłoka z pieca, kolor z palety RAL.",
      accent: "RAL.",
      lead: "Własna malarnia zamyka produkcję pod jednym dachem: konstrukcja nie jeździ między podwykonawcami, a termin nie zależy od cudzej kolejki. Malujemy elementy z własnej produkcji i detale powierzone — od pojedynczych sztuk po serie.",
    },
    specTable: {
      title: "Parametry malarni",
      rows: [
        { label: "Kolory", value: "pełna paleta RAL" },
        { label: "Wykończenia", value: "mat, półmat, połysk, struktura" },
        { label: "Maks. wymiar detalu", value: "3 000 × 1 200 × 1 500 mm" }, // [CONFIRM]
        { label: "Grubość powłoki", value: "60–120 µm" }, // [CONFIRM]
        { label: "Przygotowanie powierzchni", value: "odtłuszczanie, mycie chemiczne" }, // [CONFIRM] technologia
        { label: "Polimeryzacja", value: "piec, 180–200 °C" }, // [CONFIRM]
        { label: "Detale powierzone", value: "tak — również bez innych usług" },
      ],
    },
    applications: {
      title: "Co malujemy",
      items: [
        {
          name: "Konstrukcje z własnej hali",
          description:
            "Ramy, wsporniki i podkonstrukcje malujemy zaraz po spawaniu i czyszczeniu — bez transportu i bez czekania.",
        },
        {
          name: "Kanały i profile świetlne",
          description:
            "Seryjnie dla realizacji sufitowych grupy — kolor dobrany do membrany, powłoka odporna na montaż.",
        },
        {
          name: "Blachy gięte i obudowy",
          description:
            "Panele, osłony, obudowy urządzeń — malowane po gięciu, z zabezpieczeniem powierzchni widocznych.",
        },
        {
          name: "Detale powierzone",
          description:
            "Przyjmujemy elementy innych warsztatów i klientów końcowych — warunkiem czysta, przygotowana powierzchnia.",
        },
        {
          name: "Elementy wyposażenia wnętrz",
          description:
            "Meble metalowe, stelaże, ramy dekoracyjne — struktura drobna dobrze maskuje ślady spawania i szlifu.",
        },
      ],
    },
    faq: [
      {
        question: "Czy malujecie detale powierzone?",
        answer:
          "Tak — nie musisz zamawiać u nas nic poza malowaniem. Warunek: powierzchnia bez rdzy, zgorzeliny i starych powłok. Jeśli detal wymaga przygotowania, wyceniamy je osobno przed przyjęciem zlecenia.",
      },
      {
        question: "Jakie kolory i wykończenia są dostępne?",
        answer:
          "Pełna paleta RAL w macie, półmacie i połysku oraz lakiery strukturalne. Kolory spoza magazynu zamawiamy pod zlecenie — przy małych partiach doliczamy koszt minimalnego opakowania proszku.", // [CONFIRM] polityka kolorów
      },
      {
        question: "Jak trwała jest powłoka proszkowa?",
        answer:
          "Powłoka 60–120 µm jest odporniejsza mechanicznie niż malowanie natryskowe — znosi transport, montaż i eksploatację przemysłową. Do zastosowań zewnętrznych dobieramy proszek z odpowiednią odpornością UV i doradzamy zabezpieczenie antykorozyjne pod powłoką.", // [CONFIRM] grubość
      },
      {
        question: "Jaki maksymalny element wchodzi do pieca?",
        answer:
          "3 000 × 1 200 × 1 500 mm. Większe konstrukcje dzielimy na segmenty już na etapie projektu — łączenia śrubowe planujemy tak, żeby każdy segment zmieścił się w piecu i na naczepie.", // [CONFIRM] wymiar pieca
      },
      {
        question: "Ile trwa malowanie partii detali?",
        answer:
          "Typowo 2–3 dni robocze od dostarczenia elementów, przy kolorze z magazynu. Kolory zamawiane wydłużają termin o czas dostawy proszku — konkretną datę podajemy przy przyjęciu zlecenia.", // [CONFIRM] terminy
      },
    ],
    related: ["welding", "structures", "laser"],
  },

  /* ══ 05 — Projektowanie ═════════════════════════════════════ */
  design: {
    key: "design",
    name: "Projektowanie i dokumentacja",
    metaTitle: "Projektowanie 2D/3D — Częstochowa",
    metaDescription:
      "Konstruktor po stronie warsztatu: model 3D, rysunki wykonawcze i pliki DXF pod laser — ze szkicu, zdjęcia lub pomiaru z natury. Częstochowa, cała UE.",
    hero: {
      eyebrow: "Pracownia projektowa",
      title: "Ze szkicu robimy dokumentację.",
      accent: "dokumentację.",
      lead: "Nie każdy klient ma biuro konstrukcyjne. Przysyłasz szkic, zdjęcie albo wymiary z natury — nasz konstruktor przygotowuje model 3D, rysunki wykonawcze i pliki produkcyjne. Projektujemy pod własny park maszyn, więc dokumentacja od razu nadaje się do produkcji.",
    },
    specTable: {
      title: "Zakres pracowni",
      rows: [
        { label: "Dane wejściowe", value: "szkic, zdjęcie, pomiar z natury, model klienta" },
        { label: "Modelowanie", value: "CAD 3D — konstrukcje spawane i blachy gięte" }, // [CONFIRM] oprogramowanie
        { label: "Dane wyjściowe", value: "rysunki wykonawcze PDF, DXF pod laser, STEP" },
        { label: "Rozwinięcia blach", value: "z promieniami gięcia naszej prasy krawędziowej" },
        { label: "Akceptacja", value: "dokumentacja zatwierdzana przed startem produkcji" },
        { label: "Rewizje", value: "poprawki przed produkcją w cenie usługi" }, // [CONFIRM] zasady
      ],
    },
    applications: {
      title: "Kiedy pracownia się przydaje",
      items: [
        {
          name: "Konstrukcja bez dokumentacji",
          description:
            "Istnieje tylko pomysł albo stary element. Mierzymy, modelujemy, dokumentujemy — i produkujemy.",
        },
        {
          name: "Adaptacja projektu pod produkcję",
          description:
            "Ten sam wyrób, prostsza technologia: mniej spawania, mniej gięć, niższa cena przy tej samej funkcji.",
        },
        {
          name: "Rozwinięcia blach",
          description:
            "Z modelu 3D robimy rozwinięcia z naddatkami pod konkretną prasę — detal po gięciu trzyma wymiar.",
        },
        {
          name: "Dokumentacja warsztatowa i montażowa",
          description:
            "Rysunki dla hali i dla ekipy na budowie: numeracja elementów, listy śrub, kolejność montażu.",
        },
      ],
    },
    faq: [
      {
        question: "Mam tylko zdjęcie i wymiary. Wystarczy?",
        answer:
          "Tak. Opisz funkcję elementu i przewidywane obciążenie, resztę domodelujemy. Przy większych konstrukcjach możemy wykonać pomiar u klienta — zasięg dojazdu uzgadniamy indywidualnie.", // [CONFIRM] zasięg pomiarów
      },
      {
        question: "Czy dostanę pliki projektu?",
        answer:
          "Rysunki PDF oraz pliki STEP i DXF przekazujemy standardowo wraz z wyrobem. Przekazanie natywnych plików CAD uzgadniamy w umowie.", // [CONFIRM] polityka plików
      },
      {
        question: "Czy projektujecie tylko pod własną produkcję?",
        answer:
          "Głównie tak — wtedy projekt od razu uwzględnia nasz park maszyn i technologia jest najtańsza. Samą dokumentację bez produkcji też wykonujemy, rozliczaną godzinowo.",
      },
      {
        question: "Ile kosztuje projekt?",
        answer:
          "Przy zleceniu produkcji u nas koszt dokumentacji jest częściowo lub w całości wliczony w cenę wyrobu — zależnie od zakresu. Samodzielne opracowanie dokumentacji wyceniamy godzinowo, po obejrzeniu materiałów wejściowych.", // [CONFIRM] model rozliczeń
      },
      {
        question: "Czy wykonujecie obliczenia statyczne?",
        answer:
          "Przekroje dobieramy według praktyki warsztatowej i wytycznych klienta. Jeżeli projekt wymaga obliczeń statycznych z uprawnieniami, organizujemy je we współpracy z zewnętrznym biurem projektowym — powiedz o tym na etapie zapytania.", // [CONFIRM] współpraca z biurem
      },
    ],
    related: ["structures", "laser", "welding"],
  },

  /* ══ 06 — Konstrukcje stalowe ═══════════════════════════════ */
  structures: {
    key: "structures",
    name: "Konstrukcje stalowe",
    metaTitle: "Konstrukcje stalowe na wymiar — Częstochowa",
    metaDescription:
      "Kompletne konstrukcje stalowe: antresole, platformy, ramy, podkonstrukcje. Projekt, spawanie, malowanie proszkowe i dostawa w całej UE z Częstochowy.",
    hero: {
      eyebrow: "Konstrukcje stalowe",
      title: "Kompletna konstrukcja. Jeden wykonawca.",
      accent: "Jeden",
      lead: "Projekt, cięcie, spawanie, malowanie, dostawa — jedna umowa i jedna odpowiedzialność. Tak od lat pracujemy dla realizacji własnej grupy w Belgii i Polsce. Tak samo dostarczamy konstrukcje klientom zewnętrznym.",
    },
    specTable: {
      title: "Zakres wykonawczy",
      rows: [
        { label: "Typy konstrukcji", value: "antresole, platformy, ramy, podkonstrukcje, balustrady, schody" },
        { label: "Materiał", value: "profile i blachy S235JR / S355J2" }, // [CONFIRM] gatunki
        { label: "Maks. masa zespołu spawanego", value: "2 000 kg" }, // [CONFIRM]
        {
          label: "Maks. gabaryt zespołu spawanego",
          value: "6 000 × 2 000 × 2 000 mm; większe konstrukcje w segmentach skręcanych", // [CONFIRM]
        },
        { label: "Podział na segmenty", value: "pod transport i montaż — łączenia śrubowe" },
        { label: "Wykończenie", value: "malowanie proszkowe na miejscu, cynkowanie u partnera" }, // [CONFIRM] cynkowanie
        { label: "Dokumentacja", value: "model 3D, rysunki warsztatowe i montażowe" },
        { label: "Dostawa", value: "cała UE — do Niemiec i Beneluksu 1–2 dni" }, // [CONFIRM] czas transportu
      ],
    },
    applications: {
      title: "Co budujemy",
      items: [
        {
          name: "Antresole i platformy",
          description:
            "Dodatkowa powierzchnia w hali lub magazynie — segmenty skręcane na miejscu, bez spawania na budowie.",
        },
        {
          name: "Podkonstrukcje pod fasady i sufity",
          description:
            "Nasza specjalność od pierwszego dnia warsztatu — powtarzalne serie dla ekip montażowych grupy.",
        },
        {
          name: "Ramy i estakady pod urządzenia",
          description:
            "Konstrukcje nośne pod maszyny i instalacje — z płytami montażowymi i otworami pod kotwy.",
        },
        {
          name: "Schody i balustrady przemysłowe",
          description:
            "Ciągi komunikacyjne do hal i obiektów technicznych — malowane proszkowo w kolorze z palety RAL.",
        },
        {
          name: "Podpory i trasy instalacyjne",
          description:
            "Wsporniki i konstrukcje pod rurociągi, kanały wentylacyjne i koryta kablowe — na wymiar z projektu.",
        },
      ],
    },
    faq: [
      {
        question: "Czy zajmujecie się montażem konstrukcji?",
        answer:
          "Dostarczamy konstrukcje przygotowane do montażu: segmenty ponumerowane, łączenia śrubowe, komplet dokumentacji montażowej. Montaż jest po stronie klienta; wsparcie naszej ekipy na budowie uzgadniamy indywidualnie.", // [CONFIRM] zakres montażu
      },
      {
        question: "Czy macie certyfikat EN 1090?",
        answer:
          "Nie deklarujemy certyfikacji. Wykonujemy konstrukcje warsztatowe, których jakość codziennie weryfikują ekipy montażowe naszej grupy — one są pierwszym odbiorcą tej hali. Jeśli projekt wymaga certyfikowanego wykonawcy, powiedz nam o tym na etapie zapytania.",
      },
      {
        question: "Jak wygląda transport dużych konstrukcji?",
        answer:
          "Konstrukcję dzielimy na segmenty pod gabaryt naczepy już na etapie projektu. Z Częstochowy przy autostradzie A1 transport do Niemiec i Beneluksu zajmuje 1–2 dni, po Polsce zwykle 1 dzień.", // [CONFIRM] czasy transportu
      },
      {
        question: "Czego potrzebujecie do wyceny konstrukcji?",
        answer:
          "Rysunku albo szkicu z wymiarami głównymi, informacji o funkcji i obciążeniu oraz miejsca dostawy. Jeśli dokumentacji nie ma, przygotuje ją nasza pracownia. Wycenę z terminem wysyłamy w ciągu 48 godzin.", // [CONFIRM] 48 h
      },
      {
        question: "Czy konstrukcja przyjeżdża pomalowana?",
        answer:
          "Tak. Malarnia proszkowa pracuje na tej samej hali, więc segmenty przyjeżdżają w kolorze docelowym — na budowie zostaje tylko skręcenie. Na życzenie zabezpieczamy powierzchnie widoczne na czas transportu.",
      },
    ],
    related: ["welding", "coating", "design"],
  },
};
