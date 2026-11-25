import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { ContactForm } from "@/components/ContactForm";
import { callHost, heroMicro } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a 20-minute call",
  description: "Pick the days and times that work for you. We'll book a 20-minute call with Tony at an open time in that window.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
      <h1 className="text-[clamp(2.3rem,5vw,4rem)]">Book a 20-minute call.</h1>
      <p className="mt-4 max-w-2xl text-[1.12rem] text-ink/80">
        Pick the days and times that work for you. We&apos;ll book a 20-minute call with {callHost.name}, our {callHost.title}, at an open time in that window.
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
