"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionValue } from "../../src/lib/security";
import { ustawStatus, usunZgloszenie } from "../../src/lib/store";

// Każda akcja sama sprawdza sesję – nie polegamy na tym, że ktoś "nie zna" adresu.
async function wymagajSesji() {
  const store = await cookies();
  if (!verifySessionValue(store.get(SESSION_COOKIE)?.value)) {
    throw new Error("Brak dostępu");
  }
}

function poprawneId(id: number) {
  if (!Number.isSafeInteger(id) || id < 1) throw new Error("Nieprawidłowe id");
}

export async function oznaczZrealizowana(id: number) {
  await wymagajSesji();
  poprawneId(id);
  await ustawStatus(id, "zrealizowana");
  revalidatePath("/recepcja");
}

export async function przywrocJakoNowa(id: number) {
  await wymagajSesji();
  poprawneId(id);
  await ustawStatus(id, "nowa");
  revalidatePath("/recepcja");
}

export async function usun(id: number) {
  await wymagajSesji();
  poprawneId(id);
  await usunZgloszenie(id);
  revalidatePath("/recepcja");
}

export async function wyloguj() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { path: "/recepcja", maxAge: 0 });
  redirect("/recepcja");
}
