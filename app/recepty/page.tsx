import type { Metadata } from "next";
import Link from "next/link";
import ReceptaForm from "../../src/components/ReceptaForm";
import { isPlacowka } from "../../src/lib/validators";

export const metadata: Metadata = {
  title: "Recepty online | Admedica",
  description: "Przedłuż receptę na leki stałe bez wizyty u lekarza.",
};

export default async function ReceptyPage({
  searchParams,
}: {
  searchParams: Promise<{ placowka?: string | string[] }>;
}) {
  const sp = await searchParams;
  const wybrana = typeof sp.placowka === "string" ? sp.placowka : undefined;

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#21135E] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Recepty online</h1>
          <p className="text-xl text-blue-100 mb-6">
            Przedłuż receptę na leki stałe bez wizyty u lekarza.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg"
          >
            ← Wróć do strony głównej
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
          <ul className="space-y-2 text-sm text-gray-700 mb-8 bg-green-50 border border-green-100 rounded-xl p-5">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span> Tylko dla stałych pacjentów POZ.
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span> Tylko leki zalecone wcześniej przez
              lekarza.
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔒</span> Dane są szyfrowane i nie są przechowywane na serwerze
              strony.
            </li>
          </ul>

          <ReceptaForm defaultPlacowka={isPlacowka(wybrana) ? wybrana : undefined} />

          <p className="mt-8 text-xs text-gray-500 border-t border-gray-100 pt-4">
            To nie jest formularz na nagłe przypadki. W stanach zagrożenia życia dzwoń pod numer 112.
          </p>
        </div>
      </div>
    </main>
  );
}
