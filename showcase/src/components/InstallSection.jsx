import { useState, useRef, useEffect } from 'react'

const STEPS = [
    {
        n: 1, title: 'Clone the Repository', icon: '📥',
        code: `git clone https://github.com/LABBISRIKANTHBABU/VoiceControlDrone.git\ncd VoiceControlDrone`,
        lang: 'bash',
    },
    {
        n: 2, title: 'Create Virtual Environment', icon: '🐍',
        code: `python -m venv venv\n# Windows\nvenv\\Scripts\\activate\n# Linux/Mac\nsource venv/bin/activate`,
        lang: 'bash',
    },
    {
        n: 3, title: 'Install All Dependencies', icon: '📦',
        code: `pip install -r requirements.txt\n# spaCy language model\npython -m spacy download en_core_web_sm\n# Offline Whisper STT + bundled ffmpeg\npip install openai-whisper imageio-ffmpeg`,
        lang: 'bash',
    },
    {
        n: 4, title: 'Run ArduPilot SITL', icon: '🛩️',
        code: `# In a separate terminal, start the drone simulator:\nsim_vehicle.py -v Copter --console --map\n# Wait for: "GPS lock" or "Ready to FLY"`,
        lang: 'bash',
    },
    {
        n: 5, title: 'Connect QGroundControl', icon: '📶',
        code: `# Open QGroundControl — it auto-connects to SITL on UDP 14550\n# Alternatively, connect a real drone via USB/telemetry radio\n# Verify: Drone appears on map with GPS fix`,
        lang: 'text',
    },
    {
        n: 6, title: 'Start the FastAPI Server', icon: '⚡',
        code: `python server.py\n# Backend starts at http://localhost:8002\n# /command  – accepts NLP voice commands\n# /telemetry – real-time drone telemetry\n# /stt      – offline Whisper transcription`,
        lang: 'bash',
    },
    {
        n: 7, title: 'Open the Voice Interface', icon: '🎙️',
        code: `# Showcase website (React):\nhttp://localhost:5173/\n\n# Original HTML voice interface:\nhttp://localhost:8002/\n\n# 1. Allow microphone access\n# 2. Select STT mode: Whisper (offline) or Web Speech\n# 3. Speak: "Take off 10 meters"`,
        lang: 'text',
    },
]

function CodeBlock({ code, lang }) {
    const [copied, setCopied] = useState(false)
    const copy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }
    // Simple tokenize: lines starting with # are comments
    const lines = code.split('\n').map((line, i) => {
        const isComment = line.trim().startsWith('#')
        const isHttp = line.startsWith('http')
        return (
            <div key={i}>
                <span style={{
                    color: isComment ? '#475569' : isHttp ? '#00e5ff'
                        : line.startsWith('python') || line.startsWith('pip') || line.startsWith('git') || line.startsWith('cd') ? '#a78bfa'
                            : line.startsWith('source') || line.startsWith('venv') || line.startsWith('sim_') ? '#10b981'
                                : '#e8f4fd',
                }}>{line}</span>
            </div>
        )
    })

    return (
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,229,255,0.08)' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(0,229,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lang}</span>
                <button
                    onClick={copy}
                    style={{
                        background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                        borderRadius: 6, padding: '3px 10px', cursor: 'pointer',
                        fontSize: '0.72rem', color: copied ? '#10b981' : '#00e5ff', fontFamily: 'var(--font)',
                        transition: 'all 0.2s',
                    }}
                >{copied ? '✅ Copied!' : '📋 Copy'}</button>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontFamily: 'var(--mono)', fontSize: '0.83rem', lineHeight: 1.8, overflowX: 'auto' }}>
                {lines}
            </pre>
        </div>
    )
}

export default function InstallSection() {
    const [visible, setVisible] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
        obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="install" className="section" ref={ref} style={{ zIndex: 1 }}>
            <div className="container">
                <div className="section-label">🛠️ Installation</div>
                <h2 className="section-title">Get Up & Flying in 6 Steps</h2>
                <p className="section-desc">No cloud accounts needed. Everything runs locally on your machine.</p>

                {/* Prerequisites */}
                <div className="glass" style={{ borderRadius: 16, padding: '18px 24px', marginBottom: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', alignSelf: 'center' }}>Prerequisites:</span>
                    {['Python 3.10+', 'Git', 'Microphone', 'Chrome/Edge (for Whisper STT)', 'ArduPilot SITL (optional)'].map(p => (
                        <span key={p} className="pill">{p}</span>
                    ))}
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    {STEPS.map((s, i) => (
                        <div key={s.n} style={{
                            display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'start',
                            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
                            transition: `all 0.5s ${i * 100}ms ease`,
                        }}>
                            {/* Step label */}
                            <div style={{ textAlign: 'right', paddingTop: 14 }}>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.15)',
                                    borderRadius: 10, padding: '6px 14px',
                                }}>
                                    <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Step {s.n}</div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.3 }}>{s.title}</div>
                                    </div>
                                </div>
                            </div>
                            {/* Code block */}
                            <CodeBlock code={s.code} lang={s.lang} />
                        </div>
                    ))}
                </div>

                {/* Done banner */}
                <div style={{
                    marginTop: 48, textAlign: 'center', padding: '32px',
                    background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(124,58,237,0.08))',
                    borderRadius: 20, border: '1px solid rgba(0,229,255,0.15)',
                    animation: visible ? 'fade-up 0.6s 0.6s ease both' : 'none',
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: 14 }}>🚁</div>
                    <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: 10 }}>You're Ready to Fly!</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto 24px' }}>
                        Open your browser, speak a command, and watch the drone respond in real-time.
                    </p>
                    <a
                        href="https://github.com/LABBISRIKANTHBABU/VoiceControlDrone"
                        target="_blank" rel="noreferrer"
                        className="btn btn-primary"
                    >
                        📂 View Full Source on GitHub
                    </a>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          #install .container > div > div { grid-template-columns: 1fr !important; }
          #install .container > div > div > div:first-child { text-align: left !important; }
        }
      `}</style>
        </section>
    )
}
