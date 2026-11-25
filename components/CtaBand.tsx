import { cta } from "@/content/site";
import { BookButton } from "./BookButton";

export function CtaBand() {
  return (
    <section className="bg-bg text-paper" aria-labelledby="site-cta">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6 lg:py-20">
        <p className="display text-[0.75rem] tracking-[0.16em] text-gold-bright uppercase">{cta.eyebrow}</p>
        <h2 id="site-cta" className="mt-4 text-[clamp(2rem,4vw,3.4rem)]">
          {cta.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] text-paper/80">{cta.body}</p>
        <p className="mt-4 text-[0.98rem] text-paper/70">{cta.micro}</p>
        <div className="mt-8">
          <BookButton>{cta.button}</BookButton>
        </div>
      </div>
    </section>
  );
}
