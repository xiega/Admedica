# Admedica – strona przychodni

Next.js + Tailwind. Strony: `/` (wybór placówki), `/bohaterow`, `/szczepankowo`, `/recepty` (formularz), `/recepcja` (panel dla recepcji).

## Uruchomienie

```bash
npm install
cp .env.example .env.local   # uzupełnij wartości
npm run dev
```

## Recepty online – jak to działa i dlaczego jest bezpieczne

**Tryb z bazą (zalecany):** serwer strony szyfruje zgłoszenie i wysyła je do małego API w PHP (`php-api/`) na hostingu
z MySQL (np. seohost). W bazie leży **wyłącznie szyfrogram** – klucz `RECEPTA_KEY` jest tylko na stronie, więc nawet wyciek
bazy nie ujawnia PESEL-i. Recepcja widzi listę zgłoszeń w `/recepcja` (nowe/zrealizowane, usuwanie), a stare zgłoszenia
kasują się automatycznie po 30 dniach. Instalacja API: `php-api/README.md`.

**Tryb bez bazy** (gdy `RECEPTY_API_URL` jest puste) działa jak opisano poniżej.

1. Pacjent wypełnia formularz na `/recepty` (HTTPS). PESEL jest sprawdzany (cyfra kontrolna).
2. Serwer (`app/api/recepta/route.ts`) szyfruje dane algorytmem **AES-256-GCM** kluczem `RECEPTA_KEY`.
   Dane **nie są zapisywane** w bazie ani w logach.
3. Recepcja dostaje maila **bez PESEL-u i leków** – tylko z linkiem `/recepcja?d=<zaszyfrowane dane>`.
4. Po otwarciu linku recepcja loguje się hasłem (`RECEPCJA_PASSWORD`) i widzi dane. Link wygasa po 14 dniach.
5. Ochrona przed nadużyciami: limit zgłoszeń z jednego IP, limit prób logowania, ukryte pole-pułapka na boty.

### Zasady dla recepcji
- Po zrealizowaniu prośby **usunąć maila** z linkiem – to jedyne miejsce, gdzie dane zostają (zaszyfrowane).
- Nie przekazywać linku ani hasła osobom postronnym; hasło zmieniać przy zmianie personelu.

### Ograniczenia (świadomie proste rozwiązanie)
- Jedno wspólne hasło recepcji, bez 2FA i bez historii zgłoszeń. Przy większej skali warto dodać konta użytkowników i bazę.
- Limity zgłoszeń działają w pamięci procesu (przy hostingu serverless to ochrona podstawowa).
- Ktoś, kto zdobędzie jednocześnie klucz `RECEPTA_KEY`, może odszyfrować linki – trzymaj go wyłącznie w ustawieniach hostingu.
- Przed uruchomieniem sprawdź z inspektorem ochrony danych (IOD) klauzulę informacyjną RODO i politykę prywatności.
