'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe cards after a short delay to let the DOM settle
    const timer = setTimeout(() => {
      document.querySelectorAll('.barrio-card, .service-tile, .listing-card').forEach(el => {
        el.classList.add('reveal')
        observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return null
}
