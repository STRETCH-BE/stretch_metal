/**
 * RFQ + contact form API route — the site's conversion endpoint.
 * File path: /app/api/rfq/route.ts
 *
 * Receives multipart/form-data POSTs from the RFQ form (/wycena,
 * /en/quote, /nl/offerte) and the contact form (formType distinguishes
 * them), then emails the lead via Microsoft Graph (lib/email.ts) with the
 * customer's CAD files attached.
 *
 * Locale contract: `locale` is "pl" | "en" | "nl" (anything else falls
 * back to "pl"). It selects the ERROR strings and the auto-reply language
 * only — the lead email to the workshop stays Polish (internal audience),
 * with the customer's language flagged in a detail row.
 *
 * Anti-spam (no captcha — friction kills B2B leads):
 *   - honeypot field `website`: filled → fake success, silent drop
 *   - minimum-time-to-submit: formMs < 3000 → fake success, silent drop
 *   - per-IP in-memory rate limit: 5 submissions / 10 min / warm instance
 *
 * File policy (rfq only — contact submissions carry no files):
 *   - extensions whitelist: .dxf .dwg .step .stp .iges .igs .pdf .zip
 *   - empty files and unknown extensions rejected (400, localized)
 *   - 4 MB cap per file AND total, max 10 files — Vercel serverless
 *     rejects request bodies over ~4.5 MB with a platform 413 that never
 *     reaches this handler, and Microsoft Graph simple attachments cap
 *     near the same size, so 4 MB is the safe user-facing ceiling
 *   - filenames sanitized before they reach the email (header/HTML safety)
 *
 * Zero-env deploy contract: without the MS_GRAPH_* vars the route logs a
 * structured summary (field values + file names/sizes, NEVER contents)
 * and returns {ok:true} — the site works on a fresh Vercel project and
 * leads are at least visible in function logs.
 *
 * Lead email keeps the phone-notification-first design of the sufit lead
 * mail: name in the subject, tap-to-call / mailto up top. A localized
 * auto-reply confirms receipt to the submitter (48 h expectation, direct
 * engineer contact, confidentiality) — without echoing the attachments.
 *
 * Brand red (#e00000) appears as a literal hex ONLY here, in email HTML —
 * mail clients cannot read our CSS tokens. Not a design-system violation.
 */

import { NextResponse } from "next/server";
import { sendMail, isMailConfigured, type MailAttachment } from "@/lib/email";
import { siteConfig } from "@/lib/site-config";
import { routes } from "@/lib/i18n-routes";
import type { ServiceKey } from "@/lib/i18n-routes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FormLocale = "pl" | "en" | "nl";

/* ─── Anti-spam thresholds ────────────────────────────────── */

/** Submissions faster than this are dropped as bots (silent success). */
const MIN_FORM_MS = 3000;

/**
 * Best-effort per-IP rate limit. In-memory, so on serverless it only
 * spans a single warm instance — that still blunts naive mail-bomb
 * scripts hammering one function instance, at zero infra cost.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX = 5;
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  hits.push(now);
  // Memory guard — an attacker rotating IPs must not grow the map forever
  if (rateBuckets.size > 10_000) rateBuckets.clear();
  rateBuckets.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

/* ─── File policy ─────────────────────────────────────────── */

const ALLOWED_EXTENSIONS = [
  ".dxf",
  ".dwg",
  ".step",
  ".stp",
  ".iges",
  ".igs",
  ".pdf",
  ".zip",
] as const;

const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 MB — Vercel body limit (~4.5 MB) + Graph attachment cap
const MAX_FILE_BYTES = 4 * 1024 * 1024; // single file may use the whole budget
const MAX_FILES = 10;

/** MIME by extension — browsers send unreliable types for CAD files. */
const CONTENT_TYPES: Record<string, string> = {
  ".dxf": "application/dxf",
  ".dwg": "application/acad",
  ".step": "application/step",
  ".stp": "application/step",
  ".iges": "application/iges",
  ".igs": "application/iges",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
};

function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

