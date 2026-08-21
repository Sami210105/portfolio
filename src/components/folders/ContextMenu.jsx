import { useEffect, useRef } from "react";

const MENU_ITEMS = [
  { id: "view", label: "View", hasSubmenu: true, disabled: true },
  { id: "sort", label: "Sort by", hasSubmenu: true, disabled: true },
  { id: "refresh", label: "Refresh" },
  { id: "d1", divider: true },
  { id: "paste", label: "Paste", disabled: true },
  { id: "paste-shortcut", label: "Paste shortcut", disabled: true },
  { id: "d2", divider: true },
  { id: "new", label: "New", hasSubmenu: true, disabled: true },
  { id: "d3", divider: true },
  { id: "personalize", label: "Personalize..." },
];

const MENU_WIDTH = 208;
const MENU_HEIGHT = 340;

const ContextMenu = ({ x, y, onClose, onPersonalize, onRefresh }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const left = Math.min(x, window.innerWidth - MENU_WIDTH - 8);
  const top = Math.min(y, window.innerHeight - MENU_HEIGHT - 8);

  const handleItemClick = (item) => {
    if (item.disabled) return;
    if (item.id === "personalize") onPersonalize();
    if (item.id === "refresh") onRefresh?.();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-[9998] w-52 bg-[var(--window-body-bg)] border-2 border-[var(--window-border-dark)] shadow-[3px_3px_0px_rgba(0,0,0,0.4)] font-mono text-[13px] py-1 select-none"
      style={{ left, top }}
    >
      {MENU_ITEMS.map((item) =>
        item.divider ? (
          <div key={item.id} className="my-1 border-t border-[var(--window-text-secondary)] opacity-40" />
        ) : (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`flex items-center justify-between px-3 py-1.5 ${
              item.disabled
                ? "text-[var(--window-text-secondary)] opacity-50 cursor-default"
                : "text-[var(--window-body-text)] cursor-pointer hover:bg-[var(--window-header-bg)] hover:text-[var(--window-header-text)]"
            } ${item.id === "personalize" ? "font-bold" : ""}`}
          >
            <span>{item.label}</span>
            {item.hasSubmenu && <span>›</span>}
          </div>
        )
      )}
    </div>
  );
};

export default ContextMenu;