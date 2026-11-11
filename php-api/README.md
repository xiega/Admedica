# Recepty online – backend w PHP (seohost)

Cała logika recept jest tutaj: walidacja, szyfrowanie AES-256-GCM, zapis do MySQL i panel recepcji.
Strona (Next.js, statyczny eksport) tylko wysyła formularz do `recepty.php`.

## Instalacja na seohost (menedżer plików)

1. **Baza:** w phpMyAdmin wybierz swoją bazę → „Import” → wgraj `schema.sql` (można ponownie, nic nie zepsuje;
   dodaje tabelę `limity`, tabela `recepty` zostaje).
2. **Pliki:** w katalogu domeny (HTTPS) utwórz folder `api-recepty` i wgraj do niego: `recepty.php`, `panel.php`,
   `lib.php`, `.htaccess` oraz `config.php` (kopia `config.example.php` z uzupełnionymi danymi).
3. **Test:** otwórz `https://TWOJA-DOMENA/api-recepty/recepty.php` – ma pokazać `{"ok":false,"error":"method"}`.
   Potem `https://TWOJA-DOMENA/api-recepty/panel.php` – ma pokazać okno logowania.
4. **Strona:** po `npm run build` wgraj zawartość katalogu `out/` na tę samą domenę. Formularz domyślnie wysyła
   do `/api-recepty/recepty.php`, więc nic więcej nie trzeba ustawiać.

## Bezpieczeństwo i RODO

- W bazie leży wyłącznie szyfrogram (PESEL, imię, telefon i leki są w środku). Klucz jest w `config.php`.
  **Zrób kopię `encryption_key`** – bez niego zgłoszeń nie da się odszyfrować.
- `config.php`, `lib.php` i `schema.sql` są zablokowane przed pobraniem przez `.htaccess`. Sprawdź, wpisując ich adres
  w przeglądarce – powinien być błąd 403.
- Zgłoszenia usuwają się same po `retention_days` (domyślnie 30 dni). Adresy IP nie są zapisywane (tylko skrót z kluczem).
- Panel: hasło sprawdzane przez `password_verify`, limit prób, sesja 8 godzin, ochrona CSRF, ciasteczko HttpOnly/Secure.
- Zmiana hasła: wygeneruj nowy skrót (`php -r "echo password_hash('NOWE', PASSWORD_DEFAULT);"`) i wpisz w `config.php`.
- Wymagania: PHP 7.4+, PDO MySQL, openssl (standard na seohost).
