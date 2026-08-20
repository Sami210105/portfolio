import { useState, useRef, useEffect, useCallback } from "react";

const RetroWindow = ({
  title,
  children,
  onClose,
  defaultPos = { x: 100, y: 180 },
  defaultSize = { width: 600, height: null },
  minSize = { width: 320, height: 150 },
  disableCenter = false,
  resizable = true,
}) => {
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState(defaultPos);
  const [size, setSize] = useState(defaultSize);

  const dragging = useRef(false);
  const resizing = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    if (disableCenter || !windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const centerX = (window.innerWidth - rect.width) / 2;
    setPos((prev) => ({ ...prev, x: centerX }));
  }, []);

  const onHeaderMouseDown = (e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onResizeMouseDown = (e) => {
    e.stopPropagation();
    resizing.current = true;
    const rect = windowRef.current.getBoundingClientRect();
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
    };
  };

  const handleMouseMove = useCallback((e) => {
    if (dragging.current) {
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
    if (resizing.current) {
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      setSize({
        width: Math.max(minSize.width, resizeStart.current.width + dx),
        height: Math.max(minSize.height, resizeStart.current.height + dy),
      });
    }
  }, [minSize.width, minSize.height]);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
    resizing.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div ref={windowRef} className="fixed z-[100] font-mono" style={{ left: pos.x, top: pos.y, width: size.width, height: minimized ? "auto" : size.height ?? "auto" }}>
      <div className="relative h-full flex flex-col border-t-2 border-l-2 border-[var(--window-border-dark)] border-b-2 border-r-2 border-b-[var(--window-border-light)] border-r-[var(--window-border-light)]">
        <div className="bg-[var(--window-header-bg)] px-2 py-1.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none" onMouseDown={onHeaderMouseDown}>
          <div className="flex items-center gap-2">
            <span className="text-[var(--window-header-text)] text-sm font-bold tracking-wide">{title}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={(e) => { e.stopPropagation(); setMinimized((m) => !m); }} className="w-5 h-5 bg-[var(--window-header-bg)] text-[var(--window-header-text)] text-[11px] font-bold flex items-center justify-center border-t-2 border-l-2 border-[var(--window-border-light)] border-b-2 border-r-2 border-[var(--window-border-dark)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]">_</button>
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-5 h-5 bg-[var(--window-header-bg)] text-[var(--window-header-text)] text-[11px] font-bold flex items-center justify-center border-t-2 border-l-2 border-[var(--window-border-light)] border-b-2 border-r-2 border-[var(--window-border-dark)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]">✕</button>
          </div>
        </div>
        {!minimized && (
          <div className="flex-1 min-h-0 overflow-auto bg-[var(--window-body-bg)] text-[var(--window-body-text)] border-t-2 border-l-2 border-[var(--window-border-dark)] border-b-2 border-r-2 border-[var(--window-border-light)]">
            {children}
          </div>
        )}
        {!minimized && resizable && (
          <div onMouseDown={onResizeMouseDown} className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" />
        )}
      </div>
    </div>
  );
};

export default RetroWindow;