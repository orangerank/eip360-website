import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import book from "@/content/book.json";
import { Blocks, type Block } from "@/components/Blocks";

type Chapter = (typeof book)[number];

export function generateStaticParams() {
  return book.map((chapter) => ({ slug: chapter.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const chapter = book.find((item) => item.slug === slug);
    return { title: chapter ? chapter.title : "The Retention Advantage" };
  });
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = book.findIndex((item) => item.slug === slug);
  const chapter = book[index] as Chapter | undefined;
  if (!chapter) notFound();
  const prev = book[index - 1];
  const next = book[index + 1];

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="text-[0.9rem] text-ink/60">
        <Link href="/white-papers" className="underline underline-offset-4">The Retention Advantage</Link>
        {" · "}
        {chapter.label}
      </p>
      <h1 className="mt-4 text-[clamp(2rem,4vw,3.2rem)]">{chapter.title}</h1>
      {chapter.subtitle ? <p className="mt-3 text-[1.1rem] text-ink/75">{chapter.subtitle}</p> : null}
      <div className="mt-8">
        <Blocks blocks={chapter.blocks as Block[]} />
      </div>
      <nav className="mt-12 flex flex-wrap justify-between gap-4 border-t border-ink/10 pt-6 text-[0.98rem]">
        {prev ? <Link className="underline underline-offset-4" href={`/white-papers/${prev.slug}`}>Previous: {prev.title}</Link> : <span />}
        {next ? <Link className="underline underline-offset-4" href={`/white-papers/${next.slug}`}>Next: {next.title}</Link> : <span />}
      </nav>
    </article>
  );
}
