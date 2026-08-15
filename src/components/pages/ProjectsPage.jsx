import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../folders/projects/notebookData";
import ProjectFace from "../folders/projects/ProjectFace";
import RingBinding from "../folders/projects/RingBinding";

const TASKBAR_HEIGHT = 64;

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

export default function ProjectsPage() {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0); 
  const [pageH, setPageH] = useState(
    () => window.innerHeight - TASKBAR_HEIGHT
  );

  useEffect(() => {
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
  }, [pageH]);

  const currentIndex = Math.floor(progress);
  const local = progress - currentIndex;
  const activeTab = Math.round(progress);

  const jumpTo = (i) => {
    if (!wrapRef.current) return;
    const top = wrapRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * pageH, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapRef}
      style={{ height: `${PROJECTS.length * pageH}px` }}
      className="relative w-full"
    >
      <div
        style={{ height: `${pageH}px` }}
        className="sticky top-0 w-full flex items-center justify-center overflow-hidden"
      >
        <div className="relative flex items-center gap-3 md:gap-8">
          {/* tabs */}
          <div className="flex flex-col gap-2 z-30">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => jumpTo(i)}
                className={`text-[10px] font-bold px-2 py-2 border-2 border-black
                  ${activeTab === i ? "bg-[#c05754] text-white" : "bg-[#9b6b53] text-[#e2c7aa]"}`}
                style={{ writingMode: "vertical-rl" }}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* notebook */}
          <div
            style={{ perspective: "2200px" }}
            className="relative w-[100vw] max-w-[900px] h-[68vh] max-h-[620px] isolate"
          >
            <RingBinding count={13} />

            {PROJECTS.map((project, i) => {
              let rotateY = 0;
              const z = PROJECTS.length - i;
              const isLastPage = i === PROJECTS.length - 1;

              if (i < currentIndex) rotateY = -180;
              if (i === currentIndex && !isLastPage) rotateY = -local * 180;

              const shade =
                i === currentIndex && !isLastPage
                  ? Math.sin(local * Math.PI)
                  : 0;

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
                  <div
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 bg-[#f5f5f5] border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,0.25)] overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, black 0px, black 1px, transparent 1px, transparent 28px)",
                        opacity: 0.25,
                      }}
                    />

                    <div
                      className="absolute inset-0 pointer-events-none bg-black"
                      style={{ opacity: shade * 0.25 }}
                    />

                    <ProjectFace project={project} />

                    {/* Indicator */}
                    <div className="absolute bottom-4 left-60 text-xs font-mono text-[#573c27] px-3 py-1 z-20 pointer-events-none text-center">
                      {i + 1} / {PROJECTS.length}
                      <p className="text-[12px] mt-1">scroll to flip</p>
                    </div>
                  </div>

                  {/* back face */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className="absolute inset-0 bg-[#e6d3b3] border-2 border-black"
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, black 0px, black 1px, transparent 1px, transparent 28px)",
                        opacity: 0.25,
                      }}
                    />

                    <div
                      className="absolute inset-0 pointer-events-none bg-black"
                      style={{ opacity: shade * 0.25 }}
                    />
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