import { kv } from "@vercel/kv";

// Web-Push subscription as produced by PushManager.subscribe()
export type StoredSubscription = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  createdAt: number;
};

const SET_KEY = "riddim:push:endpoints";
const HASH_PREFIX = "riddim:push:sub:";

// Check once whether KV is wired up. @vercel/kv reads these at runtime.
function kvEnabled() {
  return (
    !!process.env.KV_REST_API_URL &&
    !!process.env.KV_REST_API_TOKEN
  );
}

// In-memory fallback so the endpoints still respond in demo mode when KV
// isn't provisioned yet. Lost across cold starts — do not rely on it for
// production push delivery.
const memory = new Map<string, StoredSubscription>();

function idFor(endpoint: string) {
  // A short, stable id — just a hash-like substring of the endpoint path.
  return Buffer.from(endpoint).toString("base64url").slice(-40);
}

export async function saveSubscription(sub: StoredSubscription) {
  const id = idFor(sub.endpoint);
  if (kvEnabled()) {
    await kv.hset(HASH_PREFIX + id, sub as unknown as Record<string, unknown>);
    await kv.sadd(SET_KEY, id);
  } else {
    memory.set(id, sub);
  }
  return { id, persisted: kvEnabled() };
}

export async function removeSubscription(endpoint: string) {
  const id = idFor(endpoint);
  if (kvEnabled()) {
    await kv.del(HASH_PREFIX + id);
    await kv.srem(SET_KEY, id);
  } else {
    memory.delete(id);
  }
  return { id };
}

export async function listSubscriptions(): Promise<StoredSubscription[]> {
  if (kvEnabled()) {
    const ids = (await kv.smembers(SET_KEY)) as string[];
    const subs = await Promise.all(
      ids.map(async (id) => {
        const s = await kv.hgetall<StoredSubscription>(HASH_PREFIX + id);
        return s ?? null;
      }),
    );
    return subs.filter(Boolean) as StoredSubscription[];
  }
  return [...memory.values()];
}

export function storeMode() {
  return kvEnabled() ? "kv" : "memory";
}
