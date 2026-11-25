"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BOOKING_CONSENT_TEXT, CENTRAL_TIME_ZONE } from "@/lib/booking";
import { callHost } from "@/content/site";

/** Example times only. Not Tony's calendar. */
const DAYS = [
  {
    id: "2026-12-01",
    label: "Tuesday, Dec 1",
    summary: "Tuesday, Dec 1",
    year: 2026,
    month: 12,
    day: 1,
    times: [
      { id: "10:00", label: "10:00 AM", hour: 10, minute: 0 },
      { id: "13:30", label: "1:30 PM", hour: 13, minute: 30 },
    ],
  },
  {
    id: "2026-12-03",
    label: "Thursday, Dec 3",
    summary: "Thursday, Dec 3",
    year: 2026,
    month: 12,
    day: 3,
    times: [
      { id: "09:30", label: "9:30 AM", hour: 9, minute: 30 },
      { id: "11:00", label: "11:00 AM", hour: 11, minute: 0 },
      { id: "14:00", label: "2:00 PM", hour: 14, minute: 0 },
    ],
  },
  {
    id: "2026-12-08",
    label: "Tuesday, Dec 8",
    summary: "Tuesday, Dec 8",
    year: 2026,
    month: 12,
    day: 8,
    times: [
      { id: "10:00", label: "10:00 AM", hour: 10, minute: 0 },
      { id: "14:00", label: "2:00 PM", hour: 14, minute: 0 },
    ],
  },
  {
    id: "2026-12-09",
    label: "Wednesday, Dec 9",
    summary: "Wednesday, Dec 9",
    year: 2026,
    month: 12,
    day: 9,
    times: [
      { id: "09:30", label: "9:30 AM", hour: 9, minute: 30 },
      { id: "13:30", label: "1:30 PM", hour: 13, minute: 30 },
    ],
  },
  {
    id: "2026-12-11",
    label: "Friday, Dec 11",
    summary: "Friday, Dec 11",
    year: 2026,
    month: 12,
    day: 11,
    times: [
      { id: "11:00", label: "11:00 AM", hour: 11, minute: 0 },
      { id: "15:00", label: "3:00 PM", hour: 15, minute: 0 },
    ],
  },
] as const;

type FieldErrors = Partial<Record<"name" | "company" | "email" | "phone" | "consent" | "slot", string>>;

