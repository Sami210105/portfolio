import { useEffect, useRef, useState, useMemo } from "react";
import { PROJECTS } from "../folders/projects/notebookData";
import ProjectFace from "../folders/projects/ProjectFace";
import RingBinding from "../folders/projects/RingBinding";

const TASKBAR_HEIGHT = 64;
const MOBILE_BREAKPOINT = 640;

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

function getScrollParent(el) {
  let node = el ? el.parentElement : null;
  while (node && node !== document.body) {
    const { overflowY } = window.getComputedStyle(node);
    const canScroll = overflowY === "auto" || overflowY === "scroll";
    if (canScroll && node.scrollHeight > node.clientHeight) return node;
    node = node.parentElement;
  }
  return window;
}

// notebookData.js wasn't available while building this, so field access is
// best-effort across a few likely names — if cards render blank in a spot,
// tell me the actual field names in notebookData.js and I'll hardcode them.
const pick = (obj, keys, fallback) => {
  for (const k of keys) {
    if (obj?.[k] !== undefined && obj?.[k] !== null && obj?.[k] !== "") return obj[k];
  }
  return fallback;
};

const CARD_ACCENTS = ["bg-rose-300", "bg-emerald-300", "bg-violet-300", "bg-pink-300", "bg-amber-300", "bg-sky-300"];

