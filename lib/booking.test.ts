import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BOOKING_CONSENT_TEXT,
  buildBookingPayload,
  cleanPhone,
  isDuplicate,
  isPreviewHost,
  signWebhook,
  turnstileKeys,
  validateBooking,
} from "./booking.ts";

const valid = {
  name: "Test Person",
  company: "Example Co",
  email: "test@example.com",
  phone: "555-0100",
  consent: true as const,
};

describe("booking validation", () => {
  it("accepts the four required fields and a lenient phone", () => {
    const result = validateBooking(valid);
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.fields.email, "test@example.com");
      assert.equal(result.fields.phone, "555-0100");
    }
    assert.equal(cleanPhone("(555) 010-0100"), "(555) 010-0100");
  });

  it("rejects a missing field and a bad email", () => {
    const missing = validateBooking({ ...valid, company: "  " });
    assert.equal(missing.ok, false);
    if (!missing.ok) assert.equal(missing.errors.company, "Enter your company.");
    const email = validateBooking({ ...valid, email: "not-an-email" });
    assert.equal(email.ok, false);
    if (!email.ok) assert.equal(email.errors.email, "Enter a work email.");
  });

  it("requires the exact consent checkbox", () => {
    const result = validateBooking({ ...valid, consent: false });
    assert.equal(result.ok, false);
  });
});

describe("booking payload", () => {
  it("matches the proposed schema", () => {
    const fields = validateBooking(valid);
    assert.equal(fields.ok, true);
    if (!fields.ok) return;
    const payload = buildBookingPayload({
      submissionId: "01JEXAMPLEUNIQUEID",
      submittedAt: "2026-11-20T15:00:00Z",
      checkedAt: "2026-11-20T15:00:01Z",
      fields: fields.fields,
      site: "preview",
      referrer: "",
    });
    assert.deepEqual(payload, {
      client_id: "EIP",
      submission_id: "01JEXAMPLEUNIQUEID",
      submitted_at: "2026-11-20T15:00:00Z",
      fields: { name: "Test Person", company: "Example Co", email: "test@example.com", phone: "555-0100" },
      source: {
        channel: "eip360_website_booking_form",
        site: "preview",
        page: "/contact#book",
        referrer: "",
      },
      turnstile: { success: true, checked_at: "2026-11-20T15:00:01Z" },
      consent: { contact_ok: true, text: BOOKING_CONSENT_TEXT },
    });
  });

  it("signs the body with HMAC-SHA256", async () => {
    const signature = await signWebhook("secret", "1700000000", "{\"client_id\":\"EIP\"}");
    assert.match(signature, /^sha256=[0-9a-f]{64}$/);
    const again = await signWebhook("secret", "1700000000", "{\"client_id\":\"EIP\"}");
    assert.equal(signature, again);
    const other = await signWebhook("other", "1700000000", "{\"client_id\":\"EIP\"}");
    assert.notEqual(signature, other);
  });
});

describe("dedupe and preview keys", () => {
  it("treats the same email inside 24 hours as a duplicate", () => {
    const now = Date.parse("2026-11-20T15:00:00Z");
    assert.equal(isDuplicate("2026-11-20T14:00:00Z", now), true);
    assert.equal(isDuplicate("2026-11-19T14:00:00Z", now), false);
    assert.equal(isDuplicate(null, now), false);
  });

  it("uses Turnstile test keys only on preview hosts", () => {
    assert.equal(turnstileKeys({}, "eip360-website.orangerankaiarchitect.workers.dev")?.testKeys, true);
    assert.equal(turnstileKeys({}, "eip360.com"), null);
    assert.equal(isPreviewHost("localhost:3000"), true);
    const real = turnstileKeys({ TURNSTILE_SITE_KEY: "site", TURNSTILE_SECRET_KEY: "secret" }, "eip360.com");
    assert.equal(real?.testKeys, false);
  });
});
