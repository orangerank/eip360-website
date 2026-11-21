"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BookButton } from "./BookButton";
import { calculateTurnTax, formatMoney, roleOptions, type PayMode } from "@/lib/turn-tax";

export function TurnTaxCalculator() {
  const params = useSearchParams();
  const [role, setRole] = useState(params.get("role") ?? "");
  const [payMode, setPayMode] = useState<PayMode>("annual");
  const [pay, setPay] = useState(params.get("pay") ?? "");
  const [headcount, setHeadcount] = useState(params.get("head") ?? "");
  const [departures, setDepartures] = useState(params.get("left") ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<typeof calculateTurnTax>>(null);

  const preview = useMemo(() => result, [result]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (role === "") next.position = "Choose the role you want to price.";
    if (!(Number(pay) > 0)) {
      next.pay = payMode === "hourly" ? "Enter the average hourly pay." : "Enter the average annual salary.";
    }
    if (!(Number(headcount) >= 1)) next.headcount = "Enter how many people are in this role today.";
    if (!(Number(departures) >= 1)) next.departures = "Enter how many people left this role in the past 12 months.";
    setErrors(next);
    if (Object.keys(next).length) {
      setResult(null);
      return;
    }
    setResult(
      calculateTurnTax({
        positionIndex: Number(role),
        pay: Number(pay),
        payMode,
        headcount: Number(headcount),
        departures: Number(departures),
      }),
    );
  }

  return (
    <div>
      <form onSubmit={onSubmit} noValidate className="mx-auto max-w-2xl border border-ink/10 bg-white p-6 sm:p-10">
        <div>
          <label htmlFor="position" className="text-[0.95rem] font-semibold">
            Which role do you want to price?
          </label>
          <select
            id="position"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 min-h-12 w-full border border-ink/20 bg-paper px-3"
            aria-invalid={Boolean(errors.position)}
          >
            <option value="">Select a role</option>
            {roleOptions.map((label, index) => (
              <option key={label} value={index}>
                {label}
              </option>
            ))}
          </select>
          {errors.position ? <p className="mt-2 text-[0.95rem] text-[#8d1d32]">{errors.position}</p> : null}
        </div>

        <fieldset className="mt-7">
          <legend className="text-[0.95rem] font-semibold">Average pay for this role</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(["annual", "hourly"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={payMode === mode}
                onClick={() => setPayMode(mode)}
                className={`min-h-11 border px-3 text-[0.9rem] ${payMode === mode ? "border-ink bg-ink text-paper" : "border-ink/20"}`}
              >
                {mode === "annual" ? "Annual salary" : "Hourly pay"}
              </button>
            ))}
          </div>
          <div className="relative mt-3">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/50">$</span>
            <input
              id="pay"
              type="number"
              inputMode="decimal"
              min={0}
              value={pay}
              onChange={(event) => setPay(event.target.value)}
              placeholder={payMode === "hourly" ? "18" : "65000"}
              aria-label={payMode === "hourly" ? "Average hourly pay in dollars" : "Average annual salary in dollars"}
              className="min-h-12 w-full border border-ink/20 bg-paper px-8"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[0.9rem] text-ink/50">
              {payMode === "hourly" ? "/hr" : "/yr"}
            </span>
          </div>
          {payMode === "hourly" ? (
            <p className="mt-2 text-[0.9rem] text-ink/65">Hourly pay is annualized at 40 hours a week for 52 weeks.</p>
          ) : null}
          {errors.pay ? <p className="mt-2 text-[0.95rem] text-[#8d1d32]">{errors.pay}</p> : null}
        </fieldset>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="headcount" className="text-[0.95rem] font-semibold">
              People in this role today
            </label>
            <input
              id="headcount"
              type="number"
              inputMode="numeric"
              min={1}
              value={headcount}
              onChange={(event) => setHeadcount(event.target.value)}
              placeholder="500"
              className="mt-2 min-h-12 w-full border border-ink/20 bg-paper px-3"
            />
            {errors.headcount ? <p className="mt-2 text-[0.95rem] text-[#8d1d32]">{errors.headcount}</p> : null}
          </div>
          <div>
            <label htmlFor="departures" className="text-[0.95rem] font-semibold">
              Left this role in the past 12 months
            </label>
            <input
              id="departures"
              type="number"
              inputMode="numeric"
              min={1}
              value={departures}
              onChange={(event) => setDepartures(event.target.value)}
              placeholder="150"
              className="mt-2 min-h-12 w-full border border-ink/20 bg-paper px-3"
            />
            {errors.departures ? <p className="mt-2 text-[0.95rem] text-[#8d1d32]">{errors.departures}</p> : null}
          </div>
        </div>

        <button type="submit" className="mt-8 inline-flex min-h-12 w-full items-center justify-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase">
          See my Turn Tax™
        </button>
        <p className="mt-4 text-center text-[0.9rem] text-ink/65">
          Takes about a minute. We do not collect or store what you enter.
        </p>
      </form>

      {preview ? (
        <div className="mx-auto mt-10 max-w-3xl" aria-live="polite">
          <div className="border border-gold/50 bg-bg p-8 text-center text-paper sm:p-12">
            <p className="display text-[0.75rem] tracking-[0.14em] text-gold-bright uppercase">Your Turn Tax per year</p>
            <p className="display mt-4 text-[clamp(2.6rem,7vw,5rem)] text-gold-bright">{formatMoney(preview.perYear)}</p>
            <p className="mt-3 text-paper/75">
              About {formatMoney(preview.perDeparture)} per {preview.position.toLowerCase()} departure, or {preview.midpointPercent}% of annual pay.
              {" "}
              {preview.turnoverPercent.toFixed(1)}% turnover at your current pace.
            </p>
          </div>
          <div className="mt-4 border border-ink/10 bg-white p-6 sm:p-8">
            <h2 className="text-[1.6rem]">Where it goes</h2>
            <p className="mt-2 text-[1rem] text-ink/70">
              Your Turn Tax for one year, across the {preview.breakdown.length} of 13 cost categories that apply to this role.
            </p>
            <ul className="mt-6 space-y-4">
              {preview.breakdown.map((line) => (
                <li key={line.name}>
                  <div className="flex items-baseline justify-between gap-4 text-[1rem]">
                    <span>{line.name}</span>
                    <span className="tabular-nums text-ink/70">
                      {formatMoney(line.dollars)} ({Math.round(line.weight * 100)}%)
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-ink/10" aria-hidden>
                    <div
                      className="h-2 bg-gold"
                      style={{ width: `${Math.max(3, (line.dollars / (preview.breakdown[0]?.dollars || 1)) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 border border-ink/10 p-8 text-center">
            <h2 className="text-[1.8rem]">That is the estimate. Want the real number?</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/75">
              In 20 minutes we will show you how we would find who is likely to leave next and what it would take to bring this number down, using your own data.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4">
              <BookButton tone="on-light">Book a 20-minute call to see this on your own data</BookButton>
              <BookButton href="/retention-checkup" variant="text" tone="on-light">
                Next: take the Retention Checkup
              </BookButton>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.9rem] text-ink/60">
            This is an estimate built from published turnover cost research (SHRM, Gallup and others) as encoded in the EIP Turnover Tax matrix. It uses the midpoint of the research range for this role and assumes your current pace continues. Your real number comes from your own data.
          </p>
        </div>
      ) : null}
    </div>
  );
}
