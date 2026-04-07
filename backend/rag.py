import io
import hashlib
from pypdf import PdfReader
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY

# Initialize Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# ✅ Extract text
def extract_text(pdf_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(pdf_bytes))
    return "\n\n".join(
        page.extract_text() for page in reader.pages if page.extract_text()
    )


# ✅ Split text
def chunk_text(text: str, size=400, overlap=80):
    words = text.split()
    chunks, i = [], 0

    while i < len(words):
        chunk = " ".join(words[i:i + size])
        if chunk.strip():
            chunks.append(chunk.strip())
        i += size - overlap

    return chunks


# ✅ Upload PDF → Supabase
async def ingest_pdf(pdf_bytes: bytes, filename: str, doc_type: str):
    text = extract_text(pdf_bytes)

    if not text.strip():
        raise ValueError("No extractable text in PDF.")

    chunks = chunk_text(text)
    file_hash = hashlib.md5(pdf_bytes).hexdigest()

    rows = [
        {
            "id": f"{file_hash}_{i}",
            "content": chunk,
            "doc_type": doc_type,
            "source": filename,
            "chunk_index": i,
        }
        for i, chunk in enumerate(chunks)
    ]

    for i in range(0, len(rows), 50):
        supabase.table("documents").upsert(rows[i:i + 50]).execute()

    return len(chunks)


# ✅ Improved retrieval
async def query_rag(query: str, top_k=5):
    result = supabase.table("documents").select("*").execute()

    if not result.data:
        return "", []

    query = query.lower()

    scored = []
    for row in result.data:
        content = row.get("content", "").lower()

        score = 0

        for word in query.split():
            if word in content:
                score += 2

        for word in query.split():
            if any(word in w for w in content.split()):
                score += 1

        if query in content:
            score += 5

        if score > 0:
            scored.append((score, row))

    if not scored:
        return "", []

    scored.sort(reverse=True, key=lambda x: x[0])
    top_chunks = [row for _, row in scored[:top_k]]

    parts, sources = [], []

    for chunk in top_chunks:
        parts.append(chunk["content"])
        if chunk["source"] not in sources:
            sources.append(chunk["source"])

    return "\n\n".join(parts), sources