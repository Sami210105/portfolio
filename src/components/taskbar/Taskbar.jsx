import { useState, useEffect, useRef } from "react";
import HomeTab from "./HomeTab";
import ProjectsTab from "./ProjectsTab";
import AchievementsTab from "./AchievementsTab";
import Panda from "../folders/Panda";

const MOBILE_BREAKPOINT = 640;

// Searchable pages + keywords
const SEARCH_INDEX = [
  { keywords: ["home", "about-me", "my-playlist", "tools", "connect", "resume"], page: "home", label: "Home" },
  { keywords: ["projects", "work", "euphoria", "ecell website", "sketch charades", "games hub", "moodify", "bugganizer", "github", "live link"], page: "projects", label: "Projects" },
  { keywords: ["achievements", "awards", "badges", "skills", "certificates"], page: "achievements", label: "Achievements" },
];

function useIsMobile() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width < MOBILE_BREAKPOINT;
}

// Displays live time + day + date on the right. Compact mode drops the
// date/day so it fits a phone-width taskbar.
function Clock({ compact }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const day = time.toLocaleDateString("en-IN", { weekday: "short" });
  const date = time.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const hr = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  if (compact) {
    return (
      <span className="text-[var(--window-header-text)] text-xs font-semibold tracking-wide select-none shrink-0">
        {hr}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end text-right leading-tight select-none cursor-default px-2">
      <span className="text-[var(--window-header-text)] text-sm font-semibold tracking-wide">{hr}</span>
      <span className="text-[var(--window-header-text)] text-[10px] opacity-70">{day}, {date}</span>
    </div>
  );
}

// Desktop search: inline pill that expands on focus, with an inline dropdown.
function SearchBar({ setActivePage }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);

    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const lower = q.toLowerCase();
    const hits = SEARCH_INDEX.filter(({ keywords, label }) =>
      keywords.some((k) => k.includes(lower)) || label.toLowerCase().includes(lower),
    );

    setResults(hits);
    setOpen(true);
  };

  const pick = (page) => {
    setActivePage(page);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const handleKey = (e) => {
    if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
    }
    if (e.key === "Enter" && results.length > 0) {
      pick(results[0].page);
    }
  };

  return (
    <div ref={ref} className="relative flex items-center">
      <div
        className={`flex items-center gap-2 px-3 h-9 rounded-full transition-all duration-200
          ${focused
            ? "bg-[var(--window-header-bg)] border border-[var(--window-header-text)] w-52 shadow-[0_0_14px_rgba(155,107,83,0.3)]"
            : "bg-[var(--window-header-bg)]/80 border border-[var(--window-header-text)]/40 w-40 hover:border-[var(--window-header-text)]"
          }`}
      >
        <svg className="w-3.5 h-3.5 text-[var(--window-header-text)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search..."
          className="bg-transparent text-[var(--window-header-text)] placeholder-[var(--window-header-text)]/50 text-sm outline-none w-full font-medium"
        />

        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="text-[var(--window-header-text)]/60 hover:text-[var(--window-header-text)] transition-colors shrink-0"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && (
        <div className="absolute bottom-12 left-0 w-52 bg-[var(--window-header-bg)] border border-[var(--window-header-text)]/40 rounded-xl overflow-hidden shadow-[0_-6px_28px_rgba(0,0,0,0.7)] z-50">
          {results.length > 0 ? (
            results.map(({ page, label }) => (
              <button
                key={page}
                onMouseDown={() => pick(page)}
                className="w-full text-left px-4 py-2.5 text-xs text-[var(--window-header-text)] hover:bg-[var(--window-hover-bg)]/40 flex items-center gap-2.5 transition-colors"
              >
                <svg className="w-3 h-3 text-[var(--window-header-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span>
                  Go to <strong className="text-[var(--window-header-text)]">{label}</strong>
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-xs text-[var(--window-header-text)]/60 italic">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Keyword-matched answers about Sam. First matching entry wins, so keep
// specific topics (individual projects) above general ones.
const PANDA_QA = [
  { test: /\b(hi|hello|hey|hola|yo)\b/, reply: "hi hi :) ask me about sam who she is, her projects, skills, anything basic" },
  { test: /\b(thanks|thank you|thx|bye)\b/, reply: "anytime. i'll be here napping" },
  { test: /(who are you|what are you|your name|panda)/, reply: "i'm the panda. i live here and guard the portfolio. mostly nap." },
  { test: /(scholar|research paper|\brag\b)/, reply: "scholar press: a rag research assistant that reads and compares academic papers and grounds its answers. react + fastapi + faiss." },
  { test: /(moodify|mood|emotion|music)/, reply: "moodifyai: reads the emotion in text and suggests music moods. 6 emotion classes, 82% accuracy." },
  { test: /(emosaic|emoji|mosaic|cnn)/, reply: "emosaic: turns a photo into an emoji mosaic using a custom patch-based cnn in pytorch." },
  { test: /(bugganizer|todo|tauri)/, reply: "bugganizer: a lightweight desktop todo tracker with task assignment. react + tauri." },
  { test: /(euphoria|fest|mern)/, reply: "euphoria: the college fest website, built end to end on the mern stack with a registration flow." },
  { test: /(games hub|game)/, reply: "games hub: an ai arcade where you customize classic games with text prompts and export them." },
  { test: /(project|built|build|made|portfolio)/, reply: "scholar press, moodifyai, emosaic, bugganizer, euphoria and games hub. open the projects tab for details!" },
  { test: /(achievement|award|hackathon|kgen|nss|volunteer)/, reply: "top 10 at the kgen national hackathon, co-lead for innovate sphere 2024, co-head of documentation, and nss volunteer work. see the achievements tab." },
  { test: /(intern|experience|job|work)/, reply: "she interned as a mern developer, working on real full-stack features with react and node." },
  { test: /(skill|stack|tech|language|tool|know|python|javascript|react)/, reply: "mostly javascript and python, little bit of ai, rag, agents, apis, mern stack specifically react, fastapi, etc." },
  { test: /(college|education|study|student|degree|cgpa|gpa|university|year)/, reply: "4th-year computer engineering (aiml honors) at aissms college of engineering, pune. cgpa 8.98." },
  { test: /(looking|hire|hiring|role|open to|available|opportunit)/, reply: "she's aiming for ai/ml and ai/llm app dev roles - rag, agents, apis. use the connect folder to reach her." },
  { test: /(contact|email|reach|connect|linkedin|message)/, reply: "open the connect folder on the home screen for her socials and email." },
  { test: /(github|code|repo)/, reply: "github.com/Sami210105 all the repos are there." },
  { test: /(resume|cv)/, reply: "the resume folder on the home screen has her cv." },
  { test: /(who|about|sam|samidha|intro|tell me)/, reply: "sam (samidha) is a 4th-year computer engineering student who builds ai/ml and full-stack projects. ask about her projects, skills or college!" },
];

const PANDA_FALLBACKS = [
  "hmm, not sure about that one. try asking about her projects, skills, college or how to reach her",
  "i'm just a panda. ask me about sam's projects, skills or achievements!",
  "bamboo... where's the bamboo. (also: try 'what has sam built?')",
];

function pandaAnswer(text) {
  const q = text.toLowerCase();
  const hit = PANDA_QA.find(({ test }) => test.test(q));
  if (hit) return hit.reply;
  return PANDA_FALLBACKS[Math.floor(Math.random() * PANDA_FALLBACKS.length)];
}

// Playful, clearly-not-real-AI panda chat — canned one-liners, no pretense
// of understanding what's typed. Reachable from the "Chat with Panda" tab.
function PandaChatSheet({ onClose }) {
  const [log, setLog] = useState([
    { from: "panda", text: "hi hi :)" },
  ]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [log]);

  const reply = (question) => {
    setLog((l) => [...l, { from: "panda", text: pandaAnswer(question) }]);
  };

  const send = () => {
    if (!draft.trim()) return;
    const question = draft.trim();
    setLog((l) => [...l, { from: "me", text: question }]);
    setDraft("");
    setTimeout(() => reply(question), 400);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col bg-[var(--window-body-bg)] font-mono"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="bg-[var(--window-header-bg)] px-4 py-3 flex items-center justify-between shrink-0">
        <span className="text-[var(--window-header-text)] text-base font-bold">Chat with Panda</span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--window-button-bg)] text-[var(--window-button-text)] text-sm font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col items-center pt-5 pb-1 shrink-0">
        <Panda size={240} fps={12} hideBubble />
        <p className="text-[10px] text-[var(--window-text-secondary)] mt-1">tap the panda</p>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-2">
        {log.map((m, i) => (
          <div key={i} className={`flex ${m.from === "panda" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                m.from === "panda"
                  ? "bg-[var(--window-panel-bg)] text-[var(--window-body-text)]"
                  : "bg-[var(--window-active-bg)] text-[var(--window-active-text)]"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-3 border-t border-[var(--window-border-dark)]/20 shrink-0">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Say something..."
          className="flex-1 min-w-0 bg-[var(--window-panel-bg)] rounded-full px-4 py-2 text-base outline-none text-[var(--window-body-text)]"
        />
        <button
          onClick={send}
          aria-label="Send"
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[var(--window-button-bg)] text-[var(--window-button-text)]"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

// Outline icon set for the mobile tab bar — replaces the emoji glyphs so
// every tab renders the same stroke weight/size regardless of platform
// emoji font.
function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 9.5V19a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h3a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function FolderTabIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7.4A1.9 1.9 0 0 1 4.9 5.5h4.2c.45 0 .88.18 1.2.5l1.3 1.3c.32.32.75.5 1.2.5h6.3A1.9 1.9 0 0 1 21 9.7v8A1.8 1.8 0 0 1 19.2 19.5H4.8A1.8 1.8 0 0 1 3 17.7Z" />
    </svg>
  );
}

function TrophyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
      <path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5 3.5 3.5 0 0 0 6.5 10H7" />
      <path d="M17 5h2.5A1.5 1.5 0 0 1 21 6.5 3.5 3.5 0 0 1 17.5 10H17" />
      <path d="M12 14v3" />
      <path d="M9 20.5h6" />
      <path d="M10 17.5h4l.6 3H9.4Z" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 12.5Z" />
    </svg>
  );
}

// Phone bottom nav: icon-over-label pills with an active highlight + dot,
// including "Chat with Panda" since the floating panda widget isn't on the
// mobile home screen — this is how it's reached there.
function MobileTabBar({ activePage, setActivePage }) {
  const [chatOpen, setChatOpen] = useState(false);

  const items = [
    { id: "home", label: "Home", Icon: HomeIcon, onClick: () => setActivePage("home") },
    { id: "projects", label: "Projects", Icon: FolderTabIcon, onClick: () => setActivePage("projects") },
    { id: "achievements", label: "Achievements", Icon: TrophyIcon, onClick: () => setActivePage("achievements") },
    { id: "chat", label: "Panda", Icon: ChatIcon, onClick: () => setChatOpen(true) },
  ];

  return (
    <>
      <div
        className="fixed bottom-0 inset-x-0 z-50 bg-[var(--window-panel-bg)] border-t-2 border-[var(--window-border-dark)] flex items-stretch justify-evenly pt-2"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 2px)" }}
      >
        {items.map((item) => {
          const isActive = item.id === "chat" ? chatOpen : activePage === item.id;
          const Icon = item.Icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="flex flex-col items-center gap-1 px-2 py-1"
            >
              <span
                className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-colors ${
                  isActive
                    ? "bg-[var(--window-active-bg)] text-[var(--window-active-text)]"
                    : "text-[var(--window-label-text)] opacity-80"
                }`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <span
                className={`text-[10px] font-mono font-bold leading-tight text-center ${
                  isActive ? "text-[var(--window-active-bg)]" : "text-[var(--window-label-text)] opacity-80"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {chatOpen && <PandaChatSheet onClose={() => setChatOpen(false)} />}
    </>
  );
}

// Bottom navigation bar containing search, tabs and clock.
export default function Taskbar({ activePage, setActivePage }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileTabBar activePage={activePage} setActivePage={setActivePage} />;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-[var(--window-header-bg)] border-t border-[var(--window-header-text)]/20 backdrop-blur-md flex items-center px-4 gap-2 z-50">
      <SearchBar setActivePage={setActivePage} />

      <HomeTab activePage={activePage} setActivePage={setActivePage} />
      <ProjectsTab activePage={activePage} setActivePage={setActivePage} />
      <AchievementsTab activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1" />

      <Clock compact={false} />
    </div>
  );
}