import TopicPageLayout from '../components/TopicPageLayout.jsx'

const SECTIONS = [
    {
        heading: 'The Problem with Blocking I/O in Drone Systems',
        icon: '⚠️',
        body: `DroneKit's MAVLink operations are fundamentally synchronous and blocking. A simple arm_and_takeoff() call can stall for 5–30 seconds while it waits for GPS lock, arming confirmation, and altitude confirmation. If that ran on FastAPI's async event loop directly, every other HTTP request — including the status endpoint QGroundControl polls — would freeze for the same duration.

VoiceControlDrone solves this with FastAPI's run_in_threadpool(), which offloads the blocking DroneKit call to a separate thread pool worker, keeping the event loop free to serve other requests concurrently.`,
    },
    {
        heading: 'The Architecture Pattern',
        icon: '🔄',
        body: 'The command pipeline separates the async HTTP layer from the synchronous DroneKit layer cleanly:',
        code: `# server.py – async endpoint calling sync drone code
from fastapi.concurrency import run_in_threadpool
import drone_control

@app.post("/command")
async def receive_command(request: Request):    # ← async
    data   = await request.json()              # awaitable
    intent, value = nlp.parse(data["text"])    # fast, CPU-only

    # Offload the blocking DroneKit call to a thread worker
    # The event loop is NOT blocked during this await
    await run_in_threadpool(
        drone_control.execute, intent, value   # ← runs in thread
    )

    return {"status": "executed", "intent": intent, "value": value}`,
        lang: 'python',
    },
    {
        heading: 'Why asyncio.sleep vs time.sleep Matters',
        icon: '⏱️',
        body: 'Inside drone_control.py, DroneKit polling loops use time.sleep() (synchronous) intentionally — they run inside the thread pool worker, so they block only that thread, not the event loop. The async side always uses await asyncio.sleep() to yield control back to the event loop between telemetry SSE pushes.',
        code: `# drone_control.py – sync, runs safely inside thread worker
def arm_and_takeoff(alt):
    vehicle.armed = True
    while not vehicle.armed:
        time.sleep(1)          # ✅ blocks only this thread
    vehicle.simple_takeoff(alt)
    while vehicle.location.global_relative_frame.alt < alt * 0.95:
        time.sleep(1)          # ✅ no event loop impact

# server.py – async, runs on event loop
async def telemetry_stream():
    async def event_generator():
        while True:
            data = await run_in_threadpool(read_telemetry)
            yield f"data: {json.dumps(data)}\\n\\n"
            await asyncio.sleep(0.5)   # ✅ yields to event loop`,
        lang: 'python',
    },
    {
        heading: 'Concurrency Characteristics',
        icon: '📊',
        tiles: [
            { icon: '🔁', title: 'Event Loop', desc: 'Single-threaded asyncio loop handles all HTTP routing, CORS, and SSE streaming.' },
            { icon: '🧵', title: 'Thread Pool', desc: 'run_in_threadpool() uses Python\'s default ThreadPoolExecutor for DroneKit ops.' },
            { icon: '⚡', title: 'Concurrency', desc: 'Multiple clients can send commands simultaneously — each lands on its own thread worker.' },
            { icon: '📡', title: 'SSE Streaming', desc: '/telemetry/stream stays open indefinitely, yielding 2 Hz frames without blocking.' },
        ],
    },
]

export default function AsyncArchitecturePage() {
    return (
        <TopicPageLayout
            title="Async Architecture"
            label="🔄 Concurrency Design"
            accentColor="#10b981"
            icon="🔄"
            sections={SECTIONS}
            relatedCards={[
                { title: 'Offline First', href: '/topic/offline-first', icon: '🔇' },
                { title: 'MAVLink Protocol', href: '/topic/mavlink-protocol', icon: '🔗' },
                { title: 'SITL Ready', href: '/topic/sitl-ready', icon: '🧪' },
            ]}
        />
    )
}
