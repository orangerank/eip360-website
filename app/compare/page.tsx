import type { Metadata } from "next";
import { BookButton } from "@/components/BookButton";

export const metadata: Metadata = {
  title: "How EIP compares",
  description: "An honest side by side of EIP, big consulting firms, survey platforms, people analytics, HR system add-ons, and retention research firms.",
};

const headers = ["What matters", "EIP", "Big consulting firm", "Engagement survey platform", "People analytics software", "HR system add-on", "Retention research firm"];

const rows = [
  ["Puts a dollar cost on turnover, role by role", "Turn Tax™: 13 cost categories, priced by role", "Inside a larger paid project", "Scores how people feel, not what it costs", "Usually one cost number for everyone", "Rarely", "Estimates from exit studies"],
  ["Names who is likely to leave next", "Flight Risk Score™ for each person, tuned to your company", "Rarely at the person level", "Mostly group hotspots, not people", "A risk list to work through", "One general model for all of that vendor's customers", "Studies people after they have left"],
  ["Works without another employee survey", "Built from data you already have", "Interviews and workshops instead", "Only as good as the response rate", "Some risk factors depend on survey scores", "Uses what is in the system", "Interviews are the product"],
  ["Tells each manager what to say, and to whom", "Top reasons and a talk track for every person flagged", "Recommendations in a final report", "Generic action plan libraries", "Factor tags and a playbook to read", "A list, then you decide", "Themes and advice"],
  ["Hears what would keep the people who stay", "Honest Read™: small-group talks, fixes ranked by your own people", "Focus groups, at extra cost", "Scores and comments, averaged", "Survey add-on", "Not its job", "Their specialty"],
  ["Shows which employers are hiring your people", "Competitor Intel, done for you", "Pay surveys", "No", "No", "No", "From what former employees say"],
  ["Changes hiring so new people stay", "Hire Smart™, built from what your longest-tenured people have in common", "A separate engagement", "No", "No", "No", "Onboarding advice"],
  ["Senior experts stay through execution", "The EIP Council, a 90-day quick start, then a monthly review", "Partners sell it, junior teams deliver, the project ends", "Customer success, not advisors", "Software support", "Software support", "Until the report is delivered"],
  ["First result you can act on", "About 7 days, with the Retention Snapshot", "Months, after the contract", "After the next survey cycle", "After the integration is built", "Already in your system", "After the interview cycle"],
  ["What it asks of your team", "One file. Names become codes before anyone looks", "Interviews, workshops and data requests", "Running the survey and acting on it", "An integration, and someone to run it", "Nothing new", "Lists and scheduling"],
];

const stronger = [
  ["Software your team logs into any time", "Our Retention Dashboard is updated twice a month and reviewed with you. If you want a full self-serve platform, keep yours."],
  ["Benchmarks across thousands of companies", "We compare you with yourself, and with the employers hiring your people. That is what you can act on."],
  ["Company-wide surveys in many languages", "We use small-group talks instead of another survey. If you already run a survey, keep it."],
  ["A broad HR suite", "Not our job, and you already have one. We are the retention arm that makes it pay off."],
  ["A long track record under a big brand name", "EIP is a young company. Our methods come from 20 years of fixing turnover at a Fortune 10 company, and our Council brings decades of industry experience."],
];

const faqs = [
  ["Our new system already provides most of this.", "That is good news: you already have the data, and we can start from it. Most systems can show who might leave. What they cannot do is put a dollar cost on each departure, tell each manager what to say this week, and stay with you until turnover comes down."],
  ["We do not want to imply interest in another platform.", "EIP is not a platform, and meeting us commits you to nothing. We ask what you already have, show where it stops, and you decide whether that gap matters."],
  ["We already run an engagement survey.", "Keep it. A survey tells you how people feel on average. We tell you who is about to leave, what it will cost, and what to do about it, without asking anyone to fill in another form."],
  ["We already work with a consulting firm.", "Then you know the pattern: a strong report, then the team moves on. Our tools do the analysis in days, and our expert advisors stay through execution and results."],
  ["Our turnover is under control.", "It often is, on average. The cost usually hides in a few sites, managers or roles. Turn Tax™ shows where, in dollars, and the Retention Snapshot puts a number on it before you sign anything."],
  ["We do not have budget for this right now.", "Turnover is already in your budget. It just is not labeled. Turn Tax™ shows the line that is missing."],
];

export default function ComparePage() {
  return (
    <>
      <section className="bg-bg text-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <h1 className="text-[clamp(2.2rem,5vw,3.8rem)]">Others hand you a report. We stay until the number moves.</h1>
          <p className="mt-5 text-[1.08rem] text-paper/80">
            Two kinds of companies sell retention help: big consulting firms and dashboard software. Both stop at the report. Here is an honest side by side, including where others are stronger.
          </p>
          <div className="mt-8">
            <BookButton>Book a 20-minute call</BookButton>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-12 lg:px-6">
          <table className="w-full min-w-[980px] border-collapse text-left text-[0.92rem]">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} className="border-b border-ink/15 p-3 align-bottom font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-ink/10">
                  {row.map((cell, index) => (
                    <td key={index} className={`p-3 align-top ${index === 1 ? "bg-gold-pale/40 font-medium" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
          <h2 className="text-[2rem]">Where others are stronger, and how we handle it.</h2>
          <ul className="mt-6 space-y-5">
            {stronger.map(([title, body]) => (
              <li key={title}>
                <h3 className="text-[1.15rem]">{title}</h3>
                <p className="mt-1 text-ink/75">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
          <h2 className="text-[2rem]">Questions we hear</h2>
          <div className="mt-6 space-y-6">
            {faqs.map(([q, a]) => (
              <article key={q}>
                <h3 className="text-[1.15rem]">&quot;{q}&quot;</h3>
                <p className="mt-2 text-ink/80">{a}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl">
            We help you use what you already have, add what is missing, and then stay with you as the retention arm of your company, through execution and results.
          </p>
        </div>
      </section>
    </>
  );
}
