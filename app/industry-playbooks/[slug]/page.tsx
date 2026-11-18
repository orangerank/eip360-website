import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import openPlaybooks from "@/content/playbooks-open.json";
import { playbookCatalog } from "@/content/playbooks";
import { Blocks, type Block } from "@/components/Blocks";

export function generateStaticParams() {
  return playbookCatalog.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const card = playbookCatalog.find((item) => item.slug === slug);
    return { title: card?.name ?? "Playbook", description: card?.blurb };
  });
}

export default async function PlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = playbookCatalog.find((item) => item.slug === slug);
  if (!card) notFound();
  const full = openPlaybooks.find((item) => item.slug === slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="text-[0.9rem]">
        <Link href="/industry-playbooks" className="underline underline-offset-4">Playbooks</Link>
      </p>
      <p className="mt-4 display text-[0.72rem] tracking-[0.14em] uppercase">Industry playbook</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,3.2rem)]">{card.name}</h1>
      <p className="mt-3 text-[1.08rem] text-ink/75">{card.blurb}</p>
      {card.status === "paid" ? (
        <div className="mt-8 border border-gold/50 bg-gold-pale/40 p-6">
          <p className="display text-[1.4rem]">{card.price}</p>
          <p className="mt-3">
            Paywalled. Contact Tony to get this playbook or to ask for a discount.
          </p>
          <p className="mt-4">
            <Link href="/contact#book" className="font-semibold underline underline-offset-4">Contact Tony</Link>
          </p>
        </div>
      ) : null}
      {full ? (
        <div className="mt-8">
          {full.audience ? <p className="text-ink/75">{full.audience}</p> : null}
          {full.byline ? <p className="mt-2 text-[0.95rem] text-ink/60">{full.byline}</p> : null}
          <div className="mt-6">
            <Blocks blocks={full.blocks as Block[]} />
          </div>
        </div>
      ) : null}
    </article>
  );
}
