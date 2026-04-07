from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from rag import ingest_pdf, query_rag
from llm import get_answer
from database import init_db, save_message, get_session_history, get_all_sessions

app = FastAPI(title="KU Assistant API v2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await init_db()


# ── Models ─────────────────────────────────────────────────

class ChatRequest(BaseModel):
    session_id: str
    message: str
    role: str           # "student" | "faculty"

class ChatResponse(BaseModel):
    reply: str
    session_id: str
    sources: list[str] = []


# ── Routes ─────────────────────────────────────────────────
@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        print("👉 Chat request received:", request)

        context, sources = await query_rag(request.message)
        print("👉 Context:", context)

        response = await get_answer(
            request.message,
            context,
            [],
            request.role
        )

        print("👉 Response:", response)

        return {
            "reply": response,
            "session_id": request.session_id,
            "sources": sources
        }

    except Exception as e:
        print("❌ ERROR:", str(e))
        return {"error": str(e)}


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...), doc_type: str = "general"):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF files accepted.")
    contents = await file.read()
    count = await ingest_pdf(contents, filename=file.filename, doc_type=doc_type)
    return {"message": f"Ingested {count} chunks from {file.filename}"}


@app.get("/history/{session_id}")
async def get_history(session_id: str):
    msgs = await get_session_history(session_id)
    return {"session_id": session_id, "messages": msgs}


@app.get("/sessions")
async def list_sessions():
    return {"sessions": await get_all_sessions()}


@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
