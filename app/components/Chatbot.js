'use client'

import { useState, useRef, useEffect } from 'react'

export default function Chatbot() {

  const [messages, setMessages] = useState([{
    role: 'bot',
    text: 'Hola! Ask me anything about our rooms in Barcelona!'
  }])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {

    if (!input.trim()) return

    const userMsg = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg })
    })

    const data = await res.json()
    setLoading(false)
    setMessages(prev => [...prev, { role: 'bot', text: data.reply }])

  }

  return (
    <div className='border rounded-xl overflow-hidden flex flex-col h-96'>

      <div className='bg-gray-900 text-white p-4 text-sm font-medium'>
        Ask our assistant anything
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50'>

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                m.role === 'user'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white border text-gray-800'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className='text-gray-400 text-sm'>Thinking...</div>
        )}

        <div ref={bottomRef} />

      </div>

      <div className='p-3 border-t flex gap-2'>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder='Type your question...'
          className='flex-1 border rounded-lg px-3 py-2 text-sm'
        />
        <button
          onClick={sendMessage}
          className='bg-orange-600 text-white px-4 py-2 rounded-lg text-sm'
        >
          Send
        </button>
      </div>

    </div>
  )

}