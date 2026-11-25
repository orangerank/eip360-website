import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DemoGate } from "@/components/DemoGate";

export const metadata: Metadata = {
  title: "EIP demo",
  robots: { index: false, follow: false },
  description: "Password-protected walkthrough of EIP for a fictional company. The password is shared after you book.",
};

export default async function DemoPage() {
  const jar = await cookies();
  const unlocked = jar.get("eip_demo")?.value === "1";
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="text-[clamp(2.2rem,4vw,3.4rem)]">EIP demo</h1>
      <p className="mt-4 text-[1.08rem] text-ink/80">
        See what a year with EIP looks like, one step at a time. A click-through for a fictional client, switchable by industry on the current product. Password protected.
      </p>
      <DemoGate unlocked={unlocked} />
    </div>
  );
}
