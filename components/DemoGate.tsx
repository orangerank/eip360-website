"use client";

import { useState } from "react";
import Link from "next/link";
import { unlockDemo } from "@/app/demo/actions";

export function DemoGate({ unlocked }: { unlocked: boolean }) {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(unlocked);

  async function onSubmit(formData: FormData) {
    const result = await unlockDemo(formData);
    if (result.ok) {
      setOpen(true);
      setMessage(null);
      return;
    }
    setMessage(
      result.reason === "unconfigured"
        ? "The password is shared after you book. It is not stored in this repository. Set DEMO_PASSWORD on the host to open the demo."
        : "That password did not match.",
    );
  }

  if (!open) {
    return (
      <form action={onSubmit} className="mt-8 max-w-md border border-ink/10 bg-white p-6">
        <label htmlFor="pw" className="font-semibold">Password</label>
        <input id="pw" name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-12 w-full border border-ink/20 px-3" />
        <button type="submit" className="mt-4 inline-flex min-h-11 items-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase">
          Open the demo
        </button>
        {message ? <p className="mt-3 text-[0.95rem]">{message}</p> : null}
        <p className="mt-4 text-[0.95rem] text-ink/70">
          Need the password? <Link href="/contact#book" className="underline underline-offset-4">Book a 20-minute call</Link>. It is sent after you book, not published here.
        </p>
      </form>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <p className="border border-gold/40 bg-gold-pale/50 p-4 text-[0.95rem]">
        Illustrative data for a fictional 1,000-person company. This summary is the public description of the demo. The full click-through from the current site is not copied into this review build.
      </p>
      {[
        ["Phase 1", "Proving it works", "First Flight Risk Score and Turn Tax on one group, so the method is visible before a longer engagement."],
        ["Phase 2", "Deep analytics", "The kit behind the advice: who is likely to leave, what it costs, what would keep people, and who is hiring them."],
        ["Phase 3", "Execute and get results", "A plan, a 90-day quick start, and a monthly review until the number moves."],
      ].map(([phase, title, body]) => (
        <article key={phase} className="border border-ink/10 bg-white p-5">
          <p className="display text-[0.75rem] tracking-[0.12em] uppercase">{phase}</p>
          <h2 className="mt-2 text-[1.3rem]">{title}</h2>
          <p className="mt-2 text-ink/75">{body}</p>
        </article>
      ))}
    </div>
  );
}
