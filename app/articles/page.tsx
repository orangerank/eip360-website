import type { Metadata } from "next";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Articles worth reading",
  description: "Twelve sourced findings on turnover, summarized in EIP's words, each linked to the original.",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">Articles worth reading</h1>
      <p className="mt-4 text-[1.08rem] text-ink/75">
        What other people found about turnover. 12 real sources, each with what it says in our words and a link to the original. Titles are exactly as the publishers wrote them.
      </p>
      <div className="mt-10 space-y-8">
        {articles.map((article) => (
          <article key={article.title + article.figure} className="border-t border-ink/10 pt-6">
            <p className="text-[0.9rem] text-ink/60">{article.source}</p>
            <p className="display mt-2 text-[1.8rem]">{article.figure}</p>
            <p>{article.line}</p>
            <h2 className="mt-3 text-[1.25rem]">{article.title}</h2>
            <p className="text-[0.95rem] text-ink/60">{article.source}, {article.date}</p>
            <p className="mt-3 text-ink/80">{article.summary}</p>
            <p className="mt-3">
              <a href={article.href} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
                Read the original
              </a>
            </p>
          </article>
        ))}
      </div>
      <p className="mt-10 text-[0.95rem] text-ink/65">
        Figures are as each source reports them. We summarize in our own words and link to the original so you can read it yourself.
      </p>
    </div>
  );
}
