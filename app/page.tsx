export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* 1. SEKCJA: WYBÓR PLACÓWKI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#21135E] mb-4">
            Wybierz swoją placówkę
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sprawdź dostępność specjalistów i skontaktuj się bezpośrednio z wybranym Centrum Medycznym Admedica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Placówka 1 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-4 bg-[#21135E]"></div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Admedica - Szczepankowo</h2>
              <p className="text-gray-500 mb-6 flex items-center">
                <span className="mr-2 text-xl">📍</span> ul. Szczepankowo 94A, Poznań
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Rejestracja telefoniczna</p>
                <a href="tel:123456789" className="text-4xl font-extrabold text-[#21135E] hover:opacity-80 transition block mb-4">
                  123 456 789
                </a>
                <div className="text-gray-600 text-sm space-y-1">
                  <p><span className="font-medium w-16 inline-block">Pon-Pt:</span> 8:00 - 18:00</p>
                  <p><span className="font-medium w-16 inline-block">Sobota:</span> Nieczynne</p>
                </div>
              </div>
              
              <button className="w-full bg-white border-2 border-[#21135E] text-[#21135E] py-3 rounded-lg font-bold hover:bg-[#21135E] hover:text-white transition">
                Harmonogram przyjęć
              </button>
            </div>
          </div>

          {/* Placówka 2 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-4 bg-[#21135E] opacity-80"></div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Admedica - Oś.Bohaterów</h2>
              <p className="text-gray-500 mb-6 flex items-center">
                <span className="mr-2 text-xl">📍</span> ul. os. Bohaterów II Wojny Światowej 29, Poznań
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Rejestracja telefoniczna</p>
                <a href="tel:987654321" className="text-4xl font-extrabold text-[#21135E] hover:opacity-80 transition block mb-4">
                  987 654 321
                </a>
                <div className="text-gray-600 text-sm space-y-1">
                  <p><span className="font-medium w-16 inline-block">Pon-Pt:</span> 7:00 - 20:00</p>
                  <p><span className="font-medium w-16 inline-block">Sobota:</span> 8:00 - 14:00</p>
                </div>
              </div>
              
              <button className="w-full bg-white border-2 border-[#21135E] text-[#21135E] py-3 rounded-lg font-bold hover:bg-[#21135E] hover:text-white transition">
                Harmonogram przyjęć
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEKCJA: NASZE USŁUGI (Nowość!) */}
      <section id="uslugi" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Nasze Usługi
            </h2>
            <div className="w-24 h-1 bg-[#21135E] mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Zapewniamy szeroki zakres opieki medycznej, od podstawowej opieki zdrowotnej po zaawansowaną diagnostykę i leczenie specjalistyczne.
            </p>
          </div>

          {/* Siatka usług (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Kafelek 1 */}
            <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50 group">
              <div className="text-4xl mb-4">🦷</div>
              <h3 className="text-xl font-bold text-[#21135E] mb-2 group-hover:text-blue-600 transition-colors">Stomatologia</h3>
              <p className="text-gray-600">Pełen zakres leczenia zachowawczego, protetyki, chirurgii oraz stomatologii estetycznej.</p>
            </div>

            {/* Kafelek 2 */}
            <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50 group">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-[#21135E] mb-2 group-hover:text-blue-600 transition-colors">Kardiologia</h3>
              <p className="text-gray-600">Konsultacje kardiologiczne, echo serca, Holter EKG i ciśnieniowy, próby wysiłkowe.</p>
            </div>

            {/* Kafelek 3 */}
            <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50 group">
              <div className="text-4xl mb-4">🩺</div>
              <h3 className="text-xl font-bold text-[#21135E] mb-2 group-hover:text-blue-600 transition-colors">Lekarz Rodzinny (POZ)</h3>
              <p className="text-gray-600">Podstawowa opieka zdrowotna dla dorosłych i dzieci, szczepienia i bilanse zdrowia.</p>
            </div>

            {/* Kafelek 4 */}
            <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50 group">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="text-xl font-bold text-[#21135E] mb-2 group-hover:text-blue-600 transition-colors">Pediatria</h3>
              <p className="text-gray-600">Opieka nad najmłodszymi pacjentami, diagnostyka i leczenie chorób dziecięcych.</p>
            </div>

            {/* Kafelek 5 */}
            <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50 group">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-[#21135E] mb-2 group-hover:text-blue-600 transition-colors">Pakiety Badań</h3>
              <p className="text-gray-600">Kompleksowe pakiety profilaktyczne (np. panel tarczycowy, pakiet dla seniora) w promocyjnych cenach.</p>
            </div>

            {/* Kafelek 6 */}
            <div className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50 group">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-[#21135E] mb-2 group-hover:text-blue-600 transition-colors">Medycyna Pracy</h3>
              <p className="text-gray-600">Badania wstępne, okresowe i kontrolne dla pracowników wszystkich branż.</p>
            </div>

          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-transparent border-2 border-[#21135E] text-[#21135E] font-bold px-8 py-3 rounded-full hover:bg-[#21135E] hover:text-white transition">
              Zobacz pełen wykaz usług
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}