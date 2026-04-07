-- Run this in Supabase → SQL Editor

create extension if not exists vector;

create table if not exists documents (
  id           text primary key,
  content      text not null,
  embedding    vector(1024),
  doc_type     text default 'general',
  source       text,
  chunk_index  int,
  created_at   timestamptz default now()
);

create table if not exists messages (
  id          bigserial primary key,
  session_id  text not null,
  role        text not null,
  content     text not null,
  user_role   text default 'student',
  created_at  timestamptz default now()
);

create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index if not exists messages_session_idx
  on messages (session_id, created_at);

create or replace function match_documents (
  query_embedding vector(1024),
  match_threshold float,
  match_count     int
)
returns table (id text, content text, doc_type text, source text, similarity float)
language sql stable as $$
  select id, content, doc_type, source,
         1 - (embedding <=> query_embedding) as similarity
  from documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
