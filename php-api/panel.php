<?php
// Panel recepcji: logowanie hasłem, lista zaszyfrowanych zgłoszeń (odszyfrowywanych na bieżąco),
// oznaczanie jako zrealizowane i usuwanie. Adres: https://TWOJA-DOMENA/api-recepty/panel.php

require __DIR__ . '/lib.php';

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");

if (!is_https()) {
    http_response_code(400);
    exit('Wymagane połączenie HTTPS.');
}

const SESSION_SECONDS = 8 * 3600;

session_name('recepcja');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') . '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

function h($s)
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function redirect_self()
{
    header('Location: ' . basename($_SERVER['SCRIPT_NAME']), true, 303);
    exit;
}

$loggedIn = !empty($_SESSION['auth']) && (time() - (int)($_SESSION['t'] ?? 0)) < SESSION_SECONDS;
if (!$loggedIn && !empty($_SESSION['auth'])) {
    $_SESSION = [];
}

$error = '';

try {
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
        $action = $_POST['action'] ?? '';

        if ($action === 'login') {
            if (!rate_limit('login', 10, 900)) {
                $error = 'Zbyt wiele prób. Spróbuj ponownie za kilkanaście minut.';
            } elseif (password_verify((string)($_POST['password'] ?? ''), (string)(cfg()['panel_password_hash'] ?? ''))) {
                session_regenerate_id(true);
                $_SESSION = ['auth' => true, 't' => time(), 'csrf' => bin2hex(random_bytes(16))];
                redirect_self();
            } else {
                $error = 'Nieprawidłowe hasło.';
            }
        } elseif ($loggedIn) {
            // Wszystkie pozostałe akcje wymagają zalogowania i poprawnego tokenu CSRF.
            if (!hash_equals((string)($_SESSION['csrf'] ?? ''), (string)($_POST['csrf'] ?? ''))) {
                http_response_code(403);
                exit('Nieprawidłowy token formularza. Odśwież stronę.');
            }
            $id = (int)($_POST['id'] ?? 0);
            if ($action === 'logout') {
                $_SESSION = [];
                session_destroy();
            } elseif ($id > 0 && $action === 'done') {
                db()->prepare('UPDATE recepty SET status = ?, done_at = ? WHERE id = ?')
                    ->execute(['zrealizowana', date('Y-m-d H:i:s'), $id]);
            } elseif ($id > 0 && $action === 'undo') {
                db()->prepare('UPDATE recepty SET status = ?, done_at = NULL WHERE id = ?')
                    ->execute(['nowa', $id]);
            } elseif ($id > 0 && $action === 'delete') {
                db()->prepare('DELETE FROM recepty WHERE id = ?')->execute([$id]);
            }
            redirect_self();
        }
    }
} catch (Throwable $e) {
    error_log('[panel] ' . $e->getMessage());
    $error = 'Wystąpił błąd serwera. Spróbuj ponownie.';
}

$rows = [];
if ($loggedIn) {
    try {
        purge_old();
        $rows = db()->query(
            "SELECT id, created_at, placowka, status, dane FROM recepty ORDER BY (status = 'nowa') DESC, created_at DESC, id DESC LIMIT 500"
        )->fetchAll();
    } catch (Throwable $e) {
        error_log('[panel] ' . $e->getMessage());
        $error = 'Nie udało się pobrać zgłoszeń z bazy.';
    }
}

