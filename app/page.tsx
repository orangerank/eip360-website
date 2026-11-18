import Image from "next/image";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { HeroDemo } from "@/components/HeroDemo";
import { TurnTaxTeaser } from "@/components/TurnTaxTeaser";
import {
  attribution,
  bookStatus,
  company,
  heroMicro,
  homepageHeadline,
  proofTiles,
  situations,
  supportingQuestions,
  timeline,
  tools,
} from "@/content/site";
import { people } from "@/content/team";

const industries = [
  ["Power Utility", "/industries#power-utility"],
  ["Healthcare", "/industries#healthcare"],
  ["Warehouse and logistics", "/industries#warehouse-logistics"],
  ["Contact centers", "/industries#contact-centers"],
  ["Manufacturing", "/industries#manufacturing"],
  ["All other industries", "/industries#other"],
] as const;

export default function HomePage() {
  const faces = people.filter((person) => person.photo).slice(0, 8);

  return (
    <>
      <section className="bg-bg text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-6 lg:py-20">
          <div>
            <p className="display text-[0.75rem] tracking-[0.16em] text-gold-bright uppercase">
              For HR, people, and operations leaders
            </p>
            <h1 className="mt-5 text-[clamp(2.3rem,4.6vw,4.2rem)]">{homepageHeadline}</h1>
            <p className="mt-5 max-w-xl text-[1.08rem] text-paper/80">
              For US companies with large frontline workforces in power utility, healthcare, warehouse and logistics, contact centers, and manufacturing. EIP finds who is likely to leave in the next 90 days, prices the cost, and stays until the number moves.
            </p>
            <ul className="mt-6 space-y-1 text-paper/70">
              {supportingQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookButton>Book a 20-minute call</BookButton>
              <BookButton href="/turn-tax-calculator" variant="text">
                Calculate your Turn Tax
              </BookButton>
            </div>
            <p className="mt-5 max-w-lg text-[0.98rem] text-paper/70">{heroMicro}</p>
          </div>
          <HeroDemo />
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <h2 id="proof-heading" className="text-[clamp(2rem,4vw,3.2rem)]">
            We&apos;ve done this before. Here are the numbers.
          </h2>
          <p className="mt-4 max-w-3xl text-[1.05rem]">{attribution}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofTiles.map((tile) => (
              <article key={tile.big} className="border border-ink/10 bg-white p-6">
                <p className="display text-[clamp(1.8rem,3vw,2.5rem)]">{tile.big}</p>
                <p className="mt-3 font-semibold">{tile.label}</p>
                <p className="mt-1 text-[0.95rem] text-ink/70">{tile.scope}</p>
              </article>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/results" className="font-semibold underline underline-offset-4">
              See all nine results
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-ink/10" aria-labelledby="who-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <h2 id="who-heading" className="text-[clamp(2rem,4vw,3.2rem)]">
            Built for companies that cannot keep losing people.
          </h2>
          <p className="mt-4 max-w-2xl text-ink/75">
            Three situations we are built for, in the industries where frontline turnover costs the most.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {situations.map((item) => (
              <article key={item.title} className="border border-ink/10 bg-white p-6">
                <h3 className="text-[1.25rem]">{item.title}</h3>
                <p className="mt-3 text-[1.02rem] text-ink/80">{item.body}</p>
              </article>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            {industries.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="underline decoration-ink/30 underline-offset-4">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/industries" className="font-semibold underline underline-offset-4">
              See your industry
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-bg text-paper" aria-labelledby="problem-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <h2 id="problem-heading" className="max-w-3xl text-[clamp(2rem,4vw,3.2rem)]">
            Most companies find out what turnover costs after the resignation.
          </h2>
          <p className="mt-5 max-w-3xl text-paper/80">
            The cost of turnover is spread across recruiting, overtime, training, lost output and customer impact, so it never shows up in one place. Engagement surveys and HR scores arrive late, and they can be gamed. By the time someone resigns, it is too late to change the outcome.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <article className="border border-paper/15 p-6">
              <p className="display text-[2.2rem] text-gold-bright">$1 trillion</p>
              <p className="mt-2">lost every year to voluntary turnover (Gallup)</p>
            </article>
            <article className="border border-paper/15 p-6">
              <p className="display text-[2.2rem] text-gold-bright">52%</p>
              <p className="mt-2">of people who quit say it could have been prevented (Gallup)</p>
            </article>
          </div>
          <p className="mt-8">
            <Link href="/articles" className="text-gold-bright underline underline-offset-4">
              Read the research
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="approach-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <h2 id="approach-heading" className="text-[clamp(2rem,4vw,3.2rem)]">
            Advisory first. Technology backed.
          </h2>
          <p className="mt-3 text-[1.2rem]">Results in days, not quarters.</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {timeline.map((item) => (
              <li key={item.when} className="border-t-2 border-gold pt-4">
                <p className="display text-[1.6rem]">{item.when}</p>
                <p className="mt-2">{item.what}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl">
            One file. Seven standard data fields. Names coded before anyone looks. No surveys. No IT project.
          </p>
          <p className="mt-5">
            <Link href="/approach" className="font-semibold underline underline-offset-4">
              How an engagement works
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white" aria-labelledby="kit-heading">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <h2 id="kit-heading" className="text-[clamp(1.7rem,3vw,2.4rem)]">
            We don&apos;t sell you a tool. We solve your problem.
          </h2>
          <p className="mt-3 max-w-2xl text-ink/75">
            These are the tools our advisors use to find the cause. You get answers and a plan, not another dashboard to decode.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link href={tool.href} className="block border border-ink/10 p-5 hover:border-ink">
                  <p className="font-semibold">{tool.name}</p>
                  <p className="mt-1 text-[0.98rem] text-ink/70">{tool.line}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/approach#kit" className="font-semibold underline underline-offset-4">
              See how the kit fits the work
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-bg text-paper" aria-labelledby="people-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <h2 id="people-heading" className="text-[clamp(2rem,4vw,3.2rem)]">
            The people who will be in the room.
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center">
            <Image
              src="/assets/council-sm/brett-kiley.webp"
              alt="Brett Kiley, Founder and CEO of Experience Improvement Partners"
              width={320}
              height={320}
              className="h-auto w-full max-w-xs object-cover"
            />
            <div>
              <h3 className="text-[1.6rem]">Brett Kiley, Founder and CEO</h3>
              <p className="mt-3 max-w-2xl text-paper/80">
                20 years at a Fortune 10 company across retail, distribution, call centers, and executive teams.
              </p>
              <p className="mt-4 max-w-2xl text-paper/80">
                The EIP Council: current and former operators who review your data before anything is recommended. You get a whole team of advisors, not just one.
              </p>
            </div>
          </div>
          <ul className="mt-10 flex gap-3 overflow-x-auto pb-2">
            {faces.map((person) => (
              <li key={person.name} className="w-28 shrink-0">
                <Image
                  src={person.photo}
                  alt=""
                  width={160}
                  height={160}
                  className="aspect-square w-full object-cover"
                />
                <p className="mt-2 text-[0.85rem]">{person.name}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/team" className="text-gold-bright underline underline-offset-4">
              Meet the team
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="offer-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <h2 id="offer-heading" className="text-[clamp(2rem,4vw,3.2rem)]">
            Here is how it starts.
          </h2>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            <li className="border border-ink/10 bg-white p-6">
              <p className="display text-[0.75rem] tracking-[0.14em] uppercase">1</p>
              <h3 className="mt-3 text-[1.25rem]">Book a 20-minute call.</h3>
              <p className="mt-3 text-ink/75">Tell us where turnover hurts. We will tell you honestly whether we can help.</p>
            </li>
            <li className="border border-ink/10 bg-white p-6">
              <p className="display text-[0.75rem] tracking-[0.14em] uppercase">2</p>
              <h3 className="mt-3 text-[1.25rem]">If it is a fit, a Retention Snapshot.</h3>
              <p className="mt-3 text-ink/75">
                By invitation: one spreadsheet, seven standard data fields, your first Flight Risk Score™ and Turn Tax™ in about 7 days. No contract.
              </p>
            </li>
            <li className="border border-ink/10 bg-white p-6">
              <p className="display text-[0.75rem] tracking-[0.14em] uppercase">3</p>
              <h3 className="mt-3 text-[1.25rem]">Then the work.</h3>
              <p className="mt-3 text-ink/75">
                A 30-day diagnostic and Council review with a plan and dollars attached, a 90-day quick start, and monthly advisory until the number moves.
              </p>
            </li>
          </ol>
          <div className="mt-8">
            <BookButton tone="on-light">Book a 20-minute call</BookButton>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white" aria-labelledby="magnet-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <h2 id="magnet-heading" className="text-[clamp(2rem,4vw,3rem)]">
            See how much you are losing each year.
          </h2>
          <div className="mt-8">
            <TurnTaxTeaser />
          </div>
          <article className="mt-6 border border-ink/10 p-6 sm:p-8">
            <h3 className="text-[1.4rem]">How well is your company built to keep its people?</h3>
            <p className="mt-3 max-w-2xl text-ink/75">
              24 questions, about 5 minutes. A score out of 100, how you stand in four areas, and your three next best actions.
            </p>
            <p className="mt-5">
              <Link href="/retention-checkup" className="inline-flex min-h-11 items-center border border-ink px-4 font-semibold">
                Take the Retention Checkup
              </Link>
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="insights-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <h2 id="insights-heading" className="text-[clamp(2rem,4vw,3.2rem)]">
            We wrote the book on it.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="border border-ink/10 bg-white p-6">
              <Image
                src="/assets/brand/retention-advantage-cover.webp"
                alt="Cover of The Retention Advantage by Brett Kiley"
                width={320}
                height={480}
                className="h-auto w-40"
              />
              <h3 className="mt-4 text-[1.3rem]">The Retention Advantage, by Brett Kiley</h3>
              <p className="mt-3 text-ink/75">{bookStatus}</p>
              <p className="mt-4">
                <Link href="/white-papers" className="font-semibold underline underline-offset-4">
                  Read the book
                </Link>
              </p>
            </article>
            <article className="border border-ink/10 bg-white p-6">
              <h3 className="text-[1.3rem]">The Contact Center Agent Retention Playbook</h3>
              <p className="mt-3 text-ink/75">
                How to stop rehiring your frontline every year, in-house or outsourced.
              </p>
              <p className="mt-4">
                <Link href="/industry-playbooks/contact-centers" className="font-semibold underline underline-offset-4">
                  Read the playbook
                </Link>
              </p>
            </article>
            <article className="border border-ink/10 bg-white p-6">
              <h3 className="text-[1.3rem]">Podcast: I Don&apos;t Care</h3>
              <p className="mt-3 text-ink/75">
                With Dr. Kevin Stevenson, MarketScale. &quot;Smarter, Faster, Kinder: How AI Can Help Hospitals Deliver Better Care&quot; (October 20, 2025).
              </p>
              <p className="mt-4">
                <Link href="/media" className="font-semibold underline underline-offset-4">
                  See media
                </Link>
              </p>
            </article>
          </div>
          <p className="mt-6 text-[0.9rem] text-ink/55">{company.tagline}</p>
        </div>
      </section>
    </>
  );
}
