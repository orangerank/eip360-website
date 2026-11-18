import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { nineResults } from "@/content/results";
import { attribution, timeline } from "@/content/site";
import { people } from "@/content/team";

export const metadata: Metadata = {
  title: "Before our 20-minute call",
  robots: { index: false, follow: false },
};

export default function PreparePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">Before our 20-minute call</h1>
      <section className="mt-10">
        <h2 className="text-[1.8rem]">The path</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {timeline.map((item) => (
            <li key={item.when} className="border border-ink/10 bg-white p-4">
              <p className="display text-[1.3rem]">{item.when}</p>
              <p className="mt-1">{item.what}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-12">
        <h2 className="text-[1.8rem]">Results</h2>
        <p className="mt-3 text-ink/80">{attribution}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {nineResults.map((result) => (
            <li key={result.title} className="border border-ink/10 p-4">
              <p className="font-semibold">{result.figure}</p>
              <p>{result.title}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          <Link className="underline underline-offset-4" href="/results">Read each result in context</Link>
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-[1.8rem]">Who you will meet</h2>
        <ul className="mt-4 flex gap-3 overflow-x-auto">
          {people.map((person) => (
            <li key={person.name} className="w-28 shrink-0">
              <Image src={person.photo} alt="" width={140} height={140} className="aspect-square w-full object-cover" />
              <p className="mt-1 text-[0.85rem]">{person.name}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          <Link className="underline underline-offset-4" href="/team">Meet the team</Link>
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-[1.8rem]">What to have handy</h2>
        <p className="mt-3 max-w-2xl">
          A rough sense of turnover by role, and which roles hurt most when someone leaves. No data extract yet.
        </p>
      </section>
    </div>
  );
}
