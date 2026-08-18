CREATE TABLE IF NOT EXISTS telegram_profiles (
  telegram_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  username TEXT,
  photo_url TEXT,
  updated_at TEXT NOT NULL
);
