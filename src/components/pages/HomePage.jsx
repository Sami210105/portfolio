import React, { useState, useEffect, useMemo } from "react";
import FolderIcon from "../folders/FolderIcon";
import Panda from "../folders/Panda";
import StickyNote from "../folders/StickyNote";
import Feedback from "../folders/Feedback";

import AboutMe from "../folders/Aboutme";
import Connect from "../folders/Connect";
import Music from "../folders/Music";
import Resume from "../folders/Resume";
import Tools from "../folders/Tools";
import Terminal from "../folders/Terminal";
import ContextMenu from "../folders/ContextMenu";
import PersonalizeWindow from "../folders/PersonalizeWindow";

import folderAbout from "../../assets/folder-about.png";
import folderMusic from "../../assets/folder-music.png";
import folderConnect from "../../assets/folder-connect.png";
import folderResume from "../../assets/folder-resume.png";
import folderTools from "../../assets/folder-resume.png";
import folderFeedback from "../../assets/folder-about.png";

const MOBILE_BREAKPOINT = 640;

const folders = [
  {
    id: "about",
    label: "About Me",
    icon: folderAbout,
    pos: { top: "80px", left: "60px" },
  },
  {
    id: "music",
    label: "My Playlist",
    icon: folderMusic,
    pos: { top: "220px", left: "60px" },
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: folderFeedback,
    pos: { top: "360px", left: "60px" },
  },
  {
    id: "connect",
    label: "Connect",
    icon: folderConnect,
    pos: { top: "220px", right: "60px" },
  },
  {
    id: "resume",
    label: "Resume",
    icon: folderResume,
    pos: { top: "340px", right: "60px" },
  },
  {
    id: "tools",
    label: "Tools",
    icon: folderTools,
    pos: { top: "460px", right: "60px" },
  },
];

// TODO: swap these file/subfolder counts for the real numbers once you
// decide what "counts" as a file/subfolder for each of these.
const MOBILE_APPS = [
  { id: "about", label: "About Me", subtitle: "Bio & photo", fileCount: 1, subfolderCount: 0, emoji: "🧑\u200d💻", color: "bg-slate-300 text-slate-800" },
  { id: "music", label: "My Playlist", subtitle: "7 tracks", fileCount: 7, subfolderCount: 0, emoji: "🎵", color: "bg-emerald-300 text-emerald-900" },
  { id: "connect", label: "Connect", subtitle: "Socials & email", fileCount: 3, subfolderCount: 0, emoji: "✉️", color: "bg-sky-300 text-sky-900" },
  { id: "resume", label: "Resume", subtitle: "Download CV", fileCount: 1, subfolderCount: 0, emoji: "📄", color: "bg-amber-300 text-amber-900" },
  { id: "tools", label: "Tools", subtitle: "My tech stack", fileCount: 1, subfolderCount: 4, emoji: "🛠️", color: "bg-violet-300 text-violet-900" },
  { id: "terminal", label: "Terminal", subtitle: "Run commands", fileCount: 1, subfolderCount: 0, emoji: "💻", color: "bg-rose-300 text-rose-900" },
  { id: "feedback", label: "Feedback", subtitle: "Rate & message me", fileCount: 1, subfolderCount: 0, emoji: "💌", color: "bg-pink-300 text-pink-900" },
];

const PANDA_REACTIONS = {
  about: [
    "yep, that's me",
    "hi. that's me :)",
    "professional developer, full-time overthinker",
    "this is where i pretend i have my life together",
    "yes, i made this little world",
  ],

  music: [
    "ooh bangers only",
    "currently romanticizing my life",
    "coding playlist = activated",
  ],

  connect: [
    "go on, say hi",
    "don't be shy now",
    "come talk to me :)",
    "let's be internet friends",
  ],

  resume: [
    "my professional lore",
    "here's where i pretend i'm very professional",
    "the serious version of me",
    "yes, recruiters, this way",
  ],

  tools: [
    "nerd stuff in here",
    "my little digital toolbox",
    "things i use to make things",
    "developer things™",
  ],
};

// Outline folder icon used inside each card's icon tile — matches the
// hand-drawn, unfilled look of the reference mockup.
function FolderIconGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7.4A1.9 1.9 0 0 1 4.9 5.5h4.2c.45 0 .88.18 1.2.5l1.3 1.3c.32.32.75.5 1.2.5h6.3A1.9 1.9 0 0 1 21 9.7v8A1.8 1.8 0 0 1 19.2 19.5H4.8A1.8 1.8 0 0 1 3 17.7Z" />
    </svg>
  );
}

// Folder-tab notch peeking out behind the card, like a strip of a hanging
// folder — matches the reference mockup and the tab used on ProjectsPage.
function FolderTab() {
  return (
    <div className="absolute -top-3 left-5 z-0">
      <div
        className="w-30 h-4 rounded-t-md bg-[var(--window-panel-bg)] border-2 border-b-0 border-[var(--window-border-dark)] shadow-[3px_3px_0px_rgba(0,0,0,0.65)]"
      />
    </div>
  );
}

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

