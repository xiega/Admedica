import type { Metadata } from "next";
import Link from "next/link";
import { cennik, pliki } from "../../src/data/cennik";
import { ArrowLeftIcon, DownloadIcon, FileTextIcon } from "../../src/components/Icons";

export const metadata: Metadata = {
  title: "Cennik | Admedica",
  description: "Cennik wizyt prywatnych, USG, badań laboratoryjnych i szczepionek.",
};

export default function CennikPage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-20">
      <div className="bg-gradient-to-b from-[#21135E] to-[#33218a] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Cennik</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            Wizyty prywatne, USG, badania laboratoryjne i szczepionki.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Wróć do strony głównej
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 space-y-8">
        {/* Pliki PDF */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cenniki do pobrania (PDF)</h2>
          <p className="text-slate-700 mb-5 text-sm">Pełne listy badań laboratoryjnych i szczepionek.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {pliki.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border-2 border-[#21135E] text-[#21135E] font-bold py-3 px-5 rounded-lg hover:bg-[#21135E] hover:text-white transition"
              >
                <span className="inline-flex items-center gap-2"><FileTextIcon className="h-5 w-5" /> {p.nazwa}</span>
                <DownloadIcon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </section>

        {/* Konsultacje i usługi */}
        <div className="grid md:grid-cols-2 gap-6">
          {cennik.map((s) => (
            <section
              key={s.tytul}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col"
            >
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">
                {s.tytul}
              </h2>
              <ul className="divide-y divide-gray-100">
                {s.pozycje.map((p) => (
                  <li key={p.nazwa} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="text-gray-800">
                      {p.nazwa}
                      {p.uwaga && <span className="block text-xs text-slate-600">{p.uwaga}</span>}
                    </span>
                    <span className="font-bold text-[#21135E] whitespace-nowrap">{p.cena} zł</span>
                  </li>
                ))}
              </ul>
              {s.opis && <p className="text-xs text-slate-600 italic mt-3">{s.opis}</p>}
            </section>
          ))}
        </div>

        <p className="text-center text-sm text-slate-600">
          Rejestracja prywatna: <a href="tel:618751908" className="font-semibold text-[#21135E]">61 875 19 08</a>.
          Aktualność cen potwierdzaj w rejestracji.
        </p>
      </div>
    </main>
  );
}
