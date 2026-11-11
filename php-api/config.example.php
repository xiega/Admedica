<?php
// Skopiuj ten plik jako config.php (na serwerze) i uzupełnij. NIE wrzucaj config.php do GitHuba.
return [
    // Dane bazy z panelu seohost (ta sama baza, którą widzisz w phpMyAdmin).
    'db_host' => 'localhost',
    'db_name' => 'NAZWA_BAZY',
    'db_user' => 'UZYTKOWNIK_BAZY',
    'db_pass' => 'HASLO_BAZY',

    // Długi losowy token (min. 32 znaki) – taki sam wpisujesz w RECEPTY_API_TOKEN na stronie.
    // Wygeneruj: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    'api_token' => 'WKLEJ_DLUGI_LOSOWY_TOKEN',

    // Po ilu dniach zgłoszenia są automatycznie usuwane z bazy.
    'retention_days' => 30,
];
