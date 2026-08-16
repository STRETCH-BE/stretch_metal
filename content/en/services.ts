/**
 * Services content — English.
 * File path: /content/en/services.ts
 *
 * Mirrors /content/services.ts exactly (same export names, same shapes from
 * @/content/types) so PL and EN pages render through identical components.
 *
 * Register: written for a German/Benelux purchasing manager evaluating a
 * Polish fabrication partner — direct, technical, no marketing fluff. Not a
 * translation of the Polish copy; written natively for that reader.
 *
 * metaTitle: page template appends " | StretchMetal" — keep titles ≤45 chars
 * so the full tag stays ≤60. metaDescription ≤155 chars.
 *
 * Every unverified figure (thicknesses, tolerances, sizes, lead times)
 * carries a `// [CONFIRM]` comment — grep before launch.
 */

import type { ServiceCard, ServiceContent, ServiceKey } from "@/content/types";

/* ─── Service cards (home + services hub grid) ────────────── */
/* Order is fixed by the build brief: welding, laser, cnc, coating,
 * design, structures. Components rely on this order for numbering. */

export const serviceCards: ServiceCard[] = [
  {
    key: "welding",
    name: "Welding",
    short:
      "MIG/MAG and TIG welding of steel, stainless steel and aluminium — from single weldments to repeat series.",
    tags: ["MIG/MAG", "TIG", "Steel · Stainless · Aluminium"],
  },
  {
    key: "laser",
    name: "Laser cutting",
    short:
      "Fiber-laser sheet cutting straight from your DXF. Clean edges, repeatable parts, short runs welcome.",
    tags: ["Fiber laser", "DXF/DWG", "Steel ≤ 20 mm"], // [CONFIRM] max thickness
  },
  {
    key: "cnc",
    name: "CNC machining",
    short:
      "CNC milling and turning of machine parts and post-weld machining of fabricated assemblies.",
    tags: ["Milling", "Turning", "Post-weld machining"],
  },
  {
    key: "coating",
    name: "Powder coating",
    short:
      "In-house powder coating in any RAL colour — your parts leave one workshop cut, welded and coated.",
    tags: ["Full RAL", "Matt · Satin · Gloss", "In-house"],
  },
  {
    key: "design",
    name: "Design & engineering",
    short:
      "2D/3D documentation, workshop drawings and design-for-manufacture feedback — from a sketch if needed.",
    tags: ["2D/3D CAD", "Workshop drawings", "DFM review"],
  },
  {
    key: "structures",
    name: "Steel structures",
    short:
      "Complete custom steel structures: mezzanines, frames, stairs, substructures — drawing to delivered part.",
    tags: ["Mezzanines", "Frames", "EU-wide delivery"],
  },
];

/* ─── Full service pages ──────────────────────────────────── */

