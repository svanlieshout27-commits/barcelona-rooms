'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = document.getElementById('barri-cursor')
    const ring = document.getElementById('barri-cursor-ring')
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let animId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = mx + 'px'
      cursor.style.top = my + 'px'
    }

    function animateRing() {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      animId = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    animateRing()

    // Scale on interactive elements
    const onEnter = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)'
      ring.style.opacity = '0.2'
    }
    const onLeave = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      ring.style.opacity = '0.5'
    }

    const targets = document.querySelectorAll(
      'button, a, .barrio-card, .service-tile, .listing-card, .hero-tag, .suggest-chip, input, textarea'
    )
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div id="barri-cursor" className="barri-cursor" />
      <div id="barri-cursor-ring" className="barri-cursor-ring" />
    </>
  )
}
