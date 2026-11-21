import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { tools } from "@/content/site";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Your first numbers in about 7 days, a plan with dollars in 30, and a team of expert advisors beside you.",
};

const steps = [
  ["Day 1", "A 20-minute call", "What turnover is costing you, and whether we can help."],
  ["About day 3", "A 45-minute data call", "We work out where your data comes from. No IT project."],
  ["Then", "Send us your file", "Through our secure portal. Names become codes before anyone looks."],
  ["Day 7", "Your first numbers", "A preliminary Flight Risk Score and Turn Tax."],
  ["The next 30 days", "Full diagnostic and expert review", "If you want to continue, our expert advisors review your data and tell you what to do."],
  ["The next 90 days", "Quick-start execution", "We start on the fixes that matter most, with you."],
  ["After that", "Ongoing support", "A monthly review of your results, and our help as you carry out the plan."],
];

const columns = ["Big consulting firms", "Technology-only platforms", "Survey-only companies", "EIP"];
const rows = [
  ["Who does the work", "Junior staff after the sale", "You, with a dashboard", "You, with a report", "Expert advisors, with you"],
  ["Time to first result", "Months", "Integration first", "After the survey cycle", "7 days"],
  ["Predicts who is about to leave", "Rarely", "Generic scores", "No, and answers get gamed", "Flight Risk Score™, from your own data"],
  ["Prices turnover in dollars", "Sometimes", "No", "No", "Turn Tax™, from your own numbers"],
  ["What you pay for", "A large project fee, then more for the follow-through", "Tiers, with the best features in the top one", "Each survey cycle, then you act on it alone", "One program, with the tools the Council picks for you"],
];

export default function ApproachPage() {
  return (
    <>
      <section className="bg-bg text-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <h1 className="text-[clamp(2.3rem,5vw,4rem)]">Your results, before other firms have a contract.</h1>
          <p className="mt-5 text-[1.15rem] text-paper/80">
            We compete on speed, ease, and quality. Your first numbers in about 7 days, a plan with dollars in 30, and a team of expert advisors beside you.
          </p>
          <div className="mt-8">
            <BookButton>Book a 20-minute call</BookButton>
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">One file in, six tools, and a team of experts behind them.</h2>
          <p className="mt-4 max-w-3xl text-ink/75">
            You send one file with seven standard data fields. Names become codes before anyone looks. Your first numbers come back in about 7 days.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="border border-ink/10 bg-white p-5">
              <h3 className="text-[1.2rem]">A plan from expert advisors</h3>
              <p className="mt-2 text-ink/75">Operators who have solved this before review your data and choose the fixes that fit.</p>
            </li>
            <li className="border border-ink/10 bg-white p-5">
              <h3 className="text-[1.2rem]">Six tools find the cause</h3>
              <p className="mt-2 text-ink/75">Turn Tax™, Flight Risk Score™, Honest Read™, Hire Smart™, Competitor Intel, and the Retention Dashboard.</p>
            </li>
            <li className="border border-ink/10 bg-white p-5">
              <h3 className="text-[1.2rem]">A monthly review, and our support</h3>
              <p className="mt-2 text-ink/75">We go through your results with you every month, and help you carry out the plan.</p>
            </li>
          </ol>
        </div>
      </section>

      <section id="what-you-get" className="scroll-mt-28 border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">Results in days, not quarters. And easy to start.</h2>
          <ol className="mt-8 space-y-5">
            {steps.map(([when, title, body], index) => (
              <li key={title} className="grid gap-2 border-t border-ink/10 pt-5 sm:grid-cols-[8rem_1fr]">
                <p className="display text-[0.85rem] tracking-[0.08em] uppercase">{index + 1}. {when}</p>
                <div>
                  <h3 className="text-[1.25rem]">{title}</h3>
                  <p className="mt-1 text-ink/75">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 border border-gold/40 bg-gold-pale/50 p-5">
            We still do both. Our side can be done in about 3 days. Your legal team sets the pace, and you will already have your numbers.
          </p>
        </div>
      </section>

      <section id="kit" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">The technology finds the cause. Our advisors tell you what to do.</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link href={tool.href} className="block border border-ink/10 bg-white p-5 hover:border-ink">
                  <p className="font-semibold">{tool.name}</p>
                  <p className="mt-1 text-ink/70">{tool.line}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-bg text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">Not a big firm. Not software. Not a survey.</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-[0.95rem]">
              <thead>
                <tr>
                  <th className="p-3" />
                  {columns.map((column) => (
                    <th key={column} className="p-3 font-semibold text-gold-bright">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]} className="border-t border-paper/15">
                    {row.map((cell, index) => (
                      <td key={index} className={`p-3 align-top ${index === 4 ? "text-paper" : "text-paper/75"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-12 text-[1.6rem]">Will I pay more with EIP?</h3>
          <p className="mt-3 max-w-3xl text-paper/80">
            Usually less. You will not find one product that does everything EIP does. You can buy the pieces: an analytics platform, an engagement survey, a consulting project. Bought one at a time, those pieces tend to cost more than EIP, and you still have to connect them yourself.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["The annual engagement survey", "Honest Read™ and the Retention Heartbeat. No score to game. Your people rank the fixes their coworkers named, a 60-second Heartbeat each month shows what got in the way, and we tell them what happens next."],
              ["A separate analytics platform", "Flight Risk Score™ and the Retention Dashboard. Built on your own data, with the Council telling you what it means instead of a dashboard to decode."],
              ["Recruiter seats and agency fees to refill the same seats", "Hire Smart™ and fewer departures. Every exit you prevent is a hire you never pay for."],
              ["Exit interviews that arrive after the resignation", "Retention Talks, before. Flight Risk Score™ tells you who to talk to in the next 90 days, while you can still change the outcome."],
            ].map(([title, body]) => (
              <article key={title} className="border border-paper/15 p-5">
                <p className="text-[0.85rem] text-paper/60">You may stop paying for</p>
                <h3 className="mt-2 text-[1.2rem]">{title}</h3>
                <p className="mt-2 text-paper/75">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/compare" className="text-gold-bright underline underline-offset-4">See the full comparison</Link>
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">Your data stays protected.</h2>
          <p className="mt-4 text-ink/80">
            No system access or integration is needed. Names are replaced with codes before analysis. Data is encrypted in transit and at rest, kept for the length of the engagement plus 90 days, then deleted. SOC 2 Type I is in progress, targeting Q1 2027. Healthcare engagements run under a Business Associate Agreement.
          </p>
          <p className="mt-5">
            <Link href="/security" className="font-semibold underline underline-offset-4">Data security details</Link>
          </p>
        </div>
      </section>
    </>
  );
}
