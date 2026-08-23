"use client";
import { useState } from "react";
import Link from "next/link";

export default function SzczepankowoPage() {
  const [activeTab, setActiveTab] = useState('poz');

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
            Kompleksowe centrum medyczne na ul. Szczepankowo 94a.
          </p>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg">
            ← Wróć do wyboru placówek
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* ZAKŁADKI DO PRZEŁĄCZANIA WIDOKU */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('poz')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
              activeTab === 'poz' 
                ? 'bg-white text-[#21135E] ring-4 ring-[#21135E]/20 scale-105' 
                : 'bg-gray-200 text-gray-600 hover:bg-white'
            }`}
          >
            🩺 Podstawowa Opieka (POZ)
          </button>
          
          <button 
            onClick={() => setActiveTab('prywatnie')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
              activeTab === 'prywatnie' 
                ? 'bg-[#21135E] text-white ring-4 ring-[#21135E]/30 scale-105' 
                : 'bg-gray-200 text-gray-600 hover:bg-white'
            }`}
          >
            ⭐ Specjaliści Prywatnie
          </button>
        </div>

        {/* ========================================= */}
        {/* WIDOK: PODSTAWOWA OPIEKA ZDROWOTNA (POZ)  */}
        {/* ========================================= */}
        {activeTab === 'poz' && (
          <div className="animate-fade-in space-y-12">
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col xl:flex-row items-center xl:justify-between gap-6 text-center xl:text-left min-h-[160px]">
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Rejestracja NFZ</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Lekarz rodzinny i Pediatra</h2>
                <p className="text-gray-500 text-sm">Czynne pon-pt: 8:00 - 18:00</p>
              </div>
              <a href="tel:618751908" className="text-2xl sm:text-3xl font-extrabold text-[#21135E] hover:opacity-80 transition bg-blue-50 px-8 py-4 rounded-xl whitespace-nowrap">
                61 875 19 08
              </a>
            </div>

            {/* Punkt Pobrań Krwi - Laboratorium */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="text-3xl">🩸</span>
                  <h2 className="text-2xl font-bold text-gray-900">Punkt Pobrań i Laboratorium</h2>
                </div>
                <p className="text-gray-600 mb-6">Badania krwi i moczu w ramach NFZ oraz prywatnie.</p>
                
                <div className="bg-gray-50 rounded-xl p-4 inline-block mb-6 text-left border border-gray-100">
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Godziny pobierania materiału</p>
                  <p className="text-gray-800"><span className="font-semibold text-[#21135E]">Wtorki i Czwartki:</span> 7:30 - 10:30</p>
                  <p className="text-xs text-gray-500 mt-1 italic">*Pobrania nie wymagają wcześniejszej rejestracji.</p>
                </div>
                
                <div className="block">
                  <a href="/cennik-diagnostyka.pdf" target="_blank" className="inline-block border-2 border-[#21135E] text-[#21135E] font-bold py-2.5 px-6 rounded-lg hover:bg-[#21135E] hover:text-white transition">
                    Cennik badań prywatnych (PDF)
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/3 flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-4">Współpracujemy z:</p>
                <img 
                  src="/images/diagnostyka.png" 
                  alt="Diagnostyka Logo" 
                  className="h-20 object-contain"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nasi Lekarze POZ</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "lek. med. Aneta Piłat-Goławska",
                  "lek. med. Magdalena Nowacka",
                  "lek. med. Danuta Ziemkowska",
                  "lek. med. Maria Wosik",
                  "lek. med. Jakub Kisiel"
                ].map((lekarz, i) => (
                  <div key={i} className="border border-gray-100 p-5 rounded-xl bg-gray-50 flex items-center h-full">
                    <div className="text-3xl mr-4">🧑‍⚕️</div>
                    <div>
                      <p className="text-sm text-blue-600 font-bold mb-1">Lekarz POZ</p>
                      <p className="font-semibold text-gray-900 leading-tight">{lekarz}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E-Recepta Formularz z rozbudowaną klauzulą RODO */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 overflow-hidden" id="e-recepta">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-green-50 p-8 flex flex-col justify-center">
                  <span className="text-4xl mb-4">💊</span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Zamów e-Receptę</h2>
                  <p className="text-gray-700 mb-6 font-medium">Szybkie przedłużenie leków stałych bez konieczności wizyty u lekarza.</p>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Tylko dla stałych pacjentów POZ.</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2">✓</span> Tylko leki zalecone wcześniej.</li>
                    <li className="flex items-start"><span className="text-[#21135E] mr-2">🔒</span> Szyfrowane i bezpieczne (RODO).</li>
                  </ul>
                </div>
                
                <div className="md:col-span-3 p-8 lg:p-10">
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Imię i Nazwisko</label>
                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] outline-none transition" placeholder="Jan Kowalski" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">PESEL</label>
                        <input type="text" maxLength={11} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] outline-none transition" placeholder="00000000000" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Numer telefonu</label>
                      <input type="tel" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] outline-none transition" placeholder="123 456 789" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nazwy leków i dawkowanie</label>
                      <textarea rows={4} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21135E] outline-none transition resize-none" placeholder="Np. Euthyrox 50..."></textarea>
                    </div>

                    {/* Profesjonalne zgody RODO i oświadczenia medyczne */}
                    <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="flex items-start">
                        <div className="flex items-center h-5 mt-0.5">
                          <input id="rodo-1" type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-[#21135E] focus:ring-[#21135E]" />
                        </div>
                        <label htmlFor="rodo-1" className="ml-3 text-xs text-gray-700 leading-relaxed">
                          <span className="font-semibold text-gray-900">* Wyrażam zgodę</span> na przetwarzanie moich danych osobowych, w tym szczególnych kategorii danych dotyczących zdrowia (PESEL, historia leczenia, zapotrzebowanie na leki), przez Centrum Medyczne Admedica w celu wystawienia e-recepty. Zostałem(-am) poinformowany(-a) o dobrowolności podania danych oraz prawie dostępu do ich treści i ich poprawiania.
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-[#21135E] text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition shadow-md">
                      Wyślij zamówienie na e-Receptę
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================= */}
        {/* WIDOK: SPECJALIŚCI (PRYWATNIE)            */}
        {/* ========================================= */}
        {activeTab === 'prywatnie' && (
          <div className="animate-fade-in space-y-12">
            
            <div className="bg-gradient-to-br from-[#21135E] to-blue-900 rounded-2xl shadow-lg border border-[#21135E] p-8 flex flex-col xl:flex-row items-center xl:justify-between text-white gap-6 text-center xl:text-left min-h-[160px]">
              <div>
                <h2 className="text-2xl font-bold mb-2">Jak umówić wizytę prywatną?</h2>
                <p className="text-blue-200 text-sm max-w-xl">
                  Rejestracja do lekarzy specjalistów odbywa się wyłącznie telefonicznie. Zadzwoń, aby sprawdzić dostępne terminy.
                </p>
              </div>
              <a href="tel:618751908" className="text-2xl sm:text-3xl font-extrabold text-[#21135E] hover:opacity-90 transition bg-white px-8 py-4 rounded-xl whitespace-nowrap shadow-xl">
                📞 61 875 19 08
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition flex flex-col h-full">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Kardiologia</p>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">dr n. med. Wioletta Sacharczuk</h3>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">dr n. med. Piotr Lehmann</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mt-auto">
                  <p className="flex justify-between font-semibold border-b border-gray-200 pb-2 mb-2">
                    <span>Konsultacja:</span> <span>od 200 zł</span>
                  </p>
                  <p>Wtorki i Czwartki (po południu)</p>
                  <p className="text-xs text-gray-500 mt-1 italic">Możliwość wykonania echa serca.</p>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition flex flex-col h-full">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Endokrynologia</p>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">dr Karolina Hoffmann</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mt-auto">
                  <p className="flex justify-between font-semibold border-b border-gray-200 pb-2 mb-2">
                    <span>Konsultacja:</span> <span>od 220 zł</span>
                  </p>
                  <p>Poniedziałki: 09:00 - 14:00</p>
                  <p>Środy: 14:00 - 18:00</p>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition flex flex-col h-full">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Ortopedia</p>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">lek. med. Tomasz Jaszczak</h3>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">dr Radosław Pietrasik</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mt-auto">
                  <p className="flex justify-between font-semibold border-b border-gray-200 pb-2 mb-2">
                    <span>Konsultacja:</span> <span>od 200 zł</span>
                  </p>
                  <p>Piątki: 15:00 - 20:00</p>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition flex flex-col h-full">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Neurologia</p>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">dr Agnieszka Hellmann</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mt-auto">
                  <p className="flex justify-between font-semibold border-b border-gray-200 pb-2 mb-2">
                    <span>Konsultacja:</span> <span>od 230 zł</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic">Kontakt tel. w celu ustalenia terminu.</p>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition flex flex-col h-full">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Ginekologia</p>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">dr Katarzyna Bojanowska</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mt-auto">
                  <p className="flex justify-between font-semibold border-b border-gray-200 pb-2 mb-2">
                    <span>Konsultacja:</span> <span>od 250 zł</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic">Wizyta z możliwością badań USG.</p>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-2xl bg-[#21135E] shadow-sm hover:shadow-lg transition flex flex-col justify-center items-center text-center h-full">
                <h3 className="text-xl font-bold text-white mb-2">I wielu innych...</h3>
                <p className="text-blue-200 text-sm mb-4">Dermatolodzy, radiolodzy, urolodzy, dietetycy.</p>
                <a href="tel:618751908" className="px-6 py-2 bg-white text-[#21135E] font-bold rounded-lg text-sm">
                  Zadzwoń i zapytaj
                </a>
              </div>

            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* WSPÓLNA STOPKA Z DOJAZDEM I DEKLARACJĄ   */}
        {/* ========================================= */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          
          <div className="bg-[#21135E] rounded-2xl shadow-lg p-8 text-white flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center"><span className="text-2xl mr-2">📍</span> Jak dojechać?</h3>
            <p className="opacity-90 mb-2">Admedica Szczepankowo</p>
            <p className="font-semibold text-lg mb-6">ul. Szczepankowo 94a</p>
            <p className="opacity-90 mb-4">61-306 Poznań</p>
            <div className="bg-white/10 rounded-lg p-4 mt-auto">
              <p className="text-sm font-semibold mb-1">Dojazd MPK:</p>
              <p className="text-sm opacity-90">Autobusy: 154, 431, 432 (przystanek Szczepankowo)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col justify-center h-full">
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