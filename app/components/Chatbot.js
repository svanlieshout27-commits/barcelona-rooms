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
    <div className="barri-chat">

      <div className="barri-chat-header">
        <div className="barri-chat-avatar">🏠</div>
        <div>
          <p className="barri-chat-name">Barri Assistant</p>
          <p className="barri-chat-status">
            <span className="barri-chat-dot" />
            Online
          </p>
        </div>
      </div>

      <div className="barri-chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`barri-chat-bubble-wrap ${m.role === 'user' ? 'user' : ''}`}
          >
            <div className={`barri-chat-bubble ${m.role === 'user' ? 'user' : 'ai'}`}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="barri-chat-bubble-wrap">
            <div className="barri-chat-bubble ai typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="barri-chat-input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about rooms, neighbourhoods…"
          className="barri-chat-input"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="barri-chat-send"
        >
          Send
        </button>
      </div>

    </div>
  )
}