/**
 * Filenames reach an email header-adjacent context (attachment name) and
 * the HTML body — strip path components and anything outside a safe set.
 */
function sanitizeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() || "file";
  const cleaned = base.replace(/[^\w. ()\-]/g, "_").slice(0, 120);
  return cleaned || "file";
}

/* ─── Whitelists (server must not trust client values) ────── */

const SERVICE_LABELS: Record<
  ServiceKey,
  { pl: string; en: string; nl: string }
> = {
  welding: { pl: "Spawanie", en: "Welding", nl: "Lassen" },
  laser: { pl: "Cięcie laserowe", en: "Laser cutting", nl: "Lasersnijden" },
  cnc: { pl: "Obróbka CNC", en: "CNC machining", nl: "CNC-bewerking" },
  coating: { pl: "Malowanie proszkowe", en: "Powder coating", nl: "Poedercoaten" },
  design: { pl: "Projektowanie", en: "Design & engineering", nl: "Engineering" },
  structures: {
    pl: "Konstrukcje stalowe",
    en: "Steel structures",
    nl: "Staalconstructies",
  },
};

const SERVICE_KEYS = Object.keys(SERVICE_LABELS) as ServiceKey[];

const MATERIAL_LABELS: Record<string, { pl: string; en: string; nl: string }> = {
  steel: { pl: "Stal czarna", en: "Mild steel", nl: "Constructiestaal" },
  stainless: {
    pl: "Stal nierdzewna",
    en: "Stainless steel",
    nl: "Inox (roestvast staal)",
  },
  aluminium: { pl: "Aluminium", en: "Aluminium", nl: "Aluminium" },
  other: { pl: "Inny / mieszany", en: "Other / mixed", nl: "Ander / gemengd" },
};

const COUNTRY_LABELS: Record<string, string> = {
  PL: "Polska / Poland",
  DE: "Deutschland / Germany",
  BE: "België / Belgium",
  NL: "Nederland / Netherlands",
  FR: "France",
  AT: "Österreich / Austria",
  CZ: "Česko / Czechia",
  SK: "Slovensko / Slovakia",
  LT: "Lietuva / Lithuania",
  SE: "Sverige / Sweden",
  DK: "Danmark / Denmark",
  other: "Other",
};

/* ─── Localized API error strings ─────────────────────────── */

const ERRORS: Record<
  FormLocale,
  {
    rateLimited: string;
    badRequest: string;
    required: string;
    email: string;
    consent: string;
    fileType: string;
    fileSize: string;
    fileEmpty: string;
    tooManyFiles: string;
    sendFailed: string;
  }
> = {
  pl: {
    rateLimited: `Zbyt wiele zgłoszeń. Zadzwoń: ${siteConfig.contact.phoneDisplay}.`,
    badRequest: "Nieprawidłowe zgłoszenie. Odśwież stronę i spróbuj ponownie.",
    required: "Imię, e-mail i wiadomość są wymagane.",
    email: "Podaj poprawny adres e-mail.",
    consent: "Wymagana zgoda na przetwarzanie danych.",
    fileType:
      "Niedozwolony format pliku. Akceptujemy: DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP.",
    fileSize:
      "Pliki przekraczają limit 4 MB. Większy pakiet spakuj do ZIP lub wyślij e-mailem.",
    fileEmpty: "Jeden z plików jest pusty. Usuń go i spróbuj ponownie.",
    tooManyFiles: "Maksymalnie 10 plików w jednym zgłoszeniu.",
    sendFailed: `Nie udało się wysłać zgłoszenia. Napisz: ${siteConfig.contact.email} lub zadzwoń: ${siteConfig.contact.phoneDisplay}.`,
  },
  en: {
    rateLimited: `Too many submissions. Call us: ${siteConfig.contact.phoneDisplay}.`,
    badRequest: "Invalid submission. Refresh the page and try again.",
    required: "Name, email and message are required.",
    email: "Enter a valid email address.",
    consent: "Data-processing consent is required.",
    fileType:
      "File type not allowed. Accepted: DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP.",
    fileSize:
      "Files exceed the 4 MB limit. ZIP a larger package or send it by email.",
    fileEmpty: "One of the files is empty. Remove it and try again.",
    tooManyFiles: "Maximum 10 files per submission.",
    sendFailed: `Sending failed. Email us: ${siteConfig.contact.email} or call: ${siteConfig.contact.phoneDisplay}.`,
  },
  // Formal u-vorm — matches the register of /content/nl/rfq.ts
  nl: {
    rateLimited: `Te veel aanvragen na elkaar. Bel ons: ${siteConfig.contact.phoneDisplay}.`,
    badRequest: "Ongeldige aanvraag. Vernieuw de pagina en probeer het opnieuw.",
    required: "Naam, e-mail en bericht zijn verplicht.",
    email: "Geef een geldig e-mailadres op.",
    consent: "Toestemming voor gegevensverwerking is verplicht.",
    fileType:
      "Bestandstype niet toegelaten. Aanvaard: DXF, DWG, STEP, STP, IGES, IGS, PDF, ZIP.",
    fileSize:
      "De bestanden overschrijden de limiet van 4 MB. Pak een groter pakket in een ZIP of stuur het per e-mail.",
    fileEmpty: "Een van de bestanden is leeg. Verwijder het en probeer opnieuw.",
    tooManyFiles: "Maximaal 10 bestanden per aanvraag.",
    sendFailed: `Versturen mislukt. Mail ons: ${siteConfig.contact.email} of bel: ${siteConfig.contact.phoneDisplay}.`,
  },
};

