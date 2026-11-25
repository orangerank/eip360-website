import Link from "next/link";
import { company, tools } from "@/content/site";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "Approach", href: "/approach" },
      { label: "Results", href: "/results" },
      { label: "Industries", href: "/industries" },
      { label: "Team", href: "/team" },
      { label: "Book a 20-minute call", href: "/contact#book" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "The Book", href: "/white-papers" },
      { label: "Playbooks", href: "/industry-playbooks" },
      { label: "Articles", href: "/articles" },
      { label: "Media", href: "/media" },
    ],
  },
  {
    title: "Self-serve tools",
    links: [
      { label: "Turn Tax Calculator", href: "/turn-tax-calculator" },
      { label: "Retention Checkup", href: "/retention-checkup" },
    ],
  },
  {
    title: "The kit",
    links: tools.map((tool) => ({ label: tool.name, href: tool.href })),
  },
  {
    title: "For clients and partners",
    links: [
      { label: "Retention Snapshot (by invitation)", href: "/free-poc" },
      { label: "EIP demo (password)", href: "/demo" },
      { label: "Data security", href: "/security" },
      { label: "How EIP compares", href: "/compare" },
      { label: "Channel Partners", href: "/channel-partners" },
      { label: "Solutions Providers", href: "/solutions-providers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 lg:px-6">
        {columns.map((column) => (
          <div key={column.title}>
            <p className="display text-[0.72rem] tracking-[0.14em] text-gold-bright uppercase">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.95rem] text-paper/80 hover:text-gold-bright">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="display text-[0.72rem] tracking-[0.14em] text-gold-bright uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-paper/80">
            <li>
              <a className="hover:text-gold-bright" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li>
              <Link className="hover:text-gold-bright" href="/contact#book">
                Book a call with EIP
              </Link>
            </li>
            <li>EIP Office, Dallas, Texas</li>
            <li>
              <a className="hover:text-gold-bright" href={company.linkedIn}>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-[0.9rem] text-paper/70 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>© 2026 Experience Improvement Partners LLC</p>
          <p className="text-paper/55">{company.tagline}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/privacy" className="hover:text-gold-bright">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-gold-bright">
              Terms of use
            </Link>
            <Link href="/for-ai" className="hover:text-gold-bright">
              For AI
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
