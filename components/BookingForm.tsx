"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AVAILABILITY_BLOCKS,
  AVAILABILITY_DAYS,
  BOOKING_CONSENT_TEXT,
  CENTRAL_TIME_ZONE,
  CONFIRMATION_MESSAGE,
  localWindowLabel,
} from "@/lib/booking";

type FieldErrors = Partial<Record<"name" | "company" | "email" | "phone" | "consent" | "availability", string>>;

const BLOCK_CT_LABEL = {
  morning: "9:00 AM–12:00 PM CT",
  afternoon: "1:00–5:00 PM CT",
} as const;

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
  const [selected, setSelected] = useState<string[]>([]);
  const [timeZone, setTimeZone] = useState(CENTRAL_TIME_ZONE);

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone) setTimeZone(zone);
  }, []);

  const localLabels = useMemo(() => {
    const labels = new Map<string, string | null>();
    for (const day of AVAILABILITY_DAYS) {
      for (const block of AVAILABILITY_BLOCKS) {
        labels.set(`${day.id}:${block.id}`, localWindowLabel(day.id, block.id, timeZone));
      }
    }
    return labels;
  }, [timeZone]);

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
      availability: selected.map((key) => {
        const [day, block] = key.split(":");
        return { day, block };
      }),
      visitorTimezone: timeZone,
      turnstileToken: token,
      referrer: document.referrer,
    };
    const next: FieldErrors = {};
    if (!payload.name.trim()) next.name = "Enter your name.";
    if (!payload.company.trim()) next.company = "Enter your company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) next.email = "Enter a work email.";
    if (payload.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a phone number.";
    if (!payload.consent) next.consent = "Consent is required.";
    if (selected.length === 0) next.availability = "Choose at least one time.";
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
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 border border-ink/10 bg-white p-6 sm:p-8">
      <Field label="Name" name="name" autoComplete="name" error={errors.name} />
      <Field label="Company" name="company" autoComplete="organization" error={errors.company} />
      <Field label="Work email" name="email" type="email" autoComplete="email" error={errors.email} />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
      <AvailabilityPicker
        selected={selected}
        timeZone={timeZone}
        localLabels={localLabels}
        error={errors.availability}
        onToggle={(key) =>
          setSelected((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]))
        }
      />
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

function AvailabilityPicker({
  selected,
  timeZone,
  localLabels,
  error,
  onToggle,
}: {
  selected: string[];
  timeZone: string;
  localLabels: Map<string, string | null>;
  error?: string;
  onToggle: (key: string) => void;
}) {
  const differs = timeZone !== CENTRAL_TIME_ZONE;
  return (
    <fieldset
      aria-invalid={Boolean(error)}
      aria-describedby={error ? "availability-error" : "availability-hint"}
      className="grid gap-3"
    >
      <legend className="text-[0.95rem] font-semibold">When can you talk?</legend>
      <p id="availability-hint" className="text-[0.9rem] font-normal text-ink/70">
        Weekdays, Central time. Choose at least one. Morning is 9:00 AM–12:00 PM CT. Afternoon is 1:00–5:00 PM CT.
        {differs ? ` Your time zone is ${timeZone}.` : ""}
      </p>
      <div className="grid gap-3">
        {AVAILABILITY_DAYS.map((day) => (
          <div key={day.id} className="grid gap-2 sm:grid-cols-[6.5rem_1fr_1fr] sm:items-stretch">
            <div className="pt-1 text-[0.95rem] font-semibold sm:pt-3">{day.label}</div>
            {AVAILABILITY_BLOCKS.map((block) => {
              const key = `${day.id}:${block.id}`;
              const local = localLabels.get(key);
              const inputId = `availability-${key}`;
              return (
                <label key={key} htmlFor={inputId} className="flex min-h-11 cursor-pointer items-start gap-3 border border-ink/15 bg-paper px-3 py-2">
                  <input
                    id={inputId}
                    type="checkbox"
                    className="mt-1 size-5 shrink-0"
                    checked={selected.includes(key)}
                    onChange={() => onToggle(key)}
                    aria-describedby={local ? `${inputId}-local` : undefined}
                  />
                  <span>
                    <span className="block text-[0.95rem] font-semibold">{block.label}</span>
                    <span className="block text-[0.85rem] font-normal text-ink/70">{BLOCK_CT_LABEL[block.id]}</span>
                    {local ? (
                      <span id={`${inputId}-local`} className="block text-[0.85rem] font-normal text-ink/60">
                        {local} your time
                      </span>
                    ) : null}
                  </span>
                </label>
              );
            })}
          </div>
        ))}
      </div>
      {error ? (
        <p id="availability-error" role="alert" className="text-[0.95rem] font-normal text-[#8d1d32]">
          {error}
        </p>
      ) : null}
    </fieldset>
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
