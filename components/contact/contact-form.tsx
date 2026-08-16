"use client";

/**
 * Contact form — the short-message counterpart of the RFQ form.
 * File path: /components/contact/contact-form.tsx
 *
 * Posts multipart/form-data to /api/rfq with formType="contact" (the API
 * contract: contact submissions carry no files; any file on a contact POST
 * is ignored server-side). Field names match the API exactly: name*,
 * email*, message*, consent ("true"), website (honeypot), formMs, locale.
 *
 * Copy exception: this is a LEAF component — it renders on exactly one
 * page per locale and its strings live in the COPY const below rather
 * than /content, per the build contract for this file. Everything else
 * (privacy route, analytics) still flows from lib/*.
 *
 * Anti-spam mirrors the RFQ form: hidden honeypot input name="website"
 * (tabIndex -1) and formMs = ms between mount and submit — the server
 * silently drops < 3000 ms.
 *
 * Success is INLINE (no redirect — the thank-you page belongs to the RFQ
 * funnel): the form swaps for a confirmation block and fires
 * `contact_form_submit` exactly once, only on a confirmed 2xx.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { routes } from "@/lib/i18n-routes";
import type { Locale } from "@/lib/site-config";

type Copy = {
  name: string;
  email: string;
  message: string;
  messagePlaceholder: string;
  consent: string;
  consentLinkLabel: string;
  submit: string;
  submitting: string;
  errorRequired: string;
  errorEmail: string;
  errorGeneric: string;
  successTitle: string;
  successBody: string;
};

const COPY: Record<Locale, Copy> = {
  pl: {
    name: "Imię i nazwisko *",
    email: "E-mail *",
    message: "Wiadomość *",
    messagePlaceholder:
      "W czym możemy pomóc? Jeśli masz rysunek techniczny, użyj formularza wyceny — dojdzie prosto do technologa.",
    consent:
      "Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na wiadomość. Szczegóły w",
    consentLinkLabel: "polityce prywatności",
    submit: "Wyślij wiadomość",
    submitting: "Wysyłanie…",
    errorRequired: "To pole jest wymagane.",
    errorEmail: "Podaj poprawny adres e-mail.",
    errorGeneric:
      "Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz bezpośrednio na nasz adres e-mail.",
    successTitle: "Wiadomość wysłana.",
    successBody:
      "Dziękujemy. Odpowiemy w ciągu 48 godzin — z tej samej hali, z której wyjeżdżają elementy.", // [CONFIRM] 48 h — site-wide SLA
  },
  en: {
    name: "Full name *",
    email: "Email *",
    message: "Message *",
    messagePlaceholder:
      "How can we help? If you have a technical drawing, use the quote form — it goes straight to an engineer.",
    consent:
      "I consent to the processing of my data for the purpose of answering this message. Details in the",
    consentLinkLabel: "privacy policy",
    submit: "Send message",
    submitting: "Sending…",
    errorRequired: "This field is required.",
    errorEmail: "Enter a valid email address.",
    errorGeneric:
      "Sending failed. Try again, or write to our email address directly.",
    successTitle: "Message sent.",
    successBody:
      "Thank you. We'll reply within 48 hours — from the same hall your parts would ship from.", // [CONFIRM] 48 h — site-wide SLA
  },
  // Formal u-vorm, Flemish register — matches /content/nl/rfq.ts
  nl: {
    name: "Naam *",
    email: "E-mail *",
    message: "Bericht *",
    messagePlaceholder:
      "Waarmee kunnen wij u helpen? Hebt u een technische tekening, gebruik dan het offerteformulier — die komt rechtstreeks bij een ingenieur terecht.",
    consent:
      "Ik ga akkoord met de verwerking van mijn gegevens om dit bericht te beantwoorden. Meer details in het",
    consentLinkLabel: "privacybeleid",
    submit: "Verstuur bericht",
    submitting: "Versturen…",
    errorRequired: "Dit veld is verplicht.",
    errorEmail: "Geef een geldig e-mailadres op.",
    errorGeneric:
      "Versturen mislukt. Probeer het opnieuw of mail ons rechtstreeks.",
    successTitle: "Bericht verzonden.",
    successBody:
      "Bedankt. We antwoorden binnen 48 uur — gewoon in het Nederlands.", // [CONFIRM] 48 h — site-wide SLA
  },
};

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export function ContactForm({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const mountedAt = useRef<number | null>(null);
  /** Guards the conversion event against double-fires on re-render. */
  const submitFired = useRef(false);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const clearFieldError = (key: keyof FieldErrors) =>
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = t.errorRequired;
    if (!email.trim()) {
      errors.email = t.errorRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = t.errorEmail;
    }
    if (!message.trim()) errors.message = t.errorRequired;
    if (!consent) errors.consent = t.errorRequired;
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    setSubmitError("");

    const data = new FormData();
    data.set("formType", "contact");
    data.set("locale", locale);
    data.set("name", name.trim());
    data.set("email", email.trim());
    data.set("message", message.trim());
    data.set("consent", "true");
    data.set("website", honeypot);
    data.set(
      "formMs",
      String(mountedAt.current ? Date.now() - mountedAt.current : 0)
    );

    try {
      const res = await fetch("/api/rfq", { method: "POST", body: data });

      if (!res.ok) {
        // API errors are already localized — surface them directly
        let apiError = "";
        try {
          const body = (await res.json()) as { error?: string };
          apiError = typeof body.error === "string" ? body.error : "";
        } catch {
          /* non-JSON body — fall through to generic copy */
        }
        setStatus("error");
        setSubmitError(apiError || t.errorGeneric);
        return;
      }

      if (!submitFired.current) {
        submitFired.current = true;
        track("contact_form_submit");
      }
      setStatus("success");
    } catch (err) {
      console.error("[contact form] submit failed:", err);
      setStatus("error");
      setSubmitError(t.errorGeneric);
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-2 border-black bg-white p-7 md:p-8"
      >
        <span aria-hidden="true" className="tick" />
        <h3 className="h3 mt-4">{t.successTitle}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-text-muted">
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — humans never see it, bots fill it */}
      <div aria-hidden="true" className="visually-hidden">
        <label htmlFor="contact-website">Website (leave empty)</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="field-label">
          {t.name}
        </label>
        <input
          id="contact-name"
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
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" role="alert" className="field-error">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="field-label">
          {t.email}
        </label>
        <input
          id="contact-email"
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
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" role="alert" className="field-error">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          {t.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className="field resize-y"
          placeholder={t.messagePlaceholder}
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearFieldError("message");
          }}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
        />
        {fieldErrors.message && (
          <p id="contact-message-error" role="alert" className="field-error">
            {fieldErrors.message}
          </p>
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
            aria-describedby={
              fieldErrors.consent ? "contact-consent-error" : undefined
            }
            className="mt-0.5 size-4 shrink-0 accent-red"
          />
          <span>
            {t.consent}{" "}
            <Link
              href={routes.privacy[locale]}
              className="underline decoration-border-input underline-offset-2 transition-colors hover:text-black"
            >
              {t.consentLinkLabel}
            </Link>
            . *
          </span>
        </label>
        {fieldErrors.consent && (
          <p id="contact-consent-error" role="alert" className="field-error">
            {fieldErrors.consent}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? t.submitting : t.submit}
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
