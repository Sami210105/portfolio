import { useState, useEffect, useRef } from "react";
import HomeTab from "./HomeTab";
import ProjectsTab from "./ProjectsTab";
import AchievementsTab from "./AchievementsTab";

// Searchable pages + keywords
const SEARCH_INDEX = [
  { keywords: ["home", "about-me", "my-playlist", "tools", "connect", "resume"], page: "home", label: "Home" },
  { keywords: ["projects", "work", "euphoria", "ecell website", "sketch charades", "games hub", "moodify", "bugganizer", "github", "live link"], page: "projects", label: "Projects" },
  { keywords: ["achievements", "awards", "badges", "skills", "certificates"], page: "achievements", label: "Achievements" },
];

// Displays live time + day + date on the right.
function Clock() {
  const [time, setTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const day  = time.toLocaleDateString("en-IN", { weekday: "short" });
  const date = time.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const hr   = time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <div className="flex flex-col items-end text-right leading-tight select-none cursor-default px-2">
      {/* Current time */}
      <span className="text-[var(--window-header-text)] text-sm font-semibold tracking-wide">{hr}</span>

      {/* Current day + date */}
      <span className="text-[var(--window-header-text)] text-[10px] opacity-70">{day}, {date}</span>
    </div>
  );
}

// Handles search input, matching pages and navigation.
function SearchBar({ setActivePage }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen]       = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Search for matching keywords/pages
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
      keywords.some(k => k.includes(lower)) ||
      label.toLowerCase().includes(lower)
    );

    setResults(hits);
    setOpen(true);
  };

  // Navigate to selected page and reset search
  const pick = (page) => {
    setActivePage(page);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  // Keyboard controls: Escape clears, Enter selects first result
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

      {/* Search input container */}
      <div
        className={`flex items-center gap-2 px-3 h-9 rounded-full transition-all duration-200
          ${focused
            ? "bg-[var(--window-header-bg)] border border-[var(--window-header-text)] w-52 shadow-[0_0_14px_rgba(155,107,83,0.3)]"
            : "bg-[var(--window-header-bg)]/80 border border-[var(--window-header-text)]/40 w-40 hover:border-[var(--window-header-text)]"
          }`}
      >

        {/* Search icon */}
        <svg className="w-3.5 h-3.5 text-[var(--window-header-text)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>

        {/* Search text input */}
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

        {/* Clear search button */}
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="text-[var(--window-header-text)]/60 hover:text-[var(--window-header-text)] transition-colors shrink-0"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Search results dropdown */}
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
                  <path d="m9 18 6-6-6-6"/>
                </svg>

                <span>
                  Go to <strong className="text-[var(--window-header-text)]">{label}</strong>
                </span>
              </button>
            ))
          ) : (
            // Shown when search has no matching page
            <p className="px-4 py-3 text-xs text-[var(--window-header-text)]/60 italic">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}


// Bottom navigation bar containing search, tabs and clock.
export default function Taskbar({ activePage, setActivePage }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-[var(--window-header-bg)] border-t border-[var(--window-header-text)]/20 backdrop-blur-md flex items-center px-4 gap-2 z-50">

      {/* Search bar */}
      <SearchBar setActivePage={setActivePage} />

      {/* Navigation tabs */}
      <HomeTab activePage={activePage} setActivePage={setActivePage} />
      <ProjectsTab activePage={activePage} setActivePage={setActivePage} />
      <AchievementsTab activePage={activePage} setActivePage={setActivePage} />

      {/* Pushes clock to the far right */}
      <div className="flex-1" />

      {/* Time + date */}
      <Clock />
    </div>
  );
}