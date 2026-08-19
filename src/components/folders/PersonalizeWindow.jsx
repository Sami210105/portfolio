import { useState } from "react";
import RetroWindow from "./RetroWindow"; // adjust path to wherever RetroWindow lives
import { BACKGROUNDS } from "./themes";
import { useDesktopTheme } from "./ThemeContext";

const swatchBorder = (isActive) => ({
  borderColor: isActive ? "#22c55e" : "#573c27",
  boxShadow: isActive ? "0 0 0 2px #22c55e" : "none",
});

const chromeButtonClass =
  "border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#573c27] active:border-t-[#573c27] active:border-l-[#573c27] active:border-b-white active:border-r-white";

const PersonalizeWindow = ({ onClose }) => {
  const { settings, applySettings } = useDesktopTheme();
  const [draft, setDraft] = useState(settings);

  const handleApply = () => {
    applySettings(draft);
    onClose();
  };

  return (
    <RetroWindow title="Personalize" onClose={onClose} defaultPos={{ x: 420, y: 50 }}>
      <div className="w-[520px] max-h-[65vh] overflow-y-auto p-4 space-y-5 font-mono text-[#351303]">
        <section>
          <h3 className="text-sm font-bold mb-2">Desktop Background</h3>
          <div className="grid grid-cols-4 gap-3">
            {BACKGROUNDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setDraft((d) => ({ ...d, backgroundId: b.id }))}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-full aspect-square rounded-sm border-2 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${b.preview})`,
                    ...swatchBorder(draft.backgroundId === b.id),
                  }}
                />
                <span className="text-[11px]">{b.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* footer */}
      <div className="flex justify-end gap-2 px-4 py-3 border-t-2 border-[#573c27] bg-[#d8b78f]">
        <button
          type="button"
          onClick={onClose}
          className={`text-xs px-4 py-1.5 bg-[#e2c7aa] ${chromeButtonClass}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleApply}
          className={`text-xs px-4 py-1.5 bg-[#573c27] text-[#e2c7aa] ${chromeButtonClass}`}
        >
          Apply
        </button>
      </div>
    </RetroWindow>
  );
};

export default PersonalizeWindow;