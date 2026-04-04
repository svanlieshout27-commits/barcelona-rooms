import Cursor from './components/Cursor'
import HeroSearch from './components/HeroSearch'
import NeighbourhoodStrip from './components/NeighbourhoodStrip'
import ServicesSection from './components/ServicesSection'
import Chatbot from './components/Chatbot'
import ListingCard from './components/ListingCard'
import ScrollReveal from './components/ScrollReveal'
import { supabase } from './lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      {/* Custom cursor */}
      <Cursor />
      <ScrollReveal />

      {/* ── NAV ── */}
      <nav>
        <div className="logo">barri<span>.</span></div>
        <ul>
          <li>
            <a
              href="https://neighbourhoods-rho.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neighbourhoods
            </a>
          </li>
          <li><a href="#listings">Rentals</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#concierge" className="nav-cta">Ask AI</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Barcelona · AI-Powered Living Guide</p>
          <h1 className="hero-title">
            Find your<br />
            <em>neighbourhood.</em><br />
            <strong>Find your room.</strong>
          </h1>
          <p className="hero-desc">
            Hand-picked rooms and everything in between — filtered by the barrio
            you&apos;ll call home. {rooms?.length ?? 0} curated rooms available now.
          </p>
          <HeroSearch />
        </div>

        <div className="hero-right">
          <div className="hero-mosaic">
            <a
              className="mosaic-cell"
              href="https://neighbourhoods-rho.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              <span className="mosaic-icon">🗺️</span>
              <span className="mosaic-label">Neighbourhoods</span>
            </a>
            <div className="mosaic-cell">
              <span className="mosaic-icon">🏢</span>
              <span className="mosaic-label">Rentals</span>
            </div>
            <div className="mosaic-cell">
              <span className="mosaic-icon">👶</span>
              <span className="mosaic-label">Babysitters</span>
            </div>
            <div className="mosaic-cell">
              <span className="mosaic-icon">🐕</span>
              <span className="mosaic-label">Dog Walkers</span>
            </div>
            <div className="mosaic-cell">
              <span className="mosaic-icon">📋</span>
              <span className="mosaic-label">Gestors</span>
            </div>
            <div className="mosaic-cell">
              <span className="mosaic-icon">✂️</span>
              <span className="mosaic-label">Hairdressers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEIGHBOURHOOD STRIP ── */}
      <NeighbourhoodStrip />

      {/* ── SERVICES ── */}
      <ServicesSection />

      {/* ── AI CONCIERGE ── */}
      <section className="concierge" id="concierge">
        <div className="concierge-inner">
          <span className="concierge-eyebrow">AI Concierge</span>
          <h2>Ask anything about<br /><em>Barcelona living</em></h2>
          <p>
            Our AI connects the dots between neighbourhoods, rooms, and services.
            Tell it what you need — it helps you find the right fit instantly.
          </p>
          <Chatbot />
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section className="listings" id="listings">
        <div className="listings-header">
          <h2>Available <em>rooms</em></h2>
          <span className="view-all">{rooms?.length ?? 0} listings</span>
        </div>

        <div className="listings-grid">
          {rooms?.map((room, i) => (
            <ListingCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-brand">
          <span className="logo">
            barri<span style={{ color: 'var(--rust)' }}>.</span>
          </span>
          <p>
            The AI-powered platform for expats and locals finding their place
            in Barcelona. Every service, every barrio.
          </p>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#listings">Rentals</a></li>
            <li>
              <a
                href="https://neighbourhoods-rho.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Neighbourhoods
              </a>
            </li>
            <li><a href="#concierge">AI Concierge</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Gestors</a></li>
            <li><a href="#services">Babysitters</a></li>
            <li><a href="#services">Dog Walkers</a></li>
            <li><a href="#services">Hairdressers</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </footer>

      <div className="footer-bottom">
        © 2026 Barri. Barcelona Living Platform.
      </div>
    </>
  )
}
