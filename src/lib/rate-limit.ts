/**
 * In-memory rate limiter for admin login.
 * Keyed by IP address. Resets on cold starts (acceptable for a conference site).
 * Max 5 attempts per 15-minute window → 30-minute lockout.
 */

interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const store = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  lockedUntil?: Date;
} {
  const now = Date.now();
  const rec = store.get(ip);

  if (!rec) return { allowed: true, remainingAttempts: MAX_ATTEMPTS };

  // Currently locked
  if (rec.lockedUntil && now < rec.lockedUntil) {
    return { allowed: false, remainingAttempts: 0, lockedUntil: new Date(rec.lockedUntil) };
  }

  // Window expired — reset
  if (now - rec.firstAttempt > WINDOW_MS) {
    store.delete(ip);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - rec.count);
  return { allowed: rec.count < MAX_ATTEMPTS, remainingAttempts: remaining };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const rec = store.get(ip) ?? { count: 0, firstAttempt: now };
  rec.count += 1;
  if (rec.count >= MAX_ATTEMPTS) rec.lockedUntil = now + LOCKOUT_MS;
  store.set(ip, rec);
}

export function clearAttempts(ip: string): void {
  store.delete(ip);
}
