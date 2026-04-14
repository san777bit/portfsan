import { useState, useEffect } from 'react'
import './Projects.css'

const gradientMap = {
  'gradient-1': 'linear-gradient(135deg, #1e3a5f 0%, #1a2a4a 100%)',
  'gradient-2': 'linear-gradient(135deg, #2d1b69 0%, #1e1040 100%)',
  'gradient-3': 'linear-gradient(135deg, #1a3a2e 0%, #0f2a20 100%)',
  'gradient-4': 'linear-gradient(135deg, #3a1a2e 0%, #2a0f20 100%)',
  'gradient-5': 'linear-gradient(135deg, #3a2a1a 0%, #2a1a0f 100%)',
  'gradient-6': 'linear-gradient(135deg, #1a2a3a 0%, #0f1a2a 100%)',
}

function ProjectCard({ project, index }) {
  return (
    <article
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div
        className="project-card__illustration"
        style={{ background: gradientMap[project.gradient] || gradientMap['gradient-1'] }}
      >
        <span className="project-card__emoji">{project.emoji}</span>
        <div className="project-card__shape project-card__shape--1" />
        <div className="project-card__shape project-card__shape--2" />
        {project.featured && (
          <div className="project-card__featured-badge">Featured</div>
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>

        <div className="project-card__links">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--ghost"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--primary"
          >
            Live Demo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => setProjects(data.projects || []))
      .catch(() => {})
  }, [])

  const filters = ['all', 'featured']
  const filtered = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects

  return (
    <section id="projects" className="projects">
      <div className="projects__orb" />

      <div className="container">
        <div className="section-header">
          <span className="section-label">Мои работы</span>
          <h2 className="section-title">Проекты</h2>
          <p className="section-subtitle">
            Избранные проекты, демонстрирующие мои навыки и опыт
          </p>
        </div>

        <div className="projects__filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`projects__filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Все проекты' : 'Избранные'}
              <span className="projects__filter-count">
                {f === 'all' ? projects.length : projects.filter(p => p.featured).length}
              </span>
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
