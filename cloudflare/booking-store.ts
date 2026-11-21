/**
 * One Durable Object holds preview booking copies.
 * It is provisioned with the Worker, so no separate KV namespace has to be created first.
 */

export type StoredSubmission = {
  payload: unknown;
  email: string;
  stored_at: string;
  webhook: "not_configured" | "sent" | "failed" | "duplicate";
  duplicate_of?: string;
};

type BookingState = {
  storage: {
    get<T>(key: string): Promise<T | undefined>;
    put<T>(key: string, value: T): Promise<void>;
  };
};

export class BookingStore {
  constructor(private state: BookingState) {}

  async fetch(request: Request) {
    const url = new URL(request.url);
    if (url.pathname === "/lookup" && request.method === "GET") {
      const email = url.searchParams.get("email") ?? "";
      const existing = await this.state.storage.get<StoredSubmission>(`email:${email}`);
      return Response.json({ stored_at: existing?.stored_at ?? null, submission_id: submissionIdOf(existing) });
    }
    if (url.pathname === "/save" && request.method === "POST") {
      const body = (await request.json()) as StoredSubmission & { submission_id: string };
      await this.state.storage.put(`sub:${body.submission_id}`, body);
      if (body.webhook !== "duplicate") {
        await this.state.storage.put(`email:${body.email}`, body);
      }
      return Response.json({ ok: true });
    }
    return new Response("Not found", { status: 404 });
  }
}

function submissionIdOf(existing: StoredSubmission | undefined) {
  if (!existing || typeof existing.payload !== "object" || !existing.payload) return null;
  const id = (existing.payload as { submission_id?: unknown }).submission_id;
  return typeof id === "string" ? id : null;
}
