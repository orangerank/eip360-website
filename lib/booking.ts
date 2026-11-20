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

export const CENTRAL_TIME_ZONE = "America/Chicago";

export const AVAILABILITY_DAYS = [
  { id: "mon", label: "Monday", weekday: "Mon" },
  { id: "tue", label: "Tuesday", weekday: "Tue" },
  { id: "wed", label: "Wednesday", weekday: "Wed" },
  { id: "thu", label: "Thursday", weekday: "Thu" },
  { id: "fri", label: "Friday", weekday: "Fri" },
] as const;

export const AVAILABILITY_BLOCKS = [
  { id: "morning", label: "Morning", start_ct: "09:00", end_ct: "12:00", startHour: 9, endHour: 12 },
  { id: "afternoon", label: "Afternoon", start_ct: "13:00", end_ct: "17:00", startHour: 13, endHour: 17 },
] as const;

export type AvailabilityDay = (typeof AVAILABILITY_DAYS)[number]["id"];
export type AvailabilityBlock = (typeof AVAILABILITY_BLOCKS)[number]["id"];

export type AvailabilityWindow = {
  day: AvailabilityDay;
  block: AvailabilityBlock;
  start_ct: "09:00" | "13:00";
  end_ct: "12:00" | "17:00";
};

export type BookingFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
};

export type FieldErrors = Partial<Record<keyof BookingFields | "consent" | "turnstile" | "availability" | "timezone", string>>;

export type BookingPayload = {
  client_id: "EIP";
  submission_id: string;
  submitted_at: string;
  fields: BookingFields;
  availability: AvailabilityWindow[];
  visitor_timezone: string;
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

export function canonicalWindow(day: string, block: string): AvailabilityWindow | null {
  const knownDay = AVAILABILITY_DAYS.find((item) => item.id === day);
  const knownBlock = AVAILABILITY_BLOCKS.find((item) => item.id === block);
  if (!knownDay || !knownBlock) return null;
  return {
    day: knownDay.id,
    block: knownBlock.id,
    start_ct: knownBlock.start_ct,
    end_ct: knownBlock.end_ct,
  };
}

export function parseAvailability(input: unknown): AvailabilityWindow[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > AVAILABILITY_DAYS.length * AVAILABILITY_BLOCKS.length) {
    return null;
  }
  const windows: AvailabilityWindow[] = [];
  const seen = new Set<string>();
  for (const item of input) {
    if (!item || typeof item !== "object") return null;
    const record = item as { day?: unknown; block?: unknown };
    if (typeof record.day !== "string" || typeof record.block !== "string") return null;
    const window = canonicalWindow(record.day, record.block);
    if (!window) return null;
    const key = `${window.day}:${window.block}`;
    if (seen.has(key)) continue;
    seen.add(key);
    windows.push(window);
  }
  if (!windows.length) return null;
  return windows.sort((a, b) => {
    const dayOrder = AVAILABILITY_DAYS.findIndex((day) => day.id === a.day) - AVAILABILITY_DAYS.findIndex((day) => day.id === b.day);
    if (dayOrder !== 0) return dayOrder;
    return a.block === b.block ? 0 : a.block === "morning" ? -1 : 1;
  });
}

export function parseTimeZone(input: unknown) {
  if (typeof input !== "string") return null;
  const zone = input.trim();
  if (!zone || zone.length > 80) return null;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: zone }).format(new Date());
    return zone;
  } catch {
    return null;
  }
}

export function validateBooking(input: {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  consent?: unknown;
  availability?: unknown;
  visitorTimezone?: unknown;
}): { ok: true; fields: BookingFields; availability: AvailabilityWindow[]; visitorTimezone: string } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const company = typeof input.company === "string" ? input.company.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const phone = typeof input.phone === "string" ? cleanPhone(input.phone) : null;
  const availability = parseAvailability(input.availability);
  const visitorTimezone = parseTimeZone(input.visitorTimezone);

  if (name.length < 1 || name.length > 200) errors.name = "Enter your name.";
  if (company.length < 1 || company.length > 200) errors.company = "Enter your company.";
  if (!EMAIL.test(email) || email.length > 320) errors.email = "Enter a work email.";
  if (!phone) errors.phone = "Enter a phone number.";
  if (input.consent !== true) errors.consent = "Consent is required.";
  if (!availability) errors.availability = "Choose at least one time.";
  if (!visitorTimezone) errors.timezone = "Choose a time zone.";

  if (Object.keys(errors).length || !availability || !visitorTimezone) return { ok: false, errors };
  return { ok: true, fields: { name, company, email, phone: phone as string }, availability, visitorTimezone };
}

function chicagoDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CENTRAL_TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  return Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
}

function wallTimeInZone(year: number, month: number, day: number, hour: number, minute: number, timeZone: string) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date(utcGuess));
  const read = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(Number(read.year), Number(read.month) - 1, Number(read.day), Number(read.hour) % 24, Number(read.minute));
  return new Date(utcGuess - (asUtc - utcGuess));
}

function nextChicagoDate(weekday: string, now: Date) {
  for (let offset = 0; offset < 7; offset += 1) {
    const parts = chicagoDateParts(new Date(now.getTime() + offset * 86_400_000));
    if (parts.weekday === weekday) {
      return { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day) };
    }
  }
  return { year: now.getUTCFullYear(), month: now.getUTCMonth() + 1, day: now.getUTCDate() };
}

function clockLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function zoneAbbrev(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "short" }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}

function weekdayShort(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short" }).format(date);
}

/** Local clock times for a Central window. Null when the visitor is already in Central time. */
export function localWindowLabel(day: AvailabilityDay, block: AvailabilityBlock, timeZone: string, now = new Date()) {
  if (timeZone === CENTRAL_TIME_ZONE) return null;
  const dayMeta = AVAILABILITY_DAYS.find((item) => item.id === day);
  const blockMeta = AVAILABILITY_BLOCKS.find((item) => item.id === block);
  if (!dayMeta || !blockMeta) return null;
  const date = nextChicagoDate(dayMeta.weekday, now);
  const start = wallTimeInZone(date.year, date.month, date.day, blockMeta.startHour, 0, CENTRAL_TIME_ZONE);
  const end = wallTimeInZone(date.year, date.month, date.day, blockMeta.endHour, 0, CENTRAL_TIME_ZONE);
  const startDay = weekdayShort(start, timeZone);
  const endDay = weekdayShort(end, timeZone);
  const abbrev = zoneAbbrev(start, timeZone);
  const startText = startDay === dayMeta.weekday ? clockLabel(start, timeZone) : `${startDay} ${clockLabel(start, timeZone)}`;
  const endText = endDay === startDay ? clockLabel(end, timeZone) : `${endDay} ${clockLabel(end, timeZone)}`;
  return `${startText}–${endText} ${abbrev}`;
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
  availability: AvailabilityWindow[];
  visitorTimezone: string;
  site: "preview" | "production";
  referrer: string;
}): BookingPayload {
  return {
    client_id: "EIP",
    submission_id: args.submissionId,
    submitted_at: args.submittedAt,
    fields: args.fields,
    availability: args.availability,
    visitor_timezone: args.visitorTimezone,
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
