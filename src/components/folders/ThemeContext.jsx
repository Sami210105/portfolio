import { createContext, useContext, useEffect, useState } from "react";
import { BACKGROUNDS, DEFAULT_THEME_SETTINGS } from "./themes.js";

const STORAGE_KEY = "desktop-theme-settings";

const ThemeContext = createContext(null);

const CSS_VAR_MAP = {
  headerBg: "--window-header-bg",
  headerText: "--window-header-text",
  bodyBg: "--window-body-bg",
  bodyText: "--window-body-text",
  textSecondary: "--window-text-secondary",
  borderDark: "--window-border-dark",
  borderLight: "--window-border-light",
  panelBg: "--window-panel-bg",
  accent: "--window-accent",
  buttonBg: "--window-button-bg",
  buttonText: "--window-button-text",
  hoverBg: "--window-hover-bg",
  activeBg: "--window-active-bg",
  activeText: "--window-active-text",
  trackBg: "--window-track-bg",
};

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

    if (bg.colors) {
      Object.entries(bg.colors).forEach(([key, value]) => {
        const cssVar = CSS_VAR_MAP[key];
        if (cssVar) root.style.setProperty(cssVar, value);
      });
    }

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