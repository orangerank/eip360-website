import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're booked",
  robots: { index: false, follow: false },
};

const cards = [
  ["See the results", "Nine results, each in context.", "/results"],
  ["Meet the team", "The people who will review your data.", "/team"],
  ["Find your industry", "The playbook for your world.", "/industries"],
];

export default function ThanksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6 lg:py-24">
      <h1 className="text-[clamp(2.2rem,5vw,3.8rem)]">You&apos;re booked. Here is what to expect.</h1>
      <p className="mt-5 max-w-2xl text-[1.08rem] text-ink/80">
        A calendar invitation is on its way to your inbox. On the call we will talk about where turnover is hurting you, how we would price it, and whether a Retention Snapshot makes sense. Nothing to prepare, but a rough sense of turnover by role helps.
      </p>
      <h2 className="mt-12 text-[2rem]">Three things worth a look before we talk</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map(([title, body, href]) => (
          <Link key={href} href={href} className="border border-ink/10 bg-white p-6 hover:border-ink">
            <h3 className="text-[1.25rem]">{title}</h3>
            <p className="mt-2 text-ink/75">{body}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8">
        <Link href="/turn-tax-calculator" className="font-semibold underline underline-offset-4">
          Calculate your Turn Tax before the call
        </Link>
      </p>
      <p className="mt-6">
        <Link href="/prepare" className="underline underline-offset-4">A longer briefing before the call</Link>
      </p>
    </div>
  );
}
