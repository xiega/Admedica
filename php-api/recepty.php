<?php
// Endpoint formularza "Recepty online". Przyjmuje JSON, waliduje, SZYFRUJE i zapisuje w bazie.
// PESEL i leki nigdy nie trafiają do bazy ani do logów jawnym tekstem.

require __DIR__ . '/lib.php';

// --- CORS / ochrona przed wysyłaniem formularza z obcych stron ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $hostOnly = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
    $allowed = cfg()['allowed_origins'] ?? [];
    if (in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 600');
    } elseif ($originHost !== $hostOnly) {
        json_out(403, ['ok' => false, 'error' => 'Niedozwolone źródło żądania.']);
    }
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($method !== 'POST') {
    json_out(405, ['ok' => false, 'error' => 'method']);
}
if (!is_https()) {
    json_out(400, ['ok' => false, 'error' => 'Wymagane połączenie HTTPS.']);
}

$raw = file_get_contents('php://input');
$in = (strlen($raw) <= 10000) ? json_decode($raw, true) : null;
if (!is_array($in)) {
    json_out(400, ['ok' => false, 'error' => 'Nieprawidłowe dane formularza.']);
}

function field($in, $k)
{
    return isset($in[$k]) && is_string($in[$k]) ? $in[$k] : '';
}

// Pułapka na boty: ukryte pole musi zostać puste. Udajemy sukces i niczego nie zapisujemy.
if (field($in, 'website') !== '') {
    json_out(200, ['ok' => true]);
}
// Czas wypełniania mierzony w przeglądarce.
if (!(isset($in['fillTimeMs']) && is_numeric($in['fillTimeMs']) && $in['fillTimeMs'] >= 3000)) {
    json_out(400, ['ok' => false, 'error' => 'Formularz wysłano zbyt szybko. Sprawdź dane i spróbuj ponownie.']);
}

$placowka = field($in, 'placowka');
$imie = trim(field($in, 'imie'));
$pesel = preg_replace('/\s/', '', field($in, 'pesel'));
$telefon = trim(field($in, 'telefon'));
$leki = trim(field($in, 'leki'));

if (!array_key_exists($placowka, PLACOWKI)) {
    json_out(422, ['ok' => false, 'error' => 'Wybierz placówkę.']);
}
if (mb_strlen($imie) < 3 || mb_strlen($imie) > 100) {
    json_out(422, ['ok' => false, 'error' => 'Podaj imię i nazwisko.']);
}
if (!valid_pesel($pesel)) {
    json_out(422, ['ok' => false, 'error' => 'Numer PESEL jest nieprawidłowy.']);
}
if (!valid_phone($telefon)) {
    json_out(422, ['ok' => false, 'error' => 'Numer telefonu jest nieprawidłowy.']);
}
if (mb_strlen($leki) < 3 || mb_strlen($leki) > 500) {
    json_out(422, ['ok' => false, 'error' => 'Podaj nazwy leków i dawkowanie (do 500 znaków).']);
}
if (($in['zgoda'] ?? false) !== true) {
    json_out(422, ['ok' => false, 'error' => 'Zgoda na przetwarzanie danych jest wymagana.']);
}

try {
    if (!rate_limit('form', 5, 3600)) {
        json_out(429, ['ok' => false, 'error' => 'Zbyt wiele prób. Spróbuj później lub zadzwoń do rejestracji.']);
    }
    purge_old();

    $token = encrypt_json([
        'v' => 1,
        'ts' => time() * 1000,
        'placowka' => $placowka,
        'imie' => $imie,
        'pesel' => $pesel,
        'telefon' => $telefon,
        'leki' => $leki,
    ]);
    db()->prepare('INSERT INTO recepty (created_at, placowka, status, dane) VALUES (?, ?, ?, ?)')
        ->execute([date('Y-m-d H:i:s'), $placowka, 'nowa', $token]);
} catch (Throwable $e) {
    error_log('[recepty] ' . $e->getMessage()); // tylko komunikat błędu, nigdy dane pacjenta
    json_out(502, ['ok' => false, 'error' => 'Nie udało się wysłać zgłoszenia. Zadzwoń do rejestracji.']);
}

// Powiadomienie mailowe (opcjonalne, BEZ danych pacjenta). Jego awaria nie wpływa na zapisane zgłoszenie.
$notify = cfg()['notify_email'] ?? '';
if ($notify !== '') {
    $panel = 'https://' . ($_SERVER['HTTP_HOST'] ?? '') . rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') . '/panel.php';
    $from = cfg()['notify_from'] ?? $notify;
    @mail(
        $notify,
        '=?UTF-8?B?' . base64_encode('Nowa prośba o receptę – ' . PLACOWKI[$placowka]) . '?=',
        "Nowa prośba o przedłużenie recepty.\nPlacówka: " . PLACOWKI[$placowka] . "\n\nDane pacjenta nie są w tej wiadomości. Zaloguj się do panelu recepcji:\n" . $panel . "\n",
        "From: " . $from . "\r\nContent-Type: text/plain; charset=UTF-8"
    );
}

json_out(200, ['ok' => true]);
