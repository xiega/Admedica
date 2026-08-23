import Link from "next/link";

export default function SzczepankowoPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Nagłówek placówki */}
      <div className="bg-[#21135E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-4">
            NFZ + WIZYTY PRYWATNE
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Admedica Szczepankowo</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Kompleksowe centrum medyczne: lekarze rodzinni oraz specjaliści bez kolejek.
          </p>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg">
            ← Wróć do wyboru placówek
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Sekcja Telefonów (NAPRAWIONE ZAWIJANIE) */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Telefon POZ */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 flex flex-col xl:flex-row items-center xl:justify-between gap-6 text-center xl:text-left">
            <div>
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Rejestracja NFZ (POZ)</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Lekarz rodzinny</h2>
              <p className="text-gray-500 text-sm">Czynne pon-pt: 8:00 - 18:00</p>
            </div>
            <a href="tel:619876543" className="text-2xl sm:text-3xl font-extrabold text-[#21135E] hover:opacity-80 transition bg-blue-50 px-6 py-4 rounded-xl whitespace-nowrap w-full xl:w-auto text-center">
              61 987 65 43
            </a>
          </div>

          {/* Telefon Prywatny */}
          <div className="bg-gradient-to-br from-[#21135E] to-blue-900 rounded-2xl shadow-lg border border-[#21135E] p-6 sm:p-8 flex flex-col xl:flex-row items-center xl:justify-between text-white gap-6 text-center xl:text-left">
            <div>
              <p className="text-sm text-blue-200 uppercase font-bold tracking-wider mb-1">Rejestracja Prywatna</p>
              <h2 className="text-2xl font-bold mb-2">Gabinety Specjalistyczne</h2>
              <p className="text-blue-200 text-sm">Wizyty odpłatne i pakiety</p>
            </div>
            <a href="tel:615554433" className="text-2xl sm:text-3xl font-extrabold text-white hover:text-blue-200 transition bg-white/10 px-6 py-4 rounded-xl border border-white/20 shadow-inner whitespace-nowrap w-full xl:w-auto text-center">
              61 555 44 33
            </a>
          </div>
        </div>

        {/* Nasi Specjaliści - BEZ ZMIAN */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Nasi Specjaliści</h2>
              <p className="text-gray-500 mt-2">Harmonogram przyjęć w gabinetach prywatnych</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lekarz 1 */}
            <div className="border border-gray-100 p-6 rounded-xl bg-gray-50">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">Kardiolog</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">dr n. med. Jan Kowalski</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex justify-between"><span>Wtorek:</span> <span className="font-semibold text-gray-900">15:00 - 19:00</span></p>
                <p className="flex justify-between"><span>Czwartek:</span> <span className="font-semibold text-gray-900">15:00 - 19:00</span></p>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Wykonuje również echo serca.</p>
            </div>

            {/* Lekarz 2 */}
            <div className="border border-gray-100 p-6 rounded-xl bg-gray-50">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">Endokrynolog</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">lek. med. Anna Nowak</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex justify-between"><span>Poniedziałek:</span> <span className="font-semibold text-gray-900">09:00 - 14:00</span></p>
                <p className="flex justify-between"><span>Środa:</span> <span className="font-semibold text-gray-900">14:00 - 18:00</span></p>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Możliwość USG tarczycy na wizycie.</p>
            </div>

            {/* Lekarz 3 */}
            <div className="border border-gray-100 p-6 rounded-xl bg-gray-50">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">Ortopeda</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">lek. med. Piotr Wiśniewski</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex justify-between"><span>Piątek:</span> <span className="font-semibold text-gray-900">15:00 - 20:00</span></p>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Konsultacje dla dorosłych i dzieci od 7 r.ż.</p>
            </div>
          </div>
        </div>

        {/* E-Recepta Formularz - BEZ ZMIAN */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 overflow-hidden mb-12" id="e-recepta">
          <div className="grid md:grid-cols-5">
            {/* Info obok formularza */}
            <div className="md:col-span-2 bg-green-50 p-8 flex flex-col justify-center">
              <span className="text-4xl mb-4">💊</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Zamów e-Receptę</h2>
              <p className="text-gray-700 mb-6 font-medium">
                Szybkie przedłużenie leków stałych bez konieczności wizyty u lekarza.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Tylko dla stałych pacjentów POZ Admedica Szczepankowo.
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Tylko leki zalecone wcześniej przez naszego lekarza.
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Czas realizacji do 48 godzin roboczych.
                </li>
                <li className="flex items-start">
                  <span className="text-[#21135E] mr-2">🔒</span> Dane są w pełni szyfrowane i bezpieczne.
                </li>
              </ul>
            </div>
            
            {/* Właściwy formularz */}
            <div className="md:col-span-3 p-8 lg:p-10">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Imię i Nazwisko</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] focus:border-[#21135E] outline-none transition" placeholder="Jan Kowalski" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PESEL</label>
                    <input type="text" maxLength={11} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] focus:border-[#21135E] outline-none transition" placeholder="00000000000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Numer telefonu (do przysłania kodu z systemu e-zdrowie)</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] focus:border-[#21135E] outline-none transition" placeholder="123 456 789" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nazwy leków i dawkowanie</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] focus:border-[#21135E] outline-none transition resize-none" placeholder="Np. Euthyrox 50 - 2 opakowania, Acard 75 mg - 1 opakowanie..."></textarea>
                  <p className="text-xs text-gray-500 mt-2">Wypisz dokładnie, jakie leki na stałe przyjmujesz i w jakich ilościach.</p>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#21135E] focus:ring-[#21135E]" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">Oświadczam, że zgłaszane leki przyjmuję na stałe z polecenia lekarza, a moje dane osobowe będą przetwarzane w celach medycznych (RODO).</label>
                  </div>
                </div>

                <button type="button" className="w-full bg-[#21135E] text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition shadow-md">
                  Wyślij zamówienie na e-Receptę
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* NOWE: Sekcja dojazdu i pacjenta */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#21135E] rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">📍</span> Jak dojechać?
            </h3>
            <p className="opacity-90 mb-2">Admedica Szczepankowo</p>
            <p className="font-semibold text-lg mb-6">ul. Szczepankowo XX</p>
            <p className="opacity-90 mb-4">61-313 Poznań</p>
            
            <div className="bg-white/10 rounded-lg p-4 mt-6">
              <p className="text-sm font-semibold mb-1">Dojazd MPK:</p>
              <p className="text-sm opacity-90">Autobusy: 154, 431, 432 (przystanek Szczepankowo)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col justify-center">
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Jak zostać naszym pacjentem na NFZ?</h3>
            <p className="text-gray-600 mb-6">
              Aby korzystać z bezpłatnej opieki lekarza rodzinnego w ramach NFZ, wystarczy złożyć deklarację wyboru lekarza i pielęgniarki POZ w naszej rejestracji.
            </p>
            <button className="w-full border-2 border-[#21135E] text-[#21135E] font-bold py-3 rounded-lg hover:bg-[#21135E] hover:text-white transition mt-auto">
              Pobierz wzór deklaracji
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}