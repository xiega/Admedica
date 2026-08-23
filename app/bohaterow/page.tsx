import Link from "next/link";

export default function BohaterowPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Nagłówek placówki */}
      <div className="bg-[#21135E] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-500/20 text-blue-100 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-4">
            TYLKO NFZ
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Admedica Bohaterów</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Podstawowa Opieka Zdrowotna dla Ciebie i Twojej rodziny na Ratajach.
          </p>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg">
            ← Wróć do wyboru placówek
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Główny kontakt (2/3 szerokości) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-100 p-2 rounded-lg mr-3 text-2xl">📞</span> 
              Rejestracja Telefoniczna
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Rejestracja jest czynna od poniedziałku do piątku. Prosimy o przygotowanie numeru PESEL przed wykonaniem połączenia.
            </p>
            
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center mb-8">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Główny numer POZ</p>
              <a href="tel:611234567" className="text-5xl font-extrabold text-[#21135E] hover:opacity-80 transition block">
                61 123 45 67
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Godziny otwarcia przychodni:</h3>
                <ul className="space-y-1 text-gray-600">
                  <li className="flex justify-between border-b border-gray-50 pb-1">
                    <span>Poniedziałek - Piątek</span> <span className="font-semibold text-[#21135E]">8:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between text-gray-400 pt-1">
                    <span>Sobota - Niedziela</span> <span>Nieczynne</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Punkt Pobrań (Badania Krwi):</h3>
                <ul className="space-y-1 text-gray-600">
                  <li className="flex justify-between border-b border-gray-50 pb-1">
                    <span>Wtorek i Czwartek</span> <span className="font-semibold text-red-600">7:30 - 9:30</span>
                  </li>
                  <li className="text-sm mt-2 text-gray-500 italic">
                    *Tylko ze skierowaniem od naszego lekarza POZ.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Informacje dodatkowe (1/3 szerokości) */}
          <div className="space-y-8">
            <div className="bg-[#21135E] rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">📍</span> Jak dojechać?
              </h3>
              <p className="opacity-90 mb-2">Admedica Bohaterów</p>
              <p className="font-semibold text-lg mb-6">os. Bohaterów II Wojny Światowej 29</p>
              <p className="opacity-90 mb-4">61-386 Poznań</p>
              
              <div className="bg-white/10 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold mb-1">Dojazd MPK:</p>
                <p className="text-sm opacity-90">Tramwaje: 1, 7, 12, 13 (przystanek Rondo Starołęka)</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="font-bold text-gray-900 mb-3">Jak zostać naszym pacjentem?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Aby korzystać z bezpłatnej opieki w ramach NFZ, wystarczy złożyć deklarację wyboru lekarza i pielęgniarki POZ w naszej rejestracji.
              </p>
              <button className="w-full border-2 border-[#21135E] text-[#21135E] font-bold py-2 rounded-lg hover:bg-[#21135E] hover:text-white transition">
                Pobierz wzór deklaracji
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}