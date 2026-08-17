import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 13;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/panda/frame${String(i).padStart(4, "0")}.png`,
);

const THOUGHTS = [
  "bamboo... where's the bamboo",
  "Hire me? or don't. i'm a panda.",
  "“This website has more personality than you.”",
  "welcome to my little corner of the internet",
  "hi hi :)",
  "make yourself at home",
  "you found me!",
  "this seemed like a good idea at 2am",
];

function ThoughtBubble({ children, width = 140 }) {
  return (
    <div className="relative" style={{ width, aspectRatio: "1 / 1" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="-40 -40 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <path
          d="M146.63 298.269C146.159 298.527 135.463 322 132.326 322C123.184 322 121.995 300.313 114.176 297.555C113.437 297.292 82.0986 307.391 72.5922 292.085C63.0858 276.778 61.3346 103.86 74.1479 91.947C86.9612 80.0342 316.748 70.8011 328.865 90.2687C334.557 99.4132 339.793 273.078 329 284C303.135 307.724 208.064 294.156 162.286 297.574"
          stroke="#573c27"
          strokeOpacity="0.9"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className="absolute flex items-center justify-center text-center
                   text-[10px] font-bold text-[#351303] leading-tight"
        style={{ top: "23%", bottom: "25%", left: "24%", right: "22%" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function PandaIcon({
  size = 64,
  fps = 24,
  reactTo = null,
  reactions = {},
  selfBubblePos = "-top-12 -right-18",
  reactionBubblePos = "-top-12 left-18 -translate-x-1/2",
}) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [thought, setThought] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleSource, setBubbleSource] = useState(null); // "self" | "reaction"
  const intervalRef = useRef(null);
  const selfHoverRef = useRef(false);
  const [framesReady, setFramesReady] = useState(false);

  const clearAnim = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const animateTo = (target, onComplete) => {
    clearAnim();
    intervalRef.current = setInterval(() => {
      setFrameIndex((i) => {
        if (i === target) {
          clearAnim();
          onComplete?.();
          return i;
        }
        return i < target ? i + 1 : i - 1;
      });
    }, 1000 / fps);
  };

  const playForwardOnce = (customThought) => {
    setShowBubble(false);
    animateTo(FRAMES.length - 1, () => {
      setThought(
        customThought ?? THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)],
      );
      setBubbleSource("self");
      setShowBubble(true);
    });
  };

  const playBackwardToStart = () => {
    setShowBubble(false);
    animateTo(0);
  };

  useEffect(() => clearAnim, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      FRAMES.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve; // don't block forever on one bad frame
          }),
      ),
    ).then(() => {
      if (!cancelled) setFramesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!framesReady) return;
    if (selfHoverRef.current) return;
    setShowBubble(false);

    if (reactTo) {
      const line = reactions[reactTo];
      const text =
        (Array.isArray(line)
          ? line[Math.floor(Math.random() * line.length)]
          : line) ?? THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];

      animateTo(0, () => {
        setThought(text);
        setBubbleSource("reaction");
        setShowBubble(true);
      });
    } else {
      animateTo(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactTo, framesReady]);

  const handleSelfEnter = () => {
    if (!framesReady) return;
    selfHoverRef.current = true;
    playForwardOnce(); // full animation + random custom thought
  };

  const handleSelfLeave = () => {
    selfHoverRef.current = false;
    playBackwardToStart();
  };

  return (
    <div className="relative inline-block">
      {showBubble && (
        <div
          className={`absolute z-10 pointer-events-none ${
            bubbleSource === "self" ? selfBubblePos : reactionBubblePos
          }`}
        >
          <ThoughtBubble width={140}>{thought}</ThoughtBubble>
        </div>
      )}

      <img
        src={FRAMES[frameIndex]}
        alt="Panda"
        draggable={false}
        onMouseEnter={handleSelfEnter}
        onMouseLeave={handleSelfLeave}
        style={{ width: size, height: "auto" }}
        className="select-none cursor-pointer object-contain"
      />
    </div>
  );
}