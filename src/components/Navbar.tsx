import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Na telefonach wyśrodkujemy logo, na komputerach wyrównamy do lewej */}
        <div className="flex justify-center md:justify-start h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/images/Logo.png" 
                alt="Admedica Logo" 
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}