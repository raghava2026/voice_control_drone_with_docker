import TopicPageLayout from '../components/TopicPageLayout.jsx'

const SECTIONS = [
    {
        heading: 'Why Offline-First Matters for Drones',
        icon: '🌐',
        body: `Most voice AI systems today are cloud-dependent — they ship your audio to a remote server, wait for a response, and struggle in environments with poor or zero connectivity. For a drone operating in remote fields, disaster zones, or RF-contested environments, a cloud dependency is not just inconvenient — it is a single point of failure that can cost hardware or missions.

VoiceControlDrone eliminates this risk entirely by running the full NLP pipeline on-device using spaCy's small English model. No audio ever leaves your machine. The command latency is purely a function of your CPU, not your network.`,
    },
    {
        heading: 'How spaCy Powers the NLP Engine',
        icon: '🧠',
        body: 'The NLP module (nlp_module.py) loads spaCy\'s en_core_web_sm model once at server startup. Every incoming voice-transcribed text string is processed through the pipeline:',
        bullets: [
            { term: 'Tokenization', desc: 'The sentence is split into tokens with rich linguistic features (POS, lemma, dep).' },
            { term: 'Intent Matching', desc: 'Priority-ordered keyword regex rules extract TAKEOFF, LAND, MOVE_*, ROTATE_*, RTL, HOLD, ARM, DISARM.' },
            { term: 'Value Extraction', desc: 'A secondary pass scans for like_num tokens to pull numeric parameters (altitude, distance, degrees).' },
            { term: 'Safe Defaults', desc: 'If no number is found, sane defaults apply — e.g. TAKEOFF defaults to 10 m, MOVE to 5 m.' },
        ],
    },
    {
        heading: 'Integration Code',
        icon: '💻',
        body: 'The full NLP module is only 64 lines of clean Python:',
        code: `# nlp_module.py (simplified)
import spacy, re

class DroneNLP:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")     # ← loads offline

    def _extract_number(self, doc, default=None):
        for token in doc:
            if token.like_num:
                return int(token.text)
        return default

    def parse(self, text: str):
        t   = text.lower().strip()
        doc = self.nlp(t)

        if "take off" in t or "takeoff" in t:
            return ("TAKEOFF", self._extract_number(doc, 10))

        if "forward" in t:
            return ("MOVE_FORWARD", self._extract_number(doc, 5))

        # … 12 more intents …
        return ("UNKNOWN", None)`,
        lang: 'python',
    },
    {
        heading: 'Key Capabilities',
        icon: '⚡',
        tiles: [
            { icon: '🔒', title: 'Zero Cloud Dependency', desc: 'No API keys, no billing, no privacy risk. Works in air-gapped environments.' },
            { icon: '⚡', title: 'Sub-10 ms NLP Latency', desc: 'The small spaCy model processes a full sentence in under 10 ms on modest hardware.' },
            { icon: '🌍', title: '100% Portable', desc: 'Run on a Raspberry Pi, a laptop, or a dedicated mission computer — no GPU required.' },
            { icon: '🔧', title: 'Extensible Model', desc: 'Swap en_core_web_sm for en_core_web_lg or a custom-trained model to add domain-specific language.' },
        ],
    },
]

export default function OfflineFirstPage() {
    return (
        <TopicPageLayout
            title="Offline First"
            label="🔇 NLP Architecture"
            accentColor="#00e5ff"
            icon="🔇"
            sections={SECTIONS}
            relatedCards={[
                { title: 'Async Architecture', href: '/topic/async-architecture', icon: '🔄' },
                { title: 'MAVLink Protocol', href: '/topic/mavlink-protocol', icon: '🔗' },
                { title: 'SITL Ready', href: '/topic/sitl-ready', icon: '🧪' },
            ]}
        />
    )
}
