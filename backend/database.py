"""
database.py — Supabase conversation history
"""
from datetime import datetime
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

async def init_db():
    try:
        supabase.table("messages").select("id").limit(1).execute()
        print("✅ Supabase connected")
    except Exception as e:
        print(f"⚠️  Supabase issue: {e}")

async def save_message(session_id: str, role: str, content: str, user_role: str):
    supabase.table("messages").insert({
        "session_id": session_id,
        "role": role,
        "content": content,
        "user_role": user_role,
        "created_at": datetime.utcnow().isoformat(),
    }).execute()

async def get_session_history(session_id: str) -> list[dict]:
    result = (
        supabase.table("messages")
        .select("role, content, created_at")
        .eq("session_id", session_id)
        .order("created_at", desc=False)
        .execute()
    )
    return [{"role": m["role"], "content": m["content"]} for m in result.data]

async def get_all_sessions() -> list[dict]:
    result = (
        supabase.table("messages")
        .select("session_id, user_role, created_at")
        .order("created_at", desc=True)
        .execute()
    )
    sessions = {}
    for m in result.data:
        sid = m["session_id"]
        if sid not in sessions:
            sessions[sid] = {"session_id": sid, "user_role": m["user_role"], "last_active": m["created_at"], "message_count": 0}
        sessions[sid]["message_count"] += 1
    return list(sessions.values())
