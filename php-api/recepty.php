<?php
// Mały magazyn zaszyfrowanych zgłoszeń o receptę. Działa na zwykłym hostingu PHP + MySQL (np. seohost).
// Ten skrypt NIE zna klucza szyfrującego: przechowuje wyłącznie szyfrogram wysłany przez stronę (Next.js).
// Wymaga PHP 7.4+ i rozszerzenia PDO MySQL.

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function out($code, $data)
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    out(405, ['ok' => false, 'error' => 'method']);
}

// Tylko przez HTTPS (dane i token nie mogą iść otwartym tekstem).
$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
if (!$https) {
    out(400, ['ok' => false, 'error' => 'https_required']);
}

$cfgFile = __DIR__ . '/config.php';
if (!is_file($cfgFile)) {
    out(500, ['ok' => false, 'error' => 'config_missing']);
}
$cfg = require $cfgFile;

$token = $_SERVER['HTTP_X_API_TOKEN'] ?? '';
if (!is_string($token) || strlen($cfg['api_token']) < 32 || !hash_equals($cfg['api_token'], $token)) {
    usleep(400000); // spowalnia zgadywanie tokenu
    out(401, ['ok' => false, 'error' => 'unauthorized']);
}

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in) || !isset($in['action'])) {
    out(400, ['ok' => false, 'error' => 'bad_request']);
}

try {
    $pdo = new PDO(
        'mysql:host=' . $cfg['db_host'] . ';dbname=' . $cfg['db_name'] . ';charset=utf8mb4',
        $cfg['db_user'],
        $cfg['db_pass'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    // Automatyczne usuwanie starych zgłoszeń (RODO: minimalizacja przechowywania).
    $days = max(1, (int)($cfg['retention_days'] ?? 30));
    $pdo->prepare('DELETE FROM recepty WHERE created_at < (NOW() - INTERVAL ' . $days . ' DAY)')->execute();

    switch ($in['action']) {
        case 'create':
            $dane = $in['dane'] ?? '';
            $placowka = $in['placowka'] ?? '';
            if (!is_string($dane) || $dane === '' || strlen($dane) > 8000
                || !in_array($placowka, ['bohaterow', 'szczepankowo'], true)) {
                out(422, ['ok' => false, 'error' => 'invalid']);
            }
            $st = $pdo->prepare('INSERT INTO recepty (placowka, dane) VALUES (?, ?)');
            $st->execute([$placowka, $dane]);
            out(200, ['ok' => true, 'id' => (int)$pdo->lastInsertId()]);

        case 'list':
            $rows = $pdo->query(
                'SELECT id, created_at, placowka, status, done_at, dane FROM recepty ORDER BY (status = "nowa") DESC, created_at DESC LIMIT 500'
            )->fetchAll(PDO::FETCH_ASSOC);
            out(200, ['ok' => true, 'items' => $rows]);

        case 'mark':
            $id = (int)($in['id'] ?? 0);
            $status = $in['status'] ?? '';
            if ($id < 1 || !in_array($status, ['nowa', 'zrealizowana'], true)) {
                out(422, ['ok' => false, 'error' => 'invalid']);
            }
            $st = $pdo->prepare('UPDATE recepty SET status = ?, done_at = IF(? = "zrealizowana", NOW(), NULL) WHERE id = ?');
            $st->execute([$status, $status, $id]);
            out(200, ['ok' => true]);

        case 'delete':
            $id = (int)($in['id'] ?? 0);
            if ($id < 1) {
                out(422, ['ok' => false, 'error' => 'invalid']);
            }
            $pdo->prepare('DELETE FROM recepty WHERE id = ?')->execute([$id]);
            out(200, ['ok' => true]);

        default:
            out(400, ['ok' => false, 'error' => 'unknown_action']);
    }
} catch (Throwable $e) {
    error_log('[recepty] ' . $e->getMessage()); // do logu serwera, nigdy do odpowiedzi
    out(500, ['ok' => false, 'error' => 'server']);
}
