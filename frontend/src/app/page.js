import Link from "next/link";
import s from "./page.module.css";

export default function Home() {
  return (
    <div className={s.root}>

      {/* ── NAV ── */}
      <nav className={s.nav}>
        <div className={s.navLogo}>
          <div className={s.navMark}>KU</div>
          <span className={s.navName}>Karnavati University</span>
        </div>
        <div className={s.navLinks}>
          <a href="#features" className={s.navLink}>Features</a>
          <a href="#how" className={s.navLink}>How it works</a>
          <a href="#about" className={s.navLink}>About</a>
        </div>
        <div className={s.navCta}>
          <Link href="/chat" className={s.btnGhost}>Sign in</Link>
          <Link href="/chat" className={s.btnSolid}>Get Started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={s.hero}>
        <h1 className={s.heroH1}>
          Your university,<br />
          <em className={s.heroEm}>answered instantly</em>
        </h1>
        <p className={s.heroSub}>
          Ask anything about lectures, faculty schedules, and exam dates. Get accurate answers from your university's own documents — in seconds.
        </p>
        <div className={s.heroBtns}>
          <Link href="/chat" className={s.btnPrimary}>Start asking →</Link>
          <a href="#how" className={s.btnSecondary}>▷ &nbsp;See how it works</a>
        </div>
      </section>

      {/* ── HERO VISUAL ── */}
      <div className={s.heroVisual}>
        <div className={s.chatPreview}>
          <div className={s.cpBar}>
            <div className={s.cpDots}>
              <span className={s.cpDot} style={{ background: "#ff5f57" }} />
              <span className={s.cpDot} style={{ background: "#febc2e" }} />
              <span className={s.cpDot} style={{ background: "#28c840" }} />
            </div>
            <span className={s.cpTitle}>Karnavati University Assistant</span>
            <span className={s.cpOnline}>● Online</span>
          </div>
          <div className={s.cpBody}>
            <div className={s.cpSide}>
              <div className={s.cpSideLabel}>Menu</div>
              <div className={`${s.cpNav} ${s.cpNavActive}`}>◎ Chat</div>
              <div className={s.cpNav}>◷ History</div>
              <div className={s.cpNav}>◈ About</div>
              <div className={s.cpSideBottom}>
                <span className={s.cpGreenDot} /> AI Online
              </div>
            </div>
            <div className={s.cpMain}>
              <div className={s.cpChat}>
                <div className={s.cpMsg}>
                  <div className={`${s.cpAv} ${s.cpAvBot}`}>KU</div>
                  <div className={`${s.cpBubble} ${s.cpBubbleBot}`}>Hello! Ask me about lectures, faculty, or exams.</div>
                </div>
                <div className={`${s.cpMsg} ${s.cpMsgUser}`}>
                  <div className={`${s.cpAv} ${s.cpAvStu}`}>ST</div>
                  <div className={`${s.cpBubble} ${s.cpBubbleUser}`}>When is the ML lecture?</div>
                </div>
                <div className={s.cpMsg}>
                  <div className={`${s.cpAv} ${s.cpAvBot}`}>KU</div>
                  <div className={`${s.cpBubble} ${s.cpBubbleBot}`}>ML is Monday 11:00 AM, Room 302 — Prof. Shah.</div>
                </div>
                <div className={`${s.cpMsg} ${s.cpMsgUser}`}>
                  <div className={`${s.cpAv} ${s.cpAvStu}`}>ST</div>
                  <div className={`${s.cpBubble} ${s.cpBubbleUser}`}>When is Prof. Mehta free?</div>
                </div>
                <div className={s.cpMsg}>
                  <div className={`${s.cpAv} ${s.cpAvBot}`}>KU</div>
                  <div className={`${s.cpBubble} ${s.cpBubbleBot}`}>Prof. Mehta is free Mon 10 AM and Wed 9–11 AM.</div>
                </div>
              </div>
              <div className={s.cpInput}>
                <span className={s.cpInputText}>Ask about timetable, faculty…</span>
                <div className={s.cpInputBtn}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className={s.stats}>
        <div className={s.stat}><div className={s.statN}>3</div><div className={s.statL}>PDF sources indexed</div></div>
        <div className={s.stat}><div className={s.statN}>&lt;1s</div><div className={s.statL}>Average response time</div></div>
        <div className={s.stat}><div className={s.statN}>100%</div><div className={s.statL}>Answers from your data</div></div>
      </div>

      {/* ── FEATURES ── */}
      <section className={s.features} id="features">
        <div className={s.featLabel}>Features</div>
        <h2 className={s.featTitle}>Everything students and faculty <span className={s.featTitleMuted}>actually need</span></h2>

        {/* F1 */}
        <div className={s.featRow}>
          <div className={s.featText}>
            <span className={s.featBadge}>Smart answers</span>
            <h3 className={s.featH}>Ask in plain English,<br /><em className={s.featEm}>get precise answers</em></h3>
            <p className={s.featP}>No searching through PDFs. No scrolling through timetables. Just ask — and get the exact answer pulled from your university's official documents.</p>
            <ul className={s.featPoints}>
              <li className={s.featPoint}><span className={s.featDot} />Reads from timetable, faculty &amp; exam PDFs</li>
              <li className={s.featPoint}><span className={s.featDot} />Cites the source document in every reply</li>
              <li className={s.featPoint}><span className={s.featDot} />Never hallucinates — only answers from real data</li>
            </ul>
          </div>
          <div className={s.featVisual}>
            <div className={s.fvHeader}>Chat <span className={s.fvBadge}>● Student</span></div>
            <div className={s.miniChat}>
              <div className={`${s.mcMsg} ${s.mcUser}`}>
                <div className={`${s.mcAv} ${s.mcAvStu}`}>ST</div>
                <div className={`${s.mcBubble} ${s.mcBubbleUser}`}>April exam schedule?</div>
              </div>
              <div className={s.mcMsg}>
                <div className={`${s.mcAv} ${s.mcAvBot}`}>KU</div>
                <div className={`${s.mcBubble} ${s.mcBubbleBot}`}>
                  Exams in April:<br />
                  • Data Structures — Apr 7, 10 AM<br />
                  • ML — Apr 9, 10 AM<br />
                  • DBMS — Apr 11, 2 PM
                </div>
              </div>
              <div className={s.mcSource}>
                <span className={s.mcSourceLabel}>Source:</span>
                <span className={s.mcSourceTag}>exam_schedule.pdf</span>
              </div>
            </div>
          </div>
        </div>

        {/* F2 */}
        <div className={`${s.featRow} ${s.featRowRev}`}>
          <div className={s.featText}>
            <span className={s.featBadge}>Full memory</span>
            <h3 className={s.featH}>Remembers everything<br /><em className={s.featEm}>you've asked</em></h3>
            <p className={s.featP}>Every conversation is saved per session. Students can revisit past questions. Faculty can track what's being asked most.</p>
            <ul className={s.featPoints}>
              <li className={s.featPoint}><span className={s.featDot} />Session history stored in Supabase</li>
              <li className={s.featPoint}><span className={s.featDot} />Context-aware replies within the session</li>
              <li className={s.featPoint}><span className={s.featDot} />Student &amp; faculty role modes</li>
            </ul>
          </div>
          <div className={s.featVisual}>
            <div className={s.fvHeader}>History</div>
            <div className={s.miniHist}>
              {["When is the ML lecture?", "When is Prof. Mehta free?", "April exam schedule?", "Which lab is free Tuesday?"].map((q, i) => (
                <div key={i} className={s.mhItem}>
                  <span className={s.mhNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={s.mhQ}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* F3 */}
        <div className={s.featRow} id="how">
          <div className={s.featText}>
            <span className={s.featBadge}>RAG pipeline</span>
            <h3 className={s.featH}>Built on real<br /><em className={s.featEm}>university documents</em></h3>
            <p className={s.featP}>Upload your PDFs once. The system chunks, embeds, and stores them in a vector database — so every answer is grounded in your actual data.</p>
            <ul className={s.featPoints}>
              <li className={s.featPoint}><span className={s.featDot} />PDF → chunks → embeddings → vector search</li>
              <li className={s.featPoint}><span className={s.featDot} />Voyage AI + Supabase pgvector</li>
              <li className={s.featPoint}><span className={s.featDot} />Update by re-uploading a new PDF</li>
            </ul>
          </div>
          <div className={s.featVisual}>
            <div className={s.fvHeader}>How it works</div>
            <div className={s.miniFlow}>
              {[
                { icon: "📄", text: "Upload university PDF" },
                { icon: "✂️", text: "Chunk into segments" },
                { icon: "🔢", text: "Embed with Voyage AI" },
                { icon: "🔍", text: "Answer retrieved by Claude" },
              ].map((step, i) => (
                <div key={i}>
                  <div className={`${s.mfStep} ${i === 3 ? s.mfStepDark : ""}`}>
                    <div className={`${s.mfIcon} ${i === 3 ? s.mfIconDark : ""}`}>{step.icon}</div>
                    <span className={`${s.mfText} ${i === 3 ? s.mfTextDark : ""}`}>{step.text}</span>
                  </div>
                  {i < 3 && <div className={s.mfArrow}>↓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta} id="about">
        <div className={s.ctaBox}>
          <h2 className={s.ctaH}>Ready to build it?</h2>
          <p className={s.ctaSub}>Full source code — Next.js frontend, FastAPI backend, Supabase vector DB.</p>
          <Link href="/chat" className={s.ctaBtn}>Try the assistant →</Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={s.footer}>
        <span className={s.footerL}>© 2025 Karnavati University Assistant</span>
        <div className={s.footerLinks}>
          <span className={s.footerLink}>GitHub</span>
          <span className={s.footerLink}>Docs</span>
          <span className={s.footerLink}>Contact</span>
        </div>
      </footer>

    </div>
  );
}
