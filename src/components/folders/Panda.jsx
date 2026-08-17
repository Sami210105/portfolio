import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 13;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/panda/frame${String(i).padStart(4, "0")}.png`,
);

const THOUGHTS = [
  "bamboo... where's the bamboo",
  "“hmm... should we hire her?”",
  "“She codes. She paints. She sleeps sometimes.”",
  "hire me? or don't. i'm a panda.",
  "“Welcome to Samidha.exe.”",
  "“This website has more personality than most websites.”",
  "“I like her. She seems nice.”",
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

export default function PandaIcon({ size = 64, fps = 24 }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [thought, setThought] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const intervalRef = useRef(null);

  const clearAnim = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const playForwardOnce = () => {
    clearAnim();
    setShowBubble(false);
    intervalRef.current = setInterval(() => {
      setFrameIndex((i) => {
        if (i >= FRAMES.length - 1) {
          clearAnim();
          setThought(THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)]);
          setShowBubble(true);
          return i;
        }
        return i + 1;
      });
    }, 1000 / fps);
  };

  const playBackwardToStart = () => {
    clearAnim();
    setShowBubble(false);
    intervalRef.current = setInterval(() => {
      setFrameIndex((i) => {
        if (i <= 0) {
          clearAnim();
          return 0;
        }
        return i - 1;
      });
    }, 1000 / fps);
  };

  useEffect(() => clearAnim, []);

  return (
    <div className="relative inline-block">
      {showBubble && (
        <div className="absolute -top-12 -right-18 z-10 pointer-events-none">
          <ThoughtBubble width={140}>{thought}</ThoughtBubble>
        </div>
      )}

      <img
        src={FRAMES[frameIndex]}
        alt="Panda"
        draggable={false}
        onMouseEnter={playForwardOnce}
        onMouseLeave={playBackwardToStart}
        style={{ width: size, height: "auto" }}
        className="select-none cursor-pointer object-contain"
      />
    </div>
  );
}
