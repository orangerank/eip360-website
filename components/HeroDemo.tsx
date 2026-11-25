/**
 * Sample product panel for the homepage hero.
 * Fictional frontline roles and sites only. Not a client, not a person.
 */

const risks = [
  { role: "Lineworker", site: "Plant B", score: 91, raise: "Overtime and schedule", band: "Critical" },
  { role: "Clinician", site: "Unit 3", score: 86, raise: "Workload", band: "Critical" },
  { role: "Contact center agent", site: "Site C", score: 78, raise: "Manager 1:1", band: "Intervention" },
  { role: "DC picker", site: "Dock 2", score: 74, raise: "Shift friction", band: "Intervention" },
  { role: "Line operator", site: "Line 4", score: 61, raise: "Career path", band: "Watch" },
];

const costs = [
  { name: "Productivity", share: 22 },
  { name: "Overtime and coverage", share: 15 },
  { name: "Knowledge walking out", share: 14 },
];

function bandClass(band: string) {
  if (band === "Critical") return "text-[#ffb4a8]";
  if (band === "Intervention") return "text-gold-bright";
  return "text-paper/70";
}

export function HeroDemo() {
  return (
    <figure
      className="border border-gold/40 bg-[#1b1815] text-paper shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
      aria-label="Sample EIP view for a fictional frontline workforce"
    >
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-paper/10 px-4 py-3 sm:px-5">
        <span className="display text-[0.68rem] tracking-[0.16em] text-gold-bright uppercase">Sample data</span>
        <span className="text-[0.8rem] text-paper/60">Fictional workforce. Not a client result.</span>
      </figcaption>

      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[0.98rem] font-semibold">Frontline workforce · this month</p>
          <p className="text-[0.75rem] tracking-[0.08em] text-paper/50 uppercase">Retention Dashboard</p>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            ["18%", "Voluntary turnover", "from 24%"],
            ["14", "Need a conversation", "next 90 days"],
            ["$2.4M", "Turn Tax this year", "11 of 13 costs"],
          ].map(([value, label, note]) => (
            <div key={label} className="border border-paper/10 bg-bg/60 px-2 py-3 sm:px-3">
              <dt className="text-[0.68rem] leading-tight text-paper/55 sm:text-[0.75rem]">{label}</dt>
              <dd className="display mt-2 text-[1.15rem] text-gold-bright sm:text-[1.45rem]">{value}</dd>
              <dd className="mt-1 text-[0.7rem] text-paper/50">{note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[0.95rem] normal-case tracking-normal">Flight Risk Score™</h2>
            <p className="text-[0.75rem] text-paper/50">Who to talk to next</p>
          </div>
          <table className="mt-3 w-full text-left text-[0.82rem] sm:text-[0.9rem]">
            <caption className="sr-only">
              Sample flight risk scores by role and site. No individual names.
            </caption>
            <thead>
              <tr className="text-[0.68rem] tracking-[0.08em] text-paper/45 uppercase">
                <th className="pb-2 font-medium">Role and site</th>
                <th className="pb-2 text-right font-medium">Score</th>
                <th className="hidden pb-2 pl-3 font-medium sm:table-cell">What to raise</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((row) => (
                <tr key={row.role} className="border-t border-paper/10">
                  <td className="py-2 pr-2">
                    <span className="block font-medium">{row.role}</span>
                    <span className="block text-[0.75rem] text-paper/50">{row.site}</span>
                    <span className={`block text-[0.75rem] sm:hidden ${bandClass(row.band)}`}>{row.raise}</span>
                  </td>
                  <td className={`py-2 text-right tabular-nums ${bandClass(row.band)}`}>
                    <span className="font-semibold">{row.score}</span>
                    <span className="mt-0.5 block text-[0.68rem]">{row.band}</span>
                  </td>
                  <td className="hidden py-2 pl-3 text-paper/75 sm:table-cell">{row.raise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 border-t border-paper/10 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[0.95rem] normal-case tracking-normal">Turn Tax™</h2>
            <p className="text-[0.75rem] text-paper/50">Where the sample cost goes</p>
          </div>
          <ul className="mt-3 space-y-2">
            {costs.map((line) => (
              <li key={line.name}>
                <div className="flex justify-between text-[0.82rem]">
                  <span>{line.name}</span>
                  <span className="tabular-nums text-paper/70">{line.share}%</span>
                </div>
                <div className="mt-1 h-1.5 bg-paper/10" aria-hidden>
                  <div className="h-1.5 bg-gold" style={{ width: `${line.share * 3}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
