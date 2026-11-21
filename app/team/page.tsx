import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { brettLinkedIn } from "@/content/site";
import { founderBio, people } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Brett Kiley and the EIP Council. Operators who review your data before anything is recommended.",
};

const steps = [
  ["Your data", "One spreadsheet you already keep, coded so names stay private."],
  ["The tools find the cause", "Flight Risk Score™, Turn Tax™, Honest Read™, Hire Smart™ and the Retention Dashboard, built on your numbers."],
  ["Expert advisors decide", "Operators review the same data and choose the best-fit solutions before anything is recommended."],
  ["A person walks you through it", "A monthly review with our team, and our advisors beside you through implementation."],
];

export default function TeamPage() {
  const leaders = people.filter((person) => person.group === "Leadership");
  const council = people.filter((person) => person.group === "Council");

  return (
    <>
      <section className="bg-bg text-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <h1 className="text-[clamp(2.3rem,5vw,4rem)]">A team of operators who have solved this before.</h1>
          <p className="mt-5 text-[1.12rem] text-paper/80">
            Our expert advisors review every signed client&apos;s data and prioritize the best-fit solutions before anything is recommended. You get a whole team of advisors, not just one.
          </p>
          <div className="mt-8">
            <BookButton>Book a 20-minute call</BookButton>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 lg:grid-cols-[320px_1fr] lg:px-6">
          <Image
            src="/assets/council-sm/brett-kiley.webp"
            alt="Brett Kiley, Founder and CEO"
            width={480}
            height={480}
            className="h-auto w-full max-w-sm object-cover"
          />
          <div>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)]">Brett Kiley, Founder and CEO</h2>
            {founderBio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 text-ink/80">{paragraph}</p>
            ))}
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              <Link className="underline underline-offset-4" href="/white-papers">Read the book</Link>
              <Link className="underline underline-offset-4" href="/results">See the results</Link>
              {brettLinkedIn ? (
                <a className="underline underline-offset-4" href={brettLinkedIn}>Brett on LinkedIn</a>
              ) : (
                <span className="text-ink/70">Brett on LinkedIn: profile URL pending from Brett.</span>
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="text-[2rem]">Leadership</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((person) => (
              <li key={person.name} className="border border-ink/10 p-5">
                <Image src={person.photo} alt="" width={240} height={240} className="aspect-square w-full max-w-[180px] object-cover" />
                <h3 className="mt-4 text-[1.25rem]">{person.name}</h3>
                <p className="text-[0.95rem] text-ink/60">{person.role}</p>
                <p className="mt-2">{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(2rem,4vw,3rem)]">Meet the people who review your data.</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {council.map((person) => (
              <li key={person.name} className="border border-ink/10 bg-white p-5">
                <Image src={person.photo} alt="" width={240} height={240} className="aspect-square w-full max-w-[180px] object-cover" />
                <h3 className="mt-4 text-[1.25rem]">{person.name}</h3>
                <p className="text-[0.95rem] text-ink/60">{person.role}</p>
                <p className="mt-2">{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-bg text-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">The technology finds the cause. Our advisors tell you what to do.</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {steps.map(([title, body], index) => (
              <li key={title} className="border border-paper/15 p-5">
                <p className="display text-[0.75rem] tracking-[0.12em] text-gold-bright uppercase">Step {index + 1}</p>
                <h3 className="mt-2 text-[1.2rem]">{title}</h3>
                <p className="mt-2 text-paper/75">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-[1.3rem]">The usual way</h3>
              <ul className="mt-3 space-y-2 text-paper/75">
                <li>A partner sells the work, then hands it to junior staff</li>
                <li>One advisor, one point of view</li>
                <li>A dashboard handed over for you to interpret</li>
                <li>The bill grows with every added hour</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[1.3rem]">With our expert advisors</h3>
              <ul className="mt-3 space-y-2 text-paper/85">
                <li>The people who solved this before work on your problem</li>
                <li>A whole team of advisors, many perspectives, reviews your data</li>
                <li>Our advisors turn the numbers into what to do, and walk you through it</li>
                <li>Most of what it recommends costs nothing extra. We earn when your turnover goes down</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
