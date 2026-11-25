import type { Metadata } from "next";
import { company } from "@/content/site";

export const metadata: Metadata = { title: "Terms of use", description: "The terms that govern use of the EIP website." };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,4vw,3.4rem)]">Terms of use</h1>
      <p className="mt-3 text-ink/70">The terms that govern use of this website. Last updated September 23, 2026.</p>
      <div className="mt-8 space-y-5 text-ink/85">
        <p>By using this website, you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2 className="text-[1.4rem]">Informational purpose</h2>
        <p>The site describes our services. It is not legal, financial, tax, or employment advice. A signed agreement governs any engagement, including fees and deliverables, and controls over anything on this site.</p>
        <h2 className="text-[1.4rem]">Illustrative data</h2>
        <p>Examples, names, numbers, dashboards, and visuals labeled &quot;Illustrative data&quot; or &quot;Example&quot; are fictional or sample inputs and for demonstration only.</p>
        <h2 className="text-[1.4rem]">Our tools support your decisions</h2>
        <p>Flight Risk Score™ and our other tools help prioritize conversations and actions. They do not predict any individual&apos;s behavior with certainty. Clients make and are responsible for their own employment decisions and for compliance with applicable employment laws.</p>
        <h2 className="text-[1.4rem]">Third-party content</h2>
        <p>The site links to third-party sites and cites third-party research. We do not control them and are not responsible for their content.</p>
        <h2 className="text-[1.4rem]">Intellectual property</h2>
        <p>The site&apos;s content, design, and our marks, including EIP, Flight Risk Score™, Turn Tax™, Honest Read™, and Hire Smart™, belong to Experience Improvement Partners LLC. Flight Risk Score™ is patent pending. You may not copy, modify, or reuse our content or marks without written permission.</p>
        <h2 className="text-[1.4rem]">Acceptable use</h2>
        <p>Do not misuse the site, including attempting to access it without authorization, disrupting it, or scraping it at scale.</p>
        <h2 className="text-[1.4rem]">Disclaimer</h2>
        <p>The site is provided &quot;as is&quot; without warranties of any kind, to the fullest extent permitted by law.</p>
        <h2 className="text-[1.4rem]">Limitation of liability</h2>
        <p>To the fullest extent permitted by law, EIP is not liable for indirect, incidental, or consequential damages arising from your use of the site.</p>
        <h2 className="text-[1.4rem]">Governing law</h2>
        <p>These terms are governed by the laws of the State of Texas. Any dispute will be heard in the courts located in Collin County, Texas.</p>
        <h2 className="text-[1.4rem]">Changes</h2>
        <p>We may update these terms. The &quot;Last updated&quot; date shows when they last changed. Questions: {company.email}.</p>
      </div>
    </article>
  );
}