/* ─── Small helpers ───────────────────────────────────────── */

function asString(value: FormDataEntryValue | null, max = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatWarsawTime(date: Date): string {
  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  }).format(date);
}

/* ─── Route handler ───────────────────────────────────────── */

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: ERRORS.pl.badRequest },
      { status: 400 }
    );
  }

  const localeRaw = asString(form.get("locale"), 5);
  const locale: FormLocale =
    localeRaw === "en" || localeRaw === "nl" ? localeRaw : "pl";
  const t = ERRORS[locale];

  if (isRateLimited(ip)) {
    console.warn("[rfq API] rate limit hit for", ip);
    return NextResponse.json(
      { ok: false, error: t.rateLimited },
      { status: 429 }
    );
  }

  // Honeypot — bots tick every field they see. Fake success, silent drop,
  // logged so a false-positive wave (e.g. autofill) is visible in ops.
  if (asString(form.get("website"))) {
    console.warn("[rfq API] honeypot tripped — submission dropped");
    return NextResponse.json({ ok: true });
  }

  // Minimum-time-to-submit: the client stamps mount time and sends the
  // elapsed ms. Humans need many seconds to fill an RFQ; bots that POST
  // instantly (or omit formMs) are dropped with a fake success so they
  // don't adapt.
  const formMs = Number(asString(form.get("formMs"), 20));
  if (!Number.isFinite(formMs) || formMs < MIN_FORM_MS) {
    console.warn("[rfq API] min-time check failed — dropped", { formMs });
    return NextResponse.json({ ok: true });
  }

  const formType = asString(form.get("formType"), 20) === "contact" ? "contact" : "rfq";

  const company = asString(form.get("company"), 150);
  const name = asString(form.get("name"), 100);
  const email = asString(form.get("email"), 200).toLowerCase();
  const phone = asString(form.get("phone"), 40);
  const countryRaw = asString(form.get("country"), 20);
  const country = COUNTRY_LABELS[countryRaw] ? countryRaw : "";
  const materialRaw = asString(form.get("material"), 30);
  const material = MATERIAL_LABELS[materialRaw] ? materialRaw : "";
  const quantity = asString(form.get("quantity"), 150);
  const deadline = asString(form.get("deadline"), 150);
  const message = asString(form.get("message"), 5000);
  const consent = asString(form.get("consent"), 10);

  // Services: repeated field, whitelist-filtered, deduplicated in order
  const services = SERVICE_KEYS.filter((key) =>
    form
      .getAll("services")
      .some((value) => typeof value === "string" && value === key)
  );

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: t.required }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: t.email }, { status: 400 });
  }
  if (consent !== "true") {
    return NextResponse.json({ ok: false, error: t.consent }, { status: 400 });
  }

  // Files — rfq only; the contact form has no upload zone, so any file
  // riding on a contact POST is a direct-POST artifact and is ignored.
  const files: File[] = [];
  if (formType === "rfq") {
    for (const entry of form.getAll("files")) {
      if (entry instanceof File && entry.name) files.push(entry);
    }
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { ok: false, error: t.tooManyFiles },
        { status: 400 }
      );
    }
    let totalBytes = 0;
    for (const file of files) {
      const ext = fileExtension(file.name);
      if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(ext)) {
        return NextResponse.json(
          { ok: false, error: t.fileType },
          { status: 400 }
        );
      }
      if (file.size === 0) {
        return NextResponse.json(
          { ok: false, error: t.fileEmpty },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { ok: false, error: t.fileSize },
          { status: 400 }
        );
      }
      totalBytes += file.size;
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { ok: false, error: t.fileSize },
        { status: 400 }
      );
    }
  }

  const fileSummaries = files.map((file) => ({
    name: sanitizeFilename(file.name),
    size: file.size,
  }));

  const serviceLabels = services.map((key) => SERVICE_LABELS[key][locale]);
  const submittedAt = formatWarsawTime(new Date());

  // Zero-env deploy: no Graph credentials → log the lead (names + sizes,
  // never file contents) and report success so the funnel keeps working.
  if (!isMailConfigured()) {
    console.log("[rfq API] mail not configured — lead logged only", {
      formType,
      locale,
      company,
      name,
      email,
      phone,
      country,
      services,
      material,
      quantity,
      deadline,
      messageLength: message.length,
      files: fileSummaries,
      submittedAt,
    });
    return NextResponse.json({ ok: true });
  }

  const destination =
    process.env.RFQ_DESTINATION ||
    process.env.MS_GRAPH_FROM_ADDRESS ||
    siteConfig.contact.email;

  // Subject: "[RFQ] name — company — services" with empty segments dropped
  const subjectPrefix = formType === "contact" ? "[Kontakt]" : "[RFQ]";
  const subject = [
    subjectPrefix,
    [name, company, serviceLabels.join(", ")].filter(Boolean).join(" — "),
  ].join(" ");

  // Attachments: read bytes → base64 for Graph fileAttachment entries
  let attachments: MailAttachment[] = [];
  try {
    attachments = await Promise.all(
      files.map(async (file) => {
        const clean = sanitizeFilename(file.name);
        return {
          name: clean,
          contentType:
            CONTENT_TYPES[fileExtension(clean)] || "application/octet-stream",
          contentBytes: Buffer.from(await file.arrayBuffer()).toString("base64"),
        };
      })
    );
  } catch (err) {
    console.error("[rfq API] reading upload failed:", err);
    return NextResponse.json({ ok: false, error: t.sendFailed }, { status: 500 });
  }

  const html = buildLeadEmail({
    formType,
    locale,
    company,
    name,
    email,
    phone,
    countryLabel: country ? COUNTRY_LABELS[country] : "",
    serviceLabels: services.map((key) => SERVICE_LABELS[key].pl),
    materialLabel: material ? MATERIAL_LABELS[material].pl : "",
    quantity,
    deadline,
    message,
    files: fileSummaries,
    submittedAt,
  });

  const text = [
    `${subjectPrefix.toUpperCase()} ${name}${company ? ` (${company})` : ""}`,
    "",
    `Imię i nazwisko: ${name}`,
    `Firma:           ${company || "Nie podano"}`,
    `E-mail:          ${email}`,
    `Telefon:         ${phone || "Nie podano"}`,
    `Kraj:            ${country ? COUNTRY_LABELS[country] : "Nie podano"}`,
    `Usługi:          ${services.map((k) => SERVICE_LABELS[k].pl).join(", ") || "Nie podano"}`,
    `Materiał:        ${material ? MATERIAL_LABELS[material].pl : "Nie podano"}`,
    `Ilość:           ${quantity || "Nie podano"}`,
    `Termin:          ${deadline || "Nie podano"}`,
    `Język:           ${locale.toUpperCase()}`,
    "",
    "Wiadomość:",
    message,
    "",
    fileSummaries.length
      ? `Pliki (${fileSummaries.length}): ${fileSummaries
          .map((f) => `${f.name} (${formatBytes(f.size)})`)
          .join(", ")}`
      : "Bez plików.",
    "",
    `Zgłoszone: ${submittedAt} (Warszawa)`,
  ].join("\n");

  try {
    await sendMail({
      to: destination,
      subject,
      html,
      text,
      importance: "high",
      // Clicking Reply in Outlook answers the customer directly
      replyTo: email,
      attachments,
    });
  } catch (err) {
    console.error("[rfq API] sendMail failed:", err);
    return NextResponse.json({ ok: false, error: t.sendFailed }, { status: 500 });
  }

  // Auto-reply is best-effort: the lead is already in the inbox, so a
  // failure here must not surface as an error to the customer.
  try {
    await sendMail({
      to: email,
      subject:
        locale === "en"
          ? "We received your request — StretchMetal"
          : locale === "nl"
            ? "Wij hebben uw aanvraag ontvangen — StretchMetal"
            : "Otrzymaliśmy Twoje zapytanie — StretchMetal",
      html: buildAutoReplyEmail({ locale, name, hasFiles: files.length > 0 }),
    });
  } catch (err) {
    console.error("[rfq API] auto-reply failed (lead already delivered):", err);
  }

  return NextResponse.json({ ok: true });
}

