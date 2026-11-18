import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SnapshotGate } from "@/components/SnapshotGate";

export const metadata: Metadata = {
  title: "Retention Snapshot",
  description: "By invitation. One spreadsheet, seven standard data fields, first numbers in about 7 days.",
};

export default async function SnapshotPage() {
  const jar = await cookies();
  const unlocked = jar.get("eip_snapshot")?.value === "1";
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,4vw,3.4rem)]">Do not take our word for it. See it on your own data.</h1>
      <p className="mt-4 text-[1.08rem] text-ink/80">
        By invitation only. The same analysis that opens every paid EIP engagement, run on one small group of your people. Send one spreadsheet and see your first Flight Risk Score and Turn Tax in about 7 days. Put your code in below to start. No code yet? Book an appointment and we will see if you qualify.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="border border-ink/10 bg-white p-5">
          <h2 className="text-[1.2rem]">You get</h2>
          <ul className="mt-3 space-y-2 text-ink/80">
            <li>Your first Flight Risk Score and Turn Tax numbers, in about 7 days</li>
            <li>Advisory support from our team</li>
            <li>Our expert advisors reviewing your results</li>
            <li>A turnover analysis to keep, with no invoice</li>
          </ul>
        </article>
        <article className="border border-ink/10 bg-white p-5">
          <h2 className="text-[1.2rem]">We ask</h2>
          <ul className="mt-3 space-y-2 text-ink/80">
            <li>Honest feedback</li>
            <li>A short video review</li>
          </ul>
          <p className="mt-3 text-ink/70">That is all. We do not need your company logo.</p>
        </article>
      </div>
      <SnapshotGate unlocked={unlocked} />
    </div>
  );
}
