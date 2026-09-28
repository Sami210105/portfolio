import { useState, useEffect, useMemo } from "react";
import ErrorPopup from "../folders/ErrorPopup";

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

// TODO: swap in your own Overview / Key Contributions / Impact copy per
// achievement below -- these are draft expansions of your one-line
// descriptions so the detail sheet has something real to show for now.
const ACHIEVEMENTS = [
  {
    id: "kgen",
    title: "KGen Hackathon",
    subtitle: "National-Level Hackathon",
    desc: "Ranked Top 10 at national-level hackathon",
    category: "Hackathons",
    tags: ["Hackathon", "Top 10"],
    icon: "trophy",
    color: "bg-rose-200 text-rose-700",
    overview:
      "Competed at KGen, a national-level hackathon, building and pitching a project against teams from across the country.",
    contributions: [
      "Built and demoed a working prototype under a tight deadline",
      "Collaborated with teammates across design, frontend and backend",
      "Presented the solution to a panel of judges",
    ],
    impact:
      "Placed in the Top 10 nationally, validating the idea and the execution under pressure.",
  },
  {
    id: "doc-head",
    title: "Co-Head Documentation",
    subtitle: "Documentation Team",
    desc: "Led documentation team & streamlined workflows",
    category: "Positions",
    tags: ["Leadership", "Process"],
    icon: "clipboard",
    color: "bg-emerald-200 text-emerald-700",
    overview:
      "Co-headed the documentation team, responsible for keeping technical and process docs consistent and up to date.",
    contributions: [
      "Set documentation standards followed across the team",
      "Streamlined review workflows to cut turnaround time",
      "Onboarded new members to the documentation process",
    ],
    impact:
      "Reduced documentation gaps and made handoffs between teams noticeably smoother.",
  },
  {
    id: "hackathon-colead",
    title: "Hackathon Co-Lead",
    subtitle: "Innovate Sphere 2024",
    desc: "Managed Innovate Sphere event & coordinated teams",
    category: "Hackathons",
    tags: ["Leadership", "Event Management"],
    icon: "users",
    color: "bg-rose-200 text-rose-700",
    overview:
      "Managed the Innovate Sphere event, coordinated with teams, handled logistics and organised sessions.",
    contributions: [
      "Coordinated 10+ teams and mentors",
      "Handled event logistics and scheduling",
      "Organised workshops and speaker sessions",
      "Ensured smooth on-ground execution",
    ],
    impact:
      "Successfully conducted a large-scale hackathon with active participation and positive feedback from participants and mentors.",
  },
  {
    id: "mern-intern",
    title: "MERN Intern",
    subtitle: "Full-Stack Internship",
    desc: "Built real-world full-stack features using React & Node",
    category: "Positions",
    tags: ["MERN", "Full Stack"],
    icon: "code",
    color: "bg-emerald-200 text-emerald-700",
    overview:
      "Worked as a MERN stack intern, building real-world web application features end-to-end.",
    contributions: [
      "Built features using MongoDB, Express, React and Node.js",
      "Worked directly with a live production codebase",
      "Fixed bugs and shipped small features independently",
    ],
    impact:
      "Gained hands-on experience shipping full-stack features in a real engineering environment.",
  },
  {
    id: "nss-volunteer",
    title: "NSS Volunteer",
    subtitle: "Fort Rajgad Conservation",
    desc: "Participated in cleanliness drives and blood donation campaigns",
    category: "Volunteering",
    tags: ["Community Service", "Social Impact"],
    icon: "heart",
    color: "bg-amber-200 text-amber-700",
    overview:
      "Volunteered with NSS on conservation and community welfare initiatives, including Fort Rajgad conservation work.",
    contributions: [
      "Took part in Fort Rajgad conservation efforts",
      "Organised and joined cleanliness drives",
      "Supported blood donation campaigns",
    ],
    impact:
      "Contributed directly to community welfare and conservation efforts on the ground.",
  },
  {
    id: "tech-exposure",
    title: "Tech Exposure",
    subtitle: "GDSC WOW & RYLA",
    desc: "Attended tech talks and workshops on emerging technologies and leadership",
    category: "Learning",
    tags: ["Learning", "Tech Talks"],
    icon: "star",
    color: "bg-violet-200 text-violet-700",
    overview:
      "Attended GDSC WOW sessions and RYLA tech talks to stay current with emerging technologies and leadership practices.",
    contributions: [
      "Attended sessions on emerging tech and tools",
      "Engaged with speakers and Q&A discussions",
      "Took notes and applied learnings to personal projects",
    ],
    impact:
      "Broadened technical awareness and picked up ideas later applied to own projects.",
  },
];

