import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  LINK_TTL_MS,
  SESSION_COOKIE,
  decryptJson,
  verifySessionValue,
} from "../../src/lib/security";
import { PLACOWKI, isPlacowka } from "../../src/lib/validators";

export const metadata: Metadata = {
  title: "Panel recepcji | Admedica",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ d?: string | string[]; blad?: string | string[] }>;

type Zgloszenie = {
  ts: number;
  placowka: string;
  imie: string;
  pesel: string;
  telefon: string;
  leki: string;
};

function parseZgloszenie(data: unknown): Zgloszenie | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const { ts, placowka, imie, pesel, telefon, leki } = o;
  if (
    typeof ts !== "number" ||
    typeof placowka !== "string" ||
    typeof imie !== "string" ||
    typeof pesel !== "string" ||
    typeof telefon !== "string" ||
    typeof leki !== "string"
  ) {
    return null;
  }
  return { ts, placowka, imie, pesel, telefon, leki };
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#21135E] text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Panel recepcji</h1>
          <p className="text-blue-100 mt-2">Prośby o przedłużenie recept</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">{children}</div>
    </main>
  );
}

function Notice({ tone, children }: { tone: "red" | "amber" | "gray"; children: React.ReactNode }) {
  const styles = {
    red: "bg-red-50 border-red-200 text-red-800",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    gray: "bg-white border-gray-100 text-gray-700",
  }[tone];
  return <div className={`rounded-2xl border p-6 shadow-lg ${styles}`}>{children}</div>;
}

export default async function RecepcjaPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const d = typeof sp.d === "string" ? sp.d : undefined;
  const blad = typeof sp.blad === "string" ? sp.blad : undefined;

  const store = await cookies();
  const loggedIn = verifySessionValue(store.get(SESSION_COOKIE)?.value);

  // 1) Logowanie
  if (!loggedIn) {
    const next = d ? `/recepcja?d=${encodeURIComponent(d)}` : "/recepcja";
    return (
      <Shell>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Zaloguj się</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Dane pacjentów są szyfrowane. Aby je zobaczyć, podaj hasło recepcji.
          </p>
          {blad === "1" && (
            <p className="mb-4 text-sm font-semibold text-red-700">Nieprawidłowe hasło.</p>
          )}
          {blad === "limit" && (
            <p className="mb-4 text-sm font-semibold text-red-700">
              Zbyt wiele prób. Spróbuj ponownie za kilkanaście minut.
            </p>
          )}
          <form method="post" action="/api/recepcja/login" className="space-y-4">
            <input type="hidden" name="next" value={next} />
            <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
              Hasło
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[#21135E] text-white font-bold py-3 rounded-lg hover:bg-[#37237F] transition"
            >
              Zaloguj
            </button>
          </form>
        </div>
      </Shell>
    );
  }

  // 2) Zalogowana recepcja
  if (!d) {
    return (
      <Shell>
        <Notice tone="gray">
          Jesteś zalogowany(-a). Otwórz link z wiadomości e-mail „Nowa prośba o receptę”, aby
          zobaczyć dane pacjenta.
        </Notice>
      </Shell>
    );
  }

  const zgloszenie = parseZgloszenie(decryptJson(d));
  if (!zgloszenie) {
    return (
      <Shell>
        <Notice tone="red">
          Link jest nieprawidłowy lub uszkodzony. Skopiuj go z maila w całości albo poproś
          pacjenta o ponowne wysłanie formularza.
        </Notice>
      </Shell>
    );
  }
  if (Date.now() - zgloszenie.ts > LINK_TTL_MS) {
    return (
      <Shell>
        <Notice tone="amber">
          Ten link wygasł (po {Math.round(LINK_TTL_MS / 86_400_000)} dniach dane nie są już
          pokazywane). Jeśli sprawa jest aktualna, poproś pacjenta o ponowne wysłanie formularza.
        </Notice>
      </Shell>
    );
  }

  const placowka = isPlacowka(zgloszenie.placowka) ? PLACOWKI[zgloszenie.placowka] : "—";
  const received = new Date(zgloszenie.ts).toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
  const telHref = `tel:${zgloszenie.telefon.replace(/[^\d+]/g, "")}`;

  return (
    <Shell>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-block bg-[#21135E]/10 text-[#21135E] px-3 py-1 rounded-full text-sm font-semibold">
            {placowka}
          </span>
          <span className="text-sm text-gray-500">Otrzymano: {received}</span>
        </div>

        <dl className="space-y-5">
          <div>
            <dt className="text-xs uppercase font-bold tracking-wider text-gray-500">Pacjent</dt>
            <dd className="text-xl font-semibold text-gray-900">{zgloszenie.imie}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase font-bold tracking-wider text-gray-500">PESEL</dt>
            <dd className="text-2xl font-mono font-bold text-[#21135E] tracking-wider select-all">
              {zgloszenie.pesel}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase font-bold tracking-wider text-gray-500">Telefon</dt>
            <dd className="text-xl font-semibold">
              <a href={telHref} className="text-[#21135E] hover:underline">
                {zgloszenie.telefon}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase font-bold tracking-wider text-gray-500">
              Leki i dawkowanie
            </dt>
            <dd className="text-gray-900 whitespace-pre-wrap bg-gray-50 border border-gray-100 rounded-lg p-4">
              {zgloszenie.leki}
            </dd>
          </div>
        </dl>

        <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
          Po zrealizowaniu prośby usuń wiadomość e-mail z tym linkiem.
        </p>
      </div>
    </Shell>
  );
}
