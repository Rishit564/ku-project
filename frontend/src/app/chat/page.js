"use client";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import s from "./chat.module.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getSession() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("ku_sid");
  if (!id) { id = uuidv4(); localStorage.setItem("ku_sid", id); }
  return id;
}

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

const SUGGESTIONS = [
  "What time is the Data Structures lecture?",
  "When is Prof. Mehta free?",
  "Exam schedule for April?",
  "Which lab is free on Tuesday?",
];

export default function ChatPage() {
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState("");
  const [role, setRole]       = useState("student");
  const [loading, setLoading] = useState(false);
  const [tab, setTab]         = useState("chat");
  const [history, setHistory] = useState([]);
  const [sources, setSources] = useState([]);
  const [ready, setReady]     = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);
  const sid                   = useRef("");

  useEffect(() => { sid.current = getSession(); setReady(true); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);
  useEffect(() => { if (tab === "history") loadHistory(); }, [tab]);

  async function loadHistory() {
    try {
      const r = await fetch(`${API}/history/${sid.current}`);
      const d = await r.json();
      setHistory((d.messages || []).filter(m => m.role === "user"));
    } catch {}
  }

  async function send(text) {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    setSources([]);
    setMsgs(p => [...p, { from: "user", text: msg, time: nowTime() }]);
    setLoading(true);
    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sid.current, message: msg, role }),
      });
      const data = await res.json();
      setMsgs(p => [...p, { from: "bot", text: data.reply, time: nowTime() }]);
      if (data.sources?.length) setSources(data.sources);
    } catch {
      setMsgs(p => [...p, { from: "bot", text: "⚠️ Could not reach the server. Make sure the backend is running on port 8000.", time: nowTime(), err: true }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  }

  function newChat() {
    setMsgs([]); setSources([]); setTab("chat");
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  if (!ready) return null;

  return (
    <div className={s.app}>

      {/* Topbar */}
      <header className={s.topbar}>
        <div className={s.topLeft}>
          <Link href="/" className={s.backBtn} title="Back to home">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <button className={s.kuBtn} onClick={newChat}>Karnavati University</button>
          <span className={s.sep}>/</span>
          <span className={s.pageTitle}>{tab === "chat" ? "Assistant" : tab === "history" ? "History" : "About"}</span>
        </div>
        <div className={s.topRight}>
          <div className={s.roleToggle}>
            <button className={`${s.roleBtn} ${role === "student" ? s.roleBtnActive : ""}`} onClick={() => setRole("student")}>Student</button>
            <button className={`${s.roleBtn} ${role === "faculty" ? s.roleBtnActive : ""}`} onClick={() => setRole("faculty")}>Faculty</button>
          </div>
          <button className={s.newBtn} onClick={newChat}>+ New chat</button>
        </div>
      </header>

      <div className={s.body}>

        {/* Sidebar */}
        <aside className={s.sidebar}>
          <div className={s.sideNav}>
            <div className={s.sideLabel}>Menu</div>
            {[["chat","◎","Chat"],["history","◷","History"],["about","◈","About"]].map(([id, icon, label]) => (
              <button key={id} className={`${s.navItem} ${tab === id ? s.navActive : ""}`} onClick={() => setTab(id)}>
                <span className={s.navIcon}>{icon}</span>{label}
              </button>
            ))}
          </div>
          <div className={s.sideBottom}>
            <div className={s.statusPill}><span className={s.greenDot} />AI Online</div>
          </div>
        </aside>

        {/* Main */}
        <main className={s.main}>

          {/* ── CHAT TAB ── */}
          {tab === "chat" && (
            <>
              <div className={s.chatArea}>
                {msgs.length === 0 && (
                  <div className={s.welcome}>
                    <div className={s.welcomeLogo}>KU</div>
                    <h2 className={s.welcomeTitle}>Hello, {role === "faculty" ? "Professor" : "Student"}</h2>
                    <p className={s.welcomeSub}>Ask anything about lectures, faculty availability, or upcoming exams.</p>
                    <div className={s.chips}>
                      {SUGGESTIONS.map(sg => (
                        <button key={sg} className={s.chip} onClick={() => send(sg)}>{sg}</button>
                      ))}
                    </div>
                  </div>
                )}

                {msgs.map((m, i) => (
                  <div key={i} className={`${s.msgRow} ${m.from === "user" ? s.msgUser : ""}`}>
                    <div className={`${s.av} ${m.from === "bot" ? s.avBot : role === "faculty" ? s.avFac : s.avStu}`}>
                      {m.from === "bot" ? "KU" : role === "faculty" ? "FA" : "ST"}
                    </div>
                    <div className={`${s.bubble} ${m.from === "user" ? s.bubbleUser : s.bubbleBot} ${m.err ? s.bubbleErr : ""}`}>
                      <div className={s.bubbleText}>{m.text}</div>
                      <div className={s.bubbleTime}>{m.time}</div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className={s.msgRow}>
                    <div className={`${s.av} ${s.avBot}`}>KU</div>
                    <div className={`${s.bubble} ${s.bubbleBot} ${s.typing}`}>
                      <span /><span /><span />
                    </div>
                  </div>
                )}

                {sources.length > 0 && (
                  <div className={s.sources}>
                    <span className={s.srcLabel}>Source:</span>
                    {sources.map(src => <span key={src} className={s.srcTag}>{src}</span>)}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <div className={s.inputArea}>
                <div className={s.inputRow}>
                  <textarea
                    ref={inputRef}
                    className={s.textarea}
                    value={input}
                    rows={1}
                    placeholder="Ask about timetable, faculty, exams…"
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                  />
                  <button className={s.sendBtn} onClick={() => send()} disabled={loading || !input.trim()}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
                <div className={s.inputHint}>Enter to send · Shift+Enter for new line</div>
              </div>
            </>
          )}

          {/* ── HISTORY TAB ── */}
          {tab === "history" && (
            <div className={s.tabPane}>
              <h2 className={s.paneTitle}>History</h2>
              <p className={s.paneSub}>Questions from this session</p>
              {history.length === 0
                ? <div className={s.paneEmpty}>No questions yet in this session.</div>
                : <div className={s.histList}>
                    {history.map((m, i) => (
                      <div key={i} className={s.histItem}>
                        <span className={s.histNum}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={s.histQ}>{m.content}</span>
                      </div>
                    ))}
                  </div>
              }
            </div>
          )}

          {/* ── ABOUT TAB ── */}
          {tab === "about" && (
            <div className={s.tabPane}>
              <h2 className={s.paneTitle}>About</h2>
              <p className={s.paneSub}>Karnavati University AI Assistant</p>
              <div className={s.aboutCards}>
                <div className={s.aboutCard}>
                  <div className={s.aboutCardTitle}>Tech stack</div>
                  {["Next.js 14 + React","FastAPI (Python)","Voyage AI — voyage-3 embeddings","Supabase pgvector","Claude API (Sonnet)"].map(t => (
                    <div key={t} className={s.aboutItem}><span className={s.aboutDot} />{t}</div>
                  ))}
                </div>
                <div className={s.aboutCard}>
                  <div className={s.aboutCardTitle}>Data sources</div>
                  {["Class timetable PDF","Faculty schedule PDF","Exam schedule PDF"].map(t => (
                    <div key={t} className={s.aboutItem}><span className={s.aboutDot} />{t}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
