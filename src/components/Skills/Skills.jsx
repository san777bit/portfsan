import { useEffect, useRef, useState, memo } from 'react'
import './Skills.css'

const SkillBar = memo(function SkillBar({ name, level, animate }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
})

const CATEGORY_ABBR = {
  'Frontend': 'FE',
  'Backend': 'BE',
  'Инструменты': 'DEV',
}

const SkillCard = memo(function SkillCard({ category, animate }) {
  const abbr = CATEGORY_ABBR[category.title] || category.title.slice(0, 3).toUpperCase()

  return (
    <div className="skill-card">
      {/* 2000s window title bar */}
      <div className="skill-card__titlebar">
        <div className="skill-card__win-btns">
          <span className="win-btn win-btn--r" />
          <span className="win-btn win-btn--y" />
          <span className="win-btn win-btn--g" />
        </div>
        <span className="skill-card__abbr">[{abbr}]</span>
        <span className="skill-card__win-title">{category.title}.exe</span>
      </div>

      {/* Content */}
      <div className="skill-card__body">
        {category.skills.map((skill) => (
          <SkillBar
            key={skill.id ?? skill.name}
            name={skill.name}
            level={skill.level}
            animate={animate}
          />
        ))}
      </div>
    </div>
  )
})

export default function Skills() {
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/skills', { signal: controller.signal })
      .then(r => r.json())
      .then(data => setCategories(data.categories || []))
      .catch(err => { if (err.name !== 'AbortError') console.error(err) })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (categories.length === 0) return
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) setAnimate(true)
  }, [categories])

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="skills__bg-grid" />

      <div className="container">
        <div className="section-header">
          <span className="section-label">What I know</span>
          <h2 className="section-title">Skills &amp; Stack</h2>
          <p className="section-subtitle">
            Technologies I use to build modern web applications
          </p>
        </div>

        <div className="skills__grid">
          {categories.map((cat) => (
            <SkillCard
              key={cat.title}
              category={cat}
              animate={animate}
            />
          ))}
        </div>

        <div className="skills__badges">
          <p className="skills__badges-label">Also work with:</p>
          <div className="skills__badges-list">
            {['Redux', 'Zustand', 'Jest', 'Vitest', 'CI/CD', 'AWS', 'Nginx', 'GraphQL', 'Prisma', 'Next.js'].map((tag) => (
              <span key={tag} className="skills__badge">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
