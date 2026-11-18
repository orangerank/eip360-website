import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TurnTaxCalculator } from "@/components/TurnTaxCalculator";

export const metadata: Metadata = {
  title: "Turn Tax calculator",
  description: "Enter four numbers and see what every departure is costing you across 13 cost categories. The number is never gated.",
};

export default function CalculatorPage() {
  return (
    <div className="px-4 py-14 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="display text-[0.75rem] tracking-[0.16em] uppercase">Free calculator</p>
        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">What is turnover really costing you?</h1>
        <p className="mt-4 text-[1.08rem] text-ink/75">
          Enter four numbers and see what every departure is costing you across 13 cost categories.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<p className="text-center">Loading the calculator…</p>}>
          <TurnTaxCalculator />
        </Suspense>
      </div>
      <p className="mx-auto mt-12 max-w-2xl text-center">
        <Link href="/tools/turn-tax" className="font-semibold underline underline-offset-4">How Turn Tax works</Link>
      </p>
    </div>
  );
}
