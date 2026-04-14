import { useEffect, useRef, useState } from 'react'
import './Skills.css'

function SkillBar({ name, level, animate }) {
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
}

function SkillCard({ category, animate }) {
  return (
    <div className="skill-card">
      <div className="skill-card__header">
        <span className="skill-card__icon">{category.icon}</span>
        <h3 className="skill-card__title">{category.title}</h3>
      </div>
      <div className="skill-card__bars">
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
}

export default function Skills() {
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)
  const [categories, setCategories] = useState([])

  // Fetch skills from API
  useEffect(() => {
    fetch('/api/skills')
      .then(r => r.json())
      .then(data => setCategories(data.categories || []))
      .catch(() => {})
  }, [])

  // Intersection observer — trigger animation when section is visible
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

  // If data loads after section was already in view, animate immediately
  useEffect(() => {
    if (categories.length === 0) return
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) {
      setAnimate(true)
    }
  }, [categories])

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="skills__bg-grid" />

      <div className="container">
        <div className="section-header">
          <span className="section-label">Что я умею</span>
          <h2 className="section-title">Навыки &amp; Технологии</h2>
          <p className="section-subtitle">
            Стек технологий, которые я использую для создания современных веб-приложений
          </p>
        </div>

        <div className="skills__grid">
          {categories.map((cat, i) => (
            <SkillCard
              key={cat.title}
              category={cat}
              animate={animate}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <div className="skills__badges">
          <p className="skills__badges-label">Также работаю с:</p>
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
