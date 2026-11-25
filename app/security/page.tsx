import type { Metadata } from "next";
import { BookButton } from "@/components/BookButton";

export const metadata: Metadata = {
  title: "Data security",
  description: "No system access. Names become codes before analysis. Data is deleted on a schedule you know.",
};

const steps = [
  ["You choose what to share", "A spreadsheet of what you already track. No system access, no integration, no IT project."],
  ["Names become codes", "No names, Social Security numbers, or addresses are needed. The score runs on coded employee records."],
  ["Encrypted upload", "Your file goes through our secure portal. TLS 1.2 or higher in transit."],
  ["Blind analysis", "The analysis runs on coded data. Our expert advisors see coded data only, and everyone is under a nondisclosure agreement."],
  ["Deleted on schedule", "Kept for the length of the engagement plus 90 days, then deleted automatically or sooner on request."],
];

const facts = [
  ["Encryption", "TLS 1.2+ and AES-256", "In transit and at rest."],
  ["Secure upload", "No API needed", "A spreadsheet through our secure portal."],
  ["Retention", "Engagement plus 90 days", "Then deleted automatically, or on request."],
  ["No PII required", "Coded records", "You control what we see."],
  ["Healthcare", "Business Associate Agreement", "Protected health information limited to what the model requires."],
  ["SOC 2 Type I", "In progress", "Targeting Q1 2027."],
];

const faqs = [
  ["Do you need access to our HR system?", "No. You share what you are comfortable sharing, usually a spreadsheet of what you already track. We tell you what is useful, you decide what to send. No system access, no integration, no IT project. Your data is encrypted in transit and at rest, and deleted 90 days after the engagement ends. For healthcare clients, we work under a Business Associate Agreement."],
  ["How secure is the data?", "You stay in control of what you share. For a pilot, you can send anonymized information with no names or IDs, and results come back by group. In a full engagement, your information is split so our analysis runs without names attached. Only three members of the EIP team can see the link between a code and a person, all under NDA. We do not share client information with third parties, and we delete everything 90 days after the engagement ends. SOC 2 Type I is in progress, targeting Q1 2027."],
  ["How long do you keep our data?", "We keep data for the length of the engagement plus 90 days, then delete it automatically or on request."],
  ["Is EIP SOC 2 certified?", "SOC 2 Type I is in progress, with a target of Q1 2027."],
  ["Does EIP use AI to score employees?", "No. The Flight Risk Score™ and Turn Tax™ models are documented, weighted calculations built and maintained by our team. They do not use machine learning, generative AI, or third-party AI services, and they do not teach themselves. It starts from the same 19 base variables, and our team weights it for each company and adds variables where that company needs them. Our tools help prioritize conversations and never make employment decisions."],
  ["How does EIP handle healthcare data?", "For healthcare engagements, we work under a Business Associate Agreement and limit protected health information to what the diagnostic model requires."],
];

export default function SecurityPage() {
  return (
    <>
      <section className="bg-bg text-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <h1 className="text-[clamp(2.2rem,5vw,3.8rem)]">Your data stays yours.</h1>
          <p className="mt-5 text-[1.08rem] text-paper/80">
            No system access. No integration. Names are replaced with codes before anyone analyzes anything, and everything is deleted on a schedule you know.
          </p>
          <div className="mt-8"><BookButton>Book a 20-minute call</BookButton></div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
          <h2 className="text-[2rem]">From your spreadsheet to deleted, in five steps.</h2>
          <ol className="mt-6 space-y-4">
            {steps.map(([title, body], index) => (
              <li key={title} className="border-t border-ink/10 pt-4">
                <p className="font-semibold">{index + 1}. {title}</p>
                <p className="text-ink/75">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {facts.map(([title, value, body]) => (
            <article key={title} className="border border-ink/10 p-5">
              <h3 className="text-[1.1rem]">{title}</h3>
              <p className="mt-2 font-semibold">{value}</p>
              <p className="mt-1 text-ink/70">{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
          <h2 className="text-[2rem]">Who can see what</h2>
          <ul className="mt-4 space-y-2 text-ink/80">
            <li>Expert advisors: coded data only.</li>
            <li>A small number of named EIP team members: the link between a code and a person, under a nondisclosure agreement.</li>
            <li>Supervisors at your company: who to talk to and what to say, never scores.</li>
            <li>Third parties: nothing. We do not share client information.</li>
          </ul>
          <h2 className="mt-10 text-[2rem]">People decide. Our scoring is not AI.</h2>
          <p className="mt-3 text-ink/80">
            The Flight Risk Score™ and Turn Tax™ models are built and maintained by our team as documented, weighted calculations. They do not use machine learning, generative AI, or third-party AI services, and they do not teach themselves. It starts from the same 19 base variables, and our team weights it for each company and adds variables where that company needs them. It gets more accurate as more data points are added.
          </p>
          <p className="mt-3 text-ink/80">
            Our tools help prioritize conversations. They do not make employment decisions. Clients make every decision about their people, and a score should never be the sole basis for any employment decision about an individual. We do not enter client data into AI tools and do not use it to train AI models. We use AI tools to help write software and to prepare marketing material and sample reports. Sample reports use fictional data.
          </p>
          <div className="mt-10 space-y-6">
            {faqs.map(([q, a]) => (
              <article key={q}>
                <h3 className="text-[1.15rem]">{q}</h3>
                <p className="mt-2 text-ink/80">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
