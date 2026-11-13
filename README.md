# Admedica – strona przychodni

Next.js + Tailwind. Strony: `/` (wybór placówki), `/bohaterow`, `/szczepankowo`, `/recepty` (formularz), `/recepcja` (panel dla recepcji).

## Uruchomienie

```bash
npm install
cp .env.example .env.local   # uzupełnij wartości
npm run dev
```

## Recepty online – jak to działa

Strona jest **statyczna** (`npm run build` → katalog `out/`, wgrywany na zwykły serwer). Cała logika recept jest w `php-api/`
(PHP + MySQL na hostingu): walidacja PESEL, szyfrowanie AES-256-GCM, zapis w bazie i panel recepcji `/api-recepty/panel.php`.

1. Pacjent wypełnia formularz na `/recepty` (HTTPS).
2. `php-api/recepty.php` sprawdza dane, **szyfruje** je i zapisuje w bazie. W bazie nie ma jawnego PESEL-u ani leków.
3. Recepcja loguje się w panelu hasłem, widzi listę zgłoszeń, oznacza „zrealizowane” albo usuwa.
4. Zgłoszenia kasują się automatycznie po 30 dniach. Opcjonalnie przychodzi mail z samym powiadomieniem (bez danych).

Instalacja i zasady bezpieczeństwa: `php-api/README.md`.

### Zasady dla recepcji
- Hasło do panelu znają tylko osoby z recepcji; przy zmianie personelu zmień hasło.
- Zrealizowane zgłoszenia usuwaj z panelu.
