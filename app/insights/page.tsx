import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookStatus } from "@/content/site";

export const metadata: Metadata = {
  title: "Insights",
  description: "The Retention Advantage, industry playbooks, research, and where you have seen EIP.",
};

const cards = [
  {
    title: "Industry playbooks",
    body: "A retention playbook for your industry: the numbers, why people really leave, what it costs, and what to do in your first 90 days.",
    href: "/industry-playbooks",
    label: "See the playbooks",
  },
  {
    title: "Research",
    body: "Articles worth reading: what others found about turnover.",
    href: "/articles",
    label: "Read the articles",
  },
  {
    title: "Media",
    body: "Where you have seen us: podcasts, webinars and events.",
    href: "/media",
    label: "See appearances",
  },
  {
    title: "Retention Checkup",
    body: "How well is your company built to keep its people? 24 questions, about 5 minutes.",
    href: "/retention-checkup",
    label: "Take the checkup",
  },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.3rem,5vw,4rem)]">Read what we know.</h1>
      <p className="mt-4 max-w-2xl text-[1.12rem] text-ink/75">The book, the playbooks, the research, and where you have seen us.</p>
      <article className="mt-10 grid items-center gap-6 border border-ink/10 bg-white p-6 md:grid-cols-[200px_1fr]">
        <Image src="/assets/brand/retention-advantage-cover.webp" alt="Cover of The Retention Advantage" width={280} height={420} className="h-auto w-44" />
        <div>
          <p className="display text-[0.72rem] tracking-[0.14em] uppercase">The book</p>
          <h2 className="mt-2 text-[2rem]">The Retention Advantage, by Brett Kiley</h2>
          <p className="mt-3 text-ink/75">{bookStatus}</p>
          <p className="mt-4">
            <Link href="/white-papers" className="font-semibold underline underline-offset-4">Read the book</Link>
          </p>
        </div>
      </article>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <article key={card.href} className="border border-ink/10 bg-white p-6">
            <h2 className="text-[1.4rem]">{card.title}</h2>
            <p className="mt-3 text-ink/75">{card.body}</p>
            <p className="mt-4">
              <Link href={card.href} className="font-semibold underline underline-offset-4">{card.label}</Link>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
