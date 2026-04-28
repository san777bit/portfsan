import { personalInfo, socialLinks } from '../../data/config'
import { useModal } from '../../context/ModalContext'
import './Hero.css'

const SocialIcon = ({ icon }) => {
  const icons = {
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    telegram: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  }
  return icons[icon] || null
}

export default function Hero() {
  const { openModal } = useModal()

  return (
    <section id="hero" className="hero">
      {/* Chess floor */}
      <div className="hero__floor" />
      <div className="hero__vignette" />

      <div className="container hero__inner">

        {/* ── LEFT: text content ── */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span>{personalInfo.availableForWork ? 'STATUS: AVAILABLE' : 'STATUS: BUSY'}</span>
          </div>

          <p className="hero__greeting">// hello world</p>

          <h1 className="hero__name">
            {personalInfo.nickname}
            <span className="hero__cursor">_</span>
          </h1>

          <h2 className="hero__specialty">
            &lt;{personalInfo.specialty} /&gt;
          </h2>

          <p className="hero__tagline">{personalInfo.tagline}</p>

          <div className="hero__actions">
            <a href="#projects" className="hero__btn hero__btn--primary">
              <span>view projects</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <button className="hero__btn hero__btn--secondary" onClick={openModal}>
              contact me
            </button>
          </div>

          <div className="hero__socials">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label={link.name}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: 3D Renderer Window ── */}
        <div className="hero__visual">
          <div className="hero__renderer">

            {/* Title bar */}
            <div className="hero__win-titlebar">
              <div className="hero__win-btns">
                <span className="win-btn win-btn--r" />
                <span className="win-btn win-btn--y" />
                <span className="win-btn win-btn--g" />
              </div>
              <span className="hero__win-title">3D Studio Max 5.0 — Render</span>
            </div>

            {/* Toolbar */}
            <div className="hero__win-toolbar">
              <span className="hero__toolbar-item">Perspective</span>
              <span className="hero__toolbar-sep">|</span>
              <span className="hero__toolbar-item">Render: Final</span>
              <span className="hero__toolbar-sep">|</span>
              <span className="hero__toolbar-item">Frame 001/120</span>
            </div>

            {/* 3D Viewport */}
            <div className="hero__viewport">
              {/* Perspective ground grid */}
              <div className="hero__ground" />

              {/* Rotating CSS 3D Cube */}
              <div className="hero__cube-scene">
                <div className="hero__cube">
                  <div className="hero__cube-face hero__cube-face--front" />
                  <div className="hero__cube-face hero__cube-face--back" />
                  <div className="hero__cube-face hero__cube-face--left" />
                  <div className="hero__cube-face hero__cube-face--right" />
                  <div className="hero__cube-face hero__cube-face--top" />
                  <div className="hero__cube-face hero__cube-face--bottom" />
                </div>
              </div>

              {/* Floating geometry */}
              <div className="hero__geo hero__geo--1" />
              <div className="hero__geo hero__geo--2" />
              <div className="hero__geo hero__geo--3" />

              {/* Viewport label */}
              <span className="hero__viewport-label">PERSPECTIVE</span>
            </div>

            {/* Status bar */}
            <div className="hero__win-statusbar">
              <span className="hero__status-item hero__status-ready">READY</span>
              <span className="hero__toolbar-sep">|</span>
              <span className="hero__status-item">Verts: 8</span>
              <span className="hero__toolbar-sep">|</span>
              <span className="hero__status-item">Polys: 12</span>
              <span className="hero__toolbar-sep">|</span>
              <span className="hero__status-item">00:00:01.6</span>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>scroll</span>
      </div>
    </section>
  )
}
