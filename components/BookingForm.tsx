"use client";

import { useEffect, useState } from "react";
import { BOOKING_CONSENT_TEXT, CONFIRMATION_MESSAGE } from "@/lib/booking";

type FieldErrors = Partial<Record<"name" | "company" | "email" | "phone" | "consent", string>>;

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => string;
    };
  }
}

export function BookingForm() {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/booking")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { siteKey?: string } | null) => {
        if (!cancelled && data?.siteKey) setSiteKey(data.siteKey);
      })
      .catch(() => {
        if (!cancelled) setFormError("The form is not available right now. Email hello@eip360.com.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!siteKey) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      const node = document.getElementById("turnstile-widget");
      if (!node || !window.turnstile) return;
      window.turnstile.render(node, { sitekey: siteKey, callback: (value) => setToken(value) });
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [siteKey]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setErrors({});
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      consent: data.get("consent") === "yes",
      turnstileToken: token,
      referrer: document.referrer,
    };
    const next: FieldErrors = {};
    if (!payload.name.trim()) next.name = "Enter your name.";
    if (!payload.company.trim()) next.company = "Enter your company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) next.email = "Enter a work email.";
    if (payload.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number.";
    if (!payload.consent) next.consent = "Consent is required.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string; error?: string; fields?: FieldErrors };
      if (!response.ok || !result.ok) {
        setErrors(result.fields ?? {});
        setFormError(result.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(result.message || CONFIRMATION_MESSAGE);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="border border-gold/50 bg-white p-6 sm:p-8">
        <h2 className="text-[1.6rem]">Request received</h2>
        <p className="mt-3 text-ink/80">{done}</p>
        <p className="mt-3 text-[0.95rem] text-ink/65">This does not book the meeting. Tony will email a few times.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 border border-ink/10 bg-white p-6 sm:p-8">
      <Field label="Name" name="name" autoComplete="name" error={errors.name} />
      <Field label="Company" name="company" autoComplete="organization" error={errors.company} />
      <Field label="Work email" name="email" type="email" autoComplete="email" error={errors.email} />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
      <label className="flex items-start gap-3 text-[0.95rem]">
        <input name="consent" value="yes" type="checkbox" className="mt-1 size-5" />
        <span>{BOOKING_CONSENT_TEXT}</span>
      </label>
      {errors.consent ? <p className="text-[0.95rem] text-[#8d1d32]">{errors.consent}</p> : null}
      <div id="turnstile-widget" />
      {formError ? (
        <p role="alert" className="text-[0.95rem] text-[#8d1d32]">
          {formError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending || !siteKey}
        className="inline-flex min-h-12 items-center justify-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase disabled:opacity-60"
      >
        {pending ? "Sending" : "Request a 20-minute call"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete: string;
  error?: string;
}) {
  const id = `booking-${name}`;
  return (
    <label className="grid gap-2 text-[0.95rem] font-semibold" htmlFor={id}>
      {label}
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-h-12 border border-ink/20 bg-paper px-3 font-normal"
      />
      {error ? (
        <span id={`${id}-error`} className="font-normal text-[#8d1d32]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
