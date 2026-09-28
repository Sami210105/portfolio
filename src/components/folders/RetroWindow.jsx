import { useState, useRef, useEffect, useCallback } from "react";
import { playSound } from "../../utils/sound";
import { SOUNDS } from "../../utils/sounds";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const MOBILE_BREAKPOINT = 640;

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
  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });
  const isMobile = viewport.width < MOBILE_BREAKPOINT;

  // On phone, the window behaves like a full-screen app sheet that slides
  // up on open instead of a floating draggable window.
  const [entered, setEntered] = useState(!isMobile);

  const dragging = useRef(false);
  const resizing = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    playSound(SOUNDS.windowOpen);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  useEffect(() => {
    if (disableCenter || isMobile || !windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const centerX = (window.innerWidth - rect.width) / 2;
    setPos((prev) => ({ ...prev, x: Math.max(8, centerX) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-check on rotation / resize so a window doesn't get stranded
  // off-screen, and so it can switch between floating <-> app-sheet mode.
  useEffect(() => {
    const onResize = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const getPoint = (e) => (e.touches && e.touches.length ? e.touches[0] : e);

  const startDrag = (clientX, clientY) => {
    if (isMobile) return; // full-screen app sheet isn't draggable
    dragging.current = true;
    offset.current = { x: clientX - pos.x, y: clientY - pos.y };
  };

  const onHeaderMouseDown = (e) => startDrag(e.clientX, e.clientY);
  const onHeaderTouchStart = (e) => {
    const p = getPoint(e);
    startDrag(p.clientX, p.clientY);
  };

  const startResize = (clientX, clientY) => {
    if (isMobile) return;
    resizing.current = true;
    const rect = windowRef.current.getBoundingClientRect();
    resizeStart.current = {
      x: clientX,
      y: clientY,
      width: rect.width,
      height: rect.height,
    };
  };

  const onResizeMouseDown = (e) => {
    e.stopPropagation();
    startResize(e.clientX, e.clientY);
  };
  const onResizeTouchStart = (e) => {
    e.stopPropagation();
    const p = getPoint(e);
    startResize(p.clientX, p.clientY);
  };

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (dragging.current) {
        setPos({
          x: clientX - offset.current.x,
          y: clientY - offset.current.y,
        });
      }
      if (resizing.current) {
        const dx = clientX - resizeStart.current.x;
        const dy = clientY - resizeStart.current.y;
        setSize({
          width: Math.max(minSize.width, resizeStart.current.width + dx),
          height: Math.max(minSize.height, resizeStart.current.height + dy),
        });
      }
    },
    [minSize.width, minSize.height],
  );

  const handleMouseMove = useCallback(
    (e) => handleMove(e.clientX, e.clientY),
    [handleMove],
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!dragging.current && !resizing.current) return;
      e.preventDefault();
      const p = getPoint(e);
      handleMove(p.clientX, p.clientY);
    },
    [handleMove],
  );

  const handleEnd = useCallback(() => {
    dragging.current = false;
    resizing.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
    document.addEventListener("touchcancel", handleEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
      document.removeEventListener("touchcancel", handleEnd);
    };
  }, [handleMouseMove, handleTouchMove, handleEnd]);

  const handleClose = () => {
    playSound(SOUNDS.windowClose);
    onClose();
  };

  // ---- desktop floating-window geometry ----
  const margin = 8;
  const renderWidth = Math.min(size.width, viewport.width - margin * 2);
  const renderHeight = minimized
    ? undefined
    : size.height
      ? Math.min(size.height, viewport.height - margin * 2)
      : undefined;
  const renderX = clamp(
    pos.x,
    margin,
    Math.max(margin, viewport.width - renderWidth - margin),
  );
  const maxY = viewport.height - margin - (renderHeight ?? 80);
  const renderY = clamp(pos.y, margin, Math.max(margin, maxY));

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-[100] font-mono flex items-center justify-center bg-black/40 p-4"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        }}
        onClick={handleClose}
      >
        <div
          ref={windowRef}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-md max-h-full flex flex-col overflow-hidden rounded-lg border-2 border-[var(--window-border-dark)] bg-[var(--window-body-bg)] shadow-[6px_6px_0px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out ${
            entered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-[var(--window-header-bg)] px-4 py-3 flex items-center justify-between shrink-0">
            <span className="text-[var(--window-header-text)] text-base font-bold tracking-wide truncate pr-2">
              {title}
            </span>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[var(--window-button-bg)] text-[var(--window-button-text)] text-sm font-bold border-t-2 border-l-2 border-[var(--window-border-light)] border-b-2 border-r-2 border-[var(--window-border-dark)]"
            >
              ✕
            </button>
          </div>
          <div className="min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[var(--window-body-bg)] text-[var(--window-body-text)]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className="fixed z-[100] font-mono max-w-[calc(100vw-16px)]"
      style={{
        left: renderX,
        top: renderY,
        width: renderWidth,
        height: minimized ? "auto" : (renderHeight ?? "auto"),
      }}
    >
      <div className="relative h-full flex flex-col border-t-2 border-l-2 border-[var(--window-border-dark)] border-b-2 border-r-2 border-b-[var(--window-border-light)] border-r-[var(--window-border-light)]">
        <div
          className="bg-[var(--window-header-bg)] px-2 py-1.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none touch-none"
          onMouseDown={onHeaderMouseDown}
          onTouchStart={onHeaderTouchStart}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[var(--window-header-text)] text-sm font-bold tracking-wide truncate">
              {title}
            </span>
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMinimized((m) => !m);
              }}
              className="w-7 h-7 sm:w-5 sm:h-5 bg-[var(--window-header-bg)] text-[var(--window-header-text)] text-[11px] font-bold flex items-center justify-center border-t-2 border-l-2 border-[var(--window-border-light)] border-b-2 border-r-2 border-[var(--window-border-dark)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]"
            >
              _
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="w-7 h-7 sm:w-5 sm:h-5 bg-[var(--window-header-bg)] text-[var(--window-header-text)] text-[11px] font-bold flex items-center justify-center border-t-2 border-l-2 border-[var(--window-border-light)] border-b-2 border-r-2 border-[var(--window-border-dark)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]"
            >
              ✕
            </button>
          </div>
        </div>
        {!minimized && (
          <div className="flex-1 min-h-0 overflow-auto bg-[var(--window-body-bg)] text-[var(--window-body-text)] border-t-2 border-l-2 border-[var(--window-border-dark)] border-b-2 border-r-2 border-[var(--window-border-light)]">
            {children}
          </div>
        )}
        {!minimized && resizable && (
          <div
            onMouseDown={onResizeMouseDown}
            onTouchStart={onResizeTouchStart}
            className="absolute bottom-0 right-0 w-6 h-6 sm:w-4 sm:h-4 cursor-nwse-resize touch-none"
          />
        )}
      </div>
    </div>
  );
};

export default RetroWindow;
