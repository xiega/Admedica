# API recept (PHP + MySQL) – instalacja na seohost

Ten katalog wgrywasz na serwer PHP. Strona (Next.js) szyfruje dane i wysyła je tutaj; baza trzyma tylko szyfrogram.

1. **Baza:** w panelu seohost utwórz bazę MySQL i użytkownika. W phpMyAdmin wybierz bazę → „Import” → wgraj `schema.sql`.
2. **Pliki:** wgraj (FTP/menedżer plików) `recepty.php` i `.htaccess` do katalogu na domenie z **HTTPS**, np. `https://twoja-domena.pl/api-recepty/recepty.php`.
3. **Konfiguracja:** skopiuj `config.example.php` jako `config.php` na serwerze i wpisz dane bazy oraz długi losowy `api_token`.
4. **Strona:** w ustawieniach strony ustaw `RECEPTY_API_URL` (adres z kroku 2) i `RECEPTY_API_TOKEN` (ten sam token).
5. **Test:** otwórz adres z kroku 2 w przeglądarce – ma wyświetlić `{"ok":false,"error":"method"}`. To znaczy, że skrypt działa i jest chroniony.

Zgłoszenia są usuwane automatycznie po `retention_days` dniach. Klucz szyfrujący (`RECEPTA_KEY`) jest tylko na stronie – nigdy na tym serwerze.
