import type { Metadata } from "next";
// KLUCZOWA ZMIANA: Poprawna ścieżka do Twojej struktury folderów
import Navbar from "../src/components/Navbar"; 
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admedica | Centrum Medyczne",
  description: "Kompleksowa opieka medyczna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}