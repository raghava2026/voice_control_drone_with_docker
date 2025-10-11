import os
import json
import queue
from pathlib import Path
#from drone_control import execute_drone_command
import sounddevice as sd
from vosk import Model, KaldiRecognizer

# NLP
from nlp_module import DroneNLP

# Optional: hook into your command map if it exists
try:
    from commands_map import handle_intent  # signature: handle_intent(intent, value)
except Exception:
    handle_intent = None

SAMPLE_RATE = 16000
BLOCKSIZE = 8000

VOSK_MODEL_PATH = str((Path(__file__).parent / "vosk-model-small-en-us-0.15").resolve())

if not os.path.isdir(VOSK_MODEL_PATH):
    raise FileNotFoundError(
        f"Vosk model folder not found at: {VOSK_MODEL_PATH}. "
        "Download and extract a model here or change VOSK_MODEL_PATH."
    )

print(("Loading Vosk model...", VOSK_MODEL_PATH))
model = Model(VOSK_MODEL_PATH)
rec = KaldiRecognizer(model, SAMPLE_RATE)

q = queue.Queue()
nlp = DroneNLP()

def _callback(indata, frames, time, status):
    if status:
        print(("Audio status:", status))
    q.put(bytes(indata))

def main():
    print("🎤 Listening for commands (Ctrl+C to stop)...")
    with sd.RawInputStream(samplerate=SAMPLE_RATE, blocksize=BLOCKSIZE,
                           dtype='int16', channels=1, callback=_callback):
        while True:
            data = q.get()
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                text = result.get("text", "").strip()
                if not text:
                    continue
                print(f"📝 Recognized: {text}")
                intent, value = nlp.parse(text)
                print(f"🤖 NLP → intent={intent}, value={value}")
                if handle_intent:
                    try:
                        handle_intent(intent, value)
                        # execute_drone_command(intent, value)
                    except Exception as e:
                        print(("Error in commands_map.handle_intent:", e))
            else:
                _ = rec.PartialResult()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        
        print("\nExiting.")