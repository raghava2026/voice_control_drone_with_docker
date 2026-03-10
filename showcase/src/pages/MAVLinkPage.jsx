import TopicPageLayout from '../components/TopicPageLayout.jsx'

const SECTIONS = [
    {
        heading: 'What is MAVLink?',
        icon: '📡',
        body: `MAVLink (Micro Air Vehicle Link) is an open-source, lightweight binary messaging protocol designed specifically for UAVs. Created in 2009 by Lorenz Meier at ETH Zurich, it has become the de-facto standard for communicating between autopilots (ArduPilot, PX4) and ground control stations (QGroundControl, Mission Planner).

VoiceControlDrone uses MAVLink as the final command layer — after your voice is parsed into an intent by spaCy, DroneKit serializes that intent into MAVLink messages and sends them over UDP to the autopilot.`,
    },
    {
        heading: 'How DroneKit Uses MAVLink',
        icon: '🔗',
        body: 'DroneKit provides a high-level Python API over pymavlink. For velocity-based movement commands, VCD sends SET_POSITION_TARGET_LOCAL_NED messages directly, which gives precise vector control over the aircraft:',
        code: `# drone_control.py – sending a MAVLink velocity message
from pymavlink import mavutil

def send_velocity(vx, vy, vz, duration=1):
    # Build the SET_POSITION_TARGET_LOCAL_NED message
    msg = vehicle.message_factory.set_position_target_local_ned_encode(
        0,                                          # time_boot_ms
        0, 0,                                       # target system, component
        mavutil.mavlink.MAV_FRAME_BODY_NED,         # frame: body-relative NED
        0b0000111111000111,                         # type_mask: velocity only
        0, 0, 0,                                    # x, y, z position (ignored)
        vx, vy, vz,                                 # velocity in m/s
        0, 0, 0,                                    # acceleration (ignored)
        0, 0                                        # yaw, yaw_rate (ignored)
    )
    # Send at 5 Hz for 'duration' seconds
    for _ in range(duration * 5):
        vehicle.send_mavlink(msg)
        time.sleep(0.2)`,
        lang: 'python',
    },
    {
        heading: 'MAVLink Transport Layers',
        icon: '🌐',
        body: 'MAVLink is transport-agnostic. VoiceControlDrone uses UDP by default (ideal for SITL), but the same DroneKit connect() call works with:',
        bullets: [
            { term: 'UDP (SITL)', desc: 'udp:127.0.0.1:14550 — ArduPilot SITL exposes this port by default, zero hardware needed.' },
            { term: 'TCP', desc: 'tcp:127.0.0.1:5760 — useful when a GCS like QGC is acting as a MAVProxy bridge.' },
            { term: 'Serial (UART)', desc: '/dev/ttyUSB0,57600 — connects directly to a Pixhawk flight controller via USB/FTDI.' },
            { term: 'MAVProxy forward', desc: 'Run MAVProxy --out udp:... to fan out one autopilot to multiple consumers (QGC + VCD simultaneously).' },
        ],
    },
    {
        heading: 'Key MAVLink Message Types Used',
        icon: '📦',
        tiles: [
            { icon: '🛫', title: 'COMMAND_LONG', desc: 'Used for ARM/DISARM, SET_MODE. High-level autopilot commands.' },
            { icon: '📍', title: 'SET_POSITION_TARGET_LOCAL_NED', desc: 'Sends 3D velocity vectors for forward/backward/left/right/up/down movement.' },
            { icon: '🔄', title: 'CONDITION_YAW', desc: 'Sends a yaw rotation command in degrees (used for ROTATE_CW / ROTATE_CCW).' },
            { icon: '📡', title: 'GLOBAL_POSITION_INT', desc: 'Received from autopilot — provides lat, lon, alt, heading for the telemetry HUD.' },
        ],
    },
]

export default function MAVLinkPage() {
    return (
        <TopicPageLayout
            title="MAVLink Protocol"
            label="🔗 Communication Layer"
            accentColor="#a78bfa"
            icon="🔗"
            sections={SECTIONS}
            relatedCards={[
                { title: 'Offline First', href: '/topic/offline-first', icon: '🔇' },
                { title: 'Async Architecture', href: '/topic/async-architecture', icon: '🔄' },
                { title: 'SITL Ready', href: '/topic/sitl-ready', icon: '🧪' },
            ]}
        />
    )
}
