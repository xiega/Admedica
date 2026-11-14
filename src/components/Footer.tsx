import Link from "next/link";

const linki = [
  { href: "/recepty", label: "Recepty online" },
  { href: "/cennik", label: "Cennik" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#21135E] text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-white text-xl font-bold mb-2">Admedica</p>
          <p className="text-sm text-blue-200 max-w-xs">
            Centrum Medyczne w Poznaniu. Podstawowa opieka zdrowotna i prywatne gabinety specjalistyczne.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Placówki</p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/bohaterow" className="hover:text-white transition-colors">
                <span className="block font-medium text-white">Admedica Bohaterów</span>
                os. Bohaterów II Wojny Światowej 29, 61-386 Poznań
              </Link>
            </li>
            <li>
              <Link href="/szczepankowo" className="hover:text-white transition-colors">
                <span className="block font-medium text-white">Admedica Szczepankowo</span>
                ul. Szczepankowo 94a, Poznań
              </Link>
              <Link href="/szkola-rodzenia" className="mt-1.5 inline-block text-xs underline underline-offset-2 hover:text-white transition-colors">
                Szkoła rodzenia (tylko Szczepankowo)
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-3">Dla pacjenta</p>
          <ul className="space-y-2 text-sm">
            {linki.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-blue-300">
          © {new Date().getFullYear()} Admedica Centrum Medyczne. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
