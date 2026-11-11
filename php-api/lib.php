<?php
// Wspólny kod dla recepty.php (formularz) i panel.php (recepcja). Nie jest dostępny z przeglądarki (.htaccess).
// Wymaga PHP 7.4+, rozszerzeń: PDO (MySQL), openssl.

date_default_timezone_set('Europe/Warsaw');

const PLACOWKI = [
    'bohaterow' => 'Admedica Bohaterów',
    'szczepankowo' => 'Admedica Szczepankowo',
];

function json_out($code, $data)
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function cfg()
{
    static $c = null;
    if ($c === null) {
        $f = __DIR__ . '/config.php';
        if (!is_file($f)) {
            json_out(500, ['ok' => false, 'error' => 'Brak pliku config.php na serwerze.']);
        }
        $c = require $f;
    }
    return $c;
}

function is_https()
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

function db()
{
    static $pdo = null;
    if ($pdo === null) {
        $c = cfg();
        $dsn = $c['db_dsn'] ?? ('mysql:host=' . $c['db_host'] . ';dbname=' . $c['db_name'] . ';charset=utf8mb4');
        $pdo = new PDO($dsn, $c['db_user'] ?? null, $c['db_pass'] ?? null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}

// ---------- szyfrowanie AES-256-GCM ----------

function key_bin()
{
    $k = base64_decode((string)(cfg()['encryption_key'] ?? ''), true);
    if ($k === false || strlen($k) !== 32) {
        throw new RuntimeException('encryption_key musi być 32 bajtami w base64');
    }
    return $k;
}

function b64u_enc($s)
{
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}

function b64u_dec($s)
{
    $s = strtr($s, '-_', '+/');
    $s .= str_repeat('=', (4 - strlen($s) % 4) % 4);
    return base64_decode($s, true);
}

function encrypt_json($data)
{
    $iv = random_bytes(12);
    $tag = '';
    $ct = openssl_encrypt(
        json_encode($data, JSON_UNESCAPED_UNICODE),
        'aes-256-gcm',
        key_bin(),
        OPENSSL_RAW_DATA,
        $iv,
        $tag,
        '',
        16
    );
    if ($ct === false) {
        throw new RuntimeException('Szyfrowanie nie powiodło się');
    }
    return 'v1.' . b64u_enc($iv) . '.' . b64u_enc($tag) . '.' . b64u_enc($ct);
}

// Zwraca tablicę albo null, gdy dane są uszkodzone / zmienione / zaszyfrowane innym kluczem.
function decrypt_json($token)
{
    $p = explode('.', (string)$token);
    if (count($p) !== 4 || $p[0] !== 'v1') {
        return null;
    }
    $iv = b64u_dec($p[1]);
    $tag = b64u_dec($p[2]);
    $ct = b64u_dec($p[3]);
    if ($iv === false || $tag === false || $ct === false || strlen($iv) !== 12 || strlen($tag) !== 16) {
        return null;
    }
    $pt = openssl_decrypt($ct, 'aes-256-gcm', key_bin(), OPENSSL_RAW_DATA, $iv, $tag);
    if ($pt === false) {
        return null;
    }
    $d = json_decode($pt, true);
    return is_array($d) ? $d : null;
}

// ---------- walidacja ----------

function valid_pesel($p)
{
    if (!preg_match('/^\d{11}$/', $p)) {
        return false;
    }
    $w = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    $sum = 0;
    for ($i = 0; $i < 10; $i++) {
        $sum += $w[$i] * (int)$p[$i];
    }
    return ((10 - ($sum % 10)) % 10) === (int)$p[10];
}

function valid_phone($t)
{
    if (!preg_match('/^[\d\s+\-()]+$/', $t)) {
        return false;
    }
    $n = strlen(preg_replace('/\D/', '', $t));
    return $n >= 9 && $n <= 15;
}

// ---------- limity (w bazie, bo na hostingu współdzielonym nie ma pamięci między żądaniami) ----------

// Zamiast adresu IP zapisujemy jego skrót z kluczem tajnym – nie da się go odwrócić do IP.
function ip_hash()
{
    return substr(hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'brak', key_bin()), 0, 40);
}

// Zwraca true, jeśli żądanie mieści się w limicie ($max w ciągu $sec sekund).
function rate_limit($name, $max, $sec)
{
    $pdo = db();
    $key = $name . ':' . ip_hash();
    $pdo->prepare('DELETE FROM limity WHERE created_at < ?')->execute([date('Y-m-d H:i:s', time() - 86400)]);
    $st = $pdo->prepare('SELECT COUNT(*) FROM limity WHERE klucz = ? AND created_at > ?');
    $st->execute([$key, date('Y-m-d H:i:s', time() - $sec)]);
    if ((int)$st->fetchColumn() >= $max) {
        return false;
    }
    $pdo->prepare('INSERT INTO limity (klucz, created_at) VALUES (?, ?)')->execute([$key, date('Y-m-d H:i:s')]);
    return true;
}

// Automatyczne usuwanie starych zgłoszeń (RODO: minimalizacja przechowywania).
function purge_old()
{
    $days = max(1, (int)(cfg()['retention_days'] ?? 30));
    db()->prepare('DELETE FROM recepty WHERE created_at < ?')
        ->execute([date('Y-m-d H:i:s', time() - $days * 86400)]);
}
