import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

SYSTEM = """You are the official AI assistant for Karnavati University, Gandhinagar.
You serve both students and faculty with accurate answers about class timetables, faculty availability, exam schedules, and room/lab allocations.

RULES:
1. Answer ONLY from the provided context. Never hallucinate or guess.
2. If information is absent, say: "I don't have that in my current data. Please check with the university office."
3. Be concise and direct — students want quick answers.
4. Always mention the source document when answering (e.g., "According to the timetable...").
5. Current user role: {ROLE}
"""

async def get_answer(user_message: str, context: str, history: list[dict], role: str) -> str:
    system = SYSTEM.replace("{ROLE}", role.capitalize())

    # Conversation history
    history_text = ""
    for m in history[-10:]:
        history_text += f"{m['role']}: {m['content']}\n"

    # Prompt
    if context.strip():
        prompt = f"""
{system}

Conversation so far:
{history_text}

RETRIEVED CONTEXT:
{context}

---

QUESTION: {user_message}

Answer using ONLY the context above.
"""
    else:
        prompt = f"""
{system}

Conversation so far:
{history_text}

QUESTION: {user_message}

No relevant documents found. Inform the user politely.
"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            }
        )

        # 🔥 Check status
        if response.status_code != 200:
            return f"Ollama error: {response.text}"

        data = response.json()

        # 🔥 Safe return
        return data.get("response", "No response from model")

    except Exception as e:
        return f"Error calling Ollama: {str(e)}"