import { NextResponse } from "next/server";
import { sendMail } from "../../../src/lib/mail";
import { getClientIp, rateLimit } from "../../../src/lib/rateLimit";
import { encryptJson, LINK_TTL_MS } from "../../../src/lib/security";
import { dbEnabled, zapiszZgloszenie } from "../../../src/lib/store";
import {
  PLACOWKI,
  isPlacowka,
  isValidPesel,
  isValidPhone,
} from "../../../src/lib/validators";

// Dwa tryby:
//  1) z bazą (RECEPTY_API_URL ustawione): zaszyfrowane zgłoszenie trafia do bazy, a mail (opcjonalny)
//     jest tylko powiadomieniem bez danych pacjenta,
//  2) bez bazy: mail do recepcji z zaszyfrowanym linkiem (tak jak wcześniej).
// W obu trybach PESEL i leki nigdy nie są zapisywane ani logowane jawnym tekstem.

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

  // Pułapka na boty: ukryte pole, którego człowiek nie widzi. Udajemy sukces i niczego nie zapisujemy.
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
  const received = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

  try {
    const token = encryptJson({ v: 1, ts: Date.now(), placowka, imie, pesel, telefon, leki });

    if (dbEnabled()) {
      // Zapis do bazy jest najważniejszy – jeśli się nie uda, pacjent dostaje błąd.
      await zapiszZgloszenie(token, placowka);

      // Powiadomienie mailowe jest dodatkiem: jego awaria nie unieważnia zapisanego zgłoszenia.
      if (siteUrl && to) {
        try {
          await sendMail({
            to,
            subject: `Nowa prośba o receptę – ${PLACOWKI[placowka]}`,
            text: [
              "Nowa prośba o przedłużenie recepty.",
              `Placówka: ${PLACOWKI[placowka]}`,
              `Otrzymano: ${received}`,
              "",
              "Dane pacjenta nie są w tej wiadomości. Zaloguj się do panelu recepcji:",
              `${siteUrl}/recepcja`,
            ].join("\n"),
          });
        } catch (err) {
          console.error("[recepta] powiadomienie e-mail:", err instanceof Error ? err.message : "błąd");
        }
      }
    } else {
      if (!siteUrl || !to) throw new Error("Brak SITE_URL lub adresu odbiorcy (MAIL_TO)");
      const days = Math.round(LINK_TTL_MS / 86_400_000);
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
          `${siteUrl}/recepcja?d=${token}`,
          "",
          `Link jest ważny ${days} dni. Po zrealizowaniu prośby usuń tę wiadomość.`,
        ].join("\n"),
      });
    }
  } catch (err) {
    // Logujemy tylko komunikat błędu – nigdy danych pacjenta.
    console.error("[recepta]", err instanceof Error ? err.message : "nieznany błąd");
    return fail(502, "Nie udało się wysłać zgłoszenia. Zadzwoń do rejestracji.");
  }

  return NextResponse.json({ ok: true });
}