export function SlotMockupForm() {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [timeZone, setTimeZone] = useState(CENTRAL_TIME_ZONE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone) setTimeZone(zone);
  }, []);

  const localLabels = useMemo(() => {
    const labels = new Map<string, string | null>();
    for (const day of DAYS) {
      for (const time of day.times) {
        labels.set(`${day.id}:${time.id}`, localClock(day.year, day.month, day.day, time.hour, time.minute, timeZone));
      }
    }
    return labels;
  }, [timeZone]);

  const chosen = DAYS.flatMap((day) => day.times.map((time) => ({ day, time, key: `${day.id}:${time.id}` }))).find(
    (item) => item.key === selected,
  );

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: FieldErrors = {};
    if (!String(data.get("name") || "").trim()) next.name = "Enter your name.";
    if (!String(data.get("company") || "").trim()) next.company = "Enter your company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") || "").trim())) next.email = "Enter a work email.";
    if (String(data.get("phone") || "").replace(/\D/g, "").length < 7) next.phone = "Enter a phone number.";
    if (data.get("consent") !== "yes") next.consent = "Consent is required.";
    if (!selected) next.slot = "Choose a time.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPending(true);
    router.push("/thanks");
  }

  const differs = timeZone !== CENTRAL_TIME_ZONE;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 border border-ink/10 bg-white p-6 sm:p-8">
      <fieldset aria-invalid={Boolean(errors.slot)} aria-describedby={errors.slot ? "slot-error" : "slot-hint"} className="grid gap-3">
        <legend className="text-[0.95rem] font-semibold">Pick a time</legend>
        <p id="slot-hint" className="text-[0.9rem] font-normal text-ink/70">
          Times shown in Central Time. Two or three days a week, a few times each day.
          {differs ? ` Your time zone is ${timeZone}.` : ""}
        </p>
        <div className="grid gap-4">
          {DAYS.map((day) => (
            <div key={day.id} className="grid gap-2">
              <div className="text-[0.95rem] font-semibold">{day.label}</div>
              <div className="flex flex-wrap gap-2">
                {day.times.map((time) => {
                  const key = `${day.id}:${time.id}`;
                  const local = localLabels.get(key);
                  const inputId = `slot-${key}`;
                  const active = selected === key;
                  return (
                    <label
                      key={key}
                      htmlFor={inputId}
                      className={`flex min-h-11 min-w-[7.5rem] cursor-pointer flex-col justify-center border px-3 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink ${
                        active ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper text-ink"
                      }`}
                    >
                      <input
                        id={inputId}
                        name="slot"
                        type="radio"
                        className="sr-only"
                        checked={active}
                        onChange={() => setSelected(key)}
                      />
                      <span className="text-[0.95rem] font-semibold">{time.label}</span>
                      <span className={`text-[0.8rem] font-normal ${active ? "text-paper/75" : "text-ink/60"}`}>CT</span>
                      {local ? (
                        <span className={`text-[0.8rem] font-normal ${active ? "text-paper/75" : "text-ink/60"}`}>{local} your time</span>
                      ) : null}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {chosen ? (
          <p role="status" className="border border-gold/50 bg-gold-pale px-3 py-3 text-[0.95rem] font-normal text-ink">
            {chosen.day.summary} at {chosen.time.label} CT, 20 minutes with {callHost.name}
          </p>
        ) : null}
        {errors.slot ? (
          <p id="slot-error" role="alert" className="text-[0.95rem] font-normal text-[#8d1d32]">
            {errors.slot}
          </p>
        ) : null}
      </fieldset>

      <Field label="Name" name="name" autoComplete="name" error={errors.name} />
      <Field label="Company" name="company" autoComplete="organization" error={errors.company} />
      <Field label="Work email" name="email" type="email" autoComplete="email" error={errors.email} />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
      <label className="flex items-start gap-3 text-[0.95rem]">
        <input name="consent" value="yes" type="checkbox" className="mt-1 size-5" />
        <span>{BOOKING_CONSENT_TEXT}</span>
      </label>
      {errors.consent ? <p className="text-[0.95rem] text-[#8d1d32]">{errors.consent}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase disabled:opacity-60"
      >
        {pending ? "Sending" : "Book my call"}
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
  const id = `mockup-${name}`;
  return (
    <label className="grid gap-2 text-[0.95rem] font-semibold" htmlFor={id}>
      {label}
      <input
        id={id}
        name={name}
        type={type}
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

function localClock(year: number, month: number, day: number, hour: number, minute: number, timeZone: string) {
  if (timeZone === CENTRAL_TIME_ZONE) return null;
  const instant = chicagoInstant(year, month, day, hour, minute);
  const clock = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" }).format(instant);
  const abbrev =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" })
      .formatToParts(instant)
      .find((part) => part.type === "timeZoneName")?.value ?? "";
  const localDay = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", month: "short", day: "numeric" }).format(instant);
  const centralDay = new Intl.DateTimeFormat("en-US", {
    timeZone: CENTRAL_TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(instant);
  const when = localDay === centralDay ? clock : `${localDay} ${clock}`;
  return abbrev ? `${when} ${abbrev}` : when;
}

function chicagoInstant(year: number, month: number, day: number, hour: number, minute: number) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CENTRAL_TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(utcGuess));
  const read = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(Number(read.year), Number(read.month) - 1, Number(read.day), Number(read.hour) % 24, Number(read.minute));
  return new Date(utcGuess - (asUtc - utcGuess));
}
