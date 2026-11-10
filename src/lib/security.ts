// Szyfrowanie zgłoszeń o receptę oraz proste logowanie recepcji.
// Wyłącznie po stronie serwera (używa node:crypto) – nie importuj tego w komponentach "use client".
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

export const SESSION_COOKIE = "recepcja_session";
export const SESSION_TTL_SECONDS = 8 * 60 * 60; // sesja recepcji: 8 godzin
export const LINK_TTL_MS = 14 * 24 * 60 * 60 * 1000; // link z maila ważny 14 dni

/** Klucz szyfrujący: 32 bajty w base64 (zmienna RECEPTA_KEY). */
function getKey(): Buffer {
  const raw = process.env.RECEPTA_KEY;
  if (!raw) throw new Error("Brak zmiennej środowiskowej RECEPTA_KEY");
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("RECEPTA_KEY musi mieć dokładnie 32 bajty zapisane w base64");
  }
  return key;
}

/** Szyfruje obiekt (AES-256-GCM). Wynik: v1.<iv>.<tag>.<szyfrogram>, bezpieczny do wstawienia w URL. */
export function encryptJson(data: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv, { authTagLength: 16 });
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(data), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return [
    "v1",
    iv.toString("base64url"),
    tag.toString("base64url"),
    ciphertext.toString("base64url"),
  ].join(".");
}

/** Odszyfrowuje token. Zwraca null, jeśli token jest uszkodzony lub zmieniony. */
export function decryptJson(token: string): unknown {
  const key = getKey(); // błąd konfiguracji ma być widoczny, nie ukryty jako "zły link"
  try {
    const [version, iv, tag, ct] = token.split(".");
    if (version !== "v1" || !iv || !tag || !ct) return null;
    const tagBuf = Buffer.from(tag, "base64url");
    if (tagBuf.length !== 16) return null;
    const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "base64url"), {
      authTagLength: 16,
    });
    decipher.setAuthTag(tagBuf);
    const plain = Buffer.concat([
      decipher.update(Buffer.from(ct, "base64url")),
      decipher.final(),
    ]);
    return JSON.parse(plain.toString("utf8"));
  } catch {
    return null;
  }
}

// ---------- logowanie recepcji (wspólne hasło + podpisane ciasteczko) ----------

function sign(value: string): string {
  const sessionKey = createHmac("sha256", getKey()).update("recepcja-session").digest();
  return createHmac("sha256", sessionKey).update(value).digest("base64url");
}

export function createSessionValue(): string {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS);
  return `${exp}.${sign(exp)}`;
}

export function verifySessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(exp) > Date.now() / 1000;
}

export function checkPassword(input: string): boolean {
  const expected = process.env.RECEPCJA_PASSWORD;
  if (!expected) return false;
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(input), hash(expected));
}
