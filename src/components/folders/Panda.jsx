import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 13;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/panda/frame${String(i).padStart(4, "0")}.png`,
);

const THOUGHTS = [
  {
    text: "bamboo... where's the bamboo",
    priority: 10,
    action: null,
  },
  {
    text: "Hire me? or don't. i'm a panda.",
    priority: 6,
    action: "connect",
  },
  {
    text: "Click on the bubble to see what happens!",
    priority: 5,
    action: null,
  },
  {
    text: "welcome to my little corner of the internet",
    priority: 7,
    action: null,
  },
  {
    text: "hi hi :)",
    priority: 10,
    action: null,
  },
  {
    text: "right click to personalize the desktop",
    priority: 1,
    action: "personalize",
  },
  {
    text: "you found me!",
    priority: 4,
    action: "null",
  },
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
          fill="var(--window-body-bg)"
          stroke="var(--window-text-secondary)"
          strokeOpacity="0.9"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className="absolute flex items-center justify-center text-center text-[10px] font-bold text-[var(--window-border-dark)] leading-tight"
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
  idleBubblePos = "-top-12 left-18 -translate-x-1/2",
  setActivePage = null,
  onOpenWindow = null,
  onPersonalize = null,
}) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [thought, setThought] = useState({ text: "", action: null });
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleSource, setBubbleSource] = useState(null); // "self" | "reaction" | "idle"
  const intervalRef = useRef(null);
  const frameRef = useRef(0);
  const selfHoverRef = useRef(false);
  const reactToRef = useRef(reactTo);
  const idleTimerRef = useRef(null);
  const [framesReady, setFramesReady] = useState(false);

  const clearAnim = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const setFrame = (frame) => {
    frameRef.current = frame;
    setFrameIndex(frame);
  };

  // Reads/writes frameRef directly instead of a setState updater, so
  // onComplete and clearAnim never run inside React's state-update cycle.
  const animateTo = (target, onComplete) => {
    clearAnim();

    if (frameRef.current === target) {
      onComplete?.();
      return;
    }

    intervalRef.current = setInterval(() => {
      const current = frameRef.current;

      if (current === target) {
        clearAnim();
        onComplete?.();
        return;
      }

      setFrame(current < target ? current + 1 : current - 1);
    }, 1000 / fps);
  };

  const playForwardOnce = (customThought) => {
    setShowBubble(false);
    animateTo(FRAMES.length - 1, () => {
      const picked =
        customThought ?? THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
      setThought(
        typeof picked === "string"
          ? { text: picked, action: null }
          : { text: picked.text, action: picked.action ?? null },
      );
      setBubbleSource("self");
      setShowBubble(true);
    });
  };

  const playBackwardToStart = () => {
    setShowBubble(false);
    animateTo(0);
  };

  const clearIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const scheduleIdleThought = () => {
    clearIdleTimer();
    const waitBeforeNext = 4000 + Math.random() * 6000; // 6-12s

    idleTimerRef.current = setTimeout(() => {
      if (selfHoverRef.current || reactToRef.current) {
        scheduleIdleThought();
        return;
      }

      const picked = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
      setThought({ text: picked.text, action: picked.action ?? null });
      setBubbleSource("idle");
      setShowBubble(true);

      idleTimerRef.current = setTimeout(() => {
        if (!selfHoverRef.current) setShowBubble(false);
        scheduleIdleThought();
      }, 6000); // how long the idle bubble stays up
    }, waitBeforeNext);
  };

  useEffect(() => clearAnim, []);

  useEffect(() => {
    reactToRef.current = reactTo;
  }, [reactTo]);

  useEffect(() => {
    if (!framesReady) return;
    scheduleIdleThought();
    return clearIdleTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framesReady]);

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
      clearIdleTimer();
      const line = reactions[reactTo];
      const text =
        (Array.isArray(line)
          ? line[Math.floor(Math.random() * line.length)]
          : line) ??
        THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)].text;

      animateTo(0, () => {
        setThought({ text, action: null });
        setBubbleSource("reaction");
        setShowBubble(true);
      });
    } else {
      animateTo(0);
      scheduleIdleThought();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactTo, framesReady]);

  const handleSelfEnter = () => {
    if (!framesReady) return;
    selfHoverRef.current = true;
    clearIdleTimer();
    playForwardOnce(); // full animation + random custom thought
  };

  const handleSelfLeave = () => {
    selfHoverRef.current = false;
    playBackwardToStart();
    scheduleIdleThought();
  };

  const handlePandaClick = () => {
    const action = thought?.action;
    if (!action) return;

    switch (action) {
      case "connect":
        onOpenWindow?.("connect");
        break;
      case "personalize":
        onPersonalize?.();
        break;
      case "achievements":
        setActivePage?.("achievements");
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative inline-block">
      {showBubble && (
        <div
          className={`absolute z-10 pointer-events-none ${
            bubbleSource === "self"
              ? selfBubblePos
              : bubbleSource === "reaction"
                ? reactionBubblePos
                : idleBubblePos
          }`}
        >
          <ThoughtBubble width={140}>{thought?.text}</ThoughtBubble>
        </div>
      )}

      <img
        src={FRAMES[frameIndex]}
        alt="Panda"
        data-panda-hitbox
        draggable={false}
        onMouseEnter={handleSelfEnter}
        onMouseLeave={handleSelfLeave}
        onClick={handlePandaClick}
        style={{ width: size, height: "auto" }}
        className="select-none cursor-pointer object-contain"
      />
    </div>
  );
}