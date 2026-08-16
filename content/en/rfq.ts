/**
 * RFQ page content — English. /en/quote.
 * File path: /content/en/rfq.ts
 *
 * Mirrors /content/rfq.ts exactly (same export name, same RfqContent
 * shape) so the EN page renders through identical components.
 *
 * Register: written natively for a German/Benelux purchasing manager
 * sourcing a Polish fabrication partner — direct, technical, no
 * marketing fluff. Not a translation of the Polish copy.
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
  metaTitle: "Quote — send your drawing", // template appends "| StretchMetal"
  metaDescription:
    "Attach your drawing (DXF, DWG, STEP, PDF) and describe the job. An engineer replies with a quote or technical questions within 48 working hours.", // [CONFIRM] 48 h

  hero: {
    eyebrow: "Request a quote",
    title: "Send the drawing. Get the quote.",
    accent: "quote.",
    lead: "Attach your documentation — DXF, DWG, STEP or PDF — and tell us what to build. Your enquiry lands with an engineer, not a sales inbox. You get a price and a delivery date, not a brochure.",
  },

  form: {
    company: "Company",
    name: "Full name *",
    email: "Email *",
    phone: "Phone",
    country: "Country",
    countries: [
      { value: "PL", label: "Poland" },
      { value: "DE", label: "Germany" },
      { value: "BE", label: "Belgium" },
      { value: "NL", label: "Netherlands" },
      { value: "FR", label: "France" },
      { value: "AT", label: "Austria" },
      { value: "CZ", label: "Czechia" },
      { value: "SK", label: "Slovakia" },
      { value: "LT", label: "Lithuania" },
      { value: "SE", label: "Sweden" },
      { value: "DK", label: "Denmark" },
      { value: "other", label: "Other country" },
    ],
    services: "Scope of work",
    serviceOptions: [
      { value: "welding", label: "Welding" },
      { value: "laser", label: "Laser cutting" },
      { value: "cnc", label: "CNC machining" },
      { value: "coating", label: "Powder coating" },
      { value: "design", label: "Design & engineering" },
      { value: "structures", label: "Steel structures" },
    ],
    material: "Material",
    materialOptions: [
      { value: "steel", label: "Mild steel" },
      { value: "stainless", label: "Stainless steel" },
      { value: "aluminium", label: "Aluminium" },
      { value: "other", label: "Other / mixed" },
    ],
    quantity: "Quantity / batch size",
    quantityPlaceholder: "e.g. 25 pcs, repeating monthly batch",
    deadline: "Target deadline",
    deadlinePlaceholder: "e.g. 3 weeks, or a specific date",
    message: "Job description *",
    messagePlaceholder:
      "What should we build? Dimensions, thicknesses, material grade, RAL colour, quantities. The more specific, the faster the quote.",
    files: {
      label: "Files — drawings and documentation",
      hint: "DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP · max 10 files, 15 MB total",
      drop: "Drag and drop files here",
      browse: "Browse files",
      remove: "Remove",
      errorType:
        "File type not supported or file is empty. Accepted: DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP.",
      errorSize: "File limit: max 10 files, 15 MB total.",
    },
    consent:
      "I consent to the processing of my data for the purpose of preparing a quote and follow-up contact, in line with the",
    consentLinkLabel: "privacy policy",
    submit: "Send enquiry",
    submitting: "Sending…",
    errorGeneric: `Sending failed. Email us: ${siteConfig.contact.email} or call: ${siteConfig.contact.phoneDisplay}.`, // [CONFIRM] email, phone
    errorRequired: "This field is required.",
    errorEmail: "Enter a valid email address.",
  },

  trust: {
    title: "How we work",
    items: [
      {
        title: "Reply within 48 hours", // [CONFIRM] quote turnaround
        description:
          "A quote or technical questions within 48 working hours. No autoresponders — you hear from the person who priced your job.",
      },
      {
        title: "Your files stay confidential",
        description:
          "Documentation is used solely to prepare the offer. It is not shared with anyone outside the team doing the calculation.",
      },
      {
        title: "NDA on request",
        description:
          "Working on a protected design? We sign an NDA before you hand over documentation — just say so in your message.",
      },
      {
        title: "Direct line to an engineer",
        description:
          "From the first reply you talk to a technical person, not an account manager. Questions about tolerances and material come up immediately, not a week later.",
      },
    ],
  },

  process: {
    title: "From drawing to delivery",
    steps: [
      {
        title: "You send the drawing",
        description:
          "DXF, DWG, STEP or PDF. A dimensioned sketch works too — we can produce the manufacturing documentation on our side.",
      },
      {
        title: "Quote within 48 h", // [CONFIRM] quote turnaround
        description:
          "An engineer replies with a price and a realistic date. If anything is missing from the documentation, we ask first, then calculate.",
      },
      {
        title: "Production",
        description:
          "Cutting, welding and machining under one roof in Częstochowa, Poland. Geometry held on fixtures, dimensions checked as we go.",
      },
      {
        title: "QC and powder coating",
        description:
          "Dimensional and weld inspection, then in-house powder coating — full RAL range, no subcontractors.",
      },
      {
        title: "EU-wide delivery",
        description:
          "Packed and shipped to your address. Germany and Benelux are typically 1–2 days by truck from the A1 motorway.", // [CONFIRM] delivery time
      },
    ],
  },

  faq: {
    title: "Quoting questions",
    items: [
      {
        question: "Which file formats can I attach?",
        answer:
          "DXF or DWG for laser cutting, STEP/STP or IGES/IGS for CNC machining and 3D models, PDF for assembly drawings. Multiple files can go into a ZIP. The upload limit is 15 MB total — for larger documentation packages, mention it and we will send a transfer link.",
      },
      {
        question: "What speeds up the quote?",
        answer:
          "Complete specifics: dimensions and thicknesses, material grade (e.g. S235, 1.4301, EN AW-5754), quantity and whether the batch repeats, RAL colour if coating is needed, and your target date. An enquiry with full data gets priced straight away, without a round of questions.",
      },
      {
        question: "Do you sign NDAs?",
        answer:
          "Yes, on request — before you hand over documentation. NDA or not, every file you send is treated as confidential and used only to prepare the offer.",
      },
      {
        question: "Is there a minimum order quantity?",
        answer:
          "No fixed minimum. We quote single parts as well as repeating batches — at low quantities the production setup dominates the price, and the offer shows that split openly.",
      },
      {
        question: "How does delivery work?",
        answer:
          "We ship across the EU — palletised freight, or dedicated transport for larger structures. The workshop sits on the A1 motorway in Częstochowa: Germany and Benelux are usually 1–2 days in transit. Transport cost is itemised in the quote.", // [CONFIRM] delivery time
      },
    ],
  },

  contactStrip: {
    title: "Prefer to talk before sending files?",
    phoneLabel: "Call us",
    emailLabel: "Email us",
  },

  thanks: {
    metaTitle: "Enquiry sent",
    title: "Enquiry sent.",
    lead: "Thank you. Your enquiry and files went straight to the engineering team in Częstochowa.",
    steps: [
      "A confirmation is on its way to your email address.",
      "An engineer will review the documentation and reply with a quote or questions within 48 working hours.", // [CONFIRM] 48 h
      "Your files are confidential — they are used only to prepare the offer.",
    ],
    backHome: "Back to the homepage",
    backServices: "See our services",
  },
};
