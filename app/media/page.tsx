import type { Metadata } from "next";
import Image from "next/image";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Where you have seen us",
  description: "Podcasts, webinars and events with Brett Kiley, founder of EIP.",
};

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)]">Where you have seen us</h1>
      <p className="mt-4 text-[1.08rem] text-ink/75">
        Podcasts, webinars and events. Conversations with Brett Kiley, founder of EIP, about customer experience, healthcare and keeping good people. Each one links to the original.
      </p>
      <div className="mt-10 space-y-6">
        {media.map((item) => (
          <article key={item.title} className="grid gap-4 border border-ink/10 bg-white p-5 sm:grid-cols-[120px_1fr]">
            <Image src={item.image} alt="" width={160} height={160} className="h-24 w-24 object-contain" />
            <div>
              <p className="text-[0.85rem] text-ink/55">{item.kind}</p>
              <h2 className="text-[1.3rem]">{item.show}</h2>
              <p className="mt-1">{item.title}</p>
              <p className="mt-1 text-[0.95rem] text-ink/60">
                {item.date}
                {"place" in item && item.place ? `, ${item.place}` : ""}
              </p>
              <p className="mt-3 flex flex-wrap gap-4">
                {item.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    {link.label}
                  </a>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 text-[0.95rem] text-ink/60">Show names and logos belong to their owners. Links open the show&apos;s own page.</p>
    </div>
  );
}
