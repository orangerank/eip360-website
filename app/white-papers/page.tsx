import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import book from "@/content/book.json";
import { bookStatus } from "@/content/site";

export const metadata: Metadata = {
  title: "The Retention Advantage",
  description: "The Retention Advantage by Brett Kiley. Read it here, one chapter at a time. Print edition expected Summer 2027.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6">
      <div className="grid items-start gap-8 md:grid-cols-[220px_1fr]">
        <Image
          src="/assets/brand/retention-advantage-cover.webp"
          alt="Cover of The Retention Advantage by Brett Kiley"
          width={320}
          height={480}
          className="h-auto w-full max-w-[220px]"
        />
        <div>
          <h1 className="text-[clamp(2.1rem,4vw,3.4rem)]">The Retention Advantage</h1>
          <p className="mt-3 text-[1.1rem]">By Brett Kiley, Founder and CEO, Experience Improvement Partners.</p>
          <p className="mt-3 text-ink/75">{bookStatus}</p>
        </div>
      </div>
      <ol className="mt-12 space-y-3">
        {book.map((chapter) => (
          <li key={chapter.slug} className="border-t border-ink/10 pt-3">
            <Link href={`/white-papers/${chapter.slug}`} className="group grid gap-1 sm:grid-cols-[8rem_1fr]">
              <span className="text-[0.9rem] text-ink/55">{chapter.label}</span>
              <span>
                <span className="font-semibold group-hover:underline">{chapter.title}</span>
                {chapter.subtitle ? <span className="mt-1 block text-[0.95rem] text-ink/70">{chapter.subtitle}</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
