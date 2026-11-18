import type { Metadata } from "next";
import Link from "next/link";
import { playbookCatalog } from "@/content/playbooks";

export const metadata: Metadata = {
  title: "Industry playbooks",
  description: "Retention playbooks by industry. Open titles can be read here. Paywalled titles are available through Tony.",
};

export default function PlaybooksPage() {
  const open = playbookCatalog.filter((item) => item.status === "open");
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,5vw,3.8rem)]">A retention playbook for your industry.</h1>
      <p className="mt-4 max-w-2xl text-[1.08rem] text-ink/75">
        One playbook per industry: the numbers, why people really leave, what it costs, and what to do in your first 90 days. {open.length} are open to read in full.
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {playbookCatalog.map((item) => (
          <li key={item.slug} className="border border-ink/10 bg-white p-6">
            <p className="display text-[0.72rem] tracking-[0.12em] uppercase">{item.status === "open" ? "Open to read" : item.price}</p>
            <h2 className="mt-2 text-[1.35rem]">{item.name}</h2>
            <p className="mt-2 text-ink/75">{item.blurb}</p>
            <p className="mt-4">
              <Link href={`/industry-playbooks/${item.slug}`} className="font-semibold underline underline-offset-4">
                {item.status === "open" ? "Read it" : "See what is inside"}
              </Link>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-2xl">
        Want a paywalled playbook, or a discount? Contact Tony. He can get you the playbook for your industry, and discounts are available.{" "}
        <Link href="/contact#book" className="underline underline-offset-4">Contact Tony</Link>.
      </p>
    </div>
  );
}