// Outline SVG icons for achievement tiles (keyed by `icon` above).
const ICON_PATHS = {
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
      <path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5 3.5 3.5 0 0 0 6.5 10H7" />
      <path d="M17 5h2.5A1.5 1.5 0 0 1 21 6.5 3.5 3.5 0 0 1 17.5 10H17" />
      <path d="M12 14v3M9 20.5h6M10 17.5h4l.6 3H9.4Z" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <path d="M9 4.5h6v2.5H9Z" />
      <path d="M8.5 11.5h7M8.5 15h5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 5.7a3 3 0 0 1 0 5.6M17 14.2a5.5 5.5 0 0 1 3.5 4.8" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />
  ),
  star: (
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.9Z" />
  ),
};

function AchievementIcon({ name, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function FilterChips({ categories, active, onSelect }) {
  const visible = categories.slice(0, 4);
  const overflow = categories.slice(4);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {visible.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-mono border-2 border-[var(--window-border-dark)] ${
            active === c
              ? "bg-[var(--window-active-bg)] text-[var(--window-active-text)]"
              : "bg-[var(--window-panel-bg)] text-[var(--window-body-text)]"
          }`}
        >
          {c}
        </button>
      ))}

      {overflow.length > 0 && (
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMore((s) => !s)}
            className={`px-3 py-1.5 rounded-full text-sm font-mono border-2 border-[var(--window-border-dark)] ${
              overflow.includes(active)
                ? "bg-[var(--window-active-bg)] text-[var(--window-active-text)]"
                : "bg-[var(--window-panel-bg)] text-[var(--window-body-text)]"
            }`}
          >
            {overflow.includes(active) ? active : "More"} ▾
          </button>
          {showMore && (
            <div className="absolute top-full mt-1 right-0 bg-[var(--window-panel-bg)] border-2 border-[var(--window-border-dark)] rounded-xl overflow-hidden z-10 min-w-[140px]">
              {overflow.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onSelect(c);
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
  );
}

function AchievementCard({ achievement, onOpen }) {
  return (
    <button
      onClick={() => onOpen(achievement)}
      className="w-full text-left flex items-start gap-3 bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] rounded-2xl p-4 mt-4 first:mt-0 shadow-[3px_3px_0px_rgba(0,0,0,0.15)]"
    >
      <span
        className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${achievement.color}`}
      >
        <AchievementIcon name={achievement.icon} className="w-6 h-6" />
      </span>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-[var(--window-body-text)]">
          {achievement.title}
        </h3>
        <p className="text-xs text-[var(--window-text-secondary)] mt-0.5">
          {achievement.subtitle}
        </p>
        <p className="text-sm text-[var(--window-text-secondary)] mt-1 leading-snug">
          {achievement.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {achievement.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--window-panel-bg)] text-[var(--window-text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <span
        className="text-[var(--window-text-secondary)] mt-1 shrink-0"
        aria-hidden="true"
      >
        ›
      </span>
    </button>
  );
}

function Section({ label, children }) {
  return (
    <div>
      <p className="text-xs font-bold font-mono text-[var(--window-text-secondary)] mb-1">
        // {label}
      </p>
      <div className="text-sm text-[var(--window-body-text)] bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] rounded-lg p-3 leading-snug">
        {children}
      </div>
    </div>
  );
}

function AchievementDetailSheet({ achievement, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm max-h-[85vh] overflow-y-auto bg-[var(--window-panel-bg)] border-2 border-[var(--window-border-dark)] rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--window-header-bg)] rounded-t-2xl sticky top-0">
          <span className="text-sm font-bold text-[var(--window-header-text)] font-mono">
            System Alert
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-full bg-[var(--window-active-bg)] text-[var(--window-active-text)] flex items-center justify-center text-xs font-bold shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span
              className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${achievement.color}`}
            >
              <AchievementIcon name={achievement.icon} className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-base font-bold text-[var(--window-body-text)]">
                {achievement.title}
              </h2>
              <p className="text-xs text-[var(--window-text-secondary)]">
                {achievement.subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {achievement.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--window-body-bg)] text-[var(--window-text-secondary)] border border-[var(--window-border-dark)]/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Section label="Overview">
            <p>{achievement.overview}</p>
          </Section>

          <Section label="Key Contributions">
            <ul className="list-disc pl-4 space-y-1">
              {achievement.contributions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>

          <Section label="Impact">
            <p>{achievement.impact}</p>
          </Section>

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border-2 border-[var(--window-border-dark)] text-xs font-mono bg-[var(--window-body-bg)] text-[var(--window-body-text)] rounded"
            >
              Abort
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 border-2 border-[var(--window-border-dark)] text-xs font-mono bg-[var(--window-button-bg)] text-[var(--window-button-text)] rounded"
            >
              Unlock Achievement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileAchievements() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(ACHIEVEMENTS.map((a) => a.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(
    () =>
      category === "All"
        ? ACHIEVEMENTS
        : ACHIEVEMENTS.filter((a) => a.category === category),
    [category],
  );

  return (
    <div
      className="min-h-screen"
      style={{
        paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 0px) + 24px)",
      }}
    >
      <div
        className="px-4"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 20px)" }}
      >
        <h1 className="text-3xl font-extrabold text-[var(--window-body-text)]">
          Achievements
        </h1>

        <div className="mt-4">
          <FilterChips
            categories={categories}
            active={category}
            onSelect={setCategory}
          />
        </div>
      </div>

      <div className="px-4 mt-2">
        {filtered.map((a) => (
          <AchievementCard key={a.id} achievement={a} onOpen={setSelected} />
        ))}
      </div>

      {selected && (
        <AchievementDetailSheet
          achievement={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

// ---- desktop: existing floating "System Alert" popup sequence, unchanged ----
const DESKTOP_ACHIEVEMENTS = ACHIEVEMENTS.map((a) => ({
  title: a.title,
  desc: a.desc,
}));

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const getRandomPos = () => {
  const maxX = Math.max(20, window.innerWidth - 520);
  const maxY = Math.max(20, window.innerHeight - 250);
  return {
    x: Math.floor(Math.random() * maxX) + 20,
    y: Math.floor(Math.random() * maxY) + 20,
  };
};

function DesktopAchievements() {
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    const shuffled = shuffle(DESKTOP_ACHIEVEMENTS);

    const timers = shuffled.map((achievement, i) =>
      setTimeout(() => {
        setPopups((prev) => [
          ...prev,
          { id: i, achievement, pos: getRandomPos() },
        ]);
      }, i * 300),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {popups.map(({ id, achievement, pos }, index) => (
        <ErrorPopup
          key={id}
          achievement={achievement}
          defaultPos={pos}
          isLast={index === popups.length - 1}
          onClose={() => setPopups((prev) => prev.filter((p) => p.id !== id))}
          onNext={() => setPopups((prev) => prev.filter((p) => p.id !== id))}
        />
      ))}
    </>
  );
}

export default function AchievementsPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileAchievements /> : <DesktopAchievements />;
}
