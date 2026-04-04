'use client'

const SERVICES = [
  {
    icon: '🏢',
    name: 'Rental Platform',
    desc: 'Hand-picked long and short-term rentals across every barrio. Our AI concierge helps you choose the right one.',
    count: 'Browse listings below',
    featured: true,
  },
  {
    icon: '🗺️',
    name: 'Neighbourhood Guide',
    desc: 'Vibe, transport, cost of living, and hidden gems — for every barrio in Barcelona. 90 neighbourhoods covered.',
    count: '90 neighbourhoods',
    href: 'https://neighbourhoods-rho.vercel.app',
  },
  {
    icon: '📋',
    name: 'Gestors',
    desc: 'NIE, taxes, contracts, residency. Vetted gestors who speak English and know expat paperwork inside out.',
    count: 'Coming soon',
  },
  {
    icon: '👶',
    name: 'Babysitters',
    desc: 'Trusted, reviewed babysitters near your rental. Matched by neighbourhood, language, and schedule.',
    count: 'Coming soon',
  },
  {
    icon: '🐕',
    name: 'Dog Walkers',
    desc: 'Local dog walkers who know your barrio\'s parks and routes. GPS-tracked walks, daily updates.',
    count: 'Coming soon',
  },
  {
    icon: '✂️',
    name: 'Hairdressers',
    desc: 'Salons and barbers within walking distance. English-speaking options highlighted for newcomers.',
    count: 'Coming soon',
  },
]

export default function ServicesSection() {
  return (
    <section className="services" id="services">
      <div className="services-header">
        <h2>Everything you need,<br /><em>where you need it</em></h2>
        <p>Six interconnected services, all filtered to your neighbourhood. Move in on Monday, find a babysitter by Tuesday.</p>
      </div>

      <div className="services-grid">
        {SERVICES.map(s => (
          <div
            key={s.name}
            className={`service-tile${s.featured ? ' featured' : ''}`}
            onClick={s.href ? () => window.open(s.href, '_blank') : undefined}
          >
            <span className="service-icon">{s.icon}</span>
            <div className="service-name">{s.name}</div>
            <div className="service-desc">{s.desc}</div>
            <div className="service-count">{s.count}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
