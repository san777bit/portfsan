const { Router } = require('express')
const db = require('../db/database')

const router = Router()

const CATEGORY_ICONS = {
  'Frontend':    '🖥️',
  'Backend':     '⚙️',
  'Инструменты': '🛠️',
}

router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM skills ORDER BY category, sort_order, id').all()
    const map = {}
    rows.forEach(s => {
      if (!map[s.category]) {
        map[s.category] = { title: s.category, icon: CATEGORY_ICONS[s.category] || '💡', skills: [] }
      }
      map[s.category].skills.push({ id: s.id, name: s.name, level: s.level })
    })
    res.json({ categories: Object.values(map) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
