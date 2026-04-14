import { useEffect, useRef } from 'react'
import { useModal } from '../../context/ModalContext'
import { useContactForm } from '../../hooks/useContactForm'
import './ContactModal.css'

export default function ContactModal() {
  const { isOpen, closeModal } = useModal()
  const { fields, handleChange, handleSubmit, status, error, reset } = useContactForm()
  const overlayRef = useRef(null)
  const firstInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstInputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const handleClose = () => {
    if (status === 'submitting') return
    closeModal()
    setTimeout(reset, 300)
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose()
  }

  if (!isOpen) return null

  return (
    <div className="cm-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="cm-card" role="dialog" aria-modal="true" aria-label="Форма обращения">
        <button className="cm-close" onClick={handleClose} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {status === 'success' ? (
          <div className="cm-success">
            <div className="cm-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="36" height="36">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <h3>Заявка отправлена!</h3>
            <p>Свяжусь с вами в ближайшее время.</p>
            <button className="cm-btn" onClick={handleClose}>Закрыть</button>
          </div>
        ) : (
          <>
            <div className="cm-header">
              <span className="cm-label">Новый проект</span>
              <h2 className="cm-title">Расскажите о задаче</h2>
            </div>

            <form className="cm-form" onSubmit={handleSubmit}>
              <div className="cm-field">
                <label htmlFor="cm-name">Имя</label>
                <input
                  ref={firstInputRef}
                  id="cm-name"
                  name="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={fields.name}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  maxLength={100}
                />
              </div>

              <div className="cm-field">
                <label htmlFor="cm-contact">Контакт</label>
                <input
                  id="cm-contact"
                  name="contact"
                  type="text"
                  placeholder="Email или Telegram"
                  value={fields.contact}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  maxLength={200}
                />
              </div>

              <div className="cm-field">
                <label htmlFor="cm-task">Задача</label>
                <textarea
                  id="cm-task"
                  name="task"
                  placeholder="Опишите проект или задачу..."
                  value={fields.task}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  maxLength={2000}
                  rows={4}
                />
              </div>

              {error && <p className="cm-error">{error}</p>}

              <button
                type="submit"
                className="cm-btn"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <span className="cm-spinner" />
                    Отправляю...
                  </>
                ) : 'Отправить'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
