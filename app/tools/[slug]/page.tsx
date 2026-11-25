import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toolPages } from "@/content/tools";

export function generateStaticParams() {
  return toolPages.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const tool = toolPages.find((item) => item.slug === slug);
    return { title: tool?.title ?? "Tool", description: tool?.lede };
  });
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolPages.find((item) => item.slug === slug);
  if (!tool) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <p className="display text-[0.75rem] tracking-[0.14em] uppercase">Case file / {tool.kicker}</p>
      <h1 className="mt-3 text-[clamp(2.1rem,4vw,3.4rem)]">{tool.title}</h1>
      <p className="mt-4 text-[1.35rem]">{tool.headline}</p>
      <p className="mt-4 text-ink/80">{tool.lede}</p>
      <h2 className="mt-10 text-[1.6rem]">How to read this</h2>
      <ol className="mt-4 space-y-4">
        {tool.read.map(([title, body], index) => (
          <li key={title}>
            <p className="font-semibold">{index + 1}. {title}</p>
            <p className="text-ink/75">{body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 border border-ink/10 bg-white p-5 text-ink/80">{tool.example}</p>
      <p className="mt-8">
        <Link href="/approach#kit" className="font-semibold underline underline-offset-4">Back to the kit</Link>
      </p>
    </div>
  );
}
