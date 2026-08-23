import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#21135E] mb-4">
            Witaj w Admedica
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wybierz placówkę, do której chcesz się udać, aby sprawdzić godziny przyjęć i dane kontaktowe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Karta: Bohaterów */}
          <Link href="/bohaterow" className="group block h-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col text-left">
              <div className="h-4 bg-[#21135E] group-hover:bg-blue-600 transition-colors"></div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#21135E] transition-colors">Admedica Bohaterów</h2>
                <p className="text-gray-500 mb-6 flex items-center">
                  <span className="mr-2 text-xl">📍</span> Os. Bohaterów II Wojny Światowej
                </p>
                
                {/* Szary boks wypełniający - zamiast telefonu */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 flex-grow">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Zakres usług placówki</p>
                  <ul className="space-y-3 text-gray-700 font-medium">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-0.5">✓</span> 
                      Podstawowa Opieka Zdrowotna (POZ)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-0.5">✓</span> 
                      Lekarz rodzinny
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-0.5">✓</span> 
                      Pediatra i punkty szczepień
                    </li>
                  </ul>
                </div>
                
                {/* Pełny przycisk na dole */}
                <div className="w-full bg-white border-2 border-[#21135E] text-[#21135E] py-3.5 rounded-lg font-bold text-center group-hover:bg-[#21135E] group-hover:text-white transition-colors">
                  Wybieram tę placówkę
                </div>
              </div>
            </div>
          </Link>

          {/* Karta: Szczepankowo */}
          <Link href="/szczepankowo" className="group block h-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col text-left">
              <div className="h-4 bg-[#21135E] group-hover:bg-blue-600 transition-colors"></div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#21135E] transition-colors">Admedica Szczepankowo</h2>
                <p className="text-gray-500 mb-6 flex items-center">
                  <span className="mr-2 text-xl">📍</span> ul. Szczepankowo
                </p>
                
                {/* Szary boks wypełniający - zamiast telefonu */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 flex-grow">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Zakres usług placówki</p>
                  <ul className="space-y-3 text-gray-700 font-medium">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-3 mt-0.5">✓</span> 
                      Podstawowa Opieka Zdrowotna (POZ)
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#21135E] mr-3 mt-0.5 text-lg">⭐</span> 
                      Prywatne Gabinety Specjalistyczne
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#21135E] mr-3 mt-0.5 text-lg">📅</span> 
                      Zapisy i harmonogram prywatny
                    </li>
                  </ul>
                </div>
                
                {/* Pełny przycisk na dole */}
                <div className="w-full bg-white border-2 border-[#21135E] text-[#21135E] py-3.5 rounded-lg font-bold text-center group-hover:bg-[#21135E] group-hover:text-white transition-colors">
                  Wybieram tę placówkę
                </div>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}