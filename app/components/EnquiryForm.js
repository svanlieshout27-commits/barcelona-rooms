'use client'

import { useState } from 'react'

export default function EnquiryForm({ roomId, roomTitle }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, roomId, roomTitle })
    })

    setLoading(false)
    setSent(true)
  }

  if (sent) return (
    <p className="barri-form-success">✓ Enquiry sent — we'll be in touch soon.</p>
  )

  return (
    <form onSubmit={handleSubmit}>
      <p className="barri-form-title">Enquire about this room</p>

      <input
        required
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="barri-input"
      />

      <input
        required
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="barri-input"
      />

      <textarea
        placeholder="Message (optional)"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="barri-input barri-textarea"
      />

      <button
        type="submit"
        disabled={loading}
        className="barri-btn-submit"
      >
        {loading ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  )
}
