import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default caches are in-memory ("dummy"). No R2 or KV binding, so this fits the Workers free plan.
export default defineCloudflareConfig();
