import { useState, useEffect } from 'react'
import { navLinks, personalInfo } from '../../data/config'
import { useModal } from '../../context/ModalContext'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const { openModal } = useModal()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Highlight active nav link
      const sections = navLinks.map(l => l.href)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setActiveSection(href)
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        {/* Logo / Name */}
        <a href="#hero" className="header__logo" onClick={() => handleNavClick('#hero')}>
          <span className="header__logo-bracket">&lt;</span>
          {personalInfo.nickname}
          <span className="header__logo-bracket">/&gt;</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`header__nav-link ${activeSection === link.href ? 'active' : ''}`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </a>
          ))}
          <button className="header__cta" onClick={openModal}>
            Связаться
          </button>
        </nav>

        {/* Burger (mobile) */}
        <button
          className={`header__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`header__mobile-link ${activeSection === link.href ? 'active' : ''}`}
            onClick={() => handleNavClick(link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}
