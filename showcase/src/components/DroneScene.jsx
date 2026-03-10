import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

/* ── Rotor disc ── */
function Rotor({ position }) {
    const ref = useRef()
    useFrame((_, delta) => { ref.current.rotation.y += delta * 12 })

    const geo = useMemo(() => {
        const g = new THREE.CylinderGeometry(0.55, 0.55, 0.03, 24)
        return g
    }, [])

    return (
        <group position={position}>
            {/* Arm */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
                <meshStandardMaterial color="#1a2240" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Spinner disc */}
            <mesh ref={ref} position={[0, 0.06, 0]} geometry={geo}>
                <meshStandardMaterial
                    color="#00e5ff"
                    emissive="#00e5ff"
                    emissiveIntensity={0.6}
                    transparent opacity={0.4}
                    metalness={0.3} roughness={0}
                />
            </mesh>
            {/* Blade 1 */}
            <mesh ref={ref} position={[0, 0.08, 0]}>
                <boxGeometry args={[1.0, 0.02, 0.1]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Blade 2 */}
            <mesh ref={ref} position={[0, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[1.0, 0.02, 0.1]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Motor hub */}
            <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.12, 12]} />
                <meshStandardMaterial color="#7c3aed" metalness={0.9} roughness={0.1} emissive="#7c3aed" emissiveIntensity={0.4} />
            </mesh>
        </group>
    )
}

/* ── Drone body ── */
function DroneBody() {
    const bodyRef = useRef()

    // Arm positions (X/Z offsets)
    const armConfig = [
        { pos: [0.9, 0, 0.9], rot: [0, Math.PI / 4, 0] },
        { pos: [-0.9, 0, 0.9], rot: [0, -Math.PI / 4, 0] },
        { pos: [0.9, 0, -0.9], rot: [0, -Math.PI / 4, 0] },
        { pos: [-0.9, 0, -0.9], rot: [0, Math.PI / 4, 0] },
    ]

    return (
        <group ref={bodyRef}>
            {/* Central body */}
            <mesh>
                <boxGeometry args={[0.6, 0.18, 0.6]} />
                <meshStandardMaterial color="#0d1b3e" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Top dome */}
            <mesh position={[0, 0.16, 0]}>
                <sphereGeometry args={[0.3, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#101f45" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Camera gimbal */}
            <mesh position={[0, -0.18, 0]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1} />
            </mesh>
            {/* LED strip glow */}
            <mesh position={[0, -0.1, 0]}>
                <torusGeometry args={[0.28, 0.02, 8, 32]} />
                <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={2} />
            </mesh>
            {/* 4 Arms + Rotors */}
            {armConfig.map((cfg, i) => (
                <group key={i} position={cfg.pos} rotation={cfg.rot}>
                    <Rotor position={[0, 0, 0]} />
                </group>
            ))}
            {/* Landing legs */}
            {[[-0.25, 0, -0.25], [0.25, 0, -0.25], [-0.25, 0, 0.25], [0.25, 0, 0.25]].map((p, i) => (
                <mesh key={i} position={[p[0], -0.22, p[2]]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
                    <meshStandardMaterial color="#1e2d5c" metalness={0.8} roughness={0.3} />
                </mesh>
            ))}
        </group>
    )
}

/* ── Scene wrapper ── */
function DroneScene3D() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0.5, 4.5]} fov={45} />
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <spotLight position={[4, 6, 4]} angle={0.3} penumbra={0.8} intensity={3} color="#00e5ff" castShadow />
            <spotLight position={[-4, 6, -2]} angle={0.4} penumbra={0.9} intensity={2} color="#7c3aed" />
            <pointLight position={[0, -1, 0]} intensity={1} color="#7c3aed" distance={4} />
            {/* Float animation wrapper */}
            <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.8}>
                <DroneBody />
            </Float>
            {/* Grid */}
            <gridHelper args={[14, 20, '#7c3aed', '#0d1b3e']} position={[0, -1.2, 0]} />
            {/* Ground glow disc */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
                <circleGeometry args={[1.1, 40]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.06} />
            </mesh>
            <Environment preset="night" />
        </>
    )
}

/* ── Exported canvas component ── */
export default function DroneCanvas() {
    return (
        <Canvas
            shadows
            gl={{ antialias: true, alpha: true }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
            <DroneScene3D />
        </Canvas>
    )
}
