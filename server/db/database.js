const { DatabaseSync } = require('node:sqlite')
const path = require('path')

const db = new DatabaseSync(path.join(__dirname, 'clients.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    contact    TEXT NOT NULL,
    task       TEXT NOT NULL,
    status     TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS skills (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    category   TEXT NOT NULL,
    level      INTEGER NOT NULL DEFAULT 80,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS projects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT NOT NULL,
    emoji       TEXT NOT NULL DEFAULT '🚀',
    gradient    TEXT NOT NULL DEFAULT 'gradient-1',
    tags        TEXT NOT NULL DEFAULT '[]',
    live_url    TEXT NOT NULL DEFAULT '',
    github_url  TEXT NOT NULL DEFAULT '',
    featured    INTEGER NOT NULL DEFAULT 0,
    sort_order  INTEGER NOT NULL DEFAULT 0
  );
`)

// Seed skills if empty
const skillCount = db.prepare('SELECT COUNT(*) as c FROM skills').get().c
if (skillCount === 0) {
  const ins = db.prepare('INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)')
  ;[
    ['React',          'Frontend',      90, 0],
    ['JavaScript',     'Frontend',      88, 1],
    ['TypeScript',     'Frontend',      75, 2],
    ['HTML / CSS',     'Frontend',      95, 3],
    ['Tailwind CSS',   'Frontend',      80, 4],
    ['Node.js',        'Backend',       78, 0],
    ['Python',         'Backend',       70, 1],
    ['PostgreSQL',     'Backend',       65, 2],
    ['MongoDB',        'Backend',       60, 3],
    ['REST API',       'Backend',       85, 4],
    ['Git / GitHub',   'Инструменты',   88, 0],
    ['Vite / Webpack', 'Инструменты',   75, 1],
    ['Docker',         'Инструменты',   55, 2],
    ['Figma',          'Инструменты',   70, 3],
    ['Linux',          'Инструменты',   65, 4],
  ].forEach(([name, cat, lvl, ord]) => ins.run(name, cat, lvl, ord))
}

// Seed projects if empty
const projCount = db.prepare('SELECT COUNT(*) as c FROM projects').get().c
if (projCount === 0) {
  const ins = db.prepare(`
    INSERT INTO projects (title, description, emoji, gradient, tags, live_url, github_url, featured, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  ;[
    ['Portfolio Site',    'Персональный сайт-портфолио с современным дизайном, анимациями и адаптивной вёрсткой.', '🌐', 'gradient-1', '["React","Vite","CSS"]',                  '#', 'https://github.com/san777bit', 1, 0],
    ['Task Manager App',  'Приложение для управления задачами с drag & drop, фильтрами и локальным хранилищем.',   '✅', 'gradient-2', '["React","TypeScript","LocalStorage"]',   '#', 'https://github.com/san777bit', 1, 1],
    ['Weather Dashboard', 'Дашборд погоды с интеграцией API, графиками температур и геолокацией.',                '🌤️','gradient-3', '["React","API","Charts"]',                 '#', 'https://github.com/san777bit', 0, 2],
    ['E-commerce UI',     'Интерфейс интернет-магазина с корзиной, поиском и адаптивным дизайном.',               '🛒', 'gradient-4', '["React","Node.js","MongoDB"]',            '#', 'https://github.com/san777bit', 0, 3],
    ['Chat Application',  'Мессенджер в реальном времени с комнатами, онлайн-статусом и историей сообщений.',    '💬', 'gradient-5', '["React","Socket.io","Node.js"]',          '#', 'https://github.com/san777bit', 0, 4],
    ['Blog Platform',     'Платформа для блогов с markdown-редактором, тегами и системой комментариев.',          '✍️', 'gradient-6', '["React","PostgreSQL","REST API"]',        '#', 'https://github.com/san777bit', 0, 5],
  ].forEach(args => ins.run(...args))
}

module.exports = db
