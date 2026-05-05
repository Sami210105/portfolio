import { useState } from "react";

export default function Carousel({
  images = [],
  maxHeight = "60vh",
  github,
  live,
}) {
  const [index, setIndex] = useState(0);

  if (!images.length) return <p>No images</p>;

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center gap-2">
        <button onClick={prev} className="px-2 py-1 shrink-0">
          <img src="/icons/left.png" className="w-5 h-5 font-bold" />
        </button>

        <div
          className="flex-1 flex items-center justify-center"
          style={{ maxHeight }}
        >
          <img
            src={images[index]}
            style={{ maxHeight }}
            className="max-w-full object-contain border-2 border-black"
          />
        </div>

        <button onClick={next} className="px-2 py-1 shrink-0">
          <img src="/icons/right.png" className="w-5 h-5 font-bold" />
        </button>
      </div>

      <div className="flex justify-center gap-4 text-xs mt-2">
        {github && (
          <button onClick={() => window.open(github, "_blank")} className="px-2 py-1 border-3 border-[#341303] shadow-[2px_2px_0px_0px_#341303]">
            Github
          </button>
        )}
        {live && (
          <button onClick={() => window.open(live, "_blank")} className="px-2 py-1 border-3 border-[#341303] shadow-[2px_2px_0px_0px_#341303]">
            Preview
          </button>
        )}
      </div>
    </div>
  );
}
