'use client'

import { useState } from 'react'
import EnquiryForm from './EnquiryForm'

const NEIGHBOURHOOD_GRADIENTS = {
  'Gràcia':       'linear-gradient(135deg, #C84B31 0%, #E8795F 40%, #D4B896 100%)',
  'Les Corts':    'linear-gradient(135deg, #4A7FA5 0%, #2D5A7A 50%, #1C3A52 100%)',
  'Eixample':     'linear-gradient(135deg, #2A4A1E 0%, #6B8C5A 60%, #D4B896 100%)',
  'Sarrià':       'linear-gradient(135deg, #2A4A1E 0%, #6B8C5A 100%)',
  'El Born':      'linear-gradient(135deg, #C9A84C 0%, #A07830 100%)',
  'Barceloneta':  'linear-gradient(135deg, #4A7FA5 0%, #6B8C5A 100%)',
  'Gòtic':        'linear-gradient(135deg, #8C2010 0%, #C84B31 100%)',
  'Poblenou':     'linear-gradient(135deg, #4A7FA5 0%, #2D5A7A 100%)',
  'Sant Gervasi': 'linear-gradient(135deg, #C9A84C 0%, #D4B896 100%)',
}

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #C84B31 0%, #E8795F 100%)'

const BADGES = ['New', 'Popular', 'Available now', 'Great value']

export default function ListingCard({ room, index }) {
  const [showForm, setShowForm] = useState(false)

  const gradient = NEIGHBOURHOOD_GRADIENTS[room.neighbourhood] ?? DEFAULT_GRADIENT
  const badge = index === 0 ? 'New' : index % 3 === 1 ? 'Popular' : null

  return (
    <div className="listing-card">
      {/* Image area */}
      <div className="listing-img">
        <div className="listing-img-inner" style={{ background: gradient }} />
        {badge && <span className="listing-badge">{badge}</span>}
      </div>

      {/* Body */}
      <div className="listing-body">
        <div className="listing-barrio">{room.neighbourhood}</div>
        <div className="listing-title">{room.title}</div>
        {room.description && (
          <div className="listing-desc">{room.description}</div>
        )}

        {/* Price + enquire toggle */}
        <div className="listing-price-row">
          <div>
            <span className="price">€{room.price}</span>
            <span className="per"> /mo</span>
          </div>
          <button
            className="enquire-btn"
            onClick={() => setShowForm(v => !v)}
          >
            {showForm ? 'Close ✕' : 'Enquire →'}
          </button>
        </div>

        {/* Collapsible enquiry form */}
        {showForm && (
          <div className="listing-enquiry">
            <EnquiryForm roomId={room.id} roomTitle={room.title} />
          </div>
        )}
      </div>
    </div>
  )
}
