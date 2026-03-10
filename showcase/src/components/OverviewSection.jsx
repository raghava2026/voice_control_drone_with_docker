import { useRef, useEffect, useState } from 'react'

const TECH = [
    { name: 'Python 3.10+', icon: '🐍', color: '#306998' },
    { name: 'FastAPI', icon: '⚡', color: '#009688' },
    { name: 'spaCy NLP', icon: '🧠', color: '#09a3d5' },
    { name: 'DroneKit', icon: '🔌', color: '#7c3aed' },
    { name: 'MAVLink', icon: '📡', color: '#f59e0b' },
    { name: 'ArduPilot SITL', icon: '🛩️', color: '#e11d48' },
    { name: 'Vosk STT', icon: '🔇', color: '#00e5ff' },
    { name: 'Whisper STT', icon: '🎙️', color: '#a78bfa' },
    { name: 'Uvicorn', icon: '🦄', color: '#8b5cf6' },
    { name: 'React + Vite', icon: '⚛️', color: '#10b981' },
]

function TechCard({ tech, delay }) {
    const [hovered, setHovered] = useState(false)
    const [rotX, setRotX] = useState(0)
    const [rotY, setRotY] = useState(0)
    const ref = useRef()

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        setRotX(-y / 10)
        setRotY(x / 10)
    }
    const onLeave = () => { setHovered(false); setRotX(0); setRotY(0) }

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
                padding: '18px 22px',
                borderRadius: 14,
                background: hovered ? `rgba(${tech.color === '#00e5ff' ? '0,229,255' : '124,58,237'},0.12)` : 'rgba(10,18,40,0.65)',
                border: '1px solid',
                borderColor: hovered ? tech.color : 'rgba(0,229,255,0.1)',
                backdropFilter: 'blur(14px)',
                display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'default',
                transform: `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                transition: 'border-color 0.25s, background 0.25s',
                boxShadow: hovered ? `0 0 24px ${tech.color}33` : 'none',
                animation: `fade-up 0.5s ${delay}ms ease both`,
            }}
        >
            <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: hovered ? '#fff' : 'var(--text-secondary)' }}>
                {tech.name}
            </span>
        </div>
    )
}

export default function OverviewSection() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
        obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="overview" className="section" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
            {/* Section background gradient */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(0,229,255,0.04), transparent)',
            }} />

            <div className="container">
                <div className="section-label">📋 Project Overview</div>
                <h2 className="section-title">What is VoiceControlDrone?</h2>

                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
                    alignItems: 'start',
                }}>
                    {/* Description */}
                    <div style={{ animation: visible ? 'slide-in-left 0.7s ease both' : 'none' }}>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                            VoiceControlDrone is a <strong style={{ color: '#e8f4fd' }}>fully offline, real-time</strong> voice-controlled
                            drone system built as a B.Tech final year project at <strong style={{ color: '#00e5ff' }}>G Pulla Reddy Engineering College</strong>.
                            You speak natural language commands through your browser's microphone,
                            and the system instantly parses your intent, extracts parameters, and executes precise MAVLink
                            flight maneuvers on a real or SITL-simulated drone — with zero internet required.
                        </p>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
                            Built by <strong style={{ color: '#a78bfa' }}>K. Raghavendra, L. Srikanth Babu &amp; V. Chandini</strong> — the system leverages
                            a dual-mode STT pipeline (<strong style={{ color: '#a78bfa' }}>Vosk</strong> + <strong style={{ color: '#00e5ff' }}>Whisper</strong>), spaCy's
                            NLP engine, FastAPI's async server, and DroneKit's MAVLink API for
                            sub-100ms command latency end-to-end.
                        </p>

                        {/* Feature highlights */}
                        {[
                            { icon: '🔒', t: 'Dual Offline STT', d: 'Vosk (real-time streaming) + Whisper (high-accuracy batch) — zero cloud dependency' },
                            { icon: '⚡', t: 'Real-time Execution', d: 'FastAPI threadpool prevents blocking; commands execute in < 100ms end-to-end' },
                            { icon: '🛡️', t: 'Safety-First Design', d: 'Arming checks, armability guards, and mode validation before every action' },
                            { icon: '🌐', t: 'SITL + Real Hardware', d: 'Works with ArduPilot SITL simulator or any MAVLink-capable drone via UDP' },
                        ].map(f => (
                            <div key={f.t} style={{
                                display: 'flex', gap: 14, marginBottom: 18,
                                animation: visible ? 'slide-in-left 0.6s ease both' : 'none',
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                    background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.1rem',
                                }}>{f.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{f.t}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{f.d}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tech stack grid */}
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 20 }}>
                            Technology Stack
                        </div>
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                            animation: visible ? 'slide-in-right 0.7s ease both' : 'none',
                        }}>
                            {TECH.map((t, i) => (
                                <TechCard key={t.name} tech={t} delay={i * 60} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          #overview .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}
