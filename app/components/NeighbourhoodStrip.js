'use client'

import { useRef } from 'react'

const BARRIOS = [
  { name: 'Gràcia',      vibe: 'Bohemian · Family',    tags: ['Quiet streets', 'Terraces', 'Markets'],      price: '€1,800', accent: '#C84B31' },
  { name: 'Eixample',    vibe: 'Design · Central',      tags: ['Modernisme', 'Restaurants', 'Shopping'],     price: '€2,100', accent: '#4A7FA5' },
  { name: 'Sarrià',      vibe: 'Upscale · Green',       tags: ['Parks', 'Schools', 'Village feel'],          price: '€2,400', accent: '#2A4A1E' },
  { name: 'El Born',     vibe: 'Hip · Cultural',        tags: ['Galleries', 'Cocktail bars', 'Medieval'],    price: '€1,950', accent: '#C9A84C' },
  { name: 'Barceloneta', vibe: 'Beach · Lively',        tags: ['Sea views', 'Seafood', 'Tourist hub'],       price: '€1,700', accent: '#6B8C5A' },
  { name: 'Gòtic',       vibe: 'Historic · Central',    tags: ['Cathedral', 'Tourism', 'Compact'],           price: '€1,650', accent: '#8C2010' },
  { name: 'Poblenou',    vibe: 'Tech · Creative',       tags: ['Startups', 'Beach access', 'Lofts'],         price: '€1,750', accent: '#4A7FA5' },
  { name: 'Les Corts',   vibe: 'Residential · Calm',    tags: ['Family-friendly', 'FC Barcelona', 'Parks'],  price: '€1,600', accent: '#2A4A1E' },
  { name: 'Sant Gervasi', vibe: 'Affluent · Quiet',     tags: ['Views', 'Cafés', 'Expat-friendly'],         price: '€2,200', accent: '#C9A84C' },
]

export default function NeighbourhoodStrip() {
  const scrollRef = useRef(null)

  function onWheel(e) {
    if (!scrollRef.current) return
    e.preventDefault()
    scrollRef.current.scrollLeft += e.deltaY
  }

  return (
    <section className="neighbourhood-strip">
      <div className="strip-header">
        <span className="strip-eyebrow">Explore Barcelona</span>
        <h2>Every barrio, <em>reimagined</em></h2>
      </div>

      <div className="barrios-scroll" ref={scrollRef} onWheel={onWheel}>
        {BARRIOS.map(b => (
          <div
            key={b.name}
            className="barrio-card"
            style={{ '--accent': b.accent }}
          >
            <div className="barrio-name">{b.name}</div>
            <div className="barrio-vibe">{b.vibe}</div>
            <div className="barrio-tags">
              {b.tags.map(t => (
                <span key={t} className="barrio-pill">{t}</span>
              ))}
            </div>
            <div className="barrio-price">
              <strong>{b.price}</strong> avg/mo
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
