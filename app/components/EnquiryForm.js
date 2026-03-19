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
      body: JSON.stringify({
        name,
        email,
        message,
        roomId,
        roomTitle
      })
    })

    setLoading(false)
    setSent(true)
  }

  if (sent) return (
    <div className='bg-green-50 border border-green-200 rounded-xl p-6 text-center'>
      <p className='text-green-700'>Thanks! I'll reply within 24 hours.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>

      <h3 className='font-semibold'>Enquire about this room</h3>

      <input
        required
        placeholder='Your name'
        value={name}
        onChange={e => setName(e.target.value)}
        className='w-full border rounded-lg p-3'
      />

      <input
        required
        type='email'
        placeholder='Your email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='w-full border rounded-lg p-3'
      />

      <textarea
        placeholder='Message (optional)'
        value={message}
        onChange={e => setMessage(e.target.value)}
        className='w-full border rounded-lg p-3 h-24'
      />

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-orange-600 text-white py-3 rounded-lg font-medium disabled:opacity-50'
      >
        {loading ? 'Sending...' : 'Send Enquiry'}
      </button>

    </form>
  )

}