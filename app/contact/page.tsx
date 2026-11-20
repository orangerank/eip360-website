import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { ContactForm } from "@/components/ContactForm";
import { callHost, heroMicro } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a 20-minute call",
  description: "Request a 20-minute call with EIP.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
      <h1 className="text-[clamp(2.3rem,5vw,4rem)]">Book a 20-minute call.</h1>
      <p className="mt-4 max-w-2xl text-[1.12rem] text-ink/80">
        Tell us how to reach you to talk with {callHost.name}, our {callHost.title}.
      </p>
      <p className="mt-3 text-ink/70">{heroMicro}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <h2 className="text-[1.6rem]">What we will cover in 20 minutes</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li>Where turnover is hurting you, and in which roles</li>
            <li>How we would put a dollar figure on it</li>
            <li>Whether a Retention Snapshot makes sense as a next step</li>
          </ul>
          <p className="mt-8 text-[0.95rem] text-ink/70">
            Your data stays protected: names coded before anyone looks, SOC 2 Type I in progress (target Q1 2027), and a BAA for healthcare. <Link className="underline underline-offset-4" href="/security">Data security</Link>.
          </p>
        </section>
        <section id="book" className="scroll-mt-28">
          <BookingForm />
        </section>
      </div>

      <section className="mt-16 max-w-xl">
        <h2 className="text-[1.8rem]">Or write to us.</h2>
        <div className="mt-6">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
