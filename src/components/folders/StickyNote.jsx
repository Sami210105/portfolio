import { useRef, useState, useCallback, useEffect } from "react";

const TITLE = "note.txt";
const INTRO = "Things I should probably finish:";
const DEFAULT_ITEMS = [
  { id: "1", label: "build cool things", checked: true },
  { id: "2", label: "learn AIML", checked: false },
  { id: "3", label: "drink water", checked: true },
  { id: "4", label: "break something", checked: false },
  { id: "5", label: "fix it", checked: false },
];

const IMG_NATURAL_WIDTH = 881;
const IMG_NATURAL_HEIGHT = 902;
// ─────────────────────────────────────────────────────────────

function Checkbox({ checked }) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 border-2 border-[#3d2b12]"
      style={{ width: 16, height: 16, marginTop: 2 }}
    >
      {checked && (
        <svg viewBox="0 0 16 16" width="12" height="12">
          <path
            d="M2 8 L6 12 L14 3"
            stroke="#3d2b12"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

export default function StickyNote({
  width = 220,
  initialX = 300,
  initialY = 60,
  onClose = null, 
}) {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const draggingRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)),
    );
  };

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    offsetRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handlePointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    setPos({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div
      className="absolute z-40 select-none"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        aspectRatio: `${IMG_NATURAL_WIDTH} / ${IMG_NATURAL_HEIGHT}`,
        cursor: draggingRef.current ? "grabbing" : "grab",
      }}
      onMouseDown={handlePointerDown}
    >
      <img
        src="/sticky-note.png"
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* close button — sits over the X already drawn into the image */}
      {onClose && (
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
          aria-label="Close note"
          className="absolute"
          style={{ left: "80%", top: "5%", width: "15%", height: "12%" }}
        />
      )}

      {/* text + checklist overlay */}
      <div
        className="absolute flex flex-col"
        style={{ left: "9%", right: "9%", top: "9%" }}
      >
        <span
          className="font-bold text-[#3d2b12]"
          style={{ fontSize: "clamp(10px, 6cqw, 14px)" }}
        >
          {TITLE}
        </span>

        <p
          className="font-bold text-[#3d2b12] leading-snug whitespace-pre-line"
          style={{ fontSize: "clamp(9px, 5.4cqw, 13px)", marginTop: "10%" }}
        >
          {INTRO}
        </p>

        <div
          className="border-t-2 border-dashed border-[#3d2b12] opacity-60"
          style={{ marginTop: "2%", marginBottom: "4%" }}
        />

        <ul className="flex flex-col" style={{ gap: "6%" }}>
          {items.map((it) => (
            <li key={it.id}>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => toggleItem(it.id)}
                className="flex items-start gap-2 text-left"
              >
                <Checkbox checked={it.checked} />
                <span
                  className={`text-[#3d2b12] leading-tight ${
                    it.checked ? "opacity-70" : ""
                  }`}
                  style={{ fontSize: "clamp(9px, 5cqw, 12px)" }}
                >
                  {it.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}