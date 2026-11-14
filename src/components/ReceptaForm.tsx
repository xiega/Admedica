"use client";

import { useEffect, useRef, useState } from "react";
import { isValidPesel, isValidPhone, type PlacowkaId } from "../lib/validators";
import { CheckCircleIcon } from "./Icons";

type Status = "idle" | "sending" | "sent";
type Field = "placowka" | "imie" | "pesel" | "telefon" | "leki" | "zgoda";
type Errors = Partial<Record<Field, string>>;

const PLACOWKI_OPCJE: { id: PlacowkaId; nazwa: string; adres: string }[] = [
  { id: "szczepankowo", nazwa: "Admedica Szczepankowo", adres: "ul. Szczepankowo 94a" },
  { id: "bohaterow", nazwa: "Admedica Bohaterów", adres: "os. Bohaterów II Wojny Światowej 29" },
];

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#21135E] outline-none transition";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

// Adres skryptu PHP na serwerze. Domyślnie ta sama domena co strona (ścieżka względna), więc po wgraniu
// eksportu i katalogu api-recepty na ten sam serwer nic nie trzeba ustawiać. Na Vercelu (inna domena)
// ustaw NEXT_PUBLIC_RECEPTY_ENDPOINT na pełny adres, np. https://twoja-domena.pl/api-recepty/recepty.php
const ENDPOINT = process.env.NEXT_PUBLIC_RECEPTY_ENDPOINT || "/api-recepty/recepty.php";

export default function ReceptaForm() {
  const [placowka, setPlacowka] = useState<PlacowkaId | "">("");

  // Wstępny wybór placówki z adresu (?placowka=...). Czytamy w przeglądarce, bo strona jest statyczna.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("placowka");
    if (p === "bohaterow" || p === "szczepankowo") setPlacowka(p);
  }, []);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Czas od otwarcia formularza – prosty sygnał, że wypełnia go człowiek, a nie bot.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const imie = String(data.get("imie") ?? "").trim();
    const pesel = String(data.get("pesel") ?? "").replace(/\s/g, "");
    const telefon = String(data.get("telefon") ?? "").trim();
    const leki = String(data.get("leki") ?? "").trim();
    const zgoda = data.get("zgoda") === "on";

    const next: Errors = {};
    if (!placowka) next.placowka = "Wybierz placówkę.";
    if (imie.length < 3) next.imie = "Podaj imię i nazwisko.";
    if (!isValidPesel(pesel)) next.pesel = "Numer PESEL jest nieprawidłowy (11 cyfr).";
    if (!isValidPhone(telefon)) next.telefon = "Podaj poprawny numer telefonu.";
    if (leki.length < 3) next.leki = "Wpisz nazwy leków i dawkowanie.";
    if (!zgoda) next.zgoda = "Zgoda jest wymagana, aby wysłać zgłoszenie.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placowka,
          imie,
          pesel,
          telefon,
          leki,
          zgoda,
          website: String(data.get("website") ?? ""),
          fillTimeMs: Date.now() - openedAt.current,
        }),
      });
      const json: { ok?: boolean; error?: string } | null = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setServerError(json?.error ?? "Nie udało się wysłać zgłoszenia. Zadzwoń do rejestracji.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setServerError("Brak połączenia z serwerem. Spróbuj ponownie lub zadzwoń do rejestracji.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircleIcon className="mx-auto mb-4 h-14 w-14 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Zgłoszenie wysłane</h2>
        <p className="text-slate-700 max-w-md mx-auto">
          Prośba o receptę trafiła do recepcji. Jeśli będzie potrzebny kontakt, zadzwonimy na
          podany numer telefonu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="block text-sm font-semibold text-gray-700 mb-2">Placówka</legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {PLACOWKI_OPCJE.map((o) => (
            <label
              key={o.id}
              className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                placowka === o.id
                  ? "border-[#21135E] bg-[#21135E]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="placowka"
                value={o.id}
                checked={placowka === o.id}
                onChange={() => setPlacowka(o.id)}
                className="sr-only"
              />
              <span className="block font-bold text-gray-900">{o.nazwa}</span>
              <span className="block text-sm text-slate-600">{o.adres}</span>
            </label>
          ))}
        </div>
        <FieldError message={errors.placowka} />
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="imie" className="block text-sm font-semibold text-gray-700 mb-2">
            Imię i nazwisko
          </label>
          <input
            id="imie"
            name="imie"
            type="text"
            autoComplete="name"
            maxLength={100}
            aria-invalid={!!errors.imie}
            className={inputClass}
            placeholder="Jan Kowalski"
          />
          <FieldError message={errors.imie} />
        </div>
        <div>
          <label htmlFor="pesel" className="block text-sm font-semibold text-gray-700 mb-2">
            PESEL
          </label>
          <input
            id="pesel"
            name="pesel"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={11}
            aria-invalid={!!errors.pesel}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            className={inputClass}
            placeholder="00000000000"
          />
          <FieldError message={errors.pesel} />
        </div>
      </div>

      <div>
        <label htmlFor="telefon" className="block text-sm font-semibold text-gray-700 mb-2">
          Numer telefonu
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          autoComplete="tel"
          maxLength={20}
          aria-invalid={!!errors.telefon}
          className={inputClass}
          placeholder="600 700 800"
        />
        <FieldError message={errors.telefon} />
      </div>

      <div>
        <label htmlFor="leki" className="block text-sm font-semibold text-gray-700 mb-2">
          Nazwy leków i dawkowanie
        </label>
        <textarea
          id="leki"
          name="leki"
          rows={4}
          maxLength={500}
          aria-invalid={!!errors.leki}
          className={`${inputClass} resize-none`}
          placeholder="Np. Euthyrox 50 – 1 tabletka rano"
        />
        <FieldError message={errors.leki} />
      </div>

      {/* Pole-pułapka na boty: niewidoczne dla ludzi, musi zostać puste. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Nie wypełniaj tego pola</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-start">
          <input
            id="zgoda"
            name="zgoda"
            type="checkbox"
            className="w-4 h-4 mt-1 rounded border-gray-300 text-[#21135E] focus:ring-[#21135E]"
          />
          <label htmlFor="zgoda" className="ml-3 text-xs text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">* Wyrażam zgodę</span> na przetwarzanie
            moich danych osobowych, w tym szczególnych kategorii danych dotyczących zdrowia
            (PESEL, nazwy leków), przez Centrum Medyczne Admedica w celu wystawienia e-recepty.
            Dane są szyfrowane i przekazywane do recepcji; strona internetowa ich nie przechowuje.
            Zostałem(-am) poinformowany(-a) o dobrowolności podania danych oraz prawie dostępu do
            ich treści i ich poprawiania.
          </label>
        </div>
        <FieldError message={errors.zgoda} />
      </div>

      {serverError && (
        <p role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#21135E] text-white font-bold py-4 rounded-lg hover:bg-[#37237F] transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Wysyłanie…" : "Wyślij prośbę o receptę"}
      </button>
    </form>
  );
}
