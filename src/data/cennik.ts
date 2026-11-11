// Cennik usług prywatnych. Źródło: https://admedica-centrummedyczne.pl/cennik/ (stan z dnia przeniesienia).
// Aby zmienić cenę, edytuj tylko ten plik. Ceny w zł.

export type Pozycja = { nazwa: string; cena: number; uwaga?: string };
export type Sekcja = { tytul: string; opis?: string; pozycje: Pozycja[] };

export const cennik: Sekcja[] = [
  {
    tytul: "USG – osoby dorosłe",
    pozycje: [
      { nazwa: "Jama brzuszna", cena: 250 },
      { nazwa: "Tarczyca", cena: 250 },
      { nazwa: "Węzły chłonne", cena: 250 },
      { nazwa: "Prostata", cena: 250 },
      { nazwa: "Piersi", cena: 250 },
    ],
  },
  {
    tytul: "USG – dzieci",
    pozycje: [{ nazwa: "Echo serca", cena: 200 }],
  },
  {
    tytul: "Holtery",
    pozycje: [
      { nazwa: "Holter EKG", cena: 200 },
      { nazwa: "Holter ciśnieniowy", cena: 200 },
    ],
  },
  {
    tytul: "Dermatologia",
    pozycje: [
      { nazwa: "Konsultacja – dorośli", cena: 200 },
      { nazwa: "Konsultacja – dzieci", cena: 200 },
    ],
  },
  {
    tytul: "Endokrynologia",
    pozycje: [
      { nazwa: "Konsultacja", cena: 200 },
      { nazwa: "Konsultacja z USG", cena: 250 },
    ],
  },
  {
    tytul: "Kardiologia",
    pozycje: [
      { nazwa: "Konsultacja", cena: 250 },
      { nazwa: "Konsultacja + USG (echo serca)", cena: 300 },
      { nazwa: "Echo serca", cena: 200 },
    ],
  },
  {
    tytul: "Ortopedia",
    pozycje: [
      { nazwa: "Konsultacja – dr Jaszczak", cena: 200 },
      { nazwa: "Konsultacja dzieci i dorosłych + USG – dr Pietrasik", cena: 200 },
      { nazwa: "USG bioderek u niemowląt – dr Pietrasik", cena: 150 },
    ],
    opis: "Ostrzyknięcie stawu: +20 zł do kosztu wizyty.",
  },
  {
    tytul: "Pulmonologia",
    pozycje: [
      { nazwa: "Konsultacja – dzieci (dr Mitkowska)", cena: 200 },
      { nazwa: "Konsultacja – dorośli (dr Magdalena Kostrzewska)", cena: 200 },
    ],
  },
  {
    tytul: "Fizjoterapia",
    pozycje: [{ nazwa: "Wizyta", cena: 120, uwaga: "30 minut" }],
  },
  {
    tytul: "Laryngologia",
    pozycje: [{ nazwa: "Konsultacja", cena: 250 }],
  },
  {
    tytul: "Psychiatria dziecięca",
    pozycje: [
      { nazwa: "Pierwsza wizyta – dr Kamila Pers-Michalak", cena: 350, uwaga: "1 godzina" },
      { nazwa: "Kolejna wizyta", cena: 200, uwaga: "30 minut" },
    ],
  },
  {
    tytul: "Psychiatria",
    pozycje: [
      { nazwa: "Pierwsza wizyta – dr Anna Rosik", cena: 400 },
      { nazwa: "Kolejna wizyta", cena: 250 },
    ],
  },
];

// Pliki PDF. Gdy wgrasz własne pliki do katalogu /public, zmień adresy na np. "/cennik-diagnostyka.pdf".
export const pliki = [
  {
    nazwa: "Badania laboratoryjne (Diagnostyka)",
    href: "https://admedica-centrummedyczne.pl/wp-content/uploads/2025/10/Cennik-komercyjny-Diagnostyka.pdf",
  },
  {
    nazwa: "Szczepionki",
    href: "https://admedica-centrummedyczne.pl/wp-content/uploads/2020/04/CENY-SZCZEPIONEK.pdf",
  },
];
