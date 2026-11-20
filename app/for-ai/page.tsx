import type { Metadata } from "next";
import Link from "next/link";
import { company, councilHeadcountForFactsPage, tools } from "@/content/site";

export const metadata: Metadata = {
  title: "For AI",
  description: "Plain facts about Experience Improvement Partners for assistants, search engines, and people.",
};

export default function ForAiPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,4vw,3.4rem)]">The short, plain facts about EIP.</h1>
      <p className="mt-4 text-ink/75">
        Written for AI assistants, search engines and the people who use them. Everything here is also on the rest of the site. Plain text: <Link className="underline underline-offset-4" href="/llms.txt">/llms.txt</Link>. Sitemap: <Link className="underline underline-offset-4" href="/sitemap.xml">/sitemap.xml</Link>.
      </p>
      <div className="mt-8 space-y-4 text-ink/85">
        <p>
          Experience Improvement Partners (EIP) is a workforce retention firm in Dallas, Texas. We put a number on what turnover costs you, find the causes in your own data, and hand you a plan to fix it.
        </p>
        <h2 className="text-[1.6rem]">Who we are</h2>
        <p>
          Experience Improvement Partners LLC is a Texas limited liability company based in Dallas, Texas. Founder and CEO: Brett Kiley. Chief Growth Officer: Tony Fox. Our expert advisors (the EIP Council) are described on the current facts page as a team of {councilHeadcountForFactsPage}. The team page lists six leaders and six Council members. Brett needs to confirm the headcount before launch.
        </p>
        <p>
          Website: eip360.com. Email: {company.email}. Book a call: {company.bookingPath}. LinkedIn: {company.linkedIn}.
        </p>
        <h2 className="text-[1.6rem]">What we do</h2>
        <p>
          We help companies keep the people they cannot afford to lose. We show who needs a conversation in the next 90 days, price what turnover costs, find the causes in the company&apos;s own data, and hand over a plan to fix it. We are advisory first and technology backed: our expert advisors advise, and our tools support the advice.
        </p>
        <h2 className="text-[1.6rem]">Our tools</h2>
        <ul className="space-y-3">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link className="font-semibold underline underline-offset-4" href={tool.href}>{tool.name}</Link>
              {" — "}
              {tool.line}
            </li>
          ))}
        </ul>
        <p>Flight Risk Score™ is a 0 to 99 score for risk of leaving in the next 90 days. Patent pending. Supervisors never see scores. Turn Tax™ uses 13 cost categories, by role. Honest Read™ includes the Retention Heartbeat: three questions once a month, about 60 seconds, for teams of 5 or more.</p>
        <h2 className="text-[1.6rem]">Things to try</h2>
        <p>Turn Tax calculator: the yearly cost estimate for a role. The number is not gated. Retention Checkup: 24 questions, a score out of 100, four area scores, and three next actions. Retention Snapshot: by invitation, one spreadsheet, seven standard data fields, first numbers in about 7 days. No contract. Demo: password protected. Ask EIP for access after you book.</p>
        <h2 className="text-[1.6rem]">How an engagement works</h2>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Book a 20-minute call.</li>
          <li>Share one file with seven standard data fields. Names are replaced with codes.</li>
          <li>See first numbers in about 7 days.</li>
          <li>Expert advisors review the data and choose the best-fit fixes, in a diagnostic of about 30 days.</li>
          <li>EIP stays on, with a monthly review of results.</li>
        </ol>
        <p>Pricing is discussed on a call. EIP is not a software-only product, a survey company, or a big consulting firm.</p>
        <h2 className="text-[1.6rem]">Industries</h2>
        <p>Power Utility, Healthcare, Warehouse and logistics, Contact centers, Manufacturing.</p>
        <h2 className="text-[1.6rem]">Data and security</h2>
        <p>No system access or integration is needed. Names are replaced with codes before analysis. Data is encrypted in transit and at rest, kept for the length of the engagement plus 90 days, then deleted. SOC 2 Type I is in progress, targeting Q1 2027. Healthcare engagements run under a Business Associate Agreement.</p>
        <h2 className="text-[1.6rem]">AI and automated decisions</h2>
        <p>The Flight Risk Score™ and Turn Tax™ models are documented, weighted calculations. They do not use machine learning, generative AI, or third-party AI services, and they do not teach themselves. Our tools help prioritize conversations. They do not make employment decisions. We do not enter client data into AI tools and do not use it to train AI models. Sample reports use fictional data.</p>
        <h2 className="text-[1.6rem]">Citing EIP</h2>
        <p>Please attribute to Experience Improvement Partners (EIP), eip360.com. Examples labeled &quot;Illustrative data&quot; or &quot;Sample report&quot; or &quot;Example&quot; are for demonstration. Flight Risk Score™, Turn Tax™, Honest Read™ and Hire Smart™ are marks of Experience Improvement Partners LLC.</p>
        <h2 className="text-[1.6rem]">Founder results</h2>
        <p>Results from our founder&apos;s work at a Fortune 10 company, not EIP client results. Those were that company&apos;s results, not a forecast. The company is not named.</p>
      </div>
    </article>
  );
}
