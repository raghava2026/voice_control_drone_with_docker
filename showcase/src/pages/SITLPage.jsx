import TopicPageLayout from '../components/TopicPageLayout.jsx'

const SECTIONS = [
    {
        heading: 'What is ArduPilot SITL?',
        icon: '🛩️',
        body: `Software In The Loop (SITL) is a simulation mode that runs the full ArduPilot flight stack — the exact same firmware that flies real drones — as a native desktop process. It simulates motor physics, GPS, accelerometers, barometers, and MAVLink telemetry, all without any physical hardware.

This means VoiceControlDrone can be fully developed, tested, and demonstrated on any laptop. You can crash the simulated drone a thousand times, test edge cases, and validate new NLP intents — all risk-free.`,
    },
    {
        heading: 'Starting SITL',
        icon: '🚀',
        body: 'With ArduPilot installed, launch the Copter SITL with a console and map view:',
        code: `# Terminal 1 – Start ArduPilot SITL
sim_vehicle.py -v Copter --console --map

# You'll see:
# APM: EKF3 IMU0 initialised
# APM: EKF3 IMU0 origin set
# GPS lock acquired
# Ready to FLY

# Terminal 2 – Start the VoiceControlDrone server
# (DroneKit will connect to SITL on udp:127.0.0.1:14550)
python server.py`,
        lang: 'bash',
    },
    {
        heading: 'How SITL Connects to the System',
        icon: '🔌',
        body: `SITL exposes a MAVLink interface on UDP port 14550. When VoiceControlDrone's server starts, DroneKit calls connect("udp:127.0.0.1:14550") and performs a full handshake — requesting vehicle parameters, waiting for heartbeat messages, and verifying the vehicle is armable.

Once connected, every voice command you send through the browser is processed by the real ArduPilot flight controller logic inside the SITL process. The simulated drone actually calculates trajectories, respects geofences, and enforces arming prerequisites.`,
    },
    {
        heading: 'Running Alongside QGroundControl',
        icon: '🖥️',
        body: 'SITL supports multiple simultaneous MAVLink connections via MAVProxy output forwarding. Run QGC at the same time as VoiceControlDrone for a full GCS experience:',
        code: `# Start SITL with MAVProxy forwarding to QGC (port 14551) AND VCD (14550)
sim_vehicle.py -v Copter --console --map \\
  --out udp:127.0.0.1:14550 \\   # VoiceControlDrone (DroneKit)
  --out udp:127.0.0.1:14551      # QGroundControl

# QGC auto-detects UDP 14550 or 14551 — configure in 
# Application Settings → Comm Links → Add → UDP → Port 14551`,
        lang: 'bash',
    },
    {
        heading: 'SITL Testing Capabilities',
        icon: '🧪',
        tiles: [
            { icon: '✈️', title: 'Full Copter Physics', desc: 'ArduCopter motor mixing, PID controller, and attitude estimator run identically to hardware.' },
            { icon: '🗺️', title: '3D Map View', desc: 'SITL\'s map window shows real-time position, track, and virtual camera footprint.' },
            { icon: '💥', title: 'Safe Crash Testing', desc: 'Send bad sequences, power-cycle the simulated vehicle, and recover — zero hardware risk.' },
            { icon: '🔁', title: 'Repeatable Scenarios', desc: 'Reset SITL to a fixed GPS home position for repeatable end-to-end regression tests.' },
        ],
    },
]

export default function SITLPage() {
    return (
        <TopicPageLayout
            title="SITL Ready"
            label="🧪 Zero-Hardware Testing"
            accentColor="#f59e0b"
            icon="🧪"
            sections={SECTIONS}
            relatedCards={[
                { title: 'Offline First', href: '/topic/offline-first', icon: '🔇' },
                { title: 'Async Architecture', href: '/topic/async-architecture', icon: '🔄' },
                { title: 'MAVLink Protocol', href: '/topic/mavlink-protocol', icon: '🔗' },
            ]}
        />
    )
}
