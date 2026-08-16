"use client";

/**
 * RFQ form — the site's #1 conversion surface.
 * File path: /components/rfq/rfq-form.tsx
 *
 * Pure <form> element, no section wrapper — the RFQ page renders it
 * inside its own two-column shell. All copy arrives via `content`
 * (RfqContent), so the same component serves /wycena and /en/quote.
 *
 * Submission: multipart/form-data POST to /api/rfq (files can't ride in
 * JSON). Field names match the API contract in the build brief exactly —
 * `services` and `files` are repeated entries.
 *
 * Anti-spam (server enforces, client cooperates):
 *   - honeypot input name="website" (visually hidden, tabIndex -1)
 *   - formMs: ms between mount and submit, server drops < 3000
 *
 * Files: drag-and-drop zone + browse button. Client-side validation
 * mirrors the server whitelist (.dxf .dwg .step .stp .iges .igs .pdf
 * .zip, 15 MB total, max 10 files) so users get instant, localized
 * feedback; rejections are announced in an aria-live region.
 *
 * Analytics (see /lib/analytics.ts):
 *   rfq_form_start  first interaction with the form, fired once
 *   rfq_submitted   THE conversion — fired exactly once, on confirmed
 *                   2xx, right before the redirect to the thank-you
 *                   page (which fires nothing, so refreshes can't
 *                   double-count)
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { routes } from "@/lib/i18n-routes";
import type { RfqContent, ServiceKey } from "@/content/types";

const ACCEPT_EXTENSIONS = [
  ".dxf",
  ".dwg",
  ".step",
  ".stp",
  ".iges",
  ".igs",
  ".pdf",
  ".zip",
] as const;
const ACCEPT_ATTR = ACCEPT_EXTENSIONS.join(",");
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;
const MAX_FILES = 10;

type Status = "idle" | "submitting" | "error";
type FieldErrors = Partial<
  Record<"name" | "email" | "message" | "consent", string>
>;

function hasAllowedExtension(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return ACCEPT_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function RfqForm({
  content,
  locale,
}: {
  content: RfqContent;
  locale: "pl" | "en";
}) {
  const router = useRouter();
  const form = content.form;

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("PL");
  const [services, setServices] = useState<ServiceKey[]>([]);
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  /** Announced via aria-live — set on rejected drops, cleared on success. */
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const mountedAt = useRef<number | null>(null);
  const startFired = useRef(false);
  /** Redirect can lag — the guard keeps rfq_submitted strictly once. */
  const submittedFired = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const markStarted = () => {
    if (startFired.current) return;
    startFired.current = true;
    track("rfq_form_start");
  };

  const clearFieldError = (key: keyof FieldErrors) =>
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const toggleService = (key: ServiceKey) => {
    markStarted();
    setServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  /**
   * Merge newly picked/dropped files into state. Validates extension and
   * running total; the first violation aborts the batch with a localized
   * message (server re-validates everything regardless).
   */
  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    markStarted();

    const next = [...files];
    let total = next.reduce((sum, f) => sum + f.size, 0);

    for (const file of Array.from(incoming)) {
      // Empty files and foreign extensions share one message — the copy
      // covers both cases, and the server enforces the same rules.
      if (!hasAllowedExtension(file.name) || file.size === 0) {
        setFileError(form.files.errorType);
        return;
      }
      // Duplicate guard — picking the same file twice must not double it
      if (next.some((f) => f.name === file.name && f.size === file.size)) {
        continue;
      }
      if (next.length + 1 > MAX_FILES || total + file.size > MAX_TOTAL_BYTES) {
        setFileError(form.files.errorSize);
        return;
      }
      next.push(file);
      total += file.size;
    }

    setFileError("");
    setFiles(next);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = form.errorRequired;
    if (!email.trim()) {
      errors.email = form.errorRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = form.errorEmail;
    }
    if (!message.trim()) errors.message = form.errorRequired;
    if (!consent) errors.consent = form.errorRequired;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    setSubmitError("");

    const data = new FormData();
    data.set("formType", "rfq");
    data.set("locale", locale);
    data.set("company", company.trim());
    data.set("name", name.trim());
    data.set("email", email.trim());
    data.set("phone", phone.trim());
    data.set("country", country);
    for (const key of services) data.append("services", key);
    data.set("material", material);
    data.set("quantity", quantity.trim());
    data.set("deadline", deadline.trim());
    data.set("message", message.trim());
    data.set("consent", "true");
    data.set("website", honeypot);
    data.set(
      "formMs",
      String(mountedAt.current ? Date.now() - mountedAt.current : 0)
    );
    for (const file of files) data.append("files", file);

    try {
      const res = await fetch("/api/rfq", { method: "POST", body: data });

      if (!res.ok) {
        // The API returns localized error strings — surface them directly
        let apiError = "";
        try {
          const body = (await res.json()) as { error?: string };
          apiError = typeof body.error === "string" ? body.error : "";
        } catch {
          /* non-JSON body — fall through to generic */
        }
        setStatus("error");
        setSubmitError(apiError || form.errorGeneric);
        return;
      }

      // THE conversion — exactly once, before the redirect. The thank-you
      // page fires nothing, so a refresh there can't double-count.
      if (!submittedFired.current) {
        submittedFired.current = true;
        track("rfq_submitted", {
          services: services.join(","),
          locale,
          files: files.length,
        });
      }
      router.push(routes.rfqThanks[locale]);
    } catch (err) {
      console.error("[rfq form] submit failed:", err);
      setStatus("error");
      setSubmitError(form.errorGeneric);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={markStarted}
      onPointerDownCapture={markStarted}
      noValidate
      className="space-y-5"
    >
      {/* Honeypot — humans never see it, bots fill it */}
      <div aria-hidden="true" className="visually-hidden">
        <label htmlFor="rfq-website">Website (leave empty)</label>
        <input
          id="rfq-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Company + name */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-company" className="field-label">
            {form.company}
          </label>
          <input
            id="rfq-company"
            name="company"
            type="text"
            className="field"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rfq-name" className="field-label">
            {form.name}
          </label>
          <input
            id="rfq-name"
            name="name"
            type="text"
            className="field"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? "rfq-name-error" : undefined}
          />
          {fieldErrors.name && (
            <p id="rfq-name-error" role="alert" className="field-error">
              {fieldErrors.name}
            </p>
          )}
        </div>
      </div>

      {/* Email + phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-email" className="field-label">
            {form.email}
          </label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            inputMode="email"
            className="field"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "rfq-email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="rfq-email-error" role="alert" className="field-error">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="rfq-phone" className="field-label">
            {form.phone}
          </label>
          <input
            id="rfq-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className="field"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Country — half-width cell, second cell stays empty on sm+ */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-country" className="field-label">
            {form.country}
          </label>
          <select
            id="rfq-country"
            name="country"
            className="field"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {form.countries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services — square toggle chips */}
      <fieldset>
        <legend className="field-label">{form.services}</legend>
        <div className="flex flex-wrap gap-2">
          {form.serviceOptions.map((option) => {
            const selected = services.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleService(option.value)}
                aria-pressed={selected}
                className={`inline-flex min-h-[44px] items-center justify-center border-2 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.06em] transition-colors ${
                  selected
                    ? "border-red bg-red text-white"
                    : "border-border-input bg-white text-black hover:border-black"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Material */}
      <fieldset>
        <legend className="field-label">{form.material}</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {form.materialOptions.map((option) => (
            <label
              key={option.value}
              className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-[15px] font-medium text-black"
            >
              <input
                type="radio"
                name="material"
                value={option.value}
                checked={material === option.value}
                onChange={() => setMaterial(option.value)}
                className="size-4 accent-red"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Quantity + deadline */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-quantity" className="field-label">
            {form.quantity}
          </label>
          <input
            id="rfq-quantity"
            name="quantity"
            type="text"
            className="field"
            placeholder={form.quantityPlaceholder}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rfq-deadline" className="field-label">
            {form.deadline}
          </label>
          <input
            id="rfq-deadline"
            name="deadline"
            type="text"
            className="field"
            placeholder={form.deadlinePlaceholder}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="rfq-message" className="field-label">
          {form.message}
        </label>
        <textarea
          id="rfq-message"
          name="message"
          rows={6}
          className="field resize-y"
          placeholder={form.messagePlaceholder}
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearFieldError("message");
          }}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "rfq-message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="rfq-message-error" role="alert" className="field-error">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Files — drag-and-drop zone */}
      <div>
        <span className="field-label">{form.files.label}</span>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed p-6 text-center transition-colors ${
            dragActive
              ? "border-red bg-surface"
              : "border-border-input bg-white"
          }`}
        >
          <input
            ref={fileInputRef}
            id="rfq-files"
            name="files"
            type="file"
            multiple
            accept={ACCEPT_ATTR}
            tabIndex={-1}
            aria-hidden="true"
            className="visually-hidden"
            onChange={(e) => {
              addFiles(e.target.files);
              // Allow re-picking a file that was just removed
              e.target.value = "";
            }}
          />
          <p className="text-[15px] font-medium text-black">
            {form.files.drop}
          </p>
          <p className="mt-1 text-[13px] text-text-faint">{form.files.hint}</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-ghost btn-sm mt-4"
          >
            {form.files.browse}
          </button>
        </div>

        {/* Rejections announced to screen readers as they happen */}
        <div aria-live="polite">
          {fileError && <p className="field-error">{fileError}</p>}
        </div>

        {files.length > 0 && (
          <ul className="mt-3 divide-y divide-border border border-border-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}`}
                className="flex items-center justify-between gap-3 py-1 pl-4 pr-1"
              >
                <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-black">
                  {file.name}
                </span>
                <span className="shrink-0 text-[12px] text-text-faint">
                  {formatBytes(file.size)}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`${form.files.remove}: ${file.name}`}
                  className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-[12px] font-bold uppercase tracking-[0.06em] text-text-muted transition-colors hover:text-red"
                >
                  {form.files.remove}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* GDPR consent */}
      <div>
        <label className="flex items-start gap-3 text-[13px] leading-[1.55] text-text-muted">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              clearFieldError("consent");
            }}
            aria-invalid={fieldErrors.consent ? true : undefined}
            className="mt-0.5 size-4 shrink-0 accent-red"
          />
          <span>
            {form.consent}{" "}
            <Link
              href={routes.privacy[locale]}
              className="underline decoration-border-input underline-offset-2 transition-colors hover:text-black"
            >
              {form.consentLinkLabel}
            </Link>
            . *
          </span>
        </label>
        {fieldErrors.consent && (
          <p role="alert" className="field-error">
            {fieldErrors.consent}
          </p>
        )}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? form.submitting : form.submit}
          <span aria-hidden="true" className="btn-arrow">
            →
          </span>
        </button>
        {status === "error" && submitError && (
          <p role="alert" className="field-error mt-3">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
