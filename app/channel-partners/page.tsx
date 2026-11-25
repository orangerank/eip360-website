import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Channel partners",
  description: "EIP's channel partner program is by application only.",
};

const looks = [
  ["Trusted access", "Direct relationships with CEOs, CHROs and owners at organizations where turnover is expensive."],
  ["Fit with who we serve", "A network in the industries we serve, where losing people hurts service, safety or revenue."],
  ["A reputation worth protecting", "Clients who would take your call again, and who will say so when we ask."],
  ["Willingness to stay involved", "The partners who do best stay in the room through the sale and the relationship."],
  ["Shared standards", "You sign our confidentiality, data handling and conduct terms before your first introduction."],
];

export default function ChannelPartnersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,4vw,3.4rem)]">A small circle of partners. By application only.</h1>
      <p className="mt-4 text-[1.08rem] text-ink/80">
        We work with a limited number of advisors, consultants and firms who already have the trust of CEOs and CHROs. Every application is reviewed by EIP leadership.
      </p>
      <p className="mt-4 text-ink/80">
        A partner puts their name behind us every time they make an introduction. We protect that. So we are careful about who we add, and we hold partners to the standard we hold ourselves: senior people, honest numbers, and client data handled with care. Every member of the EIP Council is also a partner. New partners join the same way: by application, review and a signed agreement. Not every application is accepted.
      </p>
      <h2 className="mt-10 text-[1.8rem]">What we look for</h2>
      <ol className="mt-4 space-y-4">
        {looks.map(([title, body], index) => (
          <li key={title}><p className="font-semibold">{String(index + 1).padStart(2, "0")} {title}</p><p className="text-ink/75">{body}</p></li>
        ))}
      </ol>
      <h2 className="mt-10 text-[1.8rem]">Two ways to partner</h2>
      <p className="mt-3"><strong>Introduction.</strong> You connect us with a decision maker and step back. You are paid on that client&apos;s first-year fees.</p>
      <p className="mt-3"><strong>Co-sell.</strong> You stay involved through the sale and the relationship. You are paid on every payment, for as long as the client stays with EIP.</p>
      <p className="mt-3 text-ink/75">Rates and terms are set out in a signed partner agreement and shared with accepted partners.</p>
      <h2 className="mt-10 text-[1.8rem]">How to join</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5">
        <li>Apply. A short note: who you know, the industries you work in, and why EIP.</li>
        <li>Review. EIP leadership reads every application. We may ask for references.</li>
        <li>Conversation. A call with our leadership to make sure the fit is right on both sides.</li>
        <li>Agreement and onboarding. A signed partner agreement, our partner playbook, and a demo you can show.</li>
      </ol>
      <p className="mt-4 text-ink/75">Applications are reviewed in the order they arrive. If the fit is not right today, we will tell you, and why.</p>
      <p className="mt-8">
        <Link href="/contact#book" className="inline-flex min-h-11 items-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase">Apply to be considered</Link>
      </p>
    </div>
  );
}
