import Link from "next/link";
import { ArrowRightIcon, CalendarIcon, CheckIcon, HeartIcon, IconBadge, MapPinIcon, PillIcon, StarIcon, TagIcon } from "../src/components/Icons";

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
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col text-left">
              {/* Łagodniejszy hover na pasku zamiast jaskrawego niebieskiego */}
              <div className="h-4 bg-[#21135E] group-hover:bg-[#37237F] transition-colors"></div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#37237F] transition-colors">Admedica Bohaterów</h2>
                <p className="text-gray-500 mb-6 flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 flex-shrink-0 text-[#21135E]" /> Os. Bohaterów II Wojny Światowej
                </p>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 flex-grow">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Zakres usług placówki</p>
                  <ul className="space-y-3 text-gray-700 font-medium">
                    <li className="flex items-start">
                      <CheckIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" /> 
                      Podstawowa Opieka Zdrowotna (POZ)
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" /> 
                      Lekarz rodzinny
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" /> 
                      Pediatra i punkty szczepień
                    </li>
                  </ul>
                </div>
                
                {/* Przycisk z eleganckim, spójnym hoverem */}
                <div className="w-full bg-white border-2 border-[#21135E] text-[#21135E] py-3.5 rounded-lg font-bold text-center group-hover:bg-[#37237F] group-hover:border-[#37237F] group-hover:text-white transition-all">
                  Wybieram tę placówkę
                </div>
              </div>
            </div>
          </Link>

          {/* Karta: Szczepankowo */}
          <Link href="/szczepankowo" className="group block h-full">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col text-left">
              <div className="h-4 bg-[#21135E] group-hover:bg-[#37237F] transition-colors"></div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#37237F] transition-colors">Admedica Szczepankowo</h2>
                <p className="text-gray-500 mb-6 flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 flex-shrink-0 text-[#21135E]" /> ul. Szczepankowo
                </p>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 flex-grow">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Zakres usług placówki</p>
                  <ul className="space-y-3 text-gray-700 font-medium">
                    <li className="flex items-start">
                      <CheckIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" /> 
                      Podstawowa Opieka Zdrowotna (POZ)
                    </li>
                    <li className="flex items-start">
                      <StarIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-[#21135E]" /> 
                      Prywatne Gabinety Specjalistyczne
                    </li>
                    <li className="flex items-start">
                      <CalendarIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-[#21135E]" /> 
                      Zapisy i harmonogram prywatny
                    </li>
                  </ul>
                </div>
                
                <div className="w-full bg-white border-2 border-[#21135E] text-[#21135E] py-3.5 rounded-lg font-bold text-center group-hover:bg-[#37237F] group-hover:border-[#37237F] group-hover:text-white transition-all">
                  Wybieram tę placówkę
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Szybki dostęp */}
        <div className="max-w-5xl mx-auto mt-8 space-y-6">
          <Link
            href="/recepty"
            className="group flex flex-col sm:flex-row items-center justify-between gap-5 bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <IconBadge><PillIcon className="h-6 w-6" /></IconBadge>
              <div>
                <p className="text-xl font-bold text-gray-900">Potrzebujesz przedłużyć receptę?</p>
                <p className="text-gray-600">
                  Dla stałych pacjentów – krótki formularz online, bez wizyty u lekarza.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#21135E] text-white font-bold py-3 px-6 rounded-lg whitespace-nowrap group-hover:bg-[#37237F] transition-colors">
              Zamów receptę <ArrowRightIcon className="h-4 w-4" />
            </span>
          </Link>

          <div className="grid sm:grid-cols-2 gap-6">
            <Link
              href="/cennik"
              className="group flex items-center gap-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow"
            >
              <IconBadge><TagIcon className="h-6 w-6" /></IconBadge>
              <div className="flex-grow">
                <p className="text-lg font-bold text-gray-900">Cennik</p>
                <p className="text-gray-600 text-sm">Wizyty prywatne, USG, badania, szczepionki.</p>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-[#21135E] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/szkola-rodzenia"
              className="group flex items-center gap-4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow"
            >
              <IconBadge><HeartIcon className="h-6 w-6" /></IconBadge>
              <div className="flex-grow">
                <p className="text-lg font-bold text-gray-900">Szkoła rodzenia</p>
                <p className="text-gray-600 text-sm">Opieka położnej w ramach NFZ (Szczepankowo).</p>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-[#21135E] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}