import EnquiryForm from './components/EnquiryForm'
import Chatbot from './components/Chatbot'
import { supabase } from './lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Home() {

  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      {/* ── NAV ── */}
      <nav className="barri-nav">
        <a href="/" className="barri-nav-logo">
          Bar<span>ri</span>
        </a>
        <ul className="barri-nav-links">
          <li>
            <a
              href="https://neighbourhoods-rho.vercel.app"
              className="barri-nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Barrios
            </a>
          </li>
          <li>
            <span className="barri-nav-link active">Rooms</span>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="barri-hero">
        <p className="barri-eyebrow">Hand-picked rooms</p>
        <h1 className="barri-hero-title">
          Find your room in<br />
          <em>Barcelona</em>
        </h1>
        <p className="barri-hero-sub">
          {rooms?.length ?? 0} curated rooms across Gràcia, Les Corts and beyond —
          with an AI concierge to help you choose.
        </p>
      </section>

      {/* ── MAIN GRID ── */}
      <main className="barri-main">

        {/* Left — Room listings */}
        <div className="barri-rooms">
          {rooms?.map((room, i) => (
            <article
              key={room.id}
              className="barri-room-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="barri-room-accent" />
              <div className="barri-room-inner">
                <p className="barri-room-neighbourhood">{room.neighbourhood}</p>
                <h2 className="barri-room-title">{room.title}</h2>
                <p className="barri-room-desc">{room.description}</p>
                <span className="barri-room-price">
                  €{room.price}
                  <span className="barri-room-price-unit">/mo</span>
                </span>
                <div className="barri-room-divider">
                  <EnquiryForm roomId={room.id} roomTitle={room.title} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right — Sticky AI chat */}
        <aside className="barri-chat-sticky">
          <Chatbot />
        </aside>

      </main>
    </>
  )
}
