import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
    { label: 'Overview', href: '#overview' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Commands', href: '#commands' },
    { label: 'Live Demo', href: '#demo' },
    { label: 'Install', href: '#install' },
    { label: 'Team', href: '#team' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('')
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40)
            const sections = document.querySelectorAll('section[id]')
            sections.forEach(s => {
                const top = s.offsetTop - 120
                if (window.scrollY >= top) setActive('#' + s.id)
            })
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            zIndex: 1000,
            padding: '0 24px',
            height: '68px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'all 0.35s ease',
            background: scrolled ? 'rgba(2,6,16,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(0,229,255,0.1)' : 'none',
        }}>
            {/* Logo */}
            <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.6rem' }}>🚁</span>
                <span style={{
                    fontWeight: 800, fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>VoiceControlDrone</span>
            </a>

            {/* Desktop links */}
            <ul style={{
                display: 'flex', gap: '4px', listStyle: 'none',
                '@media(max-width:768px)': { display: 'none' },
            }} className="nav-links-desktop">
                {NAV_LINKS.map(l => (
                    <li key={l.href}>
                        <a
                            href={l.href}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: active === l.href ? '#00e5ff' : '#94a3b8',
                                background: active === l.href ? 'rgba(0,229,255,0.08)' : 'transparent',
                                transition: 'all 0.2s',
                                display: 'block',
                            }}
                        >{l.label}</a>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <a
                href="https://github.com/LABBISRIKANTHBABU/VoiceControlDrone"
                target="_blank" rel="noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '0.82rem', padding: '9px 20px' }}
            >
                ⭐ GitHub
            </a>

            <style>{`
        .nav-links-desktop { display: flex; }
        @media (max-width: 768px) { .nav-links-desktop { display: none; } }
      `}</style>
        </nav>
    )
}
