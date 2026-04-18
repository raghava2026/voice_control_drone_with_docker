"""
Backward-compatible NLP module.

The original repo used spaCy-based parsing. The backend now uses a lightweight
rule-based parser located at `app/nlp/drone_nlp.py`.
"""

from app.nlp.drone_nlp import DroneNLP

__all__ = ["DroneNLP"]