/* ─────────────────────────────────────────────────────────────────────
   Email templates
   Inline styles only — most email clients strip <style> tags.
   Tables for layout — most reliable across Outlook / Gmail / Apple Mail.
   Brand palette hardcoded by necessity (no CSS tokens in email).
   ───────────────────────────────────────────────────────────────────── */

const BRAND_RED = "#e00000";
const BRAND_BLACK = "#0a0a0a";
const EMAIL_FONT =
  "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";

function detailRow(label: string, value: string, last = false): string {
  const border = last ? "" : "border-bottom:1px solid #eee;";
  return `
              <tr>
                <td style="padding:13px 0; ${border} font-family:${EMAIL_FONT}; font-size:11px; color:#999; width:38%; text-transform:uppercase; letter-spacing:0.1em; font-weight:600; vertical-align:top;">
                  ${label}
                </td>
                <td style="padding:13px 0; ${border} font-family:${EMAIL_FONT}; font-size:15px; color:${BRAND_BLACK}; font-weight:500;">
                  ${value}
                </td>
              </tr>`;
}

type LeadEmailData = {
  formType: "rfq" | "contact";
  locale: FormLocale;
  company: string;
  name: string;
  email: string;
  phone: string;
  countryLabel: string;
  serviceLabels: string[];
  materialLabel: string;
  quantity: string;
  deadline: string;
  message: string;
  files: { name: string; size: number }[];
  submittedAt: string;
};

