"use client";

import { useState } from "react";
import { company } from "@/content/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("website") || "")) return;
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const org = String(data.get("company") || "");
    const message = String(data.get("message") || "");
    const body = `${message}\n\n${name}${org ? `, ${org}` : ""}\n${email}`;
    const href = `mailto:${company.email}?subject=${encodeURIComponent("Message from the EIP website")}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-[0.95rem] font-semibold">
        Your name
        <input name="name" required autoComplete="name" className="min-h-12 border border-ink/20 bg-paper px-3 font-normal" />
      </label>
      <label className="grid gap-2 text-[0.95rem] font-semibold">
        Work email
        <input name="email" type="email" required autoComplete="email" className="min-h-12 border border-ink/20 bg-paper px-3 font-normal" />
      </label>
      <label className="grid gap-2 text-[0.95rem] font-semibold">
        Company (optional)
        <input name="company" autoComplete="organization" className="min-h-12 border border-ink/20 bg-paper px-3 font-normal" />
      </label>
      <label className="grid gap-2 text-[0.95rem] font-semibold">
        How can we help?
        <textarea name="message" required rows={5} className="border border-ink/20 bg-paper px-3 py-3 font-normal" />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button type="submit" className="inline-flex min-h-12 items-center justify-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase">
        Send message
      </button>
      {sent ? (
        <p role="status" className="text-[0.95rem]">
          Your email app should open with the message addressed to {company.email}. Replies come from that address. An email tool is not connected on this review site yet.
        </p>
      ) : (
        <p className="text-[0.9rem] text-ink/65">Replies come from {company.email}.</p>
      )}
    </form>
  );
}
