// Klient API recept (php-api/recepty.php na serwerze z MySQL). Wyłącznie po stronie serwera.
// Do bazy trafia tylko szyfrogram – klucz (RECEPTA_KEY) nigdy nie opuszcza tej aplikacji.

export type Rekord = {
  id: number;
  created_at: string;
  placowka: string;
  status: "nowa" | "zrealizowana";
  done_at: string | null;
  dane: string;
};

export function dbEnabled(): boolean {
  return Boolean(process.env.RECEPTY_API_URL && process.env.RECEPTY_API_TOKEN);
}

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const url = process.env.RECEPTY_API_URL;
  const token = process.env.RECEPTY_API_TOKEN;
  if (!url || !token) throw new Error("Brak RECEPTY_API_URL / RECEPTY_API_TOKEN");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Api-Token": token },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const json = (await res.json().catch(() => null)) as ({ ok?: boolean } & T) | null;
  if (!res.ok || !json?.ok) throw new Error(`API recept zwróciło błąd (HTTP ${res.status})`);
  return json;
}

export async function zapiszZgloszenie(dane: string, placowka: string): Promise<void> {
  await call({ action: "create", dane, placowka });
}

export async function pobierzZgloszenia(): Promise<Rekord[]> {
  const r = await call<{ items: Rekord[] }>({ action: "list" });
  return r.items.map((i) => ({ ...i, id: Number(i.id) }));
}

export async function ustawStatus(id: number, status: "nowa" | "zrealizowana"): Promise<void> {
  await call({ action: "mark", id, status });
}

export async function usunZgloszenie(id: number): Promise<void> {
  await call({ action: "delete", id });
}
