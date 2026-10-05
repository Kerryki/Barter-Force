/**
 * Rate limiting for the contact form.
 *
 * Uses Upstash Redis (REST API, no extra dependency) when UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN are set, so the limit holds across serverless instances.
 * Otherwise falls back to a bounded in-memory map, which only limits per instance.
 */

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 3;
const MAX_TRACKED_IPS = 5000;

const memory = new Map<string, number[]>();

function sweepMemory(now: number): void {
  for (const [ip, times] of memory) {
    const active = times.filter((t) => now - t < WINDOW_SECONDS * 1000);
    if (active.length === 0) memory.delete(ip);
    else memory.set(ip, active);
  }
}

function limitInMemory(ip: string): boolean {
  const now = Date.now();
  if (memory.size >= MAX_TRACKED_IPS) sweepMemory(now);
  if (memory.size >= MAX_TRACKED_IPS) memory.clear(); // still full of live entries: reset rather than grow

  const active = (memory.get(ip) ?? []).filter((t) => now - t < WINDOW_SECONDS * 1000);
  if (active.length >= MAX_REQUESTS) {
    memory.set(ip, active);
    return true;
  }
  memory.set(ip, [...active, now]);
  return false;
}

async function limitWithUpstash(ip: string, url: string, token: string): Promise<boolean> {
  const key = `contact:${ip}`;
  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, WINDOW_SECONDS, 'NX'],
    ]),
  });
  if (!response.ok) throw new Error(`Upstash responded ${response.status}`);
  const [incr] = (await response.json()) as Array<{ result: number }>;
  return incr.result > MAX_REQUESTS;
}

/**
 * Record a request from this client and report whether it exceeds the limit.
 * If the shared store is unreachable it falls back to the in-memory limit instead of failing open.
 */
export async function isRateLimited(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      return await limitWithUpstash(ip, url, token);
    } catch (error) {
      console.error('Rate limit store unavailable, using in-memory limit:', error);
    }
  }
  return limitInMemory(ip);
}

/** Best-effort client IP. Vercel sets x-vercel-forwarded-for itself, so prefer it over client-supplied headers. */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  );
}
