"use client";

import { useMemo, useState } from "react";
import { turnTaxExample } from "@/content/site";
import { calculateTurnTax, formatMoney, roleOptions } from "@/lib/turn-tax";
import { BookButton } from "./BookButton";

export function TurnTaxTeaser() {
  const [role, setRole] = useState(String(turnTaxExample.roleIndex));
  const [pay, setPay] = useState(String(turnTaxExample.annualPay));
  const [left, setLeft] = useState(String(turnTaxExample.peopleWhoLeft));

  const result = useMemo(() => {
    const departures = Number(left);
    return calculateTurnTax({
      positionIndex: Number(role),
      pay: Number(pay),
      payMode: "annual",
      headcount: departures || 1,
      departures,
    });
  }, [role, pay, left]);

  const href = `/turn-tax-calculator?role=${encodeURIComponent(role)}&pay=${encodeURIComponent(pay)}&left=${encodeURIComponent(left)}`;

  return (
    <div className="grid items-stretch gap-4 text-left md:grid-cols-2">
      <form className="border border-ink/10 bg-white p-6 sm:p-8" aria-describedby="example-note">
        <p id="example-note" className="display text-[0.72rem] tracking-[0.14em] text-ink uppercase">
          Example
        </p>
        <p className="mt-2 text-[0.95rem] text-ink/70">
          Sample inputs, pending Brett&apos;s confirmed example. Change them, or open the full calculator. This is not your company&apos;s number.
        </p>
        <label htmlFor="qt-role" className="mt-6 block text-[0.95rem] font-semibold">
          Role
        </label>
        <select
          id="qt-role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="mt-2 min-h-12 w-full border border-ink/20 bg-paper px-3"
        >
          {roleOptions.map((label, index) => (
            <option key={label} value={index}>
              {label}
            </option>
          ))}
        </select>
        <label htmlFor="qt-pay" className="mt-5 block text-[0.95rem] font-semibold">
          Average annual pay
        </label>
        <input
          id="qt-pay"
          type="number"
          inputMode="decimal"
          min={0}
          value={pay}
          onChange={(event) => setPay(event.target.value)}
          className="mt-2 min-h-12 w-full border border-ink/20 bg-paper px-3"
        />
        <label htmlFor="qt-left" className="mt-5 block text-[0.95rem] font-semibold">
          People who left in the past 12 months
        </label>
        <input
          id="qt-left"
          type="number"
          inputMode="numeric"
          min={0}
          value={left}
          onChange={(event) => setLeft(event.target.value)}
          className="mt-2 min-h-12 w-full border border-ink/20 bg-paper px-3"
        />
      </form>
      <div className="flex flex-col justify-center border border-gold/60 bg-bg p-6 text-center text-paper sm:p-8" aria-live="polite">
        <p className="display text-[0.72rem] tracking-[0.14em] text-gold-bright uppercase">Example · Your Turn Tax per year</p>
        <p className="display mt-4 text-[clamp(2.4rem,5vw,4.2rem)] text-gold-bright">
          {result ? formatMoney(result.perYear) : "$0"}
        </p>
        <p className="mt-3 text-[0.95rem] text-paper/70">
          {result ? "Illustrative estimate from the example inputs." : "Fill in the three answers."}
        </p>
        <div className="mt-6">
          <BookButton href={href} variant="outline">
            Calculate your Turn Tax
          </BookButton>
        </div>
      </div>
    </div>
  );
}
