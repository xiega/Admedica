// Prosty limiter w pamięci procesu. Chroni przed zasypywaniem formularza i zgadywaniem hasła.
// Uwaga: na hostingu "serverless" każda instancja ma własną pamięć, więc to ochrona podstawowa.

const buckets = new Map<string, { count: number; resetAt: number }>();

/** Zwraca true, jeśli żądanie mieści się w limicie. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= max;
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
