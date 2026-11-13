import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon, MailIcon, PhoneIcon } from "../../src/components/Icons";

export const metadata: Metadata = {
  title: "Szkoła rodzenia | Admedica Szczepankowo",
  description:
    "Szkoła rodzenia w Admedica Szczepankowo: opieka położnej od 21. tygodnia ciąży do 2. miesiąca życia dziecka, w ramach NFZ.",
};

const zalety = [
  "Opieka położnej od 21. tygodnia ciąży aż do 2. miesiąca życia dziecka. Działamy we współpracy z NFZ, więc nie ponosisz dodatkowych kosztów.",
  "Profesjonalna opieka laktacyjna w czasie połogu (położna posiada Międzynarodowy Certyfikat IBCLC).",
  "Wizyty położnicze odbywają się w Waszym zaciszu domowym.",
  "Stały kontakt z położną w okresie połogu.",
  "Możliwość bezpłatnego wykonania KTG, jeśli jesteś naszą pacjentką.",
  "Zespół podstawowej opieki medycznej w jednym miejscu (pielęgniarka, lekarz, położna), co pozwala dobrze zaopiekować się każdym pacjentem.",
  "Bazujemy na wieloletnim doświadczeniu i aktualnie obowiązujących standardach.",
  "W razie potrzeby oferujemy pobranie krwi u noworodka w domu przez wykwalifikowaną położną.",
];

const spotkania = [
  {
    tytul: "Zmiany zachodzące w ciąży",
    opis: "W tym profilaktyka szczepień w ciąży.",
  },
  {
    tytul: "Laktacja",
    opis: "Część teoretyczna i praktyczna: akcesoria do odciągania pokarmu, smoczki i butelki dla dzieci.",
  },
  {
    tytul: "Poród",
    opis: "Jak przebiega, jakie metody łagodzenia bólu porodowego oferują szpitale i co możemy zrobić, żeby sprawnie urodzić dziecko.",
  },
  {
    tytul: "Opieka nad noworodkiem",
    opis: "Zajęcia teoretyczne i praktyczne, w tym pierwsza pomoc noworodka.",
  },
  {
    tytul: "Połóg",
    opis: "Czego się spodziewać w pierwszych tygodniach po porodzie.",
  },
  {
    tytul: "Formalności po porodzie",
    opis: "Co załatwić i w jakiej kolejności.",
  },
];

export default function SzkolaRodzeniaPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#21135E] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-4">
            W RAMACH NFZ
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Szkoła rodzenia</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            Admedica Szczepankowo – opieka położnej od ciąży do 2. miesiąca życia dziecka.
          </p>
          <Link
            href="/szczepankowo"
            className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Wróć do placówki Szczepankowo
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 space-y-8">
        {/* Kontakt na górze, żeby od razu było widać, jak się zapisać */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
              Zapisy i informacje
            </p>
            <p className="text-xl font-bold text-gray-900">Marta Urbańska</p>
            <p className="text-gray-600">Położna</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+48535709158"
              className="text-center bg-[#21135E] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#37237F] transition whitespace-nowrap"
            >
              <span className="inline-flex items-center gap-2"><PhoneIcon className="h-5 w-5" /> +48 535 709 158</span>
            </a>
            <a
              href="mailto:Mleczna.polozna@gmail.com"
              className="text-center border-2 border-[#21135E] text-[#21135E] font-bold py-3 px-6 rounded-lg hover:bg-[#21135E] hover:text-white transition"
            >
              <span className="inline-flex items-center gap-2"><MailIcon className="h-5 w-5" /> Napisz do położnej</span>
            </a>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dlaczego warto wybrać właśnie nas?</h2>
          <ul className="space-y-4">
            {zalety.map((z) => (
              <li key={z} className="flex items-start text-gray-700">
                <CheckIcon className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                <span>{z}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan spotkań</h2>
          <ol className="space-y-4">
            {spotkania.map((s, i) => (
              <li key={s.tytul} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#21135E] text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{s.tytul}</h3>
                  <p className="text-sm text-gray-600">{s.opis}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <p className="text-center text-gray-600">
          Zadzwoń lub napisz i uzyskaj więcej informacji bezpośrednio od położnej.
        </p>
      </div>
    </main>
  );
}
