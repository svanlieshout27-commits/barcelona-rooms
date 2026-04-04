'use client'

import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  'Show me rooms in Gràcia',
  'Best barrio for families?',
  'Compare Gràcia vs Les Corts',
  'What\'s the average rent?',
  'Do you have pet-friendly rooms?',
]

export default function Chatbot() {
  const [messages, setMessages] = useState([{
    role: 'bot',
    text: 'Hola! I\'m your Barcelona concierge. Tell me about your situation — budget, neighbourhood preferences, family size — and I\'ll help you find the perfect room. 🏠',
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text) {
    const userMsg = (text ?? input).trim()
    if (!userMsg) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-avatar">B</div>
        <div>
          <div className="chat-name">Barri AI</div>
          <div className="chat-status">
            <span className="chat-dot" />
            Online · responds instantly
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role === 'user' ? 'user' : 'ai'}`}>
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble ai typing">
            <span /><span /><span />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      <div className="chat-suggestions">
        {SUGGESTIONS.map(s => (
          <span
            key={s}
            className="suggest-chip"
            onClick={() => sendMessage(s)}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Input row */}
      <div className="chat-input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about neighbourhoods, rooms, or moving to Barcelona…"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
        >
          Send →
        </button>
      </div>
    </div>
  )
}