function buildLeadEmail(d: LeadEmailData): string {
  const safe = {
    company: escapeHtml(d.company),
    name: escapeHtml(d.name),
    email: escapeHtml(d.email),
    phone: escapeHtml(d.phone),
    countryLabel: escapeHtml(d.countryLabel),
    materialLabel: escapeHtml(d.materialLabel),
    quantity: escapeHtml(d.quantity),
    deadline: escapeHtml(d.deadline),
    message: escapeHtml(d.message).replace(/\n/g, "<br>"),
    submittedAt: escapeHtml(d.submittedAt),
  };
  const phoneHref = d.phone.replace(/[^\d+]/g, "");

  const detailRows = [
    safe.company ? detailRow("Firma", safe.company) : "",
    safe.countryLabel ? detailRow("Kraj", safe.countryLabel) : "",
    d.serviceLabels.length
      ? detailRow("Usługi", d.serviceLabels.map(escapeHtml).join(", "))
      : "",
    safe.materialLabel ? detailRow("Materiał", safe.materialLabel) : "",
    safe.quantity ? detailRow("Ilość", safe.quantity) : "",
    safe.deadline ? detailRow("Termin", safe.deadline) : "",
    detailRow("Język klienta", d.locale.toUpperCase()),
    detailRow("Zgłoszone", `${safe.submittedAt} (Warszawa)`, true),
  ].join("");

  const filesBlock = d.files.length
    ? `
        <tr>
          <td style="padding:0 32px 24px;">
            <div style="background:#fafafa; border:1px solid #eee; padding:16px 20px;">
              <div style="font-family:${EMAIL_FONT}; font-size:11px; font-weight:700; color:#999; text-transform:uppercase; letter-spacing:0.12em; margin-bottom:8px;">
                Pliki w załączniku (${d.files.length})
              </div>
              ${d.files
                .map(
                  (f) =>
                    `<div style="font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace; font-size:12px; color:#555; line-height:1.9;"><strong style="color:#333;">${escapeHtml(f.name)}</strong> · ${formatBytes(f.size)}</div>`
                )
                .join("")}
            </div>
          </td>
        </tr>`
    : "";

  const heading =
    d.formType === "contact"
      ? "Nowa wiadomość — formularz kontaktowy"
      : "Nowe zapytanie ofertowe (RFQ)";

  const callButton = phoneHref
    ? `
                <td style="padding-right:6px;">
                  <a href="tel:${escapeHtml(phoneHref)}"
                     style="display:block; background:${BRAND_RED}; color:#ffffff; text-decoration:none; padding:16px 12px; font-family:${EMAIL_FONT}; font-weight:700; font-size:14px; text-align:center; letter-spacing:0.04em; text-transform:uppercase;">
                    Zadzwoń: ${safe.phone}
                  </a>
                </td>`
    : "";

  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(heading)} — ${safe.name}</title>
