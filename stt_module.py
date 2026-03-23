import speech_recognition as sr
import tempfile
import os

recognizer = sr.Recognizer()

def transcribe_whisper(audio_bytes: bytes, mime: str = "") -> dict:
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        f.write(audio_bytes)
        tmp_path = f.name
    try:
        with sr.AudioFile(tmp_path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio, language="en-IN")
        return {"text": text, "language": "en"}
    except sr.UnknownValueError:
        return {"text": "", "language": "en"}
    except Exception as e:
        return {"text": "", "language": "en", "error": str(e)}
    finally:
        os.unlink(tmp_path)
