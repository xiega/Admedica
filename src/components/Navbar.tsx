import Link from 'next/link';

const links = [
  { href: '/bohaterow', label: 'Bohaterów' },
  { href: '/szczepankowo', label: 'Szczepankowo' },
];

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 md:sticky md:top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Na telefonach logo na środku, na komputerach po lewej */}
          <div className="flex justify-center md:justify-start items-center h-16 md:h-20">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img
                src="/images/Logo.png"
                alt="Admedica Logo"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-2 pb-3 md:pb-0 text-sm font-semibold">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-lg text-gray-700 hover:text-[#21135E] hover:bg-gray-50 transition"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/recepty"
              className="ml-1 px-4 py-2 rounded-lg bg-[#21135E] text-white hover:bg-[#37237F] transition"
            >
              💊 Recepty online
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
