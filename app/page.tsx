import Link from "next/link";
import { ArrowRightIcon, CalendarIcon, CheckIcon, HeartIcon, IconBadge, MapPinIcon, PillIcon, StarIcon, TagIcon } from "../src/components/Icons";

export default function Home() {
  return (
    <main className="flex-grow bg-slate-100 py-12 md:py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#21135E] mb-4">
            Witaj w Admedica
          </h1>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Wybierz placówkę, do której chcesz się udać, aby sprawdzić godziny przyjęć i dane kontaktowe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Karta: Bohaterów */}
          <Link href="/bohaterow" className="group block h-full">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col text-left">
              {/* Łagodniejszy hover na pasku zamiast jaskrawego niebieskiego */}
              <div className="h-4 bg-[#21135E] group-hover:bg-[#37237F] transition-colors"></div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#37237F] transition-colors">Admedica Bohaterów</h2>
                <p className="text-slate-600 mb-6 flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 flex-shrink-0 text-[#21135E]" /> Os. Bohaterów II Wojny Światowej
                </p>
                
                <div className="mb-8 flex-grow border-t border-slate-200 pt-5">
                  <p className="text-sm text-slate-600 uppercase tracking-wider font-semibold mb-4">Zakres usług placówki</p>
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
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col text-left">
              <div className="h-4 bg-[#21135E] group-hover:bg-[#37237F] transition-colors"></div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#37237F] transition-colors">Admedica Szczepankowo</h2>
                <p className="text-slate-600 mb-6 flex items-center">
                  <MapPinIcon className="mr-2 h-5 w-5 flex-shrink-0 text-[#21135E]" /> ul. Szczepankowo
                </p>
                
                <div className="mb-8 flex-grow border-t border-slate-200 pt-5">
                  <p className="text-sm text-slate-600 uppercase tracking-wider font-semibold mb-4">Zakres usług placówki</p>
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
                    <li className="flex items-start">
                      <HeartIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-[#21135E]" />
                      Szkoła rodzenia (w ramach NFZ)
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

        {/* Dla pacjenta: recepty wyróżnione kolorem, cennik jako druga, spokojniejsza karta */}
        <div className="max-w-5xl mx-auto mt-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-600">Dla pacjenta</p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/recepty"
              className="group flex flex-col justify-between rounded-2xl bg-[#21135E] p-8 text-white shadow-md transition-colors hover:bg-[#2a1a75]"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <PillIcon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl font-bold">Recepty online</h2>
                <p className="mt-2 text-blue-100">
                  Dla stałych pacjentów – krótki formularz, bez wizyty u lekarza.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-bold">
                Zamów receptę
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/cennik"
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div>
                <IconBadge><TagIcon className="h-6 w-6" /></IconBadge>
                <h2 className="mt-5 text-2xl font-bold text-slate-900">Cennik</h2>
                <p className="mt-2 text-slate-700">
                  Wizyty prywatne, USG, badania laboratoryjne i szczepionki.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#21135E]">
                Zobacz cennik
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}