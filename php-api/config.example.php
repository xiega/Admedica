<?php
// Skopiuj ten plik jako config.php (na serwerze) i uzupełnij. NIE wrzucaj config.php do GitHuba.
return [
    // Dane bazy z panelu seohost (ta sama baza, którą widzisz w phpMyAdmin).
    'db_host' => 'localhost',
    'db_name' => 'NAZWA_BAZY',
    'db_user' => 'UZYTKOWNIK_BAZY',
    'db_pass' => 'HASLO_BAZY',

    // Klucz szyfrujący (32 losowe bajty w base64). ZRÓB JEGO KOPIĘ w bezpiecznym miejscu:
    // bez niego nie da się odszyfrować zgłoszeń. Wygeneruj: php -r "echo base64_encode(random_bytes(32));"
    'encryption_key' => 'WKLEJ_KLUCZ',

    // Skrót hasła recepcji. Wygeneruj: php -r "echo password_hash('TWOJE_HASLO', PASSWORD_DEFAULT);"
    'panel_password_hash' => 'WKLEJ_SKROT_HASLA',

    // Z jakich adresów strony wolno wysyłać formularz, jeśli strona stoi na INNEJ domenie niż ten skrypt
    // (np. testowo na Vercelu). Gdy strona i skrypt są na tej samej domenie, zostaw pustą listę [].
    'allowed_origins' => [],

    // Opcjonalne powiadomienie e-mail o nowym zgłoszeniu (BEZ danych pacjenta). Puste = brak maila.
    'notify_email' => '',
    'notify_from' => '',

    // Po ilu dniach zgłoszenia są automatycznie usuwane z bazy.
    'retention_days' => 30,
];