const HomePage = ({ setActivePage }) => {
  const isMobile = useIsMobile();

  // Desktop opens straight into the About window (existing behaviour);
  // phone starts on the home screen, like an actual phone.
  const [openWindow, setOpenWindow] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
      ? null
      : "about",
  );
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [showNote, setShowNote] = useState(true);
  const [contextMenu, setContextMenu] = useState(null); // { x, y } | null
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [query, setQuery] = useState("");
  const close = () => setOpenWindow(null);

  const filteredApps = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOBILE_APPS;
    return MOBILE_APPS.filter(
      (a) => a.label.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q),
    );
  }, [query]);

  const renderWindow = () => {
    switch (openWindow) {
      case "about":
        return <AboutMe onClose={close} />;
      case "music":
        return <Music onClose={close} />;
      case "connect":
        return <Connect onClose={close} />;
      case "resume":
        return <Resume onClose={close} />;
      case "tools":
        return <Tools onClose={close} />;
      case "feedback":
        return <Feedback onClose={close} />;
      case "terminal":
        return (
          <Terminal
            defaultPos={{ x: 850, y: 300 }}
            onOpenWindow={(id) => setOpenWindow(id)}
            onClose={close}
          />
        );
      default:
        return null;
    }
  };

  const handleDesktopContextMenu = (e) => {
    // only trigger on empty desktop space, not on folders/windows/terminal
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative w-full h-screen"
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Desktop icons — scattered, absolute-positioned, mouse/trackpad UI */}
      {!isMobile &&
        folders.map((f) => (
          <div
            key={f.id}
            className="absolute z-30"
            style={f.pos}
            onMouseEnter={() => setHoveredFolder(f.id)}
            onMouseLeave={() =>
              setHoveredFolder((current) => (current === f.id ? null : current))
            }
          >
            <FolderIcon
              label={f.label}
              icon={f.icon}
              onClick={() => setOpenWindow(f.id)}
            />
          </div>
        ))}

      {/* Phone home screen: search + folder-card grid */}
      {isMobile && (
        <div className="min-h-screen">
          <div className="relative" style={{ paddingBottom: "180px" }}>
            {/* Search */}
            <div
              className="px-4 relative z-10"
              style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
            >
              <div className="flex items-center gap-2 bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] rounded-full px-4 h-11 shadow-[3px_3px_0px_rgba(0,0,0,0.25)]">
                <span aria-hidden="true">🔍</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search About, Music, Resume..."
                  className="flex-1 min-w-0 bg-transparent outline-none text-base text-[var(--window-body-text)] placeholder-[var(--window-text-secondary)]"
                />
                {/* Decorative for now, matching the reference — wire up a
                    real filter/sort menu here if you want it to do something */}
                <button aria-label="Filter" className="text-[var(--window-text-secondary)] shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                </button>
              </div>
            </div>

          {/* Folder-card grid */}
          <div className="grid grid-cols-2 gap-6 px-4 mt-6">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => setOpenWindow(app.id)}
                className="relative text-left mt-4"
              >
                <FolderTab />

                <div className="relative bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] rounded-lg p-3.5 shadow-[4px_4px_0px_rgba(0,0,0,0.65)]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative w-12 h-12 shrink-0">
                      {/* back layer — same fill, offset behind with a hard shadow for the stacked-paper look */}
                      <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-[var(--window-panel-bg)] border-2 border-[var(--window-border-dark)] shadow-[2px_2px_0_rgba(0,0,0,0.4)]" />
                      <span className="relative flex w-12 h-12 items-center justify-center rounded-md bg-[var(--window-panel-bg)] border-2 border-[var(--window-border-dark)] text-[var(--window-body-text)]">
                        <FolderIconGlyph className="w-6 h-6" />
                      </span>
                    </span>

                    <div className="text-[11px] text-[var(--window-text-secondary)] leading-snug min-w-0">
                      <p>{app.fileCount} file{app.fileCount === 1 ? "" : "s"}</p>
                      <p>{app.subfolderCount} subfolder{app.subfolderCount === 1 ? "" : "s"}</p>
                    </div>
                  </div>

                  <p className="mt-2.5 text-base font-bold text-[var(--window-body-text)] truncate">
                    {app.label}
                  </p>
                </div>
              </button>
            ))}

            {filteredApps.length === 0 && (
              <p className="col-span-2 text-center text-sm text-[var(--window-text-secondary)] py-6">
                No matches for "{query}"
              </p>
            )}
          </div>

          </div>
        </div>
      )}

      {/* sticky-note — desktop-only decorative touch */}
      {!isMobile && showNote && (
        <StickyNote initialX={950} initialY={60} onClose={() => setShowNote(false)} />
      )}

      {/* terminal — always-on floating window on desktop; on phone it's just
          another app card, opened/closed like the rest */}
      {!isMobile && (
        <Terminal
          defaultPos={{ x: 850, y: 300 }}
          onOpenWindow={(id) => setOpenWindow(id)}
          onClose={() => {}}
        />
      )}

      {/* panda — desktop only; on phone it's reachable via the "Chat with
          Panda" tab in the taskbar instead of a floating widget */}
      {!isMobile && (
        <div className="fixed z-50" style={{ bottom: "12px", left: "16px" }}>
          <Panda
            size={300}
            fps={12}
            reactTo={hoveredFolder}
            reactions={PANDA_REACTIONS}
            setActivePage={setActivePage}
            onOpenWindow={setOpenWindow}
            onPersonalize={() => setShowPersonalize(true)}
          />
        </div>
      )}

      {openWindow && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={close}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({ x: e.clientX, y: e.clientY });
            }}
          />
          {renderWindow()}
        </>
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onPersonalize={() => setShowPersonalize(true)}
          onRefresh={() => window.location.reload()}
        />
      )}

      {showPersonalize && (
        <PersonalizeWindow onClose={() => setShowPersonalize(false)} />
      )}
    </div>
  );
};

export default HomePage;