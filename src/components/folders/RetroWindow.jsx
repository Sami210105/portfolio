import { useState, useRef, useEffect } from "react";

const RetroWindow = ({
  title,
  children,
  onClose,
  defaultPos = { x: 100, y: 180 },
  disableCenter = false,
}) => {
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState(defaultPos);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    if (disableCenter || !windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const centerX = (window.innerWidth - rect.width) / 2;
    setPos((prev) => ({ ...prev, x: centerX }));
  }, []);

  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={windowRef}
      className="fixed z-[100] w-[600px] font-mono"
      style={{ left: pos.x, top: pos.y }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="border-t-2 border-l-2 border-black border-b-2 border-r-2 border-b-[#555] border-r-[#555]">
        <div
          className="bg-[#573c27] px-2 py-1.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onMouseDown}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#e2c7aa] text-sm font-bold tracking-wide">
              {title}
            </span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMinimized((m) => !m);
              }}
              className="w-5 h-5 bg-[#573c27] text-[#e2c7aa] text-[11px] font-bold flex items-center justify-center border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#555] active:border-t-[#555] active:border-l-[#555] active:border-b-white active:border-r-white"
            >
              _
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-5 h-5 bg-[#573c27] text-[#e2c7aa] text-[11px] font-bold flex items-center justify-center border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#555] active:border-t-[#555] active:border-l-[#555] active:border-b-white active:border-r-white"
            >
              ✕
            </button>
          </div>
        </div>

        {!minimized && (
          <div className="bg-[#e2c7aa] border-t-2 border-l-2 border-[#555] border-b-2 border-r-2 border-white">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default RetroWindow;