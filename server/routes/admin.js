const { Router } = require('express')
const jwt = require('jsonwebtoken')
const db = require('../db/database')
const { requireAdmin } = require('../middleware/auth')

const router = Router()

// ── Auth ────────────────────────────────────────────────────────────────────

router.post('/login', (req, res) => {
  const { password } = req.body
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Неверный пароль' })
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' })
  res.json({ token })
})

// ── Skills ──────────────────────────────────────────────────────────────────

router.get('/skills', requireAdmin, (req, res) => {
  res.json({ skills: db.prepare('SELECT * FROM skills ORDER BY category, sort_order, id').all() })
})

router.post('/skills', requireAdmin, (req, res) => {
  const { name, category, level } = req.body
  if (!name?.trim() || !category?.trim()) return res.status(400).json({ error: 'Заполните все поля' })
  const lvl = Math.min(100, Math.max(0, parseInt(level) || 80))
  const maxOrd = db.prepare('SELECT MAX(sort_order) as m FROM skills WHERE category = ?').get(category)?.m ?? -1
  const result = db.prepare('INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)').run(name.trim(), category.trim(), lvl, maxOrd + 1)
  res.status(201).json({ id: Number(result.lastInsertRowid) })
})

router.put('/skills/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id)
  const { name, category, level } = req.body
  if (!name?.trim() || !category?.trim()) return res.status(400).json({ error: 'Заполните все поля' })
  const lvl = Math.min(100, Math.max(0, parseInt(level) || 80))
  db.prepare('UPDATE skills SET name = ?, category = ?, level = ? WHERE id = ?').run(name.trim(), category.trim(), lvl, id)
  res.json({ success: true })
})

router.delete('/skills/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM skills WHERE id = ?').run(parseInt(req.params.id))
  res.json({ success: true })
})

// ── Projects ────────────────────────────────────────────────────────────────

router.get('/projects', requireAdmin, (req, res) => {
  res.json({ projects: db.prepare('SELECT * FROM projects ORDER BY sort_order, id').all() })
})

router.post('/projects', requireAdmin, (req, res) => {
  const { title, description, emoji, gradient, tags, live_url, github_url, featured } = req.body
  if (!title?.trim() || !description?.trim()) return res.status(400).json({ error: 'Заполните название и описание' })
  const tagsJson = JSON.stringify((tags || '').split(',').map(t => t.trim()).filter(Boolean))
  const maxOrd = db.prepare('SELECT MAX(sort_order) as m FROM projects').get()?.m ?? -1
  const result = db.prepare(`
    INSERT INTO projects (title, description, emoji, gradient, tags, live_url, github_url, featured, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title.trim(), description.trim(), emoji || '🚀', gradient || 'gradient-1', tagsJson, live_url || '', github_url || '', featured ? 1 : 0, maxOrd + 1)
  res.status(201).json({ id: Number(result.lastInsertRowid) })
})

router.put('/projects/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, emoji, gradient, tags, live_url, github_url, featured } = req.body
  if (!title?.trim() || !description?.trim()) return res.status(400).json({ error: 'Заполните название и описание' })
  const tagsJson = JSON.stringify((tags || '').split(',').map(t => t.trim()).filter(Boolean))
  db.prepare(`
    UPDATE projects SET title=?, description=?, emoji=?, gradient=?, tags=?, live_url=?, github_url=?, featured=?
    WHERE id = ?
  `).run(title.trim(), description.trim(), emoji || '🚀', gradient || 'gradient-1', tagsJson, live_url || '', github_url || '', featured ? 1 : 0, id)
  res.json({ success: true })
})

router.delete('/projects/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM projects WHERE id = ?').run(parseInt(req.params.id))
  res.json({ success: true })
})

// ── Clients ─────────────────────────────────────────────────────────────────

router.get('/clients', requireAdmin, (req, res) => {
  res.json({ clients: db.prepare('SELECT * FROM clients ORDER BY created_at DESC').all() })
})

router.patch('/clients/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id)
  const { status } = req.body
  if (!['new','read','done'].includes(status)) return res.status(400).json({ error: 'Неверный статус' })
  db.prepare('UPDATE clients SET status = ? WHERE id = ?').run(status, id)
  res.json({ success: true })
})

router.delete('/clients/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM clients WHERE id = ?').run(parseInt(req.params.id))
  res.json({ success: true })
})

module.exports = router
