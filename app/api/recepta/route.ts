import { NextResponse } from "next/server";
import { sendMail } from "../../../src/lib/mail";
import { getClientIp, rateLimit } from "../../../src/lib/rateLimit";
import { encryptJson, LINK_TTL_MS } from "../../../src/lib/security";
import {
  PLACOWKI,
  isPlacowka,
  isValidPesel,
  isValidPhone,
} from "../../../src/lib/validators";

// Dane z formularza NIE są nigdzie zapisywane ani logowane. Serwer szyfruje je i wysyła
// do recepcji maila z samym linkiem; odczyt możliwy tylko po zalogowaniu w /recepcja.

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

const text = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(req: Request) {
  if (!rateLimit(`recepta:${getClientIp(req)}`, 5, 60 * 60 * 1000)) {
    return fail(429, "Zbyt wiele prób. Spróbuj później lub zadzwoń do rejestracji.");
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "Nieprawidłowe dane formularza.");
  }

  // Pułapka na boty: ukryte pole, którego człowiek nie widzi. Udajemy sukces i niczego nie wysyłamy.
  if (text(body.website) !== "") return NextResponse.json({ ok: true });

  // Czas wypełniania mierzony w przeglądarce (nie zależy od zegara serwera).
  const fillTimeMs = Number(body.fillTimeMs);
  if (!(fillTimeMs >= 3000)) {
    return fail(400, "Formularz wysłano zbyt szybko. Sprawdź dane i spróbuj ponownie.");
  }

  const placowka = body.placowka;
  const imie = text(body.imie).trim();
  const pesel = text(body.pesel).replace(/\s/g, "");
  const telefon = text(body.telefon).trim();
  const leki = text(body.leki).trim();

  if (!isPlacowka(placowka)) return fail(422, "Wybierz placówkę.");
  if (imie.length < 3 || imie.length > 100) return fail(422, "Podaj imię i nazwisko.");
  if (!isValidPesel(pesel)) return fail(422, "Numer PESEL jest nieprawidłowy.");
  if (!isValidPhone(telefon)) return fail(422, "Numer telefonu jest nieprawidłowy.");
  if (leki.length < 3 || leki.length > 500) {
    return fail(422, "Podaj nazwy leków i dawkowanie (do 500 znaków).");
  }
  if (body.zgoda !== true) return fail(422, "Zgoda na przetwarzanie danych jest wymagana.");

  const siteUrl = process.env.SITE_URL?.replace(/\/+$/, "");
  const to =
    (placowka === "bohaterow"
      ? process.env.MAIL_TO_BOHATEROW
      : process.env.MAIL_TO_SZCZEPANKOWO) || process.env.MAIL_TO;

  try {
    if (!siteUrl || !to) throw new Error("Brak SITE_URL lub adresu odbiorcy (MAIL_TO)");

    const token = encryptJson({
      v: 1,
      ts: Date.now(),
      placowka,
      imie,
      pesel,
      telefon,
      leki,
    });
    const link = `${siteUrl}/recepcja?d=${token}`;
    const days = Math.round(LINK_TTL_MS / 86_400_000);
    const received = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

    await sendMail({
      to,
      subject: `Nowa prośba o receptę – ${PLACOWKI[placowka]}`,
      text: [
        "Nowa prośba o przedłużenie recepty.",
        `Placówka: ${PLACOWKI[placowka]}`,
        `Otrzymano: ${received}`,
        "",
        "Dane pacjenta są zaszyfrowane i nie ma ich w tej wiadomości.",
        "Aby je zobaczyć, otwórz link i zaloguj się do panelu recepcji:",
        link,
        "",
        `Link jest ważny ${days} dni. Po zrealizowaniu prośby usuń tę wiadomość.`,
      ].join("\n"),
    });
  } catch (err) {
    // Logujemy tylko komunikat błędu – nigdy danych pacjenta.
    console.error("[recepta]", err instanceof Error ? err.message : "nieznany błąd");
    return fail(502, "Nie udało się wysłać zgłoszenia. Zadzwoń do rejestracji.");
  }

  return NextResponse.json({ ok: true });
}
