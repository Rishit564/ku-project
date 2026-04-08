from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM = """You are the official AI assistant for Karnavati University.

RULES:
1. Answer ONLY from provided context.
2. If no data, say: "I don't have that information."
3. Be short and clear.
"""

async def get_answer(user_message, context, history, role):
    if context.strip():
        prompt = f"""
Context:
{context}

Question:
{user_message}

Answer based ONLY on context.
"""
    else:
        return "I don't have that information."

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content