import { getClientIp, rateLimit } from "../../../../src/lib/rateLimit";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  checkPassword,
  createSessionValue,
} from "../../../../src/lib/security";

// Przekierowanie wolno wykonać tylko z powrotem do panelu recepcji (z zachowaniem ?d=...).
function safeNext(raw: string): string {
  if (raw.length > 4000 || /[\r\n]/.test(raw)) return "/recepcja";
  if (raw === "/recepcja" || raw.startsWith("/recepcja?")) return raw;
  return "/recepcja";
}

function withParam(path: string, key: string, value: string): string {
  const url = new URL(path, "http://localhost");
  url.searchParams.set(key, value);
  return url.pathname + url.search;
}

function redirect(location: string, extraHeaders?: [string, string]) {
  const headers = new Headers({ Location: location, "Cache-Control": "no-store" });
  if (extraHeaders) headers.append(extraHeaders[0], extraHeaders[1]);
  return new Response(null, { status: 303, headers });
}

export async function POST(req: Request) {
  let password = "";
  let next = "/recepcja";
  try {
    const form = await req.formData();
    password = String(form.get("password") ?? "");
    next = safeNext(String(form.get("next") ?? "/recepcja"));
  } catch {
    return redirect("/recepcja");
  }

  if (!rateLimit(`login:${getClientIp(req)}`, 10, 15 * 60 * 1000)) {
    return redirect(withParam(next, "blad", "limit"));
  }
  if (!checkPassword(password)) {
    return redirect(withParam(next, "blad", "1"));
  }

  // Lax (nie Strict), bo recepcja wchodzi na stronę kliknięciem w link z poczty.
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const cookie =
    `${SESSION_COOKIE}=${createSessionValue()}; Path=/recepcja; ` +
    `Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; SameSite=Lax${secure}`;
  return redirect(next, ["Set-Cookie", cookie]);
}
