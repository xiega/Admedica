// Walidacja używana zarówno w formularzu (przeglądarka), jak i na serwerze.

/** PESEL: 11 cyfr + poprawna cyfra kontrolna. */
export function isValidPesel(value: string): boolean {
  if (!/^\d{11}$/.test(value)) return false;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const sum = weights.reduce((acc, w, i) => acc + w * Number(value[i]), 0);
  return (10 - (sum % 10)) % 10 === Number(value[10]);
}

/** Telefon: dopuszczamy spacje, myślniki, nawiasy i +; razem 9–15 cyfr. */
export function isValidPhone(value: string): boolean {
  if (!/^[\d\s+\-()]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export const PLACOWKI = {
  bohaterow: "Admedica Bohaterów",
  szczepankowo: "Admedica Szczepankowo",
} as const;

export type PlacowkaId = keyof typeof PLACOWKI;

export function isPlacowka(value: unknown): value is PlacowkaId {
  return typeof value === "string" && Object.hasOwn(PLACOWKI, value);
}