export const services: Record<ServiceKey, ServiceContent> = {
  /* ── Welding ─────────────────────────────────────────────── */
  welding: {
    key: "welding",
    name: "Welding",
    metaTitle: "MIG/MAG & TIG Welding Services in Poland",
    metaDescription:
      "MIG/MAG and TIG welding of steel, stainless and aluminium in Częstochowa, Poland. Single parts to series. Quotes from your drawing. Delivery across the EU.",
    hero: {
      eyebrow: "Services",
      title: "MIG/MAG & TIG welding",
      accent: "welding",
      lead: "Structural steel, stainless and aluminium — welded to your drawing by the crew that builds the Stretchgroup's own steel structures. One weldment or a repeat series, quoted from the same file you would send your local shop.",
    },
    specTable: {
      title: "Welding capability",
      rows: [
        { label: "Processes", value: "MIG/MAG (135/136), TIG (141)" },
        {
          label: "Materials",
          value: "Structural steel S235/S355, stainless 304/316, aluminium", // [CONFIRM] grades
        },
        { label: "Material thickness", value: "1 – 30 mm" }, // [CONFIRM]
        { label: "Max assembly size", value: "6 000 × 2 000 × 2 000 mm" }, // [CONFIRM]
        { label: "Max assembly weight", value: "up to 3 000 kg" }, // [CONFIRM]
        {
          label: "Quality control",
          value:
            "Visual and dimensional inspection on every batch; the group's own installation teams are the first customer",
        },
        {
          label: "Input files",
          value: "DXF, DWG, STEP, PDF — or a dimensioned sketch",
        },
      ],
    },
    applications: {
      title: "What we weld",
      intro:
        "Most of our welding output is frames and substructures the group installs on its own sites — the same stations and the same welders take on external work.",
      items: [
        {
          name: "Machine frames and bases",
          description:
            "Welded steel frames for machinery and equipment, squared and braced to keep mounting faces in tolerance — post-weld machining available in-house.",
        },
        {
          name: "Substructures and mounting frames",
          description:
            "Ceiling, facade and interior substructures — the product line this workshop was built for. High repeatability across large series.",
        },
        {
          name: "Brackets and fixing elements",
          description:
            "Laser-cut and welded brackets, consoles and fixing plates, delivered coated and ready to install.",
        },
        {
          name: "Stainless steel fabrications",
          description:
            "TIG-welded stainless assemblies where the weld stays visible — handrails, trim elements, equipment parts.",
        },
        {
          name: "Aluminium assemblies",
          description:
            "TIG (AC) welded aluminium frames and carriers — light structural elements, profile assemblies, enclosures.",
        },
        {
          name: "Guards, enclosures and railings",
          description:
            "Welded sheet and profile constructions: machine guards, technical enclosures, industrial railings and gates.",
        },
      ],
    },
    faq: [
      {
        question: "Can you weld from our drawings, and in what formats?",
        answer:
          "Yes — send DXF, DWG, STEP or PDF through the quote form. A dimensioned PDF is enough for a price; for production we prefer STEP or DWG so we can nest and prepare parts without redrawing.",
      },
      {
        question: "Do you handle single pieces or only series?",
        answer:
          "Both. The workshop runs one-off weldments next to repeat series for the group's own production. Series pricing improves with fixturing — we quote both a one-off and a batch price when it makes sense.",
      },
      {
        question: "How do you control weld quality?",
        answer:
          "Every batch gets visual and dimensional inspection against the drawing before it leaves the workshop. Our sternest inspectors are internal: the group's installation teams in Belgium and Poland build with these parts, so anything out of tolerance comes straight back to the welder who made it.",
      },
      {
        question: "Who do we talk to during the project — and in what language?",
        answer:
          "You get a direct engineering contact who speaks English; the group's home office in Belgium also works in Dutch and French. Technical questions are answered by people who read drawings, not by a call centre.",
      },
      {
        question: "How long does delivery to Germany or Benelux take?",
        answer:
          "Częstochowa sits on the A1 motorway — road freight reaches most of Germany, Belgium and the Netherlands in 1–2 days. We ship EU-wide; Incoterms (EXW, DAP or delivered to site) are agreed per order.", // [CONFIRM] delivery terms
      },
      {
        question: "Can you sign an NDA before we send drawings?",
        answer:
          "Yes. We sign NDAs on request before any technical documentation changes hands — standard practice with our OEM customers. Send yours, or ask for our template.",
      },
    ],
    related: ["laser", "coating", "structures"],
  },

  /* ── Laser cutting ───────────────────────────────────────── */
  laser: {
    key: "laser",
    name: "Laser cutting",
    metaTitle: "Laser Cutting Services in Poland",
    metaDescription:
      "Fiber-laser sheet cutting in Częstochowa, Poland: steel, stainless, aluminium. Send a DXF, get a quote within 48 h. Road delivery to DE/BE/NL in 1-2 days.",
    hero: {
      eyebrow: "Services",
      title: "Sheet-metal laser cutting",
      accent: "laser",
      lead: "Fiber-laser cutting of steel, stainless and aluminium sheet — quoted directly from your DXF. Cut-only parts, or cut, formed, welded and coated under the same roof.",
    },
    specTable: {
      title: "Cutting capability",
      rows: [
        { label: "Technology", value: "Fiber laser" }, // [CONFIRM] machine/power
        { label: "Sheet format", value: "3 000 × 1 500 mm" }, // [CONFIRM]
        { label: "Structural steel", value: "up to 20 mm" }, // [CONFIRM]
        { label: "Stainless steel", value: "up to 12 mm" }, // [CONFIRM]
        { label: "Aluminium", value: "up to 10 mm" }, // [CONFIRM]
        { label: "Cutting tolerance", value: "± 0.1 mm (typical)" }, // [CONFIRM]
        { label: "Bending", value: "CNC press brake in-house" }, // [CONFIRM] press brake specs
        { label: "Input files", value: "DXF, DWG, STEP, PDF" },
      ],
    },
    applications: {
      title: "What we cut",
      items: [
        {
          name: "Brackets, plates and gussets",
          description:
            "Flat structural parts cut to final geometry — holes, slots and contours in one operation, no secondary drilling.",
        },
        {
          name: "Formed sheet-metal parts",
          description:
            "Cut blanks bent on the CNC press brake: enclosures, covers, channels, cassettes — flat pattern developed by our engineering if you only have the 3D model.",
        },
        {
          name: "Weldment components",
          description:
            "Cut part kits feeding our own welding stations — tabs and slots designed in so assemblies self-locate and stay square.",
        },
        {
          name: "Light channels and profiles",
          description:
            "Long formed channels and carriers, a core series product for the group's lighting and ceiling systems.",
        },
        {
          name: "Prototypes and short runs",
          description:
            "One sheet is a valid order. Prototype today, series next month — same file, same machine, same tolerances.",
        },
        {
          name: "Decorative and architectural panels",
          description:
            "Perforated and contour-cut panels in steel or aluminium, powder-coated in any RAL in-house.",
        },
      ],
    },
    faq: [
      {
        question: "What file formats do you need for a quote?",
        answer:
          "DXF or DWG is fastest — we quote straight from the geometry. STEP works for formed parts. If all you have is a PDF or a dimensioned sketch, our engineering redraws it; that adds a little lead time but is routine.",
      },
      {
        question: "Is there a minimum order quantity?",
        answer:
          "No. We cut single parts and prototypes as well as repeat series. Small orders are priced by cutting time plus material — you see the structure in the quote.",
      },
      {
        question: "Do you supply the material or can we send our own?",
        answer:
          "Both. We buy steel, stainless and aluminium sheet through local mills and stockholders in the Częstochowa steel region, with mill certificates 3.1 on request. Customer-supplied material is accepted by arrangement.", // [CONFIRM] certificate handling
      },
      {
        question: "Can you also bend, weld and coat the cut parts?",
        answer:
          "Yes — that is the point of this workshop. Cutting, CNC bending, welding, machining and powder coating run under one roof, so a part goes from DXF to coated, ready-to-mount component without a second supplier.",
      },
      {
        question: "How fast can you deliver to Germany, Belgium or the Netherlands?",
        answer:
          "Quotes go out within 48 hours of receiving your files. Production lead time is confirmed per order; transport from Częstochowa by road takes 1–2 days to most of DE, BE and NL via the A1 motorway.", // [CONFIRM] 48 h
      },
      {
        question: "How do you treat our drawings — can you sign an NDA?",
        answer:
          "Your files are used for quoting and production only and are never shared. We sign NDAs on request before you send anything.",
      },
    ],
    related: ["welding", "cnc", "coating"],
  },

  /* ── CNC machining ───────────────────────────────────────── */
  cnc: {
    key: "cnc",
    name: "CNC machining",
    metaTitle: "CNC Machining Services in Poland",
    metaDescription:
      "CNC milling and turning in Częstochowa, Poland: machine parts, post-weld machining, steel, stainless, aluminium. Quotes from STEP files within 48 h.",
    hero: {
      eyebrow: "Services",
      title: "CNC milling & turning",
      accent: "CNC",
      lead: "Machined parts in steel, stainless and aluminium — and the capability most job shops lack: machining welded assemblies after fabrication, so mounting faces and bores end up where the drawing says.",
    },
    specTable: {
      title: "Machining capability",
      rows: [
        { label: "Milling", value: "3-axis CNC, travels 1 000 × 500 × 500 mm" }, // [CONFIRM]
        { label: "Turning", value: "max Ø 400 mm × 1 000 mm" }, // [CONFIRM]
        { label: "General tolerance", value: "ISO 2768-m" }, // [CONFIRM]
        { label: "Fits and functional dims", value: "to ± 0.02 mm" }, // [CONFIRM]
        {
          label: "Materials",
          value: "Structural steel, stainless, aluminium, engineering plastics", // [CONFIRM]
        },
        {
          label: "Post-weld machining",
          value: "Welded assemblies machined in-house after fabrication",
        },
        { label: "Input files", value: "STEP, DXF, DWG, PDF" },
      ],
    },
    applications: {
      title: "What we machine",
      items: [
        {
          name: "Shafts, pins and bushings",
          description:
            "Turned parts to fit-class tolerances in steel, stainless and aluminium — singles and small series.",
        },
        {
          name: "Machined plates and housings",
          description:
            "Milled base plates, adapter plates and housings with positional tolerances on hole patterns.",
        },
        {
          name: "Post-weld machining",
          description:
            "Welded frames and bases machined after fabrication: flat mounting faces, line-bored holes, threaded interfaces — one supplier responsible for the final dimension.",
        },
        {
          name: "Flanges and adapters",
          description:
            "Turned and milled connection elements made to your drawing or reverse-engineered from a sample part.",
        },
        {
          name: "Prototype and replacement parts",
          description:
            "One-off machined parts for maintenance and R&D — from a STEP file, a drawing or the worn original.",
        },
      ],
    },
    faq: [
      {
        question: "What do you need to quote a machined part?",
        answer:
          "A STEP file plus a PDF drawing with tolerances is ideal. A STEP alone is enough for geometry; we then confirm which dimensions are functional before quoting. DXF/DWG works for 2D parts.",
      },
      {
        question: "Can you machine parts after welding?",
        answer:
          "Yes — this is our standard workflow for machine frames and bases. The assembly is welded, stress positions settle, and only then are mounting faces milled and bores finished. You get one part, one supplier, one responsibility for the final tolerance.",
      },
      {
        question: "What tolerances do you hold?",
        answer:
          "ISO 2768-m as the general standard; functional dimensions to ± 0.02 mm where the drawing calls for it. Tell us which dimensions actually matter — tight tolerances everywhere only make the part expensive.", // [CONFIRM] tolerance values
      },
      {
        question: "Do you provide measurement reports?",
        answer:
          "Dimensional inspection is standard on every batch; a documented measurement report for agreed critical dimensions is available on request — specify it at the quoting stage.", // [CONFIRM] report scope
      },
      {
        question: "What are typical lead times and delivery to Western Europe?",
        answer:
          "Quotes within 48 hours; production lead time depends on material and quantity and is stated in the quote. Finished parts reach Germany and Benelux in 1–2 days by road.", // [CONFIRM] 48 h
      },
    ],
    related: ["welding", "design", "structures"],
  },

  /* ── Powder coating ──────────────────────────────────────── */
  coating: {
    key: "coating",
    name: "Powder coating",
    metaTitle: "Powder Coating Services in Poland",
    metaDescription:
      "In-house powder coating in Częstochowa, Poland — full RAL palette, matt to gloss, on our parts or yours. One workshop from raw steel to coated part.",
    hero: {
      eyebrow: "Services",
      title: "Powder coating in any RAL",
      accent: "RAL",
      lead: "The last step that makes a fabricated part a finished product. We coat what we cut and weld — and parts you deliver to us — in the full RAL palette, matt to gloss.",
    },
    specTable: {
      title: "Coating capability",
      rows: [
        { label: "Colours", value: "Full RAL palette; other systems on request" }, // [CONFIRM]
        { label: "Finishes", value: "Matt, satin, gloss, fine structure" }, // [CONFIRM]
        { label: "Max part size", value: "3 000 × 1 500 × 2 000 mm" }, // [CONFIRM]
        { label: "Pre-treatment", value: "Degreasing and surface preparation before coating" }, // [CONFIRM] process
        { label: "Coating thickness", value: "60 – 120 µm (typical)" }, // [CONFIRM]
        { label: "Substrates", value: "Steel, galvanized steel, stainless, aluminium" }, // [CONFIRM]
        {
          label: "Quality control",
          value: "Visual inspection and thickness checks per batch", // [CONFIRM]
        },
      ],
    },
    applications: {
      title: "What we coat",
      items: [
        {
          name: "Our own fabrications",
          description:
            "Every welded frame, bracket and channel can leave the workshop coated — no transport to a third-party coater, no extra handling damage, one lead time.",
        },
        {
          name: "Light channels and ceiling elements",
          description:
            "Series coating of the group's lighting channels and substructure parts — repeat colours held consistent batch to batch.",
        },
        {
          name: "Furniture and interior steel",
          description:
            "Frames, legs, shelving and architectural elements where the coat is the visible surface — matt blacks and fine structures are the house specialty.",
        },
        {
          name: "Enclosures and housings",
          description:
            "Formed sheet-metal enclosures coated inside and out, in machine-builder colour standards.",
        },
        {
          name: "Customer-supplied parts",
          description:
            "Coating as a standalone service: deliver your parts, specify the RAL and finish, collect them coated.",
        },
      ],
    },
    faq: [
      {
        question: "Do you coat parts you didn't manufacture?",
        answer:
          "Yes. Powder coating is available as a standalone service for delivered parts. Send dimensions, substrate, quantity and the RAL number — we quote it like any other job.",
      },
      {
        question: "Which colours and finishes are available?",
        answer:
          "The full RAL palette, in matt, satin, gloss and fine-structure finishes. Repeat orders are coated from the same powder specification so series stay colour-consistent.", // [CONFIRM] finish range
      },
      {
        question: "Is powder coating enough for outdoor parts?",
        answer:
          "For most outdoor applications, yes — with correct pre-treatment and film thickness. For aggressive environments we advise on the right system per case, including galvanizing before coating through a partner plant.", // [CONFIRM] galvanizing partner
      },
      {
        question: "What is the largest part you can coat?",
        answer:
          "Parts up to roughly 3 000 × 1 500 × 2 000 mm fit our line. Larger structures are coated in sections and assembled after — tell us the final geometry and we plan the split.", // [CONFIRM] dimensions
      },
      {
        question: "How does coating in-house affect lead time and price?",
        answer:
          "One roof means no inter-supplier transport, no queue at an external coater and no dispute over who scratched the part. Cut, welded and coated is one quote with one date on it — typically days shorter than a split supply chain.",
      },
    ],
    related: ["welding", "laser", "structures"],
  },

  /* ── Design & engineering ────────────────────────────────── */
  design: {
    key: "design",
    name: "Design & engineering",
    metaTitle: "Design & Engineering for Metal Fabrication",
    metaDescription:
      "2D/3D design and workshop documentation for metal fabrication. From sketch to production drawing, with DFM feedback. English-speaking engineers in Poland.",
    hero: {
      eyebrow: "Services",
      title: "From sketch to workshop drawing",
      accent: "drawing",
      lead: "Not every good part starts as a finished drawing. Our engineering turns sketches, samples and 3D models into production-ready documentation — and tells you honestly where a design change saves money.",
    },
    specTable: {
      title: "Engineering capability",
      rows: [
        { label: "Scope", value: "2D drawings, 3D models, complete workshop documentation" },
        { label: "Software", value: "2D/3D CAD" }, // [CONFIRM] which packages
        {
          label: "Input we accept",
          value: "STEP, DXF, DWG, PDF, hand sketches, photos, physical samples",
        },
        {
          label: "Deliverables",
          value: "Workshop drawings, DXF cutting files, STEP models, BOM lists",
        },
        {
          label: "DFM review",
          value: "Manufacturability feedback on every drawing before production",
        },
        { label: "Language", value: "Documentation in English or Polish" },
      ],
    },
    applications: {
      title: "What our engineering does",
      items: [
        {
          name: "Production documentation from your concept",
          description:
            "You bring the function and rough geometry; we deliver drawings the workshop can build from — dimensioned, toleranced, welded joints specified.",
        },
        {
          name: "Design-for-manufacture optimisation",
          description:
            "We review your existing drawings against our machines: fewer weld seams, smarter bend sequences, nesting-friendly geometry. Small changes, visible on the invoice.",
        },
        {
          name: "Reverse engineering",
          description:
            "An existing part with no documentation — measured, modelled, drawn, and back in production. Useful for legacy machine parts and discontinued components.",
        },
        {
          name: "Substructure and frame design",
          description:
            "Design of mounting frames and substructures for ceilings, facades and interiors — the discipline this workshop practises daily for the group's own projects.",
        },
        {
          name: "Flat-pattern development",
          description:
            "3D sheet-metal parts unfolded into accurate flat patterns with bend allowances matched to our press brake — what we cut is what you get after forming.",
        },
      ],
    },
    faq: [
      {
        question: "We only have a sketch and photos. Is that enough?",
        answer:
          "Usually, yes. Send what you have with the key dimensions and the part's function. We come back with questions, then a 3D model for your approval before anything is cut. Many of our running series started as a phone photo of a whiteboard.",
      },
      {
        question: "Who owns the documentation you produce?",
        answer:
          "That is agreed per project before we start. As a rule, documentation produced against a paid engineering order is handed over to you; documentation we create free of charge as part of a production quote stays with the quote. No surprises either way.", // [CONFIRM] IP policy
      },
      {
        question: "Do you sign NDAs before we discuss a project?",
        answer:
          "Yes, routinely. Send your NDA or request our template before sharing any technical information. Confidentiality is standard practice with the OEM and machine-builder clients we serve.",
      },
      {
        question: "Can we work in English with your engineers?",
        answer:
          "Yes — your engineering contact works in English, and drawings are issued in English on request. The Belgian home office also communicates in Dutch and French.",
      },
      {
        question: "Will you tell us if our design is more expensive than it needs to be?",
        answer:
          "Yes, before production, in writing. A DFM note is part of every quote where we see savings: a changed bend radius, a standard profile instead of a folded one, one weld instead of three. You decide; we price both versions if you want.",
      },
    ],
    related: ["laser", "welding", "structures"],
  },

  /* ── Steel structures ────────────────────────────────────── */
  structures: {
    key: "structures",
    name: "Steel structures",
    metaTitle: "Custom Steel Structures from Poland",
    metaDescription:
      "Complete custom steel structures from Częstochowa, Poland: mezzanines, platforms, frames, stairs, substructures. Fabricated, coated and delivered EU-wide.",
    hero: {
      eyebrow: "Services",
      title: "Complete steel structures",
      accent: "steel",
      lead: "The full chain in one order: engineering, laser cutting, welding, machining, powder coating and EU-wide delivery. This is what the workshop was built to do for the group — and what it now does for external clients.",
    },
    specTable: {
      title: "Fabrication capability",
      rows: [
        {
          label: "Structure types",
          value: "Mezzanines, platforms, support frames, stairs, railings, substructures",
        },
        { label: "Monthly capacity", value: "up to 20 t of processed steel" }, // [CONFIRM]
        { label: "Max element size", value: "limited by road transport; typically ≤ 12 m" }, // [CONFIRM]
        {
          label: "Surface protection",
          value: "Powder coating in-house; hot-dip galvanizing via partner plant", // [CONFIRM] partner
        },
        {
          label: "Scope options",
          value: "Fabrication only, or engineering + fabrication + delivery",
        },
        { label: "Delivery", value: "EU-wide by road; DE/BE/NL in 1–2 days" }, // [CONFIRM]
      ],
    },
    applications: {
      title: "What we build",
      items: [
        {
          name: "Mezzanines and platforms",
          description:
            "Storage and technical mezzanines: columns, beams, decking supports, stairs and railings — fabricated in sections sized for transport and site assembly.",
        },
        {
          name: "Support frames and machine bases",
          description:
            "Heavy welded frames with machined interfaces, delivered ready for equipment mounting.",
        },
        {
          name: "Stairs, railings and gates",
          description:
            "Industrial and architectural steelwork, powder-coated in any RAL — functional steel that is allowed to look good.",
        },
        {
          name: "Ceiling and facade substructures",
          description:
            "The house discipline: substructure systems the group's installation teams mount across Belgium and Poland — precise, light, repeatable.",
        },
        {
          name: "Canopies and shelters",
          description:
            "Freestanding and wall-mounted canopy structures, engineered from your requirements or built from your documentation.",
        },
        {
          name: "Transport frames and skids",
          description:
            "Welded skids, racks and transport frames for machinery and modules — one-offs and repeat series.",
        },
      ],
    },
    faq: [
      {
        question: "Can you take a project from an idea, not a finished design?",
        answer:
          "Yes. Our in-house engineering develops the structure from your requirements — loads, dimensions, interfaces — and you approve the design before fabrication starts. If you already have documentation, we fabricate directly from it.",
      },
      {
        question: "How do you deliver structures to Germany or Benelux?",
        answer:
          "By road, in transport-sized sections. Częstochowa is on the A1 motorway; standard freight reaches most of Germany, Belgium and the Netherlands in 1–2 days. Incoterms — EXW, DAP or delivered to site — are agreed per order.", // [CONFIRM] delivery terms
      },
      {
        question: "How is quality verified?",
        answer:
          "Dimensional and visual inspection against the drawings before dispatch — and a harder test than any paperwork: the group's own installation teams are the first customer of this workshop. Structures that don't fit on site come back to us, so they fit.",
      },
      {
        question: "What surface protection do you offer?",
        answer:
          "Powder coating in the full RAL palette is done in-house. For structures needing hot-dip galvanizing we work with a partner plant and manage that step inside our lead time, so you still deal with one supplier.", // [CONFIRM] galvanizing partner
      },
      {
        question: "What monthly volume can you handle?",
        answer:
          "The workshop processes up to 20 tonnes of steel per month alongside the group's internal production. For larger recurring volumes, talk to us early — capacity is planned per quarter.", // [CONFIRM] capacity
      },
    ],
    related: ["welding", "coating", "design"],
  },
};
