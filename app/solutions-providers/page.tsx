import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions providers",
  description: "EIP recommends a short list of vetted providers when a diagnosis points outside our own work.",
};

const looks = [
  ["Proven results", "Outcomes you can show in your category, and client references we can call."],
  ["Fit with what we diagnose", "You fix the causes our tools find: manager quality, pay, scheduling, job friction and hiring."],
  ["Clear pricing", "No surprises after the client signs. Our clients judge us by your invoice too."],
  ["Security you can document", "Employee data handled to the standard our own clients expect. SOC 2 or equivalent preferred."],
  ["Leadership that answers", "An executive sponsor we can reach when a client needs something fixed."],
];

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,4vw,3.4rem)]">Thousands of vendors. Two or three get the call.</h1>
      <p className="mt-4 text-[1.08rem] text-ink/80">
        When our diagnosis points to a fix we do not deliver ourselves, we bring the client a short list. A place on that list is earned.
      </p>
      <p className="mt-4 text-ink/80">
        Clients come to us because something is broken and it is costing them people. Our tools and our Council find the cause. Sometimes the fix is technology, training or a service we do not provide. Then we put two or three providers in front of the client. A bad recommendation costs our client money and costs us their trust. So we only recommend providers we have vetted, and staying in the network depends on results for our clients.
      </p>
      <h2 className="mt-10 text-[1.8rem]">What we look for</h2>
      <ol className="mt-4 space-y-4">
        {looks.map(([title, body]) => (
          <li key={title}><p className="font-semibold">{title}</p><p className="text-ink/75">{body}</p></li>
        ))}
      </ol>
      <p className="mt-6 text-ink/75">Where we place providers: AI, security, HR technology, customer experience, telecom, analytics, payroll, and learning.</p>
      <h2 className="mt-10 text-[1.8rem]">We advise. The client decides.</h2>
      <ul className="mt-3 space-y-2 text-ink/80">
        <li>The client chooses the provider and funds the work. We help them negotiate pricing and terms.</li>
        <li>We cut the market to the few providers that solve what we found. Being in the network does not mean a recommendation.</li>
        <li>Providers may compensate us. It never adds to the client&apos;s price, and we tell the client before they decide.</li>
      </ul>
      <h2 className="mt-10 text-[1.8rem]">How to be considered</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5">
        <li>Apply. Tell us what you solve, for whom, and the results you can show.</li>
        <li>Vetting. We check references, review the product, and review how you handle data.</li>
        <li>Council review. Our expert advisors weigh in on where you fit, and where you do not.</li>
        <li>Join the network. Accepted providers are considered when our diagnosis points to their category.</li>
      </ol>
      <h2 className="mt-10 text-[1.8rem]">Some questions need a specialist.</h2>
      <ul className="mt-4 space-y-3">
        <li className="flex items-center gap-3"><Image src="/assets/partners/kornferry.svg" alt="" width={120} height={32} className="h-8 w-auto" /> Executive compensation through Korn Ferry.</li>
        <li className="flex items-center gap-3"><Image src="/assets/partners/moodys.svg" alt="" width={120} height={32} className="h-8 w-auto" /> Competitive analysis through Moody&apos;s.</li>
        <li className="flex items-center gap-3"><Image src="/assets/partners/amazon.svg" alt="" width={120} height={32} className="h-8 w-auto" /> Contact center technology through Amazon.</li>
      </ul>
      <p className="mt-3 text-[0.9rem] text-ink/55">Company names and logos are trademarks of their owners.</p>
      <p className="mt-8">
        <Link href="/contact#book" className="inline-flex min-h-11 items-center bg-ink px-5 text-[0.82rem] font-semibold tracking-[0.08em] text-paper uppercase">Apply to join the network</Link>
      </p>
    </div>
  );
}
