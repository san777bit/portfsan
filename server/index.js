require('dotenv').config({ path: require('path').join(__dirname, '.env') })
const express = require('express')
const cors = require('cors')
const path = require('path')

const contactRouter  = require('./routes/contact')
const adminRouter    = require('./routes/admin')
const skillsRouter   = require('./routes/skills')
const projectsRouter = require('./routes/projects')

const app  = express()
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'] }))
}

app.use(express.json())

app.use('/api/skills',   skillsRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/contact',  contactRouter)
app.use('/api/admin',    adminRouter)

app.use('/admin', express.static(path.join(__dirname, 'admin')))

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '..', 'dist')
  app.use(express.static(dist))
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
