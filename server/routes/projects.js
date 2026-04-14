const { Router } = require('express')
const db = require('../db/database')

const router = Router()

router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM projects ORDER BY sort_order, id').all()
    const projects = rows.map(p => ({
      id:          p.id,
      title:       p.title,
      description: p.description,
      emoji:       p.emoji,
      gradient:    p.gradient,
      tags:        JSON.parse(p.tags || '[]'),
      liveUrl:     p.live_url,
      githubUrl:   p.github_url,
      featured:    Boolean(p.featured),
    }))
    res.json({ projects })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