// Folder-tab notch sitting above the card, like a labelled folder with a
// strip of tape holding it down -- matches the reference mockup.
function FolderTab({ colorClass }) {
  return (
    <div className="absolute -top-3 left-4 z-10">
      <div
        className={`w-24 h-5 rounded-t-lg ${colorClass}`}
        style={{ clipPath: "polygon(0 100%, 0 30%, 15% 0, 85% 0, 100% 30%, 100% 100%)" }}
      />
      <div className="absolute -top-1 right-1 w-6 h-3 bg-white/70 rotate-6 rounded-sm pointer-events-none" />
    </div>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.78 10.77.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.17.69-3.84-1.35-3.84-1.35-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const title = pick(project, ["title", "name"], "Untitled project");
  const description = pick(project, ["description", "desc", "summary", "blurb", "pitch"], "");
  const tags = pick(project, ["tags", "stack", "tech", "technologies"], []);
  const github = pick(project, ["github", "githubUrl", "repo", "repoUrl", "githubLink"], null);
  const live = pick(project, ["live", "liveUrl", "link", "url", "liveLink"], null);
  const image =
    pick(project, ["image", "thumbnail", "cover", "preview", "banner"], null) ??
    (Array.isArray(project?.images) ? project.images[0] : null);
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  const openLink = (e, url) => {
    e.stopPropagation();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative mt-5 first:mt-1">
      <FolderTab colorClass={accent} />
      <div className="relative bg-white border-2 border-[var(--window-border-dark)] rounded-2xl overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
        <div className="h-36 w-full bg-[var(--window-panel-bg)] flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl opacity-40" aria-hidden="true">🗂️</span>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-base font-bold text-[var(--window-body-text)]">{title}</h3>
          {description && (
            <p className="text-sm text-[var(--window-text-secondary)] mt-1 leading-snug line-clamp-3">
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--window-panel-bg)] text-[var(--window-text-secondary)]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-[var(--window-body-text)]">
              {github && (
                <button onClick={(e) => openLink(e, github)} aria-label="GitHub repository">
                  <GithubIcon />
                </button>
              )}
              {live && (
                <button onClick={(e) => openLink(e, live)} aria-label="Live link">
                  <ExternalLinkIcon />
                </button>
              )}
            </div>

            {(live || github) && (
              <button
                onClick={(e) => openLink(e, live ?? github)}
                className="text-sm font-bold text-[var(--window-accent)] flex items-center gap-1"
              >
                View <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileProjects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showMore, setShowMore] = useState(false);

  const categories = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach((p) => set.add(pick(p, ["category", "type", "domain"], "Other")));
    return ["All", ...Array.from(set)];
  }, []);

  const visibleCategories = categories.slice(0, 5);
  const overflowCategories = categories.slice(5);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const cat = pick(p, ["category", "type", "domain"], "Other");
      if (category !== "All" && cat !== category) return false;
      if (!q) return true;
      const title = pick(p, ["title", "name"], "").toLowerCase();
      const desc = pick(p, ["description", "desc", "summary", "blurb"], "").toLowerCase();
      const tags = pick(p, ["tags", "stack", "tech", "technologies"], []).join(" ").toLowerCase();
      return title.includes(q) || desc.includes(q) || tags.includes(q);
    });
  }, [query, category]);

  return (
    <div className="min-h-screen" style={{ paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px) + 24px)" }}>
      <div className="px-4" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 20px)" }}>
        <h1 className="text-3xl font-extrabold text-[var(--window-body-text)]">Projects</h1>

        <div className="flex items-center gap-2 bg-[var(--window-panel-bg)] border-2 border-[var(--window-border-dark)] rounded-full px-4 h-11 mt-4">
          <span aria-hidden="true">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="flex-1 min-w-0 bg-transparent outline-none text-base text-[var(--window-body-text)] placeholder-[var(--window-text-secondary)]"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {visibleCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-mono border-2 border-[var(--window-border-dark)] ${
                category === c
                  ? "bg-[var(--window-active-bg)] text-[var(--window-active-text)]"
                  : "bg-[var(--window-panel-bg)] text-[var(--window-body-text)]"
              }`}
            >
              {c}
            </button>
          ))}

          {overflowCategories.length > 0 && (
            <div className="relative shrink-0">
              <button
                onClick={() => setShowMore((s) => !s)}
                className={`px-3 py-1.5 rounded-full text-sm font-mono border-2 border-[var(--window-border-dark)] ${
                  overflowCategories.includes(category)
                    ? "bg-[var(--window-active-bg)] text-[var(--window-active-text)]"
                    : "bg-[var(--window-panel-bg)] text-[var(--window-body-text)]"
                }`}
              >
                {overflowCategories.includes(category) ? category : "More"} ▾
              </button>
              {showMore && (
                <div className="absolute top-full mt-1 right-0 bg-[var(--window-panel-bg)] border-2 border-[var(--window-border-dark)] rounded-xl overflow-hidden z-10 min-w-[140px]">
                  {overflowCategories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCategory(c);
                        setShowMore(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-mono text-[var(--window-body-text)]"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 mt-4">
        {filtered.map((project, i) => (
          <ProjectCard key={pick(project, ["id"], i)} project={project} index={i} />
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-[var(--window-text-secondary)] py-10">
            No projects match "{query}"
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const isMobile = useIsMobile();
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [pageH, setPageH] = useState(() => window.innerHeight - TASKBAR_HEIGHT);

  useEffect(() => {
    if (isMobile) return; // notebook scroll-flip is desktop-only
    const scrollTarget = getScrollParent(wrapRef.current);

    const onScroll = () => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const vh = pageH;
      const maxScroll = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), maxScroll);
      const p = maxScroll > 0 ? scrolled / vh : 0;
      setProgress(Math.min(Math.max(p, 0), PROJECTS.length - 1 + 0.999));
    };

    const onResize = () => {
      setPageH(window.innerHeight - TASKBAR_HEIGHT);
      onScroll();
    };

    onScroll();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pageH, isMobile]);

  if (isMobile) return <MobileProjects />;

  const currentIndex = Math.floor(progress);
  const local = progress - currentIndex;
  const activeTab = Math.round(progress);

  const jumpTo = (i) => {
    if (!wrapRef.current) return;
    const top = wrapRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * pageH, behavior: "smooth" });
  };

  return (
    <div ref={wrapRef} style={{ height: `${PROJECTS.length * pageH}px` }} className="relative w-full">
      <div style={{ height: `${pageH}px` }} className="sticky top-0 w-full flex items-center justify-center overflow-hidden">
        <div className="relative flex items-center gap-3 md:gap-8">
          {/* tabs */}
          <div className="hidden sm:flex flex-col gap-2 z-30">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => jumpTo(i)}
                className={`text-[10px] font-bold px-2 py-2 border-2 border-[var(--window-border-dark)]
                  ${activeTab === i ? "bg-[var(--window-accent)] text-[var(--window-button-text)]" : "bg-[var(--window-button-bg)] text-[var(--window-button-text)]"}`}
                style={{ writingMode: "vertical-rl" }}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* notebook */}
          <div style={{ perspective: "2200px" }} className="relative w-[100vw] max-w-[900px] h-[68vh] max-h-[620px] isolate">
            <RingBinding count={13} />

            {PROJECTS.map((project, i) => {
              let rotateY = 0;
              const z = PROJECTS.length - i;
              const isLastPage = i === PROJECTS.length - 1;

              if (i < currentIndex) rotateY = -180;
              if (i === currentIndex && !isLastPage) rotateY = -local * 180;

              const shade = i === currentIndex && !isLastPage ? Math.sin(local * Math.PI) : 0;

              return (
                <div
                  key={project.id}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    transform: `rotateY(${rotateY}deg)`,
                    zIndex: z,
                  }}
                  className="absolute inset-0"
                >
                  {/* front face */}
                  <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 bg-white border-2 border-[var(--window-border-dark)] shadow-[6px_6px_0_rgba(0,0,0,0.25)] overflow-hidden">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "repeating-linear-gradient(to bottom, black 0px, black 1px, transparent 1px, transparent 28px)",
                        opacity: 0.25,
                      }}
                    />

                    <div className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: shade * 0.25 }} />

                    <ProjectFace project={project} />

                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs font-mono text-[var(--window-text-secondary)] px-3 py-1 z-20 pointer-events-none text-center">
                      {i + 1} / {PROJECTS.length}
                      <p className="text-[12px] mt-1">scroll to flip</p>
                    </div>
                  </div>

                  {/* back face */}
                  <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0 bg-[var(--window-panel-bg)] border-2 border-[var(--window-border-dark)]">
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "repeating-linear-gradient(to bottom, black 0px, black 1px, transparent 1px, transparent 28px)",
                        opacity: 0.25,
                      }}
                    />

                    <div className="absolute inset-0 pointer-events-none bg-black" style={{ opacity: shade * 0.25 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}