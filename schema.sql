-- 用户表
CREATE TABLE IF NOT EXISTS users (
  userid TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  comment TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- 图片表
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userid TEXT NOT NULL,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TEXT NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(userid)
);  