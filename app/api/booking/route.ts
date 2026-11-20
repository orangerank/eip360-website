import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { StoredSubmission } from "@/cloudflare/booking-store";
import {
  BOOKING_CONSENT_TEXT,
  CONFIRMATION_MESSAGE,
  buildBookingPayload,
  createSubmissionId,
  isDuplicate,
  isPreviewHost,
  signWebhook,
  turnstileKeys,
  utcTimestamp,
  validateBooking,
  verifyTurnstile,
} from "@/lib/booking";

export const dynamic = "force-dynamic";

type BookingBinding = {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(input: string, init?: RequestInit): Promise<Response> };
};

type Env = {
  BOOKING?: BookingBinding;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  WEBHOOK_URL?: string;
  WEBHOOK_SECRET?: string;
};

function genericError(status = 400) {
  return Response.json({ ok: false, error: "Something went wrong. Please try again." }, { status });
}

export async function GET(request: Request) {
  const host = new URL(request.url).host;
  const env = await readEnv();
  const keys = turnstileKeys(env, host);
  if (!keys) return genericError(503);
  return Response.json({ siteKey: keys.siteKey, consentText: BOOKING_CONSENT_TEXT });
}

export async function POST(request: Request) {
  const host = new URL(request.url).host;
  try {
    return await handlePost(request, host);
  } catch (error) {
    const name = error instanceof Error ? error.name : "Error";
    const message = error instanceof Error ? error.message.slice(0, 200) : "failed";
    console.log(JSON.stringify({ result: "handler_error", name, message }));
    return genericError(500);
  }
}

async function handlePost(request: Request, host: string) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return genericError();
  }

  const validated = validateBooking({
    name: body.name,
    company: body.company,
    email: body.email,
    phone: body.phone,
    consent: body.consent === true,
    availability: body.availability,
    visitorTimezone: body.visitorTimezone,
  });
  if (!validated.ok) {
    return Response.json({ ok: false, error: "Check the form and try again.", fields: validated.errors }, { status: 400 });
  }

  const env = await readEnv();
  const keys = turnstileKeys(env, host);
  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!keys || !token) return genericError();

  const ip = request.headers.get("cf-connecting-ip");
  const passed = await verifyTurnstile(keys.secretKey, token, ip);
  if (!passed) return genericError();

  const now = new Date();
  const site = isPreviewHost(host) ? "preview" : "production";
  const referrer = typeof body.referrer === "string" ? body.referrer : "";
  const store = env.BOOKING;
  if (!store) {
    console.log(JSON.stringify({ result: "store_unconfigured" }));
    return genericError(503);
  }

  const stub = store.get(store.idFromName("submissions"));
  const lookup = await stub.fetch(`https://booking.internal/lookup?email=${encodeURIComponent(validated.fields.email)}`);
  const prior = (await lookup.json()) as { stored_at: string | null; submission_id: string | null };
  const duplicate = isDuplicate(prior.stored_at, now.getTime());
  const submissionId = createSubmissionId(now.getTime());
  const submittedAt = utcTimestamp(now);
  const checkedAt = utcTimestamp(new Date(now.getTime() + 1000));

  if (duplicate && prior.submission_id) {
    const record: StoredSubmission & { submission_id: string } = {
      submission_id: submissionId,
      email: validated.fields.email,
      stored_at: submittedAt,
      webhook: "duplicate",
      duplicate_of: prior.submission_id,
      payload: { duplicate_of: prior.submission_id, email: validated.fields.email },
    };
    await stub.fetch("https://booking.internal/save", { method: "POST", body: JSON.stringify(record) });
    console.log(JSON.stringify({ submission_id: submissionId, result: "duplicate", original: prior.submission_id }));
    return Response.json({ ok: true, message: CONFIRMATION_MESSAGE });
  }

  const payload = buildBookingPayload({
    submissionId,
    submittedAt,
    checkedAt,
    fields: validated.fields,
    availability: validated.availability,
    visitorTimezone: validated.visitorTimezone,
    site,
    referrer,
  });
  if (payload.consent.text !== BOOKING_CONSENT_TEXT) return genericError();

  const webhookUrl = env.WEBHOOK_URL?.trim();
  let webhook: StoredSubmission["webhook"] = "not_configured";
  if (!webhookUrl) {
    console.log(JSON.stringify({ submission_id: submissionId, result: "webhook not configured" }));
  } else {
    const secret = env.WEBHOOK_SECRET?.trim();
    if (!secret) {
      console.log(JSON.stringify({ submission_id: submissionId, result: "webhook_secret_missing" }));
      webhook = "failed";
    } else {
      const raw = JSON.stringify(payload);
      const timestamp = String(Math.floor(now.getTime() / 1000));
      const signature = await signWebhook(secret, timestamp, raw);
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-eip-timestamp": timestamp,
            "x-eip-signature": signature,
          },
          body: raw,
        });
        webhook = response.ok ? "sent" : "failed";
        console.log(JSON.stringify({ submission_id: submissionId, result: webhook, status: response.status }));
      } catch {
        webhook = "failed";
        console.log(JSON.stringify({ submission_id: submissionId, result: "webhook_failed" }));
      }
    }
  }

  const record: StoredSubmission & { submission_id: string } = {
    submission_id: submissionId,
    email: validated.fields.email,
    stored_at: submittedAt,
    webhook,
    payload,
  };
  await stub.fetch("https://booking.internal/save", { method: "POST", body: JSON.stringify(record) });
  return Response.json({ ok: true, message: CONFIRMATION_MESSAGE });
}

async function readEnv(): Promise<Env> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as Env;
  } catch {
    return {
      TURNSTILE_SITE_KEY: process.env.TURNSTILE_SITE_KEY,
      TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
      WEBHOOK_URL: process.env.WEBHOOK_URL,
      WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    };
  }
}
