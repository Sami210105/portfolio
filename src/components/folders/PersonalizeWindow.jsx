import { useState } from "react";
import RetroWindow from "./RetroWindow";
import { BACKGROUNDS } from "./themes";
import { useDesktopTheme } from "./ThemeContext";

// Controls the border/highlight of each background preview
const swatchBorder = (isActive) => ({
  borderColor: isActive ? "#fafafa" : "var(--window-border-dark)",
  boxShadow: isActive ? "0 0 0 2px #fafafa" : "none",
});

// Windows 95-style button border
const chromeButtonClass =
  "border-t-2 border-l-2 border-[var(--window-border-light)] border-b-2 border-r-2 border-[var(--window-border-dark)] active:border-t-[var(--window-border-dark)] active:border-l-[var(--window-border-dark)] active:border-b-[var(--window-border-light)] active:border-r-[var(--window-border-light)]";


const PersonalizeWindow = ({ onClose }) => {

  // Current theme settings + function to apply new settings
  const { settings, applySettings } = useDesktopTheme();

  // Temporary settings used while choosing a background
  const [draft, setDraft] = useState(settings);


  // Apply selected settings and close the window
  const handleApply = () => {
    applySettings(draft);
    onClose();
  };


  return (
    <RetroWindow
      title="Personalize"
      onClose={onClose}
      defaultPos={{ x: 420, y: 50 }}
    >

      {/* Main personalization content */}
      <div className="w-[520px] max-h-[65vh] overflow-y-auto p-4 space-y-5 font-mono text-[var(--window-body-text)]">

        {/* Desktop background selection */}
        <section>
          <h3 className="text-sm font-bold mb-2">
            Desktop Background
          </h3>

          {/* Background preview grid */}
          <div className="grid grid-cols-4 gap-3">

            {BACKGROUNDS.map((b) => (
              <button
                key={b.id}
                type="button"

                // Select this background
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    backgroundId: b.id
                  }))
                }

                className="flex flex-col items-center gap-1"
              >

                {/* Background preview */}
                <div
                  className="w-full aspect-square rounded-sm border-2 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${b.preview})`,
                    ...swatchBorder(draft.backgroundId === b.id)
                  }}
                />

                {/* Background name */}
                <span className="text-[11px]">
                  {b.name}
                </span>

              </button>
            ))}

          </div>
        </section>
      </div>


      {/* Bottom action bar */}
      <div className="flex justify-end gap-2 px-4 py-3 border-t-2 border-[var(--window-border-dark)] bg-[var(--window-panel-bg)]">

        {/* Cancel → close without applying */}
        <button
          type="button"
          onClick={onClose}
          className={`text-xs px-4 py-1.5 bg-[var(--window-body-bg)] text-[var(--window-body-text)] ${chromeButtonClass}`}
        >
          Cancel
        </button>

        {/* Apply → save selected background */}
        <button
          type="button"
          onClick={handleApply}
          className={`text-xs px-4 py-1.5 bg-[var(--window-button-bg)] text-[var(--window-button-text)] ${chromeButtonClass}`}
        >
          Apply
        </button>

      </div>

    </RetroWindow>
  );
};


export default PersonalizeWindow;