</head>
<body style="margin:0; padding:0; background:#f4f3f1; font-family:${EMAIL_FONT};">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f3f1;">
  <tr>
    <td align="center" style="padding:24px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; width:100%; background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="background:${BRAND_BLACK}; padding:22px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="font-family:${EMAIL_FONT}; font-size:11px; font-weight:600; letter-spacing:0.2em; color:#ffffff; text-transform:uppercase;">
                  <span style="color:${BRAND_RED};">■</span> &nbsp;${escapeHtml(heading)}
                </td>
                <td align="right" style="font-family:${EMAIL_FONT}; font-size:15px; font-weight:800; letter-spacing:0.02em; color:#ffffff; text-transform:uppercase;">
                  STRETCH<span style="color:${BRAND_RED};">METAL</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Name + company -->
        <tr>
          <td style="padding:32px 32px 12px;">
            <div style="font-family:${EMAIL_FONT}; font-size:13px; color:#999;">
              ${d.formType === "contact" ? "Wiadomość od:" : "Klient prosi o wycenę:"}
            </div>
            <div style="font-family:${EMAIL_FONT}; font-size:30px; font-weight:800; letter-spacing:-0.02em; color:${BRAND_BLACK}; margin-top:4px; line-height:1.15;">
              ${safe.name}
            </div>
            ${
              safe.company
                ? `<div style="font-family:${EMAIL_FONT}; font-size:15px; color:#666; margin-top:6px;">${safe.company}</div>`
                : ""
            }
          </td>
        </tr>

        <!-- Action buttons: call first, then reply-by-mail -->
        <tr>
          <td style="padding:8px 32px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                ${callButton}
                <td style="${phoneHref ? "padding-left:6px;" : ""}">
                  <a href="mailto:${safe.email}"
                     style="display:block; background:${BRAND_BLACK}; color:#ffffff; text-decoration:none; padding:16px 12px; font-family:${EMAIL_FONT}; font-weight:700; font-size:14px; text-align:center; letter-spacing:0.04em; text-transform:uppercase;">
                    Odpowiedz e-mailem
                  </a>
                </td>
              </tr>
            </table>
            <div style="margin-top:12px; font-family:${EMAIL_FONT}; font-size:13px; color:#888; text-align:center;">
              <a href="mailto:${safe.email}" style="color:${BRAND_RED}; text-decoration:none; font-weight:600;">${safe.email}</a>
            </div>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:0 32px 24px;">
            <div style="background:#f4f3f1; padding:18px 22px; border-left:3px solid ${BRAND_RED};">
              <div style="font-family:${EMAIL_FONT}; font-size:11px; font-weight:700; color:${BRAND_BLACK}; text-transform:uppercase; letter-spacing:0.12em; margin-bottom:8px;">
                Wiadomość klienta
              </div>
              <div style="font-family:${EMAIL_FONT}; font-size:15px; color:#444; line-height:1.6;">
                ${safe.message}
              </div>
            </div>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:0 32px 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid #eee;">
              ${detailRows}
            </table>
          </td>
        </tr>

        ${filesBlock}

        <!-- Action callout -->
        <tr>
          <td style="padding:0 32px 32px;">
            <div style="background:${BRAND_BLACK}; padding:16px 22px;">
              <div style="font-family:${EMAIL_FONT}; font-size:12px; font-weight:700; color:#ffffff; text-transform:uppercase; letter-spacing:0.1em;">
                Obiecana odpowiedź: <span style="color:${BRAND_RED};">48 godzin</span>
              </div>
            </div>
          </td>
        </tr>

      </table>

      <div style="margin-top:16px; font-family:${EMAIL_FONT}; font-size:11px; color:#999; text-align:center;">
        Automatyczna wiadomość z formularza na ${escapeHtml(siteConfig.url.replace(/^https?:\/\//, ""))}${escapeHtml(d.formType === "contact" ? routes.contact[d.locale] : routes.rfq[d.locale])}<br>
        <span style="color:#bbb;">StretchMetal — część Stretchgroup · Częstochowa, Polska</span>
      </div>

    </td>
  </tr>
</table>

</body>
</html>`;
}

/* ─── Auto-reply to the submitter ─────────────────────────── */

type AutoReplyData = {
  locale: FormLocale;
  name: string;
  hasFiles: boolean;
};

function buildAutoReplyEmail(d: AutoReplyData): string {
  const safeName = escapeHtml(d.name.split(" ")[0] || d.name);
  const siteHost = siteConfig.url.replace(/^https?:\/\//, "");

  const copy =
    d.locale === "en"
      ? {
          title: "We received your request",
          greeting: `Hello ${safeName},`,
          body: [
            "Thank you for your enquiry. It has landed directly with our engineering team in Częstochowa — no ticket queue, no call center.",
            // [CONFIRM] 48 h response time
            "You will receive a quote or technical questions from an engineer within <strong>48 hours</strong>. If anything in your drawings needs clarifying, we will call or write back first.",
            d.hasFiles
              ? "Your files are treated as confidential and are used only to prepare the quote. An NDA is available on request."
              : "If you have technical drawings (DXF, DWG, STEP, PDF), reply to this email and attach them — it speeds up the quote.",
          ],
          contactLead: "Need it faster? Contact us directly:",
          signoff: "StretchMetal — part of Stretchgroup",
        }
      : d.locale === "nl"
        ? {
            title: "Wij hebben uw aanvraag ontvangen",
            greeting: `Beste ${safeName},`,
            body: [
              "Bedankt voor uw aanvraag. Ze is rechtstreeks bij ons engineeringteam in Częstochowa terechtgekomen — geen ticketwachtrij, geen callcenter.",
              // [CONFIRM] 48 h response time
              "Binnen <strong>48 uur</strong> ontvangt u van een ingenieur een offerte of technische vragen. Vraagt iets in uw tekeningen om verduidelijking, dan bellen of mailen wij eerst — gewoon in het Nederlands.",
              d.hasFiles
                ? "Uw bestanden worden vertrouwelijk behandeld en uitsluitend gebruikt om de offerte op te stellen. Een NDA is op verzoek beschikbaar."
                : "Hebt u technische tekeningen (DXF, DWG, STEP, PDF)? Beantwoord deze e-mail en voeg ze toe — dat versnelt de offerte.",
            ],
            contactLead: "Sneller nodig? Neem rechtstreeks contact op:",
            signoff: "StretchMetal — onderdeel van Stretchgroup",
          }
        : {
            title: "Otrzymaliśmy Twoje zapytanie",
            greeting: `Dzień dobry${safeName ? `, ${safeName}` : ""},`,
            body: [
              "Dziękujemy za zapytanie. Trafiło bezpośrednio do naszego zespołu technicznego w Częstochowie — bez kolejki zgłoszeń i bez call center.",
              // [CONFIRM] 48 h response time
              "W ciągu <strong>48 godzin</strong> odezwie się inżynier z wyceną albo pytaniami technicznymi. Jeśli coś w dokumentacji będzie wymagało doprecyzowania — najpierw zadzwonimy lub napiszemy.",
              d.hasFiles
                ? "Twoje pliki traktujemy jako poufne i wykorzystujemy wyłącznie do przygotowania wyceny. Na życzenie podpisujemy NDA."
                : "Jeśli masz rysunki techniczne (DXF, DWG, STEP, PDF), odpowiedz na tę wiadomość i załącz je — przyspieszy to wycenę.",
            ],
            contactLead: "Potrzebujesz szybciej? Skontaktuj się bezpośrednio:",
            signoff: "StretchMetal — część Stretchgroup",
          };

  return `<!DOCTYPE html>
<html lang="${d.locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${copy.title} — StretchMetal</title>
</head>
<body style="margin:0; padding:0; background:#f4f3f1; font-family:${EMAIL_FONT};">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f3f1;">
  <tr>
    <td align="center" style="padding:24px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px; width:100%; background:#ffffff;">

        <!-- Header -->
        <tr>
          <td style="background:${BRAND_BLACK}; padding:22px 32px;">
            <span style="font-family:${EMAIL_FONT}; font-size:16px; font-weight:800; letter-spacing:0.02em; color:#ffffff; text-transform:uppercase;">
              STRETCH<span style="color:${BRAND_RED};">METAL</span>
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <div style="font-family:${EMAIL_FONT}; font-size:22px; font-weight:800; letter-spacing:-0.01em; color:${BRAND_BLACK}; margin-bottom:16px;">
              ${copy.title}<span style="color:${BRAND_RED};">.</span>
            </div>
            <div style="font-family:${EMAIL_FONT}; font-size:15px; color:#444; line-height:1.65; margin-bottom:12px;">
              ${copy.greeting}
            </div>
            ${copy.body
              .map(
                (paragraph) =>
                  `<div style="font-family:${EMAIL_FONT}; font-size:15px; color:#444; line-height:1.65; margin-bottom:12px;">${paragraph}</div>`
              )
              .join("")}
          </td>
        </tr>

        <!-- Direct contact -->
        <tr>
          <td style="padding:0 32px 32px;">
            <div style="background:#f4f3f1; padding:18px 22px; border-left:3px solid ${BRAND_RED};">
              <div style="font-family:${EMAIL_FONT}; font-size:12px; font-weight:700; color:${BRAND_BLACK}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px;">
                ${copy.contactLead}
              </div>
              <div style="font-family:${EMAIL_FONT}; font-size:14px; line-height:1.9;">
                <a href="tel:${siteConfig.contact.phone}" style="color:${BRAND_RED}; text-decoration:none; font-weight:700;">${siteConfig.contact.phoneDisplay}</a><br>
                <a href="mailto:${siteConfig.contact.email}" style="color:${BRAND_RED}; text-decoration:none; font-weight:600;">${siteConfig.contact.email}</a>
              </div>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fafafa; padding:18px 32px; border-top:1px solid #eee;">
            <div style="font-family:${EMAIL_FONT}; font-size:11px; color:#999; line-height:1.7;">
              ${copy.signoff}<br>
              ${escapeHtml(siteConfig.contact.address.street)}, ${escapeHtml(`${siteConfig.contact.address.postalCode} ${siteConfig.contact.address.city}`)} · ${escapeHtml(siteHost)}
            </div>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
}
