import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { anonymityNote, headlineResult, nineResults, researchStats } from "@/content/results";
import { resultsAttribution } from "@/content/site";

export const metadata: Metadata = {
  title: "Results",
  description: "Nine results from our founder's work at a Fortune 10 company, each with its scope. Not EIP client results, and not a forecast.",
};

export default function ResultsPage() {
  return (
    <>
      <section className="bg-bg text-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <h1 className="text-[clamp(2.3rem,5vw,4rem)]">The numbers, with the context behind them.</h1>
          <p className="mt-5 text-[1.08rem] text-paper/85">{resultsAttribution}</p>
          <div className="mt-8">
            <BookButton>Book a 20-minute call</BookButton>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6">
          <p className="display text-[0.75rem] tracking-[0.14em] uppercase">The headline</p>
          <p className="mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-none">{headlineResult.figure}</p>
          <p className="mt-3 text-[1.3rem]">{headlineResult.line}</p>
          <p className="mt-4 max-w-3xl text-ink/80">{headlineResult.body}</p>
        </div>
      </section>
      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">Nine results, each in context.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {nineResults.map((result) => (
              <article key={result.title} className="border border-ink/10 p-6">
                <p className="display text-[1.8rem]">{result.figure}</p>
                {"extra" in result && result.extra ? <p className="text-ink/70">{result.extra}</p> : null}
                <h3 className="mt-3 text-[1.2rem]">{result.title}</h3>
                <p className="mt-1 text-[0.95rem] text-ink/65">{result.scope}</p>
                <p className="mt-3">{result.context}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-ink/80">{anonymityNote}</p>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">The research says the same thing.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchStats.map((stat) => (
              <article key={stat.line} className="border border-ink/10 bg-white p-5">
                <p className="display text-[1.6rem]">{stat.figure}</p>
                <p className="mt-2">{stat.line}</p>
                <p className="mt-2 text-[0.9rem] text-ink/60">{stat.source}</p>
              </article>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/articles" className="font-semibold underline underline-offset-4">Read all 12 articles</Link>
          </p>
        </div>
      </section>
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)]">Want to know what this looks like on your own data?</h2>
          <div className="mt-6 flex flex-col items-center gap-4">
            <BookButton tone="on-light">Book a 20-minute call</BookButton>
            <Link href="/team" className="underline underline-offset-4">Meet the people who did this work</Link>
          </div>
        </div>
      </section>
    </>
  );
}
