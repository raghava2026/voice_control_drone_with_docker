const TECH_BADGES = [
    { name: 'Python', color: '#306998' },
    { name: 'FastAPI', color: '#009688' },
    { name: 'spaCy', color: '#09a3d5' },
    { name: 'DroneKit', color: '#7c3aed' },
    { name: 'MAVLink', color: '#f59e0b' },
    { name: 'Vosk', color: '#00e5ff' },
    { name: 'Whisper', color: '#a78bfa' },
    { name: 'ArduPilot', color: '#e11d48' },
    { name: 'React', color: '#61dafb' },
]

export default function Footer() {
    return (
        <footer style={{
            position: 'relative', zIndex: 1,
            borderTop: '1px solid rgba(0,229,255,0.1)',
            background: 'rgba(2,6,16,0.9)',
            backdropFilter: 'blur(20px)',
            padding: '48px 0 32px',
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 36, marginBottom: 40 }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <span style={{ fontSize: '1.6rem' }}>🚁</span>
                            <span style={{
                                fontWeight: 800, fontSize: '1.1rem',
                                background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>VoiceControlDrone</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 240 }}>
                            A fully offline, real-time voice-controlled drone system.
                            B.Tech Final Year Project at{' '}
                            <span style={{ color: '#00e5ff', fontWeight: 600 }}>G Pulla Reddy Engineering College</span>.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Quick Links</div>
                        {[
                            { label: '#overview', text: 'Overview' },
                            { label: '#architecture', text: 'Architecture' },
                            { label: '#commands', text: 'Commands' },
                            { label: '#demo', text: 'Live Demo' },
                            { label: '#install', text: 'Installation' },
                            { label: '#team', text: 'Team' },
                        ].map(l => (
                            <a key={l.label} href={l.label} style={{
                                display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)',
                                textDecoration: 'none', padding: '3px 0',
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = '#00e5ff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                            >{l.text}</a>
                        ))}
                    </div>

                    {/* GitHub card */}
                    <div>
                        <div style={{ fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Source Code</div>
                        <a
                            href="https://github.com/LABBISRIKANTHBABU/VoiceControlDrone"
                            target="_blank" rel="noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '14px 18px', borderRadius: 12,
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                textDecoration: 'none', color: 'var(--text-primary)',
                                transition: 'all 0.25s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.background = 'rgba(0,229,255,0.06)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>🐙</span>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>GitHub Repository</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LABBISRIKANTHBABU / VoiceControlDrone</div>
                            </div>
                        </a>

                        {/* Tech badges */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
                            {TECH_BADGES.map(b => (
                                <span key={b.name} style={{
                                    fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px',
                                    borderRadius: 50, border: `1px solid ${b.color}44`,
                                    color: b.color, background: `${b.color}11`,
                                }}>{b.name}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)', marginBottom: 24 }} />

                {/* Copyright */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        © 2026 K. Raghavendra · L. Srikanth Babu · V. Chandini &mdash; VoiceControlDrone. MIT License.
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Built with <span style={{ color: '#ef4444' }}>❤️</span> using React + Three.js + FastAPI
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
          footer .container > div:last-child { flex-direction: column; text-align: center; }
        }
      `}</style>
        </footer>
    )
}
