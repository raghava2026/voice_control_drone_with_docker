#!/usr/bin/env python3

"""
Backward-compatible entrypoint.

Historically this repo ran `python server.py` and exposed the FastAPI `app` here.
The refactor moved the application to `app.main:app` while keeping the same routes.
"""

from app.main import app


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8002, reload=False)
