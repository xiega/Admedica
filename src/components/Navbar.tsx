"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/src/images/Logo.png" 
                alt="Admedica Logo" 
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#o-nas" className="text-gray-600 hover:text-[#21135E] transition font-medium">O nas</Link>
            <Link href="#uslugi" className="text-gray-600 hover:text-[#21135E] transition font-medium">Usługi</Link>
            <Link href="#lekarze" className="text-gray-600 hover:text-[#21135E] transition font-medium">Specjaliści</Link>
            <Link href="#cennik" className="text-gray-600 hover:text-[#21135E] transition font-medium">Cennik</Link>
            <Link href="#kontakt" className="text-gray-600 hover:text-[#21135E] transition font-medium">Kontakt</Link>
          </div>

          {/* Przycisk Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#21135E]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Rozwijane Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link href="#o-nas" className="block px-3 py-2 text-gray-600 hover:text-[#21135E] hover:bg-gray-50 rounded-md">O nas</Link>
            <Link href="#uslugi" className="block px-3 py-2 text-gray-600 hover:text-[#21135E] hover:bg-gray-50 rounded-md">Usługi</Link>
            <Link href="#lekarze" className="block px-3 py-2 text-gray-600 hover:text-[#21135E] hover:bg-gray-50 rounded-md">Specjaliści</Link>
            <Link href="#kontakt" className="block px-3 py-2 text-gray-600 hover:text-[#21135E] hover:bg-gray-50 rounded-md">Kontakt</Link>
          </div>
        </div>
      )}
    </nav>
  );
}