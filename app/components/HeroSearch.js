'use client'

import { useState } from 'react'

const TAGS = [
  '🗺️ Gràcia',
  '🏖️ Barceloneta',
  '🌿 Sarrià',
  '🎨 Eixample',
  '🏛️ Gòtic',
]

export default function HeroSearch() {
  const [query, setQuery] = useState('')

  function scrollToListings() {
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    scrollToListings()
  }

  function handleTag(tag) {
    // Strip emoji — keep just the neighbourhood name
    const name = tag.replace(/^\S+\s/, '')
    setQuery(name)
    scrollToListings()
  }

  return (
    <>
      <form className="hero-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a neighbourhood or room…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Explore →</button>
      </form>

      <div className="hero-tags">
        {TAGS.map(tag => (
          <span key={tag} className="hero-tag" onClick={() => handleTag(tag)}>
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}
