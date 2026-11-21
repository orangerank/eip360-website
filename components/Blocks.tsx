import type { ReactNode } from "react";

type Run = { t: string; b?: boolean; i?: boolean };

export type Block =
  | { type: "p" | "li" | "key"; runs: Run[] }
  | { type: "h2" | "h3" | "source"; text: string }
  | { type: "callout"; title: string; lines: string[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "table"; rows: string[][] }
  | {
      type: "chart";
      title: string;
      labels: string[];
      values: number[];
      prefix?: string;
      suffix?: string;
      kind?: string;
      source?: string;
    }
  | { type: "image"; src: string; w?: number; h?: number };

function runs(items: Run[]) {
  return items.map((run, index) => {
    let node: ReactNode = run.t;
    if (run.i) node = <em key={`i-${index}`}>{node}</em>;
    if (run.b) node = <strong key={`b-${index}`}>{node}</strong>;
    return <span key={index}>{node}</span>;
  });
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[1.05rem] leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="pt-6 text-[1.7rem]">
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} className="pt-2 text-[1.25rem]">
              {block.text}
            </h3>
          );
        }
        if (block.type === "p" || block.type === "key") {
          return (
            <p key={index} className={block.type === "key" ? "border-l-2 border-gold pl-4 font-semibold" : ""}>
              {runs(block.runs)}
            </p>
          );
        }
        if (block.type === "li") {
          return (
            <p key={index} className="pl-4">
              <span className="mr-2 text-gold" aria-hidden>
                •
              </span>
              {runs(block.runs)}
            </p>
          );
        }
        if (block.type === "source") {
          return (
            <p key={index} className="text-[0.9rem] text-ink/60">
              {block.text}
            </p>
          );
        }
        if (block.type === "callout") {
          return (
            <aside key={index} className="border border-gold/50 bg-gold-pale/40 p-5">
              <p className="display text-[0.75rem] tracking-[0.12em] text-ink uppercase">{block.title}</p>
              {block.lines.map((line) => (
                <p key={line} className="mt-2">
                  {line}
                </p>
              ))}
            </aside>
          );
        }
        if (block.type === "stats") {
          return (
            <div key={index} className="grid gap-3 sm:grid-cols-3">
              {block.items.map((item) => (
                <div key={item.label} className="border border-line bg-white/50 p-4">
                  <p className="display text-[1.6rem]">{item.value}</p>
                  <p className="mt-2 text-[0.95rem] text-ink/75">{item.label}</p>
                </div>
              ))}
            </div>
          );
        }
        if (block.type === "table") {
          return (
            <div key={index} className="overflow-x-auto">
              <table className="bk-table">
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) =>
                        rowIndex === 0 ? <th key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>,
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (block.type === "chart") {
          const max = Math.max(1, ...block.values);
          return (
            <figure key={index} className="border border-line p-4">
              <figcaption className="font-semibold">{block.title}</figcaption>
              <div className="mt-4 space-y-3">
                {block.values.map((value, valueIndex) => (
                  <div key={`${block.labels[valueIndex]}-${valueIndex}`}>
                    <div className="flex justify-between gap-4 text-[0.92rem]">
                      <span>{block.labels[valueIndex]}</span>
                      <span>
                        {block.prefix ?? ""}
                        {Number.isInteger(value) ? value.toLocaleString("en-US") : value.toLocaleString("en-US", { maximumFractionDigits: 1 })}
                        {block.suffix ?? ""}
                      </span>
                    </div>
                    <div className="mt-1 h-2 bg-ink/10">
                      <div className="h-2 bg-ink" style={{ width: `${Math.max(3, (value / max) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {block.source ? <p className="mt-3 text-[0.85rem] text-ink/60">Source: {block.source}</p> : null}
            </figure>
          );
        }
        if (block.type === "image") {
          return (
            // Charts published on eip360.com. Dimensions vary, so a plain img keeps the ratio.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={block.src}
              width={block.w}
              height={block.h}
              alt="Chart from the playbook"
              className="h-auto w-full border border-line"
            />
          );
        }
        return null;
      })}
    </div>
  );
}
