const { Router } = require('express')
const db = require('../db/database')

const router = Router()

router.post('/', async (req, res) => {
  const { name, contact, task } = req.body

  const nameT    = (name    || '').trim()
  const contactT = (contact || '').trim()
  const taskT    = (task    || '').trim()

  if (!nameT)              return res.status(400).json({ error: 'Укажите имя' })
  if (!contactT)           return res.status(400).json({ error: 'Укажите контакт' })
  if (!taskT)              return res.status(400).json({ error: 'Опишите задачу' })
  if (nameT.length > 100)  return res.status(400).json({ error: 'Имя слишком длинное' })
  if (contactT.length > 200) return res.status(400).json({ error: 'Контакт слишком длинный' })
  if (taskT.length > 2000) return res.status(400).json({ error: 'Описание слишком длинное' })

  // Save to SQLite as silent backup
  try {
    db.prepare('INSERT INTO clients (name, contact, task) VALUES (?, ?, ?)').run(nameT, contactT, taskT)
  } catch (err) {
    console.error('SQLite backup error:', err)
  }

  // Send to Google Sheets webhook (if configured)
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameT, contact: contactT, task: taskT }),
      })
    } catch (err) {
      console.error('Google Sheets webhook error:', err)
    }
  }

  res.status(201).json({ success: true })
})

module.exports = router
