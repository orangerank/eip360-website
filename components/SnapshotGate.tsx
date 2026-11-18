"use client";

import { useState } from "react";
import { unlockSnapshot } from "@/app/free-poc/actions";
import { BookButton } from "./BookButton";

const core = [
  "Job title",
  "Hire date",
  "Current pay",
  "End date",
  "Reason for leaving",
  "Direct supervisor, as a letter code, never a name",
  "Worksite",
];

const optional = [
  "Date started current role",
  "Starting pay",
  "Last raise date",
  "Last review date",
  "Unplanned absence hours, last 12 months",
];

export function SnapshotGate({ unlocked }: { unlocked: boolean }) {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(unlocked);

  async function onSubmit(formData: FormData) {
    const result = await unlockSnapshot(formData);
    if (result.ok) {
      setOpen(true);
      setMessage(null);
      return;
    }
    setMessage(
      result.reason === "unconfigured"
        ? "Invitation codes are issued after the call. Set FREE_POC_CODE on the host when Brett supplies the code for this environment. The code is not stored in the repository."
        : "That code did not match.",
    );
  }

  if (!open) {
    return (
      <form action={onSubmit} className="mt-8 max-w-md border border-ink/10 bg-white p-6">
        <p className="font-semibold">Enter the EIP code to unlock your intake form.</p>
        <label htmlFor="code" className="mt-4 block">Your code</label>
        <input id="code" name="code" autoComplete="off" required className="mt-2 min-h-12 w-full border border-ink/20 px-3" />
        <button type="submit" className="mt-4 inline-flex min-h-11 items-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase">
          Unlock my intake form
        </button>
        {message ? <p className="mt-3 text-[0.95rem]">{message}</p> : null}
        <p className="mt-5 text-[0.95rem] text-ink/70">No code?</p>
        <div className="mt-3">
          <BookButton tone="on-light">Book an appointment</BookButton>
        </div>
      </form>
    );
  }

  return (
    <div className="mt-8 max-w-2xl">
      <p className="border border-gold/40 bg-gold-pale/40 p-4">
        Code accepted for this browser session. The secure upload from the current site is not connected on this review build, so nothing you type here is sent to EIP.
      </p>
      <h2 className="mt-8 text-[1.6rem]">Seven standard data fields</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {core.map((field) => (
          <li key={field}>{field}</li>
        ))}
      </ul>
      <h3 className="mt-6 text-[1.2rem]">Optional, when your system has them</h3>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {optional.map((field) => (
          <li key={field}>{field}</li>
        ))}
      </ul>
      <p className="mt-4 text-ink/75">
        Names stay off the file. Supervisors are letters, not names. Pick one role and a small group. Brett still needs to confirm how the Snapshot should be described, including the line on the current site that says the analysis is kept with no invoice.
      </p>
    </div>
  );
}