function post_form($action, $id, $label, $class)
{
    return '<form method="post" style="display:inline"><input type="hidden" name="csrf" value="' . h($_SESSION['csrf']) . '">'
        . '<input type="hidden" name="action" value="' . h($action) . '"><input type="hidden" name="id" value="' . (int)$id . '">'
        . '<button class="btn ' . h($class) . '">' . h($label) . '</button></form> ';
}
?>
<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Panel recepcji | Admedica</title>
<style>
  *{box-sizing:border-box} body{margin:0;font-family:system-ui,Arial,sans-serif;background:#f9fafb;color:#111827}
  header{background:#21135E;color:#fff;padding:28px 16px;text-align:center}
  header h1{margin:0;font-size:28px} header p{margin:6px 0 0;color:#dbeafe}
  main{max-width:760px;margin:-18px auto 40px;padding:0 16px}
  .box{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;box-shadow:0 4px 14px rgba(0,0,0,.06);margin-bottom:16px}
  .nowa{border:2px solid #4ade80} .done{background:#f3f4f6;opacity:.85}
  .err{background:#fef2f2;border-color:#fecaca;color:#991b1b}
  input[type=password]{width:100%;padding:12px;border:1px solid #d1d5db;border-radius:8px;font-size:16px;margin:8px 0 14px}
  .btn{padding:10px 16px;border-radius:8px;border:1px solid #d1d5db;background:#fff;font-weight:700;cursor:pointer;font-size:14px}
  .primary{background:#21135E;color:#fff;border-color:#21135E} .danger{color:#b91c1c;border-color:#fca5a5}
  .tag{display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;background:#e0e7ff;color:#21135E;margin-right:6px}
  .tag.n{background:#dcfce7;color:#166534} .tag.d{background:#e5e7eb;color:#4b5563}
  dl{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;margin:14px 0} dt{font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:700;letter-spacing:.05em}
  dd{margin:2px 0 0;font-weight:600} .pesel{font-family:ui-monospace,Menlo,monospace;color:#21135E;font-size:18px;letter-spacing:.06em;user-select:all}
  .wide{grid-column:1/-1} .leki{white-space:pre-wrap;background:#f9fafb;border:1px solid #f3f4f6;border-radius:8px;padding:10px;font-weight:400}
  .top{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px}
  small{color:#6b7280} a{color:#21135E}
  @media(max-width:560px){dl{grid-template-columns:1fr}}
</style>
</head>
<body>
<header><h1>Panel recepcji</h1><p>Prośby o przedłużenie recept</p></header>
<main>
<?php if ($error !== ''): ?>
  <div class="box err"><?= h($error) ?></div>
<?php endif; ?>

<?php if (!$loggedIn): ?>
  <div class="box">
    <h2 style="margin-top:0">Zaloguj się</h2>
    <p><small>Dane pacjentów są szyfrowane. Aby je zobaczyć, podaj hasło recepcji.</small></p>
    <form method="post" autocomplete="off">
      <input type="hidden" name="action" value="login">
      <label for="p">Hasło</label>
      <input id="p" type="password" name="password" required autocomplete="current-password">
      <button class="btn primary" style="width:100%;padding:12px">Zaloguj</button>
    </form>
  </div>
<?php else:
    $nowe = 0;
    foreach ($rows as $r) { if ($r['status'] === 'nowa') { $nowe++; } }
?>
  <div class="top">
    <span><b style="color:#21135E"><?= $nowe ?></b> nowych · <?= count($rows) - $nowe ?> zrealizowanych</span>
    <?= post_form('logout', 0, 'Wyloguj', '') ?>
  </div>

  <?php if (!$rows): ?><div class="box">Brak zgłoszeń.</div><?php endif; ?>

  <?php foreach ($rows as $r):
      $z = decrypt_json($r['dane']);
      $nowa = $r['status'] === 'nowa';
      $nazwa = PLACOWKI[$r['placowka']] ?? '—';
  ?>
    <article class="box <?= $nowa ? 'nowa' : 'done' ?>">
      <div class="top" style="margin-bottom:0">
        <span><span class="tag"><?= h($nazwa) ?></span><span class="tag <?= $nowa ? 'n' : 'd' ?>"><?= $nowa ? 'Nowa' : 'Zrealizowana' ?></span></span>
        <small><?= $z ? h(date('d.m.Y H:i', (int)($z['ts'] / 1000))) : h($r['created_at']) ?></small>
      </div>
      <?php if ($z): ?>
        <dl>
          <div><dt>Pacjent</dt><dd><?= h($z['imie'] ?? '') ?></dd></div>
          <div><dt>PESEL</dt><dd class="pesel"><?= h($z['pesel'] ?? '') ?></dd></div>
          <div><dt>Telefon</dt><dd><a href="tel:<?= h(preg_replace('/[^\d+]/', '', $z['telefon'] ?? '')) ?>"><?= h($z['telefon'] ?? '') ?></a></dd></div>
          <div class="wide"><dt>Leki i dawkowanie</dt><dd class="leki"><?= h($z['leki'] ?? '') ?></dd></div>
        </dl>
      <?php else: ?>
        <p style="color:#991b1b">Nie można odszyfrować tego zgłoszenia (zmieniony klucz szyfrujący?).</p>
      <?php endif; ?>
      <div>
        <?php if ($nowa): ?>
          <?= post_form('done', $r['id'], '✓ Oznacz jako zrealizowaną', 'primary') ?>
        <?php else: ?>
          <?= post_form('undo', $r['id'], 'Przywróć jako nową', '') ?>
          <?= post_form('delete', $r['id'], 'Usuń z bazy', 'danger') ?>
        <?php endif; ?>
      </div>
    </article>
  <?php endforeach; ?>

  <p style="text-align:center"><small>Zgłoszenia są przechowywane w bazie w formie zaszyfrowanej i automatycznie usuwane po <?= (int)(cfg()['retention_days'] ?? 30) ?> dniach.</small></p>
<?php endif; ?>
</main>
</body>
</html>
