import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statyczny eksport: `npm run build` tworzy katalog `out/`, który wgrywasz na zwykły serwer.
  // Cała logika recept (szyfrowanie, baza, panel) jest w php-api/, więc strona nie potrzebuje Node.
  output: "export",
  // /recepty/ -> recepty/index.html (działa na zwykłym Apache bez dodatkowej konfiguracji).
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
