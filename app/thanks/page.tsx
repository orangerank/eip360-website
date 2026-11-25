import type { Metadata } from "next";
import Link from "next/link";
import { CONFIRMATION_MESSAGE } from "@/lib/booking";
import { callHost, tonyWelcomeVideo } from "@/content/site";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

const expectOnTheCall = [
  "Where turnover is hurting you, and in which roles",
  "How we would put a dollar figure on it",
  "Whether a Retention Snapshot makes sense as a next step",
];

const cards = [
  ["See the results", "Nine results, each in context.", "/results"],
  ["Meet the team", "The people who will review your data.", "/team"],
  ["Find your industry", "The playbook for your world.", "/industries"],
];

export default function ThanksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6 lg:py-24">
      <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)]">{CONFIRMATION_MESSAGE}</h1>
      <p className="mt-5 max-w-2xl text-[1.08rem] text-ink/80">
        Nothing to prepare, but a rough sense of turnover by role helps.
      </p>

      <WelcomeVideo />

      <h2 className="mt-12 text-[2rem]">What to expect on the call</h2>
      <ul className="mt-4 max-w-2xl space-y-3 text-[1.05rem] text-ink/80">
        {expectOnTheCall.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 className="mt-12 text-[2rem]">Three things worth a look before we talk</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map(([title, body, href]) => (
          <Link key={href} href={href} className="border border-ink/10 bg-white p-6 hover:border-ink">
            <h3 className="text-[1.25rem]">{title}</h3>
            <p className="mt-2 text-ink/75">{body}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8">
        <Link href="/turn-tax-calculator" className="font-semibold underline underline-offset-4">
          Calculate your Turn Tax before the call
        </Link>
      </p>
      <p className="mt-6">
        <Link href="/prepare" className="underline underline-offset-4">A longer briefing before the call</Link>
      </p>
    </div>
  );
}

function WelcomeVideo() {
  const url = tonyWelcomeVideo.trim();
  const embed = url ? embedUrl(url) : null;
  const label = `A short welcome from ${callHost.name}, ${callHost.title}`;

  return (
    <section className="mt-10 max-w-3xl" aria-label={label}>
      {embed ? (
        <iframe
          className="aspect-video w-full border border-ink/10 bg-ink"
          src={embed}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : url ? (
        <video className="aspect-video w-full border border-ink/10 bg-ink" controls playsInline preload="metadata">
          <source src={url} />
        </video>
      ) : (
        <div className="flex aspect-video items-center justify-center border border-ink/10 bg-ink px-6 text-center text-paper">
          <div className="max-w-md">
            <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-gold uppercase">Welcome</p>
            <p className="mt-3 text-[1.45rem]">{callHost.name}</p>
            <p className="mt-2 text-[0.95rem] text-paper/75">
              {callHost.title}. A short welcome, and what to expect on the call, will play here.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function embedUrl(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = parsed.pathname.split("/").filter(Boolean)[0];
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = parsed.searchParams.get("v") || (parsed.pathname.startsWith("/embed/") ? parsed.pathname.split("/")[2] : "");
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
  }
  return null;
}
