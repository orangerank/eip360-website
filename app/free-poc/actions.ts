"use server";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export async function unlockSnapshot(formData: FormData): Promise<{ ok: boolean; reason: "unconfigured" | "no" | "ok" }> {
  const expected = process.env.FREE_POC_CODE;
  if (!expected) return { ok: false, reason: "unconfigured" };
  const code = String(formData.get("code") || "").trim();
  const match = timingSafeEqual(digest(code), digest(expected));
  if (!match) return { ok: false, reason: "no" };
  const jar = await cookies();
  jar.set("eip_snapshot", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/free-poc",
    maxAge: 60 * 60 * 8,
  });
  return { ok: true, reason: "ok" };
}
