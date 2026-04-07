# KU Assistant v3 — Karnavati University

Full-stack RAG chatbot with a product landing page + chat interface.

## Pages
- `/` — Landing page (DesignKit-style product page)
- `/chat` — The AI chatbot

## Setup

### 1. Supabase
Run `backend/supabase_setup.sql` in your Supabase SQL Editor.

### 2. API Keys (.env)
```
ANTHROPIC_API_KEY=...
VOYAGE_API_KEY=...
SUPABASE_URL=...
SUPABASE_KEY=...
```

### 3. Backend
```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
uvicorn main:app --reload
```

### 4. Upload PDFs
```bash
curl -X POST http://localhost:8000/upload-pdf \
  -F "file=@timetable.pdf" -F "doc_type=timetable"
```

### 5. Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```
