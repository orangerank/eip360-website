import type { Metadata } from "next";
import { Checkup } from "@/components/Checkup";

export const metadata: Metadata = {
  title: "Retention Checkup",
  description: "24 questions, about 5 minutes. A score out of 100, four area scores, and your three next best actions.",
};

export default function CheckupPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 lg:px-6 lg:py-20">
      <p className="display text-[0.75rem] tracking-[0.16em] uppercase">Retention Checkup</p>
      <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">How well is your company built to keep its people?</h1>
      <p className="mt-4 max-w-3xl text-ink/75">
        24 questions for the leader who owns turnover. About 5 minutes. You get a score out of 100, how you stand in four areas, and your three next best actions. Answer for your company as it is today.
      </p>
      <div className="mt-10">
        <Checkup />
      </div>
    </div>
  );
}
