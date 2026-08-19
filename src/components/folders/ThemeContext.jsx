import { createContext, useContext, useEffect, useState } from "react";
import { BACKGROUNDS, DEFAULT_THEME_SETTINGS } from "./themes.js";

const STORAGE_KEY = "desktop-theme-settings";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved
        ? { ...DEFAULT_THEME_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_THEME_SETTINGS;
    } catch {
      return DEFAULT_THEME_SETTINGS;
    }
  });

  useEffect(() => {
    const bg = BACKGROUNDS.find((b) => b.id === settings.backgroundId) ?? BACKGROUNDS[0];
    const root = document.documentElement;
    root.dataset.background = bg.id;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore write failures (private browsing, quota, etc.)
    }
  }, [settings]);

  const applySettings = (partial) => setSettings((s) => ({ ...s, ...partial }));

  return (
    <ThemeContext.Provider value={{ settings, applySettings }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDesktopTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useDesktopTheme must be used inside <ThemeProvider>");
  return ctx;
}