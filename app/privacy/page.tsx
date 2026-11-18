import type { Metadata } from "next";
import { company } from "@/content/site";

export const metadata: Metadata = { title: "Privacy policy", description: "How EIP handles information on this website and in client work." };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,4vw,3.4rem)]">Privacy policy</h1>
      <p className="mt-3 text-ink/70">How we handle information on this site and in our client work. Last updated October 4, 2026.</p>
      <div className="mt-8 space-y-5 text-ink/85">
        <p>Experience Improvement Partners LLC (&quot;EIP,&quot; &quot;we,&quot; &quot;us&quot;) is a Texas limited liability company. This policy explains how we handle information on this website and in our client work.</p>
        <h2 className="text-[1.4rem]">Information we collect on this website</h2>
        <p>We do not run analytics, advertising pixels, or tracking cookies on this review build unless Brett turns analytics on later. The site is hosted on Cloudflare, which may process technical information such as your IP address and browser type to deliver and protect the site. If you email us, we receive the information you choose to send.</p>
        <h2 className="text-[1.4rem]">Booking a call</h2>
        <p>When you book a call on our contact page, the calendar is provided by Calendly, a third-party scheduling service. Information you enter there is handled under Calendly&apos;s privacy policy.</p>
        <h2 className="text-[1.4rem]">The Retention Snapshot form</h2>
        <p>The Snapshot is by invitation. On the current production site, a file is checked in the visitor&apos;s browser and only the columns requested are sent. This review build does not upload files. When the intake is connected, we use what you send only to prepare your analysis.</p>
        <h2 className="text-[1.4rem]">Client data</h2>
        <p>When a company engages us, it sends workforce data through our secure portal. Early work can use anonymized data with no names, addresses, or employee ID numbers. In full engagements, we separate data into a coded file, analyzed as a blind study, and a separate file that links codes to people. Only a small number of named EIP team members can access the linking file. Our expert advisors see coded data only. Everyone who handles client data is under a nondisclosure agreement. Client data is also governed by each client&apos;s written agreement with us, which controls if it conflicts with this policy.</p>
        <h2 className="text-[1.4rem]">How we use information</h2>
        <p>We use information only to respond to you, deliver our services, and run our business. We do not sell personal information. We do not share client data with third parties for their own use.</p>
        <h2 className="text-[1.4rem]">Service providers</h2>
        <p>We use service providers, such as our hosting and storage providers, to operate the site and deliver our services. They process information only on our behalf.</p>
        <h2 className="text-[1.4rem]">How long we keep information</h2>
        <p>We keep client data for the length of the engagement plus 90 days, then delete it automatically, or sooner if the client asks us to.</p>
        <h2 className="text-[1.4rem]">Security</h2>
        <p>We use reasonable administrative, technical, and physical safeguards, including access controls and encryption provided by our hosting and storage providers. No system is perfectly secure.</p>
        <h2 className="text-[1.4rem]">Your choices</h2>
        <p>You can ask us to access, correct, or delete personal information we hold about you by emailing {company.email}. If your information came to us through your employer as part of a client engagement, we may refer your request to that employer.</p>
        <h2 className="text-[1.4rem]">Children</h2>
        <p>Our site and services are for businesses and are not directed to children under 13.</p>
        <h2 className="text-[1.4rem]">Changes</h2>
        <p>We may update this policy. The &quot;Last updated&quot; date shows when it last changed.</p>
      </div>
    </article>
  );
}
