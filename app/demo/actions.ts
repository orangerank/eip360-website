"use server";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export async function unlockDemo(formData: FormData): Promise<{ ok: boolean; reason: "unconfigured" | "no" | "ok" }> {
  const expected = process.env.DEMO_PASSWORD;
  if (!expected) return { ok: false, reason: "unconfigured" };
  const password = String(formData.get("password") || "");
  const match = timingSafeEqual(digest(password), digest(expected));
  if (!match) return { ok: false, reason: "no" };
  const jar = await cookies();
  jar.set("eip_demo", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/demo",
    maxAge: 60 * 60 * 12,
  });
  return { ok: true, reason: "ok" };
}
