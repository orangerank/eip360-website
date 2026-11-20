/** Proposed booking contract (spec v0.1). Not approved by Tony or Brett. */

export const BOOKING_CLIENT_ID = "EIP";
export const BOOKING_CHANNEL = "eip360_website_booking_form";
export const BOOKING_PAGE = "/contact#book";

/** Proposed consent sentence. Exact text is stored on each submission. */
export const BOOKING_CONSENT_TEXT =
  "I agree that EIP may email me a few times to schedule a 20-minute call. Submitting this form does not book a meeting.";

/** Proposed duplicate window. Spec leaves the length open; 24 hours is the default until Tony or Brett decide. */
export const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Cloudflare's documented Turnstile test keys.
 * Used only when the real keys are unset and the request host is a preview host.
 * https://developers.cloudflare.com/turnstile/troubleshooting/testing/
 */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export const CONFIRMATION_MESSAGE =
  "Thanks. We'll email you times to talk with Tony shortly.";

export type BookingFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
};

export type FieldErrors = Partial<Record<keyof BookingFields | "consent" | "turnstile", string>>;

export type BookingPayload = {
  client_id: "EIP";
  submission_id: string;
  submitted_at: string;
  fields: BookingFields;
  source: {
    channel: typeof BOOKING_CHANNEL;
    site: "preview" | "production";
    page: typeof BOOKING_PAGE;
    referrer: string;
  };
  turnstile: { success: true; checked_at: string };
  consent: { contact_ok: true; text: typeof BOOKING_CONSENT_TEXT };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isPreviewHost(host: string) {
  const name = host.split(":")[0]?.toLowerCase() ?? "";
  return name === "localhost" || name === "127.0.0.1" || name.endsWith(".workers.dev");
}

export function cleanPhone(input: string) {
  const trimmed = input.trim().replace(/\s+/g, " ");
  if (!/^[0-9+().\-\s]+$/.test(trimmed)) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return trimmed;
}

export function validateBooking(input: {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  consent?: unknown;
}): { ok: true; fields: BookingFields } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const company = typeof input.company === "string" ? input.company.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const phone = typeof input.phone === "string" ? cleanPhone(input.phone) : null;

  if (name.length < 1 || name.length > 200) errors.name = "Enter your name.";
  if (company.length < 1 || company.length > 200) errors.company = "Enter your company.";
  if (!EMAIL.test(email) || email.length > 320) errors.email = "Enter a work email.";
  if (!phone) errors.phone = "Enter a phone number.";
  if (input.consent !== true) errors.consent = "Consent is required.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, fields: { name, company, email, phone: phone as string } };
}

export function utcTimestamp(date = new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

export function createSubmissionId(now = Date.now(), random = crypto.getRandomValues(new Uint8Array(16))) {
  const chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  let time = "";
  let n = now;
  for (let i = 0; i < 10; i++) {
    time = chars[n % 32] + time;
    n = Math.floor(n / 32);
  }
  let entropy = "";
  for (let i = 0; i < 16; i++) entropy += chars[random[i] % 32];
  return time + entropy;
}

export function buildBookingPayload(args: {
  submissionId: string;
  submittedAt: string;
  checkedAt: string;
  fields: BookingFields;
  site: "preview" | "production";
  referrer: string;
}): BookingPayload {
  return {
    client_id: "EIP",
    submission_id: args.submissionId,
    submitted_at: args.submittedAt,
    fields: args.fields,
    source: {
      channel: BOOKING_CHANNEL,
      site: args.site,
      page: BOOKING_PAGE,
      referrer: args.referrer.slice(0, 500),
    },
    turnstile: { success: true, checked_at: args.checkedAt },
    consent: { contact_ok: true, text: BOOKING_CONSENT_TEXT },
  };
}

export function isDuplicate(existingAt: string | null, nowMs: number, windowMs = DUPLICATE_WINDOW_MS) {
  if (!existingAt) return false;
  const then = Date.parse(existingAt);
  if (Number.isNaN(then)) return false;
  return nowMs - then < windowMs;
}

export async function signWebhook(secret: string, timestamp: string, body: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${body}`));
  const hex = [...new Uint8Array(mac)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `sha256=${hex}`;
}

export function turnstileKeys(env: { TURNSTILE_SITE_KEY?: string; TURNSTILE_SECRET_KEY?: string }, host: string) {
  const site = env.TURNSTILE_SITE_KEY?.trim();
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  if (site && secret) return { siteKey: site, secretKey: secret, testKeys: false };
  if (isPreviewHost(host)) {
    return { siteKey: TURNSTILE_TEST_SITE_KEY, secretKey: TURNSTILE_TEST_SECRET_KEY, testKeys: true };
  }
  return null;
}

export async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!response.ok) return false;
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}
