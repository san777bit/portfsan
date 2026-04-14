import { useState } from 'react'

const INITIAL = { name: '', contact: '', task: '' }

export function useContactForm() {
  const [fields, setFields] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Ошибка отправки')
        setStatus('error')
        return
      }
      setStatus('success')
      setFields(INITIAL)
    } catch {
      setError('Нет соединения с сервером')
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setError('')
    setFields(INITIAL)
  }

  return { fields, handleChange, handleSubmit, status, error, reset }
}
