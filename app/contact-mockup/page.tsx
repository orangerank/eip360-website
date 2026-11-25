import type { Metadata } from "next";
import { SlotMockupForm } from "@/components/SlotMockupForm";
import { callHost } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a 20-minute call (mockup)",
  description: "Example times for a 20-minute call with Tony Fox.",
  robots: { index: false, follow: false },
};

export default function ContactMockupPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
      <p className="mb-6 max-w-xl border border-ink/15 bg-white px-3 py-2 text-[0.82rem] text-ink/70">
        Mockup: example times. Live version will show Tony&apos;s real open times.
      </p>
      <h1 className="max-w-3xl text-[clamp(2.3rem,5vw,4rem)]">
        Book a 20-minute call with {callHost.name}, {callHost.title}.
      </h1>
      <p className="mt-4 max-w-2xl text-[1.12rem] text-ink/80">Pick a time that works for you.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <h2 className="text-[1.6rem]">What we will cover in 20 minutes</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li>Where turnover is hurting you, and in which roles</li>
            <li>How we would put a dollar figure on it</li>
            <li>Whether a Retention Snapshot makes sense as a next step</li>
          </ul>
        </section>
        <section id="book" className="scroll-mt-28">
          <SlotMockupForm />
        </section>
      </div>
    </div>
  );
}
