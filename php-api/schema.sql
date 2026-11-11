-- Zaimportuj w phpMyAdmin (zakładka "SQL" lub "Import") w swojej bazie. Można importować wielokrotnie.
CREATE TABLE IF NOT EXISTS recepty (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  placowka   VARCHAR(20) NOT NULL,
  status     ENUM('nowa','zrealizowana') NOT NULL DEFAULT 'nowa',
  done_at    DATETIME NULL,
  dane       TEXT NOT NULL COMMENT 'zaszyfrowane AES-256-GCM; tu nieczytelne',
  INDEX idx_created (created_at),
  INDEX idx_status (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Limity zapytań (ochrona przed spamem i zgadywaniem hasła). Przechowuje skróty, nie adresy IP.
CREATE TABLE IF NOT EXISTS limity (
  klucz      VARCHAR(80) NOT NULL,
  created_at DATETIME NOT NULL,
  INDEX idx_klucz (klucz, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
