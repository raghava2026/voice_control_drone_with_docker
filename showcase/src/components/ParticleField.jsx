import { useEffect, useRef } from 'react'

export default function ParticleField() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let W, H, particles, animId

        const resize = () => {
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }

        const mkParticle = () => ({
            x: Math.random() * W,
            y: H + Math.random() * 200,
            r: Math.random() * 1.8 + 0.4,
            speed: Math.random() * 0.35 + 0.12,
            drift: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.6 + 0.15,
            hue: Math.random() > 0.6 ? 195 : 270,   // cyan or violet
        })

        const init = () => {
            resize()
            particles = Array.from({ length: 120 }, mkParticle)
            particles.forEach(p => { p.y = Math.random() * H })
        }

        const draw = () => {
            ctx.clearRect(0, 0, W, H)
            for (const p of particles) {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.opacity})`
                ctx.shadowColor = `hsla(${p.hue},100%,70%,0.8)`
                ctx.shadowBlur = 8
                ctx.fill()
                p.y -= p.speed
                p.x += p.drift
                if (p.y < -10) Object.assign(p, mkParticle(), { y: H + 10 })
            }
            animId = requestAnimationFrame(draw)
        }

        init()
        draw()
        window.addEventListener('resize', () => { resize(); particles = Array.from({ length: 120 }, mkParticle) })

        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', inset: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.55,
            }}
        />
    )
}
