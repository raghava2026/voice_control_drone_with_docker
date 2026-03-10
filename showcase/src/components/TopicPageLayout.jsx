import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ParticleField from './ParticleField.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

/**
 * Shared wrapper for all topic detail pages.
 * Props:
 *   title        – page headline
 *   label        – small uppercase badge text
 *   accentColor  – hex colour for all accents / glows
 *   icon         – emoji icon
 *   sections     – array of { heading, body: string|JSX, code?: string, lang?: string }
 *   relatedCards – array of { title, href, icon } cross-links
 */
export default function TopicPageLayout({ title, label, accentColor, icon, sections = [], relatedCards = [] }) {
    const navigate = useNavigate()

    // Scroll to top on mount
    useEffect(() => { window.scrollTo({ top: 0 }) }, [])

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', position: 'relative' }}>
            <ParticleField />
            <Navbar />

            {/* ── Hero banner ── */}
            <div style={{
                paddingTop: 120, paddingBottom: 64,
                position: 'relative', zIndex: 1,
                background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${accentColor}14, transparent 70%)`,
                borderBottom: `1px solid ${accentColor}22`,
            }}>
                <div className="container">
                    {/* Back button */}
                    <button
                        onClick={() => navigate('/#architecture')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 50, padding: '7px 16px', cursor: 'pointer',
                            fontFamily: 'var(--font)', fontSize: '0.82rem', color: 'var(--text-muted)',
                            marginBottom: 32, transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.color = accentColor }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                    >
                        ← Back to Architecture
                    </button>

                    {/* Badge */}
                    <div className="section-label" style={{ color: accentColor }}
                    >
                        {label}
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                        fontWeight: 900, lineHeight: 1.1,
                        background: `linear-gradient(135deg, #e8f4fd 30%, ${accentColor})`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        marginBottom: 0,
                    }}>
                        <span style={{ fontSize: '0.85em', marginRight: 16 }}>{icon}</span>{title}
                    </h1>
                </div>
            </div>

            {/* ── Content ── */}
            <main style={{ position: 'relative', zIndex: 1, padding: '64px 0 80px' }}>
                <div className="container" style={{ maxWidth: 860 }}>
                    {sections.map((s, i) => (
                        <div key={i} style={{
                            marginBottom: 52,
                            animation: `fade-up 0.5s ${i * 80}ms ease both`,
                        }}>
                            <h2 style={{
                                fontSize: '1.35rem', fontWeight: 800, marginBottom: 16,
                                color: i === 0 ? accentColor : 'var(--text-primary)',
                                display: 'flex', alignItems: 'center', gap: 10,
                            }}>
                                {s.icon && <span>{s.icon}</span>}
                                {s.heading}
                            </h2>

                            {/* Body text */}
                            {s.body && (
                                <div style={{
                                    fontSize: '1rem', color: 'var(--text-secondary)',
                                    lineHeight: 1.85, marginBottom: s.code ? 20 : 0,
                                }}>
                                    {s.body}
                                </div>
                            )}

                            {/* Inline bullets */}
                            {s.bullets && (
                                <ul style={{ margin: '14px 0 0', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {s.bullets.map((b, bi) => (
                                        <li key={bi} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                            <strong style={{ color: accentColor }}>{b.term}:</strong>{' '}{b.desc}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Code block */}
                            {s.code && (
                                <CopyBlock code={s.code} lang={s.lang || 'python'} accent={accentColor} />
                            )}

                            {/* Info card tiles */}
                            {s.tiles && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14, marginTop: 20 }}>
                                    {s.tiles.map((tile, ti) => (
                                        <div key={ti} style={{
                                            padding: '18px 20px', borderRadius: 14,
                                            background: `${accentColor}0a`, border: `1px solid ${accentColor}22`,
                                        }}>
                                            <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{tile.icon}</div>
                                            <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 4 }}>{tile.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{tile.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* ── Related topics ── */}
                    {relatedCards.length > 0 && (
                        <div style={{ marginTop: 56 }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>
                                Explore Related Topics
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                                {relatedCards.map(card => (
                                    <button key={card.href} onClick={() => navigate(card.href)} style={{
                                        background: 'rgba(10,18,40,0.7)', border: '1px solid var(--border)',
                                        borderRadius: 14, padding: '18px 20px', cursor: 'pointer',
                                        textAlign: 'left', fontFamily: 'var(--font)', transition: 'all 0.25s',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,229,255,0.15)' }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                                    >
                                        <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{card.icon}</div>
                                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: 4 }}>{card.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#00e5ff' }}>Read more →</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

/* ── Inline copy code block ── */
function CopyBlock({ code, lang, accent }) {
    const copy = () => navigator.clipboard.writeText(code)
    return (
        <div style={{ borderRadius: 12, overflow: 'hidden', background: 'rgba(0,0,0,0.5)', border: `1px solid ${accent}22`, marginTop: 4 }}>
            <div style={{ padding: '8px 16px', background: 'rgba(0,0,0,0.35)', borderBottom: `1px solid ${accent}18`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lang}</span>
                <button onClick={copy} style={{ background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: 6, padding: '3px 10px', cursor: 'pointer', fontSize: '0.72rem', color: accent, fontFamily: 'var(--font)' }}>📋 Copy</button>
            </div>
            <pre style={{ padding: 18, margin: 0, fontFamily: 'var(--mono)', fontSize: '0.83rem', lineHeight: 1.8, overflowX: 'auto', color: '#e2e8f0' }}>{code}</pre>
        </div>
    )
}
