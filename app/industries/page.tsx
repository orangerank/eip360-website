import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { situations } from "@/content/site";

export const metadata: Metadata = {
  title: "Industries",
  description: "Three situations EIP is built for, and the industries where frontline turnover costs the most.",
};

const cards = [
  {
    id: "power-utility",
    title: "Power Utility",
    body: "Lineworkers and plant crews who cannot be replaced on demand.",
    links: [
      ["The Nuclear Operator Retention Playbook (open)", "/industry-playbooks/nuclear-operators"],
      ["The Public Utility Retention Playbook ($495)", "/industry-playbooks/public-utilities"],
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    body: "Hospital nurses and clinical teams, where one vacancy can stall an entire service line.",
    links: [["The Home Health Clinician Retention Playbook (open)", "/industry-playbooks/home-health-clinician"]],
  },
  {
    id: "warehouse-logistics",
    title: "Warehouse and logistics",
    body: "Warehouse teams and distribution centers, where our methodology was first built.",
    links: [["See the distribution center result", "/results"]],
  },
  {
    id: "contact-centers",
    title: "Contact centers",
    body: "Call center agents, where veterans carry the unwritten playbook.",
    links: [["The Contact Center Agent Retention Playbook (open)", "/industry-playbooks/contact-centers"]],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    body: "Plant and production crews, where know-how walks out the door when people resign.",
    links: [["The Manufacturing Retention Playbook ($495)", "/industry-playbooks/manufacturing"]],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-bg text-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6 lg:py-24">
          <h1 className="text-[clamp(2.3rem,5vw,4rem)]">Companies that cannot keep losing people.</h1>
          <p className="mt-5 text-[1.15rem] text-paper/80">Three situations we are built for, and the industries where we apply it.</p>
          <div className="mt-8">
            <BookButton>Book a 20-minute call</BookButton>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 md:grid-cols-3 lg:px-6">
          {situations.map((item, index) => (
            <article key={item.title} className="border border-ink/10 bg-white p-6">
              <p className="display text-[0.75rem] tracking-[0.12em] uppercase">{index + 1}</p>
              <h2 className="mt-3 text-[1.35rem]">{item.title}</h2>
              <p className="mt-3 text-ink/75">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-ink/10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 md:grid-cols-2 lg:px-6">
          {cards.map((card) => (
            <article key={card.id} id={card.id} className="scroll-mt-28 border border-ink/10 bg-white p-6">
              <h2 className="text-[1.6rem]">{card.title}</h2>
              <p className="mt-3 text-ink/75">{card.body}</p>
              <ul className="mt-4 space-y-2">
                {card.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="font-semibold underline underline-offset-4">{label}</Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article id="other" className="scroll-mt-28 border border-gold/50 bg-gold-pale/40 p-6">
            <h2 className="text-[1.6rem]">All other industries</h2>
            <p className="mt-3">If people leaving costs you, we can help. Tell us about your industry.</p>
            <div className="mt-5">
              <BookButton tone="on-light">Talk to us</BookButton>
            </div>
          </article>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-3xl px-4 pb-16 lg:px-6">
          <p>
            Also available: <Link className="underline underline-offset-4" href="/industry-playbooks/private-equity">The Portfolio Talent Retention Playbook</Link> (for private equity). <Link className="underline underline-offset-4" href="/industry-playbooks">See every playbook</Link>.
          </p>
          <p className="mt-4">
            Want a paywalled playbook, or a discount? Contact Tony. He can get you the playbook for your industry, and discounts are available. <Link className="underline underline-offset-4" href="/contact#book">Contact Tony</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
