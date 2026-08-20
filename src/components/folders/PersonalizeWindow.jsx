import { useState } from "react";
import RetroWindow from "./RetroWindow";
import { BACKGROUNDS } from "./themes";
import { useDesktopTheme } from "./ThemeContext";

const swatchBorder = (isActive) => ({
  borderColor: isActive ? "#22c55e" : "var(--window-border-dark)",
  boxShadow: isActive ? "0 0 0 2px #22c55e" : "none",
});

const chromeButtonClass =
  "border-t-2 border-l-2 border-[var(--window-border-light)] border-b-2 border-r-2 border-[var(--window-border-dark)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]";

const PersonalizeWindow = ({ onClose }) => {
  const { settings, applySettings } = useDesktopTheme();
  const [draft, setDraft] = useState(settings);

  const handleApply = () => {
    applySettings(draft);
    onClose();
  };

  return (
    <RetroWindow title="Personalize" onClose={onClose} defaultPos={{ x: 420, y: 50 }}>
      <div className="w-[520px] max-h-[65vh] overflow-y-auto p-4 space-y-5 font-mono text-[var(--window-body-text)]">
        <section>
          <h3 className="text-sm font-bold mb-2">Desktop Background</h3>
          <div className="grid grid-cols-4 gap-3">
            {BACKGROUNDS.map((b) => (
              <button key={b.id} type="button" onClick={() => setDraft((d) => ({ ...d, backgroundId: b.id }))} className="flex flex-col items-center gap-1">
                <div className="w-full aspect-square rounded-sm border-2 bg-cover bg-center" style={{ backgroundImage: `url(${b.preview})`, ...swatchBorder(draft.backgroundId === b.id) }} />
                <span className="text-[11px]">{b.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-2 px-4 py-3 border-t-2 border-[var(--window-border-dark)] bg-[var(--window-panel-bg)]">
        <button type="button" onClick={onClose} className={`text-xs px-4 py-1.5 bg-[var(--window-body-bg)] text-[var(--window-body-text)] ${chromeButtonClass}`}>Cancel</button>
        <button type="button" onClick={handleApply} className={`text-xs px-4 py-1.5 bg-[var(--window-button-bg)] text-[var(--window-button-text)] ${chromeButtonClass}`}>Apply</button>
      </div>
    </RetroWindow>
  );
};

export default PersonalizeWindow